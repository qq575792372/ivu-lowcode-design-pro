/**
 * 创建渲染器对象
 */
export function createRender(vueInstance) {
  return {
    // vue实例
    vueInstance,

    // 状态标识
    state: "render",

    // 设计器组件列表
    widgets: [],
    // 设计器配置
    widgetConfig: null,

    /**
     * 初始化渲染器
     */
    initRender(data) {
      this.widgets = data.widgets;
      this.widgetConfig = data.widgetConfig;
    },
    /**
     * 清空渲染器
     */
    clearRender() {
      this.widgets = [];
      this.widgetConfig = null;
    },
  };
}
