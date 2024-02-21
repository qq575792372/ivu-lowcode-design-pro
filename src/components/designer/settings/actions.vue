<template>
  <div class="actions-container">
    <el-collapse-item title="动作" name="actions">
      <template v-if="props.widget.actions.length">
        <el-form-item
          v-for="(action, actionIndex) in props.widget.actions"
          :key="actionIndex"
          :label="action.label"
          class="actions-wrapper"
        >
          <el-button type="primary" plain icon="Edit" @click="handleEditClick(action, actionIndex)">编辑</el-button>
          <el-button
            type="danger"
            plain
            icon="Delete"
            style="margin-left: auto"
            @click="handleRemove(actionIndex)"
          ></el-button>
        </el-form-item>
        <el-button type="primary" style="width: 100%" plain icon="Plus" @click="handleAddClick">添加动作</el-button>
      </template>
      <template v-else>
        <div class="actions-wrapper no-actions">
          暂无动作，点击
          <el-button icon="Plus" plain type="primary" @click="handleAddClick"></el-button>
          添加动作
        </div>
      </template>
    </el-collapse-item>
  </div>

  <!--弹框-->
  <el-dialog
    v-if="dialog.visible"
    v-model="dialog.visible"
    :title="dialog.title"
    append-to-body
    draggable
    width="960px"
    :close-on-click-modal="false"
  >
    <el-form ref="actionFormRef" :model="dialog.form" :rules="dialog.formRules" label-width="80px" inline size="small">
      <el-form-item label="动作名称" prop="name">
        <el-input v-model="dialog.form.name" :disabled="dialog.type === 'edit'" />
      </el-form-item>
      <el-form-item label="动作标签" prop="label">
        <el-input v-model="dialog.form.label" />
      </el-form-item>
      <el-form-item label="是否启用">
        <el-switch v-model="dialog.form.enable" />
      </el-form-item>
    </el-form>
    <el-alert type="info" :closable="false">
      &nbsp;(widget)&nbsp;=>&nbsp;{&nbsp;//&nbsp;widget&nbsp;触发动作的元素
    </el-alert>
    <CodeEditor v-model="dialog.form.code" />
    <el-alert type="info" :closable="false">}</el-alert>
    <template #footer>
      <div class="text-align-center">
        <el-button type="primary" @click="handleSure">确定</el-button>
        <el-button @click="dialog.visible = false">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { computed, reactive, ref, watch } from "vue";
import { cloneDeep } from "@lime-util/util";
import useActions from "@/hooks/actions";
import { ElMessage, ElMessageBox } from "element-plus";
import CodeEditor from "@/components/code-editor/index.vue";

defineOptions({ name: "Actions" });

// props
const props = defineProps({
  designer: { type: Object, default: () => ({}) },
  widget: { type: Object, default: () => ({}) },
});

// 获取组件动作的hooks
const { allActionList } = useActions({ props });

// 弹框
const dialog = ref({
  visible: false,
  type: "add",
  title: "添加动作",
  actionIndex: null,
  form: {
    name: "",
    label: "",
    enable: true,
    code: "",
  },
  formRules: {
    name: [{ required: true, message: "请输入", trigger: "blur" }],
    label: [{ required: true, message: "请输入", trigger: "blur" }],
  },
});

// 表单
const actionFormRef = ref(null);
/**
 * 添加动作点击
 */
const handleAddClick = (action, actionIndex) => {
  dialog.value.visible = true;
  dialog.value.type = "add";
  dialog.value.title = "添加动作";
  dialog.value.actionIndex = null;
  // 重置之前的表单输入
  dialog.value.form = {
    name: "",
    label: "",
    enable: true,
    code: "",
  };
  actionFormRef.value.resetFields();
};
/**
 * 编辑动作点击
 */
const handleEditClick = (action, actionIndex) => {
  dialog.value.visible = true;
  dialog.value.type = "edit";
  dialog.value.title = "编辑动作";
  dialog.value.actionIndex = actionIndex;
  dialog.value.form = cloneDeep(action);
};
/**
 * 确定动作
 */
const handleSure = () => {
  if (!actionFormRef.value) return;
  actionFormRef.value.validate((valid) => {
    if (valid) {
      // 添加
      if (dialog.value.type === "add") {
        // 校验所有是否已经存在动作名称
        let hasActionName = allActionList.value.some((v, i) => v.name === dialog.value.form.name);
        if (hasActionName) {
          ElMessage({
            type: "error",
            message: "全局或当前组件已经存在该动作名称",
          });
          return;
        }
        props.widget.actions.push(dialog.value.form);
      }
      // 编辑
      if (dialog.value.type === "edit") {
        props.widget.actions[dialog.value.actionIndex] = dialog.value.form;
      }
      // 结果
      dialog.value.visible = false;
      ElMessage({
        type: "success",
        message: "操作成功",
      });
    }
  });
};

/**
 * 删除动作
 */
const handleRemove = (actionIndex) => {
  ElMessageBox.confirm("确定删除吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    props.widget.actions.splice(actionIndex, 1);
    ElMessage({
      type: "success",
      message: "删除成功",
    });
  });
};
</script>
<style lang="scss" scoped>
.actions-container {
  .actions-wrapper {
    &.no-actions {
      display: block;
      width: 100%;
      text-align: center;
      font-size: var(--font-size-12);
      padding-bottom: var(--cmp-padding);
      color: var(--text-desc-color);
    }
  }
}
</style>
