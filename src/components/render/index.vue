<template>
  <div class="render-container">
    <ComponentRender :parent-widgets="widgets" />
  </div>
</template>
<script setup>
import { computed } from "vue";
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
</script>
<style scoped lang="scss"></style>
