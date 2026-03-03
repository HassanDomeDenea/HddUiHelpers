import { defineComponent as v, useModel as C, useId as x, resolveComponent as y, openBlock as t, createElementBlock as n, normalizeClass as d, unref as a, toDisplayString as c, createCommentVNode as o, createVNode as L, withCtx as V, renderSlot as g, Fragment as r, createTextVNode as b, mergeModels as B } from "vue";
import { isBoolean as m } from "lodash-es";
import { useI18n as N } from "vue-i18n";
const $ = { class: "flex items-center gap-2" }, w = ["for"], S = {
  key: 0,
  class: "i-mdi-close"
}, M = ["for"], P = ["for"], E = /* @__PURE__ */ v({
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
    const l = C(e, "modelValue");
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
    const s = x(), { t: i } = N();
    return (k, I) => {
      const f = y("Checkbox");
      return t(), n("div", $, [
        e.labelPosition === "start" ? (t(), n("label", {
          key: 0,
          for: `hdd-checkbox-${a(s)}`,
          class: d(["select-none", [e.labelClass ?? ""]])
        }, c(e.label), 11, w)) : o("", !0),
        L(f, {
          "model-value": a(m)(l.value),
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
          icon: V((u) => [
            u.indeterminate ? (t(), n("i", S)) : o("", !0)
          ]),
          _: 1
        }, 8, ["model-value", "indeterminate", "input-id", "name", "invalid", "pt"]),
        e.labelPosition === "end" ? (t(), n("label", {
          key: 1,
          for: `hdd-checkbox-${a(s)}`,
          class: d(["select-none", [e.labelClass ?? ""]])
        }, c(e.label), 11, M)) : o("", !0),
        e.withStatusLabel && a(m)(l.value) ? (t(), n("label", {
          key: 2,
          for: `hdd-checkbox-${a(s)}`,
          class: d(["select-none", [e.statusLabelClass ?? ""]])
        }, [
          g(k.$slots, "statusLabel", { status: l.value }, () => [
            l.value === !0 ? (t(), n(r, { key: 0 }, [
              b(c(e.checkedLabel ?? a(i)("Yes")), 1)
            ], 64)) : o("", !0),
            l.value === !1 ? (t(), n(r, { key: 1 }, [
              b(c(e.unCheckedLabel ?? a(i)("No")), 1)
            ], 64)) : o("", !0)
          ])
        ], 10, P)) : o("", !0)
      ]);
    };
  }
});
export {
  E as default
};
