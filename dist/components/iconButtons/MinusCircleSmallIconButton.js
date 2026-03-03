import { openBlock as r, createElementBlock as t, createElementVNode as n } from "vue";
import { _ as o } from "../../_plugin-vue_export-helper-CHgC5LLL.js";
const s = {}, c = {
  tabindex: "0",
  class: "dark:(bg-gray-800/25 hover:bg-gray-500/25) light:(bg-gray-300/25 hover:bg-gray-400/25) flex cursor-pointer items-center self-stretch rounded-lg px-2 text-xs"
};
function l(i, e) {
  return r(), t("span", c, [...e[0] || (e[0] = [
    n("i", { class: "i-mdi-minus-circle light:text-red-500 dark:text-red-400" }, null, -1)
  ])]);
}
const g = /* @__PURE__ */ o(s, [["render", l]]);
export {
  g as default
};
