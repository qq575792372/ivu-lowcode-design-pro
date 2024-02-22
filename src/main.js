import { createApp } from "vue";
import request from "@/utils/request";
import App from "./App.vue";

const app = createApp(App);

// element-plus需要手动引入的样式
import "element-plus/es/components/message/style/css";
import "element-plus/theme-chalk/el-message-box.css";
import { ElMessage } from "element-plus";

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

// 引入样式主文件
import "@/styles/index.scss";
// 引入主题样式
import "@/theme/default.scss";

// 绑定全局变量
app.config.globalProperties.$message = ElMessage;
app.config.globalProperties.$request = request;

// 挂载实例
app.mount("#app");
