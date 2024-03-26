import { pathResolve } from "./index.js";

/**
 * 打包中使用的所有路径
 */

// root
export const root = pathResolve("../", "../");

// 输入
export const inputSrc = pathResolve(root, "src");

// 输出
export const outputRoot = pathResolve(root, "dist");
export const outputSrc = pathResolve(root, outputRoot, "src");
export const outputDist = pathResolve(root, outputRoot, "dist");
export const outputEsm = pathResolve(root, outputRoot, "es");
export const outputCjs = pathResolve(root, outputRoot, "cjs");
