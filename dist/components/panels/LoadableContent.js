import c from "primevue/inlinemessage";
import a from "primevue/progressspinner";
import { defineComponent as l, openBlock as e, createElementBlock as n, createVNode as m, createBlock as _, withCtx as p, createTextVNode as d, toDisplayString as u, unref as f, renderSlot as g } from "vue";
import { useI18n as k } from "vue-i18n";
const y = {
  key: 0,
  class: "text-center"
}, L = /* @__PURE__ */ l({
  __name: "LoadableContent",
  props: {
    isLoading: { type: Boolean },
    item: {}
  },
  setup(t) {
    const { t: o } = k();
    return (r, x) => {
      const s = a, i = c;
      return e(), n("div", null, [
        t.isLoading ? (e(), n("div", y, [
          m(s, { class: "!size-12" })
        ])) : t.item ? g(r.$slots, "default", { key: 2 }) : (e(), _(i, {
          key: 1,
          severity: "danger"
        }, {
          default: p(() => [
            d(u(f(o)("Error")), 1)
          ]),
          _: 1
        }))
      ]);
    };
  }
});
export {
  L as default
};
