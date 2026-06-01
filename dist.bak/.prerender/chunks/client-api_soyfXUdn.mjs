import { c as createComponent } from './astro-component_BEskKHhX.mjs';
import 'piccolore';
import { c as createRenderInstruction, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from './prerender_DdeB0Q8u.mjs';
import { $ as $$Layout } from './Layout_CdswtmRm.mjs';

async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}</script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"></script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}

const $$ClientApi = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Client API Demo | LuxiArc" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="space-y-5"> <p class="text-sm font-semibold uppercase tracking-widest text-blue-600">Client Fetch</p> <h1 class="text-3xl font-bold">Demo gọi API ở client (trình duyệt)</h1> <p class="text-slate-600">Bấm nút để gọi API sau khi trang đã load.</p> <button id="loadBtn" class="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-500">
Load Todo
</button> <pre id="result" class="overflow-auto rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-800">Chưa gọi API</pre> </section> ${renderScript($$result2, "D:/code/Work_tech_5s/astrojs/thi-cong-luxiarc/src/pages/client-api.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "D:/code/Work_tech_5s/astrojs/thi-cong-luxiarc/src/pages/client-api.astro", void 0);

const $$file = "D:/code/Work_tech_5s/astrojs/thi-cong-luxiarc/src/pages/client-api.astro";
const $$url = "/client-api";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ClientApi,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
