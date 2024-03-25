import gulp from "gulp";
import {
  clean,
  generateOutput,
  generateOutputSrc,
  generatePackageJson,
  generateCmpSingleEntry,
  generateCmpAllEntry,
  buildModules,
  cleanSrc,
  buildFullBundle,
} from "./task/index.js";

// 导出默认任务
export default gulp.series(
  clean,
  generateOutput,
  generateOutputSrc,
  generatePackageJson,
  generateCmpSingleEntry,
  generateCmpAllEntry,
  buildModules,
  buildFullBundle,
  cleanSrc,
);
