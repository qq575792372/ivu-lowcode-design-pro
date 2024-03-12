import { computed, h, resolveComponent } from "vue";
import { defineComponent } from "@vue/composition-api";
import useGlobal from "@/hooks/global";
import useWidget from "@/hooks/widget";

/**
 * 预览渲染的hooks
 * @param props
 */
export default function ({ props }) {
  // 使用全局配置的hooks
  const { executeGlobalEvent, executeGlobalAction } = useGlobal({ props });
  // 使用组件的hooks
  const { getPropValue } = useWidget({ props });

  // 当前入口组件的vue实例
  let vueInstance = null;

  // 渲染的元素列表
  const widgets = computed(() => {
    return props.widgets;
  });
  // 全局配置
  const globalConfig = computed(() => {
    return props.globalConfig;
  });

  /**
   * 获得组件的属性
   * @param {Object} vueInstance 入口组件的ref实例
   * @param {Object} widget 当前组件
   * @returns {Object} 返回当前组件的属性
   */
  const getWidgetProps = function (vueInstance, widget) {
    let bindProps = {};
    for (let propName in widget.props) {
      bindProps[propName] = getPropValue(widget.props[propName], vueInstance);
    }
    return bindProps;
  };
  /**
   * 获得组件的事件
   * @param {Object} vueInstance 入口组件的ref实例
   * @param {Object} widget 当前组件
   * @returns {Object} 返回当前组件的事件
   */
  const getWidgetEvents = function (vueInstance, widget) {
    let events = {};
    for (let event of widget.events || []) {
      // 绑定的事件名称，格式为onXx的才可以绑定
      let eventName = `on${event.name.charAt(0).toUpperCase() + event.name.slice(1)}`;
      // 执行代码的集合
      let codeList = ["// 执行组件绑定的自定义事件"];

      // 事件代码
      if (event.code) {
        codeList.push(event.code);
      }

      // 动作代码
      if (event.action) {
        // 全局动作
        let globalActionList = event.action
          .filter((code) => code.includes("$globalActions"))
          .map((code) => {
            let actionName = code.split(".")[1];
            return `this.executeGlobalAction('${actionName}');`;
          });
        // 组件动作
        let actionList = event.action
          .filter((code) => !code.includes("$globalActions"))
          .map((code) => {
            // 获取要绑定组件的实例名
            let sourceWidgetRefName = code && code.split(".")[0];
            return `this.$refs.${sourceWidgetRefName} && this.$refs.${code}();`;
          });
        codeList = codeList
          .concat(`\n// 执行组件绑定的全局动作代码`)
          .concat(globalActionList)
          .concat(`\n// 执行组件绑定的组件动作方法`)
          .concat(actionList);
      }

      // 组装最终的事件
      events[eventName] = new Function(event.args, codeList.join("\n")).bind(vueInstance);
      console.log("events[eventName]", events[eventName]);
    }
    return events;
  };
  /**
   * 获得组件渲染
   * @param {Object} vueInstance 入口组件的ref实例
   * @param {Array} widgets 组件列表
   * @returns {Array} 返回render生成的组件列表
   */
  const getComponents = function (vueInstance, widgets) {
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

  // 返回生成的组件
  return defineComponent({
    mounted() {
      vueInstance = this;
      this.executeGlobalEvent("onMounted", this);
    },
    updated() {
      this.executeGlobalEvent("onUpdated", this);
    },
    unmounted() {
      this.executeGlobalEvent("onUnmounted", this);
    },
    beforeMount() {
      this.executeGlobalEvent("onBeforeMount", this);
    },
    beforeUpdate() {
      this.executeGlobalEvent("onBeforeUpdate", this);
    },
    beforeUnmount() {
      this.executeGlobalEvent("onBeforeUnmount", this);
    },
    activated() {
      this.executeGlobalEvent("onActivated", this);
    },
    deactivated() {
      this.executeGlobalEvent("onDeactivated", this);
    },
    methods: {
      executeGlobalEvent: (eventName) =>
        executeGlobalEvent(globalConfig.value.globalEvents, eventName, vueInstance, globalConfig.value.globalVars),
      executeGlobalAction: (actionName) =>
        executeGlobalAction(globalConfig.value.globalActions, actionName, vueInstance, globalConfig.value.globalVars),
    },
    // 渲染函数
    render() {
      return h("div", {}, { default: () => getComponents(this, widgets.value) });
    },
  });
}
