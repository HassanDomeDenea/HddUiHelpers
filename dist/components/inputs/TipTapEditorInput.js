import { defineComponent as y, useModel as B, ref as b, computed as g, resolveComponent as C, openBlock as _, createBlock as L, mergeProps as I, unref as i, withCtx as T, createVNode as V, mergeModels as h } from "vue";
import { useHddBaseInputUtils as v } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { _ as w } from "../../BaseInput.vue_vue_type_script_setup_true_lang-C8yTwTDa.js";
const q = /* @__PURE__ */ y({
  __name: "TipTapEditorInput",
  props: /* @__PURE__ */ h({
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
  setup(o, { expose: p }) {
    const e = o, l = B(o, "modelValue"), n = b();
    function a() {
    }
    const { exposed: d, baseInputForwardedProps: s, fieldUniqueId: u, generalInputProps: t } = v(e), c = g(() => ({
      readonly: t.value.readonly,
      disabled: t.value.disabled,
      placeholder: e.placeholder,
      ...e.config
    }));
    return p({ focus: a, ...d, inputRef: n }), (x, r) => {
      const f = C("TipTapEditor");
      return _(), L(w, I(i(s), {
        class: "HDD_Quill_Editor",
        onClick: a
      }), {
        default: T(() => [
          V(f, {
            id: i(u),
            ref_key: "inputRef",
            ref: n,
            modelValue: l.value,
            "onUpdate:modelValue": r[0] || (r[0] = (m) => l.value = m),
            class: "w-full",
            config: c.value
          }, null, 8, ["id", "modelValue", "config"])
        ]),
        _: 1
      }, 16);
    };
  }
});
export {
  q as default
};
