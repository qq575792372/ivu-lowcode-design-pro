import { defineStore } from "pinia";

const useDesignStore = defineStore("design", {
  state: () => {
    return {
      // 设计器组件列表
      widgets: [],

      // 全局变量对象
      globalVars: null,
      // 全局函数列表
      globalFns: [],
      // 全局事件列表
      globalEvents: [],
      // 全局动作列表
      globalActions: [],
      // 全局数据源列表
      dataSources: [],

      // 当前选择的组件id
      selectedId: null,
      // 当前选择的组件
      selectedWidget: null,

      // 历史数据
      historyData: null,
    };
  },
  getters: {
    // 设计器组件列表
    getWidgets: (state) => state.widgets,
    // 全局变量对象
    getGlobalVars: (state) => state.globalVars,
    // 全局函数列表
    getGlobalFns: (state) => state.globalFns,
    // 全局事件列表
    getGlobalEvents: (state) => state.globalEvents,
    // 全局动作列表
    getGlobalActions: (state) => state.globalActions,
    // 全局数据源列表
    getDataSources: (state) => state.dataSources,
    // 当前选择的组件id
    getSelectedId: (state) => state.selectedId,
    // 当前选择的组件
    getSelectedWidget: (state) => state.selectedWidget,
    // 历史数据
    getHistoryData: (state) => state.historyData,
  },
  actions: {
    // 设计器组件列表
    setWidgets(widgets) {
      this.widgets = widgets;
    },
    // 全局变量对象
    setGlobalVars(globalVars) {
      this.globalVars = globalVars;
    },
    // 全局函数列表
    setGlobalFns(globalFns) {
      this.globalFns = globalFns;
    },
    // 全局事件列表
    setGlobalEvents(globalEvents) {
      this.globalEvents = globalEvents;
    },
    // 全局动作列表
    setGlobalActions(globalActions) {
      this.globalActions = globalActions;
    },
    // 全局数据源列表
    setDataSources(dataSources) {
      this.dataSources = dataSources;
    },
    // 当前选择的组件id
    setSelectedId(selectedId) {
      this.selectedId = selectedId;
    },
    // 当前选择的组件
    setSelectedWidget(selectedWidget) {
      this.selectedWidget = selectedWidget;
    },
    // 历史数据
    setHistoryData(historyData) {
      this.historyData = historyData;
    },
    // 重置设计器store中缓存的对象为初始状态（只清空元素列表、选中元素、历史列表）
    resetDesigner() {
      // 如果只window.sessionStore.clear()是不会清空本地的，pinia的缓存可以从内存中读取再次赋值防止被误清空
      // this.$reset(); // 重置所有状态数据
      this.widgets = [];
      this.selectedId = null;
      this.selectedWidget = null;
      this.historyData = null;
    },
  },
  persist: {
    key: "LOWCODE_DESIGN", // 缓存key
    storage: window.localStorage, // 缓存方式
  },
});

export default useDesignStore;
