import { defineComponent as d, resolveComponent as l, openBlock as c, createElementBlock as a, createVNode as i, withCtx as f, unref as s } from "vue";
const m = { class: "inline-flex flex-wrap gap-x-1" }, v = /* @__PURE__ */ d({
  __name: "TipTapListsControls",
  props: {
    editor: {},
    config: {}
  },
  setup(t) {
    const { t: o } = useI18n();
    return (p, e) => {
      const n = l("Button"), r = l("ButtonGroup");
      return c(), a("div", m, [
        i(r, null, {
          default: f(() => [
            i(n, {
              size: "small",
              title: s(o)("Bulleted List"),
              icon: "i-material-symbols:format-list-bulleted",
              severity: "info",
              outlined: !t.editor.isActive("bulletList"),
              onClick: e[0] || (e[0] = (u) => t.editor.chain().focus().toggleBulletList().run())
            }, null, 8, ["title", "outlined"]),
            i(n, {
              size: "small",
              title: s(o)("Bulleted List"),
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
  v as default
};
