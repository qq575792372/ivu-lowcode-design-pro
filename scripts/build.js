/**
 * 打包的步骤
 * 1.清空原有的dist目录
 * 2.创建dist/lowcode目录
 * 3.创建dist/lowcode/src目录，把components、widgets、lang、utils、hooks、themes复制过来，并把components和widgets合并一起
 * 4.在dist/lowcode下创建入口index.js文件，遍历
 * 4.用rollup开始构建，以下都是基于上面dist/src中的产物开始编译构建
 */

/* import { fileURLToPath } from "url";
import vue from "@vitejs/plugin-vue";
import glob from "fast-glob";
import postcss from "rollup-plugin-postcss";
import { defineConfig, build } from "vite";
import esbuild from "rollup-plugin-esbuild";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { rollup } from "rollup"; */
import { pathResolve } from "../scripts/utils/index.js";

// root根路径
export const root = pathResolve("../");
export const outputSrc = pathResolve(root, "src");

// 输出
export const outputRoot = "dist";
export const outputDir = "lowcode";
console.log(111, outputSrc);

/* const files = await glob.globSync("src/components/!*!/index.js");
console.log(333, files);
const bundle = await build({
  build: {
    plugins: [vue(), postcss()],
    lib: {
      entry: [resolve("../src/components/button/index.js")],
      // entry: ["../src/components/!*!/index.js"]
    },
    outDir: "es",
    rollupOptions: {
      external: ["vue"],
      output: [
        {
          format: "es",
          entryFileNames: "[name].js",
          preserveModules: true,
          dir: "dist/es",
          exports: undefined,
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

console.log(111, bundle); */
/* export default defineConfig({
  plugins: [vue(), postcss()],
  build: {
    /!*     lib: {
      entry: resolve("../src/components/index.js"),
      formats: ["es", "cjs"],
    }, *!/
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
          preserveModulesRoot: "src"
        },
        {
          format: "cjs",
          entryFileNames: "[name].cjs",
          preserveModules: true,
          dir: "dist/lib",
          exports: "named",
          preserveModulesRoot: "src"
        }
      ]
    }
  }
}); */

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
/*

const bundle = await rollup({
  input: [resolve("../src/components/index.js")],
  externals: ["vue"],
  plugins: [vue(), postcss(), nodeResolve(), esbuild()],
  treeshake: false,
});

bundle.write({
  dir: "dist/es",
  format: "es",
  exports: "named", // 输出多个文件
  preserveModules: true,
  preserveModulesRoot: "src",
  entryFileNames: `[name].mjs`,
});
bundle.write({
  dir: "dist/cjs",
  format: "cjs",
  exports: "named", // 输出多个文件
  preserveModules: true,
  preserveModulesRoot: "src",
  entryFileNames: `[name].cjs`,
});
*/
