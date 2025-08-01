// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  output: "server",

  vite: {
    plugins: [tailwindcss()],
  },

  server: {
    host: true, // Habilita el acceso desde la red local
  },

  adapter: vercel(),
});
