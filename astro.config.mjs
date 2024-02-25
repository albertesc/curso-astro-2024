import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vue from "@astrojs/vue";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), vue()],
 
  //👇 Configuramos el renderizado estatico o no de la aplicaicón. Las opciones son "static", "server" o "hybrid"
  //   Cuando utilizamos "server" o "hybrid" vamos a tener que instalar un adaptador para el servidor que vamos a utilizar
  //   Más información en https://docs.astro.build/es/guides/server-side-rendering/
  output: "server",
  
  //👇 Configuramos el i18n
  i18n: {
    defaultLocale: 'en',
    // 👈 marcamos el idioma por defecto que es 'en'
    locales: ['es', 'en'],
    // 👈 marcamos los idiomas que vamos a usar

    // 👇 Configuramos la manera de comportarse de las rutas para los idiomas. 
    //    Por ejemplo en este proyecto para ingles la ruta será "/" y para español la ruta será "/es"
    routing: {
      prefixDefaultLocale: false // 👈 en caso de poner true, la ruta por defecto será "/en"
    },
    // 👇 Configuramos el fallback de los idiomas
    fallback: {
      'es': 'en' // 👈 en caso de que no se encuentre una ruta en español, se redirigirá a la ruta en inglés
    }
  },
  
  adapter: vercel()
});