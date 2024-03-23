/**
 * 打包不同模块
 */
import { build, resolveConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import postcss from "rollup-plugin-postcss";
import { generateExternal, pathResolve } from "../utils/index.js";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { outputCjs, root, outputDir, outputEsm, outputSrc, inputSrc } from "../utils/paths.js";
import alias from "@rollup/plugin-alias";

/**
 * 打包组件
 */
export async function buildModules(done) {
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
            entryFileNames: "[name].js",
            preserveModules: true,
            preserveModulesRoot: pathResolve(outputDir, "src"),
            dir: outputEsm,
            exports: undefined,
          },
          {
            format: "cjs",
            entryFileNames: "[name].cjs",
            preserveModules: true,
            preserveModulesRoot: pathResolve(outputDir, "src"),
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
