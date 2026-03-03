import { _ as y } from "./TipTapEditor.vue_vue_type_script_setup_true_lang-Bqv1vRCL.js";
import { defineComponent as B, useModel as b, ref as g, computed as _, openBlock as C, createBlock as L, mergeProps as I, unref as o, withCtx as V, createVNode as h, mergeModels as w } from "vue";
import { useHddBaseInputUtils as T } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { _ as v } from "./BaseInput.vue_vue_type_script_setup_true_lang-Ca5DqyVP.js";
const E = /* @__PURE__ */ B({
  __name: "TipTapEditorInput",
  props: /* @__PURE__ */ w({
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
    config: {}
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(l, { expose: p }) {
    const e = l, n = b(l, "modelValue"), a = g();
    function t() {
    }
    const { exposed: s, baseInputForwardedProps: d, fieldUniqueId: u, generalInputProps: r } = T(e), c = _(() => ({
      readonly: r.value.readonly,
      disabled: r.value.disabled,
      placeholder: e.placeholder,
      ...e.config
    }));
    return p({ focus: t, ...s, inputRef: a }), (x, i) => {
      const m = y;
      return C(), L(v, I(o(d), {
        class: "HDD_Quill_Editor",
        onClick: t
      }), {
        default: V(() => [
          h(m, {
            id: o(u),
            ref_key: "inputRef",
            ref: a,
            modelValue: n.value,
            "onUpdate:modelValue": i[0] || (i[0] = (f) => n.value = f),
            class: "w-full",
            config: o(c)
          }, null, 8, ["id", "modelValue", "config"])
        ]),
        _: 1
      }, 16);
    };
  }
});
export {
  E as _
};
