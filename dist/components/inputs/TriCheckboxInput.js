import { defineComponent as $, useModel as x, ref as S, computed as p, resolveComponent as I, openBlock as r, createBlock as V, mergeProps as f, unref as s, withModifiers as T, createSlots as w, withCtx as o, createVNode as M, createElementBlock as m, createCommentVNode as b, renderSlot as a, createElementVNode as A, mergeModels as q } from "vue";
import { useHddBaseInputUtils as E } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { _ as N } from "../../BaseInput.vue_vue_type_script_setup_true_lang-C8yTwTDa.js";
const D = {
  key: 0,
  class: "pi pi-check text-[var(--p-checkbox-icon-checked-color)]"
}, H = {
  key: 1,
  class: "pi pi-times light:text-red-100 dark:text-red-700"
}, P = ["innerHTML"], j = /* @__PURE__ */ $({
  __name: "TriCheckboxInput",
  props: /* @__PURE__ */ q({
    notSelectedValue: { default: "null" },
    autocomplete: {},
    icon: {},
    uniqueId: {},
    modelValue: {},
    label: {},
    labelMinWidth: {},
    variant: {},
    iconAsAddon: { type: Boolean },
    onLocalEnterKeyDown: {},
    floatingLabel: { type: Boolean },
    showErrorMessage: { type: Boolean },
    floatingLabelVariant: {},
    infieldTopAlignedLabel: { type: Boolean },
    inputId: {},
    required: { type: Boolean },
    showRequiredAsterisk: { type: Boolean },
    requiredInLabel: { type: Boolean },
    formName: {},
    name: {},
    error: { type: [String, Boolean] },
    helperText: {},
    placeholder: {},
    autoI18nLabel: { type: Boolean },
    disabled: { type: Boolean },
    readonly: { type: Boolean },
    inline: { type: Boolean },
    controlBeforeLabel: { type: Boolean, default: !0 },
    labelSingleLine: { type: Boolean },
    hideLabelDoubleDots: { type: Boolean, default: !0 },
    ignoreLabelSelector: { type: Boolean },
    labelClass: {},
    labelStyle: { type: [Boolean, null, String, Object, Array] },
    iconClass: {},
    inputClass: {},
    wrapperClass: {},
    controlWrapperClass: {},
    size: {},
    buttonAddon: {},
    controlComponent: {}
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(t, { expose: h }) {
    const n = t, l = x(t, "modelValue"), y = S();
    function k() {
      y.value.$el.focus();
    }
    const i = p(() => l.value === !0 || l.value === !1), d = p(() => l.value === !1);
    function u() {
      if (!n.disabled)
        switch (l.value) {
          case !0:
            l.value = !1;
            break;
          case !1:
            l.value = n.notSelectedValue === "null" ? null : void 0;
            break;
          default:
            l.value = !0;
            break;
        }
    }
    const { exposed: v, baseInputForwardedProps: B, fieldUniqueId: C, generalInputProps: L } = E(n);
    return h({ focus: k, ...v }), (e, R) => {
      const g = I("Checkbox");
      return r(), V(N, f(s(B), {
        "label-class": `${t.labelClass} select-none`,
        onLabelClicked: T(u, ["stop", "prevent"])
      }), w({
        labelText: o(() => [
          a(e.$slots, "labelText")
        ]),
        default: o(() => [
          M(g, f(s(L), {
            "input-id": s(C),
            "model-value": i.value,
            indeterminate: d.value,
            binary: "",
            class: { "p-checkbox-checked": i.value, "p-checkbox-indeterminate": d.value },
            readonly: "",
            onClick: u
          }), {
            icon: o((c) => [
              c.checked ? (r(), m("i", D)) : b("", !0),
              c.indeterminate ? (r(), m("i", H)) : b("", !0)
            ]),
            _: 1
          }, 16, ["input-id", "model-value", "indeterminate", "class"])
        ]),
        _: 2
      }, [
        e.$slots.afterLabel ? {
          name: "afterLabel",
          fn: o(() => [
            a(e.$slots, "afterLabel")
          ]),
          key: "0"
        } : void 0,
        e.$slots.afterControl ? {
          name: "afterControl",
          fn: o(() => [
            a(e.$slots, "afterControl")
          ]),
          key: "1"
        } : void 0,
        e.$slots.addon ? {
          name: "addon",
          fn: o(() => [
            a(e.$slots, "addon")
          ]),
          key: "2"
        } : void 0,
        e.$slots.helper || t.helperText ? {
          name: "helper",
          fn: o(() => [
            a(e.$slots, "helper", {}, () => [
              A("div", { innerHTML: t.helperText }, null, 8, P)
            ])
          ]),
          key: "3"
        } : void 0
      ]), 1040, ["label-class"]);
    };
  }
});
export {
  j as default
};
