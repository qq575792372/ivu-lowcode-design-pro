<template>
  <div v-for="(subWidget, subWidgetIndex) in props.widgets" :key="subWidgetIndex" class="widget-wrap">
    <!--拖拽的元素-->
    {{ subWidget.props.name + "_ref" }}
    <component
      :is="subWidget.type + '-widget'"
      :ref="subWidget.props.name + '_ref'"
      :widget="subWidget"
      :parent-widget="props.parentWidget"
      v-bind="widgetProps(subWidget)"
      v-on="widgetEvents(subWidget)"
    >
      <!--递归嵌套组件渲染-->
      <ComponentRender :parent-widget="subWidget" :widgets="subWidget.widgets" />
    </component>
  </div>
</template>
<script setup>
import { computed } from "vue";

defineOptions({
  name: "ComponentRender",
});

// props
const props = defineProps({
  // 设计器全局配置
  globalConfig: { type: Object, default: null },
  // 设计元素列表
  widgets: { type: Array, default: () => [] },
  // 当前组件
  widget: { type: Object, default: null },
  // 父级设计元素
  parentWidget: { type: Object, default: null },
});

// 绑定组件属性
const widgetProps = computed(() => {
  return (widget) => {
    return widget.props || {};
  };
});

// 绑定组件事件以及动作
const widgetEvents = computed(() => {
  return (widget) => {
    let events = {};
    for (let event of widget.events || []) {
      // 拼加事件源码和动作名
      let codeList = [];
      if (event.code) {
        codeList.push(event.code);
      }
      if (event.action) {
        let actionList = event.action.map((act) => {
          return `console.log('当前this',this); this.$refs.${act}();`;
        });
        codeList = codeList.concat(`\n// 绑定组件动作`).concat(actionList);
      }
      events[event.name] = new Function(event.args, codeList.join("\n")).bind(null, null);
      console.log(333, events[event.name]);
    }
    return events;
  };
});
</script>
<style lang="scss" scoped></style>
