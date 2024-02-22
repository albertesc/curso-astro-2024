import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  
  //👇 Configuramos el renderizado estatico o no de la aplicaicón. Las opciones son "static", "server" o "hybrid"
  output: "static", 
});