import h from "primevue/inputotp";
import { defineComponent as w, useModel as I, ref as L, watch as C, openBlock as V, createBlock as k, mergeProps as s, unref as a, withCtx as _, createVNode as q, mergeModels as d } from "vue";
import { useHddBaseInputUtils as x } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { _ as A } from "../../BaseInput.vue_vue_type_script_setup_true_lang-Ca5DqyVP.js";
const D = /* @__PURE__ */ w({
  __name: "OneTimePasswordInput",
  props: /* @__PURE__ */ d({
    length: { default: 4 },
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
  emits: /* @__PURE__ */ d(["keydown", "complete"], ["update:modelValue"]),
  setup(e, { expose: m, emit: c }) {
    const r = e, p = c, l = I(e, "modelValue"), i = L();
    function u() {
      i.value.$el.querySelector("input").focus();
    }
    C(l, (n) => {
      n.length >= r.length && p("complete", n);
    });
    const { exposed: f, baseInputForwardedProps: y, fieldUniqueId: B, generalInputProps: g } = x(r);
    return m({ focus: u, ...f }), (n, o) => {
      const b = h;
      return V(), k(A, s(a(y), { onClick: u }), {
        default: _(() => [
          q(b, s(a(g), {
            ref_key: "inputRef",
            ref: i,
            modelValue: l.value,
            "onUpdate:modelValue": o[0] || (o[0] = (t) => l.value = t),
            "input-id": a(B),
            mask: "",
            autocomplete: "off",
            "integer-only": "",
            length: e.length,
            class: "dir-ltr w-full",
            placeholder: e.placeholder,
            pt: {
              pcInput: {
                root: {
                  autocomplete: "new-password",
                  autofill: "off"
                }
              }
            },
            onKeydown: o[1] || (o[1] = (t) => p("keydown", t))
          }), null, 16, ["modelValue", "input-id", "length", "placeholder"])
        ]),
        _: 1
      }, 16);
    };
  }
});
export {
  D as default
};
