/**
 * Định nghĩa tập trung toàn bộ danh sách các Slug cố định (Base Page Slugs) của dự án.
 * Dùng để đồng bộ routing, gọi API, cấu hình links, rewrites hoặc tạo sitemap.
 */
export const PAGE_SLUGS = {
  COSTS: "chi-phi-bao-gia",
  CONTRACTORS: "nha-thau",
  SERVICES: "dich-vu",
  KNOWLEDGE: "tim-hieu",
  MAINTENANCE: "bao-tri",
  NEWS: "tin-tuc",
  // 5 mô-đun mới
  FINISH: "hoan-thien",
  ACCEPTANCE: "nghiem-thu",
  INTERIOR: "noi-that",
  CONSTRUCTION: "thi-cong",
  MATERIALS: "vat-lieu-xay-dung",
} as const

export type PageSlugType = typeof PAGE_SLUGS
