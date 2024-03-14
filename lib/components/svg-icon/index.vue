<template>
  <svg aria-hidden="true" :class="['svg-icon', `svg-icon-${props.name}`]" v-bind="{ ...iconStyle }" v-on="$attrs">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  // svg图标名称
  name: {
    type: String,
    required: true,
  },
  // svg图标颜色
  color: {
    type: String,
    default: "currentColor",
  },
  // svg图标尺寸大小
  size: {
    type: String,
    default: "1em",
  },
});

// icon样式
const iconStyle = computed(() => {
  return {
    width: props.size,
    height: props.size,
    fill: props.color,
  };
});

// icon名称
const iconName = computed(() => {
  return `#svg-icon-${props.name}`;
});
</script>
<style lang="scss" scoped>
.svg-icon {
  vertical-align: -0.15em;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
