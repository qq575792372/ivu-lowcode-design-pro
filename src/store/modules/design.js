import { defineStore } from "pinia";

const useDesignStore = defineStore("design", {
  state: () => {
    return {
      // 设计器组件列表
      widgets: [],
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
    getWidgets: (state) => state.widgets || [],
    // 全局动作列表
    getGlobalActions: (state) => state.globalActions || [],
    // 全局数据源列表
    getDataSources: (state) => state.dataSources || [],
    // 当前选择的组件id
    getSelectedId: (state) => state.selectedId,
    // 当前选择的组件
    getSelectedWidget: (state) => state.selectedWidget,
    // 历史数据
    getHistoryData: (state) => state.historyData || [],
  },
  actions: {
    // 设计器组件列表
    setWidgets(widgets) {
      this.widgets = widgets;
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
  },
  persist: {
    key: "LOWCODE_DESIGN", // 缓存key
    storage: window.sessionStorage, // 缓存方式
  },
});

export default useDesignStore;
