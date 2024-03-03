import { computed, ref } from "vue";
import useGlobal from "@/hooks/global";
import useDataSources from "@/hooks/data-sources";

/**
 * 组件的hooks
 */
export default ({ props, emits }) => {
  // 使用全局配置的hooks
  const { executeGlobalEventFn } = useGlobal({ props, emits });
  // 使用数据源的hooks
  const { requestData } = useDataSources({ props, emits });

  // 全局配置
  const globalConfig = computed(() => props.globalConfig || {});

  // 组件属性
  /**
   * 通过元素属性名获取绑定的值
   * @description 该方法会返回解析后的值，在页面中直接使用
   * @param {[String]} propName 属性名称
   * @returns {Object} 返回该元素属性解析后的值
   */
  const getPropValue = (propName) => {
    return computed(() => getPropResult(props.widget.props[propName]));
  };
  /**
   * 解析绑定的值的结果
   * @description 会解析属性绑定的类型，包括变量，表达式，函数
   * @param {String} propValue 属性的值
   * @returns {Object} 返回值解析后的结果
   */
  const getPropResult = async (propValue) => {
    // 全局变量
    if (propValue.includes("$globalVars")) {
      // 通过对象取值路径获取值
      let varFn = new Function("$globalVars", `return ${propValue}`);
      return varFn(globalConfig.value.globalVars);
    }
    // 全局函数
    else if (propValue.includes("$globalFns")) {
      let bindValue = propValue.split(".")[1]; // 获取到函数名称
      return executeGlobalEventFn(globalConfig.value.globalFns, bindValue);
    }
    // 数据源
    else if (propValue.includes("$dataSources")) {
      let bindValue = propValue.split(".")[1]; // 获取到数据源名称
      return await requestData(bindValue); // 获取到异步接口数据
    }
    // 普通值
    else {
      return propValue;
    }
  };

  // 组件事件
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
        /*  let currentAction = allActionList.value.find((v) => v.name === actionName);
if (currentAction) {
 let actionFn = new Function("widget", currentAction.code);
 actionFn(widget);
} */
      });
  };

  // 组件动作
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
  const getActions = (widget) => {
    return widget.actions;
  };

  return {
    // 组件属性
    getPropValue,
    getPropResult,
    // 组件事件
    getEvent,
    getEventFn,
    executeEvent,
    executeEventAction,
    // 组件动作
    getAction,
    getActionFn,
    getActions,
  };
};
