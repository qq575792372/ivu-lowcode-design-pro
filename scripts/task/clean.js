/**
 * 清理打包目录
 */
import fs, { remove } from "fs-extra";
import { pathResolve } from "../utils/index.js";

export const clean = (done) => {
  // remove()
  fs.removeSync(pathResolve("dist"));
};
