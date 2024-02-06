<template>
  <div class="tools-container">
    <Undo :designer />
    <Redo :designer />
    <LayerTree :designer />
    <Clear :designer />
    <Preview :designer />
    <el-dropdown class="more-button">
      <el-button>
        <el-icon>
          <MoreFilled />
        </el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <ImportJson :designer />
          <ExportJson :designer />
          <ExportSFC :designer />
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup>
import Undo from "./undo.vue";
import Redo from "./redo.vue";
import LayerTree from "./layer-tree.vue";
import Clear from "./clear.vue";
import Preview from "./preview.vue";
import ImportJson from "./import-json.vue";
import ExportJson from "./export-json.vue";
import ExportSFC from "./export-SFC.vue";

const props = defineProps({
  designer: { type: Object, default: () => ({}) },
});
</script>
<style lang="scss" scoped>
.more-button {
  margin-left: 12px;
}
</style>
