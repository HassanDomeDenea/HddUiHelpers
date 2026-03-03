import v from "primevue/checkbox";
import { defineComponent as C, useModel as x, useId as y, openBlock as t, createElementBlock as n, normalizeClass as i, unref as a, toDisplayString as c, createCommentVNode as o, createVNode as g, withCtx as L, renderSlot as V, Fragment as r, createTextVNode as m, mergeModels as B } from "vue";
import { isBoolean as b } from "lodash-es";
import { useI18n as N } from "vue-i18n";
const $ = { class: "flex items-center gap-2" }, w = ["for"], S = {
  key: 0,
  class: "i-mdi-close"
}, M = ["for"], P = ["for"], F = /* @__PURE__ */ C({
  __name: "YesNoCheckbox",
  props: /* @__PURE__ */ B({
    withStatusLabel: { type: Boolean },
    invalid: { type: Boolean },
    name: {},
    label: {},
    labelClass: {},
    statusLabelClass: {},
    labelPosition: { default: "end" },
    uncheckedValue: { default: "null" },
    checkedLabel: {},
    unCheckedLabel: {}
  }, {
    modelValue: { type: [Boolean, null], default: null },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e) {
    const l = x(e, "modelValue");
    function h() {
      switch (l.value) {
        case !0:
          l.value = !1;
          break;
        case !1:
          l.value = e.uncheckedValue === "null" ? null : void 0;
          break;
        case null:
        case void 0:
          l.value = !0;
          break;
      }
    }
    const s = y(), { t: d } = N();
    return (k, I) => {
      const f = v;
      return t(), n("div", $, [
        e.labelPosition === "start" ? (t(), n("label", {
          key: 0,
          for: `hdd-checkbox-${a(s)}`,
          class: i(["select-none", [e.labelClass ?? ""]])
        }, c(e.label), 11, w)) : o("", !0),
        g(f, {
          "model-value": a(b)(l.value),
          indeterminate: l.value === !1,
          binary: "",
          "input-id": `hdd-checkbox-${a(s)}`,
          name: e.name,
          invalid: e.invalid,
          pt: {
            box: (u) => ({
              class: u.context.indeterminate ? "text-black dark:bg-red-300 light:bg-red-400" : ""
            })
          },
          onValueChange: h
        }, {
          icon: L((u) => [
            u.indeterminate ? (t(), n("i", S)) : o("", !0)
          ]),
          _: 1
        }, 8, ["model-value", "indeterminate", "input-id", "name", "invalid", "pt"]),
        e.labelPosition === "end" ? (t(), n("label", {
          key: 1,
          for: `hdd-checkbox-${a(s)}`,
          class: i(["select-none", [e.labelClass ?? ""]])
        }, c(e.label), 11, M)) : o("", !0),
        e.withStatusLabel && a(b)(l.value) ? (t(), n("label", {
          key: 2,
          for: `hdd-checkbox-${a(s)}`,
          class: i(["select-none", [e.statusLabelClass ?? ""]])
        }, [
          V(k.$slots, "statusLabel", { status: l.value }, () => [
            l.value === !0 ? (t(), n(r, { key: 0 }, [
              m(c(e.checkedLabel ?? a(d)("Yes")), 1)
            ], 64)) : o("", !0),
            l.value === !1 ? (t(), n(r, { key: 1 }, [
              m(c(e.unCheckedLabel ?? a(d)("No")), 1)
            ], 64)) : o("", !0)
          ])
        ], 10, P)) : o("", !0)
      ]);
    };
  }
});
export {
  F as default
};
