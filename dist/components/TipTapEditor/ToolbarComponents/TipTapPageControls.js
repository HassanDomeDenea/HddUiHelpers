import k from "primevue/buttongroup";
import p from "primevue/button";
import { defineComponent as B, openBlock as r, createElementBlock as g, createVNode as l, withCtx as u, unref as a, createBlock as d, createCommentVNode as s } from "vue";
import { printDomWithStyles as v } from "HddUiHelpers/utils/printDom.ts";
import { useI18n as h } from "vue-i18n";
const C = { class: "inline-flex flex-wrap" }, w = /* @__PURE__ */ B({
  __name: "TipTapPageControls",
  props: {
    editor: {},
    config: {}
  },
  setup(e) {
    const { t: n } = h();
    function m() {
      const t = document.createElement("div");
      t.classList.add("tiptap"), t.innerHTML = e.editor.view.dom.innerHTML, v(t);
    }
    return (t, i) => {
      const o = p, c = k;
      return r(), g("div", C, [
        l(c, null, {
          default: u(() => [
            l(o, {
              size: "small",
              disabled: !e.editor.can().chain().focus().setHorizontalRule().run(),
              title: a(n)("Insert Horizontal Line"),
              severity: "info",
              outlined: !e.editor.isActive("hr"),
              icon: "i-mdi:horizontal-line",
              onClick: i[0] || (i[0] = (f) => e.editor.chain().focus().setHorizontalRule().run())
            }, null, 8, ["disabled", "title", "outlined"]),
            e.config?.withPageBreakButton ? (r(), d(o, {
              key: 0,
              size: "small",
              disabled: !e.editor.can().chain().focus().setPageBreak().run(),
              title: a(n)("Insert Page Break"),
              severity: "info",
              outlined: !e.editor.isActive("tip-tap-page-breaker-node"),
              icon: "i-pixel:page-break",
              onClick: i[1] || (i[1] = (f) => e.editor.chain().focus().setPageBreak().run())
            }, null, 8, ["disabled", "title", "outlined"])) : s("", !0)
          ]),
          _: 1
        }),
        e.config?.withPrintButton ? (r(), d(c, { key: 0 }, {
          default: u(() => [
            l(o, {
              size: "small",
              title: a(n)("Print Content"),
              severity: "info",
              icon: "i-mdi-printer",
              onClick: m
            }, null, 8, ["title"])
          ]),
          _: 1
        })) : s("", !0)
      ]);
    };
  }
});
export {
  w as default
};
