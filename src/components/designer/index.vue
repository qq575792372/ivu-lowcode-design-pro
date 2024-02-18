<template>
  <div class="designer-container">
    <!--在设计器入口传入widgets-->
    <ComponentRender :designer :parent-widgets="props.designer.widgets" />
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
  height: 100%;
  padding: var(--cmp-large-padding);
}
</style>
