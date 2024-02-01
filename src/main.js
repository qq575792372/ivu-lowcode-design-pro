import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

// 使用 element-plus 图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 引入 pinia
import store from "./store";

app.use(store);

// 引入样式主文件
import "@/styles/index.scss";
// 引入主题样式
import "@/theme/default.scss";

// 挂载实例
app.mount("#app");
