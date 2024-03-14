import { usePlatformStore, useDesignerStore } from "@/store";
import { getGenerateId } from "@/utils/util";

/**
 * 创建设计器对象
 * @description 主要是用作设计器重元素、设计器工具和右侧面板中各种配置的操作
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
    // 设计器全局配置
    globalConfig: null,

    // 默认的设计器模板数据
    defaultWidgetTemplate: {
      widgets: [],
      globalConfig: {
        globalSize: "",
        globalLabelPosition: "left",
        globalLabelWidth: 80,
        globalTheme: "default",
        globalCss: "",
        globalVars: null,
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
            code: "console.log('触发全局自定义动作1');",
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
      this.globalConfig = JSON.parse(JSON.stringify(this.defaultWidgetTemplate.globalConfig));
      // 从设计器缓存store中获取数据
      this.getDesignerCache();
    },
    /**
     * 清空设计器
     * @description 只清空元素列表、选中元素、历史列表
     */
    clearDesigner() {
      // 清空选中的元素
      this.clearSelected();
      // 清空设计器元素列表
      this.widgets = [];
      // 清空历史数据
      this.historyData = {
        maxStep: 20, // 最大长度
        steps: [], // 历史记录
        undoSteps: [], // 撤销的记录
      };
      // 重置设计器store中缓存的对象为初始状态
      designerStore.resetDesigner();
    },
    /**
     * 存储设计器缓存store中组件和全局配置数据
     */
    setDesignerCache() {
      // 设计器组件列表
      designerStore.setWidgets(this.widgets);
      // 设计器组件列表
      designerStore.setWidgets(this.widgets);
      // 全局变量对象
      designerStore.setGlobalVars(this.globalConfig.globalVars);
      // 全局函数列表
      designerStore.setGlobalFns(this.globalConfig.globalFns);
      // 全局事件列表
      designerStore.setGlobalEvents(this.globalConfig.globalEvents);
      // 全局动作列表
      designerStore.setGlobalActions(this.globalConfig.globalActions);
      // 全局数据源列表
      designerStore.setDataSources(this.globalConfig.dataSources);
      // 历史数据
      designerStore.setHistoryData(this.globalConfig.historyData);
    },
    /**
     * 从设计器缓存store中获取数据
     */
    getDesignerCache() {
      // 获得当前选中的组件
      if (designerStore.getSelectedWidget) {
        this.setSelected(designerStore.getSelectedWidget);
      }
      // 获取widgets
      if (designerStore.getWidgets.length) {
        this.widgets = designerStore.getWidgets;
      }
      // 获取全局变量对象
      if (designerStore.getGlobalVars) {
        this.globalConfig.globalVars = designerStore.getGlobalVars;
      }
      // 获取全局函数列表
      if (designerStore.getGlobalFns.length) {
        this.globalConfig.globalFns = designerStore.getGlobalFns;
      }
      // 获取全局事件列表
      if (designerStore.getGlobalEvents.length) {
        this.globalConfig.globalEvents = designerStore.getGlobalEvents;
      }
      // 获取全局动作列表
      if (designerStore.getGlobalActions.length) {
        this.globalConfig.globalActions = designerStore.getGlobalActions;
      }
      // 获取全局数据源列表
      if (designerStore.dataSources.length) {
        this.globalConfig.dataSources = designerStore.dataSources;
      }
    },

    // 操作json
    /**
     * 加载json组件数据
     */
    loadFromJson(jsonData) {
      if (!!jsonData && !!jsonData.widgets) {
        /*  */
        this.widgets = jsonData.widgets;
        this.globalConfig = { ...this.globalConfig, ...jsonData.globalConfig };
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

    // 操作组件
    /**
     * 选中组件
     * @param {Object} widget 当前元素
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
    /**
     * 通过类型或者名称获得设计器组件信息
     * @param typeName 类型名称，可以通过左侧菜单的name或者组件中的type获得
     */
    getWidget(typeName) {
      let widgetName = typeName + "-widget";
      console.log("getWidget", vueInstance.$widgetConfigs);
      return vueInstance.$widgetConfigs[widgetName];
    },
    /**
     * 获得当前设计器组件的ref实例
     * @param typeName
     */
    getWidgetRef(typeName) {},
    /**
     * 选中父组件
     */
    selectedParentWidget(parentWidget) {
      this.setSelected(parentWidget);
    },
    /**
     * 向上移动组件
     * @param {Array} widgets 当前元素所在的widgets列表
     * @param {Number} widgetIndex 当前元素所在的下标
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
     * @param {Array} widgets 当前元素所在的widgets列表
     * @param {Number} widgetIndex 当前元素所在的下标
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
     * @param {Array} widgets 当前元素所在的widgets列表
     * @param {Number} widgetIndex 当前元素所在的下标
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
     * @param {Array} widgets 当前元素所在的widgets列表
     * @param {Number} widgetIndex 当前元素所在的下标
     */
    removeWidget(widgets, widgetIndex) {
      widgets.splice(widgetIndex, 1);
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
