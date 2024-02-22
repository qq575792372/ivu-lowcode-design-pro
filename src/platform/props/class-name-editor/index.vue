<template>
  <div class="class-name-editor-wrapper">
    <el-form-item :label="item.label">
      {{ modelValue }}
      <!--<el-input v-model="propModel[item.name]" :placeholder="item.placeholder" />-->
      <el-input v-model="modelValue" :placeholder="item.placeholder" />
    </el-form-item>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";

defineOptions({ name: "ClassNameEditor" });

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

// 属性绑定的值
let modelValue = defineModel();
</script>
<style lang="scss" scoped>
.class-name-editor-wrapper {
}
</style>
