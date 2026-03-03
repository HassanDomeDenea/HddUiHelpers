import { defineComponent as o, resolveDirective as i, withDirectives as n, openBlock as c, createBlock as l, resolveDynamicComponent as a, withCtx as r, createTextVNode as m, toDisplayString as p } from "vue";
const u = /* @__PURE__ */ o({
  __name: "TextWithTitleAttribute",
  props: {
    component: {},
    text: {},
    asTooltip: { type: Boolean }
  },
  setup(t) {
    return (s, x) => {
      const e = i("tooltip");
      return n((c(), l(a(t.component ?? "span"), { title: t.text }, {
        default: r(() => [
          m(p(t.text), 1)
        ]),
        _: 1
      }, 8, ["title"])), [
        [e, t.asTooltip ? t.text : void 0]
      ]);
    };
  }
});
export {
  u as default
};
