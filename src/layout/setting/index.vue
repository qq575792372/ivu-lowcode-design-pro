<template>
  <div class="setting-container">
    <el-tabs v-model="settingActiveName" class="custom-tabs">
      <el-tab-pane v-if="widget" label="组件配置" name="props">
        <el-form :label-width="100" label-position="left" class="custom-form" size="small">
          <el-collapse v-model="componentConfigActiveNames" class="custom-collapse">
            <Props :designer :widget />
            <Events :designer :widget />
            <Actions :designer :widget />
          </el-collapse>
        </el-form>
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
import Events from "@/components/designer/events.vue";
import Actions from "@/components/designer/actions.vue";
import DataSource from "@/components/designer/data-source.vue";
import Global from "@/components/designer/global.vue";

defineOptions({ name: "Setting" });
// props
const props = defineProps({
  designer: { type: Object, default: () => ({}) },
});

const settingActiveName = ref("");

// 组件配置展开的名称
const componentConfigActiveNames = ref(["base", "advanced", "custom", "events", "actions"]);

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
