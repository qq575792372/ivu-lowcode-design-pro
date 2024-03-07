<template>
  <div class="render-container">
    <ComponentRender :render :widgets="widgets" :global-config="globalConfig" />
  </div>
</template>
<script setup>
import {
  ref,
  h,
  reactive,
  shallowRef,
  computed,
  onMounted,
  onUpdated,
  onUnmounted,
  onBeforeMount,
  onBeforeUpdate,
  onBeforeUnmount,
  onActivated,
  onDeactivated,
  resolveComponent,
  defineComponent,
  getCurrentInstance,
} from "vue";
import { createRender } from "./render";
import useGlobal from "@/hooks/global";
import ComponentRender from "./component-render.vue";

defineOptions({
  name: "Render",
});

// props
const props = defineProps({
  data: { type: Object, default: () => ({}) },
});

// 创建渲染器，并初始化
const { proxy } = getCurrentInstance();
const render = reactive(createRender(proxy));
render.initRender(props.data);

// 渲染的元素列表
const widgets = computed(() => {
  return props.data.widgets;
});
// 全局配置
const globalConfig = computed(() => {
  return props.data.globalConfig;
});

/* const { proxy } = getCurrentInstance();
console.log("proxy", proxy.$refs);
const ButtonWidget = resolveComponent("ButtonWidget");
console.log(9999, ButtonWidget);
const testRef = shallowRef(null);
testRef.value = defineComponent({
  mounted() {
    console.log("内部组件", this, this.$refs);
  },
  render() {
    return h("div", {}, { default: () => h(resolveComponent("ButtonWidget"), {}) });
  },
}); */

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
  // 清空渲染器
  render.clearRender();
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
