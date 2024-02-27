/**
 * 设计器中全局配置的hooks
 */
export default ({ props, emits }) => {
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

  return {
    getGlobalEvent,
    getGlobalEventFn,
    executeGlobalEventFn,
  };
};
