/**
 * 打包不同模块
 */
import postcss from "rollup-plugin-postcss";
import commonjs from "@rollup/plugin-commonjs";
import alias from "@rollup/plugin-alias";
import terser from "@rollup/plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";

import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { build, resolveConfig } from "vite";

import { generateExternal, pathResolve, getPackageJson } from "../utils/index.js";
import { outputCjs, root, outputRoot, outputEsm, outputSrc, inputSrc, outputDist } from "../utils/paths.js";

/**
 * 按需打包组件
 */
export async function buildModules(done) {
  await build({
    plugins: [
      vue(),
      vueJsx(),
      postcss(),
      nodeResolve(),
      commonjs(),
      // 处理文件中的别名为相对路径
      alias({
        entries: [
          {
            find: "~",
            replacement: pathResolve(root, "./"),
          },
          {
            find: "@",
            replacement: pathResolve(outputSrc, "./"),
          },
        ],
      }),
    ],
    build: {
      lib: {
        entry: [pathResolve(outputSrc, "components/index.js")],
      },
      rollupOptions: {
        external: await generateExternal({ full: false }),
        output: [
          {
            format: "es",
            entryFileNames: "[name].mjs",
            preserveModules: true,
            preserveModulesRoot: pathResolve(outputRoot, "src"),
            dir: outputEsm,
            exports: undefined,
          },
          {
            format: "cjs",
            entryFileNames: "[name].cjs",
            preserveModules: true,
            preserveModulesRoot: pathResolve(outputRoot, "src"),
            dir: outputCjs,
            exports: "named",
          },
        ],
      },
    },
  });

  // 结束回调
  done();
}

/**
 * 打全量包
 */
export async function buildFullBundle() {
  // 生成声明注释
  const banner = `/*!
 * ${getPackageJson().name} v${getPackageJson().version}
 * Copyright 2023-${new Date().getFullYear()}, ${getPackageJson().author}
 * Released under the ${getPackageJson().license} License.
 */`;
  await build({
    plugins: [
      vue(),
      postcss(),
      nodeResolve(),
      // 处理文件中的别名为相对路径
      alias({
        entries: [
          {
            find: "~",
            replacement: pathResolve(root, "./"),
          },
          {
            find: "@",
            replacement: pathResolve(outputSrc, "./"),
          },
        ],
      }),
    ],
    build: {
      lib: {
        entry: [pathResolve(outputSrc, "components/index.js")],
      },
      rollupOptions: {
        external: await generateExternal({ full: false }),
        output: [
          {
            format: "es",
            entryFileNames: "lowcode.esm.js",
            dir: outputDist,
            exports: undefined,
            banner,
          },
          {
            format: "umd",
            name: "Lowcode",
            entryFileNames: "lowcode.umd.js",
            dir: outputDist,
            exports: "named",
            banner,
          },
          // 压缩es和umd
          {
            format: "es",
            entryFileNames: "lowcode.esm.min.js",
            dir: outputDist,
            exports: undefined,
            banner,
            plugins: [terser()],
          },
          {
            format: "umd",
            name: "Lowcode",
            entryFileNames: "lowcode.umd.min.js",
            dir: outputDist,
            exports: "named",
            banner,
            plugins: [terser()],
          },
        ],
      },
    },
  });
}
