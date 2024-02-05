<template>
  <div class="folded-panel-container">
    <div class="folded-panel-content">
      <slot />
    </div>
    <div class="folded-panel-icon" @click.stop="handleChangeFolded">
      <svg-icon :name="iconClass" />
    </div>
  </div>
</template>
<script setup>
import { ref, computed, defineProps, defineEmits } from "vue";

const props = defineProps({
  direction: {
    type: String,
    default: "left",
  },
});
const emit = defineEmits(["change-folded"]);
let isFolded = ref(false);
const iconClass = computed(() => {
  return props.direction === "left"
    ? isFolded.value
      ? "fold_right"
      : "fold_left"
    : isFolded.value
      ? "fold_left"
      : "fold_right";
});

const handleChangeFolded = () => {
  isFolded.value = !isFolded.value;
  emit("change-folded");
};
</script>
<style scoped lang="scss">
.folded-panel-container {
  position: relative;
  display: flex;
  height: 100%;
  min-height: inherit;
  overflow: hidden;
  box-sizing: border-box;

  // 已收缩
  &.folded {
    width: 24px !important;
    overflow: hidden;

    &::after {
      width: 0;
    }

    .folded-pane-content {
      display: none;
    }

    .folded-pane-icon {
      left: 0;
    }
  }

  // 收缩方向
  &.right {
    flex-direction: row-reverse;

    &::after {
      left: 0;
    }

    .folded-pane-content {
      padding-right: 0;
    }

    &.folded {
      .folded-pane-icon {
        left: 0;
      }
    }
  }

  // 内容
  .folded-panel-content {
    flex: 1;
    height: 100%;
    min-height: 100%;
    min-width: 24px;
  }

  // 图标
  .folded-panel-icon {
    position: relative;

    .svg-icon {
      position: relative;
      height: 66px;
      width: 14px;
      cursor: pointer;
      top: 50%;
      margin: 0;
      padding: 0;
      transform: translateY(-50%);
    }
  }
}
</style>
