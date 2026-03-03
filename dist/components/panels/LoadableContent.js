import { defineComponent as c, resolveComponent as t, openBlock as e, createElementBlock as o, createVNode as l, createBlock as d, withCtx as p, createTextVNode as m, toDisplayString as _, unref as u, renderSlot as g } from "vue";
const f = {
  key: 0,
  class: "text-center"
}, v = /* @__PURE__ */ c({
  __name: "LoadableContent",
  props: {
    isLoading: { type: Boolean },
    item: {}
  },
  setup(n) {
    const { t: s } = useI18n();
    return (r, k) => {
      const a = t("ProgressSpinner"), i = t("InlineMessage");
      return e(), o("div", null, [
        n.isLoading ? (e(), o("div", f, [
          l(a, { class: "!size-12" })
        ])) : n.item ? g(r.$slots, "default", { key: 2 }) : (e(), d(i, {
          key: 1,
          severity: "danger"
        }, {
          default: p(() => [
            m(_(u(s)("Error")), 1)
          ]),
          _: 1
        }))
      ]);
    };
  }
});
export {
  v as default
};
