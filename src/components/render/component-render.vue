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
      <ComponentRender :parent-widget="subWidget" :widget-ref-map="widgetRefMap" :widgets="subWidget.widgets" />
    </component>
  </div>
</template>
<script setup>
import { ref, computed, getCurrentInstance, onMounted } from "vue";

defineOptions({
  name: "ComponentRender",
});

// props
const props = defineProps({
  // 渲染器对象，在渲染模式中起作用
  render: { type: Object, default: () => ({}) },
  // 设计器全局配置
  globalConfig: { type: Object, default: null },
  // 设计元素列表
  widgets: { type: Array, default: () => [] },
  // 当前组件
  widget: { type: Object, default: null },
  // 父级设计元素
  parentWidget: { type: Object, default: null },
});

// // 绑定到的渲染组件实例

const { proxy } = getCurrentInstance();

// 绑定组件属性
const widgetProps = computed(() => {
  return (widget) => {
    if (widget.id) {
      if (props.render.widgetRefMap) {
        props.render.widgetRefMap[widget.props.name] = proxy;
      }
    }
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
          console.log(111, act);
          // return `console.log('当前this',this); this.$refs.${act}();`;
          return `console.log('当前this',this); this.${act}();`;
        });
        codeList = codeList.concat(`\n// 绑定组件动作`).concat(actionList);
      }
      events[event.name] = new Function(event.args, codeList.join("\n")).bind(props.render.widgetRefMap);
    }
    return events;
  };
});

onMounted(() => {
  console.log("on", props.render.widgetRefMap);
});
</script>
<style lang="scss" scoped></style>
