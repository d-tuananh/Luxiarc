import rss from "@astrojs/rss"
import { getCollection } from "astro:content"
import type { APIContext } from "astro"

export async function GET(context: APIContext) {
  const blog = await getCollection("blog", ({ data }) => {
    return import.meta.env.PROD ? !data.draft : true
  })

  return rss({
    // Tiêu đề của Feed RSS
    title: "LuxiArc - Thiết kế & Thi công nội thất",
    // Mô tả ngắn
    description:
      "Cập nhật các cẩm nang xây dựng, kinh nghiệm thi công nội thất và xu hướng thiết kế mới nhất từ kiến trúc sư LuxiArc.",
    // URL trang web (lấy từ cấu hình site trong astro.config.mjs)
    site: context.site,
    // Danh sách bài viết trong RSS
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      customData: post.data.author
        ? `<author>${post.data.author}</author>`
        : undefined,
      link: `/blog/${post.id}/`,
    })),
    // Cấu hình ngôn ngữ mặc định
    customData: `<language>vi-VN</language>`,
  })
}
