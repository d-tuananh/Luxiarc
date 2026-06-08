import { api } from "@/utils/api"
import { API_ROUTES } from "@/constants/apiRoutes"
import { PAGE_SLUGS } from "@/constants/pageSlugs"
import type { ApiResponse } from "@/types/api"
import type { MaterialsPage, MaterialsItem } from "./types"

interface PageResponseData {
  module: string
  module_label: string
  page: MaterialsPage
}

interface ItemsResponseData {
  module: string
  module_label: string
  page: MaterialsPage
  items: MaterialsItem[]
}

interface ItemResponseData {
  module: string
  module_label: string
  page: MaterialsPage
  item: MaterialsItem
}

/**
 * Lấy thông tin cấu hình chi tiết trang Vật liệu xây dựng từ API
 */
export async function getMaterialsPageDetails(
  pageSlug: string = PAGE_SLUGS.MATERIALS
): Promise<MaterialsPage | null> {
  try {
    const response = await api.get<ApiResponse<PageResponseData>>(
      API_ROUTES.MATERIALS.PAGE(pageSlug)
    )
    return response.data.page
  } catch (error) {
    console.error(
      `Lỗi khi tải chi tiết trang Materials ${pageSlug} từ API:`,
      error
    )
    return null
  }
}

/**
 * Lấy danh sách các bài viết con thuộc trang Vật liệu xây dựng từ API
 */
export async function getMaterialsItems(
  pageSlug: string = PAGE_SLUGS.MATERIALS
): Promise<MaterialsItem[]> {
  try {
    const response = await api.get<ApiResponse<ItemsResponseData>>(
      API_ROUTES.MATERIALS.ITEMS(pageSlug),
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
      `Lỗi khi tải danh sách Materials Items thuộc trang ${pageSlug} từ API:`,
      error
    )
    return []
  }
}

/**
 * Lấy chi tiết một bài viết vật liệu xây dựng theo slug từ API
 */
export async function getMaterialsItemDetail(
  itemSlug: string
): Promise<MaterialsItem | null> {
  try {
    const response = await api.get<ApiResponse<ItemResponseData>>(
      API_ROUTES.MATERIALS.DETAIL(itemSlug)
    )
    return response.data.item
  } catch (error) {
    console.error(
      `Lỗi khi tải chi tiết Materials Item ${itemSlug} từ API:`,
      error
    )
    return null
  }
}
