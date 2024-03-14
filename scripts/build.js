console.log(3333);
import path from "path";
import { fileURLToPath } from "url";
import vue from "rollup-plugin-vue";
import postcss from "rollup-plugin-postcss";
import fs from "fs-extra";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = "../lib";

function resolve(dir) {
  return path.resolve(__dirname, dir);
}

const buildComponents = async () => {
  return {
    input: ["src/components"],
    output: {
      dir: "es/",
    },
    plugins: [vue(), postcss()],
  };
};
const test = {
  input: [resolve("../src/components/render/index.js")],
  output: {
    dir: "es/",
  },
  plugins: [vue(), postcss()],
};
export default [test];
