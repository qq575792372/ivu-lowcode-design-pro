import { pathResolve } from "./index.js";

/**
 * 打包中使用的所有路径
 */

// root
export const root = pathResolve("../", "../");

// 输入
export const inputSrc = pathResolve(root, "src");

// 输出
export const outputDir = pathResolve(root, "dist");
export const outputSrc = pathResolve(root, outputDir, "src");
export const outputEsm = pathResolve(root, outputDir, "es");
export const outputCjs = pathResolve(root, outputDir, "cjs");
