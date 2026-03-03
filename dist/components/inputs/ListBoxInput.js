import { defineComponent as k, useModel as C, ref as I, resolveComponent as V, openBlock as v, createBlock as w, mergeProps as u, unref as r, createSlots as x, withCtx as i, createVNode as M, renderSlot as d, createElementVNode as P, mergeModels as m } from "vue";
import { useHddBaseInputUtils as S } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { reduce as A, groupBy as T } from "lodash-es";
import { _ as H } from "../../BaseInput.vue_vue_type_script_setup_true_lang-DGVI56PE.js";
const $ = ["innerHTML"], N = /* @__PURE__ */ k({
  __name: "ListBoxInput",
  props: /* @__PURE__ */ m({
    options: {},
    optionLabelProperty: { default: "name" },
    optionValueProperty: { default: "id" },
    optionGroupLabel: {},
    optionGroupChildren: { default: "items" },
    filter: { type: Boolean },
    multiple: { type: Boolean },
    checkmark: { type: Boolean, default: !0 },
    scrollHeight: {},
    groupItemsBy: {},
    groupsLabels: {},
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
  emits: /* @__PURE__ */ m(["change"], ["update:modelValue"]),
  setup(e, { expose: c, emit: f }) {
    const o = e, y = f, p = C(e, "modelValue"), b = computed(
      () => o.groupItemsBy ? A(
        T(o.options, o.groupItemsBy),
        function(l, t, n) {
          return l.push({
            label: o.groupsLabels?.[n] ?? n,
            items: t
          }), l;
        },
        []
      ) : o.options
    ), h = I();
    function s() {
      o.disabled;
    }
    const { exposed: B, baseInputForwardedProps: g, generalInputProps: L } = S(o);
    return c({ focus: s, ...B }), (l, t) => {
      const n = V("Listbox");
      return v(), w(H, u(r(g), { onClick: s }), x({
        default: i(() => [
          M(n, u(r(L), {
            ref_key: "inputRef",
            ref: h,
            modelValue: p.value,
            "onUpdate:modelValue": t[0] || (t[0] = (a) => p.value = a),
            filter: e.filter,
            "filter-placeholder": e.placeholder,
            multiple: e.multiple,
            "option-label": e.optionLabelProperty,
            "option-value": e.optionValueProperty,
            options: r(b),
            "option-group-children": e.groupItemsBy ? "items" : e.optionGroupChildren,
            "option-group-label": e.groupItemsBy ? "label" : e.optionGroupLabel,
            checkmark: e.checkmark,
            "scroll-height": e.scrollHeight,
            class: "w-full",
            onChange: t[1] || (t[1] = (a) => y("change", a))
          }), null, 16, ["modelValue", "filter", "filter-placeholder", "multiple", "option-label", "option-value", "options", "option-group-children", "option-group-label", "checkmark", "scroll-height"])
        ]),
        _: 2
      }, [
        l.$slots.addon ? {
          name: "addon",
          fn: i(() => [
            d(l.$slots, "addon")
          ]),
          key: "0"
        } : void 0,
        l.$slots.helper || e.helperText ? {
          name: "helper",
          fn: i(() => [
            d(l.$slots, "helper", {}, () => [
              P("div", { innerHTML: e.helperText }, null, 8, $)
            ])
          ]),
          key: "1"
        } : void 0
      ]), 1040);
    };
  }
});
export {
  N as default
};
