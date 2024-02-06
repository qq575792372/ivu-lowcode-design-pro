<template>
  <el-button icon="View" @click="handleClick">预览</el-button>
  <el-dialog
    v-if="dialog.visible"
    v-model="dialog.visible"
    title="预览"
    append-to-body
    draggable
    fullscreen
    :close-on-click-modal="false"
  >
    <Render :data="dialog.data" :designer />
    <template #footer>
      <div class="text-align-center">
        <el-button @click="dialog.visible = false">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { computed, reactive, ref, watch } from "vue";
import { cloneDeep } from "@lime-util/util";
import Render from "@/components/render/index.vue";

// props
const props = defineProps({
  designer: { type: Object, default: () => ({}) },
});

// 声明弹框
const dialog = ref({
  visible: false,
  data: [],
});

/**
 * 点击
 */
const handleClick = () => {
  dialog.value.visible = true;
  dialog.value.data = cloneDeep({ widgets: props.designer.widgets, widgetConfig: props.designer.widgetConfig });
  console.log(111, dialog.value.data);
};
</script>
<style lang="scss" scoped></style>
