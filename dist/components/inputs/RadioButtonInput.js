import { defineComponent as S, useModel as q, useTemplateRef as A, computed as v, resolveComponent as B, openBlock as d, createBlock as M, mergeProps as E, unref as e, withCtx as g, createVNode as m, createElementBlock as y, Fragment as N, renderList as U, createElementVNode as $, normalizeClass as F, toDisplayString as G, createCommentVNode as O, mergeModels as L } from "vue";
import { useHddBaseInputUtils as W } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { startCase as p, set as j, get as o, snakeCase as P } from "lodash-es";
import { RadioButton as H } from "primevue";
import { useI18n as K } from "vue-i18n";
import { _ as J } from "../../BaseInput.vue_vue_type_script_setup_true_lang-C8yTwTDa.js";
const Q = ["data-name", "aria-labelledby", "data-value", "for"], X = {
  key: 0,
  style: { "line-height": "1" }
}, te = /* @__PURE__ */ S({
  __name: "RadioButtonInput",
  props: /* @__PURE__ */ L({
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
  emits: /* @__PURE__ */ L(["change"], ["update:modelValue"]),
  setup(a, { expose: V, emit: C }) {
    const n = a, x = C, r = q(a, "modelValue"), { t: u } = K(), f = A("inputRefs"), k = v(() => f.value?.[0]);
    function b() {
      k.value.$el?.querySelector("input")?.focus();
    }
    function I() {
      n.disabled || b();
    }
    const R = v(() => n.options.map((t) => typeof t == "string" ? {
      [n.optionValueProperty]: t,
      [n.optionLabelProperty]: n.autoTranslateLabels ? u(p(t)) : t
    } : (n.autoTranslateLabels && !t._skip_auto_translation && (t = { ...t }, j(
      t,
      n.optionLabelProperty,
      u(p(o(t, n.optionLabelProperty)))
    )), t)).filter((t) => t.visible !== !1)), { exposed: h, baseInputForwardedProps: z, fieldUniqueId: c, generalInputProps: s } = W(n);
    return V({ focus: b, ...h }), (t, i) => {
      const T = B("Button"), w = B("RadioButtonGroup");
      return d(), M(J, E({ ...e(z) }, {
        "floating-label": !1,
        "infield-top-aligned-label": !1,
        onLabelClicked: I
      }), {
        default: g(() => [
          m(w, {
            modelValue: r.value,
            "onUpdate:modelValue": i[2] || (i[2] = (l) => r.value = l),
            name: a.name,
            invalid: e(s).invalid,
            class: "flex flex-wrap gap-x-5"
          }, {
            default: g(() => [
              (d(!0), y(N, null, U(R.value, (l) => (d(), y("div", {
                key: l,
                class: "flex items-center gap-2"
              }, [
                m(e(H), {
                  ref_for: !0,
                  ref_key: "inputRefs",
                  ref: f,
                  value: e(o)(l, a.optionValueProperty),
                  size: a.size,
                  invalid: e(s).invalid,
                  "input-id": e(c) + "_" + e(P)(e(o)(l, a.optionValueProperty)),
                  readonly: e(s).readonly,
                  disabled: e(s).disabled || e(o)(l, a.optionDisabledProperty),
                  onChange: i[0] || (i[0] = (D) => x("change", D))
                }, null, 8, ["value", "size", "invalid", "input-id", "readonly", "disabled"]),
                $("label", {
                  class: F(["select-none", {
                    "cursor-pointer": r.value !== e(o)(l, a.optionValueProperty) && !(a.disabled || e(o)(l, a.optionDisabledProperty)),
                    "p-block-[var(--p-inputtext-sm-padding-y)] text-sm": a.size === "small",
                    "p-block-[var(--p-inputtext-lg-padding-y)] text-lg": a.size === "large"
                  }]),
                  "data-name": a.name,
                  "aria-labelledby": a.autoTranslateLabels ? e(u)(e(p)(e(o)(l, a.optionLabelProperty))) : e(o)(l, a.optionLabelProperty),
                  "data-value": e(o)(l, a.optionValueProperty),
                  for: e(c) + "_" + e(P)(e(o)(l, a.optionValueProperty))
                }, G(a.autoTranslateLabels ? e(u)(e(p)(e(o)(l, a.optionLabelProperty))) : e(o)(l, a.optionLabelProperty)), 11, Q)
              ]))), 128)),
              a.clearable && r.value !== null && r.value !== void 0 ? (d(), y("div", X, [
                m(T, {
                  icon: "i-mdi-times",
                  severity: "danger",
                  size: "small",
                  text: "",
                  onClick: i[1] || (i[1] = (l) => r.value = null)
                })
              ])) : O("", !0)
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
  te as default
};
