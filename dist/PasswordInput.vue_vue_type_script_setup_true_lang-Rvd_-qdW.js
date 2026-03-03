import I from "primevue/password";
import { defineComponent as S, useModel as A, ref as C, computed as P, openBlock as V, createBlock as q, mergeProps as f, unref as t, createSlots as M, withCtx as d, createVNode as T, withKeys as m, renderSlot as u, createElementVNode as x, mergeModels as y } from "vue";
import { useHddBaseInputUtils as N, cursorAtStartOfInput as D, cursorAtEndOfInput as E } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { _ as U } from "./BaseInput.vue_vue_type_script_setup_true_lang-Ca5DqyVP.js";
const H = ["innerHTML"], W = /* @__PURE__ */ S({
  __name: "PasswordInput",
  props: /* @__PURE__ */ y({
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
    controlComponent: {},
    originalProps: {},
    feedback: { type: Boolean, default: !1 },
    toggleMask: { type: Boolean, default: !0 }
  }, {
    modelValue: { required: !0 },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ y(["blur", "focus", "keydown", "focusPrevious", "focusNext"], ["update:modelValue"]),
  setup(e, { expose: b, emit: B }) {
    const r = e, a = B, p = A(e, "modelValue"), s = C();
    function c() {
      s.value.$el.querySelector("input").focus();
    }
    const g = () => D(s.value.$el.querySelector("input")) && a("focusPrevious"), k = () => E(s.value.$el.querySelector("input")) && a("focusNext"), w = P(() => ({
      root: {
        readonly: r.readonly,
        type: r.type,
        name: r.name
      }
    })), { exposed: v, baseInputForwardedProps: $, fieldUniqueId: i, generalInputProps: h } = N(r);
    return b({ focus: c, ...v }), (n, o) => {
      const L = I;
      return V(), q(U, f(t($), { onLabelClicked: c }), M({
        labelText: d(() => [
          u(n.$slots, "label-text")
        ]),
        default: d(() => [
          T(L, f({ ...t(h), ...e.originalProps }, {
            ref_key: "inputRef",
            ref: s,
            modelValue: p.value,
            "onUpdate:modelValue": o[0] || (o[0] = (l) => p.value = l),
            "input-id": t(i),
            placeholder: e.placeholder,
            class: [e.inputClass],
            "aria-describedby": `${e.error ? `${t(i)}-error` : ""} ${n.$slots.helper || e.helperText ? `${t(i)}-desc` : ""}`,
            pt: t(w),
            hidden: !1,
            feedback: e.feedback,
            variant: e.variant,
            "toggle-mask": e.toggleMask,
            onKeydown: [
              m(g, ["up"]),
              m(k, ["down"]),
              o[3] || (o[3] = (l) => a("keydown", l))
            ],
            onBlur: o[1] || (o[1] = (l) => a("blur", l)),
            onFocus: o[2] || (o[2] = (l) => a("focus", l))
          }), null, 16, ["modelValue", "input-id", "placeholder", "class", "aria-describedby", "pt", "feedback", "variant", "toggle-mask"])
        ]),
        _: 2
      }, [
        n.$slots.addon ? {
          name: "addon",
          fn: d(() => [
            u(n.$slots, "addon")
          ]),
          key: "0"
        } : void 0,
        n.$slots.helper || e.helperText ? {
          name: "helper",
          fn: d(() => [
            u(n.$slots, "helper", {}, () => [
              x("div", { innerHTML: e.helperText }, null, 8, H)
            ])
          ]),
          key: "1"
        } : void 0
      ]), 1040);
    };
  }
});
export {
  W as _
};
