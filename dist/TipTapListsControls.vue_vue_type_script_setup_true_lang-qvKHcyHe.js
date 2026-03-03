import u from "primevue/buttongroup";
import d from "primevue/button";
import { defineComponent as c, openBlock as m, createElementBlock as f, createVNode as i, withCtx as a, unref as l } from "vue";
import { useI18n as p } from "vue-i18n";
const g = { class: "inline-flex flex-wrap gap-x-1" }, C = /* @__PURE__ */ c({
  __name: "TipTapListsControls",
  props: {
    editor: {},
    config: {}
  },
  setup(t) {
    const { t: o } = p();
    return (B, e) => {
      const n = d, s = u;
      return m(), f("div", g, [
        i(s, null, {
          default: a(() => [
            i(n, {
              size: "small",
              title: l(o)("Bulleted List"),
              icon: "i-material-symbols:format-list-bulleted",
              severity: "info",
              outlined: !t.editor.isActive("bulletList"),
              onClick: e[0] || (e[0] = (r) => t.editor.chain().focus().toggleBulletList().run())
            }, null, 8, ["title", "outlined"]),
            i(n, {
              size: "small",
              title: l(o)("Bulleted List"),
              icon: "i-ant-design:ordered-list-outlined",
              severity: "info",
              outlined: !t.editor.isActive("orderedList"),
              onClick: e[1] || (e[1] = (r) => t.editor.chain().focus().toggleOrderedList().run())
            }, null, 8, ["title", "outlined"])
          ]),
          _: 1
        })
      ]);
    };
  }
});
export {
  C as _
};
