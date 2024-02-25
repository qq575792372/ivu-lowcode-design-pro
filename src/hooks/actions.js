import { computed } from "vue";

/**
 * 组件动作的hooks
 */
export default ({ props, emits }) => {
  /**
   * 全局和组件的动作
   */
  const allActionList = computed(() => {
    return [...getGlobalActionList(), ...getActionList(props.widget)];
  });

  /**
   * 获得元素指定动作的配置
   * @param {Object} widget 元素对象
   * @param {String} actionName 动作名
   * @returns {Object} 返回该元素指定的动作
   */
  const getAction = (widget, actionName) => {
    return widget.actions.find((v) => v.name === actionName);
  };

  /**
   * 获得元素的动作
   * @param {Object} widget 元素对象
   * @param {String} actionName 动作名
   * @returns {Function} 返回创建后的函数
   */
  const getActionFn = (widget, actionName) => {
    let action = getAction(widget, actionName);
    return action && new Function("widget", action.code);
  };

  /**
   * 获得元素的动作列表
   * @param {Object} widget 元素对象
   * @returns {Object} 返回该元素的动作列表
   */
  const getActionList = (widget) => {
    return widget.actions;
  };
  /**
   * 获得全局动作列表
   * @returns {Object} 返回全局动作列表
   */
  const getGlobalActionList = () => {
    return props.designer.widgetConfig.globalActions;
  };

  return {
    getAction,
    getActionFn,
    getActionList,
    getGlobalActionList,
    allActionList,
  };
};
