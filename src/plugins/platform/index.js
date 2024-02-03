/**
 * 自动加载platform-xx下的配置，并存放到store中
 */
import { toPascalCase } from "@lime-util/util";
import { usePlatformStore } from "@/store/index";

/**
 * 通过路径获得组件名称
 * @param path
 * @param suffix
 * @returns {string}
 */
const getcomponentNameFromPath = (path, suffix) => {
  return String(path)
    .split("/")
    .filter((v) => v.indexOf(suffix) > -1)
    .shift();
};

export default {
  install(app, options) {
    /* 获取平台展示的数据，放入到缓存中 */
    const platformStore = usePlatformStore();
    const platformMap = import.meta.glob("/src/platform*/index.json", { eager: true });
    const platformList = Object.entries(platformMap)
      .map(([path, component]) => {
        return component.default;
      })
      .sort((a, b) => a.sort - b.sort);
    platformStore.setPlatformList(platformList);

    /* 设计器组件 */
    // 注册设计器组件
    const widgets = import.meta.glob("/src/platform*/widgets/*-widget/index.vue", { eager: true });
    Object.entries(widgets).map(([path, component]) => {
      // 会优先获取组件内部定义的名称，否则取文件名为组件名
      let componentName = component.default.name || toPascalCase(getcomponentNameFromPath(path, "-widget"));
      app.component(componentName, component.default);
    });
    // 获取设计器组件的配置
    const widgetConfigs = import.meta.glob("/src/platform*/widgets/*-widget/index.json", { eager: true });
    const $widgetConfigs = {}; // 绑定到全局的设计器配置集合
    Object.entries(widgetConfigs).map(([path, component]) => {
      let componentName = getcomponentNameFromPath(path, "-widget");
      $widgetConfigs[componentName] = component.default;
    });
    // 设置到全局中，可以根据组件名称获取对应的组件配置
    app.config.globalProperties.$widgetConfigs = $widgetConfigs;

    /* 设计器属性编辑器 */
    // 注册属性编辑器组件
    const props = import.meta.glob(
      ["/src/components/designer/props/*-editor/index.vue", "/src/platform*/props/*-editor/index.vue"],
      { eager: true },
    );
    Object.entries(props).map(([path, component]) => {
      let componentName = component.default.name || toPascalCase(getcomponentNameFromPath(path, "-editor"));
      app.component(componentName, component.default);
    });

    // 获取属性编辑器的配置
    const propConfigs = import.meta.glob(
      ["/src/components/designer/props/*-editor/index.json", "/src/platform*/props/*-editor/index.json"],
      { eager: true },
    );
    const $propConfigs = {}; // 绑定到全局的比属性编辑器配置集合
    Object.entries(propConfigs).map(([path, component]) => {
      let componentName = toPascalCase(getcomponentNameFromPath(path, "-editor"));
      $propConfigs[component.default.name] = {
        ...component.default,
        componentName,
      };
    });
    // 设置到全局中，可以根据属性名称获取对应的属性配置
    app.config.globalProperties.$propConfigs = $propConfigs;
  },
};
