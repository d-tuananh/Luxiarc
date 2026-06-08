export interface TocItem {
  id: string
  text: string
  level: number
}

/**
 * Tạo slug tiếng Việt không dấu từ chuỗi văn bản
 */
export function slugify(str: string): string {
  if (!str) return ""
  let slug = str.toLowerCase()

  // Chuyển đổi ký tự có dấu thành không dấu
  slug = slug.replace(/[áàảãạăắằẳẵặâấầẩẫậ]/g, "a")
  slug = slug.replace(/[éèẻẽẹêếềểễệ]/g, "e")
  slug = slug.replace(/[íìỉĩị]/g, "i")
  slug = slug.replace(/[óòỏõọôốồổỗộơớờởỡợ]/g, "o")
  slug = slug.replace(/[úùủũụưứừửữự]/g, "u")
  slug = slug.replace(/[ýỳỷỹỵ]/g, "y")
  slug = slug.replace(/đ/g, "d")

  // Loại bỏ các ký tự đặc biệt
  slug = slug.replace(/[^a-z0-9 -]/g, "")
  // Thay thế khoảng trắng bằng dấu gạch ngang
  slug = slug.replace(/\s+/g, "-")
  // Loại bỏ nhiều dấu gạch ngang liền nhau
  slug = slug.replace(/-+/g, "-")
  // Cắt bỏ dấu gạch ngang ở đầu và cuối
  slug = slug.trim().replace(/^-+|-+$/g, "")

  return slug
}

/**
 * Phân tích nội dung HTML để tự động tạo TOC và chèn ID tương ứng vào các thẻ Heading
 */
export interface TocNode {
  id: string
  text: string
  level: number
  children: TocNode[]
}

/**
 * Phân tích nội dung HTML để tự động tạo TOC và chèn ID tương ứng vào các thẻ Heading
 */
export function parseTocAndContent(htmlContent: string | null | undefined): {
  tocHtml: string
  content: string
} {
  if (!htmlContent) {
    return { tocHtml: "", content: "" }
  }

  const toc: TocItem[] = []
  const idCounts = new Map<string, number>()

  // Regex tìm kiếm các thẻ h2, h3
  const headingRegex = /<(h[23])([^>]*)>([\s\S]*?)<\/h[23]>/gi

  let index = 0
  const content = htmlContent.replace(
    headingRegex,
    (match, tag, attrs, text) => {
      // Loại bỏ các thẻ HTML con bên trong heading (nếu có)
      const plainText = text.replace(/<[^>]*>/g, "").trim()
      if (!plainText) return match

      // Tạo slug làm base ID
      let baseId = slugify(plainText)
      if (!baseId) {
        baseId = `heading-${index}`
      }

      // Xử lý trùng lặp ID nếu có nhiều tiêu đề giống nhau
      let finalId = baseId
      const count = idCounts.get(baseId) || 0
      if (count > 0) {
        finalId = `${baseId}-${count}`
      }
      idCounts.set(baseId, count + 1)

      // Lưu vào danh sách TOC
      const level = parseInt(tag.substring(1), 10)
      toc.push({
        id: finalId,
        text: plainText,
        level,
      })

      index++

      // Nếu thẻ đã có thuộc tính id, thay thế nó
      if (attrs.includes("id=")) {
        const attrsWithNewId = attrs.replace(
          /id=["'][^"']*["']/g,
          `id="${finalId}"`
        )
        return `<${tag}${attrsWithNewId}>${text}</${tag}>`
      } else {
        // Nếu chưa có, chèn thuộc tính id mới
        return `<${tag} id="${finalId}"${attrs}>${text}</${tag}>`
      }
    }
  )

  // Xây dựng cây phân cấp TOC (chỉ hỗ trợ h2 và h3)
  const tree: TocNode[] = []
  let currentH2: TocNode | null = null

  for (const item of toc) {
    if (item.level === 2) {
      currentH2 = { ...item, children: [] }
      tree.push(currentH2)
    } else if (item.level === 3) {
      if (currentH2) {
        currentH2.children.push({ ...item, children: [] })
      } else {
        // H3 đứng trước H2 bất kỳ
        tree.push({ ...item, children: [] })
      }
    }
  }

  // Tạo cấu trúc HTML cho TOC Accordion (Details/Summary)
  let tocHtml = ""
  const hasToc = tree.length > 0

  if (hasToc) {
    let listItems = ""
    tree.forEach((h2Node, h2Index) => {
      const h2Number = h2Index + 1
      listItems += `<li class="font-medium hover:text-secondary transition-colors">
        <a href="#${h2Node.id}" class="text-main hover:text-secondary transition-colors">${h2Number}. ${h2Node.text}</a>`

      if (h2Node.children.length > 0) {
        listItems += `<ol class="pl-6 mt-2 space-y-1.5 list-none">`
        h2Node.children.forEach((h3Node, h3Index) => {
          const h3Number = `${h2Number}.${h3Index + 1}`
          listItems += `<li class="hover:text-secondary transition-colors text-[0.9rem] font-normal">
            <a href="#${h3Node.id}" class="text-main hover:text-secondary transition-colors">${h3Number} ${h3Node.text}</a>
          </li>`
        })
        listItems += `</ol>`
      }

      listItems += `</li>`
    })

    const innerContentHtml = `<div class="max-h-75 overflow-y-auto pr-2 custom-scrollbar">
      <ol class="list-none space-y-2 text-[0.95rem] text-main pl-1">
        ${listItems}
      </ol>
    </div>`

    tocHtml = `<details class="toc-container mb-8 bg-[#FAFAFA] border border-[#EBEBEB] rounded p-4 group" open>
      <summary class="flex items-center justify-between font-semibold text-primary uppercase text-sm tracking-wider cursor-pointer list-none select-none">
        <span class="flex items-center gap-2">
          <svg class="size-4.5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          Nội dung bài viết
        </span>
        <svg class="size-4.5 text-secondary transition-transform duration-300 transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <div class="h-px bg-[#EBEBEB] my-4"></div>
      ${innerContentHtml}
    </details>`
  }

  return { tocHtml, content }
}
