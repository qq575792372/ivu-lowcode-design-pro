import { ref, computed } from "vue";
import useActions from "./actions";

/**
 * 组件事件的hooks
 */
export default ({ props, emits }) => {
  const { allActionList } = useActions({ props, emits });

  /**
   * 获得元素指定事件的配置
   * @param {Object} widget 元素对象
   * @param {String} eventName 事件名
   * @returns {Object} 返回该元素指定的事件
   */
  const getEvent = (widget, eventName) => {
    return widget.events.find((v) => v.name === eventName);
  };

  /**
   * 获得元素指定事件的函数
   * @param {Object} widget 元素对象
   * @param {String} eventName 事件名
   * @returns {Function} 返回创建后的函数
   */
  const getEventFn = (widget, eventName) => {
    let event = getEvent(widget, eventName);
    return event && new Function(...event.args, event.code);
  };

  /**
   * 执行元素指定的事件
   * @param {Object} widget 元素对象
   * @param {String} eventName 事件名
   * @returns {Function} 返回创建后的函数
   */
  const executeEvent = (widget, eventName) => {
    let eventFn = getEventFn(widget, eventName);
    return eventFn(widget);
  };

  /**
   * 执行元素指定事件的动作
   * @param {Object} widget 元素对象
   * @param {String} eventName 事件名
   * @returns {Function} 返回创建后的函数
   */
  const executeEventAction = (widget, eventName) => {
    let event = getEvent(widget, eventName);
    // 遍历执行该事件对应的动作
    event.action &&
      event.action.forEach((actionName) => {
        let currentAction = allActionList.value.find((v) => v.name === actionName);
        if (currentAction) {
          let actionFn = new Function("widget", currentAction.code);
          actionFn(widget);
        }
      });
  };

  return {
    getEvent,
    getEventFn,
    executeEvent,
    executeEventAction,
  };
};
