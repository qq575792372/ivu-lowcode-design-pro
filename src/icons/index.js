import "virtual:svg-icons-register";
import SvgIcon from "@/components/svg-icon/index.vue";

export default {
  install(app, options) {
    app.component("SvgIcon", SvgIcon);
  },
};
