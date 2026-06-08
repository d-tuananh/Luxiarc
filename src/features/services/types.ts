import type { ResourceType } from "@/types/api"

export interface ServicesPage {
  id: number
  resource_type?: ResourceType
  name: string
  slug: string
  banner: string | null
  items_count: number
  ord: number
  act: number
  seo: {
    title: string
    keywords: string
    description: string
  }
  extras: {
    intro_content: string | null
    intro_image?: string | null
    bottom_content?: string | null
  }
  created_at: string
  updated_at: string
}

export interface ServicesItem {
  id: number
  resource_type?: ResourceType
  page_id: number
  name: string
  slug: string
  img: string | null
  short_content: string | null
  content: string | null
  ord: number
  act: number
  seo: {
    title: string
    keywords: string
    description: string
  }
  extras: Record<string, unknown> | null | undefined
  created_at: string
  updated_at: string
}
