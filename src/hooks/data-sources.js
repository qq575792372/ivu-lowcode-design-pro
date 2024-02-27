import { computed } from "vue";
import useGlobalProperties from "@/hooks/globalProperties";

/**
 * 设计器中数据源配置的hooks
 */
export default ({ props, emits }) => {
  // 获得全局配置中的数据
  const { $request, $message } = useGlobalProperties();
  // 获得数据源列表
  const dataSources = computed(() => props.designer.widgetConfig.dataSources);

  /**
   * 发送请求
   * @param {String} dsName 数据源名称
   * @param {Object} localDsv 本地参数数据变量DSV
   * @returns {Promise} 返回执行后的数据
   */
  const requestData = async (dsName, localDsv = {}) => {
    let dataSource = getDataSource(dsName);
    try {
      let requestConfig = _buildRequestConfig(dataSource, localDsv);
      let result = await $request.request(requestConfig);
      let responseFn = new Function("result", "DSV", dataSource.responseCode);
      return responseFn.call(null, result, localDsv);
    } catch (error) {
      let responseErrorFn = new Function("error", "DSV", "$message", dataSource.responseErrorCode);
      responseErrorFn.call(null, error, localDsv, $message);
    }
  };

  /**
   * 通过名称获得数据源配置
   * {String} dsName 数据源名称
   */
  const getDataSource = (dsName) => {
    return dataSources.value.find((v) => v.name === dsName);
  };

  /**
   * 构建请求配置
   * @param {Object} dataSource 数据源配置
   * @param {Object} DSV 数据源变量（data source var)
   * @returns {Promise}
   */
  const _buildRequestConfig = (dataSource, DSV = {}) => {
    let config = {};

    // 处理url
    if (dataSource.urlType === "String") {
    } else if (dataSource.urlType === "VarFx") {
      let fn = new Function("DSV", "return " + String(dataSource.url));
      config.url = fn(DSV);
    }

    // 处理method
    config.method = dataSource.method;

    // 处理headers
    let headers = _getAssembleAxiosConfig(dataSource.headers, DSV);
    if (headers) {
      config.headers = headers;
    }

    // 处理params
    let params = _getAssembleAxiosConfig(dataSource.params, DSV);
    if (params) {
      config.params = params;
    }

    // 处理data
    let data = _getAssembleAxiosConfig(dataSource.data, DSV);
    if (data) {
      config.data = data;
    }

    // 处理请求requestCode
    let requestFn = new Function("config", "DSV", dataSource.requestCode);

    // 返回最终的请求配置
    return requestFn.call(null, config, DSV);
  };

  /**
   * 获得组装后的请求配置参数
   * @param {Array} data 要组装的请求参数对象
   * @param {Object} DSV 数据源变量（data source var)
   */
  const _getAssembleAxiosConfig = (data, DSV = {}) => {
    if (!data || data.length <= 0) return;

    // 组装数据
    let result = {};
    for (let hd of data) {
      if (hd.type === "String") {
        result[hd.name] = String(hd.value);
      } else if (hd.type === "Number") {
        result[hd.name] = Number(hd.value);
      } else if (hd.type === "Boolean") {
        result[hd.name] = Boolean(hd.value);
      } else if (hd.type === "Array") {
        result[hd.name] = hd.value;
      } else if (hd.type === "VarFx") {
        let fn = new Function("DSV", "return " + hd.value);
        result[hd.name] = fn(DSV);
      } else {
        console.error("data source not support type!");
        return;
      }
    }
    return result;
  };

  return {
    requestData,
  };
};
