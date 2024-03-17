import Button from "./index.vue";

Button.install = function (app) {
  app.component("Button", Button);
};

export default Button;
