// api.ts - Bộ gọi API dùng chung (Common API Client)
const BASE_URL = import.meta.env.PUBLIC_API_BASE_URL || ""

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined | null>
}

/**
 * Lớp lỗi HTTP tuỳ chỉnh để chứa mã trạng thái và phản hồi chi tiết từ server
 */
export class HttpError extends Error {
  status: number
  data: unknown

  constructor(status: number, message: string, data?: unknown) {
    super(message)
    this.name = "HttpError"
    this.status = status
    this.data = data
  }
}

// Bộ lưu trữ tạm thời các yêu cầu GET đang chạy hoặc đã chạy để tránh gọi trùng lặp (Request Memoization/Caching)
const isServer = import.meta.env.SSR
const getCache = new Map<string, Promise<any>>()
const CACHE_DIR = "./.api-cache"

/**
 * Đọc dữ liệu từ cache lưu trên đĩa cứng (dùng cho môi trường build/server worker)
 */
async function readFromDiskCache(url: string): Promise<any> {
  if (!isServer) return null
  try {
    const fs = await import("node:fs" + "")
    const path = await import("node:path" + "")
    // Tạo tên file an toàn bằng base64url để không trùng hoặc lỗi ký tự đặc biệt
    const hash = Buffer.from(url).toString("base64url")
    const dirPath = path.join(process.cwd(), CACHE_DIR)
    const filePath = path.join(dirPath, `${hash}.json`)

    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8")
      return JSON.parse(data)
    }
  } catch (err) {
    // Bỏ qua lỗi đọc cache từ đĩa
  }
  return null
}

/**
 * Ghi dữ liệu vào cache lưu trên đĩa cứng
 */
async function writeToDiskCache(url: string, data: any): Promise<void> {
  if (!isServer) return
  try {
    const fs = await import("node:fs" + "")
    const path = await import("node:path" + "")
    const hash = Buffer.from(url).toString("base64url")
    const dirPath = path.join(process.cwd(), CACHE_DIR)
    const filePath = path.join(dirPath, `${hash}.json`)

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8")
  } catch (err) {
    // Bỏ qua lỗi ghi cache ra đĩa
  }
}

/**
 * Hàm gọi request gốc dùng fetch
 */
async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { params, headers, ...restOptions } = options
  const isGet = !restOptions.method || restOptions.method === "GET"

  // Chuẩn hoá URL: Tránh bị trùng dấu gạch chéo
  const cleanBase = BASE_URL.replace(/\/$/, "")
  const cleanEndpoint = endpoint.replace(/^\//, "")
  let url = `${cleanBase}/${cleanEndpoint}`

  // Xử lý Query Parameters
  if (params) {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value))
      }
    })
    const query = searchParams.toString()
    if (query) {
      url += `?${query}`
    }
  }

  // 1. Kiểm tra cache trong bộ nhớ RAM trước (in-memory cache)
  if (isGet && getCache.has(url)) {
    return getCache.get(url) as Promise<T>
  }

  // 2. Nếu ở Server/Build, thử kiểm tra cache trên đĩa cứng (disk cache)
  if (isGet && isServer) {
    const cachedData = await readFromDiskCache(url)
    if (cachedData !== null) {
      const resolvedPromise = Promise.resolve(cachedData as T)
      getCache.set(url, resolvedPromise)
      return cachedData as T
    }
  }

  const promise = (async () => {
    // Tiêu đề mặc định
    const defaultHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    }

    let attempts = 0
    const maxAttempts = 5

    while (true) {
      try {
        const response = await fetch(url, {
          ...restOptions,
          headers: {
            ...defaultHeaders,
            ...headers,
          },
        })

        // Xử lý lỗi HTTP (4xx, 5xx)
        if (!response.ok) {
          // Nếu bị giới hạn tần suất (429) và chưa quá số lần thử lại
          if (response.status === 429 && attempts < maxAttempts - 1) {
            attempts++
            
            // Đọc header Retry-After (đơn vị giây)
            const retryAfterHeader = response.headers.get("Retry-After")
            let delay = Math.pow(2, attempts) * 1000 + Math.random() * 1000 // Mặc định exponential backoff
            if (retryAfterHeader) {
              const seconds = parseInt(retryAfterHeader, 10)
              if (!isNaN(seconds) && seconds > 0) {
                delay = seconds * 1000 + 500
                console.warn(`[API Client] Rate limit hit (429). Server requested Retry-After: ${seconds}s. Waiting before retry ${attempts}/${maxAttempts}...`)
              } else {
                console.warn(`[API Client] Rate limit hit (429). Retry-After header found but invalid. Retrying in ${Math.round(delay)}ms...`)
              }
            } else {
              console.warn(`[API Client] Rate limit hit (429). Retrying in ${Math.round(delay)}ms...`)
            }

            await new Promise((resolve) => setTimeout(resolve, delay))

            // Thử đọc lại từ cache đĩa, có thể một worker thread khác đã lấy thành công và ghi file rồi
            if (isGet && isServer) {
              const cachedData = await readFromDiskCache(url)
              if (cachedData !== null) {
                return cachedData as T
              }
            }
            continue // Thử lại request fetch
          }

          let errorData: unknown = null
          try {
            errorData = await response.json()
          } catch {
            // Bỏ qua nếu response không phải JSON
          }

          const errorObj = errorData as { message?: string } | null
          const errorMessage =
            errorObj?.message || `Lỗi kết nối HTTP! Mã lỗi: ${response.status}`

          throw new HttpError(response.status, errorMessage, errorData)
        }

        // Trả về dữ liệu JSON
        const data = await response.json()

        // Lưu cache ra đĩa cứng nếu chạy ở server
        if (isGet && isServer) {
          await writeToDiskCache(url, data)
        }

        return data as T
      } catch (error) {
        // Dự phòng cho lỗi quăng ra ngoài
        if (error instanceof HttpError && error.status === 429 && attempts < maxAttempts - 1) {
          attempts++
          const delay = Math.pow(2, attempts) * 1000 + Math.random() * 1000
          console.warn(`[API Client] Caught rate limit error (429). Retrying in ${Math.round(delay)}ms...`)
          await new Promise((resolve) => setTimeout(resolve, delay))
          if (isGet && isServer) {
            const cachedData = await readFromDiskCache(url)
            if (cachedData !== null) {
              return cachedData as T
            }
          }
          continue
        }

        // Nếu có lỗi mạng hoặc lỗi HTTP thực sự, xóa khỏi cache để các yêu cầu tiếp theo có thể thử lại
        if (isGet) {
          getCache.delete(url)
        }
        if (error instanceof HttpError) {
          throw error
        }
        // Lỗi mạng hoặc lỗi cấu hình fetch, đính kèm cause gốc để thoả mãn linter
        throw new Error(
          error instanceof Error ? error.message : "Đã xảy ra lỗi kết nối mạng",
          { cause: error }
        )
      }
    }
  })()

  // Lưu vào cache đối với yêu cầu GET
  if (isGet) {
    getCache.set(url, promise)
    
    // Nếu trong môi trường phát triển (development), tự động xóa cache sau khi hoàn thành 2 giây 
    // để tránh lưu quá lâu, hỗ trợ lập trình viên khi bấm F5 reload để lấy dữ liệu mới
    const isProd = import.meta.env.PROD
    if (!isProd) {
      promise.finally(() => {
        setTimeout(() => {
          getCache.delete(url)
        }, 2000)
      })
    }
  }

  return promise
}

/**
 * Đối tượng API xuất bản các phương thức GET, POST, PUT, DELETE, PATCH
 */
export const api = {
  get: <T>(
    endpoint: string,
    options?: Omit<RequestOptions, "method" | "body">
  ) => request<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(
    endpoint: string,
    body?: unknown,
    options?: Omit<RequestOptions, "method" | "body">
  ) =>
    request<T>(endpoint, {
      ...options,
      method: "POST",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }),

  put: <T>(
    endpoint: string,
    body?: unknown,
    options?: Omit<RequestOptions, "method" | "body">
  ) =>
    request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }),

  patch: <T>(
    endpoint: string,
    body?: unknown,
    options?: Omit<RequestOptions, "method" | "body">
  ) =>
    request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(
    endpoint: string,
    options?: Omit<RequestOptions, "method" | "body">
  ) => request<T>(endpoint, { ...options, method: "DELETE" }),
}
