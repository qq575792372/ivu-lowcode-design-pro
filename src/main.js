import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

// 引入 pinia
import store from "./store";

app.use(store);

import "@/styles/index.scss";

// 挂载实例
app.mount("#app");
