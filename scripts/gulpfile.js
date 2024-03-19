import gulp from "gulp";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs-extra";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = "../lib";

function resolve(dir) {
  return path.resolve(__dirname, dir);
}

async function clean() {
  console.log("删除啦");
  fs.removeSync(resolve(outputDir));
}

/**
 * 构建输出目录
 */
async function buildOutput(cb) {
  // 清空打包的目录
  await fs.mkdirs(resolve(outputDir));
  // 复制 components 目录到打包目录下
  await fs.copy(resolve("../src/components"), resolve("../lib/components"));
  // 复制 styles 到打包目录下
  await fs.copy(resolve("../src/styles"), resolve("../lib/styles"));
  // 复制 utils 到打包目录下
  await fs.copy(resolve("../src/utils"), resolve("../lib/utils"));
  // 复制 hooks 到打包目录下
  await fs.copy(resolve("../src/hooks"), resolve("../lib/hooks"));
  // 复制 theme 到打包目录下
  await fs.copy(resolve("../src/theme"), resolve("../lib/theme"));
  // 复制 widgets 到打包目录下
  await fs.copy(resolve("../src/platform/widgets"), resolve("../lib/widgets"));
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
