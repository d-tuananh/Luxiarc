# Hướng Dẫn Cấu Trúc Thư Mục Feature-Driven (Option 1)

Dự án **thi-cong-luxiarc** đã được tái cấu trúc thành công theo mô hình **Feature-Driven (Cấu trúc theo Tính năng / Domain)**. Tài liệu này hướng dẫn bạn cách sử dụng, quy tắc đặt tên và những lưu ý quan trọng để duy trì mã nguồn sạch đẹp.

---

## 1. Sơ Đồ Cấu Trúc Hiện Tại

Dưới đây là cấu trúc thực tế sau khi refactor:

```text
src/
├── assets/                 # Các tài nguyên tĩnh (ảnh, icon...) cần nén/tối ưu
├── layouts/                # Bố cục chính dùng chung cho các trang
│   └── Layout.astro
│
├── components/             # Components toàn cục (Shared Components)
│   └── layout/             # Các khối của bố cục chính
│       ├── Header.astro
│       └── Footer.astro
│
├── features/               # NƠI CHỨA CÁC TÍNH NĂNG/DOMAIN CHÍNH
│   ├── home/               # Tính năng Trang Chủ
│   │   └── components/     # Component riêng của trang chủ
│   │       └── HomeBanner.astro
│   │
│   └── contact/            # Tính năng Liên Hệ
│       └── components/     # Component riêng của trang liên hệ
│           └── ContactForm.astro
│
├── pages/                  # Khai báo các đường dẫn URL (Routing)
│   ├── index.astro         # Gọi @/features/home/components/HomeBanner.astro
│   ├── about.astro         # Trang giới thiệu
│   ├── contact.astro       # Gọi @/features/contact/components/ContactForm.astro
│   └── client-api.astro    # Trang chạy API Toolkit
│
└── tsconfig.json           # Cấu hình Path Alias (@/*)
```

---

## 2. Quy Tắc Cách Sử Dụng Thư Mục

### 📁 `src/features/` (Thư mục quan trọng nhất)
* Khi bạn chuẩn bị làm một trang mới hoặc tính năng mới (Ví dụ: Danh sách dự án - **Projects**, Tin tức - **Blog**, Dịch vụ - **Services**):
  1. Tạo một thư mục mới nằm dưới `src/features/` (ví dụ: `src/features/projects/`).
  2. Tạo các thư mục con bên trong tùy nhu cầu:
     * `components/`: Chứa các component giao diện riêng của tính năng đó (ví dụ: `ProjectCard.astro`, `ProjectGrid.astro`).
     * `services/` hoặc file `services.ts`: Gọi các API của riêng tính năng đó.
     * `types.ts`: Định nghĩa kiểu dữ liệu.

### 📁 `src/components/` (Component dùng chung toàn cục)
* Chỉ đưa vào đây các component có tính chất **tái sử dụng ở nhiều tính năng khác nhau**.
* Ví dụ: Nút bấm `Button.astro`, hộp thoại `Modal.astro`, thanh tìm kiếm chung `SearchBar.astro`.
* Cấu trúc con nên chia theo:
  * `ui/`: Chứa các phần tử nhỏ (atoms/molecules).
  * `layout/`: Chứa các phần tử cấu thành Layout (Header, Footer, Sidebar).

---

## 3. Quy Tắc Đặt Tên (Naming Conventions)

Để code chuyên nghiệp và dễ đọc, hãy thống nhất các quy tắc sau:

### 1. Tên Component (.astro, .tsx, .jsx)
* **Quy tắc:** Sử dụng **PascalCase** (Viết hoa chữ cái đầu của mỗi từ).
* **Ví dụ tốt:** `HomeBanner.astro`, `ContactForm.astro`, `ProjectCard.astro`.
* **Ví dụ xấu:** `home-banner.astro`, `contact_form.astro`.

### 2. Tên Thư Mục Tính Năng (trong `src/features/`)
* **Quy tắc:** Sử dụng **kebab-case** (viết thường toàn bộ, cách nhau bằng dấu gạch ngang) hoặc viết thường một từ số ít.
* **Ví dụ tốt:** `home`, `projects`, `api-toolkit`.

### 3. Tên File Logic / Helper (.js, .ts)
* **Quy tắc:** Sử dụng **camelCase** (chữ đầu viết thường, các chữ sau viết hoa chữ cái đầu).
* **Ví dụ tốt:** `projectService.ts`, `formatDate.ts`, `useAuth.ts`.

---

## 4. Các Lưu Ý Quan Trọng (Best Practices)

### 🚀 1. Sử dụng triệt để Path Alias `@/`
* Tránh sử dụng relative path dài dòng như `../../components/layout/Header.astro`.
* Sử dụng `@/` để trỏ trực tiếp đến `src/`:
  ```astro
  // ❌ KHÔNG NÊN:
  import Header from "../components/layout/Header.astro";
  
  //  NÊN DÙNG:
  import Header from "@/components/layout/Header.astro";
  ```

### 📦 2. Độc lập tính năng (Feature Encapsulation)
* Cố gắng giữ cho các thư mục trong `src/features/[feature-name]` **độc lập tối đa**.
* Hạn chế việc component của feature này import component của feature khác. Nếu có hai feature cần dùng chung một component, hãy di chuyển component đó ra `src/components/` toàn cục.

### 🔌 3. Giữ file Router ở `src/pages/` cực kỳ mỏng
* Các file trong `src/pages/` chỉ nên làm nhiệm vụ **định nghĩa router**, nhận dữ liệu từ Server (Frontmatter) và render ra Layout cùng các Component từ thư mục `features`.
* Hạn chế viết HTML dài hàng trăm dòng trực tiếp trong các file `src/pages/`. Hãy tách chúng ra thành component trong thư mục feature tương ứng.
