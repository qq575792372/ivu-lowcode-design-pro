<template>
  <div class="render-container">
    <ComponentRender :parent-widgets="widgets" />
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
} from "vue";
import useGlobal from "@/hooks/global";
import ComponentRender from "./component-render.vue";

defineOptions({
  name: "Render",
});

// props
const props = defineProps({
  data: { type: Object, default: () => ({}) },
});

// 计算属性
const widgets = computed(() => {
  return props.data.widgets;
});
const widgetConfig = computed(() => {
  return props.data.widgetConfig;
});

// 获取全局配置的hooks
const { executeGlobalEventFn } = useGlobal({ props });

// 执行全局事件
onMounted(() => {
  executeGlobalEventFn(widgetConfig.value.globalEvents, "onMounted");
});
onUpdated(() => {
  executeGlobalEventFn(widgetConfig.value.globalEvents, "onUpdated");
});
onUnmounted(() => {
  executeGlobalEventFn(widgetConfig.value.globalEvents, "onUnmounted");
});
onBeforeMount(() => {
  executeGlobalEventFn(widgetConfig.value.globalEvents, "onBeforeMount");
});
onBeforeUpdate(() => {
  executeGlobalEventFn(widgetConfig.value.globalEvents, "onBeforeUpdate");
});
onBeforeUnmount(() => {
  executeGlobalEventFn(widgetConfig.value.globalEvents, "onBeforeUnmount");
});
onActivated(() => {
  executeGlobalEventFn(widgetConfig.value.globalEvents, "onActivated");
});
onDeactivated(() => {
  executeGlobalEventFn(widgetConfig.value.globalEvents, "onDeactivated");
});
</script>
<style scoped lang="scss"></style>
