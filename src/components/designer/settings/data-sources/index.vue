<template>
  <div class="data-sources-container">
    <el-input placeholder="输入名称模糊搜索" style="width: 100%" />
    <el-card
      v-for="(dataSource, dataSourceIndex) in dataSources"
      :key="dataSourceIndex"
      class="data-sources-card"
      shadow="never"
    >
      <template #header>
        <div class="data-sources-header">
          <span>{{ dataSource.title }}</span>
          <el-button style="margin-left: auto" plain type="primary" icon="Edit"></el-button>
          <el-button plain type="danger" icon="Delete" @click="handleRemove(dataSourceIndex)"></el-button>
        </div>
      </template>
      <div class="data-sources-body">
        <div class="data-sources-item">
          <div class="data-sources-item-title">
            <el-icon>
              <Promotion />
            </el-icon>
            名称
          </div>
          <div class="data-sources-item-content">{{ dataSource.name }}</div>
        </div>
        <div class="data-sources-item">
          <div class="data-sources-item-title">
            <el-icon>
              <Connection />
            </el-icon>
            地址
          </div>
          <div class="data-sources-item-content">{{ dataSource.url }}</div>
        </div>
        <div class="data-sources-item">
          <div class="data-sources-item-title">
            <el-icon>
              <Tickets />
            </el-icon>
            描述
          </div>
          <div class="data-sources-item-content">{{ dataSource.description }}</div>
        </div>
      </div>
    </el-card>
    <el-button type="primary" style="width: 100%; margin-top: 12px" plain icon="Plus" @click="showAddDialog">
      添加
    </el-button>
  </div>

  <!--添加或修改数据源-->
  <el-dialog
    v-model="dialog.visible"
    :title="dialog.title"
    append-to-body
    width="960px"
    class="data-source-dialog"
    :show-close="false"
    :close-on-click-modal="false"
  >
    <template #header>
      <div class="data-sources-dialog-title display-flex align-items-center">
        {{ dialog.title }}
        <el-button type="primary" style="margin-left: auto" plain class="margin-8" @click="handleSave">
          测试数据源
        </el-button>
        <el-button type="primary" @click="handleSave">保存数据源</el-button>
        <el-button @click="dialog.visible = false">取消</el-button>
      </div>
    </template>
    <el-form ref="dataSourceFormRef" :model="dialog.form" :rules="dialog.formRules" label-width="140px" size="small">
      <el-form-item label="名称" prop="name">
        <el-input v-model="dialog.form.name" />
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="dialog.form.title" />
      </el-form-item>
      <el-form-item label="请求地址" prop="url">
        <el-input v-model="dialog.form.url">
          <template #append>
            <el-select v-model="dialog.form.urlType" style="width: 120px">
              <el-option label="字符串" value="string" />
              <el-option label="变量或表达式" value="fx" />
            </el-select>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="dialog.form.description" type="textarea" :rows="4" />
      </el-form-item>
      <el-form-item label="请求方法" prop="method">
        <el-radio-group v-model="dialog.form.method">
          <el-radio-button label="get">get</el-radio-button>
          <el-radio-button label="post">post</el-radio-button>
          <el-radio-button label="put">put</el-radio-button>
          <el-radio-button label="delete">delete</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="请求头（headers）">
        <div class="data-list">
          <el-input v-model="dialog.form.headers" placeholder="键" />
          <el-select>
            <el-option label="字符串类型" value="string" />
            <el-option label="数字类型" value="string" />
            <el-option label="布尔类型" value="string" />
            <el-option label="变量或表达式" value="string" />
          </el-select>
          <el-input v-model="dialog.form.headers" placeholder="值" />
          <el-button type="danger" plain icon="Delete" />
        </div>
        <el-button type="primary" text icon="Plus">新增请求头</el-button>
      </el-form-item>
      <el-form-item label="请求参数（params）">
        <div class="data-list">
          <el-input v-model="dialog.form.headers" placeholder="键" />
          <el-select>
            <el-option label="字符串类型" value="string" />
            <el-option label="数字类型" value="string" />
            <el-option label="布尔类型" value="string" />
            <el-option label="变量或表达式" value="string" />
          </el-select>
          <el-input v-model="dialog.form.headers" placeholder="值" />
          <el-button type="danger" icon="Delete" />
        </div>
        <el-button type="primary" text icon="Plus">新增请求参数</el-button>
      </el-form-item>
      <el-form-item label="请求数据（data）">
        <div class="data-list">
          <el-input v-model="dialog.form.headers" placeholder="键" />
          <el-select>
            <el-option label="字符串类型" value="string" />
            <el-option label="数字类型" value="string" />
            <el-option label="布尔类型" value="string" />
            <el-option label="变量或表达式" value="string" />
          </el-select>
          <el-input v-model="dialog.form.headers" placeholder="值" />
          <el-button type="danger" icon="Delete" />
        </div>
        <el-button type="primary" text icon="Plus">新增请求数据</el-button>
      </el-form-item>
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="请求配置（request）" name="requestCode">
          <el-alert type="info" :closable="false">(config,&nbsp;DSV)&nbsp;=>&nbsp;{</el-alert>
          <CodeEditor v-model="dialog.form.requestCode" />
          <el-alert type="info" :closable="false">}</el-alert>
        </el-tab-pane>
        <el-tab-pane label="响应处理（response）" name="responseCode">
          <el-alert type="info" :closable="false">(result,&nbsp;DSV)&nbsp;=>&nbsp;{</el-alert>
          <CodeEditor v-model="dialog.form.responseCode" />
          <el-alert type="info" :closable="false">}</el-alert>
        </el-tab-pane>
        <el-tab-pane label="错误处理（error）" name="responseErrorCode">
          <el-alert type="info" :closable="false">(error,&nbsp;DSV,&nbsp;$message)&nbsp;=>&nbsp;{</el-alert>
          <CodeEditor v-model="dialog.form.responseErrorCode" />
          <el-alert type="info" :closable="false">}</el-alert>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-dialog>
</template>
<script setup>
import { ref } from "vue";
import { cloneDeep } from "@lime-util/util";
import CodeEditor from "@/components/code-editor/index.vue";
import { ElMessage, ElMessageBox } from "element-plus";

// props
const props = defineProps({
  designer: { type: Object, default: () => ({}) },
});

// 初始化的表单数据
const initForm = {
  id: "",
  name: "",
  title: "",
  description: "",
  url: "",
  urlType: "string",
  headers: [],
  params: [],
  data: [],
  method: "get",
  requestCode: "return config;",
  responseCode: "return result.data.result;",
  responseErrorCode: "$message.error(error.message);",
};

// 数据源列表
const dataSources = ref(props.designer.widgetConfig.dataSources);

// 弹框
const dialog = ref({
  visible: false,
  type: "add",
  title: "添加数据源",
  dataSourceIndex: null,
  form: cloneDeep(initForm),
  formRules: {
    name: [{ required: true, message: "请输入", trigger: "blur" }],
    title: [{ required: true, message: "请输入", trigger: "blur" }],
  },
});
// 表单
const dataSourceFormRef = ref(null);
// 请求和响应配置
const activeName = ref("requestCode");
// 添加
const showAddDialog = () => {
  dialog.value.visible = true;
  dialog.value.form = JSON.parse(JSON.stringify(initForm));
};
// 修改
const showEditDialog = (dataSource, dataSourceIndex) => {};
// 保存
const handleSave = () => {
  if (!dataSourceFormRef.value) return;
  dataSourceFormRef.value.validate((valid) => {
    if (valid) {
      // 添加
      if (dialog.value.type === "add") {
        console.log(11, dialog.value.form, dataSources);
        // 校验是否已经存在数据源名称
        let hasDataSourceName = (dataSources.value || []).some((v, i) => v.name === dialog.value.form.name);
        console.log(333, hasDataSourceName);
        if (hasDataSourceName) {
          ElMessage({
            type: "error",
            message: "已经存在数据源名称",
          });
          return;
        }

        dataSources.value.push(dialog.value.form);
      }
      // 修改
      if (dialog.value.type === "edit") {
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
 * 删除
 */
const handleRemove = (dataSourceIndex) => {
  ElMessageBox.confirm("确定删除吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    dataSources.value.splice(dataSourceIndex, 1);
    ElMessage({
      type: "success",
      message: "删除成功",
    });
  });
};
</script>
<style lang="scss" scoped>
.data-sources-container {
  margin-top: var(--cmp-margin);

  // 重新定义数据源卡片样式
  :deep(.data-sources-card) {
    background: var(--bg-standard-color);
    border-radius: var(--bg-light-color);
    border: solid 1px var(--bg-light-color);
    margin-bottom: var(--cmp-margin);

    .el-card__header {
      display: flex;
      align-items: center;
      height: var(--cmp-size);
      padding: 0 var(--cmp-padding);
      font-size: var(--font-size-14);
      color: var(--text-title);

      .data-sources-header {
        width: 100%;
        display: flex;

        .el-button {
          margin-left: var(--cmp-margin);
        }
      }
    }

    .el-card__body {
      font-size: var(--font-size-12);
      padding: var(--cmp-padding);

      .data-sources-body {
        background: var(--bg-white-color);
        border: solid 1px var(--border-standard-color);
        border-bottom: 0;

        .data-sources-item {
          display: flex;
          border-bottom: solid 1px var(--border-standard-color);

          .data-sources-item-title {
            width: 60px;
            padding: var(--sp4) var(--sp8);
            background: var(--bg-standard-color);
            border-right: solid 1px var(--border-standard-color);
            color: var(--text-desc-color);
          }

          .data-sources-item-content {
            flex: 1;
            color: var(--text-content-color);
            padding: var(--sp4) var(--sp8);
          }
        }
      }
    }
  }
}
</style>
