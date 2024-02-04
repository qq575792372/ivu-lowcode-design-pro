<template>
  <div class="name-editor-wrapper">
    <el-form-item :label="item.label">
      <template #label>
        {{ item.label }}
        <el-tooltip content="组件名称，可以允许修改" placement="bottom">
          <el-icon>
            <WarningFilled />
          </el-icon>
        </el-tooltip>
      </template>
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
.name-editor-wrapper {
  :deep(.el-form-item__label) {
    align-items: center;
  }
}
</style>
