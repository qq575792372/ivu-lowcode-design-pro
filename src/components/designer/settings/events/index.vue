<template>
  <div class="events-container">
    <el-collapse-item title="事件" name="events">
      <template v-if="props.widget.events && props.widget.events.length">
        <EventBinder
          v-for="(event, eventIndex) in props.widget.events"
          :key="eventIndex"
          :designer
          :item="event"
          :widget
          :global-config="props.globalConfig"
        />
      </template>
      <template v-else>
        <div class="no-events-binder">暂无事件</div>
      </template>
    </el-collapse-item>
  </div>
</template>
<script setup>
import EventBinder from "./event-binder.vue";

defineOptions({ name: "Events" });

// props
const props = defineProps({
  designer: { type: Object, default: () => ({}) },
  globalConfig: { type: Object, default: null },
  widget: { type: Object, default: () => ({}) },
});
</script>
<style lang="scss" scoped>
.events-container {
  .no-events-binder {
    display: block;
    width: 100%;
    text-align: center;
    font-size: var(--font-size-12);
    padding-bottom: var(--cmp-padding);
    color: var(--text-desc-color);
  }
}
</style>
