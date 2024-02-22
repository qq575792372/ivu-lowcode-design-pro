import { getCurrentInstance } from "vue";

/**
 * 获取Vue3中挂载的全局变量
 * @returns {Proxy} 返回全局的变量集合
 */
export default () => {
  const { proxy } = getCurrentInstance();
  return proxy;
};
