<template>
  <div class="global-container">
    <el-form :label-width="100" label-position="left" class="custom-form" size="small">
      <el-form-item label="全局组件大小">
        <el-input placeholder="请输入" />
      </el-form-item>
      <el-form-item label="表单标签位置">
        <el-input placeholder="请输入" />
      </el-form-item>
      <el-form-item label="表单标签宽度">
        <el-input placeholder="请输入" />
      </el-form-item>
      <el-form-item label="主题样式">
        <el-select placeholder="请输入" />
      </el-form-item>
      <el-form-item label="全局CSS">
        <el-button type="primary" plain icon="Edit" @click="handleClick(event, eventIndex)">编辑</el-button>
      </el-form-item>
      <el-form-item label="全局变量">
        <el-button type="primary" plain icon="Edit" @click="handleClick(event, eventIndex)">编辑</el-button>
      </el-form-item>
      <el-form-item label="全局函数">
        <el-button type="primary" plain icon="Edit" @click="handleClick(event, eventIndex)">编辑</el-button>
      </el-form-item>
      <el-form-item label="全局事件">
        <el-button type="primary" plain icon="Edit" @click="handleClick(event, eventIndex)">编辑</el-button>
      </el-form-item>
      <el-form-item label="全局动作">
        <el-button type="primary" plain icon="Edit" @click="handleClick(event, eventIndex)">编辑</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.global-container {
  margin-top: var(--cmp-margin);
}
</style>
