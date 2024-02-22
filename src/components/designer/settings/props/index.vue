<template>
  <div class="props-container">
    <el-form-item label="ID" label-width="80">
      {{ props.widget.id }}
    </el-form-item>
    <el-collapse-item title="基本属性" name="base">
      <template v-if="baseProps.length">
        <PropsBinder v-for="(item, index) in baseProps" :key="index" :item="item" :designer :widget />
      </template>
      <template v-else>
        <div class="no-props-binder">暂无属性</div>
      </template>
    </el-collapse-item>
    <el-collapse-item title="高级属性" name="advanced">
      <template v-if="advancedProps.length">
        <PropsBinder v-for="(item, index) in advancedProps" :key="index" :item="item" :designer :widget />
      </template>
      <template v-else>
        <div class="no-props-binder">暂无属性</div>
      </template>
    </el-collapse-item>
    <el-collapse-item title="自定义属性" name="custom">
      <template v-if="customProps.length">
        <PropsBinder v-for="(item, index) in customProps" :key="index" :item="item" :designer :widget />
      </template>
      <template v-else>
        <div class="no-props-binder">暂无属性</div>
      </template>
    </el-collapse-item>
  </div>
</template>
<script setup>
import { computed, reactive, ref, watch } from "vue";
import PropsBinder from "./props-binder.vue";
import useGlobalProperties from "@/hooks/globalProperties";

defineOptions({ name: "Props" });

// props
const props = defineProps({
  designer: { type: Object, default: () => ({}) },
  widget: { type: Object, default: () => ({}) },
});

// 获得全局中所有定义的属性配置集合
const { $propConfigs } = useGlobalProperties();
/* 获得当前组件的属性配置集合 */
// 当前组件元素的属性配置
const currentWidgetPropsConfig = ref([]);
// 监听组件的改变，将当前组件的配置列举出来
watch(
  () => props.widget,
  (val) => {
    currentWidgetPropsConfig.value = [];
    for (let key in props.widget.props) {
      $propConfigs[key] && currentWidgetPropsConfig.value.push($propConfigs[key]);
    }
  },
  { deep: true, immediate: true },
);

/* 以下将当前组件的元素配置分类 */
// 基本属性
const baseProps = computed(() => {
  return currentWidgetPropsConfig.value.filter((v) => v.group === "base");
});
// 高级属性
const advancedProps = computed(() => {
  return currentWidgetPropsConfig.value.filter((v) => v.group === "advanced");
});
// 自定义属性
const customProps = computed(() => {
  return currentWidgetPropsConfig.value.filter((v) => v.group === "custom");
});
</script>
<style lang="scss" scoped>
.props-container {
  .no-props-binder {
    display: block;
    width: 100%;
    text-align: center;
    font-size: var(--font-size-12);
    padding-bottom: var(--cmp-padding);
    color: var(--text-desc-color);
  }
}
</style>
