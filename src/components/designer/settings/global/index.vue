<template>
  <div class="global-container">
    <el-form-item label="全局组件大小">
      <el-radio-group v-model="widgetConfig.globalSize">
        <el-radio-button label="small">小</el-radio-button>
        <el-radio-button label="">默认</el-radio-button>
        <el-radio-button label="large">大</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="表单标签位置">
      <el-radio-group v-model="widgetConfig.globalLabelPosition">
        <el-radio-button label="left">左</el-radio-button>
        <el-radio-button label="right">右</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="表单标签宽度">
      <el-input-number
        v-model="widgetConfig.globalLabelWidth"
        placeholder="请输入"
        :min="0"
        :max="999"
        style="width: 100%"
        controls-position="right"
      />
    </el-form-item>
    <el-form-item label="主题样式">
      <el-select v-model="widgetConfig.globalTheme" placeholder="请输入">
        <el-option label="默认" value="default" />
        <el-option label="火焰红" value="fire-hot" />
      </el-select>
    </el-form-item>
    <el-form-item label="全局CSS">
      <el-button type="primary" plain icon="Edit" @click="showGlobalCssDialog">编辑</el-button>
    </el-form-item>
    <el-collapse-item title="全局变量" name="globalVars">
      <el-form-item label="全局变量">
        <el-button type="primary" plain icon="Edit" @click="showGlobalVarsDialog">编辑</el-button>
      </el-form-item>
    </el-collapse-item>
    <el-collapse-item title="全局表达式" name="globalFxs">
      <el-form-item label="全局表达式">
        <el-button type="primary" plain icon="Edit" @click="handleClick(event, eventIndex)">编辑</el-button>
      </el-form-item>
    </el-collapse-item>
    <el-collapse-item title="全局函数" name="globalFns">
      <template v-if="widgetConfig.globalFns.length">
        <el-form-item
          v-for="(fn, fnIndex) in widgetConfig.globalFns"
          :key="fnIndex"
          :label="fn.label"
          class="fns-wrapper"
        >
          <el-button type="primary" plain icon="Edit" @click="showEditGlobalFnsDialog(fn, fnIndex)">编辑</el-button>
          <el-button
            type="danger"
            plain
            icon="Delete"
            style="margin-left: auto"
            @click="handleRemoveGlobalFns(fnIndex)"
          ></el-button>
        </el-form-item>
        <el-button type="primary" style="width: 100%" plain icon="Plus" @click="showAddGlobalFnsDialog">
          添加全局函数
        </el-button>
      </template>
      <template v-else>
        <div class="actions-wrapper no-actions">
          点击
          <el-button
            icon="Plus"
            plain
            type="primary"
            class="margin-bottom-8"
            @click="showAddGlobalFnsDialog"
          ></el-button>
          添加全局函数
        </div>
      </template>
    </el-collapse-item>
    <el-collapse-item title="全局事件" name="globalEvents">
      <el-form-item
        v-for="(event, eventIndex) in widgetConfig.globalEvents"
        :key="eventIndex"
        :label="event.name"
        :label-width="110"
        class="events-wrapper"
      >
        <el-button type="primary" plain icon="Edit" @click="showGlobalEventsDialog(event, eventIndex)">编辑</el-button>
      </el-form-item>
    </el-collapse-item>
    <el-collapse-item title="全局动作" name="globalActions">
      <template v-if="widgetConfig.globalActions.length">
        <el-form-item
          v-for="(action, actionIndex) in widgetConfig.globalActions"
          :key="actionIndex"
          :label="action.label"
          class="actions-wrapper"
        >
          <el-button type="primary" plain icon="Edit" @click="showEditGlobalActionsDialog(action, actionIndex)">
            编辑
          </el-button>
          <el-button
            type="danger"
            plain
            icon="Delete"
            style="margin-left: auto"
            @click="handleRemoveGlobalActions(actionIndex)"
          ></el-button>
        </el-form-item>
        <el-button type="primary" style="width: 100%" plain icon="Plus" @click="showAddGlobalActionsDialog">
          添加全局动作
        </el-button>
      </template>
      <template v-else>
        <div class="actions-wrapper no-actions">
          点击
          <el-button
            icon="Plus"
            plain
            type="primary"
            class="margin-bottom-8"
            @click="showAddGlobalActionsDialog"
          ></el-button>
          添加全局动作
        </div>
      </template>
    </el-collapse-item>
  </div>

  <!--弹框操作-->
  <!--全局CSS-->
  <el-dialog
    v-if="globalCssDialog.visible"
    v-model="globalCssDialog.visible"
    :title="globalCssDialog.title"
    append-to-body
    draggable
    width="960px"
    :close-on-click-modal="false"
  >
    <CodeEditor v-model="globalCssDialog.data" lang="css" />
    <template #footer>
      <div class="text-align-center">
        <el-button type="primary" @click="handleSureGlobalCss">确定</el-button>
        <el-button @click="globalCssDialog.visible = false">取消</el-button>
      </div>
    </template>
  </el-dialog>
  <!--全局变量-->
  <el-dialog
    v-if="globalVarsDialog.visible"
    v-model="globalVarsDialog.visible"
    :title="globalVarsDialog.title"
    append-to-body
    draggable
    width="960px"
    :close-on-click-modal="false"
  >
    <el-alert type="info" :closable="false">变量保存在globalVars中，以JSON对象形式存在。</el-alert>
    <CodeEditor v-model="globalVarsDialog.data" />
    <template #footer>
      <div class="text-align-center">
        <el-button type="primary" @click="handleSureGlobalVars">确定</el-button>
        <el-button @click="globalVarsDialog.visible = false">取消</el-button>
      </div>
    </template>
  </el-dialog>
  <!--全局函数-->
  <el-dialog
    v-if="globalFnsDialog.visible"
    v-model="globalFnsDialog.visible"
    :title="globalFnsDialog.title"
    append-to-body
    draggable
    width="960px"
    :close-on-click-modal="false"
  >
    <el-form
      ref="globalFnsFormRef"
      :model="globalFnsDialog.form"
      :rules="globalFnsDialog.formRules"
      label-width="80px"
      inline
      size="small"
    >
      <el-form-item label="函数名称" prop="name">
        <el-input v-model="globalFnsDialog.form.name" :disabled="globalFnsDialog.type === 'edit'" />
      </el-form-item>
      <el-form-item label="函数标签" prop="label">
        <el-input v-model="globalFnsDialog.form.label" />
      </el-form-item>
      <el-form-item label="是否启用">
        <el-switch v-model="globalFnsDialog.form.enable" />
      </el-form-item>
    </el-form>
    <CodeEditor v-model="globalFnsDialog.form.code" />
    <template #footer>
      <div class="text-align-center">
        <el-button type="primary" @click="handleSureGlobalFns">确定</el-button>
        <el-button @click="globalFnsDialog.visible = false">取消</el-button>
      </div>
    </template>
  </el-dialog>
  <!--全局事件-->
  <el-dialog
    v-if="globalEventsDialog.visible"
    v-model="globalEventsDialog.visible"
    :title="globalEventsDialog.title"
    append-to-body
    draggable
    width="960px"
    :close-on-click-modal="false"
  >
    <CodeEditor v-model="globalEventsDialog.data" />
    <template #footer>
      <div class="text-align-center">
        <el-button type="primary" @click="handleSureGlobalEvents">确定</el-button>
        <el-button @click="globalEventsDialog.visible = false">取消</el-button>
      </div>
    </template>
  </el-dialog>
  <!--全局动作-->
  <el-dialog
    v-if="globalActionsDialog.visible"
    v-model="globalActionsDialog.visible"
    :title="globalActionsDialog.title"
    append-to-body
    draggable
    width="960px"
    :close-on-click-modal="false"
  >
    <el-form
      ref="globalActionsFormRef"
      :model="globalActionsDialog.form"
      :rules="globalActionsDialog.formRules"
      label-width="80px"
      inline
      size="small"
    >
      <el-form-item label="动作名称" prop="name">
        <el-input v-model="globalActionsDialog.form.name" :disabled="globalActionsDialog.type === 'edit'" />
      </el-form-item>
      <el-form-item label="动作标签" prop="label">
        <el-input v-model="globalActionsDialog.form.label" />
      </el-form-item>
      <el-form-item label="是否启用">
        <el-switch v-model="globalActionsDialog.form.enable" />
      </el-form-item>
    </el-form>
    <CodeEditor v-model="globalActionsDialog.form.code" />
    <template #footer>
      <div class="text-align-center">
        <el-button type="primary" @click="handleSureGlobalActions">确定</el-button>
        <el-button @click="globalActionsDialog.visible = false">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref } from "vue";
import { cloneDeep } from "@lime-util/util";
import { ElMessage, ElMessageBox } from "element-plus";
import { useDesignerStore } from "@/store";
import useGlobal from "@/hooks/global";
import CodeEditor from "@/components/code-editor/index.vue";

defineOptions({ name: "Global" });

// props
const props = defineProps({
  designer: { type: Object, default: () => ({}) },
});

// 获取到设计器的store
const designerStore = useDesignerStore();
// 获取全局配置的hooks
const { getGlobalEventFn } = useGlobal({ props });
// 设计器中全局的数据配置
const widgetConfig = ref(props.designer.widgetConfig);

/* 全局css */
const globalCssDialog = ref({
  visible: false,
  title: "全局css",
  data: null,
});
const showGlobalCssDialog = () => {
  globalCssDialog.value.visible = true;
  globalCssDialog.value.data = widgetConfig.value.globalCss;
};
const handleSureGlobalCss = () => {
  widgetConfig.value.globalCss = globalCssDialog.value.data;
  globalCssDialog.value.visible = false;
  ElMessage({
    type: "success",
    message: "操作成功",
  });
};

/* 全局变量 */
// 弹框
const globalVarsDialog = ref({
  visible: false,
  title: "全局变量",
  data: "",
});
// 显示
const showGlobalVarsDialog = () => {
  globalVarsDialog.value.visible = true;
  globalVarsDialog.value.data = JSON.stringify(widgetConfig.value.globalVars, null, " ");
};
// 确定
const handleSureGlobalVars = () => {
  widgetConfig.value.globalVars = JSON.parse(globalVarsDialog.value.data);
  globalVarsDialog.value.visible = false;
  // 缓存全局变量对象
  designerStore.setGlobalVars(widgetConfig.value.globalVars);
  ElMessage({
    type: "success",
    message: "操作成功",
  });
};

/* 全局函数 */
// 弹框
const globalFnsDialog = ref({
  visible: false,
  title: "添加全局函数",
  type: "add",
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
const globalFnsFormRef = ref(null);
// 添加
const showAddGlobalFnsDialog = () => {
  globalFnsDialog.value.visible = true;
  globalFnsDialog.value.title = "添加全局函数";
  globalFnsDialog.value.type = "add";
  globalFnsDialog.value.fnIndex = null;
  // 重置之前的表单输入
  globalFnsDialog.value.form = {
    name: "",
    label: "",
    enable: true,
    code: "",
  };
  globalFnsFormRef.value.resetFields();
};
// 修改
const showEditGlobalFnsDialog = (fn, fnIndex) => {
  globalFnsDialog.value.visible = true;
  globalFnsDialog.value.title = "修改全局函数";
  globalFnsDialog.value.type = "edit";
  globalFnsDialog.value.actionIndex = fnIndex;
  globalFnsDialog.value.form = cloneDeep(fn);
};
// 删除
const handleRemoveGlobalFns = (fnIndex) => {
  ElMessageBox.confirm("确定删除吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    widgetConfig.value.globalFns.splice(fnIndex, 1);
    // 缓存全局动作列表
    designerStore.setGlobalFns(widgetConfig.value.globalFns);
    ElMessage({
      type: "success",
      message: "删除成功",
    });
  });
};
// 确定
const handleSureGlobalFns = () => {
  if (!globalFnsFormRef.value) return;
  globalFnsFormRef.value.validate((valid) => {
    if (valid) {
      // 添加
      if (globalFnsDialog.value.type === "add") {
        // 校验是否已经存在动作名称
        let hasFnName = widgetConfig.value.globalFns.some((v, i) => v.name === globalFnsDialog.value.form.name);
        if (hasFnName) {
          ElMessage({
            type: "error",
            message: "全局已经存在该函数名称",
          });
          return;
        }
        console.log(333, globalFnsDialog.value.form);
        widgetConfig.value.globalFns.push(globalFnsDialog.value.form);
      }
      // 编辑
      if (globalFnsDialog.value.type === "edit") {
        widgetConfig.value.globalFns[globalFnsDialog.value.actionIndex] = globalFnsDialog.value.form;
      }
      // 操作结果
      globalFnsDialog.value.visible = false;
      // 缓存全局动作列表
      designerStore.setGlobalFns(widgetConfig.value.globalFns);
      ElMessage({
        type: "success",
        message: "操作成功",
      });
    }
  });
};

/* 全局事件 */
// 弹框
const globalEventsDialog = ref({
  visible: false,
  title: "全局事件",
  eventIndex: null,
  data: "",
});
// 显示
const showGlobalEventsDialog = (event, eventIndex) => {
  globalEventsDialog.value.visible = true;
  globalEventsDialog.value.eventIndex = eventIndex;
  globalEventsDialog.value.data = event.code;
};
// 确定
const handleSureGlobalEvents = () => {
  widgetConfig.value.globalEvents[globalEventsDialog.value.eventIndex].code = globalEventsDialog.value.data;
  globalEventsDialog.value.visible = false;
  ElMessage({
    type: "success",
    message: "操作成功",
  });
};

/* 全局动作 */
// 弹框
const globalActionsDialog = ref({
  visible: false,
  title: "添加全局动作",
  type: "add",
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
const globalActionsFormRef = ref(null);
// 添加
const showAddGlobalActionsDialog = () => {
  globalActionsDialog.value.visible = true;
  globalActionsDialog.value.title = "添加全局动作";
  globalActionsDialog.value.type = "add";
  globalActionsDialog.value.actionIndex = null;
  // 重置之前的表单输入
  globalActionsDialog.value.form = {
    name: "",
    label: "",
    enable: true,
    code: "",
  };
  globalActionsFormRef.value.resetFields();
};
// 修改
const showEditGlobalActionsDialog = (action, actionIndex) => {
  globalActionsDialog.value.visible = true;
  globalActionsDialog.value.title = "修改全局动作";
  globalActionsDialog.value.type = "edit";
  globalActionsDialog.value.actionIndex = actionIndex;
  globalActionsDialog.value.form = cloneDeep(action);
};
// 删除
const handleRemoveGlobalActions = (actionIndex) => {
  ElMessageBox.confirm("确定删除吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    widgetConfig.value.globalActions.splice(actionIndex, 1);
    // 缓存全局动作列表
    designerStore.setGlobalActions(widgetConfig.value.globalActions);
    ElMessage({
      type: "success",
      message: "删除成功",
    });
  });
};
// 确定
const handleSureGlobalActions = () => {
  if (!globalActionsFormRef.value) return;
  globalActionsFormRef.value.validate((valid) => {
    if (valid) {
      // 添加
      if (globalActionsDialog.value.type === "add") {
        // 校验是否已经存在动作名称
        let hasActionName = widgetConfig.value.globalActions.some(
          (v, i) => v.name === globalActionsDialog.value.form.name,
        );
        if (hasActionName) {
          ElMessage({
            type: "error",
            message: "全局已经存在该动作名称",
          });
          return;
        }
        widgetConfig.value.globalActions.push(globalActionsDialog.value.form);
      }
      // 编辑
      if (globalActionsDialog.value.type === "edit") {
        widgetConfig.value.globalActions[globalActionsDialog.value.actionIndex] = globalActionsDialog.value.form;
      }
      // 操作结果
      globalActionsDialog.value.visible = false;
      // 缓存全局动作列表
      designerStore.setGlobalActions(widgetConfig.value.globalActions);
      ElMessage({
        type: "success",
        message: "操作成功",
      });
    }
  });
};
</script>
<style lang="scss" scoped>
.global-container {
  margin-top: var(--cmp-margin);
}
</style>
