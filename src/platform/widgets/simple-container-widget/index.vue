<template>
  <div class="simple-container-widget-wrapper">
    <slot />
  </div>
</template>
<script setup>
defineOptions({
  name: "SimpleContainerWidget",
});

// props
const props = defineProps({
  designer: { type: Object, default: () => null },
  widget: { type: Object, default: () => null },
  parentWidget: { type: Object, default: () => null },
  parentWidgets: { type: Array, default: () => [] },
  indexOfParentWidgets: { type: Number, default: null },
});
</script>
<style lang="scss" scoped>
.simple-container-widget-wrapper {
  backface-visibility: hidden;
}
</style>
