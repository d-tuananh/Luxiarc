import { c as createComponent } from "./astro-component_BEskKHhX.mjs"
import "piccolore"
import {
  m as maybeRenderHead,
  a as renderTemplate,
  b as addAttribute,
  d as renderHead,
  r as renderComponent,
  e as renderSlot,
} from "./prerender_DdeB0Q8u.mjs"
import "clsx"

const $$Header = createComponent(
  ($$result, $$props, $$slots) => {
    return renderTemplate`${maybeRenderHead()}<header class="border-b border-slate-200 bg-white"> <nav class="mx-auto flex max-w-5xl items-center justify-between px-4 py-4"> <a href="/" class="text-lg font-bold">LuxiArc</a> <div class="flex gap-4 text-sm font-medium"> <a href="/" class="hover:text-blue-600">Home</a> <a href="/about" class="hover:text-blue-600">About</a> <a href="/contact" class="hover:text-blue-600">Contact</a> </div> </nav> </header>`
  },
  "D:/code/Work_tech_5s/astrojs/thi-cong-luxiarc/src/components/Header.astro",
  void 0
)

const $$Footer = createComponent(
  ($$result, $$props, $$slots) => {
    const Astro2 = $$result.createAstro($$props, $$slots)
    Astro2.self = $$Footer
    return renderTemplate`${maybeRenderHead()}<footer class="border-t border-slate-200 bg-white"> <div class="mx-auto max-w-5xl px-4 py-6 text-sm text-slate-600">
© ${/* @__PURE__ */ new Date().getFullYear()} LuxiArc. Built with Astro.
</div> </footer>`
  },
  "D:/code/Work_tech_5s/astrojs/thi-cong-luxiarc/src/components/Footer.astro",
  void 0
)

const $$Layout = createComponent(
  ($$result, $$props, $$slots) => {
    const Astro2 = $$result.createAstro($$props, $$slots)
    Astro2.self = $$Layout
    const { title = "LuxiArc" } = Astro2.props
    return renderTemplate`<html lang="vi"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body class="min-h-screen bg-slate-50 text-slate-900"> ${renderComponent($$result, "Header", $$Header, {})} <main class="mx-auto max-w-5xl px-4 py-12"> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`
  },
  "D:/code/Work_tech_5s/astrojs/thi-cong-luxiarc/src/layouts/Layout.astro",
  void 0
)

export { $$Layout as $ }
