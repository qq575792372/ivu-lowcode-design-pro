import { usePlatformStore } from "@/store";

export function createDesigner(vueInstance) {
  const platformStore = usePlatformStore();

  return {
    // vue实例
    vueInstance,

    // 设计器组件列表
    widgets: [],

    // 当前选择的组件信息
    selectedId: null,
    selectedWidgetName: null,
    selectedWidget: null,

    // 历史数据
    historyData: null,

    /**
     * 初始化设计器
     */
    initDesigner() {},
    /**
     * 清空设计器
     */
    clearDesigner() {},

    /**
     * 加载json组件数据
     */
    loadFromJson() {},
    /**
     * 合并json组件数据
     */
    mergeFromJson() {},

    /**
     * 选中组件
     */
    setSelected(widget) {},
    /**
     * 清空选中的组件
     */
    clearSelected() {},

    /**
     * 获得当前设计器组件信息
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
     * 复制当前组件
     * @param origin
     */
    copyWidget(origin) {},
    /**
     * 清空当前组件
     * @param origin
     */
    removeWidget(origin) {},

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
