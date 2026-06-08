import rss from "@astrojs/rss"
import type { APIContext } from "astro"
import { getNewsItems } from "@/features/news/services"
import { getLinkByResource } from "@/utils/routes"

export async function GET(context: APIContext) {
  const newsItems = await getNewsItems()

  return rss({
    // Tiêu đề của Feed RSS
    title: "LuxiArc - Thiết kế & Thi công nội thất",
    // Mô tả ngắn
    description:
      "Cập nhật các cẩm nang xây dựng, kinh nghiệm thi công nội thất và xu hướng thiết kế mới nhất từ kiến trúc sư LuxiArc.",
    // URL trang web (lấy từ cấu hình site trong astro.config.mjs)
    site: context.site,
    // Danh sách bài viết trong RSS
    items: newsItems.map((item) => ({
      title: item.name,
      pubDate: new Date(item.created_at),
      description: item.short_content || "",
      link: `${getLinkByResource(item.resource_type, item.slug)}/`,
    })),
    // Cấu hình ngôn ngữ mặc định
    customData: `<language>vi-VN</language>`,
  })
}
