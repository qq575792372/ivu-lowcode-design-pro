<template>
  <div v-for="(subWidget, subWidgetIndex) in props.parentWidgets" :key="subWidgetIndex" class="widget-wrapper">
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
  </div>
</template>
<script setup>
defineOptions({
  name: "ComponentRender",
});

// props
const props = defineProps({
  // 设计器对象，在渲染模式下和打包后都会为null，只在设计时起作用
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
</script>
<style lang="scss" scoped></style>
