import { defineComponent as V, useModel as v, ref as A, resolveComponent as $, openBlock as h, createBlock as k, mergeProps as f, unref as a, createSlots as S, withCtx as s, createVNode as M, renderSlot as r, createElementVNode as U, normalizeClass as E, mergeModels as y } from "vue";
import { useHddBaseInputUtils as N } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { _ as q } from "../../BaseInput.vue_vue_type_script_setup_true_lang-DGVI56PE.js";
const T = ["innerHTML"], P = /* @__PURE__ */ V({
  __name: "NumberInput",
  props: /* @__PURE__ */ y({
    inputClass: {},
    step: { default: 1 },
    precision: { default: 20 },
    min: {},
    max: {},
    useGrouping: { type: Boolean, default: !1 },
    showButtons: { type: Boolean },
    allowEmpty: { type: Boolean },
    immediateUpdate: { type: Boolean },
    textAddon: {},
    suffix: {},
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
    wrapperClass: {},
    controlWrapperClass: {},
    size: {},
    buttonAddon: {},
    controlComponent: {}
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ y(["keydown", "input", "updated"], ["update:modelValue"]),
  setup(e, { expose: c, emit: B }) {
    const t = e, u = B, i = v(e, "modelValue"), d = A();
    function p() {
      d.value.$refs.input.$el.focus();
    }
    function b() {
      d.value.$refs.input.$el.select();
    }
    function g(o) {
      u("input", o), t.immediateUpdate && (i.value = o.value);
    }
    const { exposed: x, baseInputForwardedProps: w, fieldUniqueId: C, generalInputProps: I } = N(t), m = computed(() => typeof t.textAddon == "function" ? t.textAddon(i.value) : t.textAddon);
    return c({ focus: p, select: b, ...x }), (o, n) => {
      const L = $("InputNumber");
      return h(), k(q, f(a(w), { onClick: p }), S({
        labelText: s(() => [
          r(o.$slots, "label-text")
        ]),
        default: s(() => [
          M(L, f({
            ref_key: "inputRef",
            ref: d,
            modelValue: i.value,
            "onUpdate:modelValue": n[0] || (n[0] = (l) => i.value = l),
            "input-id": a(C),
            "use-grouping": e.useGrouping,
            class: ["w-full", e.inputClass],
            "max-fraction-digits": e.precision,
            locale: "en-US",
            type: "number"
          }, {
            ...a(I),
            showButtons: e.showButtons,
            min: e.min,
            suffix: e.suffix,
            max: e.max,
            step: e.step,
            allowEmpty: e.allowEmpty
          }, {
            onKeydown: n[1] || (n[1] = (l) => u("keydown", l)),
            onInput: g,
            "onUpdate:modelValue": n[2] || (n[2] = (l) => u("updated", l))
          }), null, 16, ["modelValue", "input-id", "use-grouping", "max-fraction-digits", "class"])
        ]),
        _: 2
      }, [
        o.$slots.addon || a(m) ? {
          name: "addon",
          fn: s(() => [
            r(o.$slots, "addon", {}, () => [
              U("span", {
                class: E({ "text-xs": e.size === "small", "text-lg": e.size === "large" }),
                innerHTML: a(m)
              }, null, 10, T)
            ])
          ]),
          key: "0"
        } : void 0,
        o.$slots.helper ? {
          name: "helper",
          fn: s(() => [
            r(o.$slots, "helper")
          ]),
          key: "1"
        } : void 0
      ]), 1040);
    };
  }
});
export {
  P as default
};
