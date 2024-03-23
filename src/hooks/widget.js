import { computed, ref, toRef, watchEffect, readonly } from "vue";
import useGlobal from "./global";
import useDataSources from "./data-sources";

/**
 * 组件的hooks
 */
export default function ({ props, emits }) {
  // 使用全局配置的hooks
  const { executeGlobalFn } = useGlobal({ props, emits });
  // 使用数据源的hooks
  const { requestData } = useDataSources({ props, emits });

  // 全局配置
  const globalConfig = computed(() => props.globalConfig || {});

  // 组件属性
  /**
   * 获得元素属性绑定值的解析结果
   * @description 会解析属性绑定的类型，包括变量，表达式，函数
   * @param {String} propValue 属性的值
   * @returns {[String,Number,Object,Null,Undefined]} 返回值解析后的结果
   */
  const getPropValue = function (propValue) {
    // 绑定的入口vue实例
    let vueInstance = this;

    // 全局变量
    if (propValue.includes("$globalVars")) {
      // 通过对象取值路径获取值
      let varFn = new Function("$globalVars", `return ${propValue}`);
      return varFn(globalConfig.value.globalVars);
    }
    // 全局函数
    else if (propValue.includes("$globalFns")) {
      let bindValue = propValue.split(".")[1];
      return executeGlobalFn(globalConfig.value.globalFns, bindValue, vueInstance, globalConfig.value.globalVars);
    }
    // 数据源
    else if (propValue.includes("$dataSources")) {
      let bindValue = propValue.split(".")[1];
      let responseValue = null;
      /*       // 获取请求的结果
            const getResponseData = (bindValue) => {
              let propValue = ref(null);
              watchEffect(async (onCleanup) => {
                propValue.value = await requestData(
                  bindValue,
                  {
                    myId: 123,
                    myName: "myName",
                  },
                  vueInstance,
                  globalConfig.value.globalVars,
                );
              });
              return readonly(propValue);
            };
            return getResponseData(bindValue); */
      watchEffect(async () => {
        responseValue = await requestData(
          bindValue,
          {
            myId: 123,
            myName: "myName",
          },
          vueInstance,
        );
      });
      return responseValue;
    }
    // 普通值，返回自身
    else {
      return propValue;
    }
  };

  // 组件事件
  /**
   * 获得元素的事件配置
   * @param {Object} widget 元素对象
   * @param {String} eventName 事件名
   * @returns {Object} 返回元素的事件配置
   */
  const getEvent = function (widget, eventName) {
    return widget.events.find((v) => v.name === eventName);
  };
  /**
   * 执行元素的事件
   * @param {Object} widget 元素对象
   * @param {String} eventName 事件名
   * @returns {Function} 返回执行后的函数
   */
  const executeEvent = function (widget, eventName) {
    let event = getEvent(widget, eventName);
    let eventFn = new Function(...event.args, event.code);
    return eventFn(widget);
  };

  // 组件动作
  /**
   * 获得元素的动作配置
   * @param {Object} widget 元素对象
   * @param {String} actionName 动作名
   * @returns {Object} 返回元素的动作配置
   */
  const getAction = function (widget, actionName) {
    return widget.actions.find((v) => v.name === actionName);
  };
  /**
   * 执行元素的动作
   * @param {Object} widget 元素对象
   * @param {String} actionName 动作名
   * @returns {Function} 返回执行后的函数
   */
  const executeAction = function (widget, actionName) {
    let action = getAction(widget, actionName);
    return action && new Function("widget", action.code);
  };

  return {
    // 组件属性
    getPropValue,
    // 组件事件
    getEvent,
    executeEvent,
    // 组件动作
    getAction,
    executeAction,
  };
}
