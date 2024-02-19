<template>
  <div class="designer-container">
    <div class="widget-canvas">
      <!--在设计器入口传入widgets-->
      <ComponentRender :designer :parent-widgets="props.designer.widgets" />
    </div>
  </div>
</template>
<script setup>
import ComponentRender from "./component-render.vue";

defineOptions({
  name: "Design",
});

// props
const props = defineProps({ designer: { type: Object, default: () => ({}) } });
</script>
<style lang="scss" scoped>
.designer-container {
  overflow: hidden;
  height: 100%;

  .widget-canvas {
    height: 100%;
    overflow: auto;
    padding: var(--cmp-padding);
  }
}
</style>
