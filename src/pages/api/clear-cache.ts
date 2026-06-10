import type { APIRoute } from "astro"
import fs from "node:fs"
import path from "node:path"

// API Endpoint để xóa cache (sẽ chạy động nếu cấu hình SSR/Hybrid adapter, hoặc chạy ở build time nếu cấu hình Static)

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url)
  const token = url.searchParams.get("token")
  // Đọc mã bảo mật từ biến môi trường hoặc dùng mặc định
  const secretToken = import.meta.env.CLEAR_CACHE_TOKEN || "luxiarc-cache-clear-key"

  if (token !== secretToken) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Unauthorized. Invalid token.",
      }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    )
  }

  const cacheDir = path.join(process.cwd(), ".api-cache")

  if (fs.existsSync(cacheDir)) {
    try {
      fs.rmSync(cacheDir, { recursive: true, force: true })
      return new Response(
        JSON.stringify({
          success: true,
          message: "API cache folder (.api-cache) cleared successfully.",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      )
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err)
      return new Response(
        JSON.stringify({
          success: false,
          message: `Error clearing cache: ${errMsg}`,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      )
    }
  }

  return new Response(
    JSON.stringify({
      success: true,
      message: "No cache folder found. Cache is already empty.",
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  )
}

// Hỗ trợ cả phương thức POST để dễ dàng tích hợp với các Webhook của CMS
export const POST = GET
