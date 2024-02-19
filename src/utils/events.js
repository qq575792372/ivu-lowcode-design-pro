/**
 * 获得元素指定事件的配置
 * @param {Object} widget 元素对象
 * @param {String} eventName 事件名
 * @returns {Object} 返回该元素指定的事件
 */
export const getEvent = (widget, eventName) => {
  return widget.events.find((v) => v.name === eventName);
};

/**
 * 获得元素指定事件的函数
 * @param {Object} widget 元素对象
 * @param {String} eventName 事件名
 * @returns {Function} 返回创建后的函数
 */
export const getEventFn = (widget, eventName) => {
  let event = getEvent(widget, eventName);
  return new Function(...event.args, event.code);
};

/**
 * 获得元素的动作
 * @param widget
 */
export const getEventAction = (widget) => {};
