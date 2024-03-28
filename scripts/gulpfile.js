import gulp from "gulp";
import {
  clean,
  generateOutput,
  generateOutputSrc,
  generateCmpEntry,
  generateCmpAllEntry,
  generateMainEntry,
  generatePackageJson,
  generateReadme,
  buildModules,
  buildFullBundle,
} from "./task/index.js";

// 导出默认任务
export default gulp.series(
  clean,
  generateOutput,
  generateOutputSrc,
  generateCmpEntry,
  generateCmpAllEntry,
  generateMainEntry,
  generatePackageJson,
  generateReadme,
  buildModules,
  buildFullBundle,
  /*   cleanSrc, */
);
