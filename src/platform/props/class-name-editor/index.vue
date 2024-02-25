<template>
  <div class="class-name-editor-wrapper">
    <el-form-item :label="item.label">
      {{ modelValue }}
      <el-input v-model="modelValue" :placeholder="item.placeholder" />
    </el-form-item>
  </div>
</template>
<script setup>
defineOptions({ name: "ClassNameEditor" });

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
.class-name-editor-wrapper {
}
</style>
