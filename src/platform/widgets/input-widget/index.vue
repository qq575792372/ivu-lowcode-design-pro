<template>
  <el-input v-model="modelValue" placeholder="ddd" />
</template>
<script setup>
import { ref } from "vue";

defineOptions({
  name: "InputWidget",
});
// props
const props = defineProps({
  // 当前组件和全局配置
  widget: { type: Object, default: null },
  globalConfig: { type: Object, default: null },
  // 组件属性
  value: { type: String, default: "" },
  className: { type: String, default: "" },
});

const modelValue = ref(null);
</script>
<style lang="scss" scoped></style>
