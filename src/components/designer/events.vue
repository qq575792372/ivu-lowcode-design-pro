<template>
  <div class="events-container">
    <el-collapse-item title="事件" name="events">
      <el-form-item v-for="(event, eventIndex) in props.widget.events" :key="eventIndex" :label="event.name">
        <el-button type="primary" plain icon="Edit" @click="handleClick(event, eventIndex)">编辑</el-button>
        {{ event.code }}
      </el-form-item>
    </el-collapse-item>
  </div>

  <el-dialog
    v-if="dialog.visible"
    v-model="dialog.visible"
    title="预览"
    append-to-body
    draggable
    :close-on-click-modal="false"
  >
    <el-alert type="info" :closable="false">
      {{ props.widget.props.name }}.{{ dialog.event.name }}&nbsp;({{ dialog.event.args.join(",") }})&nbsp;{
    </el-alert>
    <CodeEditor v-model="dialog.jsonData" />
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
import CodeEditor from "@/components/code-editor/index.vue";

defineOptions({ name: "Props" });

// props
const props = defineProps({
  designer: { type: Object, default: () => ({}) },
  widget: { type: Object, default: () => ({}) },
});

// 声明弹框
const dialog = ref({
  visible: false,
  event: null,
  eventIndex: null,
  jsonData: null,
});

/**
 * 编辑代码弹框
 */
const handleClick = (event, eventIndex) => {
  dialog.value.visible = true;
  dialog.value.event = event;
  dialog.value.eventIndex = eventIndex;
  dialog.value.jsonData = event.code;
};

/**
 * 确认
 */
const handleSure = () => {
  dialog.value.event.code = dialog.value.jsonData;
  props.widget.events[dialog.value.eventIndex].code = dialog.value.jsonData;
  dialog.value.visible = false;
};
</script>
<style lang="scss" scoped>
.events-container {
}
</style>
