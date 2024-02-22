<template>
  <div class="props-container">
    <el-form-item label="ID" label-width="80">
      {{ props.widget.id }}
    </el-form-item>
    <el-collapse-item title="基本属性" name="base">
      <template v-if="baseProps.length">
        <div v-for="(item, index) in baseProps" :key="index" class="props-wrapper">
          <component
            :is="item.componentName"
            v-model="currentWidgetProps[item.name]"
            :item="item"
            :designer
            :widget
            class="props-editor"
          />
          <el-button class="props-fx" type="text" text plain @click="handleClick(event, eventIndex)">ƒx</el-button>
        </div>
      </template>
      <template v-else>
        <div class="props-wrapper no-props">暂无属性</div>
      </template>
    </el-collapse-item>
    <el-collapse-item title="高级属性" name="advanced">
      <template v-if="advancedProps.length">
        <div v-for="(item, index) in advancedProps" :key="index" class="props-wrapper">
          <component :is="item.componentName" :item="item" :designer :widget class="props-editor" />
          <el-button class="props-fx" type="text" text plain @click="handleClick(event, eventIndex)">ƒx</el-button>
        </div>
      </template>
      <template v-else>
        <div class="props-wrapper no-props">暂无属性</div>
      </template>
    </el-collapse-item>
    <el-collapse-item title="自定义属性" name="custom">
      <template v-if="customProps.length">
        <div v-for="(item, index) in customProps" :key="index" class="props-wrapper">
          <component :is="item.componentName" :item="item" :designer :widget class="props-editor" />
          <el-button class="props-fx" type="text" text plain @click="handleClick(event, eventIndex)">ƒx</el-button>
        </div>
      </template>
      <template v-else>
        <div class="props-wrapper no-props">暂无属性</div>
      </template>
    </el-collapse-item>
  </div>
</template>
<script setup>
import { computed, reactive, ref, watch } from "vue";

defineOptions({ name: "Props" });

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

// 当前元素的属性
const currentWidgetProps = computed(() => {
  return props.widget.props;
});
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
.props-container {
  .props-wrapper {
    display: flex;

    &.no-props {
      display: block;
      width: 100%;
      text-align: center;
      font-size: var(--font-size-12);
      padding-bottom: var(--cmp-padding);
      color: var(--text-desc-color);
    }

    .props-editor {
      flex: 1;
      margin-right: var(--cmp-margin);
    }

    .props-fx {
      margin-left: auto;
    }
  }
}
</style>
