import { defineStore } from "pinia";

const usePlatformStore = defineStore("platform", {
  state: () => {
    return {
      // 平台组件库数据
      platformComponents: [],
      // 平台模板库数据
      platformTemplates: [],
    };
  },
  getters: {
    getPlatformComponents: (state) => state.platformComponents,
    getPlatformTemplates: (state) => state.platformTemplates,
  },
  actions: {
    setPlatformComponents(platformComponents) {
      this.platformComponents = platformComponents;
    },
    setPlatformTemplates(platformTemplates) {
      this.platformTemplates = platformTemplates;
    },
  },
  persist: {
    key: "LOWCODE_PLATFORM", // 缓存key
    storage: window.sessionStorage, // 缓存方式
  },
});

export default usePlatformStore;
