<template>
  <el-dropdown-item icon="Download" @click="handleClick">导出JSON</el-dropdown-item>
  <el-dialog
    v-if="dialog.visible"
    v-model="dialog.visible"
    title="导出JSON"
    append-to-body
    draggable
    width="640px"
    :close-on-click-modal="false"
  >
    <div>
      <CodeEditor v-model="dialog.jsonData" lang="json" readonly />
    </div>
    <template #footer>
      <div class="text-align-center">
        <el-button type="primary" @click="handleCopy">复制JSON</el-button>
        <el-button @click="dialog.visible = false">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { computed, reactive, ref, watch } from "vue";
import CodeEditor from "@/components/code-editor/index.vue";
import { ElMessage } from "element-plus";

// props
const props = defineProps({
  designer: { type: Object, default: () => ({}) },
});

// 声明弹框
const dialog = ref({
  visible: false,
  jsonData: "",
});

/**
 * 点击
 */
const handleClick = () => {
  dialog.value.visible = true;
  dialog.value.jsonData = JSON.stringify(
    {
      widgets: props.designer.widgets,
      widgetConfig: props.designer.widgetConfig,
    },
    null,
    " ",
  );
};

/**
 * 复制
 * @param event
 */
const handleCopy = (event) => {
  navigator.clipboard.writeText(dialog.value.jsonData).then(() => {
    ElMessage({
      message: "复制成功",
      type: "success",
    });
  });
};
</script>
<style lang="scss" scoped></style>
