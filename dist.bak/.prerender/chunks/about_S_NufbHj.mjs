import { c as createComponent } from "./astro-component_BEskKHhX.mjs"
import "piccolore"
import {
  r as renderComponent,
  a as renderTemplate,
  m as maybeRenderHead,
} from "./prerender_DdeB0Q8u.mjs"
import { $ as $$Layout } from "./Layout_CdswtmRm.mjs"

const $$About = createComponent(
  ($$result, $$props, $$slots) => {
    const Astro2 = $$result.createAstro($$props, $$slots)
    Astro2.self = $$About
    return renderTemplate`${renderComponent(
      $$result,
      "Layout",
      $$Layout,
      { title: "About | LuxiArc" },
      {
        default: (
          $$result2
        ) => renderTemplate` ${maybeRenderHead()}<section class="space-y-4"> <h1 class="text-3xl font-bold">About Page</h1> <p class="max-w-2xl text-slate-600">
Astro render HTML phía server trước, nên tải nhanh. Chỉ khi cần tương tác mạnh mới thêm
      framework island.
</p> <ul class="list-disc space-y-2 pl-5 text-slate-700"> <li>Route tạo bằng file trong \`src/pages\`.</li> <li>Layout dùng chung để tránh lặp header/footer.</li> <li>Tailwind giúp style nhanh và nh?t quán.</li> </ul> </section> `,
      }
    )}`
  },
  "D:/code/Work_tech_5s/astrojs/thi-cong-luxiarc/src/pages/about.astro",
  void 0
)

const $$file =
  "D:/code/Work_tech_5s/astrojs/thi-cong-luxiarc/src/pages/about.astro"
const $$url = "/about"

const _page = /*#__PURE__*/ Object.freeze(
  /*#__PURE__*/ Object.defineProperty(
    {
      __proto__: null,
      default: $$About,
      file: $$file,
      url: $$url,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
)

const page = () => _page

export { page }
