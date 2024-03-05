<template>
  <div class="render-container">
    <ComponentRender :widgets="widgets" :global-config="globalConfig" />
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

// 渲染的元素列表
const widgets = computed(() => {
  return props.data.widgets;
});
// 全局配置
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
