<template>
  <el-tooltip content="组件层次结构">
    <el-button type="primary" text class="margin-right-12" @click="handleClick">
      <svg-icon name="layer-tree" />
    </el-button>
  </el-tooltip>
  <el-drawer
    v-model="dialog.visible"
    title="组件层次结构"
    :size="386"
    class="custom-drawer"
    modal-class="custom-drawer-no-modal"
    direction="rtl"
    append-to-body
  >
    <div>
      <el-tree
        :data="dialog.data"
        draggable
        default-expand-all
        :expand-on-click-node="false"
        node-key="name"
        :props="{
          label: 'label',
          children: 'widgets',
        }"
        @node-click="handleNodeClick"
      />
    </div>
  </el-drawer>
</template>
<script setup>
import { computed, reactive, ref, watch } from "vue";
// props
const props = defineProps({
  designer: { type: Object, default: () => ({}) },
});

// 声明弹框
const dialog = ref({
  visible: false,
  data: [],
});
// 按钮点击
const handleClick = () => {
  dialog.value.visible = true;
  dialog.value.data = props.designer.widgets;
};
// 节点点击
const handleNodeClick = (node) => {
  props.designer.setSelected(node);
};
</script>
<style lang="scss"></style>
