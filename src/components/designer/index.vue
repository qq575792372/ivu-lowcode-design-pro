<template>
  <div class="designer-container">
    {{ props.designer.widgets }}
    <Container
      class="custom-dnd-container"
      orientation="horizontal"
      group-name="widgets"
      :get-child-payload="(index) => getChildPayload(index, props.designer.widgets)"
      @drop="onDrop($event)"
    >
      <Draggable v-for="(widget, widgetIndex) in props.designer.widgets" :key="widget.name">
        {{ widget.name }}
        <component :is="widget.componentName" />
      </Draggable>
    </Container>
  </div>
</template>
<script setup>
import { Container, Draggable } from "vue3-smooth-dnd";

const props = defineProps({ designer: { type: Object, default: () => ({}) } });

/**
 * 拖拽的组件数据
 * @param index 拖拽组件的下标
 * @param widgets 当前拖拽容器中的组件列表
 * @returns {Object} 返回当前拖拽的组件信息
 */
const getChildPayload = (index, widgets) => {
  console.log("getChildPayload", index, widgets);
  let widget = widgets[index];
  return widget;
};

/**
 * 拖拽结束
 * @param event
 */
const onDrop = async (event) => {
  const widget = event.payload;
  console.log("designer设计器", event);
  console.log("widget", widget);
  widget.componentName = widget.name + "-widget";
  props.designer.widgets.push(widget);

  console.log(322, props.designer.getWidget(widget.name));
};
</script>
<style lang="scss" scoped>
.designer-container {
  height: 100%;
  padding: var(--cmp-large-padding);

  .custom-dnd-container {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
}
</style>
