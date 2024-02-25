/* empty css                          */
import { d as createAstro, e as createComponent, r as renderTemplate, m as maybeRenderHead, f as addAttribute, i as renderSlot, g as renderComponent } from '../astro_nnZpuxeB.mjs';
import { $ as $$Layout, g as getI18N } from './404_DNCzXoZQ.mjs';

const $$Astro$3 = createAstro();
const $$Button = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Button;
  const { href, type, size } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")}${addAttribute([
    // 👆 "class:list" sirve para concatenar clases y crear estilos condicionales
    "no-underline px-6 py-3 text-white rounded-lg mt-3 inline-flex items-center gap-2 transition",
    { "bg-teal-500 hover:bg-teal-600": type === "primary" },
    // La clase "bg-teal-500" se aplicará si "type" es "primary"
    { "bg-gray-500 hover:bg-gray-600": type === "secondary" },
    // La clase "bg-gray-500" se aplicará si "type" es "secondary"
    { "text-sm": size === "small" },
    // La clase "text-sm" se aplicará si "size" es "small"
    { "text-xl": size === "large" }
    // La clase "text-xl" se aplicará si "size" es "large"
  ], "class:list")}> ${renderSlot($$result, $$slots["icon-left"])} ${renderSlot($$result, $$slots["default"])} ${renderSlot($$result, $$slots["icon-right"])} </a>`;
}, "/Users/albert/Sites/curso-astro-2024/src/components/Button.astro", void 0);

const $$Astro$2 = createAstro();
const $$About$2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$About$2;
  const { currentLocale } = Astro2;
  const t = getI18N({ currentLocale });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": t.about.SEO_TITLE }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col lg:flex-row gap-8"> <div> <img src="/images/author.webp" alt="Author" class="rounded-lg"> </div> <div class="prose">  <h1>${t.about.PAGE_TITLE}</h1> <p> ${t.about.PAGE_TEXT_01} </p> <p> ${t.about.PAGE_TEXT_02} </p> ${renderComponent($$result2, "Button", $$Button, { "href": "/", "type": "primary" }, { "default": ($$result3) => renderTemplate`${t.about.BUTTON_CTA}` })} </div> </div> ` })}`;
}, "/Users/albert/Sites/curso-astro-2024/src/components/About.astro", void 0);

const $$Astro$1 = createAstro();
const $$About$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$About$1;
  return renderTemplate`${renderComponent($$result, "AboutPage", $$About$2, {})}`;
}, "/Users/albert/Sites/curso-astro-2024/src/pages/about.astro", void 0);

const $$file$1 = "/Users/albert/Sites/curso-astro-2024/src/pages/about.astro";
const $$url$1 = "/about";

const about$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About$1,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro();
const $$About = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$About;
  return renderTemplate`${renderComponent($$result, "AboutPage", $$About$2, {})}`;
}, "/Users/albert/Sites/curso-astro-2024/src/pages/es/about.astro", void 0);

const $$file = "/Users/albert/Sites/curso-astro-2024/src/pages/es/about.astro";
const $$url = "/es/about";

const about = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Button as $, about$1 as a, about as b };
