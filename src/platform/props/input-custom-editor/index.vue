<template>
  <div class="input-custom-editor-wrapper">
    <el-form-item :label="item.label">
      <el-input v-model="propModel[item.name]" :placeholder="item.placeholder" />
    </el-form-item>
  </div>
</template>
<script setup>
import { computed } from "vue";
// props
const props = defineProps({
  designer: { type: Object, default: () => ({}) },
  widget: { type: Object, default: () => ({}) },
  item: { type: Object, default: () => ({}) },
});

// 属性数据模型
const propModel = computed(() => {
  return props.widget.props;
});
</script>
<style lang="scss" scoped>
.input-custom-editor-wrapper {
}
</style>
