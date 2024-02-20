import { ref, computed } from "vue";

/**
 * 组件动作的hooks
 */
export default ({ props, emits }) => {
  /**
   * 获得所有全局和组件的动作
   */
  const actionList = computed(() => {
    const globalActions = props.designer.widgetConfig.globalActions.map((v) => {
      return { ...v, global: true };
    });
    return [...globalActions, ...props.widget.actions];
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
    return action && new Function("target", action.code);
  };

  return {
    actionList,
    getAction,
    getActionFn,
  };
};
