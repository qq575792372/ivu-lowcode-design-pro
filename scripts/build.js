import path from "path";
import { fileURLToPath } from "url";
import vue from "rollup-plugin-vue";
import postcss from "rollup-plugin-postcss";
import commonjs from "rollup-plugin-commonjs";
import fs from "fs-extra";

import { defineConfig, build } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = "../lib";

function resolve(dir) {
  return path.resolve(__dirname, dir);
}

/* build({
  plugins: [vue(), postcss()],
  build: {
    lib: {
      entry: resolve("../src/components/easy-form/index.vue"),
      name: "EasyForm",
      formats: ["es"],
    },
    outDir: "easy-form-dist",
    rollupOptions: {
      external: ["vue"],
      globals: {
        vue: "Vue",
      },
    },
  },
}); */

export default defineConfig({
  plugins: [vue(), postcss()],
  build: {
    lib: {
      entry: resolve("../src/components/index.js"),
      name: "components",
      formats: ["es"],
    },
    outDir: "easy-form-dist",
    output: {
      preserveModules: true,
    },
    rollupOptions: {
      external: ["vue"],
      globals: {
        vue: "Vue",
      },
    },
  },
});
/*
export default {
  input: resolve("../src/components/easy-form/index.js"),
  output: {
    dir: "es/",
    format: "es",
    preserveModules: true,
    preserveModulesRoot: "src",
  },
  externals: ["vue"],
  plugins: [vue(), postcss()],
};
*/
