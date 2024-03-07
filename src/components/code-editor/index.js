/**
 * ace编辑器支持的自定义语法扩展提示
 */
export const completions = [
  // 设计器中的属性
  {
    meta: "Designer Var",
    caption: "widgets",
    value: "widgets",
    score: 1,
  },
  {
    meta: "Designer Var",
    caption: "globalConfig",
    value: "globalConfig",
    score: 1,
  },
  {
    meta: "Designer Var",
    caption: "selectedId",
    value: "selectedId",
    score: 1,
  },
  {
    meta: "Designer Var",
    caption: "selectedWidget",
    value: "selectedWidget",
    score: 1,
  },

  // 设计器中方法
  {
    meta: "Designer Function",
    caption: "loadFromJson",
    value: "loadFromJson()",
    score: 1,
  },
  {
    meta: "Designer Function",
    caption: "mergeFromJson",
    value: "mergeFromJson()",
    score: 1,
  },
  {
    meta: "Designer Function",
    caption: "setSelected",
    value: "setSelected(widget)",
    score: 1,
  },
  {
    meta: "Designer Function",
    caption: "clearSelected",
    value: "clearSelected()",
    score: 1,
  },
  {
    meta: "Designer Function",
    caption: "getWidget",
    value: "getWidget(typeName)",
    score: 1,
  },
  {
    meta: "Designer Function",
    caption: "getWidgetRef",
    value: "getWidgetRef(typeName)",
    score: 1,
  },
];
