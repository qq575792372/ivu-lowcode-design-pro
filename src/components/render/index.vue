<template>
  <component :is="render" class="render" />
</template>
<script setup>
import { shallowRef } from "vue";
import useRender from "@/hooks/render";

defineOptions({
  name: "Render",
});

// props
const props = defineProps({
  data: { type: Object, default: () => ({}) },
});

// 使用预览渲染的hooks
const render = shallowRef(null);
render.value = useRender({ props });
</script>
<style scoped lang="scss"></style>
