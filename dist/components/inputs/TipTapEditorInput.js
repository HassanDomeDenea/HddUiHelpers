import { defineComponent as y, useModel as B, ref as b, resolveComponent as g, openBlock as C, createBlock as _, mergeProps as L, unref as o, withCtx as I, createVNode as T, mergeModels as V } from "vue";
import { useHddBaseInputUtils as h } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { _ as v } from "../../BaseInput.vue_vue_type_script_setup_true_lang-DGVI56PE.js";
const k = /* @__PURE__ */ y({
  __name: "TipTapEditorInput",
  props: /* @__PURE__ */ V({
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
    const e = l, n = B(l, "modelValue"), a = b();
    function t() {
    }
    const { exposed: d, baseInputForwardedProps: s, fieldUniqueId: u, generalInputProps: r } = h(e), c = computed(() => ({
      readonly: r.value.readonly,
      disabled: r.value.disabled,
      placeholder: e.placeholder,
      ...e.config
    }));
    return p({ focus: t, ...d, inputRef: a }), (w, i) => {
      const f = g("TipTapEditor");
      return C(), _(v, L(o(s), {
        class: "HDD_Quill_Editor",
        onClick: t
      }), {
        default: I(() => [
          T(f, {
            id: o(u),
            ref_key: "inputRef",
            ref: a,
            modelValue: n.value,
            "onUpdate:modelValue": i[0] || (i[0] = (m) => n.value = m),
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
  k as default
};
