<template>
  {{ data.globalConfig }}
  <component :is="render" class="render" />
</template>
<script setup>
import { shallowRef, getCurrentInstance } from "vue";
import useRender from "@/hooks/render";
// import { toPascalCase } from "@lime-util/util";

defineOptions({
  name: "Render",
});

// props
const props = defineProps({
  data: { type: Object, default: () => ({}) },
});

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

/* // 注册所有设计器组件
const app = getCurrentInstance();
// 注册设计器组件
const widgets = import.meta.glob("/src/platform*!/widgets/!*-widget/index.vue", { eager: true });
Object.entries(widgets).map(([path, component]) => {
  // 会优先获取组件内部定义的名称，否则取文件名为组件名
  let componentName = component.default.name || toPascalCase(getCmpNameFromPath(path, "-widget"));
  app.appContext.app.component(componentName, component.default);
}); */

// 使用预览渲染的hooks
const render = shallowRef(null);
render.value = useRender({ props: { widgets: props.data.widgets, globalConfig: props.data.globalConfig } });
</script>
<style scoped lang="scss"></style>
