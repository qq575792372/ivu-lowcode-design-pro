console.log("这里是install");
import { App } from "vue";
import { globSync } from "fast-glob";

const widgets = globSync("./src/platform*/widgets/*-widget/index.vue");
console.log(111, widgets);
export default {
  install(App, options) {},
};
