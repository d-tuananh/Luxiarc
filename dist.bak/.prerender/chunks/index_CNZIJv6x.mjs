import { c as createComponent } from "./astro-component_BEskKHhX.mjs"
import "piccolore"
import {
  r as renderComponent,
  a as renderTemplate,
  m as maybeRenderHead,
} from "./prerender_DdeB0Q8u.mjs"
import { $ as $$Layout } from "./Layout_CdswtmRm.mjs"

const $$Index = createComponent(
  ($$result, $$props, $$slots) => {
    const Astro2 = $$result.createAstro($$props, $$slots)
    Astro2.self = $$Index
    return renderTemplate`${renderComponent(
      $$result,
      "Layout",
      $$Layout,
      { title: "Home | LuxiArc" },
      {
        default: (
          $$result2
        ) => renderTemplate` ${maybeRenderHead()}<section class="space-y-4 container"> <p class="text-sm font-semibold uppercase tracking-widest text-blue-600">Astro Demo</p> <h1 class="text-4xl font-bold">Trang chủ mẫu với LuxiArc</h1> <p class="max-w-2xl text-slate-600">
Đây là trang Home. Bạn có thể tích block này thành component trong \`src/components\` khi dự án lớn hơn.
</p> <div class="flex gap-3"> <a href="/about" class="rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-700">Xem About</a> <a href="/contact" class="rounded-lg border border-slate-300 bg-white px-4 py-2 hover:bg-slate-100">Xem Contact</a> </div> </section> `,
      }
    )}`
  },
  "D:/code/Work_tech_5s/astrojs/thi-cong-luxiarc/src/pages/index.astro",
  void 0
)

const $$file =
  "D:/code/Work_tech_5s/astrojs/thi-cong-luxiarc/src/pages/index.astro"
const $$url = ""

const _page = /*#__PURE__*/ Object.freeze(
  /*#__PURE__*/ Object.defineProperty(
    {
      __proto__: null,
      default: $$Index,
      file: $$file,
      url: $$url,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
)

const page = () => _page

export { page }
