import { defineComponent as M, useModel as w, ref as S, computed as F, openBlock as a, createBlock as H, mergeProps as m, unref as i, withCtx as p, createVNode as P, renderSlot as y, createElementBlock as u, createCommentVNode as b, toDisplayString as T, mergeModels as h } from "vue";
import { useHddBaseInputUtils as A } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { isBoolean as D } from "lodash-es";
import q from "primevue/select";
import { _ as x } from "./BaseInput.vue_vue_type_script_setup_true_lang-C8yTwTDa.js";
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
  setup(e, { expose: v, emit: B }) {
    const l = e, L = B, t = w(e, "modelValue"), d = S();
    function c(n = !1) {
      l.disabled || (n ? d.value.show() : d.value.$refs.focusInput.focus());
    }
    const f = F(() => D(l.hasFilter) ? l.hasFilter : l.options.length > 7);
    function g() {
    }
    const { exposed: k, baseInputForwardedProps: V, fieldUniqueId: C, generalInputProps: I } = A(l);
    return v({ focus: c, ...k }), (n, r) => (a(), H(x, m(i(V), { onClick: c }), {
      default: p(() => [
        P(i(q), m(i(I), {
          ref_key: "inputRef",
          ref: d,
          modelValue: t.value,
          "onUpdate:modelValue": r[0] || (r[0] = (o) => t.value = o),
          "input-id": i(C),
          placeholder: e.placeholder,
          filter: f.value,
          "auto-option-focus": "",
          "auto-filter-focus": f.value,
          "reset-filter-on-hide": "",
          checkmark: e.checkmark,
          options: e.options,
          "show-clear": e.clearable,
          "option-label": e.optionLabelProperty,
          "option-disabled": e.optionDisabledProperty,
          "option-value": e.optionValueProperty,
          class: "flex-1",
          "scroll-height": "18rem",
          onBlur: g,
          onChange: r[1] || (r[1] = (o) => L("change", o))
        }), {
          value: p((o) => [
            y(n.$slots, "value", {
              value: { value: o.value, placeholder: o.placeholder }
            }, () => [
              e.valueFormatter ? (a(), u("div", {
                key: 0,
                innerHTML: e.valueFormatter(o.value)
              }, null, 8, $)) : e.formatter ? (a(), u("div", {
                key: 1,
                innerHTML: e.formatter(o.value, "value")
              }, null, 8, E)) : t.value ? (a(), u("div", N, T(e.options.find((s) => s[e.optionValueProperty] === t.value)?.[e.optionLabelProperty] ?? t.value), 1)) : b("", !0)
            ])
          ]),
          option: p(({ option: o, index: s }) => [
            y(n.$slots, "option", {
              option: { option: o, index: s }
            }, () => [
              e.formatter ? (a(), u("div", {
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
