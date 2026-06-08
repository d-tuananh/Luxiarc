import { api } from "@/utils/api"
import { API_ROUTES } from "@/constants/apiRoutes"
import { PAGE_SLUGS } from "@/constants/pageSlugs"
import type { ApiResponse } from "@/types/api"
import type { MaintenancePage, MaintenanceItem } from "./types"

interface PageResponseData {
  module: string
  module_label: string
  page: MaintenancePage
}

interface ItemsResponseData {
  module: string
  module_label: string
  page: MaintenancePage
  items: MaintenanceItem[]
}

interface ItemResponseData {
  module: string
  module_label: string
  page: MaintenancePage
  item: MaintenanceItem
}

/**
 * Lấy thông tin cấu hình chi tiết trang Bảo trì từ API
 */
export async function getMaintenancePageDetails(
  pageSlug: string = PAGE_SLUGS.MAINTENANCE
): Promise<MaintenancePage | null> {
  try {
    const response = await api.get<ApiResponse<PageResponseData>>(
      API_ROUTES.MAINTENANCE.PAGE(pageSlug)
    )
    return response.data.page
  } catch (error) {
    console.error(
      `Lỗi khi tải chi tiết trang Maintenance ${pageSlug} từ API:`,
      error
    )
    return null
  }
}

/**
 * Lấy danh sách các bài viết thuộc trang Bảo trì từ API
 */
export async function getMaintenanceItems(
  pageSlug: string = PAGE_SLUGS.MAINTENANCE
): Promise<MaintenanceItem[]> {
  try {
    const response = await api.get<ApiResponse<ItemsResponseData>>(
      API_ROUTES.MAINTENANCE.ITEMS(pageSlug),
      {
        params: {
          act: 1, // Chỉ lấy các item đang hoạt động
          sort_by: "ord",
          sort_dir: "asc",
        },
      }
    )
    return response.data.items || []
  } catch (error) {
    console.error(
      `Lỗi khi tải danh sách Maintenance Items thuộc trang ${pageSlug} từ API:`,
      error
    )
    return []
  }
}

/**
 * Lấy chi tiết một bài viết bảo trì theo slug từ API
 */
export async function getMaintenanceItemDetail(
  itemSlug: string
): Promise<MaintenanceItem | null> {
  try {
    const response = await api.get<ApiResponse<ItemResponseData>>(
      API_ROUTES.MAINTENANCE.DETAIL(itemSlug)
    )
    return response.data.item
  } catch (error) {
    console.error(
      `Lỗi khi tải chi tiết Maintenance Item ${itemSlug} từ API:`,
      error
    )
    return null
  }
}
