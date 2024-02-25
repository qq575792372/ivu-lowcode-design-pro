import { computed, ref } from "vue";
import useGlobal from "@/hooks/global";

/**
 * 组件属性的hooks
 */
export default ({ props, emits }) => {
  // 设计器配置，可以获取到全局的变量
  const widgetConfig = computed(() => {
    return props.designer.widgetConfig;
  });

  // 全局的hooks
  const { executeGlobalEventFn } = useGlobal({ props, emits });

  /**
   * 通过元素属性名获取绑定的值
   * @description 该方法会返回解析后的值，在页面中直接使用
   * @param {String} propName 属性名称
   * @returns {Object} 返回该元素属性解析后的值
   */
  const getPropValue = (propName) => {
    return computed(() => {
      let propValue = props.widget.props[propName];
      console.log("getPropValue", propValue);
      return getPropResult(propValue);
    });
  };

  /**
   * 解析绑定的值的结果
   * @description 会解析属性绑定的类型，包括变量，表达式，函数
   * @param {String} propValue 属性的值
   * @returns {Object} 返回值解析后的结果
   */
  const getPropResult = (propValue) => {
    // 全局函数
    if (propValue.includes("$globalFns")) {
      let bindValue = propValue.split(".")[1];
      return executeGlobalEventFn(widgetConfig.value.globalFns, bindValue);
    }
    // 数据源
    else if (propValue.includes("$dataSources")) {
      let bindValue = bindValue.split(".")[1];
      console.log("数据源", bindValue);
      return ref(null);
    }
    // 普通值
    else {
      return propValue;
    }
  };
  return {
    getPropValue,
    getPropResult,
  };
};
