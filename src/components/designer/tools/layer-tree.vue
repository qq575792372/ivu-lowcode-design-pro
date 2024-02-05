<template>
  <el-button icon="Memo" type="primary" text class="margin-right-12" @click="handleClick"></el-button>
  <el-dialog
    v-model="dialog.visible"
    draggable
    :close-on-click-modal="false"
    title="组件树"
    width="460px"
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
    <template #footer>
      <div class="text-align-center">
        <el-button @click="dialog.visible = false">取消</el-button>
      </div>
    </template>
  </el-dialog>
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
  console.log(11, node);
  props.designer.setSelected(node);
};
</script>
<style lang="scss" scoped></style>
