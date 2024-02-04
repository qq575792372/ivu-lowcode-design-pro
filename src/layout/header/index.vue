<template>
  <div class="header-title">
    <img src="../../assets/images/logo.png" />
    <span class="title">低代码设计平台</span>
  </div>
  <Tools :designer />
</template>
<script setup>
import Tools from "@/components/designer/tools/index.vue";

const props = defineProps({
  designer: { type: Object, default: () => ({}) },
});
</script>
<style lang="scss" scoped>
.header-title {
  font-size: var(--font-size-18);

  .title {
    font-weight: bold;
    margin-left: 12px;
  }

  img {
    height: 40px;
    vertical-align: middle;
  }
}
</style>
