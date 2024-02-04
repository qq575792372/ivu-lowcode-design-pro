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
    @add="onAdd"
  >
    <div
      v-for="(widget, widgetIndex) in parentWidgets"
      :key="widgetIndex"
      :class="{ selected: widget.id === props.designer.selectedId }"
      class="widget-wrapper"
      @click.stop="handleSelectedWidget(widget)"
    >
      <ComponentRender
        :designer
        :widget
        :parent-widget="parentWidget"
        :index-of-parent-widgets="widgetIndex"
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
  console.log(11, widget);
  props.designer.setSelected(widget);
};

// 拖拽的操作
/**
 * 拖拽增加
 * @param event
 */
const onAdd = (event) => {
  console.log("onAdd", event);
};
/**
 * 拖拽更新
 * @param event
 */
const onUpdate = async (event) => {
  console.log("更新", event);
  const { newIndex, oldIndex } = event;
  const currRow = props.designer.widgets.splice(oldIndex, 1)[0];
  props.designer.widgets.splice(newIndex, 0, currRow);
};
</script>
<style lang="scss" scoped></style>
