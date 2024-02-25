/* empty css                          */
import { A as AstroError, c as MissingLocale, d as createAstro, e as createComponent, r as renderTemplate, m as maybeRenderHead, f as addAttribute, g as renderComponent, h as renderHead, i as renderSlot } from '../astro_nnZpuxeB.mjs';
import { a as appendForwardSlash, j as joinPaths } from '../astro/assets-service_av-UQSvb.mjs';
/* empty css                          */

function shouldAppendForwardSlash(trailingSlash, buildFormat) {
  switch (trailingSlash) {
    case "always":
      return true;
    case "never":
      return false;
    case "ignore": {
      switch (buildFormat) {
        case "directory":
          return true;
        case "preserve":
        case "file":
          return false;
      }
    }
  }
}

function getLocaleRelativeUrl({
  locale,
  base,
  locales: _locales,
  trailingSlash,
  format,
  path,
  prependWith,
  normalizeLocale = true,
  routing = "pathname-prefix-other-locales",
  defaultLocale
}) {
  const codeToUse = peekCodePathToUse(_locales, locale);
  if (!codeToUse) {
    throw new AstroError({
      ...MissingLocale,
      message: MissingLocale.message(locale)
    });
  }
  const pathsToJoin = [base, prependWith];
  const normalizedLocale = normalizeLocale ? normalizeTheLocale(codeToUse) : codeToUse;
  if (routing === "pathname-prefix-always" || routing === "pathname-prefix-always-no-redirect" || routing === "domains-prefix-always" || routing === "domains-prefix-always-no-redirect") {
    pathsToJoin.push(normalizedLocale);
  } else if (locale !== defaultLocale) {
    pathsToJoin.push(normalizedLocale);
  }
  pathsToJoin.push(path);
  if (shouldAppendForwardSlash(trailingSlash, format)) {
    return appendForwardSlash(joinPaths(...pathsToJoin));
  } else {
    return joinPaths(...pathsToJoin);
  }
}
function getPathByLocale(locale, locales) {
  for (const loopLocale of locales) {
    if (typeof loopLocale === "string") {
      if (loopLocale === locale) {
        return loopLocale;
      }
    } else {
      for (const code of loopLocale.codes) {
        if (code === locale) {
          return loopLocale.path;
        }
      }
    }
  }
  throw new Unreachable();
}
function normalizeTheLocale(locale) {
  return locale.replaceAll("_", "-").toLowerCase();
}
function toCodes(locales) {
  return locales.map((loopLocale) => {
    if (typeof loopLocale === "string") {
      return loopLocale;
    } else {
      return loopLocale.codes[0];
    }
  });
}
function peekCodePathToUse(locales, locale) {
  for (const loopLocale of locales) {
    if (typeof loopLocale === "string") {
      if (loopLocale === locale) {
        return loopLocale;
      }
    } else {
      for (const code of loopLocale.codes) {
        if (code === locale) {
          return loopLocale.path;
        }
      }
    }
  }
  return void 0;
}
class Unreachable extends Error {
  constructor() {
    super(
      "Astro encountered an unexpected line of code.\nIn most cases, this is not your fault, but a bug in astro code.\nIf there isn't one already, please create an issue.\nhttps://astro.build/issues"
    );
  }
}

var define_ASTRO_INTERNAL_I18N_CONFIG_default = { base: "/", format: "directory", trailingSlash: "ignore", i18n: { defaultLocale: "en", locales: ["es", "en"], fallback: { es: "en" }, routing: "pathname-prefix-other-locales" }, isBuild: true };
const { trailingSlash, format, site, i18n, isBuild } = (
  // @ts-expect-error
  define_ASTRO_INTERNAL_I18N_CONFIG_default
);
const { defaultLocale, locales, routing, domains } = i18n;
const base = "/";
const getRelativeLocaleUrl = (locale, path, options) => getLocaleRelativeUrl({
  locale,
  path,
  base,
  trailingSlash,
  format,
  defaultLocale,
  locales,
  routing,
  domains,
  ...options
});

const navigation$1 = {
	HOME: "Principal",
	ABOUT: "Sobre Astro",
	ELEMENTS: "Elementos"
};
const home$1 = {
	SEO_TITLE: "Astro - La forma más rápida de construir sitios web modernos",
	SEO_DESCRIPTION: "Astro es un nuevo tipo de constructor de sitios estáticos que ofrece un rendimiento ultrarrápido y una productividad de desarrollador moderna. Es el primer marco que está construido con su marco de JavaScript favorito y genera un sitio completamente estático que se puede implementar en cualquier CDN.",
	PAGE_TITLE: "Articulos recientes"
};
const about$1 = {
	SEO_TITLE: "Bienvendio a Astro",
	SEO_DESCRIPTION: "Astro es un nuevo tipo de constructor de sitios estáticos que ofrece un rendimiento ultrarrápido y una productividad de desarrollador moderna. Es el primer marco que está construido con su marco de JavaScript favorito y genera un sitio completamente estático que se puede implementar en cualquier CDN.",
	PAGE_TITLE: "Bienvenido a Astro",
	PAGE_TEXT_01: "Astro es un nuevo tipo de constructor de sitios estáticos que ofrece un rendimiento ultrarrápido y una productividad de desarrollador moderna. Es el primer marco que está construido con su marco de JavaScript favorito y genera un sitio completamente estático que se puede implementar en cualquier CDN.",
	PAGE_TEXT_02: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis nemo aliquam sit quae doloremque, provident excepturi magnam modi iusto, quos veritatis aut. Numquam ducimus provident iusto perspiciatis perferendis, cumque velit officia magni delectus dolor consequatur ea veniam. Officia, vero voluptates!",
	BUTTON_CTA: "Leer más"
};
const spanish = {
	navigation: navigation$1,
	home: home$1,
	about: about$1
};

const navigation = {
	HOME: "Home",
	ABOUT: "About",
	ELEMENTS: "Elements"
};
const home = {
	SEO_TITLE: "Astro - The Future of Static Sites",
	SEO_DESCRIPTION: "Astro is a new kind of static site builder that delivers lightning-fast performance and modern developer productivity. It's the first framework that's both built with your favorite JavaScript framework and generates a fully static site that can deploy to any CDN.",
	PAGE_TITLE: "Latest Articles"
};
const about = {
	SEO_TITLE: "Welcome to Astro",
	SEO_DESCRIPTION: "Astro is a new kind of static site builder that delivers lightning-fast performance and modern developer productivity. It's the first framework that's both built with your favorite JavaScript framework and generates a fully static site that can deploy to any CDN.",
	PAGE_TITLE: "Welcome to Astro",
	PAGE_TEXT_01: "Astro is a new kind of static site builder that delivers lightning-fast performance and modern developer productivity. It's the first framework that's both built with your favorite JavaScript framework and generates a fully static site that can deploy to any CDN.",
	PAGE_TEXT_02: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis nemo aliquam sit quae doloremque, provident excepturi magnam modi iusto, quos veritatis aut. Numquam ducimus provident iusto perspiciatis perferendis, cumque velit officia magni delectus dolor consequatur ea veniam. Officia, vero voluptates!",
	BUTTON_CTA: "Get In Touch"
};
const english = {
	navigation: navigation,
	home: home,
	about: about
};

const LANGUAGES = { // 👈 Creamos un objeto con los idiomas para no tener magic strings
    SPANISH: 'es',
    ENGLISH: 'en'
};

function getI18N ({ currentLocale }) { // 👈 Creamos una función que recibe el idioma actual
    if(currentLocale === LANGUAGES.ENGLISH) return english; // 👈 Si el idioma actual es inglés, retornamos el JSON en inglés
    if(currentLocale === LANGUAGES.SPANISH) return spanish; // 👈 Si el idioma actual es español, retornamos el JSON en español
    return english; // 👈 Si no se encuentra el idioma, retornamos el JSON en inglés
}
 // 👈 Exportamos las constantes y la función

const $$Astro$6 = createAstro();
const $$Menu = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Menu;
  const { currentLocale } = Astro2;
  const currentPath = Astro2.url.pathname;
  const isBlog = currentPath.includes("articles");
  const t = getI18N({ currentLocale });
  return renderTemplate`${maybeRenderHead()}<li> <a${addAttribute([
    "text-lg",
    {
      underline: currentPath === getRelativeLocaleUrl(currentLocale, "/") || isBlog
    }
  ], "class:list")}${addAttribute(getRelativeLocaleUrl(currentLocale, "/"), "href")}>${t.navigation.HOME}</a> </li> <li> <a${addAttribute([
    "text-lg",
    {
      underline: currentPath === getRelativeLocaleUrl(currentLocale, "/about")
    }
  ], "class:list")}${addAttribute(getRelativeLocaleUrl(currentLocale, "/about"), "href")}>${t.navigation.ABOUT}</a> </li> <li> <a${addAttribute([
    "text-lg",
    {
      underline: currentPath === getRelativeLocaleUrl(currentLocale, "/elements")
    }
  ], "class:list")}${addAttribute(getRelativeLocaleUrl(currentLocale, "/elements"), "href")}>${t.navigation.ELEMENTS}</a> </li>`;
}, "/Users/albert/Sites/curso-astro-2024/src/components/Menu.astro", void 0);

// Esta función recibe un objeto con la propiedad pathname y devuelve la ruta de la página actual.

function getRouteFromPathname({ pathname }) {
    const route = pathname
        .split("/")
        .filter((el) => el !== "" && el !== "en" && el !== "es")
        .join("/");

    return route;
}

const $$Astro$5 = createAstro();
const $$LangSwitcher = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$LangSwitcher;
  const { currentLocale } = Astro2;
  const currentPath = Astro2.url.pathname;
  const currentRoute = getRouteFromPathname({ pathname: currentPath });
  return renderTemplate`${maybeRenderHead()}<nav> <ul class="flex items-center gap-6"> <li> <a${addAttribute([
    // 👆 Agregamos una clase condicional para subrayar el idioma actual
    "text-lg",
    {
      underline: currentLocale === "en"
    }
  ], "class:list")}${addAttribute(getRelativeLocaleUrl("en", currentRoute), "href")}>English</a> </li> <li> <a${addAttribute([
    // 👆 Agregamos una clase condicional para subrayar el idioma actual
    "text-lg",
    {
      underline: currentLocale === "es"
    }
  ], "class:list")}${addAttribute(getRelativeLocaleUrl("es", currentRoute), "href")}>Spanish</a> </li> </ul> </nav>`;
}, "/Users/albert/Sites/curso-astro-2024/src/components/LangSwitcher.astro", void 0);

const $$Astro$4 = createAstro();
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Header;
  const currentLocale = Astro2.currentLocale;
  return renderTemplate`${maybeRenderHead()}<header class="container gap-3 flex flex-col lg:flex-row justify-between items-center py-6"> <h1 class="text-4xl text-teal-500 font-bold"> <a${addAttribute(getRelativeLocaleUrl(currentLocale, "/"), "href")}>Astro Blog</a> </h1> <nav> <ul class="flex items-center gap-6"> ${renderComponent($$result, "Menu", $$Menu, {})} </ul> </nav> ${renderComponent($$result, "LangSwitcher", $$LangSwitcher, {})} </header>`;
}, "/Users/albert/Sites/curso-astro-2024/src/components/Header.astro", void 0);

const $$Astro$3 = createAstro();
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${maybeRenderHead()}<footer class="bg-[#152035] py-20 mt-auto text-white"> <div class="container"> <nav> <ul class="flex items-center justify-center gap-6"> ${renderComponent($$result, "Menu", $$Menu, {})} </ul> </nav> <small class="text-center block mt-12">© Todos los derechos reservados</small> </div> </footer>`;
}, "/Users/albert/Sites/curso-astro-2024/src/components/Footer.astro", void 0);

const $$Astro$2 = createAstro();
const $$ViewTransitions = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>`;
}, "/Users/albert/Sites/curso-astro-2024/node_modules/.pnpm/astro@4.4.1/node_modules/astro/components/ViewTransitions.astro", void 0);

const $$Astro$1 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderComponent($$result, "ViewTransitions", $$ViewTransitions, {})}${renderHead()}</head> <body class="flex flex-col min-h-screen"> ${renderComponent($$result, "Header", $$Header, {})} <main class="container max-w-screen-lg mx-auto py-8"> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "/Users/albert/Sites/curso-astro-2024/src/layouts/Layout.astro", void 0);

const $$Astro = createAstro();
const $$404 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$404;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Page not found" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="text-center text-4xl font-bold">404</h1> <p class="text-center">Page not found</p> ` })}`;
}, "/Users/albert/Sites/curso-astro-2024/src/pages/404.astro", void 0);

const $$file = "/Users/albert/Sites/curso-astro-2024/src/pages/404.astro";
const $$url = "/404";

const _404 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Layout as $, _404 as _, getRelativeLocaleUrl as a, getPathByLocale as b, getI18N as g, normalizeTheLocale as n, shouldAppendForwardSlash as s, toCodes as t };
