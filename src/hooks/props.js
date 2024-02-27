import { computed, ref } from "vue";
import useGlobal from "@/hooks/global";
import useDataSources from "@/hooks/data-sources";

/**
 * 组件属性的hooks
 */
export default ({ props, emits }) => {
  // 设计器配置，可以获取到全局的变量
  const widgetConfig = computed(() => {
    return (props.designer && props.designer.widgetConfig) || {};
  });
  // 获取设计器中全局配置的hooks
  const { executeGlobalEventFn } = useGlobal({ props, emits });
  // 获取设计器中数据源配置的hooks
  const { requestData } = useDataSources({ props, emits });

  /**
   * 通过元素属性名获取绑定的值
   * @description 该方法会返回解析后的值，在页面中直接使用
   * @param {String} propName 属性名称
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
  const getPropResult = (propValue) => {
    // 全局变量
    if (propValue.includes("$globalVars")) {
      // 通过对象取值路径获取值
      let varFn = new Function("$globalVars", `return ${propValue}`);
      return varFn(widgetConfig.value.globalVars);
    }
    // 全局函数
    else if (propValue.includes("$globalFns")) {
      let bindValue = propValue.split(".")[1]; // 获取到函数名称
      return executeGlobalEventFn(widgetConfig.value.globalFns, bindValue);
    }
    // 数据源
    else if (propValue.includes("$dataSources")) {
      let bindValue = propValue.split(".")[1]; // 获取到数据源名称
      // return await requestData(bindValue);
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
