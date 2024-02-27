<template>
  <div>
    <el-button :class="className" @click="handleClick">{{ value }}</el-button>
  </div>
</template>
<script setup>
import { ref } from "vue";
import useEvents from "@/hooks/events";
import useProps from "@/hooks/props";
import useDataSources from "@/hooks/data-sources";

defineOptions({
  name: "ButtonWidget",
});

// props
const props = defineProps({
  designer: { type: Object, default: () => null },
  widget: { type: Object, default: () => null },
  parentWidget: { type: Object, default: () => null },
  parentWidgets: { type: Array, default: () => [] },
  indexOfParentWidgets: { type: Number, default: null },
});

/* 使用hooks */
// 获取组件事件的hooks
const { executeEvent, executeEventAction } = useEvents({ props });
// 获得组件属性的hooks
const { getPropValue } = useProps({ props });
// 获得数据源的hooks
const { requestData } = useDataSources({ props });

/* 获取组件属性的值 */
let className = ref(getPropValue("className"));
let value = ref(getPropValue("value"));

/**
 * 点击事件
 */
const handleClick = async () => {
  const res = await requestData("getList", { myId: "myId1234" });
  console.log("点击手动获取到数据源", res);

  // 执行元素的事件
  executeEvent(props.widget, "onClick");
  // 执行元素事件绑定的动作
  executeEventAction(props.widget, "onClick");
};
</script>
<style lang="scss" scoped></style>
