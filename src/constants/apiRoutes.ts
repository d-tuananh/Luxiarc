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
  },
  CONFIG: {
    HOME: "/config/home",
  },
  NEWS: {
    LIST: "/news",
  },
  CONTACT: {
    SUBMIT: "/contact",
  },
} as const

export type ApiRoute = typeof API_ROUTES
