<template>
  <div class="designer-container">
    <!--在设计器入口传入第一层的widgets-->
    <ComponentDrag :designer :parent-widgets="props.designer.widgets" />
  </div>
</template>
<script setup>
import ComponentDrag from "./component-drag.vue";

// props
const props = defineProps({ designer: { type: Object, default: () => ({}) } });
</script>
<style lang="scss" scoped>
.designer-container {
  height: 100%;
  padding: var(--cmp-large-padding);
}
</style>
