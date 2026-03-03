import { defineComponent as d, resolveComponent as l, openBlock as c, createElementBlock as a, createVNode as o, withCtx as m, unref as s } from "vue";
import { useI18n as f } from "vue-i18n";
const p = { class: "inline-flex flex-wrap gap-x-1" }, L = /* @__PURE__ */ d({
  __name: "TipTapListsControls",
  props: {
    editor: {},
    config: {}
  },
  setup(t) {
    const { t: i } = f();
    return (B, e) => {
      const n = l("Button"), r = l("ButtonGroup");
      return c(), a("div", p, [
        o(r, null, {
          default: m(() => [
            o(n, {
              size: "small",
              title: s(i)("Bulleted List"),
              icon: "i-material-symbols:format-list-bulleted",
              severity: "info",
              outlined: !t.editor.isActive("bulletList"),
              onClick: e[0] || (e[0] = (u) => t.editor.chain().focus().toggleBulletList().run())
            }, null, 8, ["title", "outlined"]),
            o(n, {
              size: "small",
              title: s(i)("Bulleted List"),
              icon: "i-ant-design:ordered-list-outlined",
              severity: "info",
              outlined: !t.editor.isActive("orderedList"),
              onClick: e[1] || (e[1] = (u) => t.editor.chain().focus().toggleOrderedList().run())
            }, null, 8, ["title", "outlined"])
          ]),
          _: 1
        })
      ]);
    };
  }
});
export {
  L as default
};
