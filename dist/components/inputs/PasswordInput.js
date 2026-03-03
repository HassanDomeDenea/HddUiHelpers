import { defineComponent as C, useModel as I, resolveComponent as P, openBlock as S, createBlock as A, mergeProps as c, unref as t, createSlots as V, withCtx as d, createVNode as q, withKeys as y, renderSlot as i, createElementVNode as M, mergeModels as m } from "vue";
import { useHddBaseInputUtils as T, cursorAtStartOfInput as x, cursorAtEndOfInput as N } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { _ as D } from "../../BaseInput.vue_vue_type_script_setup_true_lang-DGVI56PE.js";
const E = ["innerHTML"], O = /* @__PURE__ */ C({
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
    const r = e, a = B, p = I(e, "modelValue"), s = ref();
    function f() {
      s.value.$el.querySelector("input").focus();
    }
    const g = () => x(s.value.$el.querySelector("input")) && a("focusPrevious"), k = () => N(s.value.$el.querySelector("input")) && a("focusNext"), w = computed(() => ({
      root: {
        readonly: r.readonly,
        type: r.type,
        name: r.name
      }
    })), { exposed: v, baseInputForwardedProps: $, fieldUniqueId: u, generalInputProps: h } = T(r);
    return b({ focus: f, ...v }), (n, o) => {
      const L = P("Password");
      return S(), A(D, c(t($), { onLabelClicked: f }), V({
        labelText: d(() => [
          i(n.$slots, "label-text")
        ]),
        default: d(() => [
          q(L, c({ ...t(h), ...e.originalProps }, {
            ref_key: "inputRef",
            ref: s,
            modelValue: p.value,
            "onUpdate:modelValue": o[0] || (o[0] = (l) => p.value = l),
            "input-id": t(u),
            placeholder: e.placeholder,
            class: [e.inputClass],
            "aria-describedby": `${e.error ? `${t(u)}-error` : ""} ${n.$slots.helper || e.helperText ? `${t(u)}-desc` : ""}`,
            pt: t(w),
            hidden: !1,
            feedback: e.feedback,
            variant: e.variant,
            "toggle-mask": e.toggleMask,
            onKeydown: [
              y(g, ["up"]),
              y(k, ["down"]),
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
            i(n.$slots, "addon")
          ]),
          key: "0"
        } : void 0,
        n.$slots.helper || e.helperText ? {
          name: "helper",
          fn: d(() => [
            i(n.$slots, "helper", {}, () => [
              M("div", { innerHTML: e.helperText }, null, 8, E)
            ])
          ]),
          key: "1"
        } : void 0
      ]), 1040);
    };
  }
});
export {
  O as default
};
