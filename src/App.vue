<template>
  <div id="app">
    <Layout :designer="designer" />
  </div>
</template>

<script setup>
import { reactive, getCurrentInstance } from "vue";
import { createDesigner } from "@/components/designer/designer";
import Layout from "@/layout/index.vue";

// 创建设计器
const { proxy } = getCurrentInstance();
const designer = reactive(createDesigner(proxy));
</script>
