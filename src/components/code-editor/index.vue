<template>
  <div :style="codeEditorStyle" class="code-editor">
    <div id="editor" ref="aceDom"></div>
  </div>
</template>

<script setup lang="ts">
// 引用ace插件
import ace from "ace-builds";

// ace的语言扩展工具
import "ace-builds/src-noconflict/ext-language_tools";

// ace的语法检查
import workerJsonUrl from "ace-builds/src-noconflict/worker-json?url";
import workerJavascriptUrl from "ace-builds/src-noconflict/worker-javascript?url";

// ace的主题
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/theme-github";

// ace的语言支持模块
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-json5";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-scss";
import "ace-builds/src-noconflict/mode-less";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/mode-nginx";

// ace的自动提示规则
import "ace-builds/src-noconflict/snippets/javascript";
import "ace-builds/src-noconflict/snippets/html";
import "ace-builds/src-noconflict/snippets/json";
import "ace-builds/src-noconflict/snippets/json5";
import "ace-builds/src-noconflict/snippets/css";
import "ace-builds/src-noconflict/snippets/scss";
import "ace-builds/src-noconflict/snippets/less";
import "ace-builds/src-noconflict/snippets/sql";

import { ref, onMounted, onBeforeUnmount, computed, watch } from "vue";
import { completions } from "./index.js";

// props
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
    default: "chrome",
  },
  // 是否只读
  readonly: {
    type: Boolean,
    default: false,
  },
  // 是否开启语法检查
  useWorker: {
    type: Boolean,
    default: false,
  },
  // 是否显示外边框
  hasBorder: {
    type: Boolean,
    default: true,
  },
  // 是否显示不可见字符
  showInvisibles: {
    type: Boolean,
    default: false,
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
  // 是否显示最右侧的边距竖线
  printMargin: {
    type: Boolean,
    default: false,
  },
  // 是否淡入折叠部件
  fadeFoldWidgets: {
    type: Boolean,
    default: false,
  },
  // 是否显示折叠部件
  showFoldWidgets: {
    type: Boolean,
    default: true,
  },
  // 是否高亮选中行
  highlightActiveLine: {
    type: Boolean,
    default: true,
  },
  // 是否高亮边线
  highlightGutterLine: {
    type: Boolean,
    default: true,
  },
  // 是否显示参考线
  displayIndentGuides: {
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
    default: "100%",
  },
  // 编辑器高度
  height: {
    type: [String, Number],
    default: 320,
  },
});
// emits
const emits = defineEmits(["update:modelValue", "focus", "blur", "change"]);

// ace编辑器样式
const codeEditorStyle = computed(() => {
  let height = props.height;
  let width = props.width;
  let borderWidth = "0px";
  // 高度可以为：400、400px、100%、auto
  if (
    !(
      String(props.height).lastIndexOf("px") > -1 ||
      String(props.height).lastIndexOf("%") > -1 ||
      String(props.height).lastIndexOf("auto") > -1
    )
  ) {
    height = props.height + "px";
  }
  // 宽度可以为：400、400px、100%、auto
  if (
    !(String(props.width).lastIndexOf("px") > -1 || String(props.width).lastIndexOf("%") > -1) ||
    String(props.width).lastIndexOf("auto") > -1
  ) {
    width = props.width + "px";
  }
  // 显示外边框
  if (props.hasBorder) {
    borderWidth = "1px";
  }
  return {
    height,
    width,
    borderWidth,
  };
});

// ace的实例元素
const aceDom = ref(null);
// ace编辑器对象
let editor = null;

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

onMounted(() => {
  editor = ace.edit(aceDom.value, {
    value: props.modelValue,
    mode: `ace/mode/${props.lang}`,
    theme: `ace/theme/${props.theme}`,
    readOnly: props.readonly,
    useWorker: props.useWorker,
    showInvisibles: props.showInvisibles,
    showLineNumbers: props.showLineNumbers,
    showGutter: props.showGutter,
    printMargin: props.printMargin,
    fadeFoldWidgets: props.fadeFoldWidgets,
    showFoldWidgets: props.showFoldWidgets,
    highlightGutterLine: props.highlightGutterLine,
    displayIndentGuides: props.displayIndentGuides,
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

  // 配置语法检查
  ace.config.setModuleUrl("ace/mode/json_worker", workerJsonUrl);
  ace.config.setModuleUrl("ace/mode/javascript_worker", workerJavascriptUrl);
  // 配置语法自动提示
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
</script>

<style scoped lang="scss">
.code-editor {
  border-color: var(--border-standard-color);
  border-style: solid;
  border-width: 1px;
  border-radius: var(--cmp-border-radius);
  overflow: hidden;

  .ace_editor {
    height: 100%;
  }
}
</style>
