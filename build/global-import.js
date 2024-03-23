import glob from "fast-glob";

const importList = [
  "import useGlobal from '/src/hooks/global.js'",
  "import useDataSource from '/src/hooks/data-sources.js'",
  "import useWidget from '/src/hooks/widget.js'",
  "import Render from '/src/components/render/index.vue'",
  "import EasyForm from '/src/components/easy-form/index.vue'",
];
const exportList = ["useGlobal", "useDataSource", "useWidget", "Render", "EasyForm"];

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

export default async function GlobalImportPlugin() {
  const virtualModuleId = "virtual:global-import";
  const resolvedVirtualModuleId = "\0" + virtualModuleId;
  const widgets = await glob("./src/platform*/widgets/*-widget/index.vue");
  widgets.forEach((dir) => {
    dir = dir.replaceAll("\\", "/");
    const cmpName = toPascalCase(dir.replace(/.*\/([^/]+)\/[^/]+\.vue$/, "$1"));
    importList.push(`import ${cmpName} from '/${dir}'`);
    exportList.push(cmpName);
  });

  return {
    name: "global-import-plugin", // 必须的，将会在 warning 和 error 中显示
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        let res = [importList.join("\n"), "export {", exportList.join(",\n"), "}"].join("\n");
        return res;
      }
    },
  };
}
