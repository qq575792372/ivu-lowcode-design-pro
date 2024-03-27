/**
 * 生成需要打包的内容
 */
import fs from "fs-extra";
import glob from "fast-glob";

import { pathResolve, getCmpList } from "../utils/index.js";
import { root, outputRoot, outputSrc } from "../utils/paths.js";

import pkg from "../../package.json" assert { type: "json" };

/**
 * 生产打包目录
 */
export async function generateOutput(done) {
  // 生成打包根目录 dist
  await fs.mkdirs(pathResolve(outputRoot));
  // 生成打包根目录下源码目录 src
  await fs.mkdirs(pathResolve(outputSrc));
  // 结束回调
  done();
}

/**
 * 生成输出源码目录
 */
export async function generateOutputSrc(done) {
  // // 复制 components 到 src 下
  await fs.copy(pathResolve(root, "src/components/easy-form"), pathResolve(outputSrc, "components/easy-form"));
  await fs.copy(pathResolve(root, "src/components/render"), pathResolve(outputSrc, "components/render"));

  // 复制 widgets 到 src 下
  await fs.copy(pathResolve(root, "src/platform/widgets"), pathResolve(outputSrc, "components"));
  // 复制 styles 到 src 下
  await fs.copy(pathResolve(root, "src/styles"), pathResolve(outputSrc, "styles"));
  // 复制 utils 到 src 下
  await fs.copy(pathResolve(root, "src/utils"), pathResolve(outputSrc, "utils"));
  // 复制 hooks 到 src 下
  await fs.copy(pathResolve(root, "src/hooks"), pathResolve(outputSrc, "hooks"));
  // 复制 theme 到 src 下
  await fs.copy(pathResolve(root, "src/theme"), pathResolve(outputSrc, "theme"));

  // 结束回调
  done();
}

/**
 * 生成package.json
 */
export async function generatePackageJson(done) {
  const manifest = pkg;
  // 设置引入的入口
  manifest.main = "cjs/index.cjs";
  manifest.module = "es/index.mjs";
  manifest.unpkg = "dist/lowcode.esm.js";
  // 生成文件
  fs.outputFileSync(pathResolve(outputRoot, "package.json"), JSON.stringify(manifest, null, 2), "utf-8");

  // 结束回调
  done();
}

/**
 * 生成源码src中components中每个组件的入口文件
 */
export async function generateCmpEntry(done) {
  // 获取到components中所有的组件目录
  const components = getCmpList(
    glob.globSync("dist/src/components/*/index.vue", {
      cwd: root,
      absolute: true,
      onlyFiles: true,
    }),
  );
  for (let cmp of components) {
    // 生成入口的字符串
    let entryFileStr = `
// 导入组件
import ${cmp.name} from "./index.vue";

// 暴漏install
${cmp.name}.install = function (app) {
  app.component("${cmp.name}", ${cmp.name});
};

// 导出组件
export default ${cmp.name};`;
    // 生成index.js
    fs.outputFileSync(pathResolve(outputSrc, cmp.fullPath.replace(".vue", ".js")), entryFileStr, "utf-8");
  }

  // 结束回调
  done();
}

/**
 * 生成源码src中components中的入口文件
 */
export async function generateCmpAllEntry(done) {
  // 获取到components中所有的组件目录
  const components = getCmpList(
    glob.globSync("dist/src/components/*/index.js", {
      cwd: root,
      absolute: true,
      onlyFiles: true,
    }),
  );
  // 遍历所有组件信息，组装入口文件index.js
  let entryFileStr = `// 导入所有组件\n`; // 入口文件的字符串
  let entryCmpStr = ""; // 入口组件的字符串
  let entryCmpList = []; // 入口文件的组件列表
  for (let index in components) {
    let cmp = components[index];
    entryFileStr += `import ${cmp.name} from "./${cmp.path}";\n`;
    entryCmpStr += `app.component("${cmp.name}", ${cmp.name});${index < components.length - 1 ? "\n  " : "  "}`;
    entryCmpList.push(cmp.name);
  }

  // 开始拼接导出信息
  entryFileStr += `
// 暴漏全局安装的install方法
const install = function (app) {
  ${entryCmpStr}
}\n`;
  entryFileStr += `
// 导出按需组件信息
export { ${entryCmpList.join(",")} };\n`;
  entryFileStr += `
// 导出入口
export default { install };`;

  // 生成index.js文件
  fs.outputFileSync(pathResolve(outputSrc, "components/index.js"), entryFileStr, "utf-8");

  // 结束回调
  done();
}

/**
 * 生成源码src中index主入口文件
 */
export async function generateMainEntry(done) {
  // 生成入口的字符串
  let entryFileStr = `
// 导入组件列表
import * as components from "./components/index.js";

// 导出所有组件
export * from "./components/index.js";

// 导出hooks
export * from "./hooks/index.js";

// 暴漏全局安装的install方法
const install = function (app) {
  Object.keys(components).forEach(key => {
    app.use(key, components[key]);
  });
}

// 导出入口
export default { install };
`;

  // 生成index.js文件
  fs.outputFileSync(pathResolve(outputSrc, "index.js"), entryFileStr, "utf-8");

  // 结束回调
  done();
}
