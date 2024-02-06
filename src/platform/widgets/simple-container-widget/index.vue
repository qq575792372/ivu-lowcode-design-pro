<template>
  <!--容器的用法-->
  <div class="simple-container-widget-wrapper">
    aaa
    <slot />
  </div>
</template>
<script setup>
defineOptions({
  name: "SimpleContainerWidget",
});

// props
const props = defineProps({
  designer: { type: Object, default: () => ({}) },
  widget: { type: Object, default: () => ({}) },
  parentWidget: { type: Object, default: () => ({}) },
  parentWidgets: { type: Array, default: () => [] },
  indexOfParentWidgets: { type: Number, default: null },
});
</script>
<style lang="scss" scoped></style>
