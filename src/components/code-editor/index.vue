<template>
  <div :style="codeEditorStyle" class="code-editor">
    <div id="editor" ref="aceDom"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, watch } from "vue";

// 引用ace插件
import ace from "ace-builds";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/theme-chrome"; // 默认设置的主题

// ace的语言支持模块
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-json5";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-scss";
import "ace-builds/src-noconflict/mode-html";

// ace的自动提示规则
import "ace-builds/src-noconflict/snippets/javascript";
import "ace-builds/src-noconflict/snippets/html";
import "ace-builds/src-noconflict/snippets/json";
import "ace-builds/src-noconflict/snippets/css";
import "ace-builds/src-noconflict/snippets/scss";

// 接收参数
const props = defineProps({
  // 双向绑定的数据
  modelValue: {
    type: String,
    required: true,
  },
  // 默认语言
  lang: {
    type: String,
    default: "javascript",
  },
  // 主题样式
  theme: {
    type: String,
    default: "github",
  },
  // 是否只读
  readonly: {
    type: Boolean,
    default: false,
  },
  // 是否开启语法检查
  useWorker: {
    type: Boolean,
    default: true,
  },
  // 是否显示行号
  showLineNumbers: {
    type: Boolean,
    default: true,
  },
  // 是否显示行号区域
  showGutter: {
    type: Boolean,
    default: true,
  },
  // 是否有外边框
  hasBorder: {
    type: Boolean,
    default: false,
  },
  // 是否高亮选中行
  highlightActiveLine: {
    type: Boolean,
    default: true,
  },
  // 编辑器内字体大小
  fontSize: {
    type: Number,
    default: 12,
  },
  // 制表符设置为2个空格大小
  tabSize: {
    type: Number,
    default: 2,
  },
  // 编辑器宽度
  width: {
    type: [String, Number],
    default: "",
  },
  // 编辑器高度
  height: {
    type: [String, Number],
    default: 320,
  },
});

// 编辑器样式
const codeEditorStyle = computed(() => {
  let height = props.height;
  let width = "";
  if (typeof props.height === "number") {
    height = props.height + "px";
  }
  if (typeof props.width === "number") {
    width = props.width + "px";
  }
  return {
    height,
    width,
  };
});

// 定义ace的事件
const emits = defineEmits(["update:modelValue", "focus", "blur", "change"]);
// ace的元素
const aceDom = ref(null);
// ace编辑器对象
let editor = null;

onMounted(() => {
  editor = ace.edit(aceDom.value, {
    value: props.modelValue,
    mode: `ace/mode/${props.lang}`,
    theme: `ace/theme/${props.theme}`,
    readOnly: props.readonly,
    useWorker: props.useWorker,
    showLineNumbers: props.showLineNumbers,
    showGutter: props.showGutter,
    hasBorder: props.hasBorder,
    fontSize: props.fontSize,
    tabSize: props.tabSize,
    highlightActiveLine: props.highlightActiveLine,
  });
  // 设置参数
  editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true, // 设置代码片段提示
    enableLiveAutocompletion: true, // 设置自动提示
  });
  // 切换自动换行
  editor.getSession().setUseWrapMode(true);

  // 自定义语法补全
  const completions = [
    // 设计器中方法
    {
      meta: "Designer Function",
      caption: "loadFromJson",
      value: "loadFromJson()",
      score: 1,
    },
    {
      meta: "Designer Function",
      caption: "mergeFromJson",
      value: "mergeFromJson()",
      score: 1,
    },
    {
      meta: "Designer Function",
      caption: "setSelected",
      value: "setSelected(widget)",
      score: 1,
    },
    {
      meta: "Designer Function",
      caption: "clearSelected",
      value: "clearSelected()",
      score: 1,
    },
    {
      meta: "Designer Function",
      caption: "getWidget",
      value: "getWidget(typeName)",
      score: 1,
    },
    {
      meta: "Designer Function",
      caption: "getWidgetRef",
      value: "getWidgetRef(typeName)",
      score: 1,
    },
  ];
  // 配置语法
  ace.config.loadModule("ace/ext/language_tools", (langTools) => {
    langTools.addCompleter({
      getCompletions(editor, session, pos, prefix, callback) {
        callback(null, completions);
      },
    });
  });

  // 回调事件
  editor.on("focus", () => {
    emits("focus");
  });
  editor.on("blur", () => {
    emits("blur");
  });
  // change事件，支持双向绑定和回调
  editor.on("change", () => {
    emits("change", editor.getValue());
    // 双向绑定数据
    emits("update:modelValue", editor.getValue());
  });
});

onBeforeUnmount(() => {
  editor && editor.destroy();
});
// 监听值改变
watch(
  () => props.modelValue,
  (newValue) => {
    // 解决光标移动问题
    const position = editor.getCursorPosition();
    editor.getSession().setValue(newValue);
    editor.clearSelection();
    editor.moveCursorToPosition(position);
  },
  { deep: true },
);
</script>

<style scoped lang="scss">
.code-editor {
  border: 1px solid var(--border-standard-color);
  border-radius: var(--cmp-border-radius);
  overflow: hidden;

  .ace_editor {
    height: 100%;
  }
}
</style>
