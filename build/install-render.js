import { defineConfig, loadEnv } from "vite";
import path from "path";

// 生成打包入口文件 dist
// 复制components中的render、svg-icon和widgets所有组件到dist/components下
// 复制styles到dist/styles下
// 复制hooks到dist/hooks下
// 复制theme到dist/theme下
// 生成index入口文件，暴漏install方法
export default defineConfig(({ command, mode }) => {
  console.log("打包render", path.resolve(__dirname, "../install"));
  return {
    build: {
      lib: {
        entry: path.resolve(__dirname, "../install"),
        name: "JadeLowcodeRender",
        formats: ["umd"],
        fileName: (format) => `jade-lowcode.${format}.js`,
      },
      outDir: "lib-render",
      rollupOptions: {
        external: ["vue"],
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            vue: "Vue",
          },
        },
      },
    },
  };
});
