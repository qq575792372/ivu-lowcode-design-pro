<template>
  <el-button icon="delete" @click="handleClear">清空</el-button>
</template>
<script setup>
const props = defineProps({
  designer: { type: Object, default: () => ({}) },
});
const handleClear = () => {
  props.designer.clearDesigner();
};
</script>
<style lang="scss" scoped></style>
