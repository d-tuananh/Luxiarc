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

/**
 * Hàm gọi request gốc dùng fetch
 */
async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { params, headers, ...restOptions } = options

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

  // Tiêu đề mặc định
  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  }

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
      let errorData: unknown = null
      try {
        errorData = await response.json()
      } catch {
        // Bỏ qua nếu response không phải JSON
      }

      const errorObj = errorData as { message?: string } | null
      const errorMessage = errorObj?.message || `Lỗi kết nối HTTP! Mã lỗi: ${response.status}`

      throw new HttpError(
        response.status,
        errorMessage,
        errorData
      )
    }

    // Trả về dữ liệu JSON
    const data = await response.json()
    return data as T
  } catch (error) {
    if (error instanceof HttpError) {
      throw error
    }
    // Lỗi mạng hoặc lỗi cấu hình fetch, đính kèm cause gốc để thoả mãn linter
    throw new Error(error instanceof Error ? error.message : "Đã xảy ra lỗi kết nối mạng", { cause: error })
  }
}

/**
 * Đối tượng API xuất bản các phương thức GET, POST, PUT, DELETE, PATCH
 */
export const api = {
  get: <T>(endpoint: string, options?: Omit<RequestOptions, "method" | "body">) =>
    request<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, "method" | "body">) =>
    request<T>(endpoint, {
      ...options,
      method: "POST",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }),

  put: <T>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, "method" | "body">) =>
    request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }),

  patch: <T>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, "method" | "body">) =>
    request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(endpoint: string, options?: Omit<RequestOptions, "method" | "body">) =>
    request<T>(endpoint, { ...options, method: "DELETE" }),
}
