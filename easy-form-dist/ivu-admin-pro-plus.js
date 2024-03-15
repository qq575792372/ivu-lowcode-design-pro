import { openBlock as s, createElementBlock as r } from "vue";
const t = { class: "easy-form-wrapper" }, e = /* @__PURE__ */ Object.assign({ name: "EasyForm" }, {
  __name: "index",
  setup(o) {
    return (a, c) => (s(), r("div", t, "easy-form"));
  }
});
e.__scopeId = "data-v-5e27ecf1";
e.install = function(o) {
  o.component("EasyForm", e);
};
export {
  e as EasyForm
};
