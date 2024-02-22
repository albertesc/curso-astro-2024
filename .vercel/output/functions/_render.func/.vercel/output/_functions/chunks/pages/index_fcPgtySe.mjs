/* empty css                          */
import { d as createAstro, e as createComponent, r as renderTemplate, m as maybeRenderHead, f as addAttribute, j as renderTransition, g as renderComponent } from '../astro_0_9Cd_Bh.mjs';
import { a as getRelativeLocaleUrl, $ as $$Layout, g as getI18N } from './404_D6nsvfa7.mjs';
/* empty css                          */
import { A as Accordion } from './elements_Sq54Q8Lc.mjs';

const $$Astro$3 = createAstro();
const $$Card = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Card;
  const { article } = Astro2.props;
  const { id, url, image, title, author, created_at, category, excerpt } = article;
  const { currentLocale } = Astro2;
  return renderTemplate`${maybeRenderHead()}<article${addAttribute(renderTransition($$result, "v5jflahd", "", `post-${id}`), "data-astro-transition-scope")}> <a${addAttribute(getRelativeLocaleUrl(currentLocale, url), "href")}> <img${addAttribute(image, "src")}${addAttribute(title, "alt")} class="rounded"${addAttribute(renderTransition($$result, "2jhrfvd3", "", `post-image-${id}`), "data-astro-transition-scope")}> </a> <div class="flex items-center gap-6 mt-4"> <span class="flex items-center gap-1 text-gray-400"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-600"> <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path> </svg> ${author} </span> <span class="flex items-center gap-1 text-gray-400"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-600"> <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"></path> </svg> ${created_at} </span> <span class="flex items-center gap-1 text-gray-400"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-600"> <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"></path> </svg> ${category} </span> </div> <a${addAttribute(getRelativeLocaleUrl(currentLocale, url), "href")}> <h3 class="block text-3xl hover:text-teal-500 font-bold py-4 transition duration-300"> ${title} </h3> </a> <p class="text-gray-500">${excerpt}</p> </article>`;
}, "/Users/albert/Sites/curso-astro-2024/src/components/Card.astro", "self");

const $$Astro$2 = createAstro();
const $$Home = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Home;
  const { currentLocale } = Astro2;
  const t = getI18N({ currentLocale });
  const articles = await fetch("http://localhost:4321/api/articles.json").then(
    (res) => res.json()
  );
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Welcome to Astro." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="text-3xl font-bold text-center mb-8">${t.home.PAGE_TITLE}</h1>   <div class="grid grid-cols-2 gap-8"> ${articles.map((article) => renderTemplate`${renderComponent($$result2, "Card", $$Card, { "article": article })}`)} </div> <div class="my-10"> <!-- 👇 La directiva "client:visible" Se utiliza para cargar el JavaScript solo cuando el elemento sea visible  --> ${renderComponent($$result2, "Accordion", Accordion, { "title": "Why should you need to do this?", "client:visible": true, "client:component-hydration": "visible", "client:component-path": "@components/Accordion.jsx", "client:component-export": "Accordion" }, { "default": ($$result3) => renderTemplate` <p class="mt-4">
Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus,
        obcaecati. Porro, recusandae similique! Quia accusamus, sint commodi
        cupiditate minus cumque, nam sit mollitia unde temporibus ipsa ea,
        laborum maiores architecto.
</p> ` })} </div> ` })}`;
}, "/Users/albert/Sites/curso-astro-2024/src/components/Home.astro", void 0);

const $$Astro$1 = createAstro();
const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Index$1;
  return renderTemplate`${renderComponent($$result, "Home", $$Home, {})}`;
}, "/Users/albert/Sites/curso-astro-2024/src/pages/es/index.astro", void 0);

const $$file$1 = "/Users/albert/Sites/curso-astro-2024/src/pages/es/index.astro";
const $$url$1 = "/es";

const index$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$1,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Home", $$Home, {})}`;
}, "/Users/albert/Sites/curso-astro-2024/src/pages/index.astro", void 0);

const $$file = "/Users/albert/Sites/curso-astro-2024/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { index as a, index$1 as i };
