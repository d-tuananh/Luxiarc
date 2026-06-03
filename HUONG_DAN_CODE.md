# Quy Định Cấu Trúc Mã Nguồn & Tiêu Chuẩn Phát Triển (AstroJS & SEO)

Tài liệu này định nghĩa các quy tắc viết code, cấu trúc thư mục và tiêu chuẩn kỹ thuật nhằm đảm bảo dự án phát triển đồng bộ, dễ bảo trì và có hiệu năng SEO tối ưu nhất.

---

## 1. Cấu Trúc Component Astro (`.astro`)

Mỗi component trong file `.astro` gồm 3 phần tách biệt. Quy tắc viết code cho từng phần như sau:

### 1.1. Code Frontmatter (`---`)

- **Trách nhiệm:** Chạy ở máy chủ (Server-side). Chứa logic lấy dữ liệu (API, Content Collections), import component, xử lý biến và TypeScript.
- **Quy tắc:**
  - Luôn định nghĩa rõ kiểu dữ liệu của `Props` bằng `interface Props` để tận dụng TypeScript.
  - Sử dụng **Path Alias** để import:
    - `@/components/...` cho shared components.
    - `@features/...` cho các components theo từng feature/domain.
    - `@layouts/...` cho layouts.
  - Hạn chế viết logic tính toán phức tạp ở đây. Nếu logic dài > 20 dòng, hãy cân nhắc tách thành các hàm helper trong thư mục `src/utils/`.

### 1.2. HTML Template

- **Trách nhiệm:** Định nghĩa giao diện người dùng (Markup).
- **Quy tắc:**
  - Sử dụng **Semantic HTML** (HTML có ngữ nghĩa) thay vì `div` vô tội vạ.
  - Sử dụng cú pháp `{biến}` hoặc `{điều_kiện && <Component />}` một cách tinh gọn.
  - Toàn bộ class CSS sử dụng Tailwind CSS v4.

### 1.3. Client-side Script (`<script>`)

- **Trách nhiệm:** Chạy tại trình duyệt của người dùng (Client-side) để xử lý tương tác động.
- **Quy tắc:**
  - Astro tự động nén, tối ưu hóa và gộp (bundle) các thẻ `<script>` này.
  - Luôn viết code an toàn với TypeScript (ví dụ: dùng `as HTMLButtonElement` và optional chaining `?.addEventListener`).
  - Hạn chế import thư viện nặng ở client script để giữ dung lượng trang nhẹ nhất.

---

## 2. Tiêu Chuẩn SEO Bắt Buộc Khi Viết HTML/Astro

Để đạt điểm SEO tối đa (100 điểm trên Google Lighthouse) và tối ưu khả năng cào dữ liệu của Bot:

### 2.1. Cấu trúc Tiêu đề (Headings)

- Mỗi trang **chỉ được phép có duy nhất một thẻ `<h1>`** đóng vai trò là tiêu đề chính của trang.
- Thẻ `<h1>` phải chứa từ khóa chính của trang đó.
- Sử dụng các thẻ `<h2>`, `<h3>`, `<h4>` theo thứ tự phân tầng hợp lý. Tuyệt đối không dùng thẻ Heading nhảy cóc (ví dụ: có `<h1>` rồi nhảy sang `<h3>` mà không qua `<h2>`).

### 2.2. Hình ảnh (Images)

- **Luôn luôn** dùng component `<Image />` từ `astro:assets` thay cho thẻ `<img>` thuần:
  ```astro
  ---
  import { Image } from "astro:assets"
  import myImage from "@/assets/image.png"
  ---

  <Image
    src={myImage}
    alt="Mô tả hình ảnh chứa từ khóa SEO"
    class="rounded-lg"
  />
  ```
- **Bắt buộc phải có thuộc tính `alt`** có ý nghĩa trên mọi hình ảnh. `alt` rỗng (`alt=""`) chỉ được dùng cho các hình ảnh trang trí thuần túy.
- Xác định rõ `width` và `height` cho ảnh dạng URL từ bên ngoài để tránh hiện tượng giật màn hình (Cumulative Layout Shift - CLS).

### 2.3. Đường liên kết (Links)

- Sử dụng thẻ `<a>` chuẩn có thuộc tính `href` hợp lệ để bot tìm kiếm có thể di chuyển qua lại giữa các trang.
- Không sử dụng `window.location` hoặc click handler trên thẻ `div`/`button` để thay thế liên kết điều hướng chính.
- Đối với các liên kết trỏ ra ngoài hệ thống (external links), luôn thêm `rel="noopener noreferrer"`.

### 2.4. Khả năng truy cập (Accessibility - A11y)

- Các phần tử tương tác (như nút bấm) phải có nội dung văn bản hiển thị rõ ràng hoặc có thuộc tính `aria-label` mô tả chức năng.
- Đảm bảo độ tương phản màu sắc (color contrast) giữa chữ và nền đạt chuẩn WCAG.

---

## 3. Quy Tắc Đặt Tên & Tổ Chức File (Naming Conventions)

| Loại phần tử                   | Quy tắc đặt tên               | Ví dụ tốt                       | Ví dụ xấu                           |
| :----------------------------- | :---------------------------- | :------------------------------ | :---------------------------------- |
| **Astro Component**            | `PascalCase`                  | `BlogCard.astro`                | `blog-card.astro`, `blogCard.astro` |
| **React/Vue/Svelte Component** | `PascalCase`                  | `ShareButtons.tsx`              | `share_buttons.tsx`                 |
| **Thư mục Feature**            | `kebab-case` hoặc `lowercase` | `blog`, `api-toolkit`           | `Blog`, `apiToolkit`                |
| **File Logic/Helper**          | `camelCase`                   | `formatDate.ts`, `seoHelper.ts` | `format_date.ts`                    |
| **CSS Class / Utility**        | `kebab-case`                  | `container-home`, `btn-primary` | `containerHome`, `btn_primary`      |

---

## 4. Quản Lý Tính Năng (Feature-Driven Guidelines)

1. **Tính độc lập:** Các thư mục con bên trong `src/features/[feature-name]` cần hoạt động độc lập tối đa.
2. **Import chéo:** Hạn chế feature A import trực tiếp từ feature B. Nếu có phần chung, hãy đưa ra `src/components/` toàn cục hoặc thư mục `src/utils/`.
3. **Mỏng hóa Router:** Các file trong `src/pages/` chỉ nên chứa nhiệm vụ định tuyến, nhận dữ liệu (props, params) và truyền vào các component của `features`. Tránh viết HTML/CSS giao diện trực tiếp trong `src/pages/`.
