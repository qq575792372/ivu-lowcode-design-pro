/**
 * 自动加载platform-xx下的配置，并存放到store中
 */
import { toPascalCase } from "@lime-util/util";
import { usePlatformStore } from "@/store/index";
import { getCurrentInstance } from "vue";

export default {
  install(app, options) {
    // 获得平台结构数据
    const platformStore = usePlatformStore();
    const platformMap = import.meta.glob("/src/platform*/index.json", { eager: true });
    const platformList = Object.entries(platformMap)
      .map(([path, cmp]) => {
        return cmp.default;
      })
      .sort((a, b) => a.sort - b.sort);
    platformStore.setPlatformList(platformList);

    // 获取路径中的组件名称
    const getCmpNameFromPath = (path, suffix) => {
      return String(path)
        .split("/")
        .filter((v) => v.indexOf(suffix) > -1)
        .shift();
    };

    // 注册设计器组件
    const widgets = import.meta.glob("/src/platform*/widgets/*-widget/index.vue", { eager: true });
    Object.entries(widgets).map(([path, cmp]) => {
      let cmpName = toPascalCase(getCmpNameFromPath(path, "-widget"));
      app.component(cmpName, cmp.default);
    });

    // 注册设计器组件配置（绑定到全局，拖拽到右侧时候方便获取配置）
    const configs = import.meta.glob("/src/platform*/widgets/*-widget/index.json", { eager: true });
    const widgetConfigs = {};
    Object.entries(configs).map(([path, cmp]) => {
      let cmpName = getCmpNameFromPath(path, "-widget");
      widgetConfigs[cmpName] = cmp.default;
    });
    app.config.globalProperties.$widgetConfigs = widgetConfigs;

    // 注册设计器默认属性编辑器组件
    const defaultProps = import.meta.glob("/src/components/designer/props/*-editor/index.vue", { eager: true });
    Object.entries(defaultProps).map(([path, cmp]) => {
      let cmpName = toPascalCase(getCmpNameFromPath(path, "-editor"));
      app.component(cmpName, cmp.default);
    });

    // 注册自定义属性编辑器组件
    const customProps = import.meta.glob("/src/platform*/props/*-editor/index.vue", { eager: true });
    Object.entries(customProps).map(([path, cmp]) => {
      let cmpName = toPascalCase(getCmpNameFromPath(path, "-editor"));
      app.component(cmpName, cmp.default);
    });
  },
};
