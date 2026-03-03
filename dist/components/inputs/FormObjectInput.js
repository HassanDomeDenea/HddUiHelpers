import { defineComponent as m, useModel as c, ref as y, openBlock as b, createBlock as B, mergeProps as a, unref as r, withCtx as g, createVNode as L, mergeModels as C } from "vue";
import V from "HddUiHelpers/components/FormWrapper/HddForm.vue";
import { useHddBaseInputUtils as w } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { _ as I } from "../../BaseInput.vue_vue_type_script_setup_true_lang-DGVI56PE.js";
const S = /* @__PURE__ */ m({
  __name: "FormObjectInput",
  props: /* @__PURE__ */ C({
    autocomplete: {},
    icon: {},
    uniqueId: {},
    modelValue: {},
    label: {},
    labelMinWidth: {},
    variant: {},
    iconAsAddon: { type: Boolean },
    onLocalEnterKeyDown: { type: Function },
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
    fields: {},
    binds: {}
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e, { expose: s }) {
    const i = e, o = c(e, "modelValue"), l = y();
    function n() {
    }
    const { exposed: p, baseInputForwardedProps: d, generalInputProps: u } = w(i);
    return s({ focus: n, ...p, inputRef: l }), (h, t) => (b(), B(I, a(r(d), { onClick: n }), {
      default: g(() => [
        L(V, a({
          ref_key: "inputRef",
          ref: l,
          modelValue: o.value,
          "onUpdate:modelValue": t[0] || (t[0] = (f) => o.value = f)
        }, { ...r(u), ...e.binds }, {
          fields: e.fields,
          "with-footer-buttons": !1,
          "auto-focus-first-on-mount": !1,
          class: "w-full"
        }), null, 16, ["modelValue", "fields"])
      ]),
      _: 1
    }, 16));
  }
});
export {
  S as default
};
