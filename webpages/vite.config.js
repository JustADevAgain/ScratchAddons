import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig({
  //assetsInclude: ["**/*.css"],

  build: {
    rollupOptions: {
      input: {
        main: resolve("./index.html"),
        licenses: resolve("./licenses.html"),
        popup: resolve("./popup.html"),
        permissions: resolve("./permissions.html"),
      },
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },

  base: "/webpages/dist/",
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)).at,
      //'@@': fileURLToPath(new URL('../', import.meta.url)).at,
    },
  },
});
