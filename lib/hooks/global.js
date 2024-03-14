import { computed, getCurrentInstance } from "vue";

/**
 * 全局配置的hooks
 */
export default function ({ props, emits }) {
  // 全局配置
  const globalConfig = computed(() => props.globalConfig || {});

  // 全局函数
  /**
   * 获得全局函数配置
   * @param {Array} globalFns 函数列表
   * @param {String} fnName 函数名
   * @returns {Object} 返回全局函数配置
   */
  const getGlobalFn = function (globalFns, fnName) {
    return globalFns.find((v) => v.name === fnName);
  };
  /**
   * 执行全局函数
   * @param {Array} globalFns 函数列表
   * @param {String} fnName 函数名
   * @param {Vue} vueInstance 绑定的入口vue实例
   * @param {Object} $globalVars 全局变量
   * @returns {Function} 返回执行后的函数
   */
  const executeGlobalFn = function (globalFns, fnName, vueInstance, $globalVars) {
    let fn = getGlobalEvent(globalFns, fnName);
    let fnFn = new Function(...["$globalVars"], fn.code).bind(vueInstance, $globalVars);
    return fnFn();
  };

  // 全局事件
  /**
   * 获得全局事件配置
   * @param {Array} globalEvents 事件列表
   * @param {String} eventName 事件名
   * @returns {Object} 返回全局事件配置
   */
  const getGlobalEvent = function (globalEvents, eventName) {
    return globalEvents.find((v) => v.name === eventName);
  };
  /**
   * 执行全局事件
   * @param {Array} globalEvents 事件列表
   * @param {String} eventName 事件名
   * @param {Vue} vueInstance 绑定的入口vue实例
   * @param {Object} $globalVars 全局变量
   * @returns {Function} 返回执行后的函数
   */
  const executeGlobalEvent = function (globalEvents, eventName, vueInstance, $globalVars) {
    let event = getGlobalEvent(globalEvents, eventName);
    let eventFn = new Function(...["$globalVars"], event.code).bind(vueInstance, $globalVars);
    return eventFn();
  };

  // 全局动作
  /**
   * 获得全局动作配置
   * @param {Array} globalActions 动作列表
   * @param {String} actionName 动作名
   * @returns {Object} 返回全局动作配置
   */
  const getGlobalAction = function (globalActions, actionName) {
    return globalActions.find((v) => v.name === actionName);
  };
  /**
   * 执行全局动作
   * @param {Array} globalActions 动作列表
   * @param {String} actionName 动作名
   * @param {Vue} vueInstance 绑定的入口vue实例
   * @param {Object} $globalVars 全局变量
   * @returns {Function} 返回执行后的函数
   */
  const executeGlobalAction = function (globalActions, actionName, vueInstance, $globalVars) {
    let action = getGlobalAction(globalActions, actionName);
    let actionFn = new Function(...["$globalVars"], action.code).bind(vueInstance, $globalVars);
    return actionFn();
  };

  // 全局组件列表
  /**
   * 获得扁平化后组件列表配置
   */
  const getFlatWidgets = function () {
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
   * @returns {Proxy} 返回Vue3挂载的全局变量
   */
  const getGlobalProperties = function () {
    const { proxy } = getCurrentInstance();
    return proxy;
  };

  return {
    // 全局函数
    getGlobalFn,
    executeGlobalFn,
    // 全局动作
    getGlobalAction,
    executeGlobalAction,
    // 全局事件
    getGlobalEvent,
    executeGlobalEvent,
    // 全局组件列表
    getFlatWidgets,
    // 全局挂载变量
    getGlobalProperties,
  };
}
