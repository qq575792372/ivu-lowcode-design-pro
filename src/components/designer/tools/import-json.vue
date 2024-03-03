<template>
  <el-dropdown-item icon="Upload" @click="handleClick">导入JSON</el-dropdown-item>
  <el-dialog
    v-if="dialog.visible"
    v-model="dialog.visible"
    title="导入JSON"
    append-to-body
    draggable
    width="860px"
    :close-on-click-modal="false"
  >
    <el-alert
      title="导入的JSON数据需要符合以下格式，才可以正确导入。"
      type="warning"
      show-icon
      class="margin-bottom-8"
      :closable="false"
    />
    <CodeEditor v-model="dialog.jsonData" :height="400" lang="json" />
    <template #footer>
      <div class="text-align-center">
        <el-button type="primary" @click="handleImport">导入</el-button>
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
  dialog.value.jsonData = JSON.stringify(props.designer.defaultWidgetTemplate, null, "  ");
};

/**
 * 导入
 */
const handleImport = () => {
  try {
    props.designer.loadFromJson(JSON.parse(dialog.value.jsonData));
    ElMessage.success("导入成功");
    dialog.value.visible = false;
    dialog.value.jsonData = "";
  } catch (e) {
    ElMessage.error("导入失败");
    console.error(e);
  }
};
</script>
<style lang="scss" scoped></style>
