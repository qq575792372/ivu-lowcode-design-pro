import { getCurrentInstance, shallowRef, openBlock, createElementBlock, Fragment, createTextVNode, toDisplayString, createBlock, resolveDynamicComponent } from 'vue';
import useRender from '@/hooks/render';
import { toPascalCase } from '@lime-util/util';

var script = /*#__PURE__*/Object.assign({
  name: "Render",
}, {
  __name: 'index',
  props: {
  data: { type: Object, default: () => ({}) },
},
  setup(__props) {



// props
const props = __props;

/**
 * 通过路径获得组件名称
 * @param path
 * @param suffix
 * @returns {string}
 */
const getCmpNameFromPath = (path, suffix) => {
  return String(path)
    .split("/")
    .filter((v) => v.indexOf(suffix) > -1)
    .shift();
};

// 注册所有设计器组件
const app = getCurrentInstance();
// 注册设计器组件
const widgets = import.meta.glob("/src/platform*/widgets/*-widget/index.vue", { eager: true });
Object.entries(widgets).map(([path, component]) => {
  // 会优先获取组件内部定义的名称，否则取文件名为组件名
  let componentName = component.default.name || toPascalCase(getCmpNameFromPath(path, "-widget"));
  app.appContext.app.component(componentName, component.default);
});

// 使用预览渲染的hooks
const render = shallowRef(null);
render.value = useRender({ props: { widgets: props.data.widgets, globalConfig: props.data.globalConfig } });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock(Fragment, null, [
    createTextVNode(toDisplayString(__props.data.globalConfig) + " ", 1 /* TEXT */),
    (openBlock(), createBlock(resolveDynamicComponent(render.value), { class: "render" }))
  ], 64 /* STABLE_FRAGMENT */))
}
}

});

script.__file = "src/components/render/index.vue";

export { script as default };
