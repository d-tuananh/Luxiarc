/**
 * Cấu trúc phản hồi chung từ API (Generic API Response Wrapper)
 */
export interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

/**
 * Cấu trúc dữ liệu chi tiết của một Module (ví dụ: Banners, News, v.v.)
 */
export interface ModuleData<T> {
  module: string
  module_label: string
  filters: ModuleFilters
  pagination: Pagination
  items: T[]
  device: DeviceInfo
}

/**
 * Bộ lọc tìm kiếm & truy vấn dữ liệu (Filters)
 */
export interface ModuleFilters {
  q: string | null
  slug: string | null
  act: string | null
  ids: (string | number)[]
  include_inactive: boolean
  sort_by: string | null
  sort_dir: "asc" | "desc" | null
}

/**
 * Phân trang dữ liệu (Pagination)
 */
export interface Pagination {
  current_page: number
  per_page: number
  total: number
  last_page: number
  from: number
  to: number
  has_more: boolean
}

/**
 * Thông tin thiết bị & yêu cầu từ client (DeviceInfo)
 */
export interface DeviceInfo {
  client_type: string
  platform: string
  device_id: string | null
  device_name: string | null
  app_version: string | null
  build_number: string | number | null
  push_token: string | null
  ip_address: string
  user_agent: string
  source: string
}

/**
 * Danh sách toàn bộ các loại tài nguyên (Resource Types) từ hệ thống API
 */
export type ResourceType =
  | "news"
  | "news_categories"
  | "service_items"
  | "service_pages"
  | "cost_items"
  | "cost_pages"
  | "knowledge_items"
  | "knowledge_pages"
  | "contractor_items"
  | "contractor_pages"
  | "maintenance_items"
  | "maintenance_pages"
  | "page_statics"
  | "finish_items"
  | "finish_pages"
  | "acceptance_items"
  | "acceptance_pages"
  | "interior_items"
  | "interior_pages"
  | "construction_items"
  | "construction_pages"
  | "materials_items"
  | "materials_pages"

/**
 * Tham số truy vấn danh sách (List Query Parameters)
 * @note: Các tham số này tuân theo chuẩn của API backend
 */
export interface ListQueryParams {
  page?: number
  per_page?: number
  q?: string
  ids?: string
  slug?: string
  act?: number
  include_inactive?: boolean
  sort_by?: string
  sort_dir?: "asc" | "desc"
  limit?: number
}
