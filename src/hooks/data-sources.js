import { computed } from "vue";
import useGlobalProperties from "@/hooks/globalProperties";

/**
 * 设计器中数据源配置的hooks
 */
export default ({ props, emits }) => {
  const { $request } = useGlobalProperties();
  const dataSources = computed(() => props.designer.widgetConfig.dataSources);
  console.log(33, $request);

  /**
   * 发送请求
   * @param {String} dsName 数据源名称
   * @param {Object} localDsv 本地数据参数变量DSV
   * @returns {Promise} 返回执行后的数据
   */
  const requestData = async (dsName, localDsv = {}) => {
    const dataSource = dataSources.value.find((v) => v.name === dsName);
    console.log(33, dataSource);
  };

  const buildRequestConfig = () => {};

  return {
    requestData,
  };
};
