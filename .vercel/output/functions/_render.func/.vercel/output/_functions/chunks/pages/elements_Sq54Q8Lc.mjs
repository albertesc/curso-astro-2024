/* empty css                          */
import { d as createAstro, e as createComponent, r as renderTemplate, g as renderComponent, m as maybeRenderHead, F as Fragment, p as createTransitionScope } from '../astro_0_9Cd_Bh.mjs';
import { $ as $$Layout } from './404_D6nsvfa7.mjs';
import { $ as $$Button } from './about_Bz0rhzV1.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';
/* empty css                          */

function Accordion({ title, children }) {
  const [active, setActive] = useState(false);
  const classActive = active ? "block" : "hidden";
  const classIconActive = active ? "transform rotate-180" : "";
  return /* @__PURE__ */ jsxs("div", { className: `w-full px-8 py-4 rounded-lg bg-gray-100 border border-gray-300 text-gray-600`, children: [
    /* @__PURE__ */ jsxs("button", { className: "flex items-center justify-between w-full text-lg", onClick: () => setActive(!active), children: [
      title,
      /* @__PURE__ */ jsx("svg", { className: `${classIconActive} transition w-4 h-4 text-gray-600`, x: "0px", y: "0px", viewBox: "0 0 512 512", children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M505.755,123.592c-8.341-8.341-21.824-8.341-30.165,0L256.005,343.176L36.421,123.592c-8.341-8.341-21.824-8.341-30.165,0 s-8.341,21.824,0,30.165l234.667,234.667c4.16,4.16,9.621,6.251,15.083,6.251c5.462,0,10.923-2.091,15.083-6.251l234.667-234.667 C514.096,145.416,514.096,131.933,505.755,123.592z" }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: classActive, children })
  ] });
}

const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const _sfc_main = {
  __name: 'Accordion',
  props: {
        title: {
            type: String,
            required: true
        }
    },
  setup(__props, { expose: __expose }) {
  __expose();

    const props = __props;

    const title = props.title;
    const classIsActive = ref("hidden");

    function toggleAccordion() {
        classIsActive.value = classIsActive.value === "hidden" ? "block" : "hidden";
    }

const __returned__ = { props, title, classIsActive, toggleAccordion, ref };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${
    ssrRenderAttrs(mergeProps({ class: "w-full px-8 py-4 rounded-lg bg-gray-100 border border-gray-300 text-gray-600" }, _attrs))
  }><button class="flex items-center justify-between w-full text-lg">${
    ssrInterpolate($setup.title)
  } <svg class="transition w-4 h-4 text-gray-600" x="0px" y="0px" viewBox="0 0 512 512"><path fill="currentColor" d="M505.755,123.592c-8.341-8.341-21.824-8.341-30.165,0L256.005,343.176L36.421,123.592c-8.341-8.341-21.824-8.341-30.165,0 s-8.341,21.824,0,30.165l234.667,234.667c4.16,4.16,9.621,6.251,15.083,6.251c5.462,0,10.923-2.091,15.083-6.251l234.667-234.667 C514.096,145.416,514.096,131.933,505.755,123.592z"></path></svg></button><div class="${
    ssrRenderClass($setup.classIsActive)
  }">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/Accordion.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const AccordionVue = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender]]);

const $$Astro$2 = createAstro();
const $$Elements$2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Elements$2;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "UI Elements" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="text-2xl">UI Elements Examples</h1> <div class="flex items-center gap-4"> ${renderComponent($$result2, "Button", $$Button, { "href": "/", "type": "primary" }, { "default": ($$result3) => renderTemplate`Button` })} ${renderComponent($$result2, "Button", $$Button, { "href": "/", "type": "primary", "size": "small" }, { "default": ($$result3) => renderTemplate`Button` })} ${renderComponent($$result2, "Button", $$Button, { "href": "/", "type": "primary", "size": "large" }, { "default": ($$result3) => renderTemplate`Button` })} ${renderComponent($$result2, "Button", $$Button, { "href": "/", "type": "secondary" }, { "default": ($$result3) => renderTemplate`Secondary Button` })} ${renderComponent($$result2, "Button", $$Button, { "href": "/", "type": "secondary", "size": "small" }, { "default": ($$result3) => renderTemplate`Secondary Button` })} ${renderComponent($$result2, "Button", $$Button, { "href": "/", "type": "secondary", "size": "large" }, { "default": ($$result3) => renderTemplate`Secondary Button` })} </div> <div class="flex items-center gap-4"> ${renderComponent($$result2, "Button", $$Button, { "href": "/", "type": "primary" }, { "default": ($$result3) => renderTemplate` 
Button
`, "icon-left": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "icon-left" }, { "default": ($$result4) => renderTemplate` <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path> </svg> ` })}` })} ${renderComponent($$result2, "Button", $$Button, { "href": "/", "type": "primary" }, { "default": ($$result3) => renderTemplate` 
Button
`, "icon-right": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "icon-right" }, { "default": ($$result4) => renderTemplate` <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path> </svg> ` })}` })} </div> <h2 class="text-3xl mt-16 mb-8">Accordion React component</h2> <div class="flex flex-col gap-4"> <!-- 👇 La directiva "client:load" Se utiliza para cargar el JavaScript cuando se carga la página  --> ${renderComponent($$result2, "Accordion", Accordion, { "client:load": true, "title": "Why should you need to do this?", "client:component-hydration": "load", "client:component-path": "@components/Accordion.jsx", "client:component-export": "Accordion", "data-astro-transition-persist": createTransitionScope($$result2, "xznesfmx") }, { "default": ($$result3) => renderTemplate` <p class="mt-4">
Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus,
        obcaecati. Porro, recusandae similique! Quia accusamus, sint commodi
        cupiditate minus cumque, nam sit mollitia unde temporibus ipsa ea,
        laborum maiores architecto.
</p> ` })} <!-- 👇 La directiva "client:idle" Se utiliza para cargar el JavaScript cuando se carga 
            la página y cuando el navegador haya cargado todo el contenido  --> ${renderComponent($$result2, "Accordion", Accordion, { "client:idle": true, "title": "Why should you need to do this?", "client:component-hydration": "idle", "client:component-path": "@components/Accordion.jsx", "client:component-export": "Accordion", "data-astro-transition-persist": createTransitionScope($$result2, "e56vn64j") }, { "default": ($$result3) => renderTemplate` <p class="mt-4">
Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus,
        obcaecati. Porro, recusandae similique! Quia accusamus, sint commodi
        cupiditate minus cumque, nam sit mollitia unde temporibus ipsa ea,
        laborum maiores architecto.
</p> ` })} <!-- 👇 La directiva "transition:persist" Se utiliza para mantener el estado del 
            componete aunque se cambie de página  --> ${renderComponent($$result2, "Accordion", Accordion, { "client:load": true, "title": "Why should you need to do this?", "client:component-hydration": "load", "client:component-path": "@components/Accordion.jsx", "client:component-export": "Accordion", "data-astro-transition-persist": createTransitionScope($$result2, "pw4d326n") }, { "default": ($$result3) => renderTemplate` <p class="mt-4">
Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus,
        obcaecati. Porro, recusandae similique! Quia accusamus, sint commodi
        cupiditate minus cumque, nam sit mollitia unde temporibus ipsa ea,
        laborum maiores architecto.
</p> ` })} </div> <h2 class="text-3xl mt-16 mb-8">Accordion Vue component</h2> <div class="flex flex-col gap-4"> <!-- 👇 La directiva "client:load" Se utiliza para cargar el JavaScript cuando se carga la página  --> ${renderComponent($$result2, "AccordionVue", AccordionVue, { "client:load": true, "title": "Why should you need to do this?", "client:component-hydration": "load", "client:component-path": "@components/Accordion.vue", "client:component-export": "default", "data-astro-transition-persist": createTransitionScope($$result2, "c2tn7dl4") }, { "default": ($$result3) => renderTemplate` <p class="mt-4">
Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus,
        obcaecati. Porro, recusandae similique! Quia accusamus, sint commodi
        cupiditate minus cumque, nam sit mollitia unde temporibus ipsa ea,
        laborum maiores architecto.
</p> ` })} <!-- 👇 La directiva "client:idle" Se utiliza para cargar el JavaScript cuando se carga 
            la página y cuando el navegador haya cargado todo el contenido  --> ${renderComponent($$result2, "AccordionVue", AccordionVue, { "client:idle": true, "title": "Why should you need to do this?", "client:component-hydration": "idle", "client:component-path": "@components/Accordion.vue", "client:component-export": "default", "data-astro-transition-persist": createTransitionScope($$result2, "t7aewgll") }, { "default": ($$result3) => renderTemplate` <p class="mt-4">
Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus,
        obcaecati. Porro, recusandae similique! Quia accusamus, sint commodi
        cupiditate minus cumque, nam sit mollitia unde temporibus ipsa ea,
        laborum maiores architecto.
</p> ` })} <!-- 👇 La directiva "transition:persist" Se utiliza para mantener el estado del 
            componete aunque se cambie de página  --> ${renderComponent($$result2, "AccordionVue", AccordionVue, { "client:load": true, "title": "Why should you need to do this?", "client:component-hydration": "load", "client:component-path": "@components/Accordion.vue", "client:component-export": "default", "data-astro-transition-persist": createTransitionScope($$result2, "duo2ga25") }, { "default": ($$result3) => renderTemplate` <p class="mt-4">
Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus,
        obcaecati. Porro, recusandae similique! Quia accusamus, sint commodi
        cupiditate minus cumque, nam sit mollitia unde temporibus ipsa ea,
        laborum maiores architecto.
</p> ` })} </div> ` })}`;
}, "/Users/albert/Sites/curso-astro-2024/src/components/Elements.astro", "self");

const $$Astro$1 = createAstro();
const $$Elements$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Elements$1;
  return renderTemplate`${renderComponent($$result, "ElementsPage", $$Elements$2, {})}`;
}, "/Users/albert/Sites/curso-astro-2024/src/pages/elements.astro", void 0);

const $$file$1 = "/Users/albert/Sites/curso-astro-2024/src/pages/elements.astro";
const $$url$1 = "/elements";

const elements$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Elements$1,
    file: $$file$1,
    url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro();
const $$Elements = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Elements;
  return renderTemplate`${renderComponent($$result, "ElementsPage", $$Elements$2, {})}`;
}, "/Users/albert/Sites/curso-astro-2024/src/pages/es/elements.astro", void 0);

const $$file = "/Users/albert/Sites/curso-astro-2024/src/pages/es/elements.astro";
const $$url = "/es/elements";

const elements = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Elements,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { Accordion as A, elements as a, elements$1 as e };
