---
name: luxiarc-developer-skill
description: Comprehensive AI Skill and instructions for developing, modifying, and building the LuxiArc AstroJS project.
version: 1.0.0
frameworks:
  - AstroJS (v6)
  - TailwindCSS (v4)
  - TypeScript (v8)
---

# LuxiArc AstroJS Developer Skill

This skill documents the complete codebase architecture, conventions, API client caching logic, animation patterns, and build-time optimization standards for the LuxiArc project. AI coding assistants MUST use this file to quickly align with the codebase's patterns.

---

## 1. Project Architecture (Feature-Driven Design)
The repository uses a **Feature-Driven (Domain-Driven)** folder architecture under `src/features/` to maintain clean separation of concerns.

### Project Layout Tree:
- **`src/assets/`**: Shared static assets (logos, icons, design images).
- **`src/layouts/`**: Core page wrappers. `Layout.astro` initializes global SEO head meta, SPA transitions via `<ClientRouter />`, and the AOS scroll animation library.
- **`src/components/ui/`**: Shared atomic UI components (e.g. `CLink.astro` for client router links, common cards, custom buttons).
- **`src/components/layout/`**: Global layouts (e.g. `Header.astro`, `Footer.astro`).
- **`src/features/`**: Capsule directories grouping code by dynamic feature modules.
  - Each feature (e.g., `home/`, `news/`, `page-statics/`, `costs/`, `services/`) contains its own:
    - `components/`: UI pieces specific to the domain.
    - `services.ts`: Domain fetches hitting Laravel endpoints.
    - `types.ts`: TypeScript types and API interfaces.
- **`src/pages/`**: Clean routing files. Frontmatter does the dynamic data querying and outputs components from `src/features/` into `Layout.astro`. Page files MUST remain thin!
- **`src/utils/api.ts`**: The main shared API fetch client.

### Naming Conventions:
- **Astro Components**: `PascalCase` (e.g., `HomeProcess.astro`, `BlogCard.astro`).
- **Logic / Service Files**: `camelCase` (e.g., `api.ts`, `services.ts`).
- **Feature Folders**: `kebab-case` or `lowercase` (e.g., `page-statics`, `home`).
- **Path Aliases**: Always use `@/` to point to `src/` (configured in `tsconfig.json`). No relative path hell (e.g., use `import Layout from "@/layouts/Layout.astro"` instead of `../../layouts/Layout.astro`).

---

## 2. Dynamic API Client & Build-Time Caching
To prevent hitting backend rate limits (`429 Too Many Attempts` under Laravel’s default `ThrottleRequests` middleware) when SSG concurrently compiles 58+ static pages, the client in `src/utils/api.ts` uses **Dual-Layer Caching** and a **Self-Healing Retry** mechanism:

### The Caching Model:
1. **In-Memory Cache (RAM)**: Gops GET requests in the running thread. In development (`import.meta.env.PROD === false`), cached promises automatically clear after 2 seconds to support developer browser refreshing (F5). In production builds, they persist.
2. **Disk Cache (`.api-cache/`)**: Since Astro compiles pages across isolated worker processes, in-memory Maps are not shared. The client saves response payloads as hashed `.json` files inside `.api-cache/` named after the base64url-hashed request URL. Workers read this folder first before hitting the remote server.

### The Self-Healing 429 Retry Mechanism:
- If an API request responds with `429 Too Many Attempts`, the client reads the `Retry-After` header.
- It pauses thread execution for the requested duration (or fallback to exponential backoff with jitter) and retries up to 5 times.
- While waiting, the thread periodically rechecks the disk cache in case a parallel thread successfully resolved and saved the payload to disk.

### Cache Cleanup:
- `.api-cache/` is added to `.gitignore`.
- An npm hook `"prebuild": "node ./scripts/clean-cache.js"` executes before every production build to erase the cache folder, ensuring every new deployment starts clean and fetches the latest CMS changes.
- A dynamic API endpoint exists at `src/pages/api/clear-cache.ts`. If ever deployed in SSR or Hybrid mode, hitting `/api/clear-cache?token=CLEAR_CACHE_TOKEN` will instantly clear the cache on the running web server.

---

## 3. SEO & Semantic HTML Constraints
To preserve a perfect SEO score (100 on Google Lighthouse):
- **Headings**: Each page must contain **exactly one `<h1>`** representing the main title containing target keywords. Subheadings must follow standard hierarchy (`<h2>` -> `<h3>` -> `<h4>`) without skipped levels.
- **Images**: Always import and use `<Image />` from `astro:assets` instead of static `<img>` tags. Provide a meaningful `alt` attribute.
- **Links**: Use `<a href="...">` (or `<CLink href="...">` wrapping ClientRouter) for navigation. Do not use JS click handlers on non-interactive elements (like `div`) to simulate links.
- **Accessibility**: Provide `aria-label` tags for icon buttons and maintain WCAG contrast ratios.

---

## 4. UI Layout, Swiper & AOS Animations
- **AOS Animations**:
  - Initialized in `Layout.astro` inside a `<script>` tag.
  - Stagger grid items animations using: `data-aos-delay={index * 50}` or `index * 100`.
  - Use balanced slide directions (e.g. text sliding `fade-right`, image sliding `fade-left`).
- **Swiper Carousels**:
  - Used in `HomeSolutions.astro` and `HomeTestimonials.astro`.
  - Swiper parameters must remain clean and checked against element existence.
- **CSS Grid/Flexbox**:
  - Maintain equal height boxes (e.g. `HomeFAQ.astro` triggers) using CSS Flexbox layouts (`flex flex-col h-full` and `flex-1`) instead of hardcoded pixel sizes.

---

## 5. Development Code Safety
- **Vite Bundler Compatibility**:
  - Because `api.ts` runs on both server-side (build) and client-side, Vite will raise warnings if it tries to bundle Node.js core libraries (`fs`, `path`).
  - To bypass Vite's bundler checks for Node packages, load them dynamically via string concatenation:
    ```typescript
    const fs = await import("node:fs" + "");
    const path = await import("node:path" + "");
    ```
- **Preserve Unrelated Comments**: Always retain existing inline comments, docstrings, and HTML markup templates unless specifically requested to rewrite them.
