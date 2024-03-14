<template>
  <div class="global-container">
    <el-form-item label="全局组件大小">
      <el-radio-group v-model="globalConfig.globalSize">
        <el-radio-button label="small">小</el-radio-button>
        <el-radio-button label="">默认</el-radio-button>
        <el-radio-button label="large">大</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="表单标签位置">
      <el-radio-group v-model="globalConfig.globalLabelPosition">
        <el-radio-button label="left">左</el-radio-button>
        <el-radio-button label="right">右</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="表单标签宽度">
      <el-input-number
        v-model="globalConfig.globalLabelWidth"
        placeholder="请输入"
        :min="0"
        :max="999"
        style="width: 100%"
        controls-position="right"
      />
    </el-form-item>
    <el-form-item label="主题样式">
      <el-select v-model="globalConfig.globalTheme" placeholder="请输入">
        <el-option label="默认" value="default" />
        <el-option label="火焰红" value="fire-hot" />
      </el-select>
    </el-form-item>
    <el-form-item label="全局CSS">
      <el-button type="primary" :plain="!globalConfig.globalCss" icon="Edit" @click="showGlobalCssDialog">
        编辑
      </el-button>
    </el-form-item>
    <el-collapse-item title="全局变量" name="globalVars">
      <el-form-item label="全局变量">
        <el-button type="primary" :plain="!globalConfig.globalVars" icon="Edit" @click="showGlobalVarsDialog">
          编辑
        </el-button>
      </el-form-item>
    </el-collapse-item>
    <el-collapse-item title="全局函数" name="globalFns">
      <template v-if="globalConfig.globalFns.length">
        <el-form-item
          v-for="(fn, fnIndex) in globalConfig.globalFns"
          :key="fnIndex"
          :label="fn.label"
          class="fns-wrapper"
        >
          <el-button type="primary" :plain="!fn.code" icon="Edit" @click="showEditGlobalFnsDialog(fn, fnIndex)">
            编辑
          </el-button>
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
    <el-collapse-item title="全局动作" name="globalActions">
      <template v-if="globalConfig.globalActions.length">
        <el-form-item
          v-for="(action, actionIndex) in globalConfig.globalActions"
          :key="actionIndex"
          :label="action.label"
          class="actions-wrapper"
        >
          <el-button
            type="primary"
            :plain="!action.code"
            icon="Edit"
            @click="showEditGlobalActionsDialog(action, actionIndex)"
          >
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
    <el-collapse-item title="全局事件" name="globalEvents">
      <el-form-item
        v-for="(event, eventIndex) in globalConfig.globalEvents"
        :key="eventIndex"
        :label="event.name"
        :label-width="110"
        class="events-wrapper"
      >
        <el-button type="primary" :plain="!event.code" icon="Edit" @click="showGlobalEventsDialog(event, eventIndex)">
          编辑
        </el-button>
      </el-form-item>
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
    <el-alert type="warning" :closable="false">
      变量会保存在全局globalConfig的globalVars中，以JSON对象形式存在，允许在事件、动作、数据源等多处地方用$globalVars名称调用，并且支持双向绑定修改。
    </el-alert>
    <CodeEditor v-model="globalVarsDialog.data" lang="json" />
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
    <el-alert type="info" :closable="false">
      $globalFns.{{ globalFnsDialog.form.name }}&nbsp;($globalVars)&nbsp;{&nbsp;//&nbsp;$globalVars：全局变量
    </el-alert>
    <CodeEditor v-model="globalFnsDialog.form.code" />
    <el-alert type="info" :closable="false">}</el-alert>
    <template #footer>
      <div class="text-align-center">
        <el-button type="primary" @click="handleSureGlobalFns">确定</el-button>
        <el-button @click="globalFnsDialog.visible = false">取消</el-button>
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
    <el-alert type="info" :closable="false">
      $globalActions.{{ globalActionsDialog.form.name }}&nbsp;($globalVars)&nbsp;{&nbsp;//&nbsp;$globalVars：全局变量
    </el-alert>
    <CodeEditor v-model="globalActionsDialog.form.code" />
    <el-alert type="info" :closable="false">}</el-alert>
    <template #footer>
      <div class="text-align-center">
        <el-button type="primary" @click="handleSureGlobalActions">确定</el-button>
        <el-button @click="globalActionsDialog.visible = false">取消</el-button>
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
    <el-alert type="info" :closable="false">
      $globalEvents.{{ globalEventsDialog.eventName }}&nbsp;($globalVars)&nbsp;{&nbsp;//&nbsp;$globalVars：全局变量
    </el-alert>
    <CodeEditor v-model="globalEventsDialog.data" />
    <el-alert type="info" :closable="false">}</el-alert>
    <template #footer>
      <div class="text-align-center">
        <el-button type="primary" @click="handleSureGlobalEvents">确定</el-button>
        <el-button @click="globalEventsDialog.visible = false">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, computed, watch } from "vue";
import { cloneDeep } from "@lime-util/util";
import { ElMessage, ElMessageBox } from "element-plus";
import useGlobal from "@/hooks/global";
import CodeEditor from "@/components/code-editor/index.vue";

defineOptions({ name: "Global" });

// props
const props = defineProps({
  designer: { type: Object, default: () => ({}) },
  globalConfig: { type: Object, default: null },
});

// 设计器中全局的数据配置，通过计算属性可以监听到改变
const globalConfig = computed(() => props.globalConfig);

/* 全局css */
const globalCssDialog = ref({
  visible: false,
  title: "全局css",
  data: null,
});
const showGlobalCssDialog = () => {
  globalCssDialog.value.visible = true;
  globalCssDialog.value.data = globalConfig.value.globalCss;
};
const handleSureGlobalCss = () => {
  globalConfig.value.globalCss = globalCssDialog.value.data;
  globalCssDialog.value.visible = false;
  ElMessage({
    type: "success",
    message: "操作成功",
  });
};

/* 全局变量 */
// 测试数据
/* {
  "unitOid": 123,
  "unitName": "单位1",
  "deptOid": 456,
  "deptName": "部门1",
  "personInfo": {
  "userId": 123,
    "userName": "admin",
    "auth": [
    { "id": 1, "name": "管理员权限1" },
    { "id": 2, "name": "管理员权限2" }
  ]
},
  "tableData": [
  { "id": 1, "name": "人员1" },
  { "id": 2, "name": "人员2" }
]
} */
// 弹框
const globalVarsDialog = ref({
  visible: false,
  title: "全局变量",
  data: "",
});
// 显示
const showGlobalVarsDialog = () => {
  globalVarsDialog.value.visible = true;
  globalVarsDialog.value.data = JSON.stringify(globalConfig.value.globalVars || {}, null, "  ");
};
// 确定
const handleSureGlobalVars = () => {
  globalConfig.value.globalVars = JSON.parse(globalVarsDialog.value.data);
  globalVarsDialog.value.visible = false;
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
  globalFnsFormRef.value && globalFnsFormRef.value.resetFields();
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
    globalConfig.value.globalFns.splice(fnIndex, 1);
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
        let hasFnName = globalConfig.value.globalFns.some((v, i) => v.name === globalFnsDialog.value.form.name);
        if (hasFnName) {
          ElMessage({
            type: "error",
            message: "全局已经存在该函数名称",
          });
          return;
        }
        globalConfig.value.globalFns.push(globalFnsDialog.value.form);
      }
      // 编辑
      if (globalFnsDialog.value.type === "edit") {
        globalConfig.value.globalFns[globalFnsDialog.value.actionIndex] = globalFnsDialog.value.form;
      }
      // 操作结果
      globalFnsDialog.value.visible = false;
      ElMessage({
        type: "success",
        message: "操作成功",
      });
    }
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
    globalConfig.value.globalActions.splice(actionIndex, 1);
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
        let hasActionName = globalConfig.value.globalActions.some(
          (v, i) => v.name === globalActionsDialog.value.form.name,
        );
        if (hasActionName) {
          ElMessage({
            type: "error",
            message: "全局已经存在该动作名称",
          });
          return;
        }
        globalConfig.value.globalActions.push(globalActionsDialog.value.form);
      }
      // 编辑
      if (globalActionsDialog.value.type === "edit") {
        globalConfig.value.globalActions[globalActionsDialog.value.actionIndex] = globalActionsDialog.value.form;
      }
      // 操作结果
      globalActionsDialog.value.visible = false;
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
  eventName: "",
  data: "",
});
// 显示
const showGlobalEventsDialog = (event, eventIndex) => {
  globalEventsDialog.value.visible = true;
  globalEventsDialog.value.eventIndex = eventIndex;
  globalEventsDialog.value.eventName = event.name;
  globalEventsDialog.value.data = event.code;
};
// 确定
const handleSureGlobalEvents = () => {
  globalConfig.value.globalEvents[globalEventsDialog.value.eventIndex].code = globalEventsDialog.value.data;
  globalEventsDialog.value.visible = false;
  ElMessage({
    type: "success",
    message: "操作成功",
  });
};
</script>
<style lang="scss" scoped>
.global-container {
  margin-top: var(--cmp-margin);
}
</style>
