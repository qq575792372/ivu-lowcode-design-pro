<template>
  <span @click="handleClick">{{ props.value }}</span>
  <el-button @click="changeLargeSize">加大</el-button>
  <el-button @click="changeSmallSize">减小</el-button>
</template>
<script setup>
import { ref } from "vue";

defineOptions({
  name: "TextWidget",
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
  emits("custom-click", props.className);
  changeLargeSize();
};

// 绑定的动作
const fontSize = ref(14);
const changeLargeSize = () => {
  fontSize.value = fontSize.value + 2;
};
const changeSmallSize = () => {
  fontSize.value = fontSize.value - 2;
};

// 导出动作
defineExpose({
  changeLargeSize,
  changeSmallSize,
});
</script>
<style lang="scss" scoped>
span {
  font-size: calc(v-bind(fontSize) * 1px);
}
</style>
