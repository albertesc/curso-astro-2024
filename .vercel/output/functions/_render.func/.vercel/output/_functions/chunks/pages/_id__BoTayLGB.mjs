/* empty css                          */
import { d as createAstro, e as createComponent, r as renderTemplate, g as renderComponent, m as maybeRenderHead, f as addAttribute, j as renderTransition, F as Fragment, u as unescapeHTML } from '../astro_0_9Cd_Bh.mjs';
import { $ as $$Layout } from './404_D6nsvfa7.mjs';
import { marked } from 'marked';
/* empty css                          */

const $$Astro$1 = createAstro();
async function getStaticPaths$1() {
  const posts = await fetch("http://localhost:4321/api/articles.json").then(
    (res) => res.json()
  );
  return posts.map((post) => ({ params: { id: post.id } }));
}
const $$id$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$id$1;
  const { id } = Astro2.params;
  const article = await fetch(
    `http://localhost:4321/api/article/${id}.json`
  ).then((res) => res.json());
  const { title, image, author, created_at, category, content } = article;
  const textContent = marked.parse(content);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="prose prose-xl mx-auto"${addAttribute(renderTransition($$result2, "3xbvo7qt", "", `post-${id}`), "data-astro-transition-scope")}> <h1>${title}</h1> <img${addAttribute(image, "src")}${addAttribute(title, "alt")} class="rounded"${addAttribute(renderTransition($$result2, "wrz7p3ad", "", `post-image-${id}`), "data-astro-transition-scope")}> <div class="flex items-center gap-6"> <span class="flex items-center gap-1 text-gray-400"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-600"> <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path> </svg> ${author} </span> <span class="flex items-center gap-1 text-gray-400"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-600"> <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"></path> </svg> ${created_at} </span> <span class="flex items-center gap-1 text-gray-400"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-600"> <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"></path> </svg> ${category} </span> </div> ${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(textContent)}` })} </article> ` })}`;
}, "/Users/albert/Sites/curso-astro-2024/src/pages/articles/[id].astro", "self");

const $$file$1 = "/Users/albert/Sites/curso-astro-2024/src/pages/articles/[id].astro";
const $$url$1 = "/articles/[id]";

const _id_$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id$1,
  file: $$file$1,
  getStaticPaths: getStaticPaths$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro();
async function getStaticPaths() {
  const posts = await fetch("http://localhost:4321/api/articles.json").then(
    (res) => res.json()
  );
  return posts.map((post) => ({ params: { id: post.id } }));
}
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const article = await fetch(
    `http://localhost:4321/api/article/${id}.json`
  ).then((res) => res.json());
  const { title, image, author, created_at, category, content } = article;
  const textContent = marked.parse(content);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="prose prose-xl mx-auto"${addAttribute(renderTransition($$result2, "nmdrd3eg", "", `post-${id}`), "data-astro-transition-scope")}> <h1>${title}</h1> <img${addAttribute(image, "src")}${addAttribute(title, "alt")} class="rounded"${addAttribute(renderTransition($$result2, "vknpmeu6", "", `post-image-${id}`), "data-astro-transition-scope")}> <div class="flex items-center gap-6"> <span class="flex items-center gap-1 text-gray-400"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-600"> <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path> </svg> ${author} </span> <span class="flex items-center gap-1 text-gray-400"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-600"> <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"></path> </svg> ${created_at} </span> <span class="flex items-center gap-1 text-gray-400"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-600"> <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"></path> </svg> ${category} </span> </div> ${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(textContent)}` })} </article> ` })}`;
}, "/Users/albert/Sites/curso-astro-2024/src/pages/es/articles/[id].astro", "self");

const $$file = "/Users/albert/Sites/curso-astro-2024/src/pages/es/articles/[id].astro";
const $$url = "/es/articles/[id]";

const _id_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { _id_$1 as _, _id_ as a };
