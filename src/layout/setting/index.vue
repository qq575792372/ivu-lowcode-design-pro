<template>
  <div class="setting-container">
    <el-tabs v-model="settingActiveName" class="custom-tabs">
      <el-tab-pane v-if="widget" label="组件配置" name="props">
        <el-scrollbar>
          <el-form :label-width="100" label-position="left" class="custom-form" size="small">
            <el-collapse v-model="cmpConfigActiveNames" class="custom-collapse">
              <Props :designer :widget />
              <Events :designer :widget />
              <Actions :designer :widget />
            </el-collapse>
          </el-form>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="数据源" name="data-sources">
        <el-scrollbar>
          <el-form :label-width="100" label-position="left" class="custom-form" size="small">
            <DataSources :designer :widget />
          </el-form>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="全局配置" name="global">
        <el-scrollbar>
          <el-form :label-width="100" label-position="left" class="custom-form" size="small">
            <el-collapse v-model="globalActiveNames" class="custom-collapse">
              <Global :designer :widget />
            </el-collapse>
          </el-form>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup>
import { ref, computed, watch } from "vue";
import Props from "@/components/designer/settings/props/index.vue";
import Events from "@/components/designer/settings/events/index.vue";
import Actions from "@/components/designer/settings/actions/index.vue";
import DataSources from "@/components/designer/settings/data-sources/index.vue";
import Global from "@/components/designer/settings/global/index.vue";

defineOptions({ name: "Setting" });
// props
const props = defineProps({
  designer: { type: Object, default: () => ({}) },
});

const settingActiveName = ref("");

// 组件配置展开的名称
const cmpConfigActiveNames = ref(["base", "advanced", "custom", "events", "actions"]);
// 全局配置展开的名称
const globalActiveNames = ref(["globalVars", "globalFns", "globalEvents", "globalActions"]);

// 监听设计元素改变的计算属性
const widget = computed(() => {
  settingActiveName.value = props.designer.selectedWidget ? "props" : "data-sources";
  return props.designer.selectedWidget;
});

// 监听设计器的数据源和全局配置的改变，并存入到缓存
watch(
  props.designer.widgetConfig,
  (val) => {
    // 设置设计器中组件和全局配置的缓存
    props.designer.setDesignerCache();
  },
  { deep: true },
);
</script>
<style lang="scss" scoped>
.setting-container {
  height: 100%;
  width: 320px;
  overflow: hidden;
  padding: var(--cmp-large-padding) var(--cmp-large-padding) var(--cmp-large-padding) 0;

  // 属性配置中重新定义tab样式
  :deep(.custom-tabs) {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .el-tabs__content {
      flex: 1;
      overflow: hidden;
      height: 100%;

      .el-tab-pane {
        overflow: hidden;
        height: 100%;
      }
    }
  }

  // 属性配置中重新定义折叠框样式
  :deep(.custom-collapse) {
    .el-collapse-item:last-child {
      margin-bottom: 0;
    }

    .el-collapse-item__content {
      margin-top: var(--cmp-margin);
    }
  }
}

// 重新定义表单样式
:deep(.custom-form) {
  .el-form-item {
    margin-bottom: var(--cmp-margin);

    .el-form-item__label {
      height: auto;
    }
  }
}
</style>
