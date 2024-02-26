<template>
  <!--属性绑定的组件，在这里双向绑定自定义属性的值，以及执行的变量，表达式等-->
  <div class="props-binder-wrapper">
    <component
      :is="props.item.componentName"
      v-model="props.widget.props[props.item.name]"
      :item="props.item"
      :designer
      :widget
      class="props-editor"
    />
    <el-button class="props-fx" type="text" text plain @click="handleClick">ƒx</el-button>
  </div>

  <!--绑定变量和表达式-->
  <el-dialog
    v-if="dialog.visible"
    v-model="dialog.visible"
    :title="dialog.title"
    append-to-body
    draggable
    class="props-binder-dialog"
    width="940px"
    :close-on-click-modal="false"
  >
    <div class="binder-content">
      <div class="binder-editor">
        <el-alert type="warning" :closable="false">
          从右侧选择绑定的表达式到左侧，绑定的属性会自动解析表达式的值。
        </el-alert>
        <CodeEditor v-model="dialog.bindValue" lang="html" height="240px" />
        <div class="binder-editor-result">
          <div class="binder-editor-result-title">
            <el-icon class="success-color margin-right-4" :size="18">
              <CircleCheckFilled />
            </el-icon>
            当前运行结果
          </div>
          <div class="binder-editor-result-value">{{ dialog.bindResult }}</div>
        </div>
      </div>
      <div class="binder-data">
        <el-scrollbar>
          <el-collapse v-model="activeNames">
            <el-collapse-item title="全局变量（$globalVars）" name="globalVars">
              <el-tree
                ref="globalVarsRef"
                :data="globalVars"
                highlight-current
                :expand-on-click-node="false"
                @node-click="handleNodeClick('$globalVars', $event)"
              >
                <template #default="{ node, data }">
                  {{ data.label }}
                  <span class="text-desc-color">（{{ data.desc }}）</span>
                </template>
              </el-tree>
            </el-collapse-item>
            <el-collapse-item title="全局函数（$globalFns）" name="globalFns">
              <el-tree
                ref="globalFnsRef"
                :data="globalFns"
                highlight-current
                :expand-on-click-node="false"
                @node-click="handleNodeClick('$globalFns', $event)"
              >
                <template #default="{ node, data }">
                  {{ data.label }}
                  <span class="text-desc-color">（{{ data.desc }}）</span>
                </template>
              </el-tree>
            </el-collapse-item>
            <el-collapse-item title="数据源（$dataSources）" name="dataSources">
              <el-tree
                ref="dataSourcesRef"
                :data="dataSources"
                highlight-current
                :expand-on-click-node="false"
                @node-click="handleNodeClick('$dataSources', $event)"
              >
                <template #default="{ node, data }">
                  {{ data.label }}
                  <span class="text-desc-color">（{{ data.desc }}）</span>
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
import { ref, toRef, computed } from "vue";
import { isObject, isArray } from "@lime-util/util";
import useProps from "@/hooks/props";
import CodeEditor from "@/components/code-editor/index.vue";

defineOptions({ name: "PropsBinder" });
// props
const props = defineProps({
  designer: { type: Object, default: () => ({}) },
  widget: { type: Object, default: () => ({}) },
  item: { type: Object, default: () => ({}) },
});

const { getPropResult } = useProps({ props });

// 绑定变量弹框
const dialog = ref({
  visible: false,
  bindValue: "", // 绑定表达式值
  bindResult: "", // 绑定值运行的结果
});

// 打开的标签页
const activeNames = ref(["globalVars", "globalFns", "dataSources"]);

// 全局变量
/*
{
  "unitOid": 12,
  "unitName": "单位111111",
  "deptOid": 13,
  "deptName": "机构1",
  "personInfo": {
    "userId": 12,
    "userName": "小明",
    "age": 20,
    "test1": {
      "test1Id": 1,
      "test1Name": "ddd"
    },
    "test2": [{ "id": 1, "name": "2" }]
  },
  "tableData": [
    {
      "id": 1,
      "name": "test1"
    },
    {
      "id": 2,
      "name": "test2"
    }
  ]
}
 */
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
  return formatGlobalVars(props.designer.widgetConfig.globalVars);
});

// 全局函数
const globalFns = computed(() => {
  // 转为树形结构
  return props.designer.widgetConfig.globalFns.map((v) => {
    return {
      label: v.name,
      value: v.name,
      desc: v.label,
    };
  });
});

// 数据源
const dataSources = computed(() => {
  // 转为树形结构
  return props.designer.widgetConfig.dataSources.map((v) => {
    return {
      label: v.name,
      value: v.name,
      desc: v.title,
    };
  });
});

// 弹框绑定
const handleClick = () => {
  dialog.value.visible = true;
  dialog.value.title = props.item.label;
};

/**
 * 右侧绑定的节点点击事件
 * @param type 类型
 * @param data 点击的数据
 */
const handleNodeClick = (type, data) => {
  dialog.value.bindValue = `${type}.${data.value}`;
  dialog.value.bindResult = getPropResult(dialog.value.bindValue);
};

// 确定
const handleSure = () => {
  props.widget.props[props.item.name] = dialog.value.bindValue;
  dialog.value.visible = false;
};
</script>
<style scoped lang="scss">
.props-binder-wrapper {
  display: flex;

  .props-editor {
    flex: 1;
    margin-right: var(--sp4);
  }

  .props-fx {
    margin-left: auto;
  }
}
</style>
