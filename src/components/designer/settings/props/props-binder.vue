<template>
  <!--属性绑定的组件，在这里双向绑定自定义属性的值，以及执行的变量，表达式等-->
  <div class="props-binder-wrapper">
    <component
      :is="props.item.componentName"
      v-model="currentWidgetProps[item.name]"
      :item="props.item"
      :designer
      :widget
      class="props-editor"
    />
    <el-button class="props-fx" type="text" text plain @click="handleClick(event, eventIndex)">ƒx</el-button>
  </div>
</template>
<script setup>
import { computed } from "vue";

defineOptions({ name: "PropsBinder" });
// props
const props = defineProps({
  designer: { type: Object, default: () => ({}) },
  widget: { type: Object, default: () => ({}) },
  item: { type: Object, default: () => ({}) },
});
// 当前元素的属性
const currentWidgetProps = computed(() => {
  return props.widget.props;
});
</script>
<style scoped lang="scss">
.props-binder-wrapper {
  display: flex;

  .props-editor {
    flex: 1;
    margin-right: var(--sp4);
  }

  .props-fx {
    margin-left: auto;
  }
}
</style>
