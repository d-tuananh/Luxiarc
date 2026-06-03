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

