import { api } from "@/utils/api"
import { API_ROUTES } from "@/constants/apiRoutes"
import type { ApiResponse } from "@/types/api"
import type { NewsCategory, NewsItem } from "./types"

interface NewsCategoriesResponse {
  module: string
  module_label: string
  items: NewsCategory[]
}

interface NewsItemsResponse {
  module: string
  module_label: string
  items: NewsItem[]
}

interface NewsItemDetailResponse {
  module: string
  module_label: string
  item: NewsItem
}

interface NewsCategoryDetailResponse {
  module: string
  module_label: string
  item: NewsCategory
}

/**
 * Lấy danh sách toàn bộ danh mục tin tức hoạt động
 */
export async function getNewsCategories(): Promise<NewsCategory[]> {
  try {
    const response = await api.get<ApiResponse<NewsCategoriesResponse>>(
      API_ROUTES.NEWS.CATEGORIES,
      {
        params: {
          act: 1,
        },
      }
    )
    return response.data.items || []
  } catch (error) {
    console.error("Lỗi khi tải danh sách danh mục tin tức:", error)
    return []
  }
}

/**
 * Lấy chi tiết một danh mục tin tức theo slug
 */
export async function getNewsCategoryDetail(
  categorySlug: string
): Promise<NewsCategory | null> {
  try {
    const response = await api.get<ApiResponse<NewsCategoryDetailResponse>>(
      API_ROUTES.NEWS.CATEGORY_DETAIL(categorySlug)
    )
    return response.data.item || null
  } catch (error) {
    console.error(`Lỗi khi tải chi tiết danh mục tin tức ${categorySlug}:`, error)
    return null
  }
}

/**
 * Lấy danh sách bài viết thuộc một danh mục tin tức theo slug
 */
export async function getNewsItemsByCategory(
  categorySlug: string
): Promise<NewsItem[]> {
  try {
    const response = await api.get<ApiResponse<NewsItemsResponse>>(
      API_ROUTES.NEWS.CATEGORY_ITEMS(categorySlug)
    )
    return response.data.items || []
  } catch (error) {
    console.error(`Lỗi khi tải bài viết thuộc danh mục ${categorySlug}:`, error)
    return []
  }
}

/**
 * Lấy danh sách toàn bộ bài viết hoạt động
 */
export async function getNewsItems(params?: {
  act?: number
  hot?: number
  home?: number
  limit?: number
}): Promise<NewsItem[]> {
  try {
    const response = await api.get<ApiResponse<NewsItemsResponse>>(
      API_ROUTES.NEWS.ITEMS,
      {
        params: {
          act: 1,
          ...params,
        },
      }
    )
    return response.data.items || []
  } catch (error) {
    console.error("Lỗi khi tải danh sách bài viết tin tức:", error)
    return []
  }
}

/**
 * Lấy chi tiết một bài viết tin tức theo slug
 */
export async function getNewsItemDetail(
  itemSlug: string
): Promise<NewsItem | null> {
  try {
    const response = await api.get<ApiResponse<NewsItemDetailResponse>>(
      API_ROUTES.NEWS.DETAIL(itemSlug)
    )
    return response.data.item || null
  } catch (error) {
    console.error(`Lỗi khi tải chi tiết bài viết tin tức ${itemSlug}:`, error)
    return null
  }
}
