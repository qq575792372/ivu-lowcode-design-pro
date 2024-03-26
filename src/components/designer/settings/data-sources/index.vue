<template>
  <div class="data-sources-container">
    <el-input placeholder="输入关键字搜索" style="width: 100%" />
    <el-card
      v-for="(dataSource, dataSourceIndex) in dataSources"
      :key="dataSourceIndex"
      class="data-sources-card"
      shadow="never"
    >
      <template #header>
        <div class="data-sources-header">
          <span>{{ dataSource.title }}</span>
          <el-button
            style="margin-left: auto"
            plain
            type="primary"
            icon="Edit"
            @click="showEditDialog(dataSource, dataSourceIndex)"
          ></el-button>
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
    width="65%"
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
    <el-alert type="warning" :closable="false">
      <div>
        1.请求地址、请求头（headers）、请求参数（params）、请求数据（data）中变量或表达式可用的参数：DSV：数据源变量(data-source-var)，在组件中手动调用数据源时传入；&nbsp;$globalVars：全局变量；
      </div>
      <div>2.当选择变量或表达式时，会自动添加字符串模板符号“`”。</div>
    </el-alert>
    <el-form ref="dataSourceFormRef" :model="dialog.form" :rules="dialog.formRules" label-width="140px" size="small">
      <el-form-item label="名称" prop="name">
        <el-input v-model="dialog.form.name" :disabled="dialog.type === 'edit'" />
      </el-form-item>
      <el-form-item label="请求地址" prop="url">
        <el-input v-model="dialog.form.url">
          <template #append>
            <el-select v-model="dialog.form.urlType" style="width: 120px" @change="handleChangeUrlType">
              <el-option label="字符串" value="String" />
              <el-option label="变量或表达式" value="VarFx" />
            </el-select>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="dialog.form.title" />
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
        <el-row v-for="(hd, hdIndex) in dialog.form.headers" :key="hdIndex" class="margin-bottom-4">
          <el-col :span="8" class="padding-right-8">
            <el-form-item
              label-width="0"
              :prop="`headers.${hdIndex}.name`"
              :rules="[{ required: true, message: '请输入', trigger: 'blur' }]"
            >
              <el-input v-model="hd.name" placeholder="名称" />
            </el-form-item>
          </el-col>
          <el-col :span="4" class="padding-right-8">
            <el-form-item
              label-width="0"
              :prop="`headers.${hdIndex}.type`"
              :rules="[{ required: true, message: '请选择', trigger: 'change' }]"
            >
              <el-select v-model="hd.type" placeholder="请选择" @change="handleChangeHeaderType($event, hdIndex)">
                <el-option label="字符串类型" value="String" />
                <el-option label="数字类型" value="Number" />
                <el-option label="布尔类型" value="Boolean" />
                <el-option label="变量或表达式" value="VarFx" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="padding-right-8">
            <el-form-item
              label-width="0"
              :prop="`headers.${hdIndex}.value`"
              :rules="[{ required: true, message: '请输入', trigger: 'blur' }]"
            >
              <el-input v-model="hd.value" placeholder="值" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="danger" plain icon="Delete" @click="handleRemoveHeaders(hdIndex)" />
          </el-col>
        </el-row>
        <el-button type="primary" text icon="Plus" @click="handleAddHeaders">新增请求头</el-button>
      </el-form-item>
      <el-form-item label="请求参数（params）">
        <el-row v-for="(pm, pmIndex) in dialog.form.params" :key="pmIndex" class="margin-bottom-4">
          <el-col :span="8" class="padding-right-8">
            <el-form-item
              label-width="0"
              :prop="`params.${pmIndex}.name`"
              :rules="[{ required: true, message: '请输入', trigger: 'blur' }]"
            >
              <el-input v-model="pm.name" placeholder="名称" />
            </el-form-item>
          </el-col>
          <el-col :span="4" class="padding-right-8">
            <el-form-item
              label-width="0"
              :prop="`params.${pmIndex}.type`"
              :rules="[{ required: true, message: '请选择', trigger: 'change' }]"
            >
              <el-select v-model="pm.type" placeholder="请选择" @change="handleChangeParamType($event, pmIndex)">
                <el-option label="字符串类型" value="String" />
                <el-option label="数字类型" value="Number" />
                <el-option label="布尔类型" value="Boolean" />
                <el-option label="变量或表达式" value="VarFx" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="padding-right-8">
            <el-form-item
              label-width="0"
              :prop="`params.${pmIndex}.value`"
              :rules="[{ required: true, message: '请输入', trigger: 'blur' }]"
            >
              <el-input v-model="pm.value" placeholder="值" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="danger" plain icon="Delete" @click="handleRemoveParams(pmIndex)" />
          </el-col>
        </el-row>
        <el-button type="primary" text icon="Plus" @click="handleAddParams">新增请求参数</el-button>
      </el-form-item>
      <el-form-item label="请求数据（data）">
        <el-row v-for="(dt, dtIndex) in dialog.form.data" :key="dtIndex" class="margin-bottom-4">
          <el-col :span="8" class="padding-right-8">
            <el-form-item
              label-width="0"
              :prop="`data.${dtIndex}.name`"
              :rules="[{ required: true, message: '请输入', trigger: 'blur' }]"
            >
              <el-input v-model="dt.name" placeholder="名称" />
            </el-form-item>
          </el-col>
          <el-col :span="4" class="padding-right-8">
            <el-form-item
              label-width="0"
              :prop="`data.${dtIndex}.type`"
              :rules="[{ required: true, message: '请选择', trigger: 'change' }]"
            >
              <el-select v-model="dt.type" placeholder="请选择" @change="handleChangeDataType($event, dtIndex)">
                <el-option label="字符串类型" value="String" />
                <el-option label="数字类型" value="Number" />
                <el-option label="布尔类型" value="Boolean" />
                <el-option label="变量或表达式" value="VarFx" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="padding-right-8">
            <el-form-item
              label-width="0"
              :prop="`data.${dtIndex}.value`"
              :rules="[{ required: true, message: '请输入', trigger: 'blur' }]"
            >
              <el-input v-model="dt.value" placeholder="值" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="danger" plain icon="Delete" @click="handleRemoveData(dtIndex)" />
          </el-col>
        </el-row>
        <el-button type="primary" text icon="Plus" @click="handleAddData">新增请求数据</el-button>
      </el-form-item>
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="请求配置（request）" name="requestCode">
          <el-alert type="info" :closable="false">
            (config,&nbsp;DSV,&nbsp;$globalVars)&nbsp;=>&nbsp;{&nbsp;//&nbsp;config：请求的配置，控制请求数据和请求头等；&nbsp;DSV：数据源变量(data-source-var)，在组件中手动调用数据源时传入；&nbsp;$globalVars：全局变量；
          </el-alert>
          <CodeEditor v-model="dialog.form.requestCode" />
          <el-alert type="info" :closable="false">}</el-alert>
        </el-tab-pane>
        <el-tab-pane label="响应处理（response）" name="responseCode">
          <el-alert type="info" :closable="false">
            (result,&nbsp;DSV,&nbsp;$globalVars)&nbsp;=>&nbsp;{&nbsp;//&nbsp;result：响应的结果；&nbsp;DSV：数据源变量(data-source-var)，在组件中手动调用数据源时传入；&nbsp;$globalVars：全局变量；
          </el-alert>
          <CodeEditor v-model="dialog.form.responseCode" />
          <el-alert type="info" :closable="false">}</el-alert>
        </el-tab-pane>
        <el-tab-pane label="错误处理（error）" name="responseErrorCode">
          <el-alert type="info" :closable="false">
            (error,&nbsp;DSV,&nbsp;$globalVars,&nbsp;$message)&nbsp;=>&nbsp;{&nbsp;//&nbsp;error：错误的结果；&nbsp;DSV：数据源变量(data-source-var)，在组件中手动调用数据源时传入；&nbsp;$globalVars：全局变量；&nbsp;$message：消息提示ElMessage组件实例；
          </el-alert>
          <CodeEditor v-model="dialog.form.responseErrorCode" />
          <el-alert type="info" :closable="false">}</el-alert>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-dialog>
</template>
<script setup>
import { ref, computed } from "vue";
import { getGenerateId } from "@/utils/util";
import { ElMessage, ElMessageBox } from "element-plus";
import CodeEditor from "@/components/code-editor/index.vue";

// props
const props = defineProps({
  designer: { type: Object, default: () => ({}) },
  globalConfig: { type: Object, default: null },
});

// 初始化的表单数据
const initForm = {
  id: "",
  name: "",
  title: "",
  description: "",
  url: "",
  urlType: "String",
  headers: [
    {
      name: "Content-Type",
      type: "String",
      value: "application/json; charset=utf-8",
    },
  ],
  params: [],
  data: [],
  method: "get",
  requestCode: "return config;",
  responseCode: "return result.data.result;",
  responseErrorCode: "$message.error(error.message);",
};
// 数据源列表
const dataSources = computed(() => props.globalConfig.dataSources);

// 弹框
const dialog = ref({
  visible: false,
  type: "add",
  title: "添加数据源",
  dataSourceIndex: null,
  form: JSON.parse(JSON.stringify(initForm)),
  formRules: {
    name: [{ required: true, message: "请输入", trigger: "blur" }],
    title: [{ required: true, message: "请输入", trigger: "blur" }],
  },
});
// 表单
const dataSourceFormRef = ref(null);
// 请求和响应配置的tab名
const activeName = ref("requestCode");

// 操作表单
/**
 * 添加
 */
const showAddDialog = () => {
  dialog.value.visible = true;
  dialog.value.type = "add";
  dialog.value.title = "添加数据源";
  dialog.value.dataSourceIndex = null;
  dialog.value.form = JSON.parse(JSON.stringify(initForm));
};
/**
 * 修改
 */
const showEditDialog = (dataSource, dataSourceIndex) => {
  dialog.value.visible = true;
  dialog.value.type = "edit";
  dialog.value.title = "修改数据源";
  dialog.value.dataSourceIndex = dataSourceIndex;
  dialog.value.form = JSON.parse(JSON.stringify(dataSource));
};
/**
 * 改变类型时，切换请求链接支持表达式的字符串方式
 * @param {String} type 选择的类型
 */
const handleChangeUrlType = (type) => {
  if (type === "VarFx") {
    dialog.value.form.url = `\`${dialog.value.form.url}\``;
  } else {
    dialog.value.form.url = dialog.value.form.url.replace(/`/g, "");
  }
};
/**
 * 改变类型时，切换请求头支持表达式的字符串方式
 * @param type
 * @param {String} type 选择的类型
 * @param {Number} hdIndex 数据的下标
 */
const handleChangeHeaderType = (type, hdIndex) => {
  let value = dialog.value.form.headers[hdIndex].value;
  if (type === "VarFx") {
    dialog.value.form.headers[hdIndex].value = `\`${value}\``;
  } else if (type === "String") {
    dialog.value.form.headers[hdIndex].value = String(value).replace(/`/g, "");
  } else {
    dialog.value.form.headers[hdIndex].value = window[dialog.value.form.headers[hdIndex].type](
      String(value).replace(/`/g, ""),
    );
  }
};
/**
 * 改变类型时，切换请求参数支持表达式的字符串方式
 * @param type
 * @param {String} type 选择的类型
 * @param {Number} pmIndex 数据的下标
 */
const handleChangeParamType = (type, pmIndex) => {
  let value = dialog.value.form.params[pmIndex].value;
  if (type === "VarFx") {
    dialog.value.form.params[pmIndex].value = `\`${value}\``;
  } else if (type === "String") {
    dialog.value.form.params[pmIndex].value = String(value).replace(/`/g, "");
  } else {
    dialog.value.form.params[pmIndex].value = window[dialog.value.form.params[pmIndex].type](
      String(value).replace(/`/g, ""),
    );
  }
};
/**
 * 改变类型时，切换请求数据支持表达式的字符串方式
 * @param type
 * @param {String} type 选择的类型
 * @param {Number} dtIndex 数据的下标
 */
const handleChangeDataType = (type, dtIndex) => {
  let value = dialog.value.form.data[dtIndex].value;
  if (type === "VarFx") {
    dialog.value.form.data[dtIndex].value = `\`${value}\``;
  } else if (type === "String") {
    dialog.value.form.data[dtIndex].value = String(value).replace(/`/g, "");
  } else {
    dialog.value.form.data[dtIndex].value = window[dialog.value.form.data[dtIndex].type](
      String(value).replace(/`/g, ""),
    );
  }
};
/**
 * 保存
 */
const handleSave = () => {
  if (!dataSourceFormRef.value) return;
  dataSourceFormRef.value.validate((valid) => {
    if (valid) {
      // 添加
      if (dialog.value.type === "add") {
        // 校验是否已经存在数据源名称
        let hasDataSourceName = (dataSources.value || []).some((v, i) => v.name === dialog.value.form.name);
        if (hasDataSourceName) {
          ElMessage({
            type: "error",
            message: "已经存在数据源名称",
          });
          return;
        }
        dialog.value.form.id = getGenerateId("data-source"); // 生成数据源id
        dataSources.value.push(dialog.value.form);
      }
      // 修改
      if (dialog.value.type === "edit") {
        dataSources.value[dialog.value.dataSourceIndex] = dialog.value.form;
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

// 操作请求头
/**
 * 新增请求头
 */
const handleAddHeaders = () => {
  dialog.value.form.headers.push({ name: "", type: "String", value: "" });
};
/**
 * 删除请求头
 */
const handleRemoveHeaders = (hdIndex) => {
  dialog.value.form.headers.splice(hdIndex, 1);
};

// 操作请求参数
/**
 * 新增请求参数
 */
const handleAddParams = () => {
  dialog.value.form.params.push({ name: "", type: "String", value: "" });
};
/**
 * 删除请求参数
 */
const handleRemoveParams = (pmIndex) => {
  dialog.value.form.params.splice(pmIndex, 1);
};

// 操作发送数据
/**
 * 新增发送数据
 */
const handleAddData = () => {
  dialog.value.form.data.push({ name: "", type: "String", value: "" });
};
/**
 * 删除发送数据
 */
const handleRemoveData = (dtIndex) => {
  dialog.value.form.data.splice(dtIndex, 1);
};
</script>
<style lang="scss" scoped>
.data-sources-container {
  margin-top: var(--cmp-margin);

  // 重新定义数据源卡片样式
  :deep(.data-sources-card) {
    background: var(--primary-color);
    border-radius: var(--fill-light-color);
    border: solid 1px var(--fill-light-color);
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
        border: solid 1px var(--primary-color);
        border-bottom: 0;

        .data-sources-item {
          display: flex;
          border-bottom: solid 1px var(--primary-color);

          .data-sources-item-title {
            width: 60px;
            flex-shrink: 0;
            padding: var(--sp4) var(--sp8);
            background: var(--primary-color);
            border-right: solid 1px var(--primary-color);
            color: var(--text-desc-color);
          }

          .data-sources-item-content {
            flex: 1;
            word-wrap: break-word;
            word-break: break-all;
            color: var(--text-content-color);
            padding: var(--sp4) var(--sp8);
          }
        }
      }
    }
  }
}
</style>
