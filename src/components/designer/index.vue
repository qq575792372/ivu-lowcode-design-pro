<template>
  <div class="designer-container">
    <Container class="custom-dnd-container" orientation="horizontal" group-name="widgets" @drop="onDrop">
      <Draggable>
        <el-tag style="margin: 4px; cursor: default; user-select: none">dddddd</el-tag>
      </Draggable>
    </Container>
  </div>
</template>
<script setup>
import { Container, Draggable } from "vue3-smooth-dnd";

const onDrop = (res) => {
  console.log(11, res);
};
</script>
<style lang="scss" scoped>
.designer-container {
  height: 100%;
  padding: var(--cmp-large-padding);

  .custom-dnd-container {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
}
</style>
