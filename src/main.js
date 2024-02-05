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

// 使用低代码平台插件注册
import UsePlatform from "@/plugins/platform/index";

app.use(UsePlatform);

// 使用svg-icon图标
import SvgIcon from "@/icons/index";

app.use(SvgIcon);

console.log("整个vue数据", app);
// 引入样式主文件
import "@/styles/index.scss";
// 引入主题样式
import "@/theme/default.scss";

// 挂载实例
app.mount("#app");
