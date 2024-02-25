<template>
  <div>
    <el-input v-model="value" placeholder="ddd" />
  </div>
</template>
<script setup>
import useProps from "@/hooks/props";

defineOptions({
  name: "InputWidget",
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
// 获得组件属性的hooks
const { getPropValue } = useProps({ props });
// /* 获取组件属性的值 */
let value = getPropValue("value");
</script>
<style lang="scss" scoped></style>
