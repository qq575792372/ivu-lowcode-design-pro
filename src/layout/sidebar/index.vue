<template>
  <div class="sidebar-container">
    <el-tabs v-model="activeLibName" class="custom-tabs">
      <el-tab-pane label="组件库" name="components" class="components">
        <el-scrollbar>
          <el-collapse v-model="activeComponentNames" class="custom-collapse">
            <el-collapse-item title="基础组件" name="base">
              <div class="module">
                <el-collapse class="custom-collapse no-bg">
                  <el-collapse-item
                    v-for="(module, moduleIndex) in baseComponentList"
                    :key="moduleIndex"
                    :title="module.label"
                    :name="module.name"
                  >
                    <!--组件元素名称-->
                    <template #title>
                      <el-icon :size="16">
                        <component :is="module.icon" />
                      </el-icon>
                      {{ module.label }}
                    </template>
                    <!--拖拽的组件元素-->
                    <VueDraggable
                      v-model="module.children"
                      class="custom-vue-draggable"
                      :group="{ name: 'designer-group', pull: 'clone', put: false }"
                      :clone="onClone"
                      :sort="false"
                    >
                      <div v-for="(widget, widgetIndex) in module.children" :key="widgetIndex" class="draggable-item">
                        <el-tag class="widget-drag-tag">
                          <el-icon :size="16">
                            <component :is="widget.icon" />
                          </el-icon>
                          {{ widget.label }}
                        </el-tag>
                      </div>
                    </VueDraggable>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </el-collapse-item>
            <el-collapse-item title="行业组件" name="industry">
              <el-select
                v-model="industryComponentName"
                placeholder="请选择"
                class="margin-bottom-12"
                @change="handleIndustryComponentChange"
              >
                <el-option label="全部" value="" />
                <el-option
                  v-for="(item, index) in platformComponents.industry"
                  :key="index"
                  :label="item.label"
                  :value="item.name"
                />
              </el-select>
              <div class="module">
                <el-collapse class="custom-collapse no-bg">
                  <el-collapse-item
                    v-for="(module, moduleIndex) in industryComponentList"
                    :key="moduleIndex"
                    :title="module.label"
                    :name="module.name"
                  >
                    <!--组件元素名称-->
                    <template #title>
                      <el-icon :size="16">
                        <component :is="module.icon" />
                      </el-icon>
                      {{ module.label }}
                    </template>
                    <!--拖拽的组件元素-->
                    <VueDraggable
                      v-model="module.children"
                      class="custom-vue-draggable"
                      :group="{ name: 'designer-group', pull: 'clone', put: false }"
                      :clone="onClone"
                      :sort="false"
                    >
                      <div v-for="(widget, widgetIndex) in module.children" :key="widgetIndex" class="draggable-item">
                        <el-tag class="widget-drag-tag">
                          <el-icon :size="16">
                            <component :is="widget.icon" />
                          </el-icon>
                          {{ widget.label }}
                        </el-tag>
                      </div>
                    </VueDraggable>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </el-collapse-item>
            <el-collapse-item title="项目组件" name="project">
              <el-select
                v-model="projectComponentName"
                placeholder="请选择"
                class="margin-bottom-12"
                @change="handleProjectComponentChange"
              >
                <el-option label="全部" value="" />
                <el-option
                  v-for="(item, index) in platformComponents.project"
                  :key="index"
                  :label="item.label"
                  :value="item.name"
                />
              </el-select>
              <div class="module">
                <el-collapse class="custom-collapse no-bg">
                  <el-collapse-item
                    v-for="(module, moduleIndex) in projectComponentList"
                    :key="moduleIndex"
                    :title="module.label"
                    :name="module.name"
                  >
                    <!--组件元素名称-->
                    <template #title>
                      <el-icon>
                        <component :is="module.icon" />
                      </el-icon>
                      {{ module.label }}
                    </template>
                    <!--拖拽的组件元素-->
                    <VueDraggable
                      v-model="module.children"
                      class="custom-vue-draggable"
                      :group="{ name: 'designer-group', pull: 'clone', put: false }"
                      :clone="onClone"
                      :sort="false"
                    >
                      <div v-for="(widget, widgetIndex) in module.children" :key="widgetIndex" class="draggable-item">
                        <el-tag class="widget-drag-tag">
                          <el-icon :size="16">
                            <component :is="widget.icon" />
                          </el-icon>
                          {{ widget.label }}
                        </el-tag>
                      </div>
                    </VueDraggable>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="模板库" name="templates" class="templates">
        <el-scrollbar>
          <el-collapse v-model="activeTemplatesNames" class="custom-collapse">
            <el-collapse-item title="基础模板" name="base">
              <div class="module">
                <el-collapse class="custom-collapse no-bg">
                  <el-collapse-item
                    v-for="(module, moduleIndex) in baseTemplateList"
                    :key="moduleIndex"
                    :title="module.label"
                    :name="module.name"
                  >
                    <!--组件元素名称-->
                    <template #title>
                      <el-icon :size="16">
                        <component :is="module.icon" />
                      </el-icon>
                      {{ module.label }}
                    </template>
                    <!--模板列表-->
                    <div
                      v-for="(template, templateIndex) in module.children"
                      :key="templateIndex"
                      class="template-list"
                    >
                      <el-icon :size="16">
                        <component :is="template.icon" />
                      </el-icon>
                      {{ template.label }}
                      <el-button type="text">使用</el-button>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </el-collapse-item>
            <el-collapse-item title="行业模板" name="industry">
              <el-select
                v-model="industryTemplateName"
                placeholder="请选择"
                class="margin-bottom-12"
                @change="handleIndustryTemplateChange"
              >
                <el-option label="全部" value="" />
                <el-option
                  v-for="(item, index) in platformTemplates.industry"
                  :key="index"
                  :label="item.label"
                  :value="item.name"
                />
              </el-select>
              <div class="module">
                <el-collapse class="custom-collapse no-bg">
                  <el-collapse-item
                    v-for="(module, moduleIndex) in industryTemplateList"
                    :key="moduleIndex"
                    :title="module.label"
                    :name="module.name"
                  >
                    <!--组件元素名称-->
                    <template #title>
                      <el-icon :size="16">
                        <component :is="module.icon" />
                      </el-icon>
                      {{ module.label }}
                    </template>
                    <!--模板列表-->
                    <div
                      v-for="(template, templateIndex) in module.children"
                      :key="templateIndex"
                      class="template-list"
                    >
                      <el-icon :size="16">
                        <component :is="template.icon" />
                      </el-icon>
                      {{ template.label }}
                      <el-button type="text">使用</el-button>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </el-collapse-item>
            <el-collapse-item title="项目模板" name="project">
              <el-select
                v-model="projectTemplateName"
                placeholder="请选择"
                class="margin-bottom-12"
                @change="handleProjectTemplateChange"
              >
                <el-option label="全部" value="" />
                <el-option
                  v-for="(item, index) in platformTemplates.project"
                  :key="index"
                  :label="item.label"
                  :value="item.name"
                />
              </el-select>
              <div class="module">
                <el-collapse class="custom-collapse no-bg">
                  <el-collapse-item
                    v-for="(module, moduleIndex) in projectTemplateList"
                    :key="moduleIndex"
                    :title="module.label"
                    :name="module.name"
                  >
                    <!--组件元素名称-->
                    <template #title>
                      <el-icon :size="16">
                        <component :is="module.icon" />
                      </el-icon>
                      {{ module.label }}
                    </template>
                    <!--模板列表-->
                    <div
                      v-for="(template, templateIndex) in module.children"
                      :key="templateIndex"
                      class="template-list"
                    >
                      <el-icon :size="16">
                        <component :is="template.icon" />
                      </el-icon>
                      {{ template.label }}
                      <el-button type="text">使用</el-button>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup>
import { getUUID } from "@lime-util/util";
import { computed, defineProps, ref, watch, watchEffect } from "vue";
import { usePlatformStore } from "@/store";
import { VueDraggable } from "vue-draggable-plus";

// 定义props
const props = defineProps({
  designer: {
    type: Object,
    default: () => ({}),
  },
});

// 获取到平台的组件库和模板库
const platformStore = new usePlatformStore();
const platformComponents = computed(() => platformStore.getPlatformComponents);
const platformTemplates = computed(() => platformStore.getPlatformTemplates);

// 默认展开的折叠
let activeLibName = "components";
let activeComponentNames = ["base"];
let activeTemplatesNames = ["base"];

/* 组件库 */
// 基础组件
let baseComponentList = platformComponents.value.base;
// 行业组件
let industryComponentList = ref(platformComponents.value.industry);
let industryComponentName = ref("");
let handleIndustryComponentChange = (val) => {
  if (val) {
    industryComponentList.value = platformComponents.value.industry.filter((v) => v.name === val);
  } else {
    industryComponentList.value = platformComponents.value.industry;
  }
};
// 项目组件
let projectComponentList = ref(platformComponents.value.project);
let projectComponentName = ref("");
let handleProjectComponentChange = (val) => {
  if (val) {
    projectComponentList.value = platformComponents.value.project.filter((v) => v.name === val);
  } else {
    projectComponentList.value = platformComponents.value.project;
  }
};

/* 模板库 */
// 基础模板
let baseTemplateList = platformTemplates.value.base;
// 行业模板
let industryTemplateList = ref(platformTemplates.value.industry);
let industryTemplateName = ref("");
let handleIndustryTemplateChange = (val) => {
  if (val) {
    industryTemplateList.value = platformTemplates.value.industry.filter((v) => v.name === val);
  } else {
    industryTemplateList.value = platformTemplates.value.industry;
  }
};
// 项目模板
let projectTemplateList = ref(platformTemplates.value.project);
let projectTemplateName = ref("");
let handleProjectTemplateChange = (val) => {
  if (val) {
    projectTemplateList.value = platformTemplates.value.project.filter((v) => v.name === val);
  } else {
    projectTemplateList.value = platformTemplates.value.project;
  }
};

/**
 * 拖拽的组件数据
 * @param index 拖拽组件的下标

 */
const onClone = (target) => {
  // 拖拽时根据名称获取到对应的设计组件信息
  let newWidget = JSON.parse(JSON.stringify(props.designer.getWidget(target.name)));
  // 生成唯一名称
  let uniqueKey = `${target.name}-${getUUID(16)}`;
  newWidget.id = uniqueKey;
  newWidget.props.name = uniqueKey;
  return newWidget;
};
</script>
<style lang="scss" scoped>
.sidebar-container {
  height: 100%;
  width: 300px;
  padding: var(--cmp-large-padding) 0 var(--cmp-large-padding) var(--cmp-large-padding);

  // 重新定义tab
  :deep(.custom-tabs) {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .el-tabs__header {
      .el-tabs__nav-wrap {
        margin-bottom: 0;
      }
    }

    .el-tabs__content {
      flex: 1;
      overflow: hidden;

      .el-tab-pane {
        height: 100%;
      }
    }
  }

  // 组件库和模板库
  :deep(.components),
  :deep(.templates) {
    // 清空折叠框的边框
    .custom-collapse {
      border: none;

      .el-collapse-item {
        .el-collapse-item__header {
          border: none;
        }

        .el-collapse-item__wrap {
          border: none;
          height: 100%;

          .el-collapse-item__content {
            height: 100%;
          }
        }
      }
    }

    .module {
      padding: 0 12px;
      background: var(--bg-standard-color);

      .custom-collapse.no-bg {
        .el-collapse-item {
          .el-collapse-item__header {
            background: transparent;
            border-bottom: 1px solid var(--border-standard-color);
            transition: none;

            &.is-active {
              border: none;
            }
          }

          .el-collapse-item__wrap {
            background: transparent;

            .el-collapse-item__content {
              padding-bottom: 12px;
            }
          }
        }
      }
    }
  }

  // 模板列表
  .template-list {
    background: var(--bg-white-color);
    display: flex;
    align-items: center;
    transition: all 0.15s;
    background: var(--bg-white-color);
    font-size: var(--font-size-14);
    color: var(--text-content-color);
    padding: 0 8px;
    cursor: default;

    &:not(:last-child) {
      border-bottom: solid 1px var(--border-standard-color);
    }

    .el-icon {
      margin-right: 4px;
    }

    .el-button {
      margin-left: auto;
    }
  }

  // vue-draggable-plus拖拽样式
  .custom-vue-draggable {
    display: flex;
    overflow: hidden;
    height: 100%;
    flex: 1;
    margin-top: -8px;
    justify-content: space-between;
    flex-wrap: wrap;

    .draggable-item {
      display: block;
      width: calc(50% - 4px);
      margin-top: 8px;

      .widget-drag-tag {
        display: flex;
      }
    }
  }
}
</style>
