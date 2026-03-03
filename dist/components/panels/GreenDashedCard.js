import { openBlock as r, createElementBlock as t, createElementVNode as o, renderSlot as d } from "vue";
import { _ as n } from "../../_plugin-vue_export-helper-CHgC5LLL.js";
const s = {}, a = { class: "break-inside-avoid p-4" }, c = { class: "light:text-green-700 light:border-green-700 rounded-lg border-2 border-dotted p-4 dark:border-green-400 dark:text-green-400" };
function i(e, l) {
  return r(), t("div", a, [
    o("div", c, [
      d(e.$slots, "default")
    ])
  ]);
}
const g = /* @__PURE__ */ n(s, [["render", i]]);
export {
  g as default
};
