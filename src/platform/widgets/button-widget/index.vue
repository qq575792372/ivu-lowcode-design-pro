<template>
  <div>
    {{ className }}
    <el-button @click="handleClick">{{ className }}</el-button>
  </div>
</template>
<script setup>
import { ref, toRefs, reactive, computed } from "vue";
import useEvents from "@/hooks/events";
import useProps from "@/hooks/props";

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

/* 使用hooks */
// 获取组件事件的hooks
const { executeEvent, executeEventAction } = useEvents({ props });
// 获得组件属性的hooks
const { getPropValue } = useProps({ props });
// /* 获取组件属性的值 */
let className = getPropValue("className");

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
