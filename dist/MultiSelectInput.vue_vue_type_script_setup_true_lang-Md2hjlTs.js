import w from "primevue/multiselect";
import { defineComponent as $, useModel as x, ref as C, openBlock as P, createBlock as H, mergeProps as L, unref as r, createSlots as k, withCtx as i, createVNode as q, createElementVNode as s, renderSlot as d, mergeModels as h } from "vue";
import { useHddBaseInputUtils as D } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { get as p } from "lodash-es";
import { _ as E } from "./BaseInput.vue_vue_type_script_setup_true_lang-Ca5DqyVP.js";
import { useI18n as N } from "vue-i18n";
const O = ["innerHTML"], R = ["innerHTML"], U = ["aria-labelledby", "data-value"], W = ["innerHTML"], X = /* @__PURE__ */ $({
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
    const t = l, V = B, m = x(l, "modelValue"), c = C();
    function f() {
      t.disabled || c.value.show();
    }
    function v() {
    }
    const { exposed: S, baseInputForwardedProps: T, fieldUniqueId: A, generalInputProps: F } = D(t), { t: b } = N();
    function y(e, a) {
      return e ? t.optionLabelFormatter ? t.optionLabelFormatter(e, a) : t.optionAndValueLabelFormatter ? t.optionAndValueLabelFormatter(e) : p(e, t.optionLabelProperty) ?? "&nbsp;" : "&nbsp;";
    }
    function I(e, a) {
      const u = a ? `<span class="text-muted px-2">${a}</span>` : void 0;
      return !e || e.length === 0 ? u ?? "&nbsp;" : e.length > t.maxSelectedLabels ? `${e.length} ${b("multiSelectItemsSelectedLabel")}` : e.map((o) => {
        const n = t.options.find((M) => M[t.optionValueProperty] === o);
        return n ? t.valueLabelFormatter ? t.valueLabelFormatter(n, placeholder) ?? "---" : t.optionAndValueLabelFormatter ? t.optionAndValueLabelFormatter(n) ?? "---" : p(n, t.optionLabelProperty) ?? "---" : "---";
      });
    }
    return g({ focus: f, ...S }), (e, a) => {
      const u = w;
      return P(), H(E, L(r(T), { onClick: f }), k({
        default: i(() => [
          q(u, L(r(F), {
            ref_key: "inputRef",
            ref: c,
            modelValue: m.value,
            "onUpdate:modelValue": a[0] || (a[0] = (o) => m.value = o),
            "input-id": r(A),
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
            "selected-items-label": `{0} ${r(b)("multiSelectItemsSelectedLabel")}`,
            "option-label": l.optionLabelProperty,
            "option-value": l.optionValueProperty,
            class: "!w-full",
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
                  innerHTML: I(o, n)
                }, null, 8, R)
              ])
            ]),
            option: i(({ option: o, index: n }) => [
              s("span", {
                "aria-labelledby": y(o, n),
                "data-value": r(p)(o, l.optionValueProperty)
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
        e.$slots.helper || l.helperText ? {
          name: "helper",
          fn: i(() => [
            d(e.$slots, "helper", {}, () => [
              s("div", { innerHTML: l.helperText }, null, 8, O)
            ])
          ]),
          key: "1"
        } : void 0
      ]), 1040);
    };
  }
});
export {
  X as _
};
