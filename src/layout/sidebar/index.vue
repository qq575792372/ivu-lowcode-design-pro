<template>
  <div class="sidebar-container">
    <el-tabs v-model="activePlatform" class="sidebar-tabs">
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

// 获取到平台的配置
const platformStore = new usePlatformStore();
const platformList = computed(() => platformStore.getPlatformList);

// 默认展开的折叠
const activePlatform = platformList.value[0].name;
const activeComponents = ["components"];

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

  :deep(.sidebar-tabs) {
    .el-tabs__header {
      margin: 0;

      .el-tabs__nav-wrap::after {
        height: 1px;
        background: var(--border-standard-color);
      }

      .el-tabs__active-bar {
        background: var(--primary-color);
      }

      .el-tabs__item {
        font-size: var(--font-size-14);
        color: var(--text-content-color);

        &.is-active {
          font-weight: var(--font-weight-bold);
        }
      }
    }

    .el-tabs__content {
      .platform-collapse {
        border: none;

        .el-collapse-item__arrow {
          color: var(--text-content-color);
        }

        .el-collapse-item__wrap {
          border: none;
        }
      }
    }
  }

  // 组件库和模板库
  :deep(.components),
  :deep(.templates) {
    .el-collapse-item__header {
      border: none;
      font-size: var(--font-size-14);
      font-weight: var(--font-weight-bold);
      color: var(--text-content-color);
      transform: none;
    }

    .el-collapse-item__content {
      background: var(--bg-standard-color);
      padding: 0;

      .components-collapse,
      .templates-collapse {
        border: none;
        padding: 0 12px 0 12px;

        .components-collapse-item,
        .templates-collapse-item {
          .el-collapse-item__header {
            background: var(--bg-standard-color);
            font-weight: var(--font-weight-400);
            transition: none;

            &:not(.is-active) {
              border-bottom: solid 1px var(--border-standard-color);
            }

            .el-icon:not(.el-collapse-item__arrow) {
              color: var(--primary-color);
              margin-right: 4px;
              vertical-align: middle;
            }
          }

          .el-collapse-item__content {
            display: flex;
            padding: 0;
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
