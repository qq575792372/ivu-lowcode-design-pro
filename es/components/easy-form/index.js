import './index.vue.js';
import script from './index.vue2.js';

console.log(3333, script);
script.install = function (app) {
  app.component("EasyForm", script);
};

export { script as default };
