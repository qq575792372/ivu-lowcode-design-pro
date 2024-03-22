import gulp from "gulp";
import fs from "fs-extra";

import { pathResolve } from "./utils/index.js";
import { clean } from "./task/index.js";

console.log(111, clean);

/**
 * 构建输出目录
 */
async function buildOutput(cb) {
  // 清空打包的目录
  await fs.mkdirs(pathResolve(outputDir));
  // 复制 components 目录到打包目录下
  await fs.copy(pathResolve("../src/components"), pathResolve("../lib/components"));
  // 复制 styles 到打包目录下
  await fs.copy(pathResolve("../src/styles"), pathResolve("../lib/styles"));
  // 复制 utils 到打包目录下
  await fs.copy(pathResolve("../src/utils"), pathResolve("../lib/utils"));
  // 复制 hooks 到打包目录下
  await fs.copy(pathResolve("../src/hooks"), pathResolve("../lib/hooks"));
  // 复制 theme 到打包目录下
  await fs.copy(pathResolve("../src/theme"), pathResolve("../lib/theme"));
  // 复制 widgets 到打包目录下
  await fs.copy(pathResolve("../src/platform/widgets"), pathResolve("../lib/widgets"));
  return cb;
}

/**
 * 生成install入口文件
 */
async function generateEntry() {
  console.log("generateEntry");
}

export default gulp.series(clean, gulp.parallel(generateEntry));
// gulp.task("default", gulp.series(clean));
