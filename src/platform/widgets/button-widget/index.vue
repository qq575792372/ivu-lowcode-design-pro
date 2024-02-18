<template>
  <div>
    <el-button @click="handleClick">{{ widget.props.defaultValue }}</el-button>
  </div>
</template>
<script setup>
import { getEvent, getEventFn } from "@/utils/events";

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

const handleClick = () => {
  let eventFn = getEventFn(props.widget, "onClick");
  eventFn(props.widget);
};
</script>
<style lang="scss" scoped></style>
