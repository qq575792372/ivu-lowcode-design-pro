import path from "path";
import { fileURLToPath } from "url";

console.log(111, fileURLToPath);

/**
 * 路径转换
 * @param {String} dir 目录相对路径
 * @returns {String} 返回该目录的绝对路径
 */
export function pathResolve(dir) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return path.resolve(__dirname, dir);
}
