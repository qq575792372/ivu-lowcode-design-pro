import { defineStore } from "pinia";

const usePlatformStore = defineStore("platform", {
  state: () => {
    return {
      platformList: [],
    };
  },
  getters: {
    getPlatformList: (state) => state.platformList,
  },
  actions: {
    setPlatformList(platformList) {
      this.platformList = platformList;
    },
  },
  persist: {
    key: "LOWCODE_PLATFORM", // 缓存key
    storage: window.sessionStorage, // 缓存方式
  },
});

export default usePlatformStore;
