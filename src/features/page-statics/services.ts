import { api } from "@/utils/api"
import { API_ROUTES } from "@/constants/apiRoutes"
import type { ApiResponse, ListQueryParams } from "@/types/api"
import type { PageStatic, AboutConfig, ContactConfig } from "./types"

interface ListResponseData {
  module: string
  module_label: string
  items: PageStatic[]
}

interface DetailResponseData {
  module: string
  module_label: string
  page: PageStatic
}

/**
 * Lấy danh sách toàn bộ trang tĩnh từ API
 */
export async function getPageStaticsList(
  params?: ListQueryParams
): Promise<PageStatic[]> {
  try {
    const response = await api.get<ApiResponse<ListResponseData>>(
      API_ROUTES.PAGE_STATICS.LIST,
      {
        params: {
          act: 1, // Chỉ lấy các trang đang hoạt động
          ...params,
        },
      }
    )
    return response.data.items || []
  } catch (error) {
    console.error("Lỗi khi tải danh sách Page Statics từ API:", error)
    return []
  }
}

/**
 * Lấy chi tiết một trang tĩnh theo slug từ API
 */
export async function getPageStaticDetail(
  pageSlug: string
): Promise<PageStatic | null> {
  try {
    const response = await api.get<ApiResponse<DetailResponseData>>(
      API_ROUTES.PAGE_STATICS.DETAIL(pageSlug)
    )
    return response.data.page
  } catch (error) {
    console.error(`Lỗi khi tải chi tiết Page Static ${pageSlug} từ API:`, error)
    return null
  }
}

/**
 * Lấy cấu hình trang giới thiệu (About Config) từ API
 */
export async function getAboutConfig(): Promise<AboutConfig | null> {
  try {
    const response = await api.get<ApiResponse<AboutConfig>>(
      API_ROUTES.CONFIG.ABOUT
    )
    return response.data
  } catch (error) {
    console.error("Lỗi khi tải cấu hình About từ API:", error)
    return null
  }
}

/**
 * Lấy cấu hình trang liên hệ (Contact Config) từ API
 */
export async function getContactConfig(): Promise<ContactConfig | null> {
  try {
    const response = await api.get<ApiResponse<ContactConfig>>(
      API_ROUTES.CONFIG.CONTACT
    )
    return response.data
  } catch (error) {
    console.error("Lỗi khi tải cấu hình Contact từ API:", error)
    return null
  }
}
