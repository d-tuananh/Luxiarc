/**
 * Quản lý tập trung toàn bộ danh sách các đường dẫn API (API Endpoints) của dự án
 */
export const API_ROUTES = {
  DISPLAY: {
    BANNERS: "/display/banners",
    TESTIMONIALS: "/display/customer-testimonials",
    HIGHLIGHTS: "/display/customer-highlights",
    WHY_CHOOSE_US: "/display/why-choose-us-items",
    FAQS: "/display/faqs",
    HOME_PROCESS: "/display/home-process",
    HOME_SOLUTION: "/display/home-solution",
  },
  CONFIG: {
    HOME: "/config/home",
    ABOUT: "/config/about",
    CONTACT: "/config/contact",
  },
  NEWS: {
    CATEGORIES: "/news/categories",
    CATEGORY_DETAIL: (slug: string) => `/news/categories/${slug}`,
    CATEGORY_ITEMS: (slug: string) => `/news/categories/${slug}/items`,
    ITEMS: "/news/items",
    DETAIL: (slug: string) => `/news/items/${slug}`,
  },
  CONTACT: {
    SUBMIT: "/contact-submissions",
  },
  COSTS: {
    PAGE: (pageSlug: string) => `/costs/pages/${pageSlug}`,
    ITEMS: (pageSlug: string) => `/costs/pages/${pageSlug}/items`,
    DETAIL: (pageSlug: string) => `/costs/items/${pageSlug}`,
  },
  SERVICES: {
    PAGE: (pageSlug: string) => `/services/pages/${pageSlug}`,
    ITEMS: (pageSlug: string) => `/services/pages/${pageSlug}/items`,
    DETAIL: (itemSlug: string) => `/services/items/${itemSlug}`,
  },
  CONTRACTORS: {
    PAGE: (pageSlug: string) => `/contractors/pages/${pageSlug}`,
    ITEMS: (pageSlug: string) => `/contractors/pages/${pageSlug}/items`,
    DETAIL: (itemSlug: string) => `/contractors/items/${itemSlug}`,
  },
  KNOWLEDGE: {
    PAGE: (pageSlug: string) => `/knowledge/pages/${pageSlug}`,
    ITEMS: (pageSlug: string) => `/knowledge/pages/${pageSlug}/items`,
    DETAIL: (itemSlug: string) => `/knowledge/items/${itemSlug}`,
  },
  MAINTENANCE: {
    PAGE: (pageSlug: string) => `/maintenance/pages/${pageSlug}`,
    ITEMS: (pageSlug: string) => `/maintenance/pages/${pageSlug}/items`,
    DETAIL: (itemSlug: string) => `/maintenance/items/${itemSlug}`,
  },
  FINISH: {
    PAGE: (pageSlug: string) => `/finish/pages/${pageSlug}`,
    ITEMS: (pageSlug: string) => `/finish/pages/${pageSlug}/items`,
    DETAIL: (itemSlug: string) => `/finish/items/${itemSlug}`,
  },
  ACCEPTANCE: {
    PAGE: (pageSlug: string) => `/acceptance/pages/${pageSlug}`,
    ITEMS: (pageSlug: string) => `/acceptance/pages/${pageSlug}/items`,
    DETAIL: (itemSlug: string) => `/acceptance/items/${itemSlug}`,
  },
  INTERIOR: {
    PAGE: (pageSlug: string) => `/interior/pages/${pageSlug}`,
    ITEMS: (pageSlug: string) => `/interior/pages/${pageSlug}/items`,
    DETAIL: (itemSlug: string) => `/interior/items/${itemSlug}`,
  },
  CONSTRUCTION: {
    PAGE: (pageSlug: string) => `/construction/pages/${pageSlug}`,
    ITEMS: (pageSlug: string) => `/construction/pages/${pageSlug}/items`,
    DETAIL: (itemSlug: string) => `/construction/items/${itemSlug}`,
  },
  MATERIALS: {
    PAGE: (pageSlug: string) => `/materials/pages/${pageSlug}`,
    ITEMS: (pageSlug: string) => `/materials/pages/${pageSlug}/items`,
    DETAIL: (itemSlug: string) => `/materials/items/${itemSlug}`,
  },
  PAGE_STATICS: {
    LIST: "/page-statics",
    DETAIL: (pageSlug: string) => `/page-statics/${pageSlug}`,
  },
} as const

export type ApiRoute = typeof API_ROUTES
