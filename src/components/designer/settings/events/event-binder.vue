<template>
  <el-form-item :label="item.label" class="events-wrapper clearfix">
    <el-button type="primary" :plain="!(item.code || item.action.length)" icon="Edit" @click="handleClick">
      编辑
    </el-button>
  </el-form-item>

  <!--绑定事件弹框-->
  <el-dialog
    v-if="dialog.visible"
    v-model="dialog.visible"
    title="绑定"
    append-to-body
    draggable
    width="960px"
    :close-on-click-modal="false"
  >
    {{ dialog.eventActions }}
    <el-alert type="warning" :closable="false">组件的事件是可以同时绑定自定义事件代码和动作，两者都会执行。</el-alert>
    <el-tabs v-model="boundActiveNames" type="border-card">
      <el-tab-pane label="事件" name="events">
        <el-alert type="info" :closable="false">
          {{ props.widget.props.name }}.{{ props.item.name }}&nbsp;({{
            props.item.args && props.item.args.join(",")
          }})&nbsp;{
        </el-alert>
        <CodeEditor v-model="dialog.eventCode" />
        <el-alert type="info" :closable="false">}</el-alert>
      </el-tab-pane>
      <el-tab-pane label="动作" name="actions">
        <el-checkbox-group v-model="dialog.eventActions">
          <el-collapse v-model="actionActionNames">
            <el-collapse-item v-for="(acMap, acIndex) of allActionMap" :key="acMap.name" :name="acMap.name">
              <template #title>{{ acMap.label }}（{{ acMap.name }}）</template>
              <el-checkbox
                v-for="(action, actionIndex) in acMap.actions"
                :key="actionIndex"
                :label="action.value"
                border
              >
                {{ action.label }}
              </el-checkbox>
            </el-collapse-item>
          </el-collapse>
        </el-checkbox-group>
      </el-tab-pane>
    </el-tabs>

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
import { ElMessage } from "element-plus";
import useWidget from "@/hooks/widget";
import useGlobal from "@/hooks/global";
import CodeEditor from "@/components/code-editor/index.vue";

defineOptions({ name: "EventBinder" });

// props
const props = defineProps({
  designer: { type: Object, default: () => ({}) },
  globalConfig: { type: Object, default: null },
  widget: { type: Object, default: () => ({}) },
  item: { type: Object, default: () => ({}) },
});

// 使用全局的hooks
const { getFlatWidgets } = useGlobal({ props });

// 弹框
const dialog = ref({
  visible: false,
  eventCode: null,
  eventActions: [],
});

// 绑定tab的名称，默认是events事件
const boundActiveNames = ref("events");

// 绑定的动作collapse名称
const actionActionNames = ref(["$globalActions"]);

// 获取要绑定的动作集合，包含全局和每个组件的
const allActionMap = computed(() => {
  // 组装数据
  let actionMap = {
    global: {
      name: "$globalActions",
      label: "全局动作",
      actions: props.globalConfig.globalActions.map((v) => {
        return {
          ...v,
          value: `$globalActions.${v.name}`,
        };
      }),
    },
  };
  for (let item of getFlatWidgets()) {
    if (item.actions && item.actions.length > 0) {
      actionMap[item.id] = {
        name: item.id,
        label: item.label,
        actions: item.actions.map((v) => {
          return {
            ...v,
            value: `${item.id}.${v.name}`,
          };
        }),
      };
      actionActionNames.value.push(item.id);
    }
  }
  return actionMap;
});

/**
 * 弹出绑定弹框
 */
const handleClick = () => {
  dialog.value.visible = true;
  // 获得当前绑定的事件
  let form = { ...props.item };
  dialog.value.event = form;
  dialog.value.eventCode = form.code;
  dialog.value.eventActions = form.action;
};

/**
 * 确认
 */
const handleSure = () => {
  props.item.code = dialog.value.eventCode;
  props.item.action = dialog.value.eventActions;
  dialog.value.visible = false;
  ElMessage({
    type: "success",
    message: "操作成功",
  });
};
</script>
<style scoped lang="scss"></style>
