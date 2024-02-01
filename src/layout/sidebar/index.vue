<template>
  <div class="sidebar-container">
    <el-tabs v-model="activePlatform" class="sidebar-tabs" @tab-click="handleClick">
      <el-tab-pane v-for="platform in platformList" :key="platform.name" :label="platform.label" :name="platform.name">
        <el-collapse v-model="activeComponents" class="platform-collapse">
          <!--组件库-->
          <el-collapse-item title="组件库" name="components" class="components">
            <el-collapse class="components-collapse">
              <el-collapse-item
                v-for="item in platform.components"
                :key="item.name"
                :title="item.label"
                :name="item.name"
                :icon="item.icon"
                class="components-collapse-item"
              >
                <template #title>
                  <el-icon>
                    <component :is="item.icon" />
                  </el-icon>
                  {{ item.label }}
                </template>
                <!--拖拽的组件元素-->
                <Container
                  v-for="(widget, index) in item.children"
                  :key="widget.name"
                  class="custom-dnd-container"
                  behaviour="copy"
                  orientation="horizontal"
                  group-name="widgets"
                  @drop="onDrop"
                >
                  <Draggable>
                    <el-tag style="margin: 4px; cursor: default; user-select: none">
                      <el-icon :size="16">
                        <component :is="widget.icon" />
                      </el-icon>
                      {{ widget.label }}
                    </el-tag>
                  </Draggable>
                </Container>
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
import { computed, defineProps, toRefs } from "vue";
import { Container, Draggable } from "vue3-smooth-dnd";
import { usePlatformStore } from "@/store";

const platformStore = new usePlatformStore();
const platformList = computed(() => platformStore.getPlatformList);

const activePlatform = platformList.value[0].name;
const activeComponents = ["components"];

const props = defineProps({
  designer: Object,
});

const designer = toRefs(props.designer);

/**
 * 拖拽左侧组件到右边
 * @param res
 */
const onDrop = (res) => {
  console.log(11, res);
  designer.widgets = [111];
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
            justify-content: space-between;
            flex-wrap: wrap;
            margin-top: -8px;
          }
        }
      }
    }
  }

  // dnd拖拽样式
  .custom-dnd-container {
    display: block;
    width: calc(50% - 4px);
    margin-top: 8px;

    .smooth-dnd-draggable-wrapper {
      display: block;

      :deep(.el-tag) {
        width: 100%;
        justify-content: left;
        height: 32px;
        line-height: 32px;
        margin: 0 !important;
        background: var(--bg-white-color);
        border: solid 1px var(--border-standard-color);
        border-radius: var(--cmp-border-radius);
        font-size: var(--font-size-14);
        color: var(--text-content-color);
        padding: 0 12px;
        cursor: default;

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
