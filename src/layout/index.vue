<template>
  <el-container class="app-layout">
    <el-header class="layout-header">
      <Header :designer />
    </el-header>
    <el-container class="layout-container">
      <el-aside class="layout-sidebar">
        <FoldedPanel>
          <Sidebar :designer />
        </FoldedPanel>
      </el-aside>
      <el-main class="layout-main">
        <Designer :designer />
      </el-main>
      <el-aside class="layout-setting">
        <FoldedPanel direction="right" @change-folded="handleChangeSettingFolded">
          <Setting :designer />
        </FoldedPanel>
      </el-aside>
    </el-container>
  </el-container>
</template>
<script setup>
import { ref } from "vue";
import Header from "@/layout/header/index.vue";
import Sidebar from "@/layout/sidebar/index.vue";
import Designer from "@/components/designer/index.vue";
import Setting from "@/layout/setting/index.vue";
import FoldedPanel from "@/components/folded-panel/index.vue";

const props = defineProps({
  designer: {
    type: Object,
    default: () => ({}),
  },
});

// Sidebar折叠
const sidebarFolded = ref(false);
const handleChangeSidebarFolded = () => {
  console.log(11);
  sidebarFolded.value = !sidebarFolded.value;
};
</script>
<style lang="scss" scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  min-height: 100%;

  .layout-header {
    height: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.09);
    z-index: 1;
    background: var(--bg-white-color);
  }

  .layout-container {
    height: 100%;
    overflow: hidden;

    .layout-sidebar {
      width: auto;
      background: var(--bg-white-color);
      border-radius: 0 var(--cmp-border-radius) var(--cmp-border-radius) 0;
      padding: 0;

      &.is-folded {
      }
    }

    .layout-main {
      margin: var(--cmp-large-padding);
      background: var(--bg-white-color);
      border-radius: var(--cmp-border-radius);
      padding: 0;
    }

    .layout-setting {
      width: auto;
      margin: var(--cmp-large-padding) var(--cmp-large-padding) var(--cmp-large-padding) 0;
      background: var(--bg-white-color);
      border-radius: var(--cmp-border-radius);
      padding: 0;
    }
  }
}
</style>
