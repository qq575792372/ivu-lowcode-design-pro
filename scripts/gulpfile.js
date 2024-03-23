import gulp from "gulp";
import {
  clean,
  generateOutput,
  generateOutputSrc,
  generateCmpSingleEntry,
  generateCmpAllEntry,
  buildModules,
  cleanSrc,
} from "./task/index.js";

// 导出默认任务
export default gulp.series(
  clean,
  generateOutput,
  generateOutputSrc,
  generateCmpSingleEntry,
  generateCmpAllEntry,
  buildModules,
  cleanSrc,
);
