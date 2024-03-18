/**
 * 打包的步骤
 * 1.清空原有的dist目录
 * 2.创建dist/lowcode目录
 * 3.创建dist/lowcode/src目录，把components、widgets、lang、utils、hooks、themes复制过来，并把components和widgets合并一起
 * 4.在dist/lowcode下创建入口index.js文件，遍历
 * 4.用rollup开始构建，以下都是基于上面dist/src中的产物开始编译构建
 */


import path from "path";
import { fileURLToPath } from "url";
import vue from "@vitejs/plugin-vue";
import postcss from "rollup-plugin-postcss";
import { defineConfig, build } from "vite";

const __filename = fileURLToPath(import.meta.url); /*  */
const __dirname = path.dirname(__filename);

// 输出的root路径
const outputRoot = "src";
// 输出文件名
const outputDir = "lib";
// 转换路径
const resolve = function(dir) {
  return path.resolve(__dirname, dir);
};

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
