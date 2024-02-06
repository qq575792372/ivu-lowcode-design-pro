<template>
  <div class="render">
    <template v-for="(widget, widgetIndex) in widgets" :key="widgetIndex">
      <component
        :is="widget.type + '-widget'"
        :designer
        :widget
        :parent-widgets="widgets"
        :index-of-parent-widgets="widgetIndex"
      >
        <!-- 递归传递插槽！！！ -->
        <template v-for="slot in Object.keys($slots)" #[slot]="scope">
          <slot :name="slot" v-bind="scope" />
        </template>
      </component>
    </template>
  </div>
</template>
<script setup>
import { computed, reactive, ref, watch, useSlots } from "vue";

defineOptions({
  name: "Render",
});

// props
const props = defineProps({
  // 渲染的数据
  data: {
    type: Array,
    default: () => [],
  },
  // 设计器对象，真正打包后为null
  designer: { type: Object, default: () => ({}) },
});

const widgets = ref(props.data.widgets);
const widgetConfig = ref(props.data.widgetConfig);
</script>
<style lang="scss" scoped></style>
