/**
 * 清理打包目录
 */
import fs from "fs-extra";
import { pathResolve } from "../utils/index.js";
import { outputDir, outputSrc } from "../utils/paths.js";

/**
 * 清空项目文件夹
 */
export const clean = async (done) => {
  fs.removeSync(pathResolve(outputDir));
  done();
};

/**
 * 清空打包后的src目录
 */
export const cleanSrc = async (done) => {
  fs.removeSync(pathResolve(outputSrc));
  done();
};
