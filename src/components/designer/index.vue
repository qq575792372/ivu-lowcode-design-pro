<template>
  <div class="designer-container">
    <div class="widget-canvas">
      <!--在设计器入口传入widgets-->
      <ComponentRender :designer :parent-widgets="props.designer.widgets" />
    </div>
  </div>
</template>
<script setup>
import { watch } from "vue";
import { useDesignerStore } from "@/store";
import ComponentRender from "./component-render.vue";

defineOptions({
  name: "Design",
});

// props
const props = defineProps({ designer: { type: Object, default: () => ({}) } });

// 获取到设计器的store
const designerStore = useDesignerStore();

// 监听设计器widgets列表
watch(
  () => props.designer.widgets,
  (val) => {
    // 缓存设计器的widgets列表
    designerStore.setWidgets(val);
  },
  {
    deep: true,
    immediate: true,
  },
);
</script>
<style lang="scss" scoped>
.designer-container {
  overflow: hidden;
  height: 100%;

  .widget-canvas {
    height: 100%;
    overflow: auto;
    padding: var(--cmp-padding);
    backface-visibility: hidden;
  }
}
</style>
