import { defineComponent as M, useModel as w, ref as S, openBlock as n, createBlock as F, mergeProps as m, unref as l, withCtx as p, createVNode as H, renderSlot as y, createElementBlock as u, createCommentVNode as b, toDisplayString as P, mergeModels as h } from "vue";
import { useHddBaseInputUtils as T } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { isBoolean as A } from "lodash-es";
import D from "primevue/select";
import { _ as q } from "./BaseInput.vue_vue_type_script_setup_true_lang-DGVI56PE.js";
const x = ["innerHTML"], $ = ["innerHTML"], E = { key: 2 }, N = ["innerHTML"], K = /* @__PURE__ */ M({
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
    const t = e, L = v, a = w(e, "modelValue"), d = S();
    function c(r = !1) {
      t.disabled || (r ? d.value.show() : d.value.$refs.focusInput.focus());
    }
    const f = computed(() => A(t.hasFilter) ? t.hasFilter : t.options.length > 7);
    function g() {
    }
    const { exposed: k, baseInputForwardedProps: V, fieldUniqueId: C, generalInputProps: I } = T(t);
    return B({ focus: c, ...k }), (r, i) => (n(), F(q, m(l(V), { onClick: c }), {
      default: p(() => [
        H(l(D), m(l(I), {
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
          onBlur: g,
          onChange: i[1] || (i[1] = (o) => L("change", o))
        }), {
          value: p((o) => [
            y(r.$slots, "value", {
              value: { value: o.value, placeholder: o.placeholder }
            }, () => [
              e.valueFormatter ? (n(), u("div", {
                key: 0,
                innerHTML: e.valueFormatter(o.value)
              }, null, 8, x)) : e.formatter ? (n(), u("div", {
                key: 1,
                innerHTML: e.formatter(o.value, "value")
              }, null, 8, $)) : a.value ? (n(), u("div", E, P(e.options.find((s) => s[e.optionValueProperty] === a.value)?.[e.optionLabelProperty] ?? a.value), 1)) : b("", !0)
            ])
          ]),
          option: p(({ option: o, index: s }) => [
            y(r.$slots, "option", {
              option: { option: o, index: s }
            }, () => [
              e.formatter ? (n(), u("div", {
                key: 0,
                innerHTML: e.formatter(o, "option")
              }, null, 8, N)) : b("", !0)
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
  K as _
};
