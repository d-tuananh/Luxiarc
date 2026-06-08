import { api } from "@/utils/api"
import { API_ROUTES } from "@/constants/apiRoutes"
import { PAGE_SLUGS } from "@/constants/pageSlugs"
import type { ApiResponse, ListQueryParams } from "@/types/api"
import type { ConstructionPage, ConstructionItem } from "./types"

interface PageResponseData {
  module: string
  module_label: string
  page: ConstructionPage
}

interface ItemsResponseData {
  module: string
  module_label: string
  page: ConstructionPage
  items: ConstructionItem[]
}

interface ItemResponseData {
  module: string
  module_label: string
  page: ConstructionPage
  item: ConstructionItem
}

/**
 * Lấy thông tin cấu hình chi tiết trang Thi công phần thô từ API
 */
export async function getConstructionPageDetails(
  pageSlug: string = PAGE_SLUGS.CONSTRUCTION
): Promise<ConstructionPage | null> {
  try {
    const response = await api.get<ApiResponse<PageResponseData>>(
      API_ROUTES.CONSTRUCTION.PAGE(pageSlug)
    )
    return response.data.page
  } catch (error) {
    console.error(
      `Lỗi khi tải chi tiết trang Construction ${pageSlug} từ API:`,
      error
    )
    return null
  }
}

/**
 * Lấy danh sách các bài viết con thuộc trang Thi công phần thô từ API
 */
export async function getConstructionItems(
  pageSlug: string = PAGE_SLUGS.CONSTRUCTION,
  params?: ListQueryParams
): Promise<ConstructionItem[]> {
  try {
    const response = await api.get<ApiResponse<ItemsResponseData>>(
      API_ROUTES.CONSTRUCTION.ITEMS(pageSlug),
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
      `Lỗi khi tải danh sách Construction Items thuộc trang ${pageSlug} từ API:`,
      error
    )
    return []
  }
}

/**
 * Lấy chi tiết một bài viết thi công theo slug từ API
 */
export async function getConstructionItemDetail(
  itemSlug: string
): Promise<ConstructionItem | null> {
  try {
    const response = await api.get<ApiResponse<ItemResponseData>>(
      API_ROUTES.CONSTRUCTION.DETAIL(itemSlug)
    )
    return response.data.item
  } catch (error) {
    console.error(
      `Lỗi khi tải chi tiết Construction Item ${itemSlug} từ API:`,
      error
    )
    return null
  }
}
