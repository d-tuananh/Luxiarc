import { api } from "@/utils/api"
import { API_ROUTES } from "@/constants/apiRoutes"
import { PAGE_SLUGS } from "@/constants/pageSlugs"
import type { ApiResponse } from "@/types/api"
import type { AcceptancePage, AcceptanceItem } from "./types"

interface PageResponseData {
  module: string
  module_label: string
  page: AcceptancePage
}

interface ItemsResponseData {
  module: string
  module_label: string
  page: AcceptancePage
  items: AcceptanceItem[]
}

interface ItemResponseData {
  module: string
  module_label: string
  page: AcceptancePage
  item: AcceptanceItem
}

/**
 * Lấy thông tin cấu hình chi tiết trang Nghiệm thu từ API
 */
export async function getAcceptancePageDetails(
  pageSlug: string = PAGE_SLUGS.ACCEPTANCE
): Promise<AcceptancePage | null> {
  try {
    const response = await api.get<ApiResponse<PageResponseData>>(
      API_ROUTES.ACCEPTANCE.PAGE(pageSlug)
    )
    return response.data.page
  } catch (error) {
    console.error(
      `Lỗi khi tải chi tiết trang Acceptance ${pageSlug} từ API:`,
      error
    )
    return null
  }
}

/**
 * Lấy danh sách các bài viết con thuộc trang Nghiệm thu từ API
 */
export async function getAcceptanceItems(
  pageSlug: string = PAGE_SLUGS.ACCEPTANCE
): Promise<AcceptanceItem[]> {
  try {
    const response = await api.get<ApiResponse<ItemsResponseData>>(
      API_ROUTES.ACCEPTANCE.ITEMS(pageSlug),
      {
        params: {
          act: 1,
          sort_by: "ord",
          sort_dir: "asc",
        },
      }
    )
    return response.data.items || []
  } catch (error) {
    console.error(
      `Lỗi khi tải danh sách Acceptance Items thuộc trang ${pageSlug} từ API:`,
      error
    )
    return []
  }
}

/**
 * Lấy chi tiết một bài viết nghiệm thu theo slug từ API
 */
export async function getAcceptanceItemDetail(
  itemSlug: string
): Promise<AcceptanceItem | null> {
  try {
    const response = await api.get<ApiResponse<ItemResponseData>>(
      API_ROUTES.ACCEPTANCE.DETAIL(itemSlug)
    )
    return response.data.item
  } catch (error) {
    console.error(
      `Lỗi khi tải chi tiết Acceptance Item ${itemSlug} từ API:`,
      error
    )
    return null
  }
}
