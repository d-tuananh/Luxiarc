import { api } from "@/utils/api"
import { API_ROUTES } from "@/constants/apiRoutes"
import { PAGE_SLUGS } from "@/constants/pageSlugs"
import type { ApiResponse, ListQueryParams } from "@/types/api"
import type { InteriorPage, InteriorItem } from "./types"

interface PageResponseData {
  module: string
  module_label: string
  page: InteriorPage
}

interface ItemsResponseData {
  module: string
  module_label: string
  page: InteriorPage
  items: InteriorItem[]
}

interface ItemResponseData {
  module: string
  module_label: string
  page: InteriorPage
  item: InteriorItem
}

/**
 * Lấy thông tin cấu hình chi tiết trang Nội thất sau xây từ API
 */
export async function getInteriorPageDetails(
  pageSlug: string = PAGE_SLUGS.INTERIOR
): Promise<InteriorPage | null> {
  try {
    const response = await api.get<ApiResponse<PageResponseData>>(
      API_ROUTES.INTERIOR.PAGE(pageSlug)
    )
    return response.data.page
  } catch (error) {
    console.error(
      `Lỗi khi tải chi tiết trang Interior ${pageSlug} từ API:`,
      error
    )
    return null
  }
}

/**
 * Lấy danh sách các bài viết con thuộc trang Nội thất sau xây từ API
 */
export async function getInteriorItems(
  pageSlug: string = PAGE_SLUGS.INTERIOR,
  params?: ListQueryParams
): Promise<InteriorItem[]> {
  try {
    const response = await api.get<ApiResponse<ItemsResponseData>>(
      API_ROUTES.INTERIOR.ITEMS(pageSlug),
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
      `Lỗi khi tải danh sách Interior Items thuộc trang ${pageSlug} từ API:`,
      error
    )
    return []
  }
}

/**
 * Lấy chi tiết một bài viết nội thất theo slug từ API
 */
export async function getInteriorItemDetail(
  itemSlug: string
): Promise<InteriorItem | null> {
  try {
    const response = await api.get<ApiResponse<ItemResponseData>>(
      API_ROUTES.INTERIOR.DETAIL(itemSlug)
    )
    return response.data.item
  } catch (error) {
    console.error(`Lỗi khi tải chi tiết Interior Item ${itemSlug} từ API:`, error)
    return null
  }
}
