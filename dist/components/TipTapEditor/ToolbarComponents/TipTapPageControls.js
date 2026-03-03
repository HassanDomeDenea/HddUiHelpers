import { defineComponent as B, resolveComponent as c, openBlock as l, createElementBlock as v, createVNode as r, withCtx as d, unref as a, createBlock as s, createCommentVNode as m } from "vue";
import { printDomWithStyles as g } from "HddUiHelpers/utils/printDom.ts";
const p = { class: "inline-flex flex-wrap" }, z = /* @__PURE__ */ B({
  __name: "TipTapPageControls",
  props: {
    editor: {},
    config: {}
  },
  setup(e) {
    const { t: i } = useI18n();
    function f() {
      const t = document.createElement("div");
      t.classList.add("tiptap"), t.innerHTML = e.editor.view.dom.innerHTML, g(t);
    }
    return (t, n) => {
      const o = c("Button"), u = c("ButtonGroup");
      return l(), v("div", p, [
        r(u, null, {
          default: d(() => [
            r(o, {
              size: "small",
              disabled: !e.editor.can().chain().focus().setHorizontalRule().run(),
              title: a(i)("Insert Horizontal Line"),
              severity: "info",
              outlined: !e.editor.isActive("hr"),
              icon: "i-mdi:horizontal-line",
              onClick: n[0] || (n[0] = (k) => e.editor.chain().focus().setHorizontalRule().run())
            }, null, 8, ["disabled", "title", "outlined"]),
            e.config?.withPageBreakButton ? (l(), s(o, {
              key: 0,
              size: "small",
              disabled: !e.editor.can().chain().focus().setPageBreak().run(),
              title: a(i)("Insert Page Break"),
              severity: "info",
              outlined: !e.editor.isActive("tip-tap-page-breaker-node"),
              icon: "i-pixel:page-break",
              onClick: n[1] || (n[1] = (k) => e.editor.chain().focus().setPageBreak().run())
            }, null, 8, ["disabled", "title", "outlined"])) : m("", !0)
          ]),
          _: 1
        }),
        e.config?.withPrintButton ? (l(), s(u, { key: 0 }, {
          default: d(() => [
            r(o, {
              size: "small",
              title: a(i)("Print Content"),
              severity: "info",
              icon: "i-mdi-printer",
              onClick: f
            }, null, 8, ["title"])
          ]),
          _: 1
        })) : m("", !0)
      ]);
    };
  }
});
export {
  z as default
};
