<template>
  <div class="render-container">
    <ComponentRender :designer="render" :parent-widgets="widgets" />
  </div>
</template>
<script setup>
import {
  computed,
  onMounted,
  onUpdated,
  onUnmounted,
  onBeforeMount,
  onBeforeUpdate,
  onBeforeUnmount,
  onActivated,
  onDeactivated,
  getCurrentInstance,
  reactive,
} from "vue";
import useGlobal from "@/hooks/global";
import ComponentRender from "./component-render.vue";
import { createRender } from "@/components/render/render";

defineOptions({
  name: "Render",
});

// props
const props = defineProps({
  data: { type: Object, default: () => ({}) },
  designer: { type: Object, default: () => ({}) },
});

// 创建渲染器，并初始化
const { proxy } = getCurrentInstance();
const render = reactive(createRender(proxy));
render.initRender(props.data);

// 计算属性
const widgets = computed(() => {
  return props.data.widgets;
});
const globalConfig = computed(() => {
  return props.data.globalConfig;
});

// 使用全局配置的hooks
const { executeGlobalEventFn } = useGlobal({ props });

// 执行全局事件
onMounted(() => {
  executeGlobalEventFn(globalConfig.value.globalEvents, "onMounted");
});
onUpdated(() => {
  executeGlobalEventFn(globalConfig.value.globalEvents, "onUpdated");
});
onUnmounted(() => {
  executeGlobalEventFn(globalConfig.value.globalEvents, "onUnmounted");
});
onBeforeMount(() => {
  executeGlobalEventFn(globalConfig.value.globalEvents, "onBeforeMount");
});
onBeforeUpdate(() => {
  executeGlobalEventFn(globalConfig.value.globalEvents, "onBeforeUpdate");
});
onBeforeUnmount(() => {
  // 清空渲染器
  render.clearRender();
  executeGlobalEventFn(globalConfig.value.globalEvents, "onBeforeUnmount");
});
onActivated(() => {
  executeGlobalEventFn(globalConfig.value.globalEvents, "onActivated");
});
onDeactivated(() => {
  executeGlobalEventFn(globalConfig.value.globalEvents, "onDeactivated");
});
</script>
<style scoped lang="scss"></style>
