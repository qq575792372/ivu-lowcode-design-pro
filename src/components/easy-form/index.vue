<template>
  <div class="easy-form-wrapper">
    <slot />
    ivu-lowcode easy-form
  </div>
</template>
<script setup>
import useDataSources from "@/hooks/data-sources.js";

defineOptions({ name: "EasyForm" });
const props = defineProps({});
const { requestData } = useDataSources({ props });
console.log("requestData", requestData);
</script>
<style scoped lang="scss"></style>
