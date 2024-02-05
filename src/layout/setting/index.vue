<template>
  <div class="setting-container">
    <el-tabs v-model="settingActiveName" class="custom-tabs">
      <el-tab-pane v-if="widget" label="组件配置" name="props">
        <Props :designer :widget />
      </el-tab-pane>
      <el-tab-pane label="数据接口" name="data-source">
        <DataSource :designer :widget />
      </el-tab-pane>
      <el-tab-pane label="全局配置" name="global">
        <Global :designer :widget />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import Props from "@/components/designer/props.vue";
import DataSource from "@/components/designer/data-source.vue";
import Global from "@/components/designer/global.vue";

// props
const props = defineProps({
  designer: { type: Object, default: () => ({}) },
});

let settingActiveName = ref("");

const widget = computed(() => {
  settingActiveName.value = props.designer.selectedWidget ? "props" : "data-source";
  return props.designer.selectedWidget;
});
</script>
<style lang="scss" scoped>
.setting-container {
  height: 100%;
  width: 360px;
  padding: var(--cmp-large-padding);
}
</style>
