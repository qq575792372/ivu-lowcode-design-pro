<template>
  <div class="default-value-editor-wrapper">
    <el-form-item :label="item.label">
      <el-input v-model="modelValue" :placeholder="item.placeholder" />
    </el-form-item>
  </div>
</template>
<script setup>
// props
const props = defineProps({
  designer: { type: Object, default: () => ({}) },
  widget: { type: Object, default: () => ({}) },
  item: { type: Object, default: () => ({}) },
});

// 属性双向绑定的值
const modelValue = defineModel({ type: [String, Number], default: null });
</script>
<style lang="scss" scoped>
.name-editor-wrapper {
  :deep(.el-form-item__label) {
    align-items: center;
  }
}
</style>
