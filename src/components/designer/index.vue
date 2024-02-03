<template>
  <div class="designer-container">
    {{ widgets.map((v) => v.id) }}
    <VueDraggable
      v-model="widgets"
      class="custom-vue-draggable"
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
        v-for="(widget, widgetIndex) in widgets"
        :key="widgetIndex"
        :class="{ selected: widget.id === props.designer.selectedId }"
        class="widget-wrapper"
        @click.stop="handleSelected(widget)"
      >
        <div v-if="widget.id === props.designer.selectedId" class="widget-drag-handler">
          <el-icon>
            <Rank />
          </el-icon>
          {{ widget.label }}
        </div>
        <component :is="props.designer.getComponentName(widget)" />
        <div v-if="widget.id === props.designer.selectedId" class="widget-drag-action">
          <el-icon :size="18">
            <Back />
          </el-icon>
          <el-icon :size="16">
            <Top />
          </el-icon>
          <el-icon :size="16">
            <Bottom />
          </el-icon>
          <el-icon :size="16">
            <CopyDocument />
          </el-icon>
          <el-icon :size="16">
            <Delete />
          </el-icon>
        </div>
      </div>
    </VueDraggable>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { VueDraggable } from "vue-draggable-plus";

// props
const props = defineProps({ designer: { type: Object, default: () => ({}) } });

// computed
const widgets = computed(() => {
  return props.designer.widgets;
});

const handleSelected = (widget) => {
  console.log(11, widget);
  props.designer.setSelected(widget);
};
const onAdd = (event) => {
  console.log("onAdd", event);
};
/**
 * 拖拽排序更新
 * @param event
 * @returns {Promise<void>}
 */
const onUpdate = async (event) => {
  console.log("更新", event);
  const { newIndex, oldIndex } = event;
  const currRow = props.designer.widgets.splice(oldIndex, 1)[0];
  props.designer.widgets.splice(newIndex, 0, currRow);
};
</script>
<style lang="scss" scoped>
.designer-container {
  height: 100%;
  padding: var(--cmp-large-padding);

  // 定义设计面板中的拖拽容器
  .custom-vue-draggable {
    width: 100%;
    height: 100%;

    // 设计器元素
    .widget-wrapper {
      margin-bottom: 4px;
      position: relative;

      &:hover {
        outline: dashed 2px var(--primary-color);
      }

      &.selected {
        outline: solid 2px var(--primary-color);
      }

      // 被选中项的样式
      &.widget-chosen-class {
        outline: solid 2px var(--primary-color);
      }

      // 拖拽项样式
      &.widget-drag-class {
        overflow: hidden;
        cursor: move;

        .widget-drag-action {
          display: none;
        }
      }

      // 拖拽停靠位置样式
      &.widget-ghost-class {
        height: 0px;
        overflow: hidden;
        position: relative;

        &::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background: var(--primary-color);
          z-index: 1;
        }
      }

      // 拖拽把柄
      .widget-drag-handler {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        font-size: var(--font-size-12);
        background: var(--primary-color);
        color: var(--text-white-color);
        display: inline-flex;
        align-items: center;
        height: 20px;
        line-height: 20px;
        padding: 0 8px 0 4px;
        opacity: 0.8;
        cursor: move;

        .el-icon {
          margin-right: 2px;
        }
      }

      // 拖拽操作
      .widget-drag-action {
        position: absolute;
        bottom: 0;
        right: 0;
        z-index: 1;
        background: var(--primary-color);
        color: var(--text-white-color);
        display: inline-flex;
        align-items: center;
        height: 20px;
        line-height: 20px;
        padding: 0 8px 0 4px;

        .el-icon {
          cursor: pointer;

          &:not(:last-child) {
            margin-right: 4px;
          }
        }
      }
    }
  }
}
</style>
