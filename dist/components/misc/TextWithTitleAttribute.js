import o from "primevue/tooltip";
import { defineComponent as i, withDirectives as n, openBlock as c, createBlock as a, resolveDynamicComponent as l, withCtx as r, createTextVNode as m, toDisplayString as p } from "vue";
const f = /* @__PURE__ */ i({
  __name: "TextWithTitleAttribute",
  props: {
    component: {},
    text: {},
    asTooltip: { type: Boolean }
  },
  setup(t) {
    return (s, x) => {
      const e = o;
      return n((c(), a(l(t.component ?? "span"), { title: t.text }, {
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
  f as default
};
