import { defineCollection, z } from "astro:content"
import { glob } from "astro/loaders"

const blog = defineCollection({
  // Sử dụng glob loader để tải các file Markdown (.md, .mdx) từ src/content/blog
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z
      .string()
      .max(70, { message: "Tiêu đề không nên vượt quá 70 ký tự (chuẩn SEO)" }),
    description: z
      .string()
      .max(160, { message: "Mô tả không nên vượt quá 160 ký tự (chuẩn SEO)" }),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    image: z.string().default("/images/default-blog.jpg"),
    author: z.string().default("LuxiArc"),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
})

export const collections = { blog }
