import type { ResourceType } from "@/types/api"

export interface NewsCategory {
  id: number
  resource_type: ResourceType
  name: string
  slug: string
  slug_prefix: string
  path: string
  url: string
  img: string | null
  icon: string | null
  parent_id: number | null
  short_content: string | null
  content: string | null
  posts_count: number | null
  ord: number | null
  act: number
  seo: {
    title: string | null
    keywords: string | null
    description: string | null
  }
  created_at: string
  updated_at: string
}

export interface NewsItem {
  id: number
  resource_type: ResourceType
  name: string
  slug: string
  slug_prefix: string
  path: string
  url: string
  img: string | null
  short_content: string | null
  content: string | null
  hot: number
  home: number
  count: number | null // Lượt xem
  categories?: NewsCategory[]
  seo: {
    title: string | null
    keywords: string | null
    description: string | null
  }
  created_at: string
  updated_at: string
}
