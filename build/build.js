import path from "path";
import { fileURLToPath } from "url";

import { defineConfig, build } from "vite";
import GlobalImportPlugin from "./global-import.js";

// 按需加载 element-plus
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
build({
  plugins: [
    GlobalImportPlugin(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    /* 使用icon插件 */
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), "src/icons/svg")],
      // 指定symbolId格式
      symbolId: "svg-icon-[dir]-[name]",
    }),
  ],
  commonjsOptions: {
    esmExternals: true,
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "./index.js"),
      name: "JadeLowcode",
      formats: ["es", "umd"],
      fileName: (format) => `jade-lowcode.${format}.js`,
    },
    outDir: "lib",
    rollupOptions: {
      external: ["vue"],
      output: {
        assetFileNames: (assetInfo) => {
          if (/\.css$/i.test(assetInfo.name)) {
            return `jade-lowcode.[ext]`;
          }
          return `[name].[ext]`;
        },
        globals: {
          vue: "Vue",
        },
      },
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
