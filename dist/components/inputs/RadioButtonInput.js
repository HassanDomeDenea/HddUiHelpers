import D from "primevue/radiobuttongroup";
import S from "primevue/button";
import { defineComponent as q, useModel as A, useTemplateRef as M, computed as g, openBlock as d, createBlock as E, mergeProps as N, unref as e, withCtx as B, createVNode as m, createElementBlock as f, Fragment as U, renderList as $, createElementVNode as F, normalizeClass as O, toDisplayString as W, createCommentVNode as j, mergeModels as v } from "vue";
import { useHddBaseInputUtils as G } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { startCase as p, set as H, get as o, snakeCase as L } from "lodash-es";
import { RadioButton as K } from "primevue";
import { _ as J } from "../../BaseInput.vue_vue_type_script_setup_true_lang-Ca5DqyVP.js";
import { useI18n as Q } from "vue-i18n";
const X = ["data-name", "aria-labelledby", "data-value", "for"], Y = {
  key: 0,
  style: { "line-height": "1" }
}, re = /* @__PURE__ */ q({
  __name: "RadioButtonInput",
  props: /* @__PURE__ */ v({
    options: {},
    optionLabelProperty: { default: "name" },
    optionDisabledProperty: { default: "disabled" },
    optionValueProperty: { default: "id" },
    formatter: {},
    clearable: { type: Boolean, default: !1 },
    autoTranslateLabels: { type: Boolean },
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
    modelValue: { default: null },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ v(["change"], ["update:modelValue"]),
  setup(a, { expose: P, emit: V }) {
    const n = a, x = V, r = A(a, "modelValue"), { t: s } = Q(), y = M("inputRefs"), C = g(() => y.value?.[0]);
    function b() {
      C.value.$el?.querySelector("input")?.focus();
    }
    function k() {
      n.disabled || b();
    }
    const I = g(() => n.options.map((t) => typeof t == "string" ? {
      [n.optionValueProperty]: t,
      [n.optionLabelProperty]: n.autoTranslateLabels ? s(p(t)) : t
    } : (n.autoTranslateLabels && !t._skip_auto_translation && (t = { ...t }, H(
      t,
      n.optionLabelProperty,
      s(p(o(t, n.optionLabelProperty)))
    )), t)).filter((t) => t.visible !== !1)), { exposed: h, baseInputForwardedProps: R, fieldUniqueId: c, generalInputProps: u } = G(n);
    return P({ focus: b, ...h }), (t, i) => {
      const z = S, T = D;
      return d(), E(J, N({ ...e(R) }, {
        "floating-label": !1,
        "infield-top-aligned-label": !1,
        onLabelClicked: k
      }), {
        default: B(() => [
          m(T, {
            modelValue: r.value,
            "onUpdate:modelValue": i[2] || (i[2] = (l) => r.value = l),
            name: a.name,
            invalid: e(u).invalid,
            class: "flex flex-wrap gap-x-5"
          }, {
            default: B(() => [
              (d(!0), f(U, null, $(e(I), (l) => (d(), f("div", {
                key: l,
                class: "flex items-center gap-2"
              }, [
                m(e(K), {
                  ref_for: !0,
                  ref_key: "inputRefs",
                  ref: y,
                  value: e(o)(l, a.optionValueProperty),
                  size: a.size,
                  invalid: e(u).invalid,
                  "input-id": e(c) + "_" + e(L)(e(o)(l, a.optionValueProperty)),
                  readonly: e(u).readonly,
                  disabled: e(u).disabled || e(o)(l, a.optionDisabledProperty),
                  onChange: i[0] || (i[0] = (w) => x("change", w))
                }, null, 8, ["value", "size", "invalid", "input-id", "readonly", "disabled"]),
                F("label", {
                  class: O(["select-none", {
                    "cursor-pointer": r.value !== e(o)(l, a.optionValueProperty) && !(a.disabled || e(o)(l, a.optionDisabledProperty)),
                    "p-block-[var(--p-inputtext-sm-padding-y)] text-sm": a.size === "small",
                    "p-block-[var(--p-inputtext-lg-padding-y)] text-lg": a.size === "large"
                  }]),
                  "data-name": a.name,
                  "aria-labelledby": a.autoTranslateLabels ? e(s)(e(p)(e(o)(l, a.optionLabelProperty))) : e(o)(l, a.optionLabelProperty),
                  "data-value": e(o)(l, a.optionValueProperty),
                  for: e(c) + "_" + e(L)(e(o)(l, a.optionValueProperty))
                }, W(a.autoTranslateLabels ? e(s)(e(p)(e(o)(l, a.optionLabelProperty))) : e(o)(l, a.optionLabelProperty)), 11, X)
              ]))), 128)),
              a.clearable && r.value !== null && r.value !== void 0 ? (d(), f("div", Y, [
                m(z, {
                  icon: "i-mdi-times",
                  severity: "danger",
                  size: "small",
                  text: "",
                  onClick: i[1] || (i[1] = (l) => r.value = null)
                })
              ])) : j("", !0)
            ]),
            _: 1
          }, 8, ["modelValue", "name", "invalid"])
        ]),
        _: 1
      }, 16);
    };
  }
});
export {
  re as default
};
