# Hướng Dẫn Cách Hoạt Động & Gọi API Trong AstroJS

Tài liệu này giúp bạn nắm vững kiến trúc của **AstroJS**, cách viết code JavaScript hiệu quả và các phương thức gọi (call) API tối ưu nhất cho từng trường hợp.

---

## I. Cơ Chế Hoạt Động Của AstroJS

Astro hoạt động theo triết lý **"Zero JS by default"** (Không tải JavaScript về client theo mặc định). 

Mỗi component trong file `.astro` được chia làm **3 phần chính**:

```astro
---
// ==========================================
// 1. FRONTMATTER (Server-side JS)
// Code ở đây CHỈ CHẠY TRÊN SERVER.
// ==========================================
import Header from "../components/Header.astro";
const name = "Luxiarc";
---

<!-- ==========================================
     2. TEMPLATE (HTML)
     Giao diện hiển thị, dùng dấu {} để chèn biến JS từ Server.
     ========================================== -->
<div class="banner">
  <h1>Chào mừng đến với {name}</h1>
  <button id="cta-btn">Nhấp Vào Đây</button>
</div>

<!-- ==========================================
     3. CLIENT SCRIPT (Client-side JS)
     Code ở đây CHỈ CHẠY Ở TRÌNH DUYỆT (Client).
     ========================================== -->
<script>
  const btn = document.getElementById("cta-btn");
  btn?.addEventListener("click", () => {
    alert("Nút đã được click tại Trình Duyệt!");
  });
</script>
```

### 💡 Quy tắc hoạt động:
* **JS trong Frontmatter (`---`)**: Chạy một lần duy nhất trên máy chủ khi build dự án (Static Site Generation - SSG) hoặc khi người dùng yêu cầu trang (Server-Side Rendering - SSR). Trình duyệt của khách hàng **không bao giờ nhận được đoạn code này**.
* **Thẻ `<script>`**: Sẽ được Astro tự động tối ưu hóa, đóng gói (bundle) và gửi xuống trình duyệt để xử lý tương tác giao diện người dùng.

---

## II. Cách Call API Trong AstroJS

Trong Astro, có **2 cách chính** để gọi API tùy thuộc vào việc bạn muốn tải dữ liệu tĩnh hay tải dữ liệu tương tác theo thời gian thực (realtime).

---

### Cách 1: Gọi API trên Server (Frontmatter) - *KHUYÊN DÙNG*

Đây là cách tối ưu và phổ biến nhất trong Astro. Bạn sử dụng lệnh `fetch()` trực tiếp bên trong cặp dấu `---`.

#### 📌 Khi nào nên dùng?
* Lấy danh sách sản phẩm, bài viết blog, thông tin cấu hình trang web.
* Dữ liệu không thay đổi liên tục theo từng giây của từng người dùng.
* Cần tối ưu SEO (vì công cụ tìm kiếm của Google sẽ đọc được dữ liệu ngay lập tức trong HTML).
* **Bảo mật tuyệt đối**: Có thể truyền Token, Secret Key vào API mà không lo bị lộ ra ngoài Client.

#### 📝 Ví dụ thực tế:
```astro
---
// src/pages/projects.astro

// 1. Gọi API trực tiếp bằng fetch (hỗ trợ top-level await cực kỳ tiện lợi)
const response = await fetch("https://api.luxiarc.vn/v1/projects", {
  headers: {
    // Có thể dùng API key bí mật ở đây, trình duyệt sẽ không bao giờ biết được!
    "Authorization": `Bearer ${import.meta.env.API_SECRET_KEY}`
  }
});
const data = await response.json();
const projects = data.items || [];
---

<section class="py-12 px-4 max-w-5xl mx-auto">
  <h1 class="text-3xl font-bold mb-6">Dự án đã hoàn thành</h1>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    {projects.map((project) => (
      <article class="border rounded-lg overflow-hidden shadow-sm">
        <img src={project.image} alt={project.title} class="w-full h-48 object-cover" />
        <div class="p-4">
          <h3 class="font-bold text-lg">{project.title}</h3>
          <p class="text-sm text-slate-500">{project.description}</p>
        </div>
      </article>
    ))}
  </div>
</section>
```

---

### Cách 2: Gọi API dưới Client (Thẻ `<script>`)

Đôi khi bạn cần gọi API dựa trên hành động của người dùng (ví dụ: gửi Form liên hệ, bấm nút "Xem thêm" để tải thêm dữ liệu, hoặc lấy dữ liệu realtime của người dùng hiện tại).

#### 📌 Khi nào nên dùng?
* Submit form (Form gửi thông tin liên hệ, đăng ký nhận tin).
* Chức năng tìm kiếm trực tiếp trên thanh Search.
* Tải thêm bài viết (Load more / Infinite Scroll).
* Dữ liệu mang tính cá nhân hóa (ví dụ: kiểm tra trạng thái đăng nhập của người dùng).

#### 📝 Ví dụ thực tế:
```astro
---
// src/components/ContactForm.astro
---

<form id="contact-form" class="flex flex-col gap-4 p-6 border rounded-lg max-w-md">
  <div>
    <label class="block text-sm font-semibold mb-1">Họ và tên</label>
    <input type="text" name="fullname" required class="w-full border px-3 py-2 rounded" />
  </div>
  
  <div>
    <label class="block text-sm font-semibold mb-1">Số điện thoại</label>
    <input type="tel" name="phone" required class="w-full border px-3 py-2 rounded" />
  </div>

  <button type="submit" class="bg-yellow-400 font-bold py-2 rounded hover:bg-yellow-500 transition-colors">
    Gửi thông tin
  </button>
  
  <p id="form-message" class="text-sm hidden"></p>
</form>

<script>
  const form = document.getElementById("contact-form") as HTMLFormElement;
  const messageEl = document.getElementById("form-message");

  form?.addEventListener("submit", async (event) => {
    event.preventDefault(); // Chặn hành động load lại trang mặc định của form
    
    // Lấy dữ liệu từ Form
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      // 1. Gọi API ở Client bằng fetch
      const response = await fetch("https://api.luxiarc.vn/v1/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        if (messageEl) {
          messageEl.textContent = "Gửi thông tin thành công! Chúng tôi sẽ liên hệ sớm.";
          messageEl.className = "text-sm text-green-600 block";
        }
        form.reset();
      } else {
        throw new Error("Lỗi hệ thống");
      }
    } catch (error) {
      if (messageEl) {
        messageEl.textContent = "Đã xảy ra lỗi khi gửi. Vui lòng thử lại sau!";
        messageEl.className = "text-sm text-red-600 block";
      }
    }
  });
</script>
```

---

### Cách 3: Gọi API trong Component Framework (React, Vue, Svelte) nhúng vào Astro

Nếu bạn đang sử dụng cấu trúc Đảo (Islands) và tích hợp các thư viện React, Vue hoặc Svelte, bạn sẽ gọi API giống hệt như cách bạn làm trong các framework đó.

#### ⚠️ QUAN TRỌNG:
Để component của framework có thể chạy được JS và gọi API ở Client, bạn **bắt buộc** phải sử dụng directive `client:*` khi nhúng component đó vào file `.astro`.

```astro
---
// src/pages/index.astro
import WeatherWidget from "../components/WeatherWidget.jsx"; // Component React
---

<WeatherWidget client:visible /> 
<!-- client:visible giúp component chỉ tải JS và gọi API khi người dùng cuộn màn hình đến vị trí của nó -->
```

*Trong file React component (`WeatherWidget.jsx`):*
```jsx
import { useState, useEffect } from 'react';

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    // Gọi API ở client bằng React Hook
    fetch("https://api.weatherapi.com/v1/current.json?q=Hanoi")
      .then(res => res.json())
      .then(data => setWeather(data.current));
  }, []);

  if (!weather) return <p>Đang tải dữ liệu thời tiết...</p>;

  return (
    <div class="p-4 border rounded shadow">
      <h3>Nhiệt độ hiện tại Hà Nội: {weather.temp_c}°C</h3>
    </div>
  );
}
```

---

## III. Tóm Tắt Chiến Lược Chọn Phương Án Gọi API

| Loại dữ liệu | Nên gọi ở đâu? | Giải thích |
| :--- | :--- | :--- |
| **Dự án, Tin tức, Sản phẩm** | **Server (Frontmatter - Cách 1)** | Tốt nhất cho SEO, tải trang siêu nhanh, bảo mật Key. |
| **Gửi Form, Đăng nhập, Giỏ hàng** | **Client (Script - Cách 2 hoặc 3)** | Đòi hỏi tương tác động từ phía người dùng sau khi trang đã hiển thị. |
| **Thời tiết, Tỷ giá, Chứng khoán realtime** | **Client (Script - Cách 2 hoặc 3)** | Dữ liệu thay đổi liên tục từng giây, cần cập nhật mà không load lại trang. |
