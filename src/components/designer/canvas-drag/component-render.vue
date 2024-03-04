<template>
  <!--拖拽渲染的组件（只传递到组件当前的widget、父级的widget、全局配置、绑定的属性、绑定的事件）-->
  <component
    :is="props.widget.type + '-widget'"
    :ref="props.widget.props.name + '_ref'"
    :widget="props.widget"
    :parent-widget="props.parentWidget"
    :global-config="props.globalConfig"
    v-bind="widgetProps"
    v-on="widgetEvents"
  >
    <!--递归嵌套的拖拽组件-->
    <CanvasDrag :designer :widgets="props.widget.widgets" :parent-widget="props.widget" />
  </component>
</template>
<script setup>
import { computed } from "vue";
import CanvasDrag from "@/components/designer/canvas-drag/index.vue";

defineOptions({ name: "ComponentRender" });

const props = defineProps({
  // 设计器对象
  designer: { type: Object, default: null },
  // 设计器全局配置
  globalConfig: { type: Object, default: null },
  // 当前组件
  widget: { type: Object, default: null },
  // 当前组件的父级
  parentWidget: { type: Object, default: null },
});

// 绑定组件属性
const widgetProps = computed(() => {
  return props.widget.props || {};
});

// 绑定组件事件
const widgetEvents = computed(() => {
  let events = {};
  for (let event of props.widget.events || []) {
    props.designer.getWidgetRef(props.widget.type);
    events[event.name] = new Function(event.args, event.code);
  }
  return events;
});
</script>

<style scoped lang="scss"></style>
