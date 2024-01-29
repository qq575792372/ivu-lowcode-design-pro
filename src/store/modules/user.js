import { defineStore } from "pinia";

const userStore = defineStore("user", {
  state: () => {
    return {
      token: "123",
    };
  },
  getters: {
    getToken: (state) => state.token,
  },
  actions: {
    setToken(token) {
      this.token = token;
    },
  },
  persist: {
    key: "PINIA_USER", // 缓存key
    storage: window.sessionStorage, // 缓存方式
    // 指定持久化状态的属性，默认持久化所有数据
    // paths: ["token"], // 持久化token字段
  },
});

export default userStore;
