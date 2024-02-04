<template>
  <div class="props-wrapper">
    <el-form>
      <el-form-item label="ID">
        <!--{{ props.widget.id }}-->
      </el-form-item>
    </el-form>
    test
  </div>
</template>
<script setup>
// props
const props = defineProps({
  designer: { type: Object, default: () => ({}) },
  widget: { type: Object, default: () => ({}) },
});
</script>
<style lang="scss" scoped></style>
