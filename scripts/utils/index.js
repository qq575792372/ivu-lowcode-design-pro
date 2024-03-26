import path from "path";
import { fileURLToPath } from "url";
import pkg from "../../package.json" assert { type: "json" };

/**
 * 路径转换
 * @param {String} dir 目录相对路径
 * @returns {String} 返回该目录的绝对路径
 */
export function pathResolve(...dir) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return path.resolve(__dirname, ...dir);
}

/**
 * 转化为大驼峰命名
 */
export function toPascalCase(value) {
  // 下划线
  if (value.indexOf("_") > 0) {
    let newStr = value.replace(/\_(\w)/g, function (all, letter) {
      return letter.toUpperCase();
    });
    return newStr.charAt(0).toUpperCase() + newStr.slice(1);
  }
  // 短横
  if (value.indexOf("-") > 0) {
    let newStr = value.replace(/\-(\w)/g, function (all, letter) {
      return letter.toUpperCase();
    });
    return newStr.charAt(0).toUpperCase() + newStr.slice(1);
  }
  // 驼峰
  if (/^[a-z]$/.test(value.charAt(0)) && !(value.indexOf("-") > 0 || value.indexOf("_") > 0)) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}

/**
 * 通过组件路径获取到组件名
 * @param path
 */
export function getCmpName(path) {
  return path.match(/components\/(\S*)\/index/)[1];
}

/**
 * 解析glob遍历的组件列表，组装后返回固定格式的组件信息
 * @example 返回[{name:'InputWidget',path:'components/input-widget/index.vue',}]
 * @param components
 */
export function getCmpList(components) {
  return components.map((cmpPath) => {
    let fullPath = cmpPath.substring(cmpPath.indexOf("components/"));
    return {
      name: toPascalCase(getCmpName(cmpPath)),
      path: fullPath.replace(/components\//g, ""),
      fullPath,
    };
  });
}

/**
 * 获得package.json中的信息
 */
export function getPackageJson() {
  return pkg;
}

/**
 * 获取外部依赖信息
 */
export function getPackageDependencies() {
  const manifest = pkg;
  const { dependencies = {}, peerDependencies = {} } = manifest;

  return {
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies),
  };
}

/**
 * 排除掉所有外部依赖
 */
export async function generateExternal(options = { full: false }) {
  const { dependencies, peerDependencies } = getPackageDependencies();
  return (id) => {
    const packages = [...peerDependencies];
    if (!options.full) {
      packages.push("@vue", ...dependencies);
    }

    return [...new Set(packages)].some((pkg) => id === pkg || id.startsWith(`${pkg}/`));
  };
}
