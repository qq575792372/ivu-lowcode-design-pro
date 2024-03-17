import path from "path";
import { fileURLToPath } from "url";
import vue from "@vitejs/plugin-vue";
/* import vue from "rollup-plugin-vue"; */
import postcss from "rollup-plugin-postcss";
import { defineConfig, build } from "vite";

const __filename = fileURLToPath(import.meta.url); /*  */
const __dirname = path.dirname(__filename);

const outputDir = "../lib";

function resolve(dir) {
  return path.resolve(__dirname, dir);
}

/* build({
  build: {
    rollupOptions: {
      plugins: [vue({ css: true, compileTemplate: true }), postcss()],
      external: ["vue"],
      input: [resolve("../src/components/index.js")],
      output: [
        {
          format: "es",
          entryFileNames: "[name].js",
          /!*         preserveModules: true,
          preserveModulesRoot: "src", *!/
          dir: "dist/es",
        },
        /!*         {
          format: "cjs",
          entryFileNames: "[name].cjs",
          dir: "dist/lib",
          preserveModules: true,
          preserveModulesRoot: "src",
        }, *!/
      ],
    },
  },
}); */

export default defineConfig({
  plugins: [vue(), postcss()],
  build: {
    /*     lib: {
      entry: resolve("../src/components/index.js"),
      formats: ["es", "cjs"],
    }, */
    rollupOptions: {
      external: ["vue"],
      input: resolve("../src/components/index.js"),
      output: [
        {
          format: "es",
          entryFileNames: "[name].js",
          preserveModules: true,
          dir: "dist/es",
          exports: undefined",
          preserveModulesRoot: "src",
        },
        {
          format: "cjs",
          entryFileNames: "[name].cjs",
          preserveModules: true,
          dir: "dist/lib",
          exports: "named",
          preserveModulesRoot: "src",
        },
      ],
    },
  },
});

/*
export default {
  input: resolve("../src/components/index.js"),
  /!*   input: ["src/components/easy-form/index.js", "src/components/button/index.js"], *!/
  output: [
    {
      dir: "dist",
      format: "es",
      exports: "named", // 输出多个文件
      preserveModules: true,
      preserveModulesRoot: "src",
      entryFileNames: (chunk) => `[name].mjs`,
    },
  ],
  externals: ["vue"],
  plugins: [vue(), postcss()],
};
*/
