import { defineComponent as k, useModel as v, resolveComponent as b, openBlock as o, createElementBlock as n, createVNode as f, createCommentVNode as i, renderSlot as s, withDirectives as h, createElementVNode as p, vShow as B, mergeModels as d } from "vue";
const _ = {
  key: "listItems",
  class: "animate-slide-in-down animate-duration-75 animate-count-1"
}, w = {
  key: 0,
  class: "mb-1 flex justify-end"
}, y = {
  key: "lists",
  class: "animate-slide-in-up animate-duration-75 animate-count-1"
}, M = /* @__PURE__ */ k({
  __name: "SlidingParentChildContainer",
  props: /* @__PURE__ */ d({
    withBackButton: { type: Boolean, default: !0 },
    backButtonLabel: {}
  }, {
    modelValue: { required: !1 },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ d(["back"], ["update:modelValue"]),
  setup(t, { expose: c, emit: u }) {
    const r = u, e = v(t, "modelValue");
    function a() {
      e.value = void 0, r("back");
    }
    return c({
      backToParent: a,
      selectedChild: e
    }), (l, C) => {
      const m = b("Button");
      return o(), n("div", null, [
        e.value ? (o(), n("div", _, [
          t.withBackButton ? (o(), n("div", w, [
            f(m, {
              size: "small",
              icon: "i-material-symbols:arrow-upward-alt-rounded",
              severity: "info",
              label: t.backButtonLabel,
              onClick: a
            }, null, 8, ["label"])
          ])) : i("", !0),
          s(l.$slots, "child")
        ])) : i("", !0),
        h(p("div", y, [
          s(l.$slots, "parent")
        ], 512), [
          [B, !e.value]
        ])
      ]);
    };
  }
});
export {
  M as default
};
