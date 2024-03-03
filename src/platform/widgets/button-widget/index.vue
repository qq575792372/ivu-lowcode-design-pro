<template>
  {{ widget.events }}
  <el-button @click="handleClick">{{ props.className }}</el-button>
</template>
<script setup>
defineOptions({
  name: "ButtonWidget",
});

const emits = defineEmits(["custom-click"]);

// props
const props = defineProps({
  // 当前组件和全局配置
  widget: { type: Object, default: null },
  globalConfig: { type: Object, default: null },
  // 组件属性
  value: { type: String, default: "" },
  className: { type: String, default: "" },
});

const handleClick = () => {
  props.widget.props.className = "ddd";
  emits("custom-click", props.widget);
};
</script>
<style lang="scss" scoped></style>
