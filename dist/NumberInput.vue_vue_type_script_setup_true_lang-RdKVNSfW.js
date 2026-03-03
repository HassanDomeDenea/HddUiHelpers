import C from "primevue/inputnumber";
import { defineComponent as I, useModel as v, ref as $, computed as h, openBlock as k, createBlock as S, mergeProps as f, unref as a, createSlots as M, withCtx as s, createVNode as U, renderSlot as r, createElementVNode as E, normalizeClass as q, mergeModels as y } from "vue";
import { useHddBaseInputUtils as N } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { _ as T } from "./BaseInput.vue_vue_type_script_setup_true_lang-Ca5DqyVP.js";
const z = ["innerHTML"], G = /* @__PURE__ */ I({
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
    const t = e, u = B, i = v(e, "modelValue"), d = $();
    function p() {
      d.value.$refs.input.$el.focus();
    }
    function b() {
      d.value.$refs.input.$el.select();
    }
    function g(o) {
      u("input", o), t.immediateUpdate && (i.value = o.value);
    }
    const { exposed: x, baseInputForwardedProps: w, fieldUniqueId: L, generalInputProps: V } = N(t), m = h(() => typeof t.textAddon == "function" ? t.textAddon(i.value) : t.textAddon);
    return c({ focus: p, select: b, ...x }), (o, n) => {
      const A = C;
      return k(), S(T, f(a(w), { onClick: p }), M({
        labelText: s(() => [
          r(o.$slots, "label-text")
        ]),
        default: s(() => [
          U(A, f({
            ref_key: "inputRef",
            ref: d,
            modelValue: i.value,
            "onUpdate:modelValue": n[0] || (n[0] = (l) => i.value = l),
            "input-id": a(L),
            "use-grouping": e.useGrouping,
            class: ["w-full", e.inputClass],
            "max-fraction-digits": e.precision,
            locale: "en-US",
            type: "number"
          }, {
            ...a(V),
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
              E("span", {
                class: q({ "text-xs": e.size === "small", "text-lg": e.size === "large" }),
                innerHTML: a(m)
              }, null, 10, z)
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
  G as _
};
