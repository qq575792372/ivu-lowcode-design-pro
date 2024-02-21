<template>
  <!--此处接收父组件的widgets，可以多层递归嵌套-->
  <VueDraggable
    v-model="props.parentWidgets"
    class="custom-vue-draggable"
    :class="{ 'no-widget': parentWidgets.length === 0 }"
    :group="{ name: 'designer-group' }"
    :animation="150"
    :empty-insert-threshold="0"
    handle=".widget-drag-handler"
    chosen-class="widget-chosen-class"
    drag-class="widget-drag-class"
    ghost-class="widget-ghost-class"
    @update="onUpdate"
    @add="onAdd($event, props.parentWidgets)"
  >
    <div
      v-for="(subWidget, subWidgetIndex) in props.parentWidgets"
      :key="subWidget.id"
      :class="{ selected: subWidget.id === props.designer.selectedId }"
      class="widget-wrapper"
      @click.stop="handleSelectedWidget(subWidget)"
    >
      <!--拖拽的手柄-->
      <div v-if="subWidget.id === props.designer.selectedId" class="widget-drag-handler">
        <el-icon>
          <Rank />
        </el-icon>
        {{ subWidget.label }}
      </div>

      <!--拖拽的元素-->
      <component
        :is="subWidget.type + '-widget'"
        :designer
        :widget="subWidget"
        :parent-widget="props.parentWidget"
        :parent-widgets="props.parentWidgets"
        :index-of-parent-widgets="subWidgetIndex"
      >
        <!--递归嵌套组件渲染-->
        <ComponentRender
          :designer
          :widget="props.widget"
          :parent-widget="subWidget"
          :parent-widgets="subWidget.widgets"
          :index-of-parent-widgets="subWidgetIndex"
        />
      </component>

      <!--拖拽的操作面板-->
      <div v-if="subWidget.id === props.designer.selectedId" class="widget-drag-action">
        <el-tooltip content="选中父组件" placement="bottom">
          <el-icon :size="18" @click.stop="handleSelectedParentWidget()">
            <Back />
          </el-icon>
        </el-tooltip>
        <el-tooltip content="向上移动" placement="bottom">
          <el-icon :size="16" @click.stop="handleMoveUpWidget(subWidgetIndex)">
            <Top />
          </el-icon>
        </el-tooltip>
        <el-tooltip content="向下移动" placement="bottom">
          <el-icon :size="16" @click.stop="handleMoveDownWidget(subWidgetIndex)">
            <Bottom />
          </el-icon>
        </el-tooltip>
        <el-tooltip content="复制" placement="bottom">
          <el-icon :size="16" @click.stop="handleCopyWidget(subWidgetIndex)">
            <CopyDocument />
          </el-icon>
        </el-tooltip>
        <el-tooltip content="删除" placement="bottom">
          <el-icon :size="16" @click.stop="handleRemoveWidget(subWidgetIndex)">
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

defineOptions({
  name: "ComponentRender",
});

// props
const props = defineProps({
  // 设计器对象
  designer: { type: Object, default: () => null },
  // 当前设计器元素
  widget: { type: Object, default: () => null },
  // 父级设计器元素
  parentWidget: { type: Object, default: () => null },
  // 父级设计元素的widgets列表
  parentWidgets: { type: Array, default: () => [] },
  // 当前设计器元素在父级widgets列表中的下标
  indexOfParentWidgets: { type: Number, default: null },
});

// 获取到设计器的store
const designerStore = useDesignerStore();

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

// 当前组件的操作
/**
 * 选中当前组件
 */
const handleSelectedWidget = (subWidget) => {
  props.designer.setSelected(subWidget);
  // 缓存设计器的选中信息
  designerStore.setSelectedId(subWidget.id);
  designerStore.setSelectedWidget(subWidget);
};
/**
 * 选中父组件
 */
const handleSelectedParentWidget = () => {
  if (props.parentWidget && props.parentWidget.type) {
    props.designer.selectedParentWidget(props.parentWidget);
  } else {
    console.warn("can’t find parent!");
  }
};
/**
 * 向上移动
 */
const handleMoveUpWidget = (subWidgetIndex) => {
  props.designer.moveUpWidget(props.parentWidgets, subWidgetIndex);
};
/**
 * 向下移动
 */
const handleMoveDownWidget = (subWidgetIndex) => {
  props.designer.moveDownWidget(props.parentWidgets, subWidgetIndex);
};
/**
 * 复制
 */
const handleCopyWidget = (subWidgetIndex) => {
  props.designer.copyWidget(props.parentWidgets, subWidgetIndex);
};
/**
 * 删除
 */
const handleRemoveWidget = (subWidgetIndex) => {
  props.designer.removeWidget(props.parentWidgets, subWidgetIndex);
};
</script>
<style scoped lang="scss"></style>
