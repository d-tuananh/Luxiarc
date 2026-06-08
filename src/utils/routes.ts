import { PAGE_SLUGS } from "@/constants/pageSlugs"
import type { ResourceType } from "@/types/api"

// Ánh xạ tiền tố của resource_type sang các slug cơ sở tương ứng
const RESOURCE_PREFIX_TO_SLUG: Record<string, string> = {
  service: PAGE_SLUGS.SERVICES,
  cost: PAGE_SLUGS.COSTS,
  knowledge: PAGE_SLUGS.KNOWLEDGE,
  contractor: PAGE_SLUGS.CONTRACTORS,
  maintenance: PAGE_SLUGS.MAINTENANCE,
  finish: PAGE_SLUGS.FINISH,
  acceptance: PAGE_SLUGS.ACCEPTANCE,
  interior: PAGE_SLUGS.INTERIOR,
  construction: PAGE_SLUGS.CONSTRUCTION,
  materials: PAGE_SLUGS.MATERIALS,
}

export const ROUTES = {
  HOME: "/",
  NEWS: {
    INDEX: `/${PAGE_SLUGS.NEWS}`,
    DETAIL: (slug: string) => `/${PAGE_SLUGS.NEWS}/${slug}`,
    CATEGORY: (slug: string) => `/${PAGE_SLUGS.NEWS}/danh-muc-tin-tuc/${slug}`,
  },
  SERVICES: {
    INDEX: `/${PAGE_SLUGS.SERVICES}`,
    DETAIL: (slug: string) => `/${PAGE_SLUGS.SERVICES}/${slug}`,
  },
  COSTS: {
    INDEX: `/${PAGE_SLUGS.COSTS}`,
    DETAIL: (slug: string) => `/${PAGE_SLUGS.COSTS}/${slug}`,
  },
  KNOWLEDGE: {
    INDEX: `/${PAGE_SLUGS.KNOWLEDGE}`,
    DETAIL: (slug: string) => `/${PAGE_SLUGS.KNOWLEDGE}/${slug}`,
  },
  CONTRACTORS: {
    INDEX: `/${PAGE_SLUGS.CONTRACTORS}`,
    DETAIL: (slug: string) => `/${PAGE_SLUGS.CONTRACTORS}/${slug}`,
  },
  MAINTENANCE: {
    INDEX: `/${PAGE_SLUGS.MAINTENANCE}`,
    DETAIL: (slug: string) => `/${PAGE_SLUGS.MAINTENANCE}/${slug}`,
  },
  FINISH: {
    INDEX: `/${PAGE_SLUGS.FINISH}`,
    DETAIL: (slug: string) => `/${PAGE_SLUGS.FINISH}/${slug}`,
  },
  ACCEPTANCE: {
    INDEX: `/${PAGE_SLUGS.ACCEPTANCE}`,
    DETAIL: (slug: string) => `/${PAGE_SLUGS.ACCEPTANCE}/${slug}`,
  },
  INTERIOR: {
    INDEX: `/${PAGE_SLUGS.INTERIOR}`,
    DETAIL: (slug: string) => `/${PAGE_SLUGS.INTERIOR}/${slug}`,
  },
  CONSTRUCTION: {
    INDEX: `/${PAGE_SLUGS.CONSTRUCTION}`,
    DETAIL: (slug: string) => `/${PAGE_SLUGS.CONSTRUCTION}/${slug}`,
  },
  MATERIALS: {
    INDEX: `/${PAGE_SLUGS.MATERIALS}`,
    DETAIL: (slug: string) => `/${PAGE_SLUGS.MATERIALS}/${slug}`,
  },
} as const

/**
 * Hàm sinh đường dẫn động dựa trên loại tài nguyên (resourceType) và slug từ API.
 */
export function getLinkByResource(
  resourceType: ResourceType | string | null | undefined,
  slug: string | null | undefined
): string {
  if (!slug) return "#"

  // 1. Xử lý nhóm Tin tức / Blog
  if (resourceType === "news") {
    return ROUTES.NEWS.DETAIL(slug)
  }
  if (resourceType === "news_categories") {
    return ROUTES.NEWS.CATEGORY(slug)
  }

  // 2. Xử lý bài viết chi tiết các mô-đun khác (vd: service_items, contractor_items)
  if (resourceType && resourceType.endsWith("_items")) {
    const prefix = resourceType.replace("_items", "")
    const moduleSlug = RESOURCE_PREFIX_TO_SLUG[prefix]
    return moduleSlug ? `/${moduleSlug}/${slug}` : "#"
  }

  // 3. Xử lý các trang cha (vd: service_pages) hoặc trang tĩnh (vd: page_statics)
  return `/${slug}`
}
