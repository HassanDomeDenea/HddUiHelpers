import l from "primevue/button";
import { defineComponent as c, openBlock as o, createBlock as i, unref as n, withCtx as p, createElementVNode as t, createElementBlock as m, createCommentVNode as s, toDisplayString as g } from "vue";
import { NodeViewWrapper as u } from "@tiptap/vue-3";
import { useI18n as b } from "vue-i18n";
const k = { class: "flex items-center gap-1 px-1" }, x = {
  key: 0,
  class: "inline-block size-[25px]"
}, f = { class: "light:text-gray-400 italic dark:text-gray-600" }, w = /* @__PURE__ */ c({
  __name: "TipTapPageBreakerNode",
  props: {
    decorations: {},
    selected: { type: Boolean },
    updateAttributes: { type: Function },
    deleteNode: { type: Function },
    node: {},
    view: {},
    getPos: {},
    innerDecorations: {},
    editor: {},
    extension: {},
    HTMLAttributes: {}
  },
  setup(r) {
    const { t: a } = b();
    return (y, e) => {
      const d = l;
      return o(), i(n(u), { class: "break-after-page print:invisible print:h-[1px] print:overflow-hidden" }, {
        default: p(() => [
          t("div", k, [
            r.editor.isEditable ? (o(), m("span", x)) : s("", !0),
            e[0] || (e[0] = t("div", { class: "border-t-1 border-t-dashed flex-grow-1 light:border-t-gray-400 dark:border-t-gray-600" }, null, -1)),
            t("span", f, g(n(a)("Page Break")), 1),
            e[1] || (e[1] = t("div", { class: "border-t-1 border-t-dashed flex-grow-1 light:border-t-gray-400 dark:border-t-gray-600" }, null, -1)),
            r.editor.isEditable ? (o(), i(d, {
              key: 1,
              variant: "text",
              severity: "danger",
              icon: "i-mdi-times",
              class: "size-[25px]",
              size: "small",
              onClick: r.deleteNode
            }, null, 8, ["onClick"])) : s("", !0)
          ])
        ]),
        _: 1
      });
    };
  }
});
export {
  w as _
};
