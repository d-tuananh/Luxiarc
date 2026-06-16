import { api } from "@/utils/api"
import { API_ROUTES } from "@/constants/apiRoutes"
import { PAGE_SLUGS } from "@/constants/pageSlugs"
import type { ApiResponse, ListQueryParams } from "@/types/api"
import type { TechnicalPage, TechnicalItem } from "./types"

interface PageResponseData {
  module: string
  module_label: string
  page: TechnicalPage
}

interface ItemsResponseData {
  module: string
  module_label: string
  page: TechnicalPage
  items: TechnicalItem[]
}

interface ItemResponseData {
  module: string
  module_label: string
  page: TechnicalPage
  item: TechnicalItem
}

/**
 * Lấy thông tin cấu hình chi tiết trang Kỹ thuật từ API
 */
export async function getTechnicalPageDetails(
  pageSlug: string = PAGE_SLUGS.TECHNICAL
): Promise<TechnicalPage | null> {
  try {
    const response = await api.get<ApiResponse<PageResponseData>>(
      API_ROUTES.SYSTEMS.PAGE(pageSlug)
    )
    return response.data?.page || null
  } catch (error) {
    console.error("Lỗi khi tải chi tiết trang Technical từ API:", error)
    return null
  }
}

/**
 * Lấy danh sách các danh mục kỹ thuật chi tiết từ API
 */
export async function getTechnicalItems(
  pageSlug: string = PAGE_SLUGS.TECHNICAL,
  params?: ListQueryParams
): Promise<TechnicalItem[]> {
  try {
    const response = await api.get<ApiResponse<ItemsResponseData>>(
      API_ROUTES.SYSTEMS.ITEMS(pageSlug),
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
      resource_type: "technical_items",
    }))
  } catch (error) {
    console.error("Lỗi khi tải danh sách Technical Items từ API:", error)
    return []
  }
}

/**
 * Lấy thông tin chi tiết một danh mục kỹ thuật theo slug từ API
 */
export async function getTechnicalItemDetail(
  slug: string
): Promise<TechnicalItem | null> {
  try {
    const response = await api.get<ApiResponse<ItemResponseData>>(
      API_ROUTES.SYSTEMS.DETAIL(slug)
    )
    if (response.data?.item) {
      return {
        ...response.data.item,
        resource_type: "technical_items",
      }
    }
    return null
  } catch (error) {
    console.error(`Lỗi khi tải chi tiết Technical Item ${slug} từ API:`, error)
    return null
  }
}
