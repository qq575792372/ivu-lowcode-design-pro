<template>
  <div id="app">
    <div class="text-success">{{ msg }}</div>
    <el-button type="primary" @click="handleClick"><span>测试</span></el-button>
    <el-input v-model="msg" placeholder="输入内容" style="width: 200px; margin-left: 20px" />
  </div>
</template>

<script setup></script>
