import { defineComponent as M, useModel as w, ref as F, computed as H, openBlock as n, createBlock as P, mergeProps as m, unref as l, withCtx as p, createVNode as S, renderSlot as y, createElementBlock as u, createCommentVNode as b, toDisplayString as T, mergeModels as h } from "vue";
import { useHddBaseInputUtils as A } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { isBoolean as D } from "lodash-es";
import q from "primevue/select";
import { _ as x } from "./BaseInput.vue_vue_type_script_setup_true_lang-Ca5DqyVP.js";
const $ = ["innerHTML"], E = ["innerHTML"], N = { key: 2 }, R = ["innerHTML"], O = /* @__PURE__ */ M({
  __name: "SelectInput",
  props: /* @__PURE__ */ h({
    options: {},
    optionLabelProperty: { default: "name" },
    optionDisabledProperty: { default: "disabled" },
    optionValueProperty: { default: "id" },
    valueFormatter: {},
    formatter: {},
    clearable: { type: Boolean, default: !1 },
    checkmark: { type: Boolean, default: !0 },
    hasFilter: { type: Boolean, default: void 0 },
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
  emits: /* @__PURE__ */ h(["change"], ["update:modelValue"]),
  setup(e, { expose: B, emit: v }) {
    const t = e, g = v, a = w(e, "modelValue"), d = F();
    function c(r = !1) {
      t.disabled || (r ? d.value.show() : d.value.$refs.focusInput.focus());
    }
    const f = H(() => D(t.hasFilter) ? t.hasFilter : t.options.length > 7);
    function L() {
    }
    const { exposed: k, baseInputForwardedProps: V, fieldUniqueId: C, generalInputProps: I } = A(t);
    return B({ focus: c, ...k }), (r, i) => (n(), P(x, m(l(V), { onClick: c }), {
      default: p(() => [
        S(l(q), m(l(I), {
          ref_key: "inputRef",
          ref: d,
          modelValue: a.value,
          "onUpdate:modelValue": i[0] || (i[0] = (o) => a.value = o),
          "input-id": l(C),
          placeholder: e.placeholder,
          filter: l(f),
          "auto-option-focus": "",
          "auto-filter-focus": l(f),
          "reset-filter-on-hide": "",
          checkmark: e.checkmark,
          options: e.options,
          "show-clear": e.clearable,
          "option-label": e.optionLabelProperty,
          "option-disabled": e.optionDisabledProperty,
          "option-value": e.optionValueProperty,
          class: "flex-1",
          "scroll-height": "18rem",
          onBlur: L,
          onChange: i[1] || (i[1] = (o) => g("change", o))
        }), {
          value: p((o) => [
            y(r.$slots, "value", {
              value: { value: o.value, placeholder: o.placeholder }
            }, () => [
              e.valueFormatter ? (n(), u("div", {
                key: 0,
                innerHTML: e.valueFormatter(o.value)
              }, null, 8, $)) : e.formatter ? (n(), u("div", {
                key: 1,
                innerHTML: e.formatter(o.value, "value")
              }, null, 8, E)) : a.value ? (n(), u("div", N, T(e.options.find((s) => s[e.optionValueProperty] === a.value)?.[e.optionLabelProperty] ?? a.value), 1)) : b("", !0)
            ])
          ]),
          option: p(({ option: o, index: s }) => [
            y(r.$slots, "option", {
              option: { option: o, index: s }
            }, () => [
              e.formatter ? (n(), u("div", {
                key: 0,
                innerHTML: e.formatter(o, "option")
              }, null, 8, R)) : b("", !0)
            ])
          ]),
          _: 3
        }, 16, ["modelValue", "input-id", "placeholder", "filter", "auto-filter-focus", "checkmark", "options", "show-clear", "option-label", "option-disabled", "option-value"])
      ]),
      _: 3
    }, 16));
  }
});
export {
  O as _
};
