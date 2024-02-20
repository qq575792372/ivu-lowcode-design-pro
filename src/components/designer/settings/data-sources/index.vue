<template>
  <div class="data-sources-container">
    <el-form :label-width="100" label-position="left" class="custom-form" size="small">
      <el-card class="data-sources-card" shadow="never">
        <template #header>
          <div class="data-sources-header">
            <span>接口</span>
            <el-button style="margin-left: auto" plain type="primary" size="small" icon="Edit"></el-button>
            <el-button plain type="danger" size="small" icon="Delete"></el-button>
          </div>
        </template>
        <div class="data-sources-body">
          <div class="data-sources-item">
            <div class="data-sources-item-title">
              <el-icon>
                <Promotion />
              </el-icon>
              名称
            </div>
            <div class="data-sources-item-content">等等等等等等等等等等等等等等等等等等等等等等等等等等等等等等</div>
          </div>
          <div class="data-sources-item">
            <div class="data-sources-item-title">
              <el-icon>
                <Connection />
              </el-icon>
              地址
            </div>
            <div class="data-sources-item-content">等等等等等等</div>
          </div>
          <div class="data-sources-item">
            <div class="data-sources-item-title">
              <el-icon>
                <Tickets />
              </el-icon>
              描述
            </div>
            <div class="data-sources-item-content">等等等等等等</div>
          </div>
        </div>
      </el-card>
      <el-button type="primary" style="width: 100%; margin-top: 12px" plain icon="Plus" @click="handleAddClick">
        添加
      </el-button>
    </el-form>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.data-sources-container {
  margin-top: var(--cmp-margin);

  // 重新定义数据源卡片样式
  :deep(.data-sources-card) {
    background: var(--bg-standard-color);
    border-radius: var(--bg-light-color);
    border: solid 1px var(--bg-light-color);

    .el-card__header {
      display: flex;
      align-items: center;
      height: var(--cmp-size);
      padding: 0 var(--cmp-padding);
      font-size: var(--font-size-14);
      color: var(--text-title);

      .data-sources-header {
        width: 100%;
        display: flex;

        .el-button {
          margin-left: var(--cmp-margin);
        }
      }
    }

    .el-card__body {
      font-size: var(--font-size-12);
      padding: var(--cmp-padding);

      .data-sources-body {
        background: var(--bg-white-color);
        border: solid 1px var(--border-standard-color);
        border-bottom: 0;

        .data-sources-item {
          display: flex;
          border-bottom: solid 1px var(--border-standard-color);

          .data-sources-item-title {
            width: 60px;
            padding: var(--sp4) var(--sp8);
            background: var(--bg-standard-color);
            border-right: solid 1px var(--border-standard-color);
            color: var(--text-desc-color);
          }

          .data-sources-item-content {
            flex: 1;
            color: var(--text-content-color);
            padding: var(--sp4) var(--sp8);
          }
        }
      }
    }
  }
}
</style>
