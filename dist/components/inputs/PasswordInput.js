import { defineComponent as C, useModel as I, ref as P, computed as S, resolveComponent as A, openBlock as V, createBlock as q, mergeProps as c, unref as a, createSlots as M, withCtx as d, createVNode as T, withKeys as y, renderSlot as i, createElementVNode as x, mergeModels as m } from "vue";
import { useHddBaseInputUtils as N, cursorAtStartOfInput as D, cursorAtEndOfInput as E } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { _ as U } from "../../BaseInput.vue_vue_type_script_setup_true_lang-C8yTwTDa.js";
const H = ["innerHTML"], F = /* @__PURE__ */ C({
  __name: "PasswordInput",
  props: /* @__PURE__ */ m({
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
  emits: /* @__PURE__ */ m(["blur", "focus", "keydown", "focusPrevious", "focusNext"], ["update:modelValue"]),
  setup(e, { expose: b, emit: B }) {
    const r = e, t = B, p = I(e, "modelValue"), s = P();
    function f() {
      s.value.$el.querySelector("input").focus();
    }
    const g = () => D(s.value.$el.querySelector("input")) && t("focusPrevious"), k = () => E(s.value.$el.querySelector("input")) && t("focusNext"), v = S(() => ({
      root: {
        readonly: r.readonly,
        type: r.type,
        name: r.name
      }
    })), { exposed: w, baseInputForwardedProps: $, fieldUniqueId: u, generalInputProps: h } = N(r);
    return b({ focus: f, ...w }), (n, o) => {
      const L = A("Password");
      return V(), q(U, c(a($), { onLabelClicked: f }), M({
        labelText: d(() => [
          i(n.$slots, "label-text")
        ]),
        default: d(() => [
          T(L, c({ ...a(h), ...e.originalProps }, {
            ref_key: "inputRef",
            ref: s,
            modelValue: p.value,
            "onUpdate:modelValue": o[0] || (o[0] = (l) => p.value = l),
            "input-id": a(u),
            placeholder: e.placeholder,
            class: [e.inputClass],
            "aria-describedby": `${e.error ? `${a(u)}-error` : ""} ${n.$slots.helper || e.helperText ? `${a(u)}-desc` : ""}`,
            pt: v.value,
            hidden: !1,
            feedback: e.feedback,
            variant: e.variant,
            "toggle-mask": e.toggleMask,
            onKeydown: [
              y(g, ["up"]),
              y(k, ["down"]),
              o[3] || (o[3] = (l) => t("keydown", l))
            ],
            onBlur: o[1] || (o[1] = (l) => t("blur", l)),
            onFocus: o[2] || (o[2] = (l) => t("focus", l))
          }), null, 16, ["modelValue", "input-id", "placeholder", "class", "aria-describedby", "pt", "feedback", "variant", "toggle-mask"])
        ]),
        _: 2
      }, [
        n.$slots.addon ? {
          name: "addon",
          fn: d(() => [
            i(n.$slots, "addon")
          ]),
          key: "0"
        } : void 0,
        n.$slots.helper || e.helperText ? {
          name: "helper",
          fn: d(() => [
            i(n.$slots, "helper", {}, () => [
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
  F as default
};
