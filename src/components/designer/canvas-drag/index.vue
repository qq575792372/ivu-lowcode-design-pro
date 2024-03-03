<template>
  <!--此处接收父组件的widgets，可以多层递归嵌套-->
  <VueDraggable
    v-model="props.widgets"
    class="custom-vue-draggable"
    :class="{ 'no-widget': props.widgets.length === 0 }"
    :group="{ name: 'designer-group' }"
    :animation="150"
    :empty-insert-threshold="0"
    handle=".widget-drag-handler"
    chosen-class="widget-chosen-class"
    drag-class="widget-drag-class"
    ghost-class="widget-ghost-class"
    @update="onUpdate"
    @add="onAdd($event, props.widgets)"
  >
    <div
      v-for="(widget, widgetIndex) in props.widgets"
      :key="widget.id"
      :class="{ selected: widget.id === props.designer.selectedId }"
      class="widget-wrap"
      @click.stop="handleSelectedWidget(widget)"
    >
      <!--拖拽的手柄-->
      <div v-if="widget.id === props.designer.selectedId" class="widget-drag-handler">
        <el-icon>
          <Rank />
        </el-icon>
        {{ widget.label }}
      </div>

      <!--拖拽的元素-->
      <ComponentRender
        :designer
        :global-config="props.globalConfig"
        :widget="widget"
        :parent-widget="props.parentWidget"
      />

      <!--拖拽的操作面板-->
      <div v-if="widget.id === props.designer.selectedId" class="widget-drag-action">
        <el-tooltip content="选中父组件" placement="bottom">
          <el-icon :size="18" @click.stop="handleSelectedParentWidget()">
            <Back />
          </el-icon>
        </el-tooltip>
        <el-tooltip content="向上移动" placement="bottom">
          <el-icon :size="16" @click.stop="handleMoveUpWidget(widgetIndex)">
            <Top />
          </el-icon>
        </el-tooltip>
        <el-tooltip content="向下移动" placement="bottom">
          <el-icon :size="16" @click.stop="handleMoveDownWidget(widgetIndex)">
            <Bottom />
          </el-icon>
        </el-tooltip>
        <el-tooltip content="复制" placement="bottom">
          <el-icon :size="16" @click.stop="handleCopyWidget(widgetIndex)">
            <CopyDocument />
          </el-icon>
        </el-tooltip>
        <el-tooltip content="删除" placement="bottom">
          <el-icon :size="16" @click.stop="handleRemoveWidget(widgetIndex)">
            <Delete />
          </el-icon>
        </el-tooltip>
      </div>
    </div>
  </VueDraggable>
</template>
<script setup>
import { useDesignerStore } from "@/store";
import { VueDraggable } from "vue-draggable-plus";
import ComponentRender from "./component-render.vue";

defineOptions({
  name: "CanvasDrag",
});

// props
const props = defineProps({
  // 设计器对象
  designer: { type: Object, default: null },
  // 设计器全局配置
  globalConfig: { type: Object, default: null },
  // 设计元素列表
  widgets: { type: Array, default: () => [] },
  // 父级设计元素
  parentWidget: { type: Object, default: null },
});

// 获取到设计器的store
const designerStore = useDesignerStore();

// 拖拽的操作
/**
 * 拖拽增加
 * @param {Event} event 返回的事件对象
 */
const onAdd = (event) => {
  const { newIndex } = event;
  let widget = props.widgets[newIndex];
  props.designer.setSelected(widget);
  // 缓存设计器的选中信息
  designerStore.setSelectedId(widget.id);
  designerStore.setSelectedWidget(widget);
};
/**
 * 拖拽更新
 * @param {Event} event 返回的事件对象
 */
const onUpdate = async (event) => {
  const { newIndex, oldIndex } = event;
  const currRow = props.widgets.splice(oldIndex, 1)[0];
  props.widgets.splice(newIndex, 0, currRow);
};

// 当前组件的操作
/**
 * 选中当前组件
 * @param {Object} widget 当前元素
 */
const handleSelectedWidget = (widget) => {
  props.designer.setSelected(widget);
  // 缓存设计器的选中信息
  designerStore.setSelectedId(widget.id);
  designerStore.setSelectedWidget(widget);
};
/**
 * 选中父组件
 */
const handleSelectedParentWidget = () => {
  if (props.parentWidget && props.parentWidget.type) {
    props.designer.selectedParentWidget(props.parentWidget);
    // 缓存设计器的选中信息
    designerStore.setSelectedId(props.parentWidget.id);
    designerStore.setSelectedWidget(props.parentWidget);
  } else {
    console.warn("已经没有父级元素了");
  }
};
/**
 * 向上移动
 * @param {Number} widgetIndex 当前元素所在的下标
 */
const handleMoveUpWidget = (widgetIndex) => {
  props.designer.moveUpWidget(props.widgets, widgetIndex);
};
/**
 * 向下移动
 * @param {Number} widgetIndex 当前元素所在的下标
 */
const handleMoveDownWidget = (widgetIndex) => {
  props.designer.moveDownWidget(props.widgets, widgetIndex);
};
/**
 * 复制
 * @param {Number} widgetIndex 当前元素所在的下标
 */
const handleCopyWidget = (widgetIndex) => {
  props.designer.copyWidget(props.widgets, widgetIndex);
};
/**
 * 删除
 * @param {Number} widgetIndex 当前元素所在的下标
 */
const handleRemoveWidget = (widgetIndex) => {
  props.designer.removeWidget(props.widgets, widgetIndex);
};
</script>
<style scoped lang="scss"></style>
