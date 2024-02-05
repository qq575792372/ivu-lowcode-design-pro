<template>
  <div class="sidebar-container">
    <el-tabs v-model="activeLibName" class="custom-tabs">
      <el-tab-pane label="组件库" name="components" class="components">
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
                      <el-tag>
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
            <el-select class="margin-bottom-12" />
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
                      <el-tag>
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
            <el-select class="margin-bottom-12" />
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
                      <el-tag>
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
      </el-tab-pane>
      <el-tab-pane label="模板库" name="templates" class="templates">
        <el-collapse-item title="基础模板" name="base">啊啊</el-collapse-item>
        <el-collapse-item title="行业模板" name="industry">啊啊</el-collapse-item>
        <el-collapse-item title="项目模板" name="project">啊啊</el-collapse-item>
      </el-tab-pane>
    </el-tabs>

    <el-tabs v-if="false" v-model="activePlatform" class="sidebar-tabs">
      <el-tab-pane v-for="platform in platformList" :key="platform.name" :label="platform.label" :name="platform.name">
        <el-collapse v-model="activeComponents" class="platform-collapse">
          <!--组件库-->
          <el-collapse-item title="组件库" name="components" class="components">
            <el-collapse class="components-collapse">
              <el-collapse-item
                v-for="(module, index) in platform.components"
                :key="module.name"
                :title="module.label"
                :name="module.name"
                :icon="module.icon"
                class="components-collapse-item"
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
                    <el-tag>
                      <el-icon :size="16">
                        <component :is="widget.icon" />
                      </el-icon>
                      {{ widget.label }}
                    </el-tag>
                  </div>
                </VueDraggable>
              </el-collapse-item>
            </el-collapse>
          </el-collapse-item>

          <!--模板库-->
          <el-collapse-item title="模板库" name="templates" class="templates">
            <el-collapse clas="templates-collapse">
              <el-collapse-item
                v-for="item in platform.templates"
                :key="item.name"
                :title="item.label"
                :name="item.name"
                :icon="item.icon"
                class="templates-collapse-item"
              >
                <template #title>
                  <el-icon>
                    <component :is="item.icon" />
                  </el-icon>
                  {{ item.label }}
                </template>
              </el-collapse-item>
            </el-collapse>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup>
import { getUUID } from "@lime-util/util";
import { computed, defineProps, toRefs } from "vue";
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
const activeLibName = "components";
const activeComponentNames = ["base"];
const activeTemplatesNames = ["base"];

// 基础组件
const baseComponentList = platformComponents.value.base;
// 行业组件
const industryComponentList = platformComponents.value.industry;
// 项目组件
const projectComponentList = platformComponents.value.project;

// 基础模板
const baseTemplateList = platformTemplates.value.base;
// 行业模板
const industryTemplateList = platformTemplates.value.industry;
// 项目模板
const projectTemplateList = platformTemplates.value.project;

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
  padding: var(--cmp-large-padding);

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

      :deep(.el-tag) {
        width: 100%;
        justify-content: left;
        height: 32px;
        line-height: 32px;
        margin: 0 !important;
        transition: all 0.15s;
        background: var(--bg-white-color);
        border: solid 1px var(--border-standard-color);
        border-radius: var(--cmp-border-radius);
        font-size: var(--font-size-14);
        color: var(--text-content-color);
        padding: 0 12px;
        cursor: default;

        &:hover {
          background: var(--el-tag-bg-color);
          color: var(--primary-color);
          border: solid 1px var(--border-deep-color);
        }

        .el-tag__content {
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .el-icon {
          color: var(--primary-color);
          height: auto;
          width: auto;
          vertical-align: middle;
          position: relative;
          top: -2px;
          cursor: default;
        }
      }
    }
  }
}
</style>
