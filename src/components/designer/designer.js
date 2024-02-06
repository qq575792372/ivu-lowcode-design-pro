import { usePlatformStore } from "@/store";
import { getUUID, cloneDeep } from "@lime-util/util";

export function createDesigner(vueInstance) {
  const platformStore = usePlatformStore();
  return {
    // vue实例
    vueInstance,

    // 设计器组件列表
    widgets: [],
    // 设计器配置
    widgetConfig: {
      version: "1.0.0",
      globalCss: [],
      globalVars: [],
      globalFns: [],
      globalEvents: [],
      dataSources: [],
    },

    // 默认的导入模板
    defaultWidgetTemplate: null,

    // 当前选择的组件信息
    selectedId: null,
    selectedWidgetName: null,
    selectedWidget: null,

    // 历史数据
    historyData: null,

    /**
     * 初始化设计器
     */
    initDesigner() {
      this.defaultWidgetTemplate = cloneDeep({ widgets: this.widgets, widgetConfig: this.widgetConfig });
    },
    /**
     * 清空设计器
     */
    clearDesigner() {
      this.clearSelected();
      this.widgets = [];
      this.widgetConfig = {
        version: "1.0.0",
        globalCss: [],
        globalVars: [],
        globalFns: [],
        globalEvents: [],
        dataSources: [],
      };
    },

    /**
     * 加载json组件数据
     */
    loadFromJson(jsonData) {
      if (!!jsonData && !!jsonData.widgets) {
        this.widgets = jsonData.widgets;
        this.widgetConfig = { ...this.widgetConfig, ...jsonData.widgetConfig };
      } else {
        console.error("no json-data load!");
      }
    },
    /**
     * 合并json组件数据
     */
    mergeFromJson() {},
    /**
     * 清空设计器数据
     */

    /**
     * 选中组件
     */
    setSelected(widget) {
      if (widget) {
        this.selectedId = widget.id;
        this.selectedWidgetName = widget.name;
        this.selectedWidget = widget;
      } else {
        this.clearSelected();
      }
    },
    /**
     * 清空选中的组件
     */
    clearSelected() {
      this.selectedId = null;
      this.selectedWidgetName = null;
      this.selectedWidget = null;
    },

    /**
     * 通过类型或者名称获得设计器组件信息
     * @param typeName 类型名称，可以通过左侧菜单的name或者组件中的type获得
     */
    getWidget(typeName) {
      let widgetName = typeName + "-widget";
      return vueInstance.$widgetConfigs[widgetName];
    },
    /**
     * 获得当前设计器组件的ref实例
     * @param typeName
     */
    getWidgetRef(typeName) {},
    /**
     * 设置当前组件到组件列表中
     * @param typeName
     */
    setWidget(typeName) {},
    /**
     * 选中父组件
     */
    selectedParentWidget(parentWidget) {
      this.setSelected(parentWidget);
    },
    /**
     * 向上移动组件
     */
    moveUpWidget(widgets, widgetIndex) {
      if (widgetIndex === 0) {
        console.warn("已经是在第一个");
        return;
      }
      widgets.splice(widgetIndex - 1, 0, widgets.splice(widgetIndex, 1)[0]);
    },
    /**
     * 向下移动组件
     */
    moveDownWidget(widgets, widgetIndex) {
      if (widgetIndex === widgets.length - 1) {
        console.warn("已经是在最后一个");
        return;
      }
      widgets.splice(widgetIndex + 1, 0, widgets.splice(widgetIndex, 1)[0]);
    },
    /**
     * 复制当前组件
     */
    copyWidget(widgets, widgetIndex) {
      // 生成新的组件
      let newWidget = cloneDeep(widgets[widgetIndex]);
      let uniqueKey = `${newWidget.type}-${getUUID(16)}`;
      newWidget.id = uniqueKey;
      newWidget.name = uniqueKey;

      // 插入到该复制组件的后面
      widgets.splice(widgetIndex + 1, 0, newWidget);
      this.clearSelected();
      this.setSelected(newWidget);
    },
    /**
     * 清空当前组件
     */
    removeWidget(widgets, widgetIndex) {
      widgets.splice(widgetIndex, 1);
    },

    /**
     * 通过设计器组件获取组件名称
     */
    getComponentName(widget) {
      return widget.type + "-widget";
    },

    /**
     * 获取历史数据
     */
    getHistoryData() {},
    /**
     * 设置历史数据
     */
    setHistoryData() {},

    /**
     * 获得设计器中所有组件的缓存数据
     */
    getWidgetsCache() {},
    /**
     * 设置设计器中所有组件的缓存数据
     */
    setWidgetsCache() {},
  };
}
