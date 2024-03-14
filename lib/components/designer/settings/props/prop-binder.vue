<template>
  <!--属性绑定的组件，在这里双向绑定自定义属性的值，以及执行的变量，表达式等-->
  <div class="prop-binder-wrapper">
    <component
      :is="props.item.componentName"
      v-model="props.widget.props[props.item.name]"
      :item="props.item"
      :designer
      :widget
      class="prop-editor"
    />
    <el-button class="prop-fx" type="text" text plain @click="showDialog">ƒx</el-button>
  </div>

  <!--绑定属性弹框-->
  <el-dialog
    v-if="dialog.visible"
    v-model="dialog.visible"
    :title="dialog.title"
    append-to-body
    draggable
    class="prop-binder-dialog"
    width="980px"
    :close-on-click-modal="false"
  >
    {{ globalConfig.globalVars }}
    <div class="binder-content">
      <div class="binder-editor">
        <el-alert type="warning" :closable="false">
          <div>1.从右侧选择绑定的表达式到左侧，解析器会自动计算表达式的结果。</div>
          <div>2.也可以在代码编辑器中输入字符串或者表达式，点击执行按钮，解析器会自动计算结果。</div>
          <div>3.当前绑定的全局变量、全局函数、数据源只会绑定表达式，在预览渲染时候才真正起作用。</div>
        </el-alert>
        <div class="binder-editor-code">
          <CodeEditor v-model="dialog.bindValue" lang="html" height="240px" />
          <el-button type="success" icon="CaretRight" @click="executeBindValue">执行</el-button>
        </div>

        <div class="binder-editor-result">
          <div class="binder-editor-result-title">
            <el-icon v-if="dialog.bingErrorMsg" class="error-color margin-right-4" :size="18">
              <CircleCloseFilled />
            </el-icon>
            <el-icon v-else class="success-color margin-right-4" :size="18">
              <CircleCheckFilled />
            </el-icon>
            当前运行结果预览
          </div>
          <div v-loading="dialog.bindResultLoading" class="binder-editor-result-value">
            <span v-if="dialog.bingErrorMsg" class="error-color">dd{{ dialog.bingErrorMsg }}</span>
            <span v-else class="success-color">{{ dialog.bindResult }}</span>
          </div>
        </div>
      </div>
      <div class="binder-data">
        <el-scrollbar>
          <el-collapse v-model="activeNames">
            <el-collapse-item name="globalVars">
              <template #title>
                <span class="text-title-color">全局变量</span>
                <span class="text-disabled-color">（$globalVars）</span>
              </template>
              <el-tree
                ref="globalVarsRef"
                :data="globalVars"
                highlight-current
                :expand-on-click-node="false"
                @node-click="handleNodeClick('$globalVars', $event)"
              >
                <template #default="{ node, data }">
                  <span class="text-content-color">{{ data.label }}</span>
                  <span class="text-disabled-color">（{{ data.desc }}）</span>
                </template>
              </el-tree>
            </el-collapse-item>
            <el-collapse-item name="globalFns">
              <template #title>
                <span class="text-title-color">全局函数</span>
                <span class="text-disabled-color">（$globalFns）</span>
              </template>
              <el-tree
                ref="globalFnsRef"
                :data="globalFns"
                highlight-current
                :expand-on-click-node="false"
                @node-click="handleNodeClick('$globalFns', $event)"
              >
                <template #default="{ node, data }">
                  <span class="text-content-color">{{ data.label }}</span>
                  <span class="text-disabled-color">（{{ data.desc }}）</span>
                </template>
              </el-tree>
            </el-collapse-item>
            <el-collapse-item name="dataSources">
              <template #title>
                <span class="text-title-color">数据源</span>
                <span class="text-disabled-color">（$dataSources）</span>
              </template>
              <el-tree
                ref="dataSourcesRef"
                :data="dataSources"
                highlight-current
                :expand-on-click-node="false"
                @node-click="handleNodeClick('$dataSources', $event)"
              >
                <template #default="{ node, data }">
                  <span class="text-content-color">{{ data.label }}</span>
                  <span class="text-disabled-color">（{{ data.desc }}）</span>
                </template>
              </el-tree>
            </el-collapse-item>
          </el-collapse>
        </el-scrollbar>
      </div>
    </div>
    <template #footer>
      <div class="text-align-center">
        <el-button type="primary" @click="handleSure">确定</el-button>
        <el-button @click="dialog.visible = false">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, watch, computed } from "vue";
import { isObject } from "@lime-util/util";
import useWidget from "@/hooks/widget";
import { ElMessage } from "element-plus";
import CodeEditor from "@/components/code-editor/index.vue";

defineOptions({ name: "PropBinder" });

// props
const props = defineProps({
  designer: { type: Object, default: () => ({}) },
  globalConfig: { type: Object, default: null },
  widget: { type: Object, default: () => ({}) },
  item: { type: Object, default: () => ({}) },
});

const { getPropValue } = useWidget({ props });

// 绑定变量弹框
const dialog = ref({
  visible: false,
  bindValue: "", // 绑定表达式的值
  bindResult: "", // 绑定表达式运行的结果
  bindResultLoading: false, // 执行表达式运行的loading
  bingErrorMsg: "", // 绑定表达式运行错误信息
});

// 打开的标签页
const activeNames = ref(["globalVars", "globalFns", "dataSources"]);

// 展示弹框
const showDialog = () => {
  dialog.value.visible = true;
  dialog.value.bindResultLoading = false;
  dialog.value.title = props.item.label;
};

/* 全局变量 */
// 将全局变量中的对象格式化为el-tree需要的数据
const formatGlobalVars = (data, parentPath) => {
  let res = [];
  for (let key in data) {
    let currentParentPath = parentPath ? `${parentPath}.${key}` : `${key}`;
    let temp = { label: key, value: currentParentPath, desc: currentParentPath };
    // 判断是对象，则继续遍历找下去
    if (isObject(data[key])) {
      temp.children = formatGlobalVars(data[key], currentParentPath);
    }
    // 判断是其他，则直接赋值
    res.push(temp);
  }

  return res;
};
const globalVars = computed(() => {
  return formatGlobalVars(props.globalConfig.globalVars);
});

/* 全局函数 */
const globalFns = computed(() => {
  // 转为树形结构
  return props.globalConfig.globalFns.map((v) => {
    return {
      label: v.name,
      value: v.name,
      desc: v.label,
    };
  });
});

/* 数据源 */
const dataSources = computed(() => {
  // 转为树形结构
  return props.globalConfig.dataSources.map((v) => {
    return {
      label: v.name,
      value: v.name,
      desc: v.title,
    };
  });
});

// 右侧绑定的节点点击事件
const handleNodeClick = (type, data) => {
  dialog.value.bindValue = `${type}.${data.value}`;
  // 执行属性绑定值
  executeBindValue();
};

// 执行属性绑定值
const executeBindValue = async () => {
  try {
    dialog.value.bindResultLoading = true;
    let bindResult = getPropValue.bind(props.designer.vueInstance)(dialog.value.bindValue);
    // 如果绑定的是数据源，则加loading等待效果
    if (dialog.value.bindValue.includes("$dataSources")) {
      watch(
        () => bindResult,
        () => {
          dialog.value.bindResult = bindResult;
          dialog.value.bindResultLoading = false;
        },
        { deep: true },
      );
    } else {
      dialog.value.bindResult = bindResult;
      dialog.value.bindResultLoading = false;
    }

    dialog.value.bingErrorMsg = "";
  } catch (error) {
    dialog.value.bingErrorMsg = error;
    dialog.value.bindResult = "";
    dialog.value.bindResultLoading = false;
    ElMessage({
      type: "error",
      message: "运行结果错误，请重新尝试",
    });
  }
};

// 绑定确定
const handleSure = () => {
  if (dialog.value.bingErrorMsg) {
    ElMessage({
      type: "error",
      message: "运行结果错误，请重新尝试",
    });
    return;
  }
  props.widget.props[props.item.name] = dialog.value.bindValue;
  dialog.value.visible = false;
};
</script>
<style scoped lang="scss">
.prop-binder-wrapper {
  display: flex;

  .prop-editor {
    flex: 1;
    margin-right: var(--sp4);
  }

  .prop-fx {
    margin-left: auto;
  }
}
</style>
