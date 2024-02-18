<template>
  <div>
    <el-input placeholder="ddd" />
  </div>
</template>
<script setup>
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
</script>
<style lang="scss" scoped></style>
