export interface PageStatic {
  id: number
  resource_type: string
  name: string
  slug: string
  type_show: "normal" | "contact" | "about"
  layout_show: "normal" | "contact" | "about"
  admin_type_show: string
  path: string
  url: string
  img: string | null
  short_content: string | null
  content: string | null
  count: number | null
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

export interface AboutConfig {
  hero: {
    title: string
    background: string
  }
  intro: {
    badge: string
    title: string
    content: string
    image: string
  }
  trust: {
    title: string
    content: string
    background: string
  }
  mission: {
    title: string
    content: string
    gallery: {
      image: string
      title: string
      description: string
    }[]
  }
  contact: {
    badge: string
    title: string
    content: string
    background: string
    button_text: string
  }
}

export interface ContactConfig {
  heading: {
    title: string
  }
  contact: {
    title: string
    address: string
    hotline: string
    email: string
  }
  media: {
    image: string | null
  }
  form: {
    button_text: string
  }
}
