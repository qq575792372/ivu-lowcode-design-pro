import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// 创建store
const store = createPinia();
// 使用持久化插件
store.use(piniaPluginPersistedstate);

// 导出store
export default store;

// 导出模块
export { default as usePlatformStore } from "@/store/modules/platform";
