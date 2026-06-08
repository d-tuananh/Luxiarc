import { api } from "@/utils/api"
import { API_ROUTES } from "@/constants/apiRoutes"
import { PAGE_SLUGS } from "@/constants/pageSlugs"
import type { ApiResponse, ListQueryParams } from "@/types/api"
import type { CostsPage, CostsItem } from "./types"

interface PageResponseData {
  module: string
  module_label: string
  page: CostsPage
}

interface ItemsResponseData {
  module: string
  module_label: string
  page: CostsPage
  items: CostsItem[]
}

/**
 * Lấy thông tin cấu hình chi tiết trang Chi phí từ API
 */
export async function getCostsPageDetails(
  pageSlug: string = PAGE_SLUGS.COSTS
): Promise<CostsPage | null> {
  try {
    const response = await api.get<ApiResponse<PageResponseData>>(
      API_ROUTES.COSTS.PAGE(pageSlug)
    )
    return response.data.page
  } catch (error) {
    console.error("Lỗi khi tải chi tiết trang Costs từ API:", error)
    return null
  }
}

/**
 * Lấy danh sách các danh mục báo giá chi tiết của trang Chi phí từ API
 */
export async function getCostsItems(
  pageSlug: string = PAGE_SLUGS.COSTS,
  params?: ListQueryParams
): Promise<CostsItem[]> {
  try {
    const response = await api.get<ApiResponse<ItemsResponseData>>(
      API_ROUTES.COSTS.ITEMS(pageSlug),
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
    console.error("Lỗi khi tải danh sách Costs Items từ API:", error)
    return []
  }
}

interface ItemResponseData {
  module: string
  module_label: string
  page: CostsPage
  item: CostsItem
}

/**
 * Lấy thông tin chi tiết một danh mục báo giá theo itemId từ API
 */
export async function getCostsItemDetail(
  pageSlug: string
): Promise<CostsItem | null> {
  try {
    const response = await api.get<ApiResponse<ItemResponseData>>(
      API_ROUTES.COSTS.DETAIL(pageSlug)
    )
    return response.data.item
  } catch (error) {
    console.error(`Lỗi khi tải chi tiết Costs Item ${pageSlug} từ API:`, error)
    return null
  }
}
