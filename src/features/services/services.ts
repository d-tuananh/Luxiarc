import { api } from "@/utils/api"
import { API_ROUTES } from "@/constants/apiRoutes"
import { PAGE_SLUGS } from "@/constants/pageSlugs"
import type { ApiResponse, ListQueryParams } from "@/types/api"
import type { ServicesPage, ServicesItem } from "./types"

interface PageResponseData {
  module: string
  module_label: string
  page: ServicesPage
}

interface ItemsResponseData {
  module: string
  module_label: string
  page: ServicesPage
  items: ServicesItem[]
}

interface ItemResponseData {
  module: string
  module_label: string
  page: ServicesPage
  item: ServicesItem
}

/**
 * Lấy thông tin cấu hình chi tiết trang Dịch vụ từ API
 */
export async function getServicesPageDetails(
  pageSlug: string = PAGE_SLUGS.SERVICES
): Promise<ServicesPage | null> {
  try {
    const response = await api.get<ApiResponse<PageResponseData>>(
      API_ROUTES.SERVICES.PAGE(pageSlug)
    )
    return response.data.page
  } catch (error) {
    console.error(
      `Lỗi khi tải chi tiết trang Services ${pageSlug} từ API:`,
      error
    )
    return null
  }
}

/**
 * Lấy danh sách các dịch vụ con thuộc trang Dịch vụ từ API
 */
export async function getServicesItems(
  pageSlug: string = PAGE_SLUGS.SERVICES,
  params?: ListQueryParams
): Promise<ServicesItem[]> {
  try {
    const response = await api.get<ApiResponse<ItemsResponseData>>(
      API_ROUTES.SERVICES.ITEMS(pageSlug),
      {
        params: {
          act: 1, // Chỉ lấy các item đang hoạt động
          sort_by: "ord",
          sort_dir: "asc",
          ...params,
        },
      }
    )
    return response.data.items || []
  } catch (error) {
    console.error(
      `Lỗi khi tải danh sách Services Items thuộc trang ${pageSlug} từ API:`,
      error
    )
    return []
  }
}

/**
 * Lấy chi tiết một bài viết dịch vụ theo slug từ API
 */
export async function getServicesItemDetail(
  itemSlug: string
): Promise<ServicesItem | null> {
  try {
    const response = await api.get<ApiResponse<ItemResponseData>>(
      API_ROUTES.SERVICES.DETAIL(itemSlug)
    )
    return response.data.item
  } catch (error) {
    console.error(
      `Lỗi khi tải chi tiết Services Item ${itemSlug} từ API:`,
      error
    )
    return null
  }
}
