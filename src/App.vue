<template>
  <div id="app">
    <Layout :designer="designer" />
  </div>
</template>

<script setup>
import { reactive, getCurrentInstance } from "vue";
import { createDesigner } from "@/components/designer/designer";
import Layout from "@/layout/index.vue";

// 创建设计器，并初始化
const { proxy } = getCurrentInstance();
const designer = reactive(createDesigner(proxy));
// 调用初始化设计器的方法
designer.initDesigner();
</script>
