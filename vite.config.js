import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// 按需加载 element-plus
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// 当前目录路径
const CWD = process.cwd();

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, CWD);
  return {
    base: "/", // 打包和路由访问的路径，例如：/my-demo

    /* server配置 */
    server: {
      host: "0.0.0.0",
      port: 9000,
      open: true,
      // 配置反向代理
      proxy: {
        [env.VITE_BASE_API]: {
          // 代理的地址
          target: "http://192.168.1.10:8080",
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^${env.VITE_BASE_API}`, "g"), "/"),
        },
      },
    },

    /* 解析配置 */
    resolve: {
      alias: {
        "~": resolve("./"),
        "@": resolve("./src"),
      },
    },

    /* css配置 */
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "",
        },
      },
    },

    /* rollup配置 */
    rollupOptions: {
      output: {
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        manualChunks: {
          "element-plus": ["element-plus"],
        },
      },
    },

    /* esbuild配置 */
    esbuild: {
      pure: ["console.log"], // 删除 console.log
      drop: ["debugger"], // 删除 debugger
    },

    /* 插件配置 */
    plugins: [
      vue(),
      /* 按需引入 element-plus */
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      /* 使用icon插件 */
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve(process.cwd(), "src/icons/svg")],
        // 指定symbolId格式
        symbolId: "svg-icon-[dir]-[name]",
      }),
    ],
  };
});
