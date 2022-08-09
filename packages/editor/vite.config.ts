import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import VueJsx from "@vitejs/plugin-vue-jsx";
import Icons from "unplugin-icons/vite";
import Dts from "vite-plugin-dts";
import path from "path";

export default defineConfig({
  plugins: [
    Vue(),
    VueJsx(),
    Icons({
      compiler: "vue3",
    }),
    Dts({
      entryRoot: "./src",
      outputDir: "./dist",
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "dist"),
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "RichTextEditor",
      formats: ["es", "iife"],
      fileName: (format) => `rich-text-editor.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
        exports: "named",
        generatedCode: "es5",
      },
    },
    sourcemap: true,
  },
});
