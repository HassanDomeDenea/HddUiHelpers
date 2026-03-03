import y from "primevue/toggleswitch";
import { defineComponent as B, useModel as b, ref as g, openBlock as _, createBlock as L, mergeProps as r, unref as l, withCtx as C, createVNode as I, mergeModels as V } from "vue";
import { useHddBaseInputUtils as w } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { _ as h } from "./BaseInput.vue_vue_type_script_setup_true_lang-Ca5DqyVP.js";
const q = /* @__PURE__ */ B({
  __name: "ToggleSwitchInput",
  props: /* @__PURE__ */ V({
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
  emits: ["update:modelValue"],
  setup(n, { expose: i }) {
    const p = n, t = b(n, "modelValue"), o = g();
    function s() {
      o.value.$el.focus();
    }
    const { exposed: u, baseInputForwardedProps: d, fieldUniqueId: m, generalInputProps: c } = w(p);
    return i({ focus: s, ...u }), (v, e) => {
      const f = y;
      return _(), L(h, r(l(d), {
        onLabelClicked: e[1] || (e[1] = (a) => o.value.$el.children[0].click())
      }), {
        default: C(() => [
          I(f, r({
            ref_key: "inputRef",
            ref: o,
            modelValue: t.value,
            "onUpdate:modelValue": e[0] || (e[0] = (a) => t.value = a),
            "input-id": l(m)
          }, l(c)), null, 16, ["modelValue", "input-id"])
        ]),
        _: 1
      }, 16);
    };
  }
});
export {
  q as _
};
