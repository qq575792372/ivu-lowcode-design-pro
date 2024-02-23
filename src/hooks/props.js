import { computed } from "vue";

/**
 * 组件属性的hooks
 */
export default ({ props, emits }) => {
  const widgetConfig = computed(() => {
    return props.designer.widgetConfig;
  });

  /**
   * 获得元素属性绑定的类型
   * @param {String} propName 属性名称
   * @returns {Object} 返回该元素属性绑定的类型
   */
  const getPropType = (propName) => {};

  /**
   * 获得元素属性绑定的值
   * @description 会解析属性绑定的类型，包括变量，表达式，函数
   * @param {String} propName 属性名称
   * @returns {Object} 返回该元素属性解析后的值
   */
  const getPropValue = (propName) => {
    return props.widget.props[propName];
  };

  const getPropResult = (bindValue) => {
    if (!bindValue) return;
    const bindType = bindValue.split(".")[0];
    // 全局变量
    if (bindType === "$globalVars") {
    }
    // 全局表达式
    else if (bindType === "$globalFxs") {
    }
    // 全局函数
    else if (bindType === "$globalFns") {
      return computed(() => {
        let name = bindValue.split(".")[1];
        let { code } = widgetConfig.value.globalFns.find((v) => v.name === name);
        console.log(22, code);
        let fn = new Function("widget", code);
        return fn(props.widget);
      });
    }
    // 数据源
    else if (bindType === "$dataSources") {
      // TODO 在设计模式下不适用，渲染和预览时候起作用，待开发
      return ref(null);
    }
    // 普通值
    else {
      return bindValue;
    }
  };

  return {
    getPropType,
    getPropValue,
    getPropResult,
  };
};
