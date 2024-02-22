import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  
  //👇 Configuramos el renderizado estatico o no de la aplicaicón. Las opciones son "static", "server" o "hybrid"
  output: "static", 

  //👇 Configuramos el i18n
  i18n: {
    defaultLocale: 'en', // 👈 marcamos el idioma por defecto que es 'en'
    locales: ['es', 'en'], // 👈 marcamos los idiomas que vamos a usar
    
    // 👇 Configuramos la manera de comportarse de las rutas para los idiomas. 
    // Por ejemplo en este proyecto para ingles la ruta será "/" y para español la ruta será "/es"
    routing: {
      prefixDefaultLocale: false // 👈 en caso de poner true, la ruta por defecto será "/en"
    }
  }
});