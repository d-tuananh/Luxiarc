import { api } from "@/utils/api"
import { API_ROUTES } from "@/constants/apiRoutes"
import { PAGE_SLUGS } from "@/constants/pageSlugs"
import type { ApiResponse, ListQueryParams } from "@/types/api"
import type { FinishPage, FinishItem } from "./types"

interface PageResponseData {
  module: string
  module_label: string
  page: FinishPage
}

interface ItemsResponseData {
  module: string
  module_label: string
  page: FinishPage
  items: FinishItem[]
}

interface ItemResponseData {
  module: string
  module_label: string
  page: FinishPage
  item: FinishItem
}

/**
 * Lấy thông tin cấu hình chi tiết trang Hoàn thiện từ API
 */
export async function getFinishPageDetails(
  pageSlug: string = PAGE_SLUGS.FINISH
): Promise<FinishPage | null> {
  try {
    const response = await api.get<ApiResponse<PageResponseData>>(
      API_ROUTES.FINISH.PAGE(pageSlug)
    )
    return response.data.page
  } catch (error) {
    console.error(`Lỗi khi tải chi tiết trang Finish ${pageSlug} từ API:`, error)
    return null
  }
}

/**
 * Lấy danh sách các bài viết con thuộc trang Hoàn thiện từ API
 */
export async function getFinishItems(
  pageSlug: string = PAGE_SLUGS.FINISH,
  params?: ListQueryParams
): Promise<FinishItem[]> {
  try {
    const response = await api.get<ApiResponse<ItemsResponseData>>(
      API_ROUTES.FINISH.ITEMS(pageSlug),
      {
        params: {
          act: 1,
          sort_by: "ord",
          sort_dir: "asc",
          ...params,
        },
      }
    )
    return response.data.items || []
  } catch (error) {
    console.error(
      `Lỗi khi tải danh sách Finish Items thuộc trang ${pageSlug} từ API:`,
      error
    )
    return []
  }
}

/**
 * Lấy chi tiết một bài viết hoàn thiện theo slug từ API
 */
export async function getFinishItemDetail(
  itemSlug: string
): Promise<FinishItem | null> {
  try {
    const response = await api.get<ApiResponse<ItemResponseData>>(
      API_ROUTES.FINISH.DETAIL(itemSlug)
    )
    return response.data.item
  } catch (error) {
    console.error(`Lỗi khi tải chi tiết Finish Item ${itemSlug} từ API:`, error)
    return null
  }
}
