import { defineConfig, loadEnv } from "vite";
import path from "path";

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
