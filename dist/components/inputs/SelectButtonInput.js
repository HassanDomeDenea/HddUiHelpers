import { defineComponent as L, useModel as P, ref as V, resolveComponent as I, openBlock as i, createBlock as v, normalizeProps as S, guardReactiveProps as w, unref as l, withCtx as p, createVNode as x, mergeProps as h, renderSlot as A, createElementVNode as s, normalizeClass as u, createElementBlock as k, createCommentVNode as q, toDisplayString as z, mergeModels as D } from "vue";
import { useHddBaseInputUtils as M } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { get as n } from "lodash-es";
import { _ as E } from "../../BaseInput.vue_vue_type_script_setup_true_lang-DGVI56PE.js";
const T = /* @__PURE__ */ L({
  __name: "SelectButtonInput",
  props: /* @__PURE__ */ D({
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
    const t = e, a = P(e, "modelValue"), c = V(), m = computed(() => t.size === "small" ? "text-sm" : t.size === "large" ? "text-lg" : "");
    function y() {
      c.value.$el.focus();
    }
    const { exposed: f, baseInputForwardedProps: b, fieldUniqueId: N, generalInputProps: B } = M(t);
    return d({ focus: y, ...f }), (g, r) => {
      const C = I("SelectButton");
      return i(), v(E, S(w(l(b))), {
        default: p(() => [
          x(C, h(l(B), {
            modelValue: a.value,
            "onUpdate:modelValue": r[0] || (r[0] = (o) => a.value = o),
            options: e.options,
            "allow-empty": e.clearable,
            "option-label": e.optionLabelProperty,
            "option-value": e.optionValueProperty
          }), {
            option: p(({ option: o }) => [
              A(g.$slots, "option", { option: o }, () => [
                s("div", {
                  class: u(["flex justify-center gap-1", [l(m), e.optionClass]])
                }, [
                  l(n)(o, e.optionIconProperty) ? (i(), k("i", {
                    key: 0,
                    class: u([l(n)(o, e.optionIconProperty), "me-1"])
                  }, null, 2)) : q("", !0),
                  s("span", null, z(l(n)(o, e.optionLabelProperty)), 1)
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
  T as default
};
