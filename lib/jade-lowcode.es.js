import { computed as A, getCurrentInstance as pe, watchEffect as lr, openBlock as D, createElementBlock as R, getCurrentScope as cr, onScopeDispose as fr, unref as w, onMounted as Gt, nextTick as Ne, watch as we, ref as B, defineComponent as Q, createElementVNode as K, warn as dr, inject as oe, shallowRef as et, mergeProps as tt, renderSlot as re, toRef as yt, onUnmounted as pr, useAttrs as gr, useSlots as En, createCommentVNode as j, Fragment as nt, normalizeClass as P, createBlock as z, withCtx as de, resolveDynamicComponent as _e, withModifiers as hr, createVNode as Cn, toDisplayString as Re, normalizeStyle as vr, Text as br, provide as mr, reactive as _r, createTextVNode as Dn, useCssVars as yr, h as rn, resolveComponent as wr } from "vue";
function Kt({ props: t, emits: n }) {
  A(() => t.globalConfig || {});
  const r = function(v, g) {
    return v.find((x) => x.name === g);
  }, s = function(v, g, x, y) {
    let I = u(v, g);
    return new Function("$globalVars", I.code).bind(x, y)();
  }, u = function(v, g) {
    return v.find((x) => x.name === g);
  }, c = function(v, g, x, y) {
    let I = u(v, g);
    return new Function("$globalVars", I.code).bind(x, y)();
  }, f = function(v, g) {
    return v.find((x) => x.name === g);
  };
  return {
    // 全局函数
    getGlobalFn: r,
    executeGlobalFn: s,
    // 全局动作
    getGlobalAction: f,
    executeGlobalAction: function(v, g, x, y) {
      let I = f(v, g);
      return new Function("$globalVars", I.code).bind(x, y)();
    },
    // 全局事件
    getGlobalEvent: u,
    executeGlobalEvent: c,
    // 全局组件列表
    getFlatWidgets: function() {
      const v = (g) => {
        let x = [];
        for (let y of g)
          if (y.widgets && !y.widgets.length && delete y.widgets, x.push(y), y.widgets && y.widgets.length) {
            let I = v(y.widgets);
            I && x.push(...I);
          }
        return x;
      };
      return v(t.designer.widgets);
    },
    // 全局挂载变量
    getGlobalProperties: function() {
      const { proxy: v } = pe();
      return v;
    }
  };
}
function Sr({ props: t, emits: n }) {
  const { getGlobalProperties: r } = Kt({ props: t, emits: n }), { $request: s, $message: u } = r(), c = A(() => t.globalConfig.dataSources), f = A(() => t.globalConfig || {}), p = async function(g, x = {}, y) {
    let I = _(g);
    try {
      let h = M(I, x, y, f.value.globalVars), $ = await s.request(h);
      return new Function("result", "DSV", "$globalVars", I.responseCode).bind(y).call(null, $, x, f.value.globalVars);
    } catch (h) {
      new Function(
        "error",
        "DSV",
        "$globalVars",
        "$message",
        I.responseErrorCode
      ).bind(y).call(null, h, x, f.value.globalVars, u);
    }
  }, _ = function(g) {
    return c.value.find((x) => x.name === g);
  }, M = function(g, x = {}, y, I) {
    let h = {};
    if (g.urlType === "String")
      h.url = String(g.url);
    else if (g.urlType === "VarFx") {
      let se = new Function("DSV", "$globalVars", "return " + String(g.url)).bind(y);
      h.url = se(x, I);
    }
    h.method = g.method;
    let $ = v(g.headers, x, y, I);
    $ && (h.headers = $);
    let C = v(g.params, x, y, I);
    C && (h.params = C);
    let k = v(g.data, x, y, I);
    return k && (h.data = k), new Function("config", "DSV", "$globalVars", g.requestCode).bind(y).call(null, h, x, I);
  }, v = function(g, x = {}, y, I) {
    if (!g || g.length <= 0)
      return;
    let h = {};
    for (let $ of g)
      if ($.type === "String")
        h[$.name] = String($.value);
      else if ($.type === "Number")
        h[$.name] = Number($.value);
      else if ($.type === "Boolean")
        h[$.name] = !!$.value;
      else if ($.type === "VarFx") {
        let C = new Function("DSV", "$globalVars", "return " + $.value).bind(y);
        h[$.name] = C(x, I);
      } else {
        console.error("data source not support type!");
        return;
      }
    return h;
  };
  return {
    requestData: p
  };
}
function xr({ props: t, emits: n }) {
  const { executeGlobalFn: r } = Kt({ props: t, emits: n }), { requestData: s } = Sr({ props: t, emits: n }), u = A(() => t.globalConfig || {}), c = function(v) {
    let g = this;
    if (v.includes("$globalVars"))
      return new Function("$globalVars", `return ${v}`)(u.value.globalVars);
    if (v.includes("$globalFns")) {
      let x = v.split(".")[1];
      return r(u.value.globalFns, x, g, u.value.globalVars);
    } else if (v.includes("$dataSources")) {
      let x = v.split(".")[1], y = null;
      return lr(async () => {
        y = await s(
          x,
          {
            myId: 123,
            myName: "myName"
          },
          g
        );
      }), y;
    } else
      return v;
  }, f = function(v, g) {
    return v.events.find((x) => x.name === g);
  }, p = function(v, g) {
    let x = f(v, g);
    return new Function(...x.args, x.code)(v);
  }, _ = function(v, g) {
    return v.actions.find((x) => x.name === g);
  };
  return {
    // 组件属性
    getPropValue: c,
    // 组件事件
    getEvent: f,
    executeEvent: p,
    // 组件动作
    getAction: _,
    executeAction: function(v, g) {
      let x = _(v, g);
      return x && new Function("widget", x.code);
    }
  };
}
const Or = /* @__PURE__ */ Object.assign({
  name: "HospPersonManageBaseInfoSetsWidget"
}, {
  __name: "index",
  setup(t) {
    return (n, r) => (D(), R("div", null, "test"));
  }
}), Mr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Or
}, Symbol.toStringTag, { value: "Module" }));
var on;
const ot = typeof window < "u", $r = (t) => typeof t == "string", Er = () => {
};
ot && ((on = window == null ? void 0 : window.navigator) != null && on.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function Cr(t) {
  return typeof t == "function" ? t() : w(t);
}
function Dr(t) {
  return t;
}
function In(t) {
  return cr() ? (fr(t), !0) : !1;
}
function Ir(t, n = !0) {
  pe() ? Gt(t) : n ? t() : Ne(t);
}
function Nn(t) {
  var n;
  const r = Cr(t);
  return (n = r == null ? void 0 : r.$el) != null ? n : r;
}
const An = ot ? window : void 0;
function Nr(...t) {
  let n, r, s, u;
  if ($r(t[0]) || Array.isArray(t[0]) ? ([r, s, u] = t, n = An) : [n, r, s, u] = t, !n)
    return Er;
  Array.isArray(r) || (r = [r]), Array.isArray(s) || (s = [s]);
  const c = [], f = () => {
    c.forEach((v) => v()), c.length = 0;
  }, p = (v, g, x) => (v.addEventListener(g, x, u), () => v.removeEventListener(g, x, u)), _ = we(() => Nn(n), (v) => {
    f(), v && c.push(...r.flatMap((g) => s.map((x) => p(v, g, x))));
  }, { immediate: !0, flush: "post" }), M = () => {
    _(), f();
  };
  return In(M), M;
}
function Ar(t, n = !1) {
  const r = B(), s = () => r.value = !!t();
  return s(), Ir(s, n), r;
}
const an = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, sn = "__vueuse_ssr_handlers__";
an[sn] = an[sn] || {};
var un = Object.getOwnPropertySymbols, Rr = Object.prototype.hasOwnProperty, kr = Object.prototype.propertyIsEnumerable, Fr = (t, n) => {
  var r = {};
  for (var s in t)
    Rr.call(t, s) && n.indexOf(s) < 0 && (r[s] = t[s]);
  if (t != null && un)
    for (var s of un(t))
      n.indexOf(s) < 0 && kr.call(t, s) && (r[s] = t[s]);
  return r;
};
function Tr(t, n, r = {}) {
  const s = r, { window: u = An } = s, c = Fr(s, ["window"]);
  let f;
  const p = Ar(() => u && "ResizeObserver" in u), _ = () => {
    f && (f.disconnect(), f = void 0);
  }, M = we(() => Nn(t), (g) => {
    _(), p.value && u && g && (f = new ResizeObserver(n), f.observe(g, c));
  }, { immediate: !0, flush: "post" }), v = () => {
    _(), M();
  };
  return In(v), {
    isSupported: p,
    stop: v
  };
}
var ln;
(function(t) {
  t.UP = "UP", t.RIGHT = "RIGHT", t.DOWN = "DOWN", t.LEFT = "LEFT", t.NONE = "NONE";
})(ln || (ln = {}));
var jr = Object.defineProperty, cn = Object.getOwnPropertySymbols, Pr = Object.prototype.hasOwnProperty, zr = Object.prototype.propertyIsEnumerable, fn = (t, n, r) => n in t ? jr(t, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[n] = r, Br = (t, n) => {
  for (var r in n || (n = {}))
    Pr.call(n, r) && fn(t, r, n[r]);
  if (cn)
    for (var r of cn(n))
      zr.call(n, r) && fn(t, r, n[r]);
  return t;
};
const Lr = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
};
Br({
  linear: Dr
}, Lr);
const Vr = () => ot && /firefox/i.test(window.navigator.userAgent);
/**
* @vue/shared v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
process.env.NODE_ENV !== "production" && Object.freeze({});
process.env.NODE_ENV !== "production" && Object.freeze([]);
const Rn = () => {
}, Ur = Object.prototype.hasOwnProperty, dn = (t, n) => Ur.call(t, n), Hr = (t) => typeof t == "function", Ye = (t) => typeof t == "string", wt = (t) => t !== null && typeof t == "object";
var Wr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function kn(t) {
  for (var n = -1, r = t == null ? 0 : t.length, s = {}; ++n < r; ) {
    var u = t[n];
    s[u[0]] = u[1];
  }
  return s;
}
function Yr(t) {
  return t == null;
}
const Gr = (t) => t === void 0, Pt = (t) => typeof t == "number", Kr = (t) => Ye(t) ? !Number.isNaN(Number(t)) : !1;
class qr extends Error {
  constructor(n) {
    super(n), this.name = "ElementPlusError";
  }
}
function Te(t, n) {
  if (process.env.NODE_ENV !== "production") {
    const r = Ye(t) ? new qr(`[${t}] ${n}`) : t;
    console.warn(r);
  }
}
const Zr = "utils/dom/style";
function Qr(t, n = "px") {
  if (!t)
    return "";
  if (Pt(t) || Kr(t))
    return `${t}${n}`;
  if (Ye(t))
    return t;
  Te(Zr, "binding value must be a string or number");
}
/*! Element Plus Icons Vue v2.3.1 */
var Jr = /* @__PURE__ */ Q({
  name: "CircleCheck",
  __name: "circle-check",
  setup(t) {
    return (n, r) => (D(), R("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      K("path", {
        fill: "currentColor",
        d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768m0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896"
      }),
      K("path", {
        fill: "currentColor",
        d: "M745.344 361.344a32 32 0 0 1 45.312 45.312l-288 288a32 32 0 0 1-45.312 0l-160-160a32 32 0 1 1 45.312-45.312L480 626.752l265.344-265.408z"
      })
    ]));
  }
}), Xr = Jr, eo = /* @__PURE__ */ Q({
  name: "CircleClose",
  __name: "circle-close",
  setup(t) {
    return (n, r) => (D(), R("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      K("path", {
        fill: "currentColor",
        d: "m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248z"
      }),
      K("path", {
        fill: "currentColor",
        d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768m0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896"
      })
    ]));
  }
}), Fn = eo, to = /* @__PURE__ */ Q({
  name: "Hide",
  __name: "hide",
  setup(t) {
    return (n, r) => (D(), R("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      K("path", {
        fill: "currentColor",
        d: "M876.8 156.8c0-9.6-3.2-16-9.6-22.4-6.4-6.4-12.8-9.6-22.4-9.6-9.6 0-16 3.2-22.4 9.6L736 220.8c-64-32-137.6-51.2-224-60.8-160 16-288 73.6-377.6 176C44.8 438.4 0 496 0 512s48 73.6 134.4 176c22.4 25.6 44.8 48 73.6 67.2l-86.4 89.6c-6.4 6.4-9.6 12.8-9.6 22.4 0 9.6 3.2 16 9.6 22.4 6.4 6.4 12.8 9.6 22.4 9.6 9.6 0 16-3.2 22.4-9.6l704-710.4c3.2-6.4 6.4-12.8 6.4-22.4Zm-646.4 528c-76.8-70.4-128-128-153.6-172.8 28.8-48 80-105.6 153.6-172.8C304 272 400 230.4 512 224c64 3.2 124.8 19.2 176 44.8l-54.4 54.4C598.4 300.8 560 288 512 288c-64 0-115.2 22.4-160 64s-64 96-64 160c0 48 12.8 89.6 35.2 124.8L256 707.2c-9.6-6.4-19.2-16-25.6-22.4Zm140.8-96c-12.8-22.4-19.2-48-19.2-76.8 0-44.8 16-83.2 48-112 32-28.8 67.2-48 112-48 28.8 0 54.4 6.4 73.6 19.2zM889.599 336c-12.8-16-28.8-28.8-41.6-41.6l-48 48c73.6 67.2 124.8 124.8 150.4 169.6-28.8 48-80 105.6-153.6 172.8-73.6 67.2-172.8 108.8-284.8 115.2-51.2-3.2-99.2-12.8-140.8-28.8l-48 48c57.6 22.4 118.4 38.4 188.8 44.8 160-16 288-73.6 377.6-176C979.199 585.6 1024 528 1024 512s-48.001-73.6-134.401-176Z"
      }),
      K("path", {
        fill: "currentColor",
        d: "M511.998 672c-12.8 0-25.6-3.2-38.4-6.4l-51.2 51.2c28.8 12.8 57.6 19.2 89.6 19.2 64 0 115.2-22.4 160-64 41.6-41.6 64-96 64-160 0-32-6.4-64-19.2-89.6l-51.2 51.2c3.2 12.8 6.4 25.6 6.4 38.4 0 44.8-16 83.2-48 112-32 28.8-67.2 48-112 48Z"
      })
    ]));
  }
}), no = to, ro = /* @__PURE__ */ Q({
  name: "Loading",
  __name: "loading",
  setup(t) {
    return (n, r) => (D(), R("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      K("path", {
        fill: "currentColor",
        d: "M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32m0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32m448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32m-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32M195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0m-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"
      })
    ]));
  }
}), Tn = ro, oo = /* @__PURE__ */ Q({
  name: "View",
  __name: "view",
  setup(t) {
    return (n, r) => (D(), R("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      K("path", {
        fill: "currentColor",
        d: "M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352m0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448m0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160"
      })
    ]));
  }
}), ao = oo;
const jn = "__epPropKey", Ge = (t) => t, io = (t) => wt(t) && !!t[jn], Pn = (t, n) => {
  if (!wt(t) || io(t))
    return t;
  const { values: r, required: s, default: u, type: c, validator: f } = t, _ = {
    type: c,
    required: !!s,
    validator: r || f ? (M) => {
      let v = !1, g = [];
      if (r && (g = Array.from(r), dn(t, "default") && g.push(u), v || (v = g.includes(M))), f && (v || (v = f(M))), !v && g.length > 0) {
        const x = [...new Set(g)].map((y) => JSON.stringify(y)).join(", ");
        dr(`Invalid prop: validation failed${n ? ` for prop "${n}"` : ""}. Expected one of [${x}], got value ${JSON.stringify(M)}.`);
      }
      return v;
    } : void 0,
    [jn]: !0
  };
  return dn(t, "default") && (_.default = u), _;
}, qt = (t) => kn(Object.entries(t).map(([n, r]) => [
  n,
  Pn(r, n)
])), St = Ge([
  String,
  Object,
  Function
]), so = {
  validating: Tn,
  success: Xr,
  error: Fn
}, Zt = (t, n) => {
  if (t.install = (r) => {
    for (const s of [t, ...Object.values(n ?? {})])
      r.component(s.name, s);
  }, n)
    for (const [r, s] of Object.entries(n))
      t[r] = s;
  return t;
}, uo = (t) => (t.install = Rn, t), zt = "update:modelValue", lo = ["", "default", "small", "large"], co = (t) => /([\uAC00-\uD7AF\u3130-\u318F])+/gi.test(t), fo = (t) => t, po = ["class", "style"], go = /^on[A-Z]/, ho = (t = {}) => {
  const { excludeListeners: n = !1, excludeKeys: r } = t, s = A(() => ((r == null ? void 0 : r.value) || []).concat(po)), u = pe();
  return u ? A(() => {
    var c;
    return kn(Object.entries((c = u.proxy) == null ? void 0 : c.$attrs).filter(([f]) => !s.value.includes(f) && !(n && go.test(f))));
  }) : (Te("use-attrs", "getCurrentInstance() returned null. useAttrs() must be called at the top of a setup function"), A(() => ({})));
}, vo = ({ from: t, replacement: n, scope: r, version: s, ref: u, type: c = "API" }, f) => {
  we(() => w(f), (p) => {
    p && Te(r, `[${c}] ${t} is about to be deprecated in version ${s}, please use ${n} instead.
For more detail, please visit: ${u}
`);
  }, {
    immediate: !0
  });
}, At = "el", bo = "is-", De = (t, n, r, s, u) => {
  let c = `${t}-${n}`;
  return r && (c += `-${r}`), s && (c += `__${s}`), u && (c += `--${u}`), c;
}, mo = Symbol("namespaceContextKey"), zn = (t) => {
  const n = t || (pe() ? oe(mo, B(At)) : B(At));
  return A(() => w(n) || At);
}, Ke = (t, n) => {
  const r = zn(n);
  return {
    namespace: r,
    b: (h = "") => De(r.value, t, h, "", ""),
    e: (h) => h ? De(r.value, t, "", h, "") : "",
    m: (h) => h ? De(r.value, t, "", "", h) : "",
    be: (h, $) => h && $ ? De(r.value, t, h, $, "") : "",
    em: (h, $) => h && $ ? De(r.value, t, "", h, $) : "",
    bm: (h, $) => h && $ ? De(r.value, t, h, "", $) : "",
    bem: (h, $, C) => h && $ && C ? De(r.value, t, h, $, C) : "",
    is: (h, ...$) => {
      const C = $.length >= 1 ? $[0] : !0;
      return h && C ? `${bo}${h}` : "";
    },
    cssVar: (h) => {
      const $ = {};
      for (const C in h)
        h[C] && ($[`--${r.value}-${C}`] = h[C]);
      return $;
    },
    cssVarName: (h) => `--${r.value}-${h}`,
    cssVarBlock: (h) => {
      const $ = {};
      for (const C in h)
        h[C] && ($[`--${r.value}-${t}-${C}`] = h[C]);
      return $;
    },
    cssVarBlockName: (h) => `--${r.value}-${t}-${h}`
  };
}, Bn = (t) => {
  const n = pe();
  return A(() => {
    var r, s;
    return (s = (r = n == null ? void 0 : n.proxy) == null ? void 0 : r.$props) == null ? void 0 : s[t];
  });
}, Bt = {
  prefix: Math.floor(Math.random() * 1e4),
  current: 0
}, _o = Symbol("elIdInjection"), yo = () => pe() ? oe(_o, Bt) : Bt, wo = (t) => {
  const n = yo();
  !ot && n === Bt && Te("IdInjection", `Looks like you are using server rendering, you must provide a id provider to ensure the hydration process to be succeed
usage: app.provide(ID_INJECTION_KEY, {
  prefix: number,
  current: number,
})`);
  const r = zn();
  return A(() => w(t) || `${r.value}-id-${n.prefix}-${n.current++}`);
};
function So(t) {
  const n = B();
  function r() {
    if (t.value == null)
      return;
    const { selectionStart: u, selectionEnd: c, value: f } = t.value;
    if (u == null || c == null)
      return;
    const p = f.slice(0, Math.max(0, u)), _ = f.slice(Math.max(0, c));
    n.value = {
      selectionStart: u,
      selectionEnd: c,
      value: f,
      beforeTxt: p,
      afterTxt: _
    };
  }
  function s() {
    if (t.value == null || n.value == null)
      return;
    const { value: u } = t.value, { beforeTxt: c, afterTxt: f, selectionStart: p } = n.value;
    if (c == null || f == null || p == null)
      return;
    let _ = u.length;
    if (u.endsWith(f))
      _ = u.length - f.length;
    else if (u.startsWith(c))
      _ = c.length;
    else {
      const M = c[p - 1], v = u.indexOf(M, p - 1);
      v !== -1 && (_ = v + 1);
    }
    t.value.setSelectionRange(_, _);
  }
  return [r, s];
}
const Ln = Pn({
  type: String,
  values: lo,
  required: !1
}), xo = Symbol("size"), Oo = () => {
  const t = oe(xo, {});
  return A(() => w(t.size) || "");
};
function Mo(t, { afterFocus: n, beforeBlur: r, afterBlur: s } = {}) {
  const u = pe(), { emit: c } = u, f = et(), p = B(!1), _ = (g) => {
    p.value || (p.value = !0, c("focus", g), n == null || n());
  }, M = (g) => {
    var x;
    Hr(r) && r(g) || g.relatedTarget && ((x = f.value) != null && x.contains(g.relatedTarget)) || (p.value = !1, c("blur", g), s == null || s());
  }, v = () => {
    var g;
    (g = t.value) == null || g.focus();
  };
  return we(f, (g) => {
    g && g.setAttribute("tabindex", "-1");
  }), Nr(f, "click", v), {
    wrapperRef: f,
    isFocused: p,
    handleFocus: _,
    handleBlur: M
  };
}
const $o = Symbol(), pn = B();
function Eo(t, n = void 0) {
  const r = pe() ? oe($o, pn) : pn;
  return t ? A(() => {
    var s, u;
    return (u = (s = r.value) == null ? void 0 : s[t]) != null ? u : n;
  }) : r;
}
var Mt = (t, n) => {
  const r = t.__vccOpts || t;
  for (const [s, u] of n)
    r[s] = u;
  return r;
};
const Co = qt({
  size: {
    type: Ge([Number, String])
  },
  color: {
    type: String
  }
}), Do = Q({
  name: "ElIcon",
  inheritAttrs: !1
}), Io = /* @__PURE__ */ Q({
  ...Do,
  props: Co,
  setup(t) {
    const n = t, r = Ke("icon"), s = A(() => {
      const { size: u, color: c } = n;
      return !u && !c ? {} : {
        fontSize: Gr(u) ? void 0 : Qr(u),
        "--color": c
      };
    });
    return (u, c) => (D(), R("i", tt({
      class: w(r).b(),
      style: w(s)
    }, u.$attrs), [
      re(u.$slots, "default")
    ], 16));
  }
});
var No = /* @__PURE__ */ Mt(Io, [["__file", "icon.vue"]]);
const Ae = Zt(No), Qt = Symbol("formContextKey"), Vn = Symbol("formItemContextKey"), Un = (t, n = {}) => {
  const r = B(void 0), s = n.prop ? r : Bn("size"), u = n.global ? r : Oo(), c = n.form ? { size: void 0 } : oe(Qt, void 0), f = n.formItem ? { size: void 0 } : oe(Vn, void 0);
  return A(() => s.value || w(t) || (f == null ? void 0 : f.size) || (c == null ? void 0 : c.size) || u.value || "");
}, Jt = (t) => {
  const n = Bn("disabled"), r = oe(Qt, void 0);
  return A(() => n.value || w(t) || (r == null ? void 0 : r.disabled) || !1);
}, Hn = () => {
  const t = oe(Qt, void 0), n = oe(Vn, void 0);
  return {
    form: t,
    formItem: n
  };
}, Ao = (t, {
  formItemContext: n,
  disableIdGeneration: r,
  disableIdManagement: s
}) => {
  r || (r = B(!1)), s || (s = B(!1));
  const u = B();
  let c;
  const f = A(() => {
    var p;
    return !!(!t.label && n && n.inputIds && ((p = n.inputIds) == null ? void 0 : p.length) <= 1);
  });
  return Gt(() => {
    c = we([yt(t, "id"), r], ([p, _]) => {
      const M = p ?? (_ ? void 0 : wo().value);
      M !== u.value && (n != null && n.removeInputId && (u.value && n.removeInputId(u.value), !(s != null && s.value) && !_ && M && n.addInputId(M)), u.value = M);
    }, { immediate: !0 });
  }), pr(() => {
    c && c(), n != null && n.removeInputId && u.value && n.removeInputId(u.value);
  }), {
    isLabeledByFormItem: f,
    inputId: u
  };
};
let ee;
const Ro = `
  height:0 !important;
  visibility:hidden !important;
  ${Vr() ? "" : "overflow:hidden !important;"}
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important;
`, ko = [
  "letter-spacing",
  "line-height",
  "padding-top",
  "padding-bottom",
  "font-family",
  "font-weight",
  "font-size",
  "text-rendering",
  "text-transform",
  "width",
  "text-indent",
  "padding-left",
  "padding-right",
  "border-width",
  "box-sizing"
];
function Fo(t) {
  const n = window.getComputedStyle(t), r = n.getPropertyValue("box-sizing"), s = Number.parseFloat(n.getPropertyValue("padding-bottom")) + Number.parseFloat(n.getPropertyValue("padding-top")), u = Number.parseFloat(n.getPropertyValue("border-bottom-width")) + Number.parseFloat(n.getPropertyValue("border-top-width"));
  return { contextStyle: ko.map((f) => `${f}:${n.getPropertyValue(f)}`).join(";"), paddingSize: s, borderSize: u, boxSizing: r };
}
function gn(t, n = 1, r) {
  var s;
  ee || (ee = document.createElement("textarea"), document.body.appendChild(ee));
  const { paddingSize: u, borderSize: c, boxSizing: f, contextStyle: p } = Fo(t);
  ee.setAttribute("style", `${p};${Ro}`), ee.value = t.value || t.placeholder || "";
  let _ = ee.scrollHeight;
  const M = {};
  f === "border-box" ? _ = _ + c : f === "content-box" && (_ = _ - u), ee.value = "";
  const v = ee.scrollHeight - u;
  if (Pt(n)) {
    let g = v * n;
    f === "border-box" && (g = g + u + c), _ = Math.max(g, _), M.minHeight = `${g}px`;
  }
  if (Pt(r)) {
    let g = v * r;
    f === "border-box" && (g = g + u + c), _ = Math.min(g, _);
  }
  return M.height = `${_}px`, (s = ee.parentNode) == null || s.removeChild(ee), ee = void 0, M;
}
const To = qt({
  id: {
    type: String,
    default: void 0
  },
  size: Ln,
  disabled: Boolean,
  modelValue: {
    type: Ge([
      String,
      Number,
      Object
    ]),
    default: ""
  },
  maxlength: {
    type: [String, Number]
  },
  minlength: {
    type: [String, Number]
  },
  type: {
    type: String,
    default: "text"
  },
  resize: {
    type: String,
    values: ["none", "both", "horizontal", "vertical"]
  },
  autosize: {
    type: Ge([Boolean, Object]),
    default: !1
  },
  autocomplete: {
    type: String,
    default: "off"
  },
  formatter: {
    type: Function
  },
  parser: {
    type: Function
  },
  placeholder: {
    type: String
  },
  form: {
    type: String
  },
  readonly: {
    type: Boolean,
    default: !1
  },
  clearable: {
    type: Boolean,
    default: !1
  },
  showPassword: {
    type: Boolean,
    default: !1
  },
  showWordLimit: {
    type: Boolean,
    default: !1
  },
  suffixIcon: {
    type: St
  },
  prefixIcon: {
    type: St
  },
  containerRole: {
    type: String,
    default: void 0
  },
  label: {
    type: String,
    default: void 0
  },
  tabindex: {
    type: [String, Number],
    default: 0
  },
  validateEvent: {
    type: Boolean,
    default: !0
  },
  inputStyle: {
    type: Ge([Object, Array, String]),
    default: () => fo({})
  },
  autofocus: {
    type: Boolean,
    default: !1
  }
}), jo = {
  [zt]: (t) => Ye(t),
  input: (t) => Ye(t),
  change: (t) => Ye(t),
  focus: (t) => t instanceof FocusEvent,
  blur: (t) => t instanceof FocusEvent,
  clear: () => !0,
  mouseleave: (t) => t instanceof MouseEvent,
  mouseenter: (t) => t instanceof MouseEvent,
  keydown: (t) => t instanceof Event,
  compositionstart: (t) => t instanceof CompositionEvent,
  compositionupdate: (t) => t instanceof CompositionEvent,
  compositionend: (t) => t instanceof CompositionEvent
}, Po = ["role"], zo = ["id", "minlength", "maxlength", "type", "disabled", "readonly", "autocomplete", "tabindex", "aria-label", "placeholder", "form", "autofocus"], Bo = ["id", "minlength", "maxlength", "tabindex", "disabled", "readonly", "autocomplete", "aria-label", "placeholder", "form", "autofocus"], Lo = Q({
  name: "ElInput",
  inheritAttrs: !1
}), Vo = /* @__PURE__ */ Q({
  ...Lo,
  props: To,
  emits: jo,
  setup(t, { expose: n, emit: r }) {
    const s = t, u = gr(), c = En(), f = A(() => {
      const i = {};
      return s.containerRole === "combobox" && (i["aria-haspopup"] = u["aria-haspopup"], i["aria-owns"] = u["aria-owns"], i["aria-expanded"] = u["aria-expanded"]), i;
    }), p = A(() => [
      s.type === "textarea" ? $.b() : h.b(),
      h.m(y.value),
      h.is("disabled", I.value),
      h.is("exceed", Et.value),
      {
        [h.b("group")]: c.prepend || c.append,
        [h.bm("group", "append")]: c.append,
        [h.bm("group", "prepend")]: c.prepend,
        [h.m("prefix")]: c.prefix || s.prefixIcon,
        [h.m("suffix")]: c.suffix || s.suffixIcon || s.clearable || s.showPassword,
        [h.bm("suffix", "password-clear")]: H.value && G.value,
        [h.b("hidden")]: s.type === "hidden"
      },
      u.class
    ]), _ = A(() => [
      h.e("wrapper"),
      h.is("focus", Pe.value)
    ]), M = ho({
      excludeKeys: A(() => Object.keys(f.value))
    }), { form: v, formItem: g } = Hn(), { inputId: x } = Ao(s, {
      formItemContext: g
    }), y = Un(), I = Jt(), h = Ke("input"), $ = Ke("textarea"), C = et(), k = et(), ie = B(!1), se = B(!1), Oe = B(!1), at = B(), Me = et(s.inputStyle), ge = A(() => C.value || k.value), { wrapperRef: it, isFocused: Pe, handleFocus: he, handleBlur: J } = Mo(ge, {
      afterBlur() {
        var i;
        s.validateEvent && ((i = g == null ? void 0 : g.validate) == null || i.call(g, "blur").catch((l) => Te(l)));
      }
    }), Qe = A(() => {
      var i;
      return (i = v == null ? void 0 : v.statusIcon) != null ? i : !1;
    }), U = A(() => (g == null ? void 0 : g.validateState) || ""), V = A(() => U.value && so[U.value]), F = A(() => Oe.value ? ao : no), ue = A(() => [
      u.style
    ]), ze = A(() => [
      s.inputStyle,
      Me.value,
      { resize: s.resize }
    ]), ne = A(() => Yr(s.modelValue) ? "" : String(s.modelValue)), H = A(() => s.clearable && !I.value && !s.readonly && !!ne.value && (Pe.value || ie.value)), G = A(() => s.showPassword && !I.value && !s.readonly && !!ne.value && (!!ne.value || Pe.value)), ve = A(() => s.showWordLimit && !!s.maxlength && (s.type === "text" || s.type === "textarea") && !I.value && !s.readonly && !s.showPassword), $e = A(() => ne.value.length), Et = A(() => !!ve.value && $e.value > Number(s.maxlength)), Ct = A(() => !!c.suffix || !!s.suffixIcon || H.value || s.showPassword || ve.value || !!U.value && Qe.value), [Dt, le] = So(C);
    Tr(k, (i) => {
      if (It(), !ve.value || s.resize !== "both")
        return;
      const l = i[0], { width: d } = l.contentRect;
      at.value = {
        right: `calc(100% - ${d + 15 + 6}px)`
      };
    });
    const Ee = () => {
      const { type: i, autosize: l } = s;
      if (!(!ot || i !== "textarea" || !k.value))
        if (l) {
          const d = wt(l) ? l.minRows : void 0, m = wt(l) ? l.maxRows : void 0, O = gn(k.value, d, m);
          Me.value = {
            overflowY: "hidden",
            ...O
          }, Ne(() => {
            k.value.offsetHeight, Me.value = O;
          });
        } else
          Me.value = {
            minHeight: gn(k.value).minHeight
          };
    }, It = ((i) => {
      let l = !1;
      return () => {
        var d;
        if (l || !s.autosize)
          return;
        ((d = k.value) == null ? void 0 : d.offsetParent) === null || (i(), l = !0);
      };
    })(Ee), Ce = () => {
      const i = ge.value, l = s.formatter ? s.formatter(ne.value) : ne.value;
      !i || i.value === l || (i.value = l);
    }, Be = async (i) => {
      Dt();
      let { value: l } = i.target;
      if (s.formatter && (l = s.parser ? s.parser(l) : l), !se.value) {
        if (l === ne.value) {
          Ce();
          return;
        }
        r(zt, l), r("input", l), await Ne(), Ce(), le();
      }
    }, ut = (i) => {
      r("change", i.target.value);
    }, lt = (i) => {
      r("compositionstart", i), se.value = !0;
    }, Le = (i) => {
      var l;
      r("compositionupdate", i);
      const d = (l = i.target) == null ? void 0 : l.value, m = d[d.length - 1] || "";
      se.value = !co(m);
    }, Je = (i) => {
      r("compositionend", i), se.value && (se.value = !1, Be(i));
    }, ct = () => {
      Oe.value = !Oe.value, ft();
    }, ft = async () => {
      var i;
      await Ne(), (i = ge.value) == null || i.focus();
    }, dt = () => {
      var i;
      return (i = ge.value) == null ? void 0 : i.blur();
    }, Nt = (i) => {
      ie.value = !1, r("mouseleave", i);
    }, Xe = (i) => {
      ie.value = !0, r("mouseenter", i);
    }, Ve = (i) => {
      r("keydown", i);
    }, e = () => {
      var i;
      (i = ge.value) == null || i.select();
    }, o = () => {
      r(zt, ""), r("change", ""), r("clear"), r("input", "");
    };
    return we(() => s.modelValue, () => {
      var i;
      Ne(() => Ee()), s.validateEvent && ((i = g == null ? void 0 : g.validate) == null || i.call(g, "change").catch((l) => Te(l)));
    }), we(ne, () => Ce()), we(() => s.type, async () => {
      await Ne(), Ce(), Ee();
    }), Gt(() => {
      !s.formatter && s.parser && Te("ElInput", "If you set the parser, you also need to set the formatter."), Ce(), Ne(Ee);
    }), n({
      input: C,
      textarea: k,
      ref: ge,
      textareaStyle: ze,
      autosize: yt(s, "autosize"),
      focus: ft,
      blur: dt,
      select: e,
      clear: o,
      resizeTextarea: Ee
    }), (i, l) => (D(), R("div", tt(w(f), {
      class: w(p),
      style: w(ue),
      role: i.containerRole,
      onMouseenter: Xe,
      onMouseleave: Nt
    }), [
      j(" input "),
      i.type !== "textarea" ? (D(), R(nt, { key: 0 }, [
        j(" prepend slot "),
        i.$slots.prepend ? (D(), R("div", {
          key: 0,
          class: P(w(h).be("group", "prepend"))
        }, [
          re(i.$slots, "prepend")
        ], 2)) : j("v-if", !0),
        K("div", {
          ref_key: "wrapperRef",
          ref: it,
          class: P(w(_))
        }, [
          j(" prefix slot "),
          i.$slots.prefix || i.prefixIcon ? (D(), R("span", {
            key: 0,
            class: P(w(h).e("prefix"))
          }, [
            K("span", {
              class: P(w(h).e("prefix-inner"))
            }, [
              re(i.$slots, "prefix"),
              i.prefixIcon ? (D(), z(w(Ae), {
                key: 0,
                class: P(w(h).e("icon"))
              }, {
                default: de(() => [
                  (D(), z(_e(i.prefixIcon)))
                ]),
                _: 1
              }, 8, ["class"])) : j("v-if", !0)
            ], 2)
          ], 2)) : j("v-if", !0),
          K("input", tt({
            id: w(x),
            ref_key: "input",
            ref: C,
            class: w(h).e("inner")
          }, w(M), {
            minlength: i.minlength,
            maxlength: i.maxlength,
            type: i.showPassword ? Oe.value ? "text" : "password" : i.type,
            disabled: w(I),
            readonly: i.readonly,
            autocomplete: i.autocomplete,
            tabindex: i.tabindex,
            "aria-label": i.label,
            placeholder: i.placeholder,
            style: i.inputStyle,
            form: i.form,
            autofocus: i.autofocus,
            onCompositionstart: lt,
            onCompositionupdate: Le,
            onCompositionend: Je,
            onInput: Be,
            onFocus: l[0] || (l[0] = (...d) => w(he) && w(he)(...d)),
            onBlur: l[1] || (l[1] = (...d) => w(J) && w(J)(...d)),
            onChange: ut,
            onKeydown: Ve
          }), null, 16, zo),
          j(" suffix slot "),
          w(Ct) ? (D(), R("span", {
            key: 1,
            class: P(w(h).e("suffix"))
          }, [
            K("span", {
              class: P(w(h).e("suffix-inner"))
            }, [
              !w(H) || !w(G) || !w(ve) ? (D(), R(nt, { key: 0 }, [
                re(i.$slots, "suffix"),
                i.suffixIcon ? (D(), z(w(Ae), {
                  key: 0,
                  class: P(w(h).e("icon"))
                }, {
                  default: de(() => [
                    (D(), z(_e(i.suffixIcon)))
                  ]),
                  _: 1
                }, 8, ["class"])) : j("v-if", !0)
              ], 64)) : j("v-if", !0),
              w(H) ? (D(), z(w(Ae), {
                key: 1,
                class: P([w(h).e("icon"), w(h).e("clear")]),
                onMousedown: hr(w(Rn), ["prevent"]),
                onClick: o
              }, {
                default: de(() => [
                  Cn(w(Fn))
                ]),
                _: 1
              }, 8, ["class", "onMousedown"])) : j("v-if", !0),
              w(G) ? (D(), z(w(Ae), {
                key: 2,
                class: P([w(h).e("icon"), w(h).e("password")]),
                onClick: ct
              }, {
                default: de(() => [
                  (D(), z(_e(w(F))))
                ]),
                _: 1
              }, 8, ["class"])) : j("v-if", !0),
              w(ve) ? (D(), R("span", {
                key: 3,
                class: P(w(h).e("count"))
              }, [
                K("span", {
                  class: P(w(h).e("count-inner"))
                }, Re(w($e)) + " / " + Re(i.maxlength), 3)
              ], 2)) : j("v-if", !0),
              w(U) && w(V) && w(Qe) ? (D(), z(w(Ae), {
                key: 4,
                class: P([
                  w(h).e("icon"),
                  w(h).e("validateIcon"),
                  w(h).is("loading", w(U) === "validating")
                ])
              }, {
                default: de(() => [
                  (D(), z(_e(w(V))))
                ]),
                _: 1
              }, 8, ["class"])) : j("v-if", !0)
            ], 2)
          ], 2)) : j("v-if", !0)
        ], 2),
        j(" append slot "),
        i.$slots.append ? (D(), R("div", {
          key: 1,
          class: P(w(h).be("group", "append"))
        }, [
          re(i.$slots, "append")
        ], 2)) : j("v-if", !0)
      ], 64)) : (D(), R(nt, { key: 1 }, [
        j(" textarea "),
        K("textarea", tt({
          id: w(x),
          ref_key: "textarea",
          ref: k,
          class: w($).e("inner")
        }, w(M), {
          minlength: i.minlength,
          maxlength: i.maxlength,
          tabindex: i.tabindex,
          disabled: w(I),
          readonly: i.readonly,
          autocomplete: i.autocomplete,
          style: w(ze),
          "aria-label": i.label,
          placeholder: i.placeholder,
          form: i.form,
          autofocus: i.autofocus,
          onCompositionstart: lt,
          onCompositionupdate: Le,
          onCompositionend: Je,
          onInput: Be,
          onFocus: l[2] || (l[2] = (...d) => w(he) && w(he)(...d)),
          onBlur: l[3] || (l[3] = (...d) => w(J) && w(J)(...d)),
          onChange: ut,
          onKeydown: Ve
        }), null, 16, Bo),
        w(ve) ? (D(), R("span", {
          key: 0,
          style: vr(at.value),
          class: P(w(h).e("count"))
        }, Re(w($e)) + " / " + Re(i.maxlength), 7)) : j("v-if", !0)
      ], 64))
    ], 16, Po));
  }
});
var Uo = /* @__PURE__ */ Mt(Vo, [["__file", "input.vue"]]);
const Wn = Zt(Uo), Yn = Symbol("buttonGroupContextKey"), Ho = (t, n) => {
  vo({
    from: "type.text",
    replacement: "link",
    version: "3.0.0",
    scope: "props",
    ref: "https://element-plus.org/en-US/component/button.html#button-attributes"
  }, A(() => t.type === "text"));
  const r = oe(Yn, void 0), s = Eo("button"), { form: u } = Hn(), c = Un(A(() => r == null ? void 0 : r.size)), f = Jt(), p = B(), _ = En(), M = A(() => t.type || (r == null ? void 0 : r.type) || ""), v = A(() => {
    var I, h, $;
    return ($ = (h = t.autoInsertSpace) != null ? h : (I = s.value) == null ? void 0 : I.autoInsertSpace) != null ? $ : !1;
  }), g = A(() => t.tag === "button" ? {
    ariaDisabled: f.value || t.loading,
    disabled: f.value || t.loading,
    autofocus: t.autofocus,
    type: t.nativeType
  } : {}), x = A(() => {
    var I;
    const h = (I = _.default) == null ? void 0 : I.call(_);
    if (v.value && (h == null ? void 0 : h.length) === 1) {
      const $ = h[0];
      if (($ == null ? void 0 : $.type) === br) {
        const C = $.children;
        return new RegExp("^\\p{Unified_Ideograph}{2}$", "u").test(C.trim());
      }
    }
    return !1;
  });
  return {
    _disabled: f,
    _size: c,
    _type: M,
    _ref: p,
    _props: g,
    shouldAddSpace: x,
    handleClick: (I) => {
      t.nativeType === "reset" && (u == null || u.resetFields()), n("click", I);
    }
  };
}, Wo = [
  "default",
  "primary",
  "success",
  "warning",
  "info",
  "danger",
  "text",
  ""
], Yo = ["button", "submit", "reset"], Lt = qt({
  size: Ln,
  disabled: Boolean,
  type: {
    type: String,
    values: Wo,
    default: ""
  },
  icon: {
    type: St
  },
  nativeType: {
    type: String,
    values: Yo,
    default: "button"
  },
  loading: Boolean,
  loadingIcon: {
    type: St,
    default: () => Tn
  },
  plain: Boolean,
  text: Boolean,
  link: Boolean,
  bg: Boolean,
  autofocus: Boolean,
  round: Boolean,
  circle: Boolean,
  color: String,
  dark: Boolean,
  autoInsertSpace: {
    type: Boolean,
    default: void 0
  },
  tag: {
    type: Ge([String, Object]),
    default: "button"
  }
}), Go = {
  click: (t) => t instanceof MouseEvent
};
function L(t, n) {
  Ko(t) && (t = "100%");
  var r = qo(t);
  return t = n === 360 ? t : Math.min(n, Math.max(0, parseFloat(t))), r && (t = parseInt(String(t * n), 10) / 100), Math.abs(t - n) < 1e-6 ? 1 : (n === 360 ? t = (t < 0 ? t % n + n : t % n) / parseFloat(String(n)) : t = t % n / parseFloat(String(n)), t);
}
function vt(t) {
  return Math.min(1, Math.max(0, t));
}
function Ko(t) {
  return typeof t == "string" && t.indexOf(".") !== -1 && parseFloat(t) === 1;
}
function qo(t) {
  return typeof t == "string" && t.indexOf("%") !== -1;
}
function Gn(t) {
  return t = parseFloat(t), (isNaN(t) || t < 0 || t > 1) && (t = 1), t;
}
function bt(t) {
  return t <= 1 ? "".concat(Number(t) * 100, "%") : t;
}
function ke(t) {
  return t.length === 1 ? "0" + t : String(t);
}
function Zo(t, n, r) {
  return {
    r: L(t, 255) * 255,
    g: L(n, 255) * 255,
    b: L(r, 255) * 255
  };
}
function hn(t, n, r) {
  t = L(t, 255), n = L(n, 255), r = L(r, 255);
  var s = Math.max(t, n, r), u = Math.min(t, n, r), c = 0, f = 0, p = (s + u) / 2;
  if (s === u)
    f = 0, c = 0;
  else {
    var _ = s - u;
    switch (f = p > 0.5 ? _ / (2 - s - u) : _ / (s + u), s) {
      case t:
        c = (n - r) / _ + (n < r ? 6 : 0);
        break;
      case n:
        c = (r - t) / _ + 2;
        break;
      case r:
        c = (t - n) / _ + 4;
        break;
    }
    c /= 6;
  }
  return { h: c, s: f, l: p };
}
function Rt(t, n, r) {
  return r < 0 && (r += 1), r > 1 && (r -= 1), r < 1 / 6 ? t + (n - t) * (6 * r) : r < 1 / 2 ? n : r < 2 / 3 ? t + (n - t) * (2 / 3 - r) * 6 : t;
}
function Qo(t, n, r) {
  var s, u, c;
  if (t = L(t, 360), n = L(n, 100), r = L(r, 100), n === 0)
    u = r, c = r, s = r;
  else {
    var f = r < 0.5 ? r * (1 + n) : r + n - r * n, p = 2 * r - f;
    s = Rt(p, f, t + 1 / 3), u = Rt(p, f, t), c = Rt(p, f, t - 1 / 3);
  }
  return { r: s * 255, g: u * 255, b: c * 255 };
}
function vn(t, n, r) {
  t = L(t, 255), n = L(n, 255), r = L(r, 255);
  var s = Math.max(t, n, r), u = Math.min(t, n, r), c = 0, f = s, p = s - u, _ = s === 0 ? 0 : p / s;
  if (s === u)
    c = 0;
  else {
    switch (s) {
      case t:
        c = (n - r) / p + (n < r ? 6 : 0);
        break;
      case n:
        c = (r - t) / p + 2;
        break;
      case r:
        c = (t - n) / p + 4;
        break;
    }
    c /= 6;
  }
  return { h: c, s: _, v: f };
}
function Jo(t, n, r) {
  t = L(t, 360) * 6, n = L(n, 100), r = L(r, 100);
  var s = Math.floor(t), u = t - s, c = r * (1 - n), f = r * (1 - u * n), p = r * (1 - (1 - u) * n), _ = s % 6, M = [r, f, c, c, p, r][_], v = [p, r, r, f, c, c][_], g = [c, c, p, r, r, f][_];
  return { r: M * 255, g: v * 255, b: g * 255 };
}
function bn(t, n, r, s) {
  var u = [
    ke(Math.round(t).toString(16)),
    ke(Math.round(n).toString(16)),
    ke(Math.round(r).toString(16))
  ];
  return s && u[0].startsWith(u[0].charAt(1)) && u[1].startsWith(u[1].charAt(1)) && u[2].startsWith(u[2].charAt(1)) ? u[0].charAt(0) + u[1].charAt(0) + u[2].charAt(0) : u.join("");
}
function Xo(t, n, r, s, u) {
  var c = [
    ke(Math.round(t).toString(16)),
    ke(Math.round(n).toString(16)),
    ke(Math.round(r).toString(16)),
    ke(ea(s))
  ];
  return u && c[0].startsWith(c[0].charAt(1)) && c[1].startsWith(c[1].charAt(1)) && c[2].startsWith(c[2].charAt(1)) && c[3].startsWith(c[3].charAt(1)) ? c[0].charAt(0) + c[1].charAt(0) + c[2].charAt(0) + c[3].charAt(0) : c.join("");
}
function ea(t) {
  return Math.round(parseFloat(t) * 255).toString(16);
}
function mn(t) {
  return q(t) / 255;
}
function q(t) {
  return parseInt(t, 16);
}
function ta(t) {
  return {
    r: t >> 16,
    g: (t & 65280) >> 8,
    b: t & 255
  };
}
var Vt = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  goldenrod: "#daa520",
  gold: "#ffd700",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavenderblush: "#fff0f5",
  lavender: "#e6e6fa",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
};
function na(t) {
  var n = { r: 0, g: 0, b: 0 }, r = 1, s = null, u = null, c = null, f = !1, p = !1;
  return typeof t == "string" && (t = aa(t)), typeof t == "object" && (fe(t.r) && fe(t.g) && fe(t.b) ? (n = Zo(t.r, t.g, t.b), f = !0, p = String(t.r).substr(-1) === "%" ? "prgb" : "rgb") : fe(t.h) && fe(t.s) && fe(t.v) ? (s = bt(t.s), u = bt(t.v), n = Jo(t.h, s, u), f = !0, p = "hsv") : fe(t.h) && fe(t.s) && fe(t.l) && (s = bt(t.s), c = bt(t.l), n = Qo(t.h, s, c), f = !0, p = "hsl"), Object.prototype.hasOwnProperty.call(t, "a") && (r = t.a)), r = Gn(r), {
    ok: f,
    format: t.format || p,
    r: Math.min(255, Math.max(n.r, 0)),
    g: Math.min(255, Math.max(n.g, 0)),
    b: Math.min(255, Math.max(n.b, 0)),
    a: r
  };
}
var ra = "[-\\+]?\\d+%?", oa = "[-\\+]?\\d*\\.\\d+%?", ye = "(?:".concat(oa, ")|(?:").concat(ra, ")"), kt = "[\\s|\\(]+(".concat(ye, ")[,|\\s]+(").concat(ye, ")[,|\\s]+(").concat(ye, ")\\s*\\)?"), Ft = "[\\s|\\(]+(".concat(ye, ")[,|\\s]+(").concat(ye, ")[,|\\s]+(").concat(ye, ")[,|\\s]+(").concat(ye, ")\\s*\\)?"), te = {
  CSS_UNIT: new RegExp(ye),
  rgb: new RegExp("rgb" + kt),
  rgba: new RegExp("rgba" + Ft),
  hsl: new RegExp("hsl" + kt),
  hsla: new RegExp("hsla" + Ft),
  hsv: new RegExp("hsv" + kt),
  hsva: new RegExp("hsva" + Ft),
  hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
};
function aa(t) {
  if (t = t.trim().toLowerCase(), t.length === 0)
    return !1;
  var n = !1;
  if (Vt[t])
    t = Vt[t], n = !0;
  else if (t === "transparent")
    return { r: 0, g: 0, b: 0, a: 0, format: "name" };
  var r = te.rgb.exec(t);
  return r ? { r: r[1], g: r[2], b: r[3] } : (r = te.rgba.exec(t), r ? { r: r[1], g: r[2], b: r[3], a: r[4] } : (r = te.hsl.exec(t), r ? { h: r[1], s: r[2], l: r[3] } : (r = te.hsla.exec(t), r ? { h: r[1], s: r[2], l: r[3], a: r[4] } : (r = te.hsv.exec(t), r ? { h: r[1], s: r[2], v: r[3] } : (r = te.hsva.exec(t), r ? { h: r[1], s: r[2], v: r[3], a: r[4] } : (r = te.hex8.exec(t), r ? {
    r: q(r[1]),
    g: q(r[2]),
    b: q(r[3]),
    a: mn(r[4]),
    format: n ? "name" : "hex8"
  } : (r = te.hex6.exec(t), r ? {
    r: q(r[1]),
    g: q(r[2]),
    b: q(r[3]),
    format: n ? "name" : "hex"
  } : (r = te.hex4.exec(t), r ? {
    r: q(r[1] + r[1]),
    g: q(r[2] + r[2]),
    b: q(r[3] + r[3]),
    a: mn(r[4] + r[4]),
    format: n ? "name" : "hex8"
  } : (r = te.hex3.exec(t), r ? {
    r: q(r[1] + r[1]),
    g: q(r[2] + r[2]),
    b: q(r[3] + r[3]),
    format: n ? "name" : "hex"
  } : !1)))))))));
}
function fe(t) {
  return !!te.CSS_UNIT.exec(String(t));
}
var ia = (
  /** @class */
  function() {
    function t(n, r) {
      n === void 0 && (n = ""), r === void 0 && (r = {});
      var s;
      if (n instanceof t)
        return n;
      typeof n == "number" && (n = ta(n)), this.originalInput = n;
      var u = na(n);
      this.originalInput = n, this.r = u.r, this.g = u.g, this.b = u.b, this.a = u.a, this.roundA = Math.round(100 * this.a) / 100, this.format = (s = r.format) !== null && s !== void 0 ? s : u.format, this.gradientType = r.gradientType, this.r < 1 && (this.r = Math.round(this.r)), this.g < 1 && (this.g = Math.round(this.g)), this.b < 1 && (this.b = Math.round(this.b)), this.isValid = u.ok;
    }
    return t.prototype.isDark = function() {
      return this.getBrightness() < 128;
    }, t.prototype.isLight = function() {
      return !this.isDark();
    }, t.prototype.getBrightness = function() {
      var n = this.toRgb();
      return (n.r * 299 + n.g * 587 + n.b * 114) / 1e3;
    }, t.prototype.getLuminance = function() {
      var n = this.toRgb(), r, s, u, c = n.r / 255, f = n.g / 255, p = n.b / 255;
      return c <= 0.03928 ? r = c / 12.92 : r = Math.pow((c + 0.055) / 1.055, 2.4), f <= 0.03928 ? s = f / 12.92 : s = Math.pow((f + 0.055) / 1.055, 2.4), p <= 0.03928 ? u = p / 12.92 : u = Math.pow((p + 0.055) / 1.055, 2.4), 0.2126 * r + 0.7152 * s + 0.0722 * u;
    }, t.prototype.getAlpha = function() {
      return this.a;
    }, t.prototype.setAlpha = function(n) {
      return this.a = Gn(n), this.roundA = Math.round(100 * this.a) / 100, this;
    }, t.prototype.toHsv = function() {
      var n = vn(this.r, this.g, this.b);
      return { h: n.h * 360, s: n.s, v: n.v, a: this.a };
    }, t.prototype.toHsvString = function() {
      var n = vn(this.r, this.g, this.b), r = Math.round(n.h * 360), s = Math.round(n.s * 100), u = Math.round(n.v * 100);
      return this.a === 1 ? "hsv(".concat(r, ", ").concat(s, "%, ").concat(u, "%)") : "hsva(".concat(r, ", ").concat(s, "%, ").concat(u, "%, ").concat(this.roundA, ")");
    }, t.prototype.toHsl = function() {
      var n = hn(this.r, this.g, this.b);
      return { h: n.h * 360, s: n.s, l: n.l, a: this.a };
    }, t.prototype.toHslString = function() {
      var n = hn(this.r, this.g, this.b), r = Math.round(n.h * 360), s = Math.round(n.s * 100), u = Math.round(n.l * 100);
      return this.a === 1 ? "hsl(".concat(r, ", ").concat(s, "%, ").concat(u, "%)") : "hsla(".concat(r, ", ").concat(s, "%, ").concat(u, "%, ").concat(this.roundA, ")");
    }, t.prototype.toHex = function(n) {
      return n === void 0 && (n = !1), bn(this.r, this.g, this.b, n);
    }, t.prototype.toHexString = function(n) {
      return n === void 0 && (n = !1), "#" + this.toHex(n);
    }, t.prototype.toHex8 = function(n) {
      return n === void 0 && (n = !1), Xo(this.r, this.g, this.b, this.a, n);
    }, t.prototype.toHex8String = function(n) {
      return n === void 0 && (n = !1), "#" + this.toHex8(n);
    }, t.prototype.toRgb = function() {
      return {
        r: Math.round(this.r),
        g: Math.round(this.g),
        b: Math.round(this.b),
        a: this.a
      };
    }, t.prototype.toRgbString = function() {
      var n = Math.round(this.r), r = Math.round(this.g), s = Math.round(this.b);
      return this.a === 1 ? "rgb(".concat(n, ", ").concat(r, ", ").concat(s, ")") : "rgba(".concat(n, ", ").concat(r, ", ").concat(s, ", ").concat(this.roundA, ")");
    }, t.prototype.toPercentageRgb = function() {
      var n = function(r) {
        return "".concat(Math.round(L(r, 255) * 100), "%");
      };
      return {
        r: n(this.r),
        g: n(this.g),
        b: n(this.b),
        a: this.a
      };
    }, t.prototype.toPercentageRgbString = function() {
      var n = function(r) {
        return Math.round(L(r, 255) * 100);
      };
      return this.a === 1 ? "rgb(".concat(n(this.r), "%, ").concat(n(this.g), "%, ").concat(n(this.b), "%)") : "rgba(".concat(n(this.r), "%, ").concat(n(this.g), "%, ").concat(n(this.b), "%, ").concat(this.roundA, ")");
    }, t.prototype.toName = function() {
      if (this.a === 0)
        return "transparent";
      if (this.a < 1)
        return !1;
      for (var n = "#" + bn(this.r, this.g, this.b, !1), r = 0, s = Object.entries(Vt); r < s.length; r++) {
        var u = s[r], c = u[0], f = u[1];
        if (n === f)
          return c;
      }
      return !1;
    }, t.prototype.toString = function(n) {
      var r = !!n;
      n = n ?? this.format;
      var s = !1, u = this.a < 1 && this.a >= 0, c = !r && u && (n.startsWith("hex") || n === "name");
      return c ? n === "name" && this.a === 0 ? this.toName() : this.toRgbString() : (n === "rgb" && (s = this.toRgbString()), n === "prgb" && (s = this.toPercentageRgbString()), (n === "hex" || n === "hex6") && (s = this.toHexString()), n === "hex3" && (s = this.toHexString(!0)), n === "hex4" && (s = this.toHex8String(!0)), n === "hex8" && (s = this.toHex8String()), n === "name" && (s = this.toName()), n === "hsl" && (s = this.toHslString()), n === "hsv" && (s = this.toHsvString()), s || this.toHexString());
    }, t.prototype.toNumber = function() {
      return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
    }, t.prototype.clone = function() {
      return new t(this.toString());
    }, t.prototype.lighten = function(n) {
      n === void 0 && (n = 10);
      var r = this.toHsl();
      return r.l += n / 100, r.l = vt(r.l), new t(r);
    }, t.prototype.brighten = function(n) {
      n === void 0 && (n = 10);
      var r = this.toRgb();
      return r.r = Math.max(0, Math.min(255, r.r - Math.round(255 * -(n / 100)))), r.g = Math.max(0, Math.min(255, r.g - Math.round(255 * -(n / 100)))), r.b = Math.max(0, Math.min(255, r.b - Math.round(255 * -(n / 100)))), new t(r);
    }, t.prototype.darken = function(n) {
      n === void 0 && (n = 10);
      var r = this.toHsl();
      return r.l -= n / 100, r.l = vt(r.l), new t(r);
    }, t.prototype.tint = function(n) {
      return n === void 0 && (n = 10), this.mix("white", n);
    }, t.prototype.shade = function(n) {
      return n === void 0 && (n = 10), this.mix("black", n);
    }, t.prototype.desaturate = function(n) {
      n === void 0 && (n = 10);
      var r = this.toHsl();
      return r.s -= n / 100, r.s = vt(r.s), new t(r);
    }, t.prototype.saturate = function(n) {
      n === void 0 && (n = 10);
      var r = this.toHsl();
      return r.s += n / 100, r.s = vt(r.s), new t(r);
    }, t.prototype.greyscale = function() {
      return this.desaturate(100);
    }, t.prototype.spin = function(n) {
      var r = this.toHsl(), s = (r.h + n) % 360;
      return r.h = s < 0 ? 360 + s : s, new t(r);
    }, t.prototype.mix = function(n, r) {
      r === void 0 && (r = 50);
      var s = this.toRgb(), u = new t(n).toRgb(), c = r / 100, f = {
        r: (u.r - s.r) * c + s.r,
        g: (u.g - s.g) * c + s.g,
        b: (u.b - s.b) * c + s.b,
        a: (u.a - s.a) * c + s.a
      };
      return new t(f);
    }, t.prototype.analogous = function(n, r) {
      n === void 0 && (n = 6), r === void 0 && (r = 30);
      var s = this.toHsl(), u = 360 / r, c = [this];
      for (s.h = (s.h - (u * n >> 1) + 720) % 360; --n; )
        s.h = (s.h + u) % 360, c.push(new t(s));
      return c;
    }, t.prototype.complement = function() {
      var n = this.toHsl();
      return n.h = (n.h + 180) % 360, new t(n);
    }, t.prototype.monochromatic = function(n) {
      n === void 0 && (n = 6);
      for (var r = this.toHsv(), s = r.h, u = r.s, c = r.v, f = [], p = 1 / n; n--; )
        f.push(new t({ h: s, s: u, v: c })), c = (c + p) % 1;
      return f;
    }, t.prototype.splitcomplement = function() {
      var n = this.toHsl(), r = n.h;
      return [
        this,
        new t({ h: (r + 72) % 360, s: n.s, l: n.l }),
        new t({ h: (r + 216) % 360, s: n.s, l: n.l })
      ];
    }, t.prototype.onBackground = function(n) {
      var r = this.toRgb(), s = new t(n).toRgb();
      return new t({
        r: s.r + (r.r - s.r) * r.a,
        g: s.g + (r.g - s.g) * r.a,
        b: s.b + (r.b - s.b) * r.a
      });
    }, t.prototype.triad = function() {
      return this.polyad(3);
    }, t.prototype.tetrad = function() {
      return this.polyad(4);
    }, t.prototype.polyad = function(n) {
      for (var r = this.toHsl(), s = r.h, u = [this], c = 360 / n, f = 1; f < n; f++)
        u.push(new t({ h: (s + f * c) % 360, s: r.s, l: r.l }));
      return u;
    }, t.prototype.equals = function(n) {
      return this.toRgbString() === new t(n).toRgbString();
    }, t;
  }()
);
function me(t, n = 20) {
  return t.mix("#141414", n).toString();
}
function sa(t) {
  const n = Jt(), r = Ke("button");
  return A(() => {
    let s = {};
    const u = t.color;
    if (u) {
      const c = new ia(u), f = t.dark ? c.tint(20).toString() : me(c, 20);
      if (t.plain)
        s = r.cssVarBlock({
          "bg-color": t.dark ? me(c, 90) : c.tint(90).toString(),
          "text-color": u,
          "border-color": t.dark ? me(c, 50) : c.tint(50).toString(),
          "hover-text-color": `var(${r.cssVarName("color-white")})`,
          "hover-bg-color": u,
          "hover-border-color": u,
          "active-bg-color": f,
          "active-text-color": `var(${r.cssVarName("color-white")})`,
          "active-border-color": f
        }), n.value && (s[r.cssVarBlockName("disabled-bg-color")] = t.dark ? me(c, 90) : c.tint(90).toString(), s[r.cssVarBlockName("disabled-text-color")] = t.dark ? me(c, 50) : c.tint(50).toString(), s[r.cssVarBlockName("disabled-border-color")] = t.dark ? me(c, 80) : c.tint(80).toString());
      else {
        const p = t.dark ? me(c, 30) : c.tint(30).toString(), _ = c.isDark() ? `var(${r.cssVarName("color-white")})` : `var(${r.cssVarName("color-black")})`;
        if (s = r.cssVarBlock({
          "bg-color": u,
          "text-color": _,
          "border-color": u,
          "hover-bg-color": p,
          "hover-text-color": _,
          "hover-border-color": p,
          "active-bg-color": f,
          "active-border-color": f
        }), n.value) {
          const M = t.dark ? me(c, 50) : c.tint(50).toString();
          s[r.cssVarBlockName("disabled-bg-color")] = M, s[r.cssVarBlockName("disabled-text-color")] = t.dark ? "rgba(255, 255, 255, 0.5)" : `var(${r.cssVarName("color-white")})`, s[r.cssVarBlockName("disabled-border-color")] = M;
        }
      }
    }
    return s;
  });
}
const ua = Q({
  name: "ElButton"
}), la = /* @__PURE__ */ Q({
  ...ua,
  props: Lt,
  emits: Go,
  setup(t, { expose: n, emit: r }) {
    const s = t, u = sa(s), c = Ke("button"), { _ref: f, _size: p, _type: _, _disabled: M, _props: v, shouldAddSpace: g, handleClick: x } = Ho(s, r);
    return n({
      ref: f,
      size: p,
      type: _,
      disabled: M,
      shouldAddSpace: g
    }), (y, I) => (D(), z(_e(y.tag), tt({
      ref_key: "_ref",
      ref: f
    }, w(v), {
      class: [
        w(c).b(),
        w(c).m(w(_)),
        w(c).m(w(p)),
        w(c).is("disabled", w(M)),
        w(c).is("loading", y.loading),
        w(c).is("plain", y.plain),
        w(c).is("round", y.round),
        w(c).is("circle", y.circle),
        w(c).is("text", y.text),
        w(c).is("link", y.link),
        w(c).is("has-bg", y.bg)
      ],
      style: w(u),
      onClick: w(x)
    }), {
      default: de(() => [
        y.loading ? (D(), R(nt, { key: 0 }, [
          y.$slots.loading ? re(y.$slots, "loading", { key: 0 }) : (D(), z(w(Ae), {
            key: 1,
            class: P(w(c).is("loading"))
          }, {
            default: de(() => [
              (D(), z(_e(y.loadingIcon)))
            ]),
            _: 1
          }, 8, ["class"]))
        ], 64)) : y.icon || y.$slots.icon ? (D(), z(w(Ae), { key: 1 }, {
          default: de(() => [
            y.icon ? (D(), z(_e(y.icon), { key: 0 })) : re(y.$slots, "icon", { key: 1 })
          ]),
          _: 3
        })) : j("v-if", !0),
        y.$slots.default ? (D(), R("span", {
          key: 2,
          class: P({ [w(c).em("text", "expand")]: w(g) })
        }, [
          re(y.$slots, "default")
        ], 2)) : j("v-if", !0)
      ]),
      _: 3
    }, 16, ["class", "style", "onClick"]));
  }
});
var ca = /* @__PURE__ */ Mt(la, [["__file", "button.vue"]]);
const fa = {
  size: Lt.size,
  type: Lt.type
}, da = Q({
  name: "ElButtonGroup"
}), pa = /* @__PURE__ */ Q({
  ...da,
  props: fa,
  setup(t) {
    const n = t;
    mr(Yn, _r({
      size: yt(n, "size"),
      type: yt(n, "type")
    }));
    const r = Ke("button");
    return (s, u) => (D(), R("div", {
      class: P(`${w(r).b("group")}`)
    }, [
      re(s.$slots, "default")
    ], 2));
  }
});
var Kn = /* @__PURE__ */ Mt(pa, [["__file", "button-group.vue"]]);
const ga = Zt(ca, {
  ButtonGroup: Kn
});
uo(Kn);
const ha = /* @__PURE__ */ Object.assign({
  name: "ButtonWidget"
}, {
  __name: "index",
  props: {
    // 当前组件和全局配置
    widget: { type: Object, default: null },
    globalConfig: { type: Object, default: null },
    // 组件属性
    value: { type: String, default: "" },
    className: { type: String, default: "" }
  },
  emits: ["custom-click"],
  setup(t, { emit: n }) {
    const r = n, s = t, u = () => {
      r("custom-click", s.widget);
    };
    return (c, f) => {
      const p = ga;
      return D(), z(p, { onClick: u }, {
        default: de(() => [
          Dn(Re(s.className), 1)
        ]),
        _: 1
      });
    };
  }
}), va = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ha
}, Symbol.toStringTag, { value: "Module" })), X = (t, n) => {
  const r = t.__vccOpts || t;
  for (const [s, u] of n)
    r[s] = u;
  return r;
}, ba = {};
function ma(t, n) {
  return D(), R("div", null, "test");
}
const _a = /* @__PURE__ */ X(ba, [["render", ma]]), ya = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _a
}, Symbol.toStringTag, { value: "Module" })), wa = {};
function Sa(t, n) {
  return D(), R("div", null, "test");
}
const xa = /* @__PURE__ */ X(wa, [["render", Sa]]), Oa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: xa
}, Symbol.toStringTag, { value: "Module" })), Ma = /* @__PURE__ */ Object.assign({
  name: "HospPersonManageDeptListTreeWidget"
}, {
  __name: "index",
  setup(t) {
    return (n, r) => (D(), R("div", null, "test"));
  }
}), $a = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ma
}, Symbol.toStringTag, { value: "Module" })), Ea = {};
function Ca(t, n) {
  return D(), R("div", null, "test");
}
const Da = /* @__PURE__ */ X(Ea, [["render", Ca]]), Ia = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Da
}, Symbol.toStringTag, { value: "Module" })), Na = /* @__PURE__ */ Object.assign({
  name: "HospPersonManageExtraInfoSetsWidget"
}, {
  __name: "index",
  setup(t) {
    return (n, r) => (D(), R("div", null, "test"));
  }
}), Aa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Na
}, Symbol.toStringTag, { value: "Module" })), Ra = /* @__PURE__ */ Object.assign({
  name: "HospBusinessFlowStepWidget"
}, {
  __name: "index",
  setup(t) {
    return (n, r) => (D(), R("div", null, "test"));
  }
}), ka = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ra
}, Symbol.toStringTag, { value: "Module" })), Fa = {};
function Ta(t, n) {
  return D(), R("div", null, "test");
}
const ja = /* @__PURE__ */ X(Fa, [["render", Ta]]), Pa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ja
}, Symbol.toStringTag, { value: "Module" })), za = {};
function Ba(t, n) {
  return D(), R("div", null, "form");
}
const La = /* @__PURE__ */ X(za, [["render", Ba]]), Va = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: La
}, Symbol.toStringTag, { value: "Module" })), Ua = /* @__PURE__ */ Object.assign({
  name: "InputWidget"
}, {
  __name: "index",
  props: {
    // 当前组件和全局配置
    widget: { type: Object, default: null },
    globalConfig: { type: Object, default: null },
    // 组件属性
    value: { type: String, default: "" },
    className: { type: String, default: "" }
  },
  setup(t) {
    const n = B(null);
    return (r, s) => {
      const u = Wn;
      return D(), z(u, {
        modelValue: n.value,
        "onUpdate:modelValue": s[0] || (s[0] = (c) => n.value = c),
        placeholder: "ddd"
      }, null, 8, ["modelValue"]);
    };
  }
}), Ha = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ua
}, Symbol.toStringTag, { value: "Module" })), Wa = /* @__PURE__ */ Object.assign({
  name: "HospBusinessMenuListTreeWidget"
}, {
  __name: "index",
  setup(t) {
    return (n, r) => (D(), R("div", null, "test"));
  }
}), Ya = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Wa
}, Symbol.toStringTag, { value: "Module" })), Ga = {};
function Ka(t, n) {
  return D(), R("div", null, "test");
}
const qa = /* @__PURE__ */ X(Ga, [["render", Ka]]), Za = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: qa
}, Symbol.toStringTag, { value: "Module" })), Qa = {};
function Ja(t, n) {
  return D(), R("div", null, "test");
}
const Xa = /* @__PURE__ */ X(Qa, [["render", Ja]]), ei = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Xa
}, Symbol.toStringTag, { value: "Module" })), ti = { class: "simple-container-widget-wrapper" }, ni = /* @__PURE__ */ Object.assign({
  name: "SimpleContainerWidget"
}, {
  __name: "index",
  props: {
    /*   designer: { type: Object, default: () => null },
    widget: { type: Object, default: () => null },
    parentWidget: { type: Object, default: () => null },
    parentWidgets: { type: Array, default: () => [] },
    indexOfParentWidgets: { type: Number, default: null }, */
  },
  setup(t) {
    return (n, r) => (D(), R("div", ti, [
      re(n.$slots, "default", {}, void 0, !0)
    ]));
  }
}), ri = /* @__PURE__ */ X(ni, [["__scopeId", "data-v-9e5d5336"]]), oi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ri
}, Symbol.toStringTag, { value: "Module" })), ai = {};
function ii(t, n) {
  return D(), R("div", null, "test");
}
const si = /* @__PURE__ */ X(ai, [["render", ii]]), ui = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: si
}, Symbol.toStringTag, { value: "Module" })), li = {};
function ci(t, n) {
  return D(), R("div", null, "test");
}
const fi = /* @__PURE__ */ X(li, [["render", ci]]), di = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: fi
}, Symbol.toStringTag, { value: "Module" })), pi = /* @__PURE__ */ Object.assign({
  name: "TextWidget"
}, {
  __name: "index",
  props: {
    // 当前组件和全局配置
    widget: { type: Object, default: null },
    globalConfig: { type: Object, default: null },
    // 组件属性
    value: { type: String, default: "" },
    className: { type: String, default: "" }
  },
  emits: ["custom-click"],
  setup(t, { expose: n, emit: r }) {
    yr((M) => ({
      "8d28301a": f.value
    }));
    const s = r, u = t, c = () => {
      u.widget.props.className = "ddd", s("custom-click", u.className), p();
    }, f = B(14), p = () => {
      f.value = f.value + 2;
    };
    return n({
      changeLargeSize: p,
      changeSmallSize: () => {
        f.value = f.value - 2;
      }
    }), (M, v) => (D(), R("span", { onClick: c }, Re(u.value), 1));
  }
}), gi = /* @__PURE__ */ X(pi, [["__scopeId", "data-v-02a4a757"]]), hi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: gi
}, Symbol.toStringTag, { value: "Module" })), vi = {};
function bi(t, n) {
  const r = Wn;
  return D(), R("div", null, [
    Cn(r, {
      type: "textarea",
      placeholder: "ddd"
    })
  ]);
}
const mi = /* @__PURE__ */ X(vi, [["render", bi]]), _i = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mi
}, Symbol.toStringTag, { value: "Module" }));
var Ut = function(t, n) {
  return Ut = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, s) {
    r.__proto__ = s;
  } || function(r, s) {
    for (var u in s)
      Object.prototype.hasOwnProperty.call(s, u) && (r[u] = s[u]);
  }, Ut(t, n);
};
function yi(t, n) {
  if (typeof n != "function" && n !== null)
    throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
  Ut(t, n);
  function r() {
    this.constructor = t;
  }
  t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
}
function qn(t) {
  var n = typeof Symbol == "function" && Symbol.iterator, r = n && t[n], s = 0;
  if (r)
    return r.call(t);
  if (t && typeof t.length == "number")
    return {
      next: function() {
        return t && s >= t.length && (t = void 0), { value: t && t[s++], done: !t };
      }
    };
  throw new TypeError(n ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function wi(t) {
  var n;
  Z(t, (n = Xt()) === null || n === void 0 ? void 0 : n.proxy);
}
var Ht, mt = [], Zn = (
  /** @class */
  function() {
    function t(n) {
      this.active = !0, this.effects = [], this.cleanups = [], this.vm = n;
    }
    return t.prototype.run = function(n) {
      if (this.active)
        try {
          return this.on(), n();
        } finally {
          this.off();
        }
      else
        process.env.NODE_ENV !== "production" && wi("cannot run an inactive effect scope.");
    }, t.prototype.on = function() {
      this.active && (mt.push(this), Ht = this);
    }, t.prototype.off = function() {
      this.active && (mt.pop(), Ht = mt[mt.length - 1]);
    }, t.prototype.stop = function() {
      this.active && (this.vm.$destroy(), this.effects.forEach(function(n) {
        return n.stop();
      }), this.cleanups.forEach(function(n) {
        return n();
      }), this.active = !1);
    }, t;
  }()
);
(function(t) {
  yi(n, t);
  function n(r) {
    r === void 0 && (r = !1);
    var s = this, u = void 0;
    return $i(function() {
      u = er($t());
    }), s = t.call(this, u) || this, r || Si(s), s;
  }
  return n;
})(Zn);
function Si(t, n) {
  var r;
  if (n = n || Ht, n && n.active) {
    n.effects.push(t);
    return;
  }
  var s = (r = Xt()) === null || r === void 0 ? void 0 : r.proxy;
  s && s.$on("hook:destroyed", function() {
    return t.stop();
  });
}
function xi(t) {
  if (!t.scope) {
    var n = new Zn(t.proxy);
    t.scope = n, t.proxy.$on("hook:destroyed", function() {
      return n.stop();
    });
  }
  return t.scope;
}
var Wt = void 0;
try {
  var Ie = require("vue");
  Ie && _n(Ie) ? Wt = Ie : Ie && "default" in Ie && _n(Ie.default) && (Wt = Ie.default);
} catch {
}
var je = null, Ue = null, _t = !0, Qn = "__composition_api_installed__";
function _n(t) {
  return t && Fe(t) && t.name === "Vue";
}
function Oi(t) {
  return je && ae(t, Qn);
}
function $t() {
  return process.env.NODE_ENV !== "production" && en(je, "must call Vue.use(VueCompositionAPI) before using any function."), je;
}
function Jn() {
  var t = je || Wt;
  return process.env.NODE_ENV !== "production" && en(t, "No vue dependency found."), t;
}
function Mi(t) {
  process.env.NODE_ENV !== "production" && je && t.__proto__ !== je.__proto__ && Z("[vue-composition-api] another instance of Vue installed"), je = t, Object.defineProperty(t, Qn, {
    configurable: !0,
    writable: !0,
    value: !0
  });
}
function $i(t) {
  var n = _t;
  _t = !1;
  try {
    t();
  } finally {
    _t = n;
  }
}
function yn(t) {
  if (_t) {
    var n = Ue;
    n == null || n.scope.off(), Ue = t, Ue == null || Ue.scope.on();
  }
}
function Xt() {
  return Ue;
}
var Tt = /* @__PURE__ */ new WeakMap();
function xt(t) {
  if (Tt.has(t))
    return Tt.get(t);
  var n = {
    proxy: t,
    update: t.$forceUpdate,
    type: t.$options,
    uid: t._uid,
    // $emit is defined on prototype and it expected to be bound
    emit: t.$emit.bind(t),
    parent: null,
    root: null
    // to be immediately set
  };
  xi(n);
  var r = [
    "data",
    "props",
    "attrs",
    "refs",
    "vnode",
    "slots"
  ];
  return r.forEach(function(s) {
    W(n, s, {
      get: function() {
        return t["$".concat(s)];
      }
    });
  }), W(n, "isMounted", {
    get: function() {
      return t._isMounted;
    }
  }), W(n, "isUnmounted", {
    get: function() {
      return t._isDestroyed;
    }
  }), W(n, "isDeactivated", {
    get: function() {
      return t._inactive;
    }
  }), W(n, "emitted", {
    get: function() {
      return t._events;
    }
  }), Tt.set(t, n), t.$parent && (n.parent = xt(t.$parent)), t.$root && (n.root = xt(t.$root)), n;
}
var Ei = function(t) {
  return Object.prototype.toString.call(t);
};
function wn(t) {
  return typeof t == "function" && /native code/.test(t.toString());
}
var Ci = typeof Symbol < "u" && wn(Symbol) && typeof Reflect < "u" && wn(Reflect.ownKeys), He = function(t) {
  return t;
};
function W(t, n, r) {
  var s = r.get, u = r.set;
  Object.defineProperty(t, n, {
    enumerable: !0,
    configurable: !0,
    get: s || He,
    set: u || He
  });
}
function Xn(t, n, r, s) {
  Object.defineProperty(t, n, {
    value: r,
    enumerable: !!s,
    writable: !0,
    configurable: !0
  });
}
function ae(t, n) {
  return Object.hasOwnProperty.call(t, n);
}
function en(t, n) {
  if (!t)
    throw new Error("[vue-composition-api] ".concat(n));
}
function Di(t) {
  return typeof t == "string" || typeof t == "number" || // $flow-disable-line
  typeof t == "symbol" || typeof t == "boolean";
}
function qe(t) {
  return Array.isArray(t);
}
var Ii = 4294967295;
function Ni(t) {
  var n = parseFloat(String(t));
  return n >= 0 && Math.floor(n) === n && isFinite(t) && n <= Ii;
}
function Ot(t) {
  return t !== null && typeof t == "object";
}
function xe(t) {
  return Ei(t) === "[object Object]";
}
function Fe(t) {
  return typeof t == "function";
}
function Ai(t) {
  return t == null;
}
function Z(t, n) {
  var r = Jn();
  !r || !r.util ? console.warn("[vue-composition-api] ".concat(t)) : r.util.warn(t, n);
}
function er(t, n) {
  n === void 0 && (n = {});
  var r = t.config.silent;
  t.config.silent = !0;
  var s = new t(n);
  return t.config.silent = r, s;
}
function Ri(t) {
  var n = $t();
  return n && t instanceof n;
}
function ki(t, n) {
  return function() {
    for (var r = [], s = 0; s < arguments.length; s++)
      r[s] = arguments[s];
    return t.$scopedSlots[n] ? t.$scopedSlots[n].apply(t, r) : process.env.NODE_ENV !== "production" ? Z("slots.".concat(n, '() got called outside of the "render()" scope'), t) : void 0;
  };
}
function Fi(t, n) {
  var r;
  if (!t)
    r = {};
  else {
    if (t._normalized)
      return t._normalized;
    r = {};
    for (var s in t)
      t[s] && s[0] !== "$" && (r[s] = !0);
  }
  for (var s in n)
    s in r || (r[s] = !0);
  return r;
}
var rt = "composition-api.refKey", Sn = /* @__PURE__ */ new WeakMap(), Ti = /* @__PURE__ */ new WeakMap();
function ji(t, n, r) {
  var s = $t(), u = s.util, c = u.warn, f = u.defineReactive;
  process.env.NODE_ENV !== "production" && (Ai(t) || Di(t)) && c("Cannot set reactive property on undefined, null, or primitive value: ".concat(t));
  var p = t.__ob__;
  function _() {
    p && Ot(r) && !ae(r, "__ob__") && tn(r);
  }
  if (qe(t)) {
    if (Ni(n))
      return t.length = Math.max(t.length, n), t.splice(n, 1, r), _(), r;
    if (n === "length" && r !== t.length)
      return t.length = r, p == null || p.dep.notify(), r;
  }
  return n in t && !(n in Object.prototype) ? (t[n] = r, _(), r) : t._isVue || p && p.vmCount ? (process.env.NODE_ENV !== "production" && c("Avoid adding reactive properties to a Vue instance or its root $data at runtime - declare it upfront in the data option."), r) : p ? (f(p.value, n, r), or(t, n, r), _(), p.dep.notify(), r) : (t[n] = r, r);
}
var tr = (
  /** @class */
  /* @__PURE__ */ function() {
    function t(n) {
      var r = n.get, s = n.set;
      W(this, "value", {
        get: r,
        set: s
      });
    }
    return t;
  }()
);
function nr(t, n, r) {
  n === void 0 && (n = !1), r === void 0 && (r = !1);
  var s = new tr(t);
  r && (s.effect = !0);
  var u = Object.seal(s);
  return n && Ti.set(u, !0), u;
}
function xn(t) {
  var n;
  if (Y(t))
    return t;
  var r = ir((n = {}, n[rt] = t, n));
  return nr({
    get: function() {
      return r[rt];
    },
    set: function(s) {
      return r[rt] = s;
    }
  });
}
function Y(t) {
  return t instanceof tr;
}
function Pi(t) {
  if (process.env.NODE_ENV !== "production" && !We(t) && Z("toRefs() expects a reactive object but received a plain one."), !xe(t))
    return t;
  var n = {};
  for (var r in t)
    n[r] = zi(t, r);
  return n;
}
function zi(t, n) {
  n in t || ji(t, n, void 0);
  var r = t[n];
  return Y(r) ? r : nr({
    get: function() {
      return t[n];
    },
    set: function(s) {
      return t[n] = s;
    }
  });
}
var rr = "__v_skip";
function Ze(t) {
  var n;
  return !!(t && ae(t, "__ob__") && typeof t.__ob__ == "object" && (!((n = t.__ob__) === null || n === void 0) && n[rr]));
}
function We(t) {
  var n;
  return !!(t && ae(t, "__ob__") && typeof t.__ob__ == "object" && !(!((n = t.__ob__) === null || n === void 0) && n[rr]));
}
function Yt(t) {
  if (!(!xe(t) || Ze(t) || qe(t) || Y(t) || Ri(t) || Sn.has(t))) {
    Sn.set(t, !0);
    for (var n = Object.keys(t), r = 0; r < n.length; r++)
      or(t, n[r]);
  }
}
function or(t, n, r) {
  if (n !== "__ob__" && !Ze(t[n])) {
    var s, u, c = Object.getOwnPropertyDescriptor(t, n);
    if (c) {
      if (c.configurable === !1)
        return;
      s = c.get, u = c.set, (!s || u) && arguments.length === 2 && (r = t[n]);
    }
    Yt(r), W(t, n, {
      get: function() {
        var p = s ? s.call(t) : r;
        return n !== rt && Y(p) ? p.value : p;
      },
      set: function(p) {
        s && !u || (n !== rt && Y(r) && !Y(p) ? r.value = p : (u && u.call(t, p), r = p), Yt(p));
      }
    });
  }
}
function ar(t) {
  var n = Jn(), r;
  if (n.observable)
    r = n.observable(t);
  else {
    var s = er(n, {
      data: {
        $$state: t
      }
    });
    r = s._data.$$state;
  }
  return ae(r, "__ob__") || tn(r), r;
}
function tn(t, n) {
  var r, s;
  if (n === void 0 && (n = /* @__PURE__ */ new Set()), !(n.has(t) || ae(t, "__ob__") || !Object.isExtensible(t))) {
    Xn(t, "__ob__", Bi(t)), n.add(t);
    try {
      for (var u = qn(Object.keys(t)), c = u.next(); !c.done; c = u.next()) {
        var f = c.value, p = t[f];
        !(xe(p) || qe(p)) || Ze(p) || !Object.isExtensible(p) || tn(p, n);
      }
    } catch (_) {
      r = { error: _ };
    } finally {
      try {
        c && !c.done && (s = u.return) && s.call(u);
      } finally {
        if (r)
          throw r.error;
      }
    }
  }
}
function Bi(t) {
  return t === void 0 && (t = {}), {
    value: t,
    dep: {
      notify: He,
      depend: He,
      addSub: He,
      removeSub: He
    }
  };
}
function Li() {
  return ar({}).__ob__;
}
function ir(t) {
  if (!Ot(t))
    return process.env.NODE_ENV !== "production" && Z('"reactive()" must be called on an object.'), t;
  if (!(xe(t) || qe(t)) || Ze(t) || !Object.isExtensible(t))
    return t;
  var n = ar(t);
  return Yt(n), n;
}
process.env.NODE_ENV !== "production" && Object.freeze({});
function Vi(t, n, r) {
  var s = t.__composition_api_state__ = t.__composition_api_state__ || {};
  s[n] = r;
}
function Ui(t, n) {
  return (t.__composition_api_state__ || {})[n];
}
var Se = {
  set: Vi,
  get: Ui
};
function Hi(t, n, r) {
  var s = t.$options.props;
  !(n in t) && !(s && ae(s, n)) ? (Y(r) ? W(t, n, {
    get: function() {
      return r.value;
    },
    set: function(u) {
      r.value = u;
    }
  }) : W(t, n, {
    get: function() {
      return We(r) && r.__ob__.dep.depend(), r;
    },
    set: function(u) {
      r = u;
    }
  }), process.env.NODE_ENV !== "production" && t.$nextTick(function() {
    Object.keys(t._data).indexOf(n) === -1 && (Y(r) ? W(t._data, n, {
      get: function() {
        return r.value;
      },
      set: function(u) {
        r.value = u;
      }
    }) : W(t._data, n, {
      get: function() {
        return r;
      },
      set: function(u) {
        r = u;
      }
    }));
  })) : process.env.NODE_ENV !== "production" && (s && ae(s, n) ? Z('The setup binding property "'.concat(n, '" is already declared as a prop.'), t) : Z('The setup binding property "'.concat(n, '" is already declared.'), t));
}
function Wi(t) {
  var n = Se.get(t, "rawBindings") || {};
  if (!(!n || !Object.keys(n).length)) {
    for (var r = t.$refs, s = Se.get(t, "refs") || [], u = 0; u < s.length; u++) {
      var c = s[u], f = n[c];
      !r[c] && f && Y(f) && (f.value = null);
    }
    for (var p = Object.keys(r), _ = [], u = 0; u < p.length; u++) {
      var c = p[u], f = n[c];
      r[c] && f && Y(f) && (f.value = r[c], _.push(c));
    }
    Se.set(t, "refs", _);
  }
}
function On(t) {
  for (var n = [t._vnode]; n.length; ) {
    var r = n.pop();
    if (r && (r.context && Wi(r.context), r.children))
      for (var s = 0; s < r.children.length; ++s)
        n.push(r.children[s]);
  }
}
function Mn(t, n) {
  var r, s;
  if (t) {
    var u = Se.get(t, "attrBindings");
    if (!(!u && !n)) {
      if (!u) {
        var c = ir({});
        u = { ctx: n, data: c }, Se.set(t, "attrBindings", u), W(n, "attrs", {
          get: function() {
            return u == null ? void 0 : u.data;
          },
          set: function() {
            process.env.NODE_ENV !== "production" && Z("Cannot assign to '$attrs' because it is a read-only property", t);
          }
        });
      }
      var f = t.$attrs, p = function(g) {
        ae(u.data, g) || W(u.data, g, {
          get: function() {
            return t.$attrs[g];
          }
        });
      };
      try {
        for (var _ = qn(Object.keys(f)), M = _.next(); !M.done; M = _.next()) {
          var v = M.value;
          p(v);
        }
      } catch (g) {
        r = { error: g };
      } finally {
        try {
          M && !M.done && (s = _.return) && s.call(_);
        } finally {
          if (r)
            throw r.error;
        }
      }
    }
  }
}
function $n(t, n) {
  var r = t.$options._parentVnode;
  if (r) {
    for (var s = Se.get(t, "slots") || [], u = Fi(r.data.scopedSlots, t.$slots), c = 0; c < s.length; c++) {
      var f = s[c];
      u[f] || delete n[f];
    }
    for (var p = Object.keys(u), c = 0; c < p.length; c++) {
      var f = p[c];
      n[f] || (n[f] = ki(t, f));
    }
    Se.set(t, "slots", p);
  }
}
function jt(t, n, r) {
  var s = Xt();
  yn(t);
  try {
    return n(t);
  } catch (u) {
    if (r)
      r(u);
    else
      throw u;
  } finally {
    yn(s);
  }
}
function Yi(t) {
  t.mixin({
    beforeCreate: n,
    mounted: function() {
      On(this);
    },
    beforeUpdate: function() {
      Mn(this);
    },
    updated: function() {
      On(this);
    }
  });
  function n() {
    var f = this, p = f.$options, _ = p.setup, M = p.render;
    if (M && (p.render = function() {
      for (var g = this, x = [], y = 0; y < arguments.length; y++)
        x[y] = arguments[y];
      return jt(xt(f), function() {
        return M.apply(g, x);
      });
    }), !!_) {
      if (!Fe(_)) {
        process.env.NODE_ENV !== "production" && Z('The "setup" option should be a function that returns a object in component definitions.', f);
        return;
      }
      var v = p.data;
      p.data = function() {
        return r(f, f.$props), Fe(v) ? v.call(f, f) : v || {};
      };
    }
  }
  function r(f, p) {
    p === void 0 && (p = {});
    var _ = f.$options.setup, M = c(f), v = xt(f);
    v.setupContext = M, Xn(p, "__ob__", Li()), $n(f, M.slots);
    var g;
    if (jt(v, function() {
      g = _(p, M);
    }), !!g) {
      if (Fe(g)) {
        var x = g;
        f.$options.render = function() {
          return $n(f, M.slots), jt(v, function() {
            return x();
          });
        };
        return;
      } else if (Ot(g)) {
        We(g) && (g = Pi(g)), Se.set(f, "rawBindings", g);
        var y = g;
        Object.keys(y).forEach(function(I) {
          var h = y[I];
          if (!Y(h))
            if (We(h))
              qe(h) && (h = xn(h));
            else if (Fe(h)) {
              var $ = h;
              h = h.bind(f), Object.keys($).forEach(function(C) {
                h[C] = $[C];
              });
            } else
              Ot(h) ? u(h) && s(h) : h = xn(h);
          Hi(f, I, h);
        });
        return;
      }
      process.env.NODE_ENV !== "production" && en(!1, '"setup" must return a "Object" or a "Function", got "'.concat(Object.prototype.toString.call(g).slice(8, -1), '"'));
    }
  }
  function s(f, p) {
    if (p === void 0 && (p = /* @__PURE__ */ new Set()), !p.has(f) && !(!xe(f) || Y(f) || We(f) || Ze(f))) {
      var _ = $t(), M = _.util.defineReactive;
      Object.keys(f).forEach(function(v) {
        var g = f[v];
        M(f, v, g), g && (p.add(g), s(g, p));
      });
    }
  }
  function u(f, p) {
    return p === void 0 && (p = /* @__PURE__ */ new Map()), p.has(f) ? p.get(f) : (p.set(f, !1), qe(f) && We(f) ? (p.set(f, !0), !0) : !xe(f) || Ze(f) || Y(f) ? !1 : Object.keys(f).some(function(_) {
      return u(f[_], p);
    }));
  }
  function c(f) {
    var p = { slots: {} }, _ = [
      "root",
      "parent",
      "refs",
      "listeners",
      "isServer",
      "ssrContext"
    ], M = ["emit"];
    return _.forEach(function(v) {
      var g = "$".concat(v);
      W(p, v, {
        get: function() {
          return f[g];
        },
        set: function() {
          process.env.NODE_ENV !== "production" && Z("Cannot assign to '".concat(v, "' because it is a read-only property"), f);
        }
      });
    }), Mn(f, p), M.forEach(function(v) {
      var g = "$".concat(v);
      W(p, v, {
        get: function() {
          return function() {
            for (var x = [], y = 0; y < arguments.length; y++)
              x[y] = arguments[y];
            var I = f[g];
            I.apply(f, x);
          };
        }
      });
    }), process.env.NODE_ENV === "test" && (p._vm = f), p;
  }
}
function sr(t, n) {
  if (!t)
    return n;
  if (!n)
    return t;
  for (var r, s, u, c = Ci ? Reflect.ownKeys(t) : Object.keys(t), f = 0; f < c.length; f++)
    r = c[f], r !== "__ob__" && (s = n[r], u = t[r], ae(n, r) ? s !== u && xe(s) && !Y(s) && xe(u) && !Y(u) && sr(u, s) : n[r] = u);
  return n;
}
function Gi(t) {
  if (Oi(t)) {
    process.env.NODE_ENV !== "production" && Z("[vue-composition-api] already installed. Vue.use(VueCompositionAPI) should be called only once.");
    return;
  }
  process.env.NODE_ENV !== "production" && (t.version ? (t.version[0] !== "2" || t.version[1] !== ".") && Z("[vue-composition-api] only works with Vue 2, v".concat(t.version, " found.")) : Z("[vue-composition-api] no Vue version found")), t.config.optionMergeStrategies.setup = function(n, r) {
    return function(u, c) {
      return sr(Fe(n) ? n(u, c) || {} : void 0, Fe(r) ? r(u, c) || {} : void 0);
    };
  }, Mi(t), Yi(t);
}
var Ki = {
  install: function(t) {
    return Gi(t);
  }
};
typeof window < "u" && window.Vue && window.Vue.use(Ki);
function qi({ props: t }) {
  const { executeGlobalEvent: n, executeGlobalAction: r } = Kt({ props: t }), { getPropValue: s } = xr({ props: t });
  let u = null;
  const c = A(() => t.widgets), f = A(() => t.globalConfig), p = function(v, g) {
    let x = {};
    for (let y in g.props)
      x[y] = s(g.props[y], v);
    return x;
  }, _ = function(v, g) {
    let x = {};
    for (let y of g.events || []) {
      let I = `on${y.name.charAt(0).toUpperCase() + y.name.slice(1)}`, h = ["// 执行组件绑定的自定义事件"];
      if (y.code && h.push(y.code), y.action) {
        let $ = y.action.filter((k) => k.includes("$globalActions")).map((k) => `this.executeGlobalAction('${k.split(".")[1]}');`), C = y.action.filter((k) => !k.includes("$globalActions")).map((k) => `this.$refs.${k && k.split(".")[0]} && this.$refs.${k}();`);
        h = h.concat(`
// 执行组件绑定的全局动作代码`).concat($).concat(`
// 执行组件绑定的组件动作方法`).concat(C);
      }
      x[I] = new Function(y.args, h.join(`
`)).bind(v), x[I];
    }
    return x;
  }, M = function(v, g) {
    return g.map((x) => {
      let y = wr(x.type + "-widget"), I = p(v, x), h = _(v, x);
      return rn(
        y,
        {
          ref: x.id,
          widget: x,
          ...I,
          ...h
        },
        { default: () => M(v, x.widgets) }
      );
    });
  };
  return {
    mounted() {
      u = this, this.executeGlobalEvent("onMounted", this);
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
      executeGlobalEvent: (v) => n(f.value.globalEvents, v, u, f.value.globalVars),
      executeGlobalAction: (v) => r(f.value.globalActions, v, u, f.value.globalVars)
    },
    // 渲染函数
    render() {
      return rn("div", {}, { default: () => M(this, c.value) });
    }
  };
}
var ur = { exports: {} };
(function(t, n) {
  (function(r, s) {
    t.exports = s();
  })(Wr, function() {
    const r = { SORT_DESC: 0, SORT_ASC: 1, SORT_RANDOM: 2 }, s = { ROUND: 0, ROUND_FLOOR: 1 };
    var u = { ...r, ...s };
    function c(e, o, i) {
      if (o > (e = String(e)).length)
        return e;
      var l;
      return (i = i < 0 ? 0 : i) > e.length - o && (i = e.length - o), l = "".padEnd(i, "*"), e.substring(0, o) + l + e.substring(o + i);
    }
    var f = Object.freeze({ __proto__: null, trim: function(e) {
      return e.replace(/(^\s*)|(\s*$)/g, "");
    }, trimStart: function(e) {
      return e.replace(/(^\s*)/g, "");
    }, trimEnd: function(e) {
      return e.replace(/(\s*$)/g, "");
    }, trimAll: function(e) {
      return e.replace(/\s+/g, "");
    }, replaceAll: function(e, o, i) {
      return e.replace(new RegExp(o, "gm"), i);
    }, toUpper: function(e) {
      return String(e).toLocaleUpperCase();
    }, toLower: function(e) {
      String(e).toLocaleLowerCase();
    }, toSnakeCase: function(e) {
      return /^[a-z]$/.test(e.charAt(0)) && !(0 < e.indexOf("-") || 0 < e.indexOf("_")) ? e.replace(/([A-Z])/g, "_$1").toLowerCase() : 0 < e.indexOf("-") ? e.replace(/-/g, "_").toLowerCase() : /^[A-Z]$/.test(e.charAt(0)) && !(0 < e.indexOf("-") || 0 < e.indexOf("_")) ? (e = e.charAt(0).toLowerCase() + e.slice(1)).replace(/([A-Z])/g, "_$1").toLowerCase() : void 0;
    }, toKebabCase: function(e) {
      if (0 < e.indexOf("_"))
        return e.replace(/_/g, "-").toLowerCase();
      if (/^[a-z]$/.test(e.charAt(0)) && !(0 < e.indexOf("-") || 0 < e.indexOf("_")))
        return e.replace(/([A-Z])/g, "-$1").toLowerCase();
      if (/^[A-Z]$/.test(e.charAt(0)) && !(0 < e.indexOf("-") || 0 < e.indexOf("_")))
        return (e.charAt(0).toLowerCase() + e.slice(1)).replace(/([A-Z])/g, "-$1").toLowerCase();
    }, toCamelCase: function(e) {
      return 0 < e.indexOf("_") ? e.replace(/\_(\w)/g, function(o, i) {
        return i.toUpperCase();
      }) : 0 < e.indexOf("-") ? e.replace(/\-(\w)/g, function(o, i) {
        return i.toUpperCase();
      }) : /^[A-Z]$/.test(e.charAt(0)) && !(0 < e.indexOf("-") || 0 < e.indexOf("_")) ? e.charAt(0).toLowerCase() + e.slice(1) : void 0;
    }, toPascalCase: function(e) {
      if (0 < e.indexOf("_")) {
        let o = e.replace(/\_(\w)/g, function(i, l) {
          return l.toUpperCase();
        });
        return o.charAt(0).toUpperCase() + o.slice(1);
      }
      if (0 < e.indexOf("-")) {
        let o = e.replace(/\-(\w)/g, function(i, l) {
          return l.toUpperCase();
        });
        return o.charAt(0).toUpperCase() + o.slice(1);
      }
      if (/^[a-z]$/.test(e.charAt(0)) && !(0 < e.indexOf("-") || 0 < e.indexOf("_")))
        return e.charAt(0).toUpperCase() + e.slice(1);
    }, encode: function(e) {
      return window.btoa(e);
    }, decode: function(e) {
      return window.atob(e);
    }, inString: function(e, o) {
      return o.includes(e);
    }, zeroStart: function(e, o = 2) {
      let i = e.toString().length;
      for (; i < o; )
        e = "0" + e, i++;
      return e;
    }, zeroEnd: function(e, o = 2) {
      let i = e.toString().length;
      for (; i < o; )
        e += "0", i++;
      return e;
    }, formatThousand: function(e) {
      if (!parseFloat(e))
        return e;
      var o = -1 < (e = String(e)).indexOf(".") ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
      return e.replace(o, "$1,");
    }, formatRmbChinese: function(e) {
      var o = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"), i = new Array("", "拾", "佰", "仟"), l = new Array("", "万", "亿", "兆"), d = new Array("角", "分", "毫", "厘");
      let m, O, S = "", E;
      if (e === "")
        return "";
      if (1e15 <= (e = parseFloat(e)))
        throw new Error("Calculated number overflow!");
      if (e == 0)
        return S = o[0] + "元整", S;
      if (e = e.toString(), O = e.indexOf(".") == -1 ? (m = e, "") : (E = e.split("."), m = E[0], E[1].substr(0, 4)), 0 < parseInt(m, 10)) {
        let ce = 0;
        var N = m.length;
        for (let ht = 0; ht < N; ht++) {
          var T = m.substr(ht, 1), be = N - ht - 1, pt = be / 4, be = be % 4;
          T == "0" ? ce++ : (0 < ce && (S += o[0]), ce = 0, S += o[parseInt(T)] + i[be]), be == 0 && ce < 4 && (S += l[pt]);
        }
        S += "元";
      }
      if (O != "") {
        var gt = O.length;
        for (let ce = 0; ce < gt; ce++) {
          var nn = O.substr(ce, 1);
          nn != "0" && (S += o[Number(nn)] + d[ce]);
        }
      }
      return S == "" ? S += o[0] + "元整" : O == "" && (S += "整"), S;
    }, formatStartOfName: function(e) {
      return e.length == 2 ? c(e, 1, 1) : 2 < e.length ? c(e, 1, e.length - 2) : e;
    }, formatStartOfMobile: function(e, o = 3, i = 4) {
      return c(e, o, i);
    }, formatStartOfIdCard: function(e, o = 4, i = 8) {
      return c(e, o, i);
    }, formatStartOfBankCard: function(e, o = 4, i = 11) {
      return c(e, o, i);
    } });
    function p(e, o = 10) {
      return Number.parseInt(e, o);
    }
    var _ = Object.freeze({ __proto__: null, parseInt: p });
    function M(e) {
      return Number.isInteger(e);
    }
    function v(e) {
      return Object.prototype.toString.call(e).slice(8, -1) === "String";
    }
    function g(e) {
      return Object.prototype.toString.call(e).slice(8, -1) === "Array";
    }
    function x(e) {
      return Object.prototype.toString.call(e).slice(8, -1) === "Object";
    }
    function y(e) {
      return Object.prototype.toString.call(e).slice(8, -1) === "Date";
    }
    function I(e) {
      return e == null || e == "undefined" || e == "null" || e == 0 || e == 0 || e == NaN;
    }
    function h(e) {
      return window.isNaN(e) || g(e) || e == null || e == "";
    }
    function $(e) {
      return e == null || e == "";
    }
    function C(e) {
      return $(e) || !(Object.keys(e) || e).length;
    }
    function k(e) {
      return C(e) || /^\s*$/.test(e);
    }
    function ie(e) {
      return e === void 0;
    }
    var se = Object.freeze({ __proto__: null, isInteger: M, isDecimal: function(e) {
      return /^\d+\.\d+$/.test(e);
    }, isNumber: function(e) {
      return Object.prototype.toString.call(e).slice(8, -1) === "Number";
    }, isString: v, isArray: g, isObject: x, isBoolean: function(e) {
      return Object.prototype.toString.call(e).slice(8, -1) === "Boolean";
    }, isDate: y, isFunction: function(e) {
      return Object.prototype.toString.call(e).slice(8, -1) === "Function";
    }, isSymbol: function(e) {
      return Object.prototype.toString.call(e).slice(8, -1) === "Symbol";
    }, isRegExp: function(e) {
      return Object.prototype.toString.call(e).slice(8, -1) === "RegExp";
    }, isError: function(e) {
      return Object.prototype.toString.call(e).slice(8, -1) === "Error";
    }, isPromise: function(e) {
      return Object.prototype.toString.call(e).slice(8, -1) === "Promise";
    }, isMap: function(e) {
      return Object.prototype.toString.call(e).slice(8, -1) === "Map";
    }, isWeakMap: function(e) {
      return Object.prototype.toString.call(e).slice(8, -1) === "WeakMap";
    }, isSet: function(e) {
      return Object.prototype.toString.call(e).slice(8, -1) === "Set";
    }, isWeakSet: function(e) {
      return Object.prototype.toString.call(e).slice(8, -1) === "WeakSet";
    }, isBigInt: function(e) {
      return Object.prototype.toString.call(e).slice(8, -1) === "BigInt";
    }, isTrue: function(e) {
      return !I(e);
    }, isFalse: I, isNaN: h, isNotNaN: function(e) {
      return !h(e);
    }, isNull: $, isNotNull: function(e) {
      return !$(e);
    }, isEmpty: C, isNotEmpty: function(e) {
      return !C(e);
    }, isBlank: k, isNotBlank: function(e) {
      return !k(e);
    }, isUndefined: ie, isNotUndefined: function(e) {
      return !ie(e);
    }, equals: function(e, o) {
      return Object.is(e, o);
    }, equalsIgnoreCase: function(e, o) {
      return Object.is(e.toLowerCase(), o.toLowerCase());
    }, deepCompare: function(e, o) {
      let i, l, d, m;
      if (arguments.length < 1)
        return !0;
      for (i = 1, l = arguments.length; i < l; i++)
        if (d = [], m = [], !function O(S, E) {
          let N;
          if (h(S) && h(E) && typeof S == "number" && typeof E == "number" || S === E)
            return 1;
          if (typeof S == "function" && typeof E == "function" || S instanceof Date && E instanceof Date || S instanceof RegExp && E instanceof RegExp || S instanceof String && E instanceof String || S instanceof Number && E instanceof Number)
            return S.toString() === E.toString();
          if (S instanceof Object && E instanceof Object && !S.isPrototypeOf(E) && !E.isPrototypeOf(S) && S.constructor === E.constructor && S.prototype === E.prototype && !(-1 < d.indexOf(S) || -1 < m.indexOf(E))) {
            for (N in E)
              if (E.hasOwnProperty(N) !== S.hasOwnProperty(N) || typeof E[N] != typeof S[N])
                return;
            for (N in S) {
              if (E.hasOwnProperty(N) !== S.hasOwnProperty(N) || typeof E[N] != typeof S[N])
                return;
              switch (typeof S[N]) {
                case "object":
                case "function":
                  if (d.push(S), m.push(E), !O(S[N], E[N]))
                    return;
                  d.pop(), m.pop();
                  break;
                default:
                  if (S[N] !== E[N])
                    return;
              }
            }
            return 1;
          }
        }(e, arguments[i]))
          return !1;
      return !0;
    } });
    function Oe(e) {
      return e.reduce(function(o, i) {
        return o + i;
      });
    }
    var at = Object.freeze({ __proto__: null, arrayMin: function(e) {
      return Math.min.apply(null, e);
    }, arrayMax: function(e) {
      return Math.max.apply(null, e);
    }, arraySum: Oe, arrayAvg: function(e) {
      return Oe(e) / e.length;
    }, inArray: function(e, o) {
      if (!$(e))
        return o.includes(e);
    }, arrayEquals: function(e, o) {
      return e === o || e.length == o.length && e.every((i, l) => i === o[l]);
    }, arrayCreate: function(e = 0) {
      return [...Array(e).keys()];
    }, arrayInsert: function(e = [], o = 0, i = void 0) {
      return e.splice(o, 0, i), e;
    }, arrayRemove: function(e = [], o = 0) {
      return e.splice(o, 1), e;
    }, arrayUnique: function(e) {
      if (!$(value))
        return Array.from(new Set(e));
    }, arrayShuffle: function(e) {
      for (let i = 1; i < e.length; i++) {
        var o = Math.floor(Math.random() * (i + 1));
        [e[o], e[i]] = [e[i], e[o]];
      }
      return e;
    }, arraySort: function(e, o = r.SORT_ASC) {
      return e.sort((i, l) => {
        switch (o) {
          case r.SORT_ASC:
            return i - l;
          case r.SORT_DESC:
            return l - i;
          case r.SORT_RANDOM:
            return Math.random() - 0.5;
          default:
            return e;
        }
      });
    }, arraySwap: function(e, o, i) {
      const l = [...e];
      return [l[i], l[o]] = [e[o], e[i]], l;
    }, arrayToTree: function(e, o) {
      let i = [];
      return e.forEach((l) => {
        l.pid == o && (l.children = toTree(e, l.id), i.push(l));
      }), i;
    }, arrayUnion: function(e, o) {
      return [...new Set(e.concat(o))];
    }, arrayIntersect: function(e, o) {
      return [...new Set(e)].filter((i) => o.includes(i));
    }, arrayDifference: function(e, o) {
      return [...new Set(e)].filter((i) => !o.includes(i));
    }, arrayComplement: function(e, o) {
      return [...[...new Set(e)].filter((i) => !o.includes(i)), ...[...new Set(o)].filter((i) => !e.includes(i))];
    } });
    function Me(e) {
      let o = /* @__PURE__ */ Object.create(null);
      for (var [i, l] of e)
        o[i] = l;
      return o;
    }
    var ge = Object.freeze({ __proto__: null, mapToObject: Me, mapToJson: function(e) {
      return JSON.stringify(Me(e));
    }, objectToMap: function(e) {
      let o = /* @__PURE__ */ new Map();
      for (var i of Object.keys(e))
        o.set(i, e[i]);
      return o;
    }, jsonToMap: function(e) {
      return objToMap(JSON.parse(e));
    }, stringifyJson: function(e) {
      return JSON.stringify(e);
    }, parseJson: function(e) {
      if (!C(e))
        return JSON.parse(e);
    }, clone: function(e) {
      return Object.assign(e);
    }, cloneDeep: function e(o) {
      if (x(o)) {
        let l = {};
        for (var i in o)
          o.hasOwnProperty(i) && (l[i] = e(o[i]));
        return l;
      }
      if (g(o)) {
        let l = [];
        for (let d = 0, m = o.length; d < m; d++)
          l[d] = e(o[d]);
        return l;
      }
      if (y(o)) {
        let l = /* @__PURE__ */ new Date();
        return l.setTime(o.getTime()), l;
      }
      return o;
    }, objectEquals: function e(o, i) {
      if (o === i)
        return !0;
      if (o instanceof Date && b instanceof Date)
        return a.getTime() === b.getTime();
      if (!o || !i || typeof o != "object" && typeof i != "object")
        return o === i;
      if (o.prototype !== b.prototype)
        return !1;
      const l = Object.keys(o);
      return l.length === Object.keys(i).length && l.every((d) => e(o[d], i[d]));
    }, merge: function(e, ...o) {
      return Object.assign(e, ...o);
    } });
    function it(e) {
      return e % 100 != 0 && e % 4 == 0 || e % 400 == 0;
    }
    function Pe(e = /* @__PURE__ */ new Date(), o = "-") {
      let i = e.getFullYear(), l = e.getMonth() + 1, d = e.getDate();
      return [i, l, d].map(ue).join(o);
    }
    function he(e = /* @__PURE__ */ new Date()) {
      return e.getDate();
    }
    function J(e = /* @__PURE__ */ new Date()) {
      return new Array(7, 1, 2, 3, 4, 5, 6)[e.getDay()];
    }
    function Qe(e = /* @__PURE__ */ new Date()) {
      return new Date(e.getFullYear(), e.getMonth() + 1, 0).getDate();
    }
    function U(e = /* @__PURE__ */ new Date(), o = 1) {
      return e.setDate(e.getDate() + o), e;
    }
    function V(e, o = "yyyy-MM-dd") {
      if (!$(e)) {
        M(e = v(e) ? F(e) : e) && String(e).length == 13 && (e = new Date(e));
        var i, l = { 0: "日", 1: "一", 2: "二", 3: "三", 4: "四", 5: "五", 6: "六" }, d = { "M+": (e = M(e) && String(e).length == 10 ? new Date(1e3 * e) : e).getMonth() + 1, "d+": e.getDate(), "h+": e.getHours() % 12 == 0 ? 12 : e.getHours() % 12, "H+": e.getHours(), "m+": e.getMinutes(), "s+": e.getSeconds(), "E+": l[e.getDay()], "q+": Math.floor((e.getMonth() + 3) / 3), S: e.getMilliseconds() };
        for (i in /(y+)/.test(o) && (o = o.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length))), /(E+)/.test(o) && (o = o.replace(RegExp.$1, (1 < RegExp.$1.length ? 2 < RegExp.$1.length ? "星期" : "周" : "") + l[e.getDay()])), /(q+)/.test(o) && (o = o.replace(RegExp.$1, (1 < RegExp.$1.length ? "第" : "") + { 1: "一", 2: "二", 3: "三", 4: "四" }[Math.floor((e.getMonth() + 3) / 3)] + "季度")), d)
          new RegExp("(" + i + ")").test(o) && (o = o.replace(RegExp.$1, RegExp.$1.length == 1 ? d[i] : ("00" + d[i]).substr(("" + d[i]).length)));
        return o;
      }
    }
    function F(e) {
      if (!$(e))
        return v(e) ? new Date(e.replace(/-/g, "/")) : M(e) && String(e).length == 13 ? new Date(e) : M(e) && String(e).length == 10 ? new Date(1e3 * e) : void 0;
    }
    function ue(e) {
      return (e = e.toString())[1] ? e : "0" + e;
    }
    var Ve = Object.freeze({ __proto__: null, today: function() {
      return Pe();
    }, yesterday: function() {
      return V(U(/* @__PURE__ */ new Date(), -1));
    }, tomorrow: function() {
      return V(U(/* @__PURE__ */ new Date(), 1));
    }, prevWeek: function() {
      return V(U(/* @__PURE__ */ new Date(), -7));
    }, nextWeek: function() {
      return V(U(/* @__PURE__ */ new Date(), 7));
    }, prevMonth: function() {
      return V(U(/* @__PURE__ */ new Date(), -30));
    }, nextMonth: function() {
      return V(U(/* @__PURE__ */ new Date(), 30));
    }, prevYear: function() {
      return V(U(/* @__PURE__ */ new Date(), -365));
    }, nextYear: function() {
      return V(U(/* @__PURE__ */ new Date(), 365));
    }, isAM: function() {
      return (/* @__PURE__ */ new Date()).getHours() < 12;
    }, isPM: function() {
      return 12 <= (/* @__PURE__ */ new Date()).getHours();
    }, isToday: function(e) {
      if (!$(e)) {
        v(e) && (e = F(e));
        let o = /* @__PURE__ */ new Date();
        return ["getFullYear", "getMonth", "getDate"].every((i) => o[i]() === e[i]());
      }
    }, isYesterday: function(e) {
      return e = e.getTime(), p((Date.now() - e) / 864e5) === 1;
    }, isBeforeYesterday: function(e) {
      return e = e.getTime(), p((Date.now() - e) / 864e5) === 2;
    }, isWorkday: function() {
      var e = J();
      return e != 6 && e != 7;
    }, isWeekend: function() {
      var e = J();
      return e == 6 || e == 7;
    }, isLeapYear: it, isSameDay: function(e, o) {
      return ["getFullYear", "getMonth", "getDate"].every((i) => e[i]() === o[i]());
    }, isSameWeek: function(e, o) {
      return e = e.getTime() / 864e5, o = o.getTime() / 864e5, p((4 + e) / 7) == p((4 + o) / 7);
    }, isSameMonth: function(e, o) {
      return ["getFullYear", "getMonth"].every((i) => e[i]() === o[i]());
    }, isSameYear: function(e, o) {
      return ["getFullYear"].every((i) => e[i]() === o[i]());
    }, isFirstDayOfMonth: function() {
      return he() == 1;
    }, isLastDayOfMonth: function() {
      return he() == Qe();
    }, getNow: function() {
      return /* @__PURE__ */ new Date();
    }, getDate: Pe, getDateTime: function(e = /* @__PURE__ */ new Date(), o = "-") {
      let i = e.getFullYear(), l = e.getMonth() + 1, d = e.getDate(), m = e.getHours(), O = e.getMinutes(), S = e.getSeconds();
      return [i, l, d].map(ue).join(o) + " " + [m, O, S].map(ue).join(":");
    }, getTimestamp: function(e = /* @__PURE__ */ new Date()) {
      return e.getTime();
    }, getUnixTimestamp: function(e = /* @__PURE__ */ new Date()) {
      return Math.round(e / 1e3);
    }, getDay: he, getMonth: function(e = /* @__PURE__ */ new Date()) {
      return e.getMonth() + 1;
    }, getYear: function(e = /* @__PURE__ */ new Date()) {
      return e.getFullYear();
    }, getYearMonth: function(e = /* @__PURE__ */ new Date(), o = "-") {
      let i = e.getFullYear(), l = e.getMonth() + 1;
      return [i, l].map(ue).join(o);
    }, getWeek: function(e = /* @__PURE__ */ new Date(), o = "EE") {
      var i = { 0: "日", 1: "一", 2: "二", 3: "三", 4: "四", 5: "五", 6: "六" };
      if (o == "E")
        return i[e.getDay()];
      if (o == "EE")
        return "周" + i[e.getDay()];
      if (o == "EEE")
        return "星期" + i[e.getDay()];
      throw new Error("Invalid week format!");
    }, getQuarter: function(e = /* @__PURE__ */ new Date(), o = "q") {
      var i = { 1: "一", 2: "二", 3: "三", 4: "四" };
      if (o == "q")
        return i[Math.floor((e.getMonth() + 3) / 3)] + "季度";
      if (o == "qq")
        return "第" + i[Math.floor((e.getMonth() + 3) / 3)] + "季度";
      throw new Error("Invalid quarter format!");
    }, getDayOfWeek: J, getDayOfMonth: function(e = /* @__PURE__ */ new Date()) {
      return e.getDate();
    }, getDayOfYear: function(e = /* @__PURE__ */ new Date()) {
      return Math.ceil((e - new Date(e.getFullYear().toString())) / 864e5) + 1;
    }, getWeekOfMonth: function(e = /* @__PURE__ */ new Date()) {
      return Math.ceil((e.getDate() + 6 - J(e)) / 7);
    }, getWeekOfYear: function(e = /* @__PURE__ */ new Date()) {
      var o = J(i = new Date(e.getFullYear(), 0, 1)), i = Math.round((e - i) / 864e5);
      return Math.ceil((i + o) / 7);
    }, getFirstDayOfWeek: function(e = /* @__PURE__ */ new Date()) {
      var o = J(e);
      return e.setDate(e.getDate() - o + 1), V(e);
    }, getLastDayOfWeek: function(e = /* @__PURE__ */ new Date()) {
      var o = J(e);
      return e.setDate(e.getDate() + (7 - o)), V(e);
    }, getFirstDayOfMonth: function(e = /* @__PURE__ */ new Date()) {
      return e.setDate(1), V(e);
    }, getLastDayOfMonth: function(e = /* @__PURE__ */ new Date()) {
      return V(new Date(e.getFullYear(), e.getMonth() + 1, 0));
    }, getFullDayOfMonth: Qe, getFullDayOfYear: function(e = /* @__PURE__ */ new Date()) {
      return it(e.getFullYear()) ? 366 : 365;
    }, getPastTime: function(m, o = "zh") {
      if ($(m))
        return "--";
      var i = { zh: { year: "年前", month: "个月前", day: "天前", beforeYestoday: "前天", yestoday: "昨天", today: "今天", hour: "小时前", minute: "分钟前", just: "刚刚" }, en: { year: " year ago", month: " month ago", day: " day ago", beforeYestoday: "before yestoday", yestoday: " yestoday", today: " today", hour: " hour ago", minute: " minute ago", just: " just" } }, O = (m = typeof m == "string" ? F(m) : m).getTime(), l = p((S = Date.now() - O) / 31104e6), d = p(S / 2592e6), m = p(S / 864e5), O = p(S / 36e5), S = p(S / 6e4);
      return l ? l + i[o].year : d ? d + i[o].month : m ? m === 1 ? i[o].yestoday : m === 2 ? i[o].beforeYestoday : m + i[o].day : O ? 12 < O ? i[o].today : O + i[o].hour : S ? S + i[o].minute : i[o].just;
    }, getOverTime: function(d) {
      if ($(d))
        return "--";
      typeof d == "string" && (d = F(d));
      var m = /* @__PURE__ */ new Date(), o = d.getTime() - m.getTime(), i = 0, l = 0, d = 0, m = 0;
      return 0 <= o && (i = Math.floor(o / 1e3 / 3600 / 24), l = Math.floor(o / 1e3 / 60 / 60 % 24), d = Math.floor(o / 1e3 / 60 % 60), m = Math.floor(o / 1e3 % 60)), i + `天 ${l}小时 ${d}分钟 ${m}秒`;
    }, addYear: function(e = /* @__PURE__ */ new Date(), o = 1) {
      return e.setFullYear(e.getFullYear() + o), e;
    }, addMonth: function(e = /* @__PURE__ */ new Date(), o = 1) {
      return e.setMonth(e.getMonth() + o), e;
    }, addDate: U, addHours: function(e = /* @__PURE__ */ new Date(), o = 1) {
      return e.setHours(e.getHours() + o), e;
    }, addMinutes: function(e = /* @__PURE__ */ new Date(), o = 1) {
      return e.setMinutes(e.getMinutes() + o), e;
    }, addSeconds: function(e = /* @__PURE__ */ new Date(), o = 1) {
      return e.setSeconds(e.getSeconds() + o), e;
    }, diffDay: function(e, o) {
      if (C(e) || C(o))
        return 0;
      let i = 0;
      return v(e) && v(o) && (e = F(e), o = F(o)), y(e) && y(o) && (i = p((o - e) / 864e5)), M(e) && M(o) && (String(e).length == 13 && String(o).length == 13 && (i = p((o - e) / 864e5)), String(e).length == 10 && String(o).length == 10 && (i = p((o - e) / 86400))), 0 <= i ? Math.abs(i) : i;
    }, diffWeek: function(e, o) {
      if (C(e) || C(o))
        return 0;
      let i = 0;
      return v(e) && v(o) && (e = F(e), o = F(o)), y(e) && y(o) && (i = p((o - e) / 6048e5)), M(e) && M(o) && (String(e).length == 13 && String(o).length == 13 && (i = p((o - e) / 6048e5)), String(e).length == 10 && String(o).length == 10 && (i = p((o - e) / 604800))), 0 <= i ? Math.abs(i) : i;
    }, diffMonth: function(e, o) {
      if (C(e) || C(o))
        return 0;
      let i = 0;
      return v(e) && v(o) && (e = F(e), o = F(o)), y(e) && y(o) && (i = p((o - e) / 2592e6)), M(e) && M(o) && (String(e).length == 13 && String(o).length == 13 && (i = p((o - e) / 2592e6)), String(e).length == 10 && String(o).length == 10 && (i = p((o - e) / 2592e3))), 0 <= i ? Math.abs(i) : i;
    }, diffYear: function(e, o) {
      if (C(e) || C(o))
        return 0;
      let i = 0;
      return v(e) && v(o) && (e = F(e), o = F(o)), y(e) && y(o) && (i = p((o - e) / 31104e6)), M(e) && M(o) && (String(e).length == 13 && String(o).length == 13 && (i = p((o - e) / 1306368e5)), String(e).length == 10 && String(o).length == 10 && (i = p((o - e) / 1296e3))), 0 <= i ? Math.abs(i) : i;
    }, betweenDays: function(e, o) {
      if (!C(e) && !C(o))
        return v(e) && v(o) && (e = F(e), o = F(o)), M(e) && M(o) && (String(e).length == 13 && String(o).length == 13 && (e = new Date(e), o = new Date(o)), String(e).length == 10 && String(o).length == 10 && (e = new Date(1e3 * e), o = new Date(1e3 * o))), function(i, l) {
          let d = [];
          for (; 0 <= l - i; ) {
            var m = i.getFullYear(), O = ue(i.getMonth() + 1), S = ue(i.getDate());
            d.push(m + "-" + O + "-" + S), i.setDate(i.getDate() + 1);
          }
          return d;
        }(e, o);
    }, betweenMonths: function(e, o) {
      if (!C(e) && !C(o))
        return v(e) && v(o) && (e = F(e), o = F(o)), M(e) && M(o) && (String(e).length == 13 && String(o).length == 13 && (e = new Date(e), o = new Date(o)), String(e).length == 10 && String(o).length == 10 && (e = new Date(1e3 * e), o = new Date(1e3 * o))), function(i, l) {
          let d = [], m = /* @__PURE__ */ new Date(), O = /* @__PURE__ */ new Date();
          m.setFullYear(i.getFullYear(), i.getMonth() + 1), O.setFullYear(l.getFullYear(), l.getMonth() + 1);
          let S = m, E = "";
          for (; S <= O; ) {
            var N = S.getMonth();
            E = N === 0 ? S.getFullYear() - 1 + "-12" : S.getFullYear() + "-" + ue(N), d.push(E), S.setMonth(N + 1);
          }
          return d;
        }(e, o);
    }, betweenYears: function(e, o) {
      if (!C(e) && !C(o))
        return v(e) && v(o) && (e = F(e), o = F(o)), M(e) && M(o) && (String(e).length == 13 && String(o).length == 13 && (e = new Date(e), o = new Date(o)), String(e).length == 10 && String(o).length == 10 && (e = new Date(1e3 * e), o = new Date(1e3 * o))), function(i, l) {
          let d = [];
          for (; 0 <= l - i; ) {
            var m = i.getFullYear();
            d.push(m), i.setFullYear(i.getFullYear() + 1);
          }
          return d;
        }(e, o);
    }, compareDate: function(e, o) {
      if (!C(e) && !C(o))
        return v(e) && v(o) && (e = F(e), o = F(o)), o < e;
    }, formatDate: V, parseDate: F });
    function ze(O) {
      if (C(O))
        return 0;
      let o = 0;
      var S = O.split("-"), E = Number(S[0]), i = Number(S[1]), l = Number(S[2]);
      let d = /* @__PURE__ */ new Date();
      var m = d.getFullYear(), O = d.getMonth() + 1, S = d.getDate(), E = m - E;
      return 0 < E && (o = O - i <= 0 && S - l < 0 ? E - 1 : E), o;
    }
    var ne = Object.freeze({ __proto__: null, throttle: function(e, o = 1e3) {
      let i;
      return function() {
        const l = arguments;
        i = i || setTimeout(() => {
          i = null, e.apply(this, l);
        }, o);
      };
    }, debounce: function(e, o = 1e3, i = !0) {
      let l;
      return function() {
        const d = arguments;
        var m;
        l && clearTimeout(l), i ? (m = !l, l = setTimeout(function() {
          l = null;
        }, o), m && e.apply(this, d)) : l = setTimeout(function() {
          e.apply(this, d);
        }, o);
      };
    }, sleep: function(e = 1e3) {
      return new Promise((o) => setTimeout(o, e));
    }, getIdCardInfo: function(e) {
      if (!C(e)) {
        const o = {};
        return o.province = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" }[e.substring(0, 2)], e.length == 15 && (o.birthday = "19" + e.substring(6, 8) + "-" + e.substring(8, 10) + "-" + e.substring(10, 12), o.age = ze(o.birthday), o.sex = Number(e.substring(14)) % 2 == 0 ? "女" : "男"), e.length == 18 && (o.birthday = e.substring(6, 10) + "-" + e.substring(10, 12) + "-" + e.substring(12, 14), o.age = ze(o.birthday), o.sex = Number(e.substring(16, 17)) % 2 == 0 ? "女" : "男"), o;
      }
    }, getAge: ze, getZodiac: function(e) {
      if (!C(e)) {
        var o = ["摩羯座", "水瓶座", "双鱼座", "白羊座", "金牛座", "双子座", "巨蟹座", "狮子座", "处女座", "天秤座", "天蝎座", "射手座", "摩羯座"];
        let i = F(e);
        return e = i.getMonth() + 1, i.getDate() < [20, 19, 21, 20, 21, 22, 23, 23, 23, 24, 23, 22][e - 1] ? o[e - 1] : o[e];
      }
    }, getChineseZodiac: function(e) {
      if (!C(e)) {
        var o = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
        return e = F(e).getFullYear(), e < 1900 ? "未知" : o[(e - 1900) % o.length];
      }
    } });
    const H = { CH: /^[\u4E00-\u9FA5]+$/, EN: /^[a-zA-Z]$/, LOWER_CASE: /^[a-z]+$/, UPPER_CASE: /^[A-Z]+$/, CH_NAME: /^(?:[\u4e00-\u9fa5·]{2,16})$/, EN_NAME: /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/, NUMBER: /^(\-|\+)?\d+(\.\d+)?$/, INTEGER: /^(0|[1-9][0-9]*|-[1-9][0-9]*)$/, DECIMAL: /^\d+\.\d+$/, INT_OR_FLOAT: /(^[1-9][0-9]*$)|(^[1-9][0-9]*\.[0-9]{1,2}$)|(^0\.[0-9]{1,2}$)|(^0$)/, MOBILE: /^(?:(?:\+|00)86)?1[1-9]\d{9}$/, PHONE: /^(?:(?:\d{3}-)?\d{8}|^(?:\d{4}-)?\d{7,8})(?:-\d+)?$/, EMAIL: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/, ID_CARD: /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/, ID_CARD15: /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)/, ID_CARD18: /(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/, BANK_CARD: /^[1-9]\d{9,29}$/, POST_CODE: /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/, URL: /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/, IP: /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/, EXTERNAL: /^(http?:|https?:|mailto:|tel:)/ };
    function G(e, o) {
      return new RegExp(o).test(e);
    }
    var ve = Object.freeze({ __proto__: null, REGEXP: H, regexpTest: G, isChinese: function(e) {
      return G(e, H.CH);
    }, isEnglish: function(e) {
      return G(e, H.EN);
    }, isExternal: function(e) {
      return G(e, H.EXTERNAL);
    }, isLowerCase: function(e) {
      return G(e, H.LOWER_CASE);
    }, isUpperCase: function(e) {
      return G(e, H.UPPER_CASE);
    }, isMobile: function(e) {
      return G(e, H.MOBILE);
    }, isEmail: function(e) {
      return G(e, H.EMAIL);
    }, isIdCard: function(e) {
      return G(e, H.ID_CARD);
    }, isUrl: function(e) {
      return G(e, H.URL);
    } });
    function $e(e, o) {
      return o ? $e(o, e % o) : e;
    }
    var Et = Object.freeze({ __proto__: null, add: function(e, o) {
      let i, l, d;
      try {
        i = e.toString().split(".")[1].length;
      } catch {
        i = 0;
      }
      try {
        l = o.toString().split(".")[1].length;
      } catch {
        l = 0;
      }
      return (e * (d = Math.pow(10, Math.max(i, l))) + o * d) / d;
    }, subtract: function(e, o) {
      let i, l, d, m;
      try {
        i = e.toString().split(".")[1].length;
      } catch {
        i = 0;
      }
      try {
        l = o.toString().split(".")[1].length;
      } catch {
        l = 0;
      }
      return d = Math.pow(10, Math.max(i, l)), m = i >= l ? i : l, ((e * d - o * d) / d).toFixed(m);
    }, multiply: function(e, o) {
      let i = 0, l = e.toString(), d = o.toString();
      try {
        i += l.split(".")[1].length;
      } catch {
      }
      try {
        i += d.split(".")[1].length;
      } catch {
      }
      return Number(l.replace(".", "")) * Number(d.replace(".", "")) / Math.pow(10, i);
    }, divide: function(e, o) {
      let i = 0, l = 0;
      try {
        i = e.toString().split(".")[1].length;
      } catch {
      }
      try {
        l = o.toString().split(".")[1].length;
      } catch {
      }
      return Number(e.toString().replace(".", "")) / Number(o.toString().replace(".", "")) * Math.pow(10, l - i);
    }, modulo: function(e, o) {
      let i = 0, l = 0, d;
      try {
        i = e.toString().split(".")[1].length;
      } catch {
      }
      try {
        l = o.toString().split(".")[1].length;
      } catch {
      }
      return d = Math.pow(10, Math.max(i, l)), Math.round(Number(e) * d) % Math.round(Number(o) * d) / d;
    }, gcd: $e, scm: function(e, o) {
      return e * o / $e(e, o);
    }, toFixed: function(e, o = 2, i = s.ROUND) {
      return i == s.ROUND ? function(l, d = 2) {
        if (h(l))
          return "--";
        let m = String(l);
        if (d = d || 0, m.indexOf(".") == -1 && (m += "."), m += new Array(d + 1).join("0"), new RegExp("^(-|\\+)?(\\d+(\\.\\d{0," + (d + 1) + "})?)\\d*$").test(m)) {
          let O = "0" + RegExp.$2, S = RegExp.$1, E = RegExp.$3.length, N = !0;
          if (E == d + 2) {
            if (E = O.match(/\d/g), 4 < parseInt(E[E.length - 1]))
              for (let T = E.length - 2; 0 <= T && (E[T] = parseInt(E[T]) + 1, E[T] == 10); T--)
                E[T] = 0, N = T != 1;
            O = E.join("").replace(new RegExp("(\\d+)(\\d{" + d + "})\\d$"), "$1.$2");
          }
          return N && (O = O.substr(1)), (S + O).replace(/\.$/, "");
        }
        return String(l);
      }(e, o) : i == s.ROUND_FLOOR ? function(S, O = 2) {
        if (h(S))
          return "--";
        var m = O, O = Number(S), S = String(O).indexOf(".") + 1, E = S ? String(O).length - S : 0;
        if (S === 0 || E <= m) {
          let N = O;
          if (S === 0) {
            N += ".";
            for (let T = 0; T < m - E; T++)
              N += "0";
          } else
            for (let T = 0; T < m - E; T++)
              N += "0";
          return N;
        }
        return S = "", S = String(O).split(".")[0] + "." + String(O).split(".")[1].substring(0, m), String(S);
      }(e, o) : void 0;
    }, toDecimal: function(e, o = 2, i = s.ROUND) {
      return i == s.ROUND ? function(l, d = 2) {
        return h(l) ? "--" : (d = Math.pow(10, d), Math.round(l * d) / d);
      }(e, o) : i == s.ROUND_FLOOR ? function(l, d = 2) {
        return h(l) ? "--" : (d = Math.pow(10, d), Math.floor(l * d) / d);
      }(e, o) : void 0;
    } }), Ct = Object.freeze({ __proto__: null, getRandom: function(e = 0, o = 9) {
      return Math.floor(Math.random() * (o - e + 1) + e);
    }, getRandomDigit: function(e = 1) {
      return Math.floor((Math.random() + Math.floor(9 * Math.random() + 1)) * Math.pow(10, e - 1));
    }, getUUID: function(e = 32, o = 16) {
      var i, l = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
      let d = [], m;
      if (o = o || l.length, e)
        for (m = 0; m < e; m++)
          d[m] = l[0 | Math.random() * o];
      else
        for (d[8] = d[13] = d[18] = d[23] = "-", d[14] = "4", m = 0; m < 36; m++)
          d[m] || (i = 0 | 16 * Math.random(), d[m] = l[m == 19 ? 3 & i | 8 : i]);
      return d.join("");
    }, getGUID: function() {
      function e() {
        return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
      }
      return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e();
    } }), Dt = Object.freeze({ __proto__: null, formatFileSize: function(e) {
      return C(e) ? "0B" : e < 1024 ? e + "B" : e < 1048576 ? (e / 1024).toFixed(2) + "KB" : e < 1073741824 ? (e / 1048576).toFixed(2) + "MB" : (e / 1073741824).toFixed(2) + "GB";
    }, getFileName: function(e) {
      if (!C(e))
        return e.substring(0, e.lastIndexOf("."));
    }, getFileSuffix: function(e) {
      if (!C(e))
        return e.substring(e.lastIndexOf(".") + 1).toLowerCase();
    }, fileToBlob: function(e) {
      return new Promise((o, i) => {
        let l = new FileReader();
        l.readAsDataURL(e), l.onload = (d) => {
          d = new Blob([d.target.result], { type: e.type }), o(d);
        }, l.onerror = function(d) {
          console.error(d), i(d);
        };
      });
    }, fileToBase64: function(e) {
      return new Promise((o, i) => {
        let l = new FileReader();
        l.readAsDataURL(e), l.onload = function(d) {
          o(d.target.result);
        }, l.onerror = function(d) {
          console.error(d), i(d);
        };
      });
    }, fileToUrl: function(e) {
      return new Promise((o, i) => {
        try {
          o(URL.createObjectURL(e));
        } catch (l) {
          console.error(l), URL.revokeObjectURL(e), i(l);
        }
      });
    }, blobToFile: function(e, o = Date.now()) {
      return new Promise((i, l) => {
        try {
          const O = e.type;
          var d = e.size, m = O.split("/")[1];
          i(new File([e], Date.now() + "." + m, { type: O, size: d, name: o + "." + m, lastModified: Date.now(), lastModifiedDate: /* @__PURE__ */ new Date() }));
        } catch (O) {
          console.error(O), l(O);
        }
      });
    }, blobToBase64: function(e) {
      return new Promise((o, i) => {
        let l = new FileReader();
        l.readAsDataURL(e), l.onload = function(d) {
          o(d.target.result);
        }, l.onerror = function(d) {
          console.error(d), i(d);
        };
      });
    }, base64ToFile: function(e, o = Date.now()) {
      return new Promise((i, l) => {
        try {
          const m = e.split(","), O = m[0].match(/:(.*?);/)[1];
          var d = O.split("/")[1];
          const S = window.atob(m[1]);
          let E = S.length;
          const N = new Uint8Array(E);
          for (; E--; )
            N[E] = S.charCodeAt(E);
          i(new File([N], o + "." + d, { type: O }));
        } catch (m) {
          console.error(m), l(m);
        }
      });
    }, base64ToBlob: function(e) {
      return new Promise((o, i) => {
        try {
          const d = e.split(",");
          var l = d[0].match(/:(.*?);/)[1];
          const m = window.atob(d[1]);
          let O = m.length;
          const S = new Uint8Array(O);
          for (; O--; )
            S[O] = m.charCodeAt(O);
          o(new Blob([S], { type: l }));
        } catch (d) {
          console.error(d), i(d);
        }
      });
    }, urlToBase64: function(e) {
      return new Promise((o, i) => {
        const l = new Image();
        l.src = e, l.onload = function() {
          const d = document.createElement("canvas"), m = d.getContext("2d");
          d.width = l.width, d.height = l.height, m.drawImage(l, 0, 0, l.width, l.height);
          var O = d.toDataURL("image/png");
          o(O);
        }, l.onerror = function(d) {
          console.error(d), i(d);
        };
      });
    }, downloadBlobFile: function(e, o) {
      try {
        var i = window.URL.createObjectURL(e);
        const l = window.document.createElement("a");
        l.download = o, l.href = i, l.click(), URL.revokeObjectURL(i);
      } catch (l) {
        console.error(l);
      }
    }, downloadFileUrl: function(e, o) {
      try {
        const i = window.document.createElement("a");
        i.download = o, i.href = e, window.document.body.appendChild(i), i.click(), window.document.body.removeChild(i);
      } catch (i) {
        console.error(i);
      }
    } });
    function le(e) {
      if (255 < e)
        throw "'" + e + "'' is greater than 255(0xff);";
      return ("0" + Number(e).toString(16)).slice(-2);
    }
    var Ee = Object.freeze({ __proto__: null, rgbToHex: function(l) {
      l = l.split(",");
      var o = parseInt(l[0].split("(")[1]), i = parseInt(l[1]), l = parseInt(l[2].split(")")[0]);
      return "#" + le(o) + le(i) + le(l);
    }, rgbaToHex: function(d) {
      d = d.split(",");
      var o = parseInt(d[0].split("(")[1]), i = parseInt(d[1]), l = parseInt(d[2]), d = parseFloat(d[3].split(")")[0]);
      return "#" + le(Math.round(256 * d - 1)) + le(o) + le(i) + le(l);
    }, rgbaToHsl: function(O) {
      O = O.split(",");
      var o = parseInt(O[0].split("(")[1]) / 255, i = parseInt(O[1]) / 255, l = parseInt(O[2]) / 255, d = parseFloat(O[3] && O[3].split(")")[0]), m = Math.max(o, i, l), O = Math.min(o, i, l);
      let S, E, N = (m + O) / 2;
      if (m === O)
        S = E = 0;
      else {
        var T = m - O;
        switch (E = 0.5 < N ? T / (2 - m - O) : T / (m + O), m) {
          case o:
            S = (i - l) / T + (i < l ? 6 : 0);
            break;
          case i:
            S = (l - o) / T + 2;
            break;
          case l:
            S = (o - i) / T + 4;
        }
        S /= 6;
      }
      return d ? `hsla(${Math.round(360 * S)},${Math.round(100 * E)}%,${Math.round(100 * N)}%,${d})` : `hsl(${Math.round(360 * S)},${Math.round(100 * E)}%,${Math.round(100 * N)}%)`;
    }, hexToRgb: function(e) {
      let o = {};
      return e = e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(i, l, d, m) {
        return l + l + d + d + m + m;
      }), e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e), o.r = parseInt(e[1], 16), o.g = parseInt(e[2], 16), o.b = parseInt(e[3], 16), `rgb(${o.r},${o.g},${o.b})`;
    }, hexToRgba: function(e, o = 1) {
      let i = {};
      return e = e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(l, d, m, O) {
        return d + d + m + m + O + O;
      }), e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e), i.r = parseInt(e[1], 16), i.g = parseInt(e[2], 16), i.b = parseInt(e[3], 16), i.o = o, `rgba(${i.r},${i.g},${i.b},${i.o})`;
    }, hexToHsl: function(m) {
      var d = m.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(T, pt, be, gt) {
        return pt + pt + be + be + gt + gt;
      }), m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(d), o = parseInt(m[1], 16) / 255, i = parseInt(m[2], 16) / 255, l = parseInt(m[3], 16) / 255, d = Math.max(o, i, l), m = Math.min(o, i, l);
      let O, S, E = (d + m) / 2;
      if (d === m)
        O = S = 0;
      else {
        var N = d - m;
        switch (S = 0.5 < E ? N / (2 - d - m) : N / (d + m), d) {
          case o:
            O = (i - l) / N + (i < l ? 6 : 0);
            break;
          case i:
            O = (l - o) / N + 2;
            break;
          case l:
            O = (o - i) / N + 4;
        }
        O /= 6;
      }
      return `hsl(${Math.round(360 * O)},${Math.round(100 * S)}%,${Math.round(100 * E)}%)`;
    }, getRandomHex: function() {
      return "#" + (e = (16777216 * Math.random() << 0).toString(16), new Array(7 - e.length).join("0") + e);
      var e;
    }, getRandomRgb: function() {
      return `rgb(${Math.floor(256 * Math.random())},${Math.floor(256 * Math.random())},${Math.floor(256 * Math.random())})`;
    }, getRandomRgba: function() {
      return `rgba(${Math.floor(256 * Math.random())},${Math.floor(256 * Math.random())},${Math.floor(256 * Math.random())},${(+Math.random()).toFixed(2)})`;
    } }), st = { 8: "Backspace", 9: "Tab", 13: "Enter", 16: "Shift", 17: "Ctrl", 18: "Alt", 19: "Pause", 20: "Caps Lock", 27: "Escape", 32: "Space", 33: "Page Up", 34: "Page Down", 35: "End", 36: "Home", 37: "Left", 38: "Up", 39: "Right", 40: "Down", 42: "Print Screen", 45: "Insert", 46: "Delete", 48: "0", 49: "1", 50: "2", 51: "3", 52: "4", 53: "5", 54: "6", 55: "7", 56: "8", 57: "9", 65: "A", 66: "B", 67: "C", 68: "D", 69: "E", 70: "F", 71: "G", 72: "H", 73: "I", 74: "J", 75: "K", 76: "L", 77: "M", 78: "N", 79: "O", 80: "P", 81: "Q", 82: "R", 83: "S", 84: "T", 85: "U", 86: "V", 87: "W", 88: "X", 89: "Y", 90: "Z", 91: "Windows", 93: "Right Click", 96: "Numpad 0", 97: "Numpad 1", 98: "Numpad 2", 99: "Numpad 3", 100: "Numpad 4", 101: "Numpad 5", 102: "Numpad 6", 103: "Numpad 7", 104: "Numpad 8", 105: "Numpad 9", 106: "Numpad *", 107: "Numpad +", 109: "Numpad -", 110: "Numpad .", 111: "Numpad /", 112: "F1", 113: "F2", 114: "F3", 115: "F4", 116: "F5", 117: "F6", 118: "F7", 119: "F8", 120: "F9", 121: "F10", 122: "F11", 123: "F12", 144: "Num Lock", 145: "Scroll Lock", 182: "My Computer", 183: "My Calculator", 186: ";", 187: "=", 188: ",", 189: "-", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\", 221: "]", 222: "'" }, It = Object.freeze({ __proto__: null, getKeyName: function(e) {
      return st[e] || ("" + e, "");
    }, getKeyCode: function(e) {
      for (var o in st)
        if (st[o] == e)
          return o;
    } }), Ce = Object.freeze({ __proto__: null, getQueryString: function(e, o = window.location.href) {
      return e = e.replace(/[\[\]]/g, "\\$&"), o = o.split("?")[1], e = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"), (e = o.substring(0).match(e)) != null ? decodeURI(e[2]) : "";
    }, queryStringToObj: function(e = window.location.href) {
      if (e.indexOf("?") === -1)
        return {};
      let o = e[0] === "?" ? e.substr(1) : e.substring(e.lastIndexOf("?") + 1);
      o = o.split("&");
      let i = {};
      for (let d = 0; d < o.length; d++) {
        var l = o[d].split("=");
        i[decodeURIComponent(l[0])] = decodeURIComponent(l[1] || "");
      }
      return i;
    }, objToQueryString: function(e) {
      if (!e)
        return "";
      let o = [];
      for (var i in e) {
        var l = e[i];
        if (l instanceof Array)
          for (let d = 0; d < l.length; ++d)
            o.push(encodeURIComponent(i + "[" + d + "]") + "=" + encodeURIComponent(l[d]));
        else
          o.push(encodeURIComponent(i) + "=" + encodeURIComponent(e[i]));
      }
      return o.join("&");
    } });
    function Be(e, o, i = 864e5) {
      typeof document < "u" && (document.cookie = e + "=" + o + ";expires=" + new Date(Date.now() + i));
    }
    var ut = Object.freeze({ __proto__: null, isSupportCookie: function() {
      return window.navigator.cookieEnabled;
    }, getCookie: function(e) {
      if (typeof document < "u") {
        let i = document.cookie ? document.cookie.replace(/\s/g, "").split(";") : [];
        for (var o in i)
          if (o = i[o].split("="), o[0] == e)
            return decodeURIComponent(o[1]);
        return "";
      }
    }, setCookie: Be, removeCookie: function(e) {
      C(e) || Be(e, "", -1);
    }, clearCookie: function(e = document.domain) {
      var o = document.cookie.match(/[^ =;]+(?=\=)/g);
      if (o)
        for (let i = o.length; i--; )
          document.cookie = o[i] + "=0;path=/;" + e ? "domain=" + e + ";" : "expires=" + (/* @__PURE__ */ new Date(0)).toUTCString();
    } }), lt = Object.freeze({ __proto__: null, isSupportStorage: function() {
      return !(!window.localStorage || !window.sessionStorage);
    }, getLocalStorage: function(e) {
      return window.localStorage.getItem(e) || void 0;
    }, setLocalStorage: function(e, o) {
      window.localStorage.setItem(e, o);
    }, removeLocalStorage: function(e) {
      window.localStorage.removeItem(e);
    }, clearLocalStorage: function() {
      window.localStorage.clear();
    }, getSessionStorage: function(e) {
      return window.sessionStorage.getItem(e) || "";
    }, setSessionStorage: function(e, o) {
      window.sessionStorage.setItem(e, o);
    }, removeSessionStorage: function(e) {
      window.sessionStorage.removeItem(e);
    }, clearSessionStorage: function() {
      window.sessionStorage.clear();
    } });
    function Le(e, o) {
      return 0 < e.className.indexOf(o);
    }
    function Je(e, o) {
      Le(e, o) || (e.className += " " + o);
    }
    function ct(e, o) {
      Le(e, o) && (e.className = e.className.replace(new RegExp(o, "gm"), ""));
    }
    var ft = Object.freeze({ __proto__: null, hasClass: Le, addClass: Je, removeClass: ct, replaceClass: function(e, o, i) {
      ct(e, i), Je(e, o);
    }, addStyle: function(e, o = {}) {
      if (e)
        for (var i in o)
          e.style[i] = o[i];
    }, getStyle: function(e, o) {
      if (e)
        return e.style[o];
    }, removeStyle: function(e, o) {
      e && e.style.removeProperty(o);
    }, htmlEncode: function(e) {
      const o = { "<": "&lt;", ">": "&gt;", "&": "&amp;", "(": "&#40;", ")": "&#41;", "/": "&#47;", " ": "&nbsp;", '"': "&quot;", "'": "&#39;" };
      return e.replace(/[<>&|()\/ '"]/g, function(i) {
        return o[i];
      });
    }, htmlDecode: function(e) {
      const o = { "&lt;": "<", "&gt;": ">", "&amp;": "&", "&#40;": "(", "&#41;": ")", "&#47;": "/", "&nbsp;": " ", "&quot;": '"', "&#39;": "'" };
      return e.replace(/(&lt;|&gt;|&amp;|&#40;|&#41;|&#47;|&nbsp;|&quot;|&#39;)/gi, function(i, l) {
        return o[l];
      });
    }, copyText: function(e) {
      return new Promise((o, i) => {
        navigator.clipboard.writeText(e).then(() => {
          o(e);
        }).catch((l) => {
          console.error("copy error!"), i(l);
        });
      });
    }, getCopyText: function() {
      return new Promise((e, o) => {
        navigator.clipboard.readText().then((i) => {
          e(i);
        }).catch((i) => {
          o(i);
        });
      });
    } });
    function dt() {
      var e = window.navigator.userAgent;
      return /Android|webOS|iPhone|iPod|BlackBerry|Windows Phone|IEMobile/i.test(e);
    }
    var Nt = Object.freeze({ __proto__: null, getBrowserInfo: function() {
      let e = window.navigator.userAgent.toLowerCase();
      var o = e.match(/rv:([\d.]+)\) like gecko/) || e.match(/msie ([\d\.]+)/), i = e.match(/edg\/([\d\.]+)/), l = e.match(/firefox\/([\d\.]+)/), d = e.match(/(?:opera|opr).([\d\.]+)/), m = e.match(/chrome\/([\d\.]+)/), O = e.match(/version\/([\d\.]+).*safari/);
      return o ? { name: "ie", version: o[1] } : i ? { name: "edge", version: i[1] } : l ? { name: "firefox", version: l[1] } : d ? { name: "opera", version: d[1] } : m ? { name: "chrome", version: m[1] } : O ? { name: "safari", version: O[1] } : "unknown";
    }, isPc: function() {
      return !dt();
    }, isMobile: dt, isAndroid: function() {
      var e = window.navigator.userAgent;
      return /Android|BlackBerry/i.test(e);
    }, isIos: function() {
      var e = window.navigator.userAgent;
      return /iPhone|iPad|iPod|iOS/i.test(e);
    }, isWindowsPhone: function() {
      var e = window.navigator.userAgent;
      return /Windows Phone/i.test(e);
    }, isWindows: function() {
      var e = window.navigator.userAgent;
      return /win/i.test(e);
    }, isLinux: function() {
      var e = window.navigator.userAgent;
      return /linux/i.test(e);
    }, isMac: function() {
      var e = window.navigator.userAgent;
      return /mac/i.test(e);
    }, isIphone: function() {
      var e = window.navigator.userAgent;
      return /iPhone/i.test(e);
    }, isIpad: function() {
      var e = window.navigator.userAgent;
      return /iPod/i.test(e);
    }, isWeixin: function() {
      var e = window.navigator.userAgent;
      return /MicroMessenger/i.test(e);
    }, isQQ: function() {
      var e = window.navigator.userAgent;
      return /QQ/i.test(e);
    } }), Xe = Object.freeze({ __proto__: null, setStorageSync: function(e, o) {
      wx.setStorageSync(e, o);
    }, getStorageSync: function(e) {
      return wx.getStorageSync(e);
    }, getStorageInfoSync: function() {
      return wx.getStorageInfoSync();
    }, removeStorageSync: function(e) {
      wx.removeStorageSync(e);
    }, clearStorageSync: function() {
      wx.clearStorageSync();
    }, setStorage: function({ key: e, data: o, encrypt: i = !1 }) {
      return new Promise((l, d) => {
        wx.setStorage({ key: e, data: o, encrypt: i, success(m) {
          l(m);
        }, fail(m) {
          d(m);
        } });
      });
    }, getStorage: function({ key: e, encrypt: o = !1 }) {
      return new Promise((i, l) => {
        wx.getStorage({ key: e, encrypt: o, success(d) {
          i(d);
        }, fail(d) {
          l(d);
        } });
      });
    }, getStorageInfo: function() {
      return new Promise((e, o) => {
        wx.getStorageInfo({ success(i) {
          e(i);
        }, fail(i) {
          o(i);
        } });
      });
    }, removeStorage: function({ key: e }) {
      return new Promise((o, i) => {
        wx.removeStorage({ key: e, success(l) {
          o(l);
        }, fail(l) {
          i(l);
        } });
      });
    }, clearStorage: function() {
      return new Promise((e, o) => {
        wx.clearStorage({ success(i) {
          e(i);
        }, fail(i) {
          o(i);
        } });
      });
    } }), Xe = { loadedTest: function() {
    }, ...u, ...f, ..._, ...at, ...ge, ...ne, ...ve, ...Et, ...Ct, ...Dt, ...Ee, ...se, ...It, ...Ce, ...ut, ...lt, ...ft, ...Nt, ...Xe }, Ve = { loadedTest: function() {
    }, ...Ve };
    return { loadedTest: function() {
    }, ...Xe, ...Ve };
  });
})(ur);
var Zi = ur.exports;
const Ji = /* @__PURE__ */ Object.assign({
  name: "Render"
}, {
  __name: "index",
  props: {
    data: { type: Object, default: () => ({}) }
  },
  setup(t) {
    const n = t, r = (f, p) => String(f).split("/").filter((_) => _.indexOf(p) > -1).shift(), s = pe();
    Object.entries(/* @__PURE__ */ Object.assign({ "/src/platform/widgets/base-info-sets-widget/index.vue": Mr, "/src/platform/widgets/button-widget/index.vue": va, "/src/platform/widgets/col-widget/index.vue": ya, "/src/platform/widgets/data-table-widget/index.vue": Oa, "/src/platform/widgets/dept-list-tree-widget/index.vue": $a, "/src/platform/widgets/dialog-widget/index.vue": Ia, "/src/platform/widgets/extra-info-sets-widget/index.vue": Aa, "/src/platform/widgets/flow-step-widget/index.vue": ka, "/src/platform/widgets/form-item-widget/index.vue": Pa, "/src/platform/widgets/form-widget/index.vue": Va, "/src/platform/widgets/input-widget/index.vue": Ha, "/src/platform/widgets/menu-list-tree-widget/index.vue": Ya, "/src/platform/widgets/row-widget/index.vue": Za, "/src/platform/widgets/select-widget/index.vue": ei, "/src/platform/widgets/simple-container-widget/index.vue": oi, "/src/platform/widgets/slot-widget/index.vue": ui, "/src/platform/widgets/table-widget/index.vue": di, "/src/platform/widgets/text-widget/index.vue": hi, "/src/platform/widgets/textarea-widget/index.vue": _i })).map(([f, p]) => {
      let _ = p.default.name || Zi.toPascalCase(r(f, "-widget"));
      s.appContext.app.component(_, p.default);
    });
    const c = et(null);
    return c.value = qi({ props: { widgets: n.data.widgets, globalConfig: n.data.globalConfig } }), (f, p) => (D(), R(nt, null, [
      Dn(Re(t.data.globalConfig) + " ", 1),
      (D(), z(_e(c.value), { class: "render" }))
    ], 64));
  }
});
export {
  Or as BaseInfoSetsWidget,
  ha as ButtonWidget,
  _a as ColWidget,
  xa as DataTableWidget,
  Ma as DeptListTreeWidget,
  Da as DialogWidget,
  Na as ExtraInfoSetsWidget,
  Ra as FlowStepWidget,
  ja as FormItemWidget,
  La as FormWidget,
  Ua as InputWidget,
  Wa as MenuListTreeWidget,
  Ji as Render,
  qa as RowWidget,
  Xa as SelectWidget,
  ri as SimpleContainerWidget,
  si as SlotWidget,
  fi as TableWidget,
  gi as TextWidget,
  mi as TextareaWidget,
  Sr as useDataSource,
  Kt as useGlobal,
  xr as useWidget
};
