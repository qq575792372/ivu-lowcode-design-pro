<template>
  <!--拖拽进来的组件渲染，可以多层递归嵌套-->
  <div v-if="widget.id === props.designer.selectedId" class="widget-drag-handler">
    <el-icon>
      <Rank />
    </el-icon>
    {{ widget.label }}
  </div>
  <component
    :is="widget.type + '-widget'"
    :designer
    :widget
    :parent-widget="parentWidget"
    :parent-widgets="parentWidgets"
    :index-of-parent-widgets="indexOfParentWidgets"
  >
    <ComponentDrag
      :designer
      :widget
      :parent-widget="widget"
      :widgets="widget.widgets"
      :parent-widgets="widget.widgets"
      :index-of-parent-widgets="indexOfParentWidgets"
    />
  </component>
  <div v-if="widget.id === props.designer.selectedId" class="widget-drag-action">
    <el-tooltip content="选中父组件" placement="bottom">
      <el-icon :size="18" @click.stop="handleSelectedParentWidget">
        <Back />
      </el-icon>
    </el-tooltip>
    <el-tooltip content="向上移动" placement="bottom">
      <el-icon :size="16" @click.stop="handleMoveUpWidget">
        <Top />
      </el-icon>
    </el-tooltip>
    <el-tooltip content="向下移动" placement="bottom">
      <el-icon :size="16" @click.stop="handleMoveDownWidget">
        <Bottom />
      </el-icon>
    </el-tooltip>
    <el-tooltip content="复制" placement="bottom">
      <el-icon :size="16" @click.stop="handleCopyWidget">
        <CopyDocument />
      </el-icon>
    </el-tooltip>
    <el-tooltip content="删除" placement="bottom">
      <el-icon :size="16" @click.stop="handleRemoveWidget">
        <Delete />
      </el-icon>
    </el-tooltip>
  </div>
</template>
<script setup>
import ComponentDrag from "./component-drag.vue";
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
 * 选中父组件
 */
const handleSelectedParentWidget = () => {
  props.designer.selectedParentWidget(props.parentWidget);
};
/**
 * 向上移动
 */
const handleMoveUpWidget = () => {
  props.designer.moveUpWidget(props.parentWidgets, props.indexOfParentWidgets);
};
/**
 * 向下移动
 */
const handleMoveDownWidget = () => {
  props.designer.moveDownWidget(props.parentWidgets, props.indexOfParentWidgets);
};
/**
 * 复制
 */
const handleCopyWidget = () => {
  props.designer.copyWidget(props.parentWidgets, props.indexOfParentWidgets);
};
/**
 * 删除
 */
const handleRemoveWidget = () => {
  props.designer.removeWidget(props.parentWidgets, props.indexOfParentWidgets);
};
</script>
<style lang="scss" scoped></style>
