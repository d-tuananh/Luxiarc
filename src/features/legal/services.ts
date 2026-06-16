import { api } from "@/utils/api"
import { API_ROUTES } from "@/constants/apiRoutes"
import { PAGE_SLUGS } from "@/constants/pageSlugs"
import type { ApiResponse, ListQueryParams } from "@/types/api"
import type { LegalPage, LegalItem } from "./types"

interface PageResponseData {
  module: string
  module_label: string
  page: LegalPage
}

interface ItemsResponseData {
  module: string
  module_label: string
  page: LegalPage
  items: LegalItem[]
}

interface ItemResponseData {
  module: string
  module_label: string
  page: LegalPage
  item: LegalItem
}

/**
 * Lấy thông tin cấu hình chi tiết trang Pháp lý từ API
 */
export async function getLegalPageDetails(
  pageSlug: string = PAGE_SLUGS.LEGAL
): Promise<LegalPage | null> {
  try {
    const response = await api.get<ApiResponse<PageResponseData>>(
      API_ROUTES.LEGALS.PAGE(pageSlug)
    )
    return response.data?.page || null
  } catch (error) {
    console.error("Lỗi khi tải chi tiết trang Legal từ API:", error)
    return null
  }
}

/**
 * Lấy danh sách các danh mục pháp lý chi tiết từ API
 */
export async function getLegalItems(
  pageSlug: string = PAGE_SLUGS.LEGAL,
  params?: ListQueryParams
): Promise<LegalItem[]> {
  try {
    const response = await api.get<ApiResponse<ItemsResponseData>>(
      API_ROUTES.LEGALS.ITEMS(pageSlug),
      {
        params: {
          act: 1, // Chỉ lấy các item đang hoạt động
          sort_by: "ord",
          sort_dir: "asc",
          ...params,
        },
      }
    )
    const items = response.data?.items || []
    return items.map((item) => ({
      ...item,
      resource_type: "legal_items",
    }))
  } catch (error) {
    console.error("Lỗi khi tải danh sách Legal Items từ API:", error)
    return []
  }
}

/**
 * Lấy thông tin chi tiết một danh mục pháp lý theo slug từ API
 */
export async function getLegalItemDetail(
  slug: string
): Promise<LegalItem | null> {
  try {
    const response = await api.get<ApiResponse<ItemResponseData>>(
      API_ROUTES.LEGALS.DETAIL(slug)
    )
    if (response.data?.item) {
      return {
        ...response.data.item,
        resource_type: "legal_items",
      }
    }
    return null
  } catch (error) {
    console.error(`Lỗi khi tải chi tiết Legal Item ${slug} từ API:`, error)
    return null
  }
}
