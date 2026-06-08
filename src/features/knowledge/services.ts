import { api } from "@/utils/api"
import { API_ROUTES } from "@/constants/apiRoutes"
import { PAGE_SLUGS } from "@/constants/pageSlugs"
import type { ApiResponse, ListQueryParams } from "@/types/api"
import type { KnowledgePage, KnowledgeItem } from "./types"

interface PageResponseData {
  module: string
  module_label: string
  page: KnowledgePage
}

interface ItemsResponseData {
  module: string
  module_label: string
  page: KnowledgePage
  items: KnowledgeItem[]
}

interface ItemResponseData {
  module: string
  module_label: string
  page: KnowledgePage
  item: KnowledgeItem
}

/**
 * Lấy thông tin cấu hình chi tiết trang Tìm hiểu từ API
 */
export async function getKnowledgePageDetails(
  pageSlug: string = PAGE_SLUGS.KNOWLEDGE
): Promise<KnowledgePage | null> {
  try {
    const response = await api.get<ApiResponse<PageResponseData>>(
      API_ROUTES.KNOWLEDGE.PAGE(pageSlug)
    )
    return response.data.page
  } catch (error) {
    console.error(
      `Lỗi khi tải chi tiết trang Knowledge ${pageSlug} từ API:`,
      error
    )
    return null
  }
}

/**
 * Lấy danh sách các bài viết thuộc trang Tìm hiểu từ API
 */
export async function getKnowledgeItems(
  pageSlug: string = PAGE_SLUGS.KNOWLEDGE,
  params?: ListQueryParams
): Promise<KnowledgeItem[]> {
  try {
    const response = await api.get<ApiResponse<ItemsResponseData>>(
      API_ROUTES.KNOWLEDGE.ITEMS(pageSlug),
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
      `Lỗi khi tải danh sách Knowledge Items thuộc trang ${pageSlug} từ API:`,
      error
    )
    return []
  }
}

/**
 * Lấy chi tiết một bài viết tìm hiểu theo slug từ API
 */
export async function getKnowledgeItemDetail(
  itemSlug: string
): Promise<KnowledgeItem | null> {
  try {
    const response = await api.get<ApiResponse<ItemResponseData>>(
      API_ROUTES.KNOWLEDGE.DETAIL(itemSlug)
    )
    return response.data.item
  } catch (error) {
    console.error(
      `Lỗi khi tải chi tiết Knowledge Item ${itemSlug} từ API:`,
      error
    )
    return null
  }
}
