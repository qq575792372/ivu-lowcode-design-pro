import EasyForm from "./easy-form/index.js";
import Button from "./button/index.js";

const version = "V1.0.0";
const install = function (app) {
  app.component("EasyForm", EasyForm);
  app.component("Button", Button);
};

export { EasyForm, Button };
export default { install, version };
