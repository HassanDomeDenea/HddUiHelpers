import k from "primevue/button";
import { defineComponent as f, useModel as b, openBlock as o, createElementBlock as a, createVNode as h, createCommentVNode as l, renderSlot as s, withDirectives as p, createElementVNode as v, vShow as B, mergeModels as d } from "vue";
const _ = {
  key: "listItems",
  class: "animate-slide-in-down animate-duration-75 animate-count-1"
}, w = {
  key: 0,
  class: "mb-1 flex justify-end"
}, y = {
  key: "lists",
  class: "animate-slide-in-up animate-duration-75 animate-count-1"
}, N = /* @__PURE__ */ f({
  __name: "SlidingParentChildContainer",
  props: /* @__PURE__ */ d({
    withBackButton: { type: Boolean, default: !0 },
    backButtonLabel: {}
  }, {
    modelValue: { required: !1 },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ d(["back"], ["update:modelValue"]),
  setup(t, { expose: c, emit: r }) {
    const u = r, e = b(t, "modelValue");
    function n() {
      e.value = void 0, u("back");
    }
    return c({
      backToParent: n,
      selectedChild: e
    }), (i, C) => {
      const m = k;
      return o(), a("div", null, [
        e.value ? (o(), a("div", _, [
          t.withBackButton ? (o(), a("div", w, [
            h(m, {
              size: "small",
              icon: "i-material-symbols:arrow-upward-alt-rounded",
              severity: "info",
              label: t.backButtonLabel,
              onClick: n
            }, null, 8, ["label"])
          ])) : l("", !0),
          s(i.$slots, "child")
        ])) : l("", !0),
        p(v("div", y, [
          s(i.$slots, "parent")
        ], 512), [
          [B, !e.value]
        ])
      ]);
    };
  }
});
export {
  N as default
};
