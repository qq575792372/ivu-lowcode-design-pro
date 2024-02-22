<template>
  <div>
    className={{ widget.props.className }}
    <el-button @click="handleClick">{{ widget.props.defaultValue }}</el-button>
  </div>
</template>
<script setup>
import useEvents from "@/hooks/events";

defineOptions({
  name: "ButtonWidget",
});

// props
const props = defineProps({
  designer: { type: Object, default: () => null },
  widget: { type: Object, default: () => null },
  parentWidget: { type: Object, default: () => null },
  parentWidgets: { type: Array, default: () => [] },
  indexOfParentWidgets: { type: Number, default: null },
});

// 获取组件事件的hooks
const { executeEvent, executeEventAction } = useEvents({ props });

/**
 * 点击事件
 */
const handleClick = () => {
  // 执行元素的事件
  executeEvent(props.widget, "onClick");
  // 执行元素事件绑定的动作
  executeEventAction(props.widget, "onClick");
};
</script>
<style lang="scss" scoped></style>
