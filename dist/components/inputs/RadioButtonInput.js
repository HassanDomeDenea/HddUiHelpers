import { defineComponent as D, useModel as S, resolveComponent as B, openBlock as s, createBlock as q, mergeProps as A, unref as e, withCtx as g, createVNode as m, createElementBlock as y, Fragment as M, renderList as E, createElementVNode as N, normalizeClass as U, toDisplayString as $, createCommentVNode as F, mergeModels as v } from "vue";
import { useHddBaseInputUtils as G } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { startCase as p, set as O, get as o, snakeCase as L } from "lodash-es";
import { RadioButton as W } from "primevue";
import { _ as j } from "../../BaseInput.vue_vue_type_script_setup_true_lang-DGVI56PE.js";
const H = ["data-name", "aria-labelledby", "data-value", "for"], K = {
  key: 0,
  style: { "line-height": "1" }
}, _ = /* @__PURE__ */ D({
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
    const n = a, C = V, r = S(a, "modelValue"), { t: u } = useI18n(), f = useTemplateRef("inputRefs"), x = computed(() => f.value?.[0]);
    function b() {
      x.value.$el?.querySelector("input")?.focus();
    }
    function k() {
      n.disabled || b();
    }
    const I = computed(() => n.options.map((t) => typeof t == "string" ? {
      [n.optionValueProperty]: t,
      [n.optionLabelProperty]: n.autoTranslateLabels ? u(p(t)) : t
    } : (n.autoTranslateLabels && !t._skip_auto_translation && (t = { ...t }, O(
      t,
      n.optionLabelProperty,
      u(p(o(t, n.optionLabelProperty)))
    )), t)).filter((t) => t.visible !== !1)), { exposed: R, baseInputForwardedProps: h, fieldUniqueId: c, generalInputProps: d } = G(n);
    return P({ focus: b, ...R }), (t, i) => {
      const z = B("Button"), T = B("RadioButtonGroup");
      return s(), q(j, A({ ...e(h) }, {
        "floating-label": !1,
        "infield-top-aligned-label": !1,
        onLabelClicked: k
      }), {
        default: g(() => [
          m(T, {
            modelValue: r.value,
            "onUpdate:modelValue": i[2] || (i[2] = (l) => r.value = l),
            name: a.name,
            invalid: e(d).invalid,
            class: "flex flex-wrap gap-x-5"
          }, {
            default: g(() => [
              (s(!0), y(M, null, E(e(I), (l) => (s(), y("div", {
                key: l,
                class: "flex items-center gap-2"
              }, [
                m(e(W), {
                  ref_for: !0,
                  ref_key: "inputRefs",
                  ref: f,
                  value: e(o)(l, a.optionValueProperty),
                  size: a.size,
                  invalid: e(d).invalid,
                  "input-id": e(c) + "_" + e(L)(e(o)(l, a.optionValueProperty)),
                  readonly: e(d).readonly,
                  disabled: e(d).disabled || e(o)(l, a.optionDisabledProperty),
                  onChange: i[0] || (i[0] = (w) => C("change", w))
                }, null, 8, ["value", "size", "invalid", "input-id", "readonly", "disabled"]),
                N("label", {
                  class: U(["select-none", {
                    "cursor-pointer": r.value !== e(o)(l, a.optionValueProperty) && !(a.disabled || e(o)(l, a.optionDisabledProperty)),
                    "p-block-[var(--p-inputtext-sm-padding-y)] text-sm": a.size === "small",
                    "p-block-[var(--p-inputtext-lg-padding-y)] text-lg": a.size === "large"
                  }]),
                  "data-name": a.name,
                  "aria-labelledby": a.autoTranslateLabels ? e(u)(e(p)(e(o)(l, a.optionLabelProperty))) : e(o)(l, a.optionLabelProperty),
                  "data-value": e(o)(l, a.optionValueProperty),
                  for: e(c) + "_" + e(L)(e(o)(l, a.optionValueProperty))
                }, $(a.autoTranslateLabels ? e(u)(e(p)(e(o)(l, a.optionLabelProperty))) : e(o)(l, a.optionLabelProperty)), 11, H)
              ]))), 128)),
              a.clearable && r.value !== null && r.value !== void 0 ? (s(), y("div", K, [
                m(z, {
                  icon: "i-mdi-times",
                  severity: "danger",
                  size: "small",
                  text: "",
                  onClick: i[1] || (i[1] = (l) => r.value = null)
                })
              ])) : F("", !0)
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
  _ as default
};
