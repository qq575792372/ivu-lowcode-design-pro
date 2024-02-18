/**
 * 获得元素指定的事件配置
 */
export const getEvent = (widget, eventName) => {
  return widget.events.find((v) => v.name === eventName);
};

/**
 * 获得元素事件函数
 */
export const getEventFn = (widget, eventName) => {
  let event = getEvent(widget, eventName);
  return new Function(event.args, event.code);
};
