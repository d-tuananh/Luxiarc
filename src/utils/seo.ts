/**
 * SEO Utilities cho dự án LuxiArc
 */

// Định nghĩa Site URL gốc, sử dụng giá trị cấu hình mặc định nếu không có env
export const SITE_URL = import.meta.env.SITE || "https://luxiarc.vn"

/**
 * Sinh ra đường dẫn URL tuyệt đối cho Canonical Tag
 * Đảm bảo loại bỏ trailing slash thừa và format đồng bộ
 */
export function getCanonicalURL(pathname: string): string {
  const cleanPathname = pathname.replace(/\/$/, "")
  return `${SITE_URL}${cleanPathname || "/"}`
}

/**
 * Tạo URL tuyệt đối cho các tài nguyên tĩnh như ảnh OG Image
 */
export function getAbsoluteURL(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`
  return `${SITE_URL}${cleanPath}`
}

/**
 * Sinh chuỗi slug sạch từ tiếng Việt (dùng khi lọc tag, category hoặc sinh slug thủ công)
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu tiếng Việt
    .replace(/[đĐ]/g, "d")
    .replace(/[^a-z0-9 -]/g, "") // Loại bỏ ký tự đặc biệt
    .replace(/\s+/g, "-") // Thay khoảng trắng bằng dấu gạch ngang
    .replace(/-+/g, "-") // Loại bỏ dấu gạch ngang liền nhau
    .trim()
}
