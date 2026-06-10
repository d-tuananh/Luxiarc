export interface Banner {
  id: number
  title: string
  subtitle: string | null
  image: string
  icon: string | null
  content: string | null
  link: string
  ord: number
  act: number
  created_at: string
  updated_at: string
}

export interface Testimonial {
  id: number
  title: string // Tên khách hàng
  subtitle: string // Chức danh/Nghề nghiệp
  image: string | null // Ảnh avatar
  icon: string | null
  content: string // Lời đánh giá
  ord: number
  act: number
  created_at: string
  updated_at: string
}

export interface Highlight {
  id: number
  title: string // Tiêu đề: "Hài lòng"
  subtitle: string | null // Giá trị: "99%"
  image: string | null
  icon: string | null
  content: string // Mô tả
  ord: number
  act: number
  created_at: string
  updated_at: string
}

export interface WhyChooseUsItem {
  id: number
  title: string // Tiêu đề
  subtitle: string | null
  image: string | null
  icon: string | null
  content: string // Nội dung lý do
  ord: number
  act: number
  created_at: string
  updated_at: string
}

export interface FAQ {
  id: number
  title: string // Câu hỏi
  subtitle: string | null
  image: string | null
  icon: string | null
  content: string // Câu trả lời
  ord: number
  act: number
  created_at: string
  updated_at: string
}

export interface HomeConfig {
  site: {
    name: string
    logo: string | null
    logo_footer: string | null
    hotline: string
    email: string
    address: string
    copyright: string
    socials: {
      facebook: string | null
      youtube: string | null
    }
  }
  home: {
    service_benefits: {
      icon: string | null
      title: string
      description: string
    }[]
    about: {
      title: string
      content: string
      button: {
        text: string
        link: string
      }
      image: string | null
    }
    contact: {
      badge: string
      title: string
      content: string
      background: string | null
      button_text: string
    }
  }
}

export interface HomeProcessItem {
  number: string
  title: string
  description: string
  link?: string
}

export interface HomeProcessData {
  title: string
  items: HomeProcessItem[]
}

export interface HomeSolutionItem {
  title: string
  image: string
  link: string
}

export interface HomeSolutionData {
  title: string
  content: string
  description?: string
  items: HomeSolutionItem[]
}
