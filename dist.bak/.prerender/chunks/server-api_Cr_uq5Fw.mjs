import { c as createComponent } from './astro-component_BEskKHhX.mjs';
import 'piccolore';
import { r as renderComponent, a as renderTemplate, m as maybeRenderHead } from './prerender_DdeB0Q8u.mjs';
import { $ as $$Layout } from './Layout_CdswtmRm.mjs';

const $$ServerApi = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ServerApi;
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=6");
  if (!res.ok) {
    throw new Error(`Fetch failed with status ${res.status}`);
  }
  const posts = await res.json();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Server API Demo | LuxiArc" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="space-y-5"> <p class="text-sm font-semibold uppercase tracking-widest text-blue-600">Server Fetch</p> <h1 class="text-3xl font-bold">Demo gọi API ở server (Astro frontmatter)</h1> <p class="text-slate-600">
Dữ liệu đã được lấy lúc render trang, phù hợp SEO và không lộ API key trên browser.
</p> <div class="grid gap-4 md:grid-cols-2"> ${posts.map((post) => renderTemplate`<article class="rounded-xl border border-slate-200 bg-white p-4"> <h2 class="mb-2 font-semibold">${post.title}</h2> <p class="text-sm text-slate-600">${post.body}</p> </article>`)} </div> </section> ` })}`;
}, "D:/code/Work_tech_5s/astrojs/thi-cong-luxiarc/src/pages/server-api.astro", void 0);

const $$file = "D:/code/Work_tech_5s/astrojs/thi-cong-luxiarc/src/pages/server-api.astro";
const $$url = "/server-api";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ServerApi,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
