/**
 * 清理打包目录
 */
import fs from "fs-extra";
import { root, outputRoot } from "../build.js";
import { pathResolve } from "../utils/index.js";

/**
 * 清空项目文件夹
 */
export const clean = async (done) => {
  fs.removeSync(pathResolve(root, outputRoot));
  done();
};
