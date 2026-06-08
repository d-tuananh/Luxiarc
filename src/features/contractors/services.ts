import { api } from "@/utils/api"
import { API_ROUTES } from "@/constants/apiRoutes"
import { PAGE_SLUGS } from "@/constants/pageSlugs"
import type { ApiResponse, ListQueryParams } from "@/types/api"
import type { ContractorsPage, ContractorsItem } from "./types"

interface PageResponseData {
  module: string
  module_label: string
  page: ContractorsPage
}

interface ItemsResponseData {
  module: string
  module_label: string
  page: ContractorsPage
  items: ContractorsItem[]
}

interface ItemResponseData {
  module: string
  module_label: string
  page: ContractorsPage
  item: ContractorsItem
}

/**
 * Lấy thông tin cấu hình chi tiết trang Nhà thầu từ API
 */
export async function getContractorsPageDetails(
  pageSlug: string = PAGE_SLUGS.CONTRACTORS
): Promise<ContractorsPage | null> {
  try {
    const response = await api.get<ApiResponse<PageResponseData>>(
      API_ROUTES.CONTRACTORS.PAGE(pageSlug)
    )
    return response.data.page
  } catch (error) {
    console.error(
      `Lỗi khi tải chi tiết trang Contractors ${pageSlug} từ API:`,
      error
    )
    return null
  }
}

/**
 * Lấy danh sách các bài viết con thuộc trang Nhà thầu từ API
 */
export async function getContractorsItems(
  pageSlug: string = PAGE_SLUGS.CONTRACTORS,
  params?: ListQueryParams
): Promise<ContractorsItem[]> {
  try {
    const response = await api.get<ApiResponse<ItemsResponseData>>(
      API_ROUTES.CONTRACTORS.ITEMS(pageSlug),
      {
        params: {
          act: 1, // Chỉ lấy các bài viết đang hoạt động
          sort_by: "ord",
          sort_dir: "asc",
          ...params,
        },
      }
    )
    return response.data.items || []
  } catch (error) {
    console.error(
      `Lỗi khi tải danh sách Contractors Items thuộc trang ${pageSlug} từ API:`,
      error
    )
    return []
  }
}

/**
 * Lấy chi tiết bài viết của nhà thầu theo slug từ API
 */
export async function getContractorsItemDetail(
  itemSlug: string
): Promise<ContractorsItem | null> {
  try {
    const response = await api.get<ApiResponse<ItemResponseData>>(
      API_ROUTES.CONTRACTORS.DETAIL(itemSlug)
    )
    return response.data.item
  } catch (error) {
    console.error(
      `Lỗi khi tải chi tiết Contractors Item ${itemSlug} từ API:`,
      error
    )
    return null
  }
}
