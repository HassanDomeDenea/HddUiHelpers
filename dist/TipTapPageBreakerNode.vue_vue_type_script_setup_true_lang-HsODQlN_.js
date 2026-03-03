import { defineComponent as l, resolveComponent as c, openBlock as o, createBlock as i, unref as n, withCtx as p, createElementVNode as t, createElementBlock as g, createCommentVNode as s, toDisplayString as u } from "vue";
import { NodeViewWrapper as m } from "@tiptap/vue-3";
const b = { class: "flex items-center gap-1 px-1" }, k = {
  key: 0,
  class: "inline-block size-[25px]"
}, x = { class: "light:text-gray-400 italic dark:text-gray-600" }, h = /* @__PURE__ */ l({
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
    const { t: a } = useI18n();
    return (y, e) => {
      const d = c("Button");
      return o(), i(n(m), { class: "break-after-page print:invisible print:h-[1px] print:overflow-hidden" }, {
        default: p(() => [
          t("div", b, [
            r.editor.isEditable ? (o(), g("span", k)) : s("", !0),
            e[0] || (e[0] = t("div", { class: "border-t-1 border-t-dashed flex-grow-1 light:border-t-gray-400 dark:border-t-gray-600" }, null, -1)),
            t("span", x, u(n(a)("Page Break")), 1),
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
  h as _
};
