import { defineComponent as w, useModel as C, ref as $, resolveComponent as x, openBlock as P, createBlock as H, mergeProps as L, unref as r, createSlots as k, withCtx as i, createVNode as q, createElementVNode as s, renderSlot as d, mergeModels as h } from "vue";
import { useHddBaseInputUtils as D } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { get as p } from "lodash-es";
import { useI18n as E } from "vue-i18n";
import { _ as N } from "./BaseInput.vue_vue_type_script_setup_true_lang-C8yTwTDa.js";
const O = ["innerHTML"], R = ["innerHTML"], U = ["aria-labelledby", "data-value"], W = ["innerHTML"], Q = /* @__PURE__ */ w({
  __name: "MultiSelectInput",
  props: /* @__PURE__ */ h({
    options: {},
    optionLabelProperty: { default: "name" },
    optionValueProperty: { default: "id" },
    resetFilterOnHide: { type: Boolean },
    display: { default: "comma" },
    maxSelectedLabels: { default: 5 },
    selectionLimit: {},
    showToggleAll: { type: Boolean, default: !0 },
    optionLabelFormatter: {},
    valueLabelFormatter: {},
    optionAndValueLabelFormatter: {},
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
  setup(t, { expose: g, emit: B }) {
    const l = t, V = B, m = C(t, "modelValue"), c = $();
    function f() {
      l.disabled || c.value.show();
    }
    function v() {
    }
    const { exposed: S, baseInputForwardedProps: T, fieldUniqueId: M, generalInputProps: A } = D(l), { t: b } = E();
    function y(e, a) {
      return e ? l.optionLabelFormatter ? l.optionLabelFormatter(e, a) : l.optionAndValueLabelFormatter ? l.optionAndValueLabelFormatter(e) : p(e, l.optionLabelProperty) ?? "&nbsp;" : "&nbsp;";
    }
    function F(e, a) {
      const u = a ? `<span class="text-muted px-2">${a}</span>` : void 0;
      return !e || e.length === 0 ? u ?? "&nbsp;" : e.length > l.maxSelectedLabels ? `${e.length} ${b("multiSelectItemsSelectedLabel")}` : e.map((o) => {
        const n = l.options.find((I) => I[l.optionValueProperty] === o);
        return n ? l.valueLabelFormatter ? l.valueLabelFormatter(n, l.placeholder) ?? "---" : l.optionAndValueLabelFormatter ? l.optionAndValueLabelFormatter(n) ?? "---" : p(n, l.optionLabelProperty) ?? "---" : "---";
      });
    }
    return g({ focus: f, ...S }), (e, a) => {
      const u = x("MultiSelect");
      return P(), H(N, L(r(T), { onClick: f }), k({
        default: i(() => [
          q(u, L(r(A), {
            ref_key: "inputRef",
            ref: c,
            modelValue: m.value,
            "onUpdate:modelValue": a[0] || (a[0] = (o) => m.value = o),
            "input-id": r(M),
            placeholder: t.placeholder,
            "auto-filter-focus": !0,
            variant: "filled",
            display: t.display,
            "max-selected-labels": t.maxSelectedLabels,
            "selection-limit": t.selectionLimit,
            "show-toggle-all": t.showToggleAll,
            "auto-option-focus": "",
            "reset-filter-on-hide": "",
            filled: "",
            name: t.name,
            "data-name": t.name,
            fluid: "",
            highlightonselect: "",
            filter: "",
            options: t.options,
            "selected-items-label": `{0} ${r(b)("multiSelectItemsSelectedLabel")}`,
            "option-label": t.optionLabelProperty,
            "option-value": t.optionValueProperty,
            class: "w-full!",
            "scroll-height": "18rem",
            onBlur: v,
            onChange: a[1] || (a[1] = (o) => V("change", o))
          }), {
            value: i(({ value: o, placeholder: n }) => [
              d(e.$slots, "value", {
                value: o,
                placeholder: n
              }, () => [
                s("div", {
                  innerHTML: F(o, n)
                }, null, 8, R)
              ])
            ]),
            option: i(({ option: o, index: n }) => [
              s("span", {
                "aria-labelledby": y(o, n),
                "data-value": r(p)(o, t.optionValueProperty)
              }, [
                d(e.$slots, "option", {
                  option: { option: o, index: n }
                }, () => [
                  s("div", {
                    innerHTML: y(o, n)
                  }, null, 8, W)
                ])
              ], 8, U)
            ]),
            _: 3
          }, 16, ["modelValue", "input-id", "placeholder", "display", "max-selected-labels", "selection-limit", "show-toggle-all", "name", "data-name", "options", "selected-items-label", "option-label", "option-value"])
        ]),
        _: 2
      }, [
        e.$slots.addon ? {
          name: "addon",
          fn: i(() => [
            d(e.$slots, "addon")
          ]),
          key: "0"
        } : void 0,
        e.$slots.helper || t.helperText ? {
          name: "helper",
          fn: i(() => [
            d(e.$slots, "helper", {}, () => [
              s("div", { innerHTML: t.helperText }, null, 8, O)
            ])
          ]),
          key: "1"
        } : void 0
      ]), 1040);
    };
  }
});
export {
  Q as _
};
