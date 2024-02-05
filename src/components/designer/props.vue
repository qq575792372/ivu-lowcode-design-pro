<template>
  <div class="props-wrapper">
    <el-form size="small" :label-width="80" label-position="left" class="custom-form">
      <el-form-item label="ID">
        {{ props.widget.id }}
      </el-form-item>
      <el-collapse v-model="activeName">
        <el-collapse-item title="基本属性" name="base">
          <template v-for="(item, index) in baseProps" :key="index">
            <component :is="item.componentName" :item="item" :designer :widget />
          </template>
        </el-collapse-item>
        <el-collapse-item title="高级属性" name="advanced">
          <template v-for="(item, index) in advancedProps" :key="index">
            <component :is="item.componentName" :item="item" :designer :widget />
          </template>
        </el-collapse-item>
        <el-collapse-item title="自定义属性" name="custom">
          <template v-for="(item, index) in customProps" :key="index">
            <component :is="item.componentName" :item="item" :designer :widget />
          </template>
        </el-collapse-item>
        <el-collapse-item title="事件" name="events">d</el-collapse-item>
        <el-collapse-item title="动作" namne="action">d</el-collapse-item>
        <el-collapse-item title="生命周期" name="lifecycle">d</el-collapse-item>
      </el-collapse>
    </el-form>
  </div>
</template>
<script setup>
import { computed, reactive, ref, watch } from "vue";
// props
const props = defineProps({
  designer: { type: Object, default: () => ({}) },
  widget: { type: Object, default: () => ({}) },
});

const activeName = ref("base");

// 获得所有属性配置
let propConfigs = ref([]);
watch(
  () => props.widget,
  (val) => {
    propConfigs.value = [];
    for (let key in props.widget.props) {
      props.designer.vueInstance.$propConfigs[key] &&
        propConfigs.value.push(props.designer.vueInstance.$propConfigs[key]);
    }
  },
  { deep: true, immediate: true },
);

// 基本属性
const baseProps = computed(() => {
  return propConfigs.value.filter((v) => v.group === "base");
});
// 高级属性
const advancedProps = computed(() => {
  return propConfigs.value.filter((v) => v.group === "advanced");
});
// 自定义属性
const customProps = computed(() => {
  return propConfigs.value.filter((v) => v.group === "custom");
});
</script>
<style lang="scss" scoped>
:deep(.custom-form) {
  .el-form-item {
    margin-bottom: var(--cmp-margin);

    .el-form-item__label {
      height: auto;
      line-height: 1.2;
    }
  }
}
</style>
