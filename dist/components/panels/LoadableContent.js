import { defineComponent as c, resolveComponent as n, openBlock as e, createElementBlock as o, createVNode as l, createBlock as d, withCtx as m, createTextVNode as p, toDisplayString as _, unref as u, renderSlot as f } from "vue";
import { useI18n as g } from "vue-i18n";
const k = {
  key: 0,
  class: "text-center"
}, B = /* @__PURE__ */ c({
  __name: "LoadableContent",
  props: {
    isLoading: { type: Boolean },
    item: {}
  },
  setup(t) {
    const { t: r } = g();
    return (s, y) => {
      const a = n("ProgressSpinner"), i = n("InlineMessage");
      return e(), o("div", null, [
        t.isLoading ? (e(), o("div", k, [
          l(a, { class: "!size-12" })
        ])) : t.item ? f(s.$slots, "default", { key: 2 }) : (e(), d(i, {
          key: 1,
          severity: "danger"
        }, {
          default: m(() => [
            p(_(u(r)("Error")), 1)
          ]),
          _: 1
        }))
      ]);
    };
  }
});
export {
  B as default
};
