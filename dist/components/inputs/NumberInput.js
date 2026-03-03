import { defineComponent as L, useModel as V, ref as A, computed as $, resolveComponent as h, openBlock as k, createBlock as S, mergeProps as f, unref as d, createSlots as M, withCtx as i, createVNode as U, renderSlot as r, createElementVNode as E, normalizeClass as N, mergeModels as y } from "vue";
import { useHddBaseInputUtils as q } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { _ as T } from "../../BaseInput.vue_vue_type_script_setup_true_lang-C8yTwTDa.js";
const z = ["innerHTML"], R = /* @__PURE__ */ L({
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
    const t = e, s = B, a = V(e, "modelValue"), u = A();
    function p() {
      u.value.$refs.input.$el.focus();
    }
    function b() {
      u.value.$refs.input.$el.select();
    }
    function g(o) {
      s("input", o), t.immediateUpdate && (a.value = o.value);
    }
    const { exposed: x, baseInputForwardedProps: w, fieldUniqueId: v, generalInputProps: C } = q(t), m = $(() => typeof t.textAddon == "function" ? t.textAddon(a.value) : t.textAddon);
    return c({ focus: p, select: b, ...x }), (o, n) => {
      const I = h("InputNumber");
      return k(), S(T, f(d(w), { onClick: p }), M({
        labelText: i(() => [
          r(o.$slots, "label-text")
        ]),
        default: i(() => [
          U(I, f({
            ref_key: "inputRef",
            ref: u,
            modelValue: a.value,
            "onUpdate:modelValue": n[0] || (n[0] = (l) => a.value = l),
            "input-id": d(v),
            "use-grouping": e.useGrouping,
            class: ["w-full", e.inputClass],
            "max-fraction-digits": e.precision,
            locale: "en-US",
            type: "number"
          }, {
            ...d(C),
            showButtons: e.showButtons,
            min: e.min,
            suffix: e.suffix,
            max: e.max,
            step: e.step,
            allowEmpty: e.allowEmpty
          }, {
            onKeydown: n[1] || (n[1] = (l) => s("keydown", l)),
            onInput: g,
            "onUpdate:modelValue": n[2] || (n[2] = (l) => s("updated", l))
          }), null, 16, ["modelValue", "input-id", "use-grouping", "max-fraction-digits", "class"])
        ]),
        _: 2
      }, [
        o.$slots.addon || m.value ? {
          name: "addon",
          fn: i(() => [
            r(o.$slots, "addon", {}, () => [
              E("span", {
                class: N({ "text-xs": e.size === "small", "text-lg": e.size === "large" }),
                innerHTML: m.value
              }, null, 10, z)
            ])
          ]),
          key: "0"
        } : void 0,
        o.$slots.helper ? {
          name: "helper",
          fn: i(() => [
            r(o.$slots, "helper")
          ]),
          key: "1"
        } : void 0
      ]), 1040);
    };
  }
});
export {
  R as default
};
