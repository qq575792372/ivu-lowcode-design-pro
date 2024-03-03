import { getCurrentInstance } from "vue";

/**
 * 全局配置的hooks
 */
export default ({ props, emits }) => {
  // 全局事件
  /**
   * 获得全局事件中指定的事件
   * @param {Array} globalEvents 事件列表
   * @param {String} eventName 事件名
   * @returns {Object} 返回事件
   */
  const getGlobalEvent = (globalEvents, eventName) => {
    return globalEvents.find((v) => v.name === eventName);
  };
  /**
   * 获得全局事件中指定的事件的函数
   * @param {Array} globalEvents 事件列表
   * @param {String} eventName 事件名
   * @returns {Function} 返回事件创建后的函数
   */
  const getGlobalEventFn = (globalEvents, eventName) => {
    let event = getGlobalEvent(globalEvents, eventName);
    return event && new Function(event.code);
  };
  /**
   * 执行全局事件中指定的事件的函数
   * @param {Array} globalEvents 事件列表
   * @param {String} eventName 事件名
   * @returns {Function} 返回事件创建后的函数
   */
  const executeGlobalEventFn = (globalEvents, eventName) => {
    let eventFn = getGlobalEventFn(globalEvents, eventName);
    return eventFn();
  };

  // 全局动作
  /**
   * 获得全局动作列表
   * @returns {Object} 返回全局动作列表
   */
  const getGlobalActions = () => {
    return props.globalConfig.globalActions;
  };

  // 全局组件列表
  /**
   * 获得所有扁平化组件列表
   */
  const getFlatWidgets = () => {
    console.log("props.designer.widgets", props.designer.widgets);
    // 递归获取所有扁平化组件列表
    const treeToArray = (nodes) => {
      let res = [];
      for (let node of nodes) {
        // 删除掉多余并且为空的widgets属性
        if (node.widgets && !node.widgets.length) {
          delete node.widgets;
        }
        res.push(node);
        if (node.widgets && node.widgets.length) {
          let array = treeToArray(node.widgets);
          array && res.push(...array);
        }
      }
      return res;
    };
    return treeToArray(props.designer.widgets);
  };

  // 全局挂载变量
  /**
   * 获取Vue3中挂载的全局变量
   * @returns {Proxy} 返回全局的变量集合
   */
  const getGlobalProperties = () => {
    const { proxy } = getCurrentInstance();
    return proxy;
  };

  return {
    // 全局事件
    getGlobalEvent,
    getGlobalEventFn,
    executeGlobalEventFn,
    // 全局动作
    getGlobalActions,
    // 全局组件列表
    getFlatWidgets,
    // 全局挂载变量
    getGlobalProperties,
  };
};
