import P from "primevue/selectbutton";
import { defineComponent as C, useModel as V, ref as I, computed as v, openBlock as i, createBlock as S, normalizeProps as w, guardReactiveProps as x, unref as l, withCtx as p, createVNode as h, mergeProps as A, renderSlot as k, createElementVNode as s, normalizeClass as u, createElementBlock as q, createCommentVNode as z, toDisplayString as D, mergeModels as M } from "vue";
import { useHddBaseInputUtils as E } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { get as n } from "lodash-es";
import { _ as N } from "./BaseInput.vue_vue_type_script_setup_true_lang-Ca5DqyVP.js";
const F = /* @__PURE__ */ C({
  __name: "SelectButtonInput",
  props: /* @__PURE__ */ M({
    options: {},
    optionDisabledProperty: { default: "disabled" },
    optionIconProperty: { default: "icon" },
    optionLabelProperty: { default: "name" },
    optionValueProperty: { default: "id" },
    clearable: { type: Boolean, default: !1 },
    optionClass: {},
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
    controlBeforeLabel: { type: Boolean },
    labelSingleLine: { type: Boolean },
    hideLabelDoubleDots: { type: Boolean },
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
  setup(e, { expose: d }) {
    const t = e, a = V(e, "modelValue"), m = I(), c = v(() => t.size === "small" ? "text-sm" : t.size === "large" ? "text-lg" : "");
    function y() {
      m.value.$el.focus();
    }
    const { exposed: f, baseInputForwardedProps: b, fieldUniqueId: R, generalInputProps: B } = E(t);
    return d({ focus: y, ...f }), (g, r) => {
      const L = P;
      return i(), S(N, w(x(l(b))), {
        default: p(() => [
          h(L, A(l(B), {
            modelValue: a.value,
            "onUpdate:modelValue": r[0] || (r[0] = (o) => a.value = o),
            options: e.options,
            "allow-empty": e.clearable,
            "option-label": e.optionLabelProperty,
            "option-value": e.optionValueProperty
          }), {
            option: p(({ option: o }) => [
              k(g.$slots, "option", { option: o }, () => [
                s("div", {
                  class: u(["flex justify-center gap-1", [l(c), e.optionClass]])
                }, [
                  l(n)(o, e.optionIconProperty) ? (i(), q("i", {
                    key: 0,
                    class: u([l(n)(o, e.optionIconProperty), "me-1"])
                  }, null, 2)) : z("", !0),
                  s("span", null, D(l(n)(o, e.optionLabelProperty)), 1)
                ], 2)
              ])
            ]),
            _: 3
          }, 16, ["modelValue", "options", "allow-empty", "option-label", "option-value"])
        ]),
        _: 3
      }, 16);
    };
  }
});
export {
  F as _
};
