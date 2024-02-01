<template>
  <div class="sidebar-container">
    <Container behaviour="copy" group-name="1" @drop="onDrop">
      <Draggable v-for="item in widgetList" :key="item.type">
        <el-tag style="margin: 4px; cursor: default; user-select: none">{{ item.label }}</el-tag>
      </Draggable>
    </Container>
  </div>
</template>
<script setup>
import { Container, Draggable } from "vue3-smooth-dnd";

const widgetList = [
  { type: "input", label: "输入框", componentName: "input-widget" },
  {
    type: "select",
    label: "下拉框",
    componentName: "select-widget",
  },
];
const onDrop = (res) => {
  console.log(11, res);
};
</script>
<style lang="scss" scoped>
.sidebar-container {
  height: 100%;
  padding: var(--cmp-large-padding);
}
</style>
