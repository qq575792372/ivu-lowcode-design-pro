<template>
  <component :is="render" class="render" />
</template>
<script setup>
import { onMounted, shallowRef } from "vue";
import useComponentRender from "./component-render";

defineOptions({
  name: "Render",
});

// props
const props = defineProps({
  data: { type: Object, default: () => ({}) },
});

const render = shallowRef(null);
render.value = useComponentRender({ props });

onMounted(() => {});
</script>
<style scoped lang="scss"></style>
