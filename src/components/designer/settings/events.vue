<template>
  <div class="events-container">
    <el-collapse-item title="事件" name="events">
      <template v-if="props.widget.events.length">
        <el-form-item
          v-for="(event, eventIndex) in props.widget.events"
          :key="eventIndex"
          :label="event.name"
          class="events-wrapper clearfix"
        >
          <el-button type="primary" plain icon="Edit" @click="handleClick(event, eventIndex)">编辑</el-button>
        </el-form-item>
      </template>
      <template v-else>
        <div class="events-wrapper no-events">暂无事件</div>
      </template>
    </el-collapse-item>
  </div>

  <el-dialog
    v-if="dialog.visible"
    v-model="dialog.visible"
    title="绑定"
    append-to-body
    draggable
    width="960px"
    :close-on-click-modal="false"
  >
    <el-tabs v-model="boundActiveNames" type="border-card">
      <el-tab-pane label="事件" name="events">
        <el-alert type="info" :closable="false">
          {{ props.widget.props.name }}.{{ props.widget.events[dialog.eventIndex].name }}&nbsp;({{
            props.widget.events[dialog.eventIndex].args && props.widget.events[dialog.eventIndex].args.join(",")
          }})&nbsp;{
        </el-alert>
        <CodeEditor v-model="dialog.eventCode" />
        <el-alert type="info" :closable="false">}</el-alert>
      </el-tab-pane>
      <el-tab-pane label="动作" name="actions">
        <el-checkbox-group v-model="dialog.eventActions">
          <el-checkbox v-for="(action, actionIndex) in allActionList" :key="actionIndex" :label="action.name" border>
            <el-tag v-if="action.global">全局</el-tag>
            {{ action.label }}
          </el-checkbox>
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
import useActions from "@/hooks/actions";
import { ElMessage } from "element-plus";
import CodeEditor from "@/components/code-editor/index.vue";

defineOptions({ name: "Props" });

// props
const props = defineProps({
  designer: { type: Object, default: () => ({}) },
  widget: { type: Object, default: () => ({}) },
});

// 获取组件动作的hooks
const { allActionList } = useActions({ props });

// 绑定tab的名称，默认是events事件
const boundActiveNames = ref("events");

// 弹框
const dialog = ref({
  visible: false,
  eventIndex: null,
  eventCode: null,
  eventActions: [],
});

/**
 * 弹出绑定弹框
 */
const handleClick = (event, eventIndex) => {
  dialog.value.visible = true;
  dialog.value.event = event;
  dialog.value.eventIndex = eventIndex;
  dialog.value.eventCode = event.code;
  dialog.value.eventActions = event.action;
};

/**
 * 确认
 */
const handleSure = () => {
  props.widget.events[dialog.value.eventIndex].code = dialog.value.eventCode;
  props.widget.events[dialog.value.eventIndex].action = dialog.value.eventActions;
  dialog.value.visible = false;
  ElMessage({
    type: "success",
    message: "操作成功",
  });
};
</script>
<style lang="scss" scoped>
.events-container {
  .events-wrapper {
    &.no-events {
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
