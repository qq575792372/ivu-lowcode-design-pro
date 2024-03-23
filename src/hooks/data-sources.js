import { computed } from "vue";
import useGlobal from "./global";

/**
 * 数据源的hooks
 */
export default function ({ props, emits }) {
  // 使用全局配置的hooks
  const { getGlobalProperties } = useGlobal({ props, emits });
  const { $request, $message } = getGlobalProperties();

  // 获得数据源列表
  const dataSources = computed(() => props.globalConfig.dataSources);
  // 全局配置
  const globalConfig = computed(() => props.globalConfig || {});

  /**
   * 发送请求
   * @param {String} dsName 数据源名称
   * @param {Object} localDsv 本地参数数据变量DSV
   * @param {Vue} vueInstance 绑定的入口vue实例
   * @returns {Promise} 返回执行后的数据
   */
  const requestData = async function (dsName, localDsv = {}, vueInstance) {
    let dataSource = getDataSource(dsName);
    try {
      let requestConfig = _buildRequestConfig(dataSource, localDsv, vueInstance, globalConfig.value.globalVars);
      let result = await $request.request(requestConfig);
      let responseFn = new Function(...["result", "DSV", "$globalVars"], dataSource.responseCode).bind(vueInstance);
      return responseFn.call(null, result, localDsv, globalConfig.value.globalVars);
    } catch (error) {
      let responseErrorFn = new Function(
        ...["error", "DSV", "$globalVars", "$message"],
        dataSource.responseErrorCode,
      ).bind(vueInstance);
      responseErrorFn.call(null, error, localDsv, globalConfig.value.globalVars, $message);
    }
  };

  /**
   * 通过名称获得数据源配置
   * @param {String} dsName 数据源名称
   */
  const getDataSource = function (dsName) {
    return dataSources.value.find((v) => v.name === dsName);
  };

  /**
   * 构建请求配置
   * @param {Object} dataSource 数据源配置
   * @param {Object} DSV 数据源变量（data source var)
   * @param {Vue} vueInstance 绑定的入口vue实例
   * @param {Object} $globalVars 全局变量
   * @returns {Object} 返回构建后的请求配置
   */
  const _buildRequestConfig = function (dataSource, DSV = {}, vueInstance, $globalVars) {
    let config = {};

    // 处理url
    if (dataSource.urlType === "String") {
      config.url = String(dataSource.url);
    } else if (dataSource.urlType === "VarFx") {
      let fn = new Function(...["DSV", "$globalVars"], "return " + String(dataSource.url)).bind(vueInstance);
      config.url = fn(DSV, $globalVars);
    }

    // 处理method
    config.method = dataSource.method;

    // 处理headers
    let headers = _getAssembleAxiosConfig(dataSource.headers, DSV, vueInstance, $globalVars);
    if (headers) {
      config.headers = headers;
    }

    // 处理params
    let params = _getAssembleAxiosConfig(dataSource.params, DSV, vueInstance, $globalVars);
    if (params) {
      config.params = params;
    }

    // 处理data
    let data = _getAssembleAxiosConfig(dataSource.data, DSV, vueInstance, $globalVars);
    if (data) {
      config.data = data;
    }

    // 处理请求requestCode
    let requestFn = new Function(...["config", "DSV", "$globalVars"], dataSource.requestCode).bind(vueInstance);

    // 返回最终的请求配置
    return requestFn.call(null, config, DSV, $globalVars);
  };

  /**
   * 获得不同请求参数类型组装后的配置
   * @param {Array} data 要组装的请求参数类型，如url、headers、params、data等
   * @param {Object} DSV 数据源变量（data source var)
   * @param {Vue} vueInstance 绑定的入口vue实例
   * @param {Object} $globalVars 全局变量
   * @returns {Object} 返回组装后的请求配置参数
   */
  const _getAssembleAxiosConfig = function (data, DSV = {}, vueInstance, $globalVars) {
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
      } else if (hd.type === "VarFx") {
        let fn = new Function(...["DSV", "$globalVars"], "return " + hd.value).bind(vueInstance);
        result[hd.name] = fn(DSV, $globalVars);
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
}
