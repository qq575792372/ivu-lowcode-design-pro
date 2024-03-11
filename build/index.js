import path from "path";
import { fileURLToPath } from "url";

import { build } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(2222222, path.resolve(__dirname, "../src/main.js"));
build({
  build: {
    lib: {
      entry: path.resolve(__dirname, "../src/main.js"),
      fileName: "jadeLowcode",
      formats: ["es", "umd", "cjs"],
    },
    outDir: "lib",
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
