import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  
  //👇 Configuramos el renderizado estatico o no de la aplicaicón. Las opciones son "static", "server" o "hybrid"
  //   Cuando utilizamos "server" o "hybrid" vamos a tener que instalar un adaptador para el servidor que vamos a utilizar
  //   Más información en https://docs.astro.build/es/guides/server-side-rendering/
  output: "static", 
});