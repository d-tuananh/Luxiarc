import { api } from "@/utils/api"
import { API_ROUTES } from "@/constants/apiRoutes"
import type { ApiResponse, ModuleData, ListQueryParams } from "@/types/api"
import type {
  Banner,
  Testimonial,
  Highlight,
  WhyChooseUsItem,
  FAQ,
  HomeConfig,
} from "./types"

/**
 * Lấy danh sách banner trang chủ đang hoạt động từ API
 */
export async function getBanners(params?: ListQueryParams): Promise<Banner[]> {
  try {
    const response = await api.get<ApiResponse<ModuleData<Banner>>>(
      API_ROUTES.DISPLAY.BANNERS,
      {
        params: {
          act: 1, // Chỉ lấy các banner đang hoạt động
          sort_by: "ord",
          sort_dir: "asc",
          ...params,
        },
      }
    )
    return response.data.items
  } catch (error) {
    console.error("Lỗi khi tải banners từ API:", error)
    return []
  }
}

/**
 * Lấy danh sách cảm nhận khách hàng đang hoạt động từ API
 */
export async function getTestimonials(
  params?: ListQueryParams
): Promise<Testimonial[]> {
  try {
    const response = await api.get<ApiResponse<ModuleData<Testimonial>>>(
      API_ROUTES.DISPLAY.TESTIMONIALS,
      {
        params: {
          act: 1, // Chỉ lấy cảm nhận đang hoạt động
          sort_by: "ord",
          sort_dir: "asc",
          ...params,
        },
      }
    )
    return response.data.items
  } catch (error) {
    console.error("Lỗi khi tải testimonials từ API:", error)
    return []
  }
}

/**
 * Lấy danh sách điểm nhấn khách hàng đang hoạt động từ API
 */
export async function getHighlights(
  params?: ListQueryParams
): Promise<Highlight[]> {
  try {
    const response = await api.get<ApiResponse<ModuleData<Highlight>>>(
      API_ROUTES.DISPLAY.HIGHLIGHTS,
      {
        params: {
          act: 1, // Chỉ lấy các điểm nhấn đang hoạt động
          sort_by: "ord",
          sort_dir: "asc",
          ...params,
        },
      }
    )
    return response.data.items
  } catch (error) {
    console.error("Lỗi khi tải highlights từ API:", error)
    return []
  }
}

/**
 * Lấy danh sách lý do chọn chúng tôi từ API
 */
export async function getWhyChooseUsItems(
  params?: ListQueryParams
): Promise<WhyChooseUsItem[]> {
  try {
    const response = await api.get<ApiResponse<ModuleData<WhyChooseUsItem>>>(
      API_ROUTES.DISPLAY.WHY_CHOOSE_US,
      {
        params: {
          act: 1, // Chỉ lấy các lý do đang hoạt động
          sort_by: "ord",
          sort_dir: "asc",
          ...params,
        },
      }
    )
    return response.data.items
  } catch (error) {
    console.error("Lỗi khi tải why-choose-us từ API:", error)
    return []
  }
}

/**
 * Lấy danh sách các câu hỏi thường gặp (FAQs) từ API
 */
export async function getFAQs(params?: ListQueryParams): Promise<FAQ[]> {
  try {
    const response = await api.get<ApiResponse<ModuleData<FAQ>>>(
      API_ROUTES.DISPLAY.FAQS,
      {
        params: {
          act: 1, // Chỉ lấy câu hỏi đang hoạt động
          sort_by: "ord",
          sort_dir: "asc",
          ...params,
        },
      }
    )
    return response.data.items
  } catch (error) {
    console.error("Lỗi khi tải faqs từ API:", error)
    return []
  }
}

/**
 * Lấy cấu hình trang chủ (Home Config) từ API
 */
export async function getHomeConfig(): Promise<HomeConfig | null> {
  try {
    const response = await api.get<ApiResponse<HomeConfig>>(
      API_ROUTES.CONFIG.HOME
    )
    return response.data
  } catch (error) {
    console.error("Lỗi khi tải home config từ API:", error)
    return null
  }
}
