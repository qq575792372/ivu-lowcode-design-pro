<template>
  <!--此处接收父组件的widgets，可以多层递归嵌套-->
  <VueDraggable
    v-model="props.parentWidgets"
    class="custom-vue-draggable"
    :class="{ 'no-widget': props.parentWidgets.length === 0 }"
    :group="{ name: 'designer-group' }"
    :animation="150"
    handle=".widget-drag-handler"
    chosen-class="widget-chosen-class"
    drag-class="widget-drag-class"
    ghost-class="widget-ghost-class"
    @update="onUpdate"
    @add="onAdd($event, parentWidgets)"
  >
    <div
      v-for="(subWidget, subWidgetIndex) in parentWidgets"
      :key="subWidget.id"
      :class="{ selected: subWidget.id === props.designer.selectedId }"
      class="widget-wrapper"
      @click.stop="handleSelectedWidget(subWidget)"
    >
      <ComponentRender
        :designer
        :widget="subWidget"
        :parent-widget="parentWidget"
        :index-of-parent-widgets="subWidgetIndex"
        :parent-widgets="parentWidgets"
      />
    </div>
  </VueDraggable>
</template>
<script setup>
import { VueDraggable } from "vue-draggable-plus";
import ComponentRender from "./component-render.vue";

// props
const props = defineProps({
  designer: { type: Object, default: () => ({}) },
  widget: { type: Object, default: () => ({}) },
  parentWidget: { type: Object, default: () => ({}) },
  parentWidgets: { type: Array, default: () => [] },
  indexOfParentWidgets: { type: Number, default: null },
});

// 当前组件的操作
/**
 * 选中当前组件
 * @param widget
 */
const handleSelectedWidget = (widget) => {
  props.designer.setSelected(widget);
};

// 拖拽的操作
/**
 * 拖拽增加
 * @param event
 */
const onAdd = (event, parentWidgets) => {
  const { newIndex } = event;
  props.designer.setSelected(props.parentWidgets[newIndex]);
};
/**
 * 拖拽更新
 * @param event
 */
const onUpdate = async (event) => {
  const { newIndex, oldIndex } = event;
  const currRow = props.parentWidgets.splice(oldIndex, 1)[0];
  props.parentWidgets.splice(newIndex, 0, currRow);
};
</script>
<style lang="scss" scoped></style>
