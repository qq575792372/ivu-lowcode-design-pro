import { computed, onMounted, defineComponent, defineProps, h, ref, resolveComponent } from "vue";
import useGlobal from "@/hooks/global";

export default ({ props }) => {
  // 使用全局配置的hooks
  const { executeGlobalEventFn } = useGlobal({ props });

  // 渲染的元素列表
  const widgets = computed(() => {
    return props.data.widgets;
  });
  // 全局配置
  const globalConfig = computed(() => {
    return props.data.globalConfig;
  });

  /**
   * 获得组件的属性
   * @param {Object} vueInstance 入口组件的ref实例
   * @param {Object} widget 当前组件
   * @returns {Object} 返回当前组件的属性
   */
  const getWidgetProps = (vueInstance, widget) => {
    return widget.props;
  };
  /**
   * 获得组件的事件
   * @param {Object} vueInstance 入口组件的ref实例
   * @param {Object} widget 当前组件
   * @returns {Object} 返回当前组件的事件
   */
  const getWidgetEvents = (vueInstance, widget) => {
    let events = {};
    for (let event of widget.events || []) {
      // 绑定的事件名称
      let eventName = `on${event.name.replace(/^\w/, (v) => v.toUpperCase())}`;

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
      // 组装最终的事件
      events[eventName] = new Function(event.args, codeList.join("\n")).bind(vueInstance);
    }
    return events;
  };

  /**
   * 获得组件渲染
   * @param {Object} vueInstance 入口组件的ref实例
   * @param {Array} widgets 组件列表
   * @returns {Array} 返回render生成的组件列表
   */
  const getComponents = (vueInstance, widgets) => {
    return widgets.map((widget) => {
      // 当前组件的实例
      let component = resolveComponent(widget.type + "-widget");
      // 当前组件的配置
      let widgetProps = getWidgetProps(vueInstance, widget);
      // 当前组件的事件
      let widgetEvents = getWidgetEvents(vueInstance, widget);
      // 返回render函数渲染后的组件
      return h(
        component,
        {
          ref: widget.id,
          widget,
          ...widgetProps,
          ...widgetEvents,
        },
        { default: () => getComponents(vueInstance, widget.widgets) },
      );
    });
  };

  // 返回生成的递归组件
  return defineComponent({
    mounted() {
      console.log(globalConfig.value.globalEvents, this);
      executeGlobalEventFn(globalConfig.value.globalEvents, "onMounted");
    },
    updated() {
      executeGlobalEventFn(globalConfig.value.globalEvents, "onUpdated");
    },
    unmounted() {
      executeGlobalEventFn(globalConfig.value.globalEvents, "onUnmounted");
    },
    beforeMount() {
      executeGlobalEventFn(globalConfig.value.globalEvents, "onBeforeMount");
    },
    beforeUpdate() {
      executeGlobalEventFn(globalConfig.value.globalEvents, "onBeforeUpdate");
    },
    beforeUnmount() {
      executeGlobalEventFn(globalConfig.value.globalEvents, "onBeforeUnmount");
    },
    activated() {
      executeGlobalEventFn(globalConfig.value.globalEvents, "onActivated");
    },
    deactivated() {
      executeGlobalEventFn(globalConfig.value.globalEvents, "onDeactivated");
    },
    render() {
      let list = getComponents(this, widgets.value);
      console.log("getComponents", list);
      return h("div", {}, { default: () => list });
    },
  });
};
