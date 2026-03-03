import { defineComponent as w, useModel as C, ref as $, resolveComponent as x, openBlock as P, createBlock as H, mergeProps as L, unref as i, createSlots as k, withCtx as r, createVNode as q, createElementVNode as s, renderSlot as d, mergeModels as h } from "vue";
import { useHddBaseInputUtils as D } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { get as p } from "lodash-es";
import { _ as E } from "./BaseInput.vue_vue_type_script_setup_true_lang-DGVI56PE.js";
const N = ["innerHTML"], O = ["innerHTML"], R = ["aria-labelledby", "data-value"], U = ["innerHTML"], G = /* @__PURE__ */ w({
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
  setup(l, { expose: g, emit: B }) {
    const t = l, V = B, m = C(l, "modelValue"), c = $();
    function b() {
      t.disabled || c.value.show();
    }
    function v() {
    }
    const { exposed: S, baseInputForwardedProps: T, fieldUniqueId: M, generalInputProps: A } = D(t), { t: f } = useI18n();
    function y(e, a) {
      return e ? t.optionLabelFormatter ? t.optionLabelFormatter(e, a) : t.optionAndValueLabelFormatter ? t.optionAndValueLabelFormatter(e) : p(e, t.optionLabelProperty) ?? "&nbsp;" : "&nbsp;";
    }
    function F(e, a) {
      const u = a ? `<span class="text-muted px-2">${a}</span>` : void 0;
      return !e || e.length === 0 ? u ?? "&nbsp;" : e.length > t.maxSelectedLabels ? `${e.length} ${f("multiSelectItemsSelectedLabel")}` : e.map((o) => {
        const n = t.options.find((I) => I[t.optionValueProperty] === o);
        return n ? t.valueLabelFormatter ? t.valueLabelFormatter(n, placeholder) ?? "---" : t.optionAndValueLabelFormatter ? t.optionAndValueLabelFormatter(n) ?? "---" : p(n, t.optionLabelProperty) ?? "---" : "---";
      });
    }
    return g({ focus: b, ...S }), (e, a) => {
      const u = x("MultiSelect");
      return P(), H(E, L(i(T), { onClick: b }), k({
        default: r(() => [
          q(u, L(i(A), {
            ref_key: "inputRef",
            ref: c,
            modelValue: m.value,
            "onUpdate:modelValue": a[0] || (a[0] = (o) => m.value = o),
            "input-id": i(M),
            placeholder: l.placeholder,
            "auto-filter-focus": !0,
            variant: "filled",
            display: l.display,
            "max-selected-labels": l.maxSelectedLabels,
            "selection-limit": l.selectionLimit,
            "show-toggle-all": l.showToggleAll,
            "auto-option-focus": "",
            "reset-filter-on-hide": "",
            filled: "",
            name: l.name,
            "data-name": l.name,
            fluid: "",
            highlightonselect: "",
            filter: "",
            options: l.options,
            "selected-items-label": `{0} ${i(f)("multiSelectItemsSelectedLabel")}`,
            "option-label": l.optionLabelProperty,
            "option-value": l.optionValueProperty,
            class: "!w-full",
            "scroll-height": "18rem",
            onBlur: v,
            onChange: a[1] || (a[1] = (o) => V("change", o))
          }), {
            value: r(({ value: o, placeholder: n }) => [
              d(e.$slots, "value", {
                value: o,
                placeholder: n
              }, () => [
                s("div", {
                  innerHTML: F(o, n)
                }, null, 8, O)
              ])
            ]),
            option: r(({ option: o, index: n }) => [
              s("span", {
                "aria-labelledby": y(o, n),
                "data-value": i(p)(o, l.optionValueProperty)
              }, [
                d(e.$slots, "option", {
                  option: { option: o, index: n }
                }, () => [
                  s("div", {
                    innerHTML: y(o, n)
                  }, null, 8, U)
                ])
              ], 8, R)
            ]),
            _: 3
          }, 16, ["modelValue", "input-id", "placeholder", "display", "max-selected-labels", "selection-limit", "show-toggle-all", "name", "data-name", "options", "selected-items-label", "option-label", "option-value"])
        ]),
        _: 2
      }, [
        e.$slots.addon ? {
          name: "addon",
          fn: r(() => [
            d(e.$slots, "addon")
          ]),
          key: "0"
        } : void 0,
        e.$slots.helper || l.helperText ? {
          name: "helper",
          fn: r(() => [
            d(e.$slots, "helper", {}, () => [
              s("div", { innerHTML: l.helperText }, null, 8, N)
            ])
          ]),
          key: "1"
        } : void 0
      ]), 1040);
    };
  }
});
export {
  G as _
};
