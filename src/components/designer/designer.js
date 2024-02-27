import { usePlatformStore, useDesignerStore } from "@/store";
import { getGenerateId } from "@/utils/util";

/**
 * 创建设计器对象
 */
export function createDesigner(vueInstance) {
  // 获取平台缓存store
  const platformStore = usePlatformStore();
  // 获取设计器缓存store
  const designerStore = useDesignerStore();

  return {
    // vue实例
    vueInstance,

    // 状态标识
    state: "designer",

    // 设计器组件列表
    widgets: [],
    // 设计器配置
    widgetConfig: null,

    // 默认的设计器模板数据
    defaultWidgetTemplate: {
      widgets: [],
      widgetConfig: {
        globalSize: "",
        globalLabelPosition: "left",
        globalLabelWidth: 80,
        globalTheme: "default",
        globalCss: "",
        globalVars: {},
        globalFns: [],
        globalEvents: [
          { name: "onMounted", label: "onMounted", code: "" },
          { name: "onUpdated", label: "onUpdated", code: "" },
          { name: "onUnmounted", label: "onUnmounted", code: "" },
          { name: "onBeforeMount", label: "onBeforeMount", code: "" },
          { name: "onBeforeUpdate", label: "onBeforeUpdate", code: "" },
          { name: "onBeforeUnmount", label: "onBeforeUnmount", code: "" },
          { name: "onActivated", label: "onActivated", code: "" },
          { name: "onDeactivated", label: "onDeactivated", code: "" },
        ],
        globalActions: [
          {
            name: "globalCustomAction1",
            label: "全局自定义动作1",
            enable: true,
            global: true,
            code: "/*这里动作内容*/ console.log('触发全局自定义动作1',widget);",
          },
        ],
        dataSources: [],
      },
    },

    // 当前选择的组件信息
    selectedId: null,
    selectedWidget: null,

    // 历史数据
    historyData: {
      maxStep: 20, // 最大长度
      steps: [], // 历史记录
      undoSteps: [], // 撤销的记录
    },

    // 设计器
    /**
     * 初始化设计器
     */
    initDesigner() {
      // 初始化设计器配置
      this.widgetConfig = JSON.parse(JSON.stringify(this.defaultWidgetTemplate.widgetConfig));
      console.log("initDesigner", this, this.widgets, this.widgetConfig);
      // 从设计器缓存store中获取数据
      this.getDesignerCache();
    },
    /**
     * 清空设计器
     */
    clearDesigner() {
      this.clearSelected();
      this.widgets = [];
      this.widgetConfig = JSON.parse(JSON.stringify(this.defaultWidgetTemplate.widgetConfig));
      // 重置设计器store中缓存的对象为初始状态
      designerStore.resetDesigner();
    },
    /**
     * 设置设计器缓存store中组件和全局配置数据
     */
    setDesignerCache() {
      // 设计器组件列表
      designerStore.setWidgets(this.widgets);
      // 设计器组件列表
      designerStore.setWidgets(this.widgets);
      // 全局变量对象
      designerStore.setGlobalVars(this.widgetConfig.globalVars);
      // 全局函数列表
      designerStore.setGlobalFns(this.widgetConfig.globalFns);
      // 全局动作列表
      designerStore.setGlobalActions(this.widgetConfig.globalActions);
      // 全局数据源列表
      designerStore.setDataSources(this.widgetConfig.dataSources);
      // 历史数据
      designerStore.setHistoryData(this.widgetConfig.historyData);
    },
    /**
     * 从设计器缓存store中获取数据
     */
    getDesignerCache() {
      // 获取widgets
      this.widgets = designerStore.getWidgets;
      // 获得当前选中的组件
      this.setSelected(designerStore.getSelectedWidget);
      // 获取全局变量对象
      this.widgetConfig.globalVars = designerStore.getGlobalVars;
      // 获取全局函数列表
      this.widgetConfig.globalFns = designerStore.getGlobalFns;
      // 获取全局动作列表
      this.widgetConfig.globalActions = designerStore.getGlobalActions;
      // 获取全局数据源列表
      this.widgetConfig.dataSources = designerStore.dataSources;
    },

    // 操作json
    /**
     * 加载json组件数据
     */
    loadFromJson(jsonData) {
      if (!!jsonData && !!jsonData.widgets) {
        /*  */
        this.widgets = jsonData.widgets;
        this.widgetConfig = { ...this.widgetConfig, ...jsonData.widgetConfig };
        // 设置设计器缓存store中组件和全局配置数据
        this.setDesignerCache();
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

    // 操作组件选中
    /**
     * 选中组件
     */
    setSelected(widget) {
      if (widget) {
        this.selectedId = widget.id;
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
      this.selectedWidget = null;
    },

    // 操作组件元素
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
      let newWidget = JSON.parse(JSON.stringify(widgets[widgetIndex]));
      let uniqueKey = getGenerateId(newWidget.type);
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

    // 操作设计器历史数据
    /**
     * 获取历史数据
     */
    getHistoryData() {},
    /**
     * 设置历史数据
     */
    setHistoryData() {},
    undoHistoryData() {},
    redoHistoryData() {},
  };
}
