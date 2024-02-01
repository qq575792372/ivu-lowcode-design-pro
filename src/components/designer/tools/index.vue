<template>
  <div class="tools-container">
    <Undo />
    <Redo />
    <LayerTree />
    <Clear />
    <Preview />
    <el-dropdown class="more-button">
      <el-button>
        <el-icon class="el-icon--right">
          <MoreFilled />
        </el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <ImportJson />
          <ExportJson />
          <ExportSFC />
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
</script>
<style lang="scss" scoped>
.more-button {
  margin-left: 12px;
}
</style>
