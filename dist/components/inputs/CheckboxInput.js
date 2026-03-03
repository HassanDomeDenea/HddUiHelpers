import { defineComponent as L, useModel as v, ref as r, resolveComponent as x, openBlock as I, createBlock as V, mergeProps as d, unref as l, withCtx as _, createVNode as w, mergeModels as p } from "vue";
import { useHddBaseInputUtils as A } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { _ as M } from "../../BaseInput.vue_vue_type_script_setup_true_lang-DGVI56PE.js";
const $ = /* @__PURE__ */ L({
  __name: "CheckboxInput",
  props: /* @__PURE__ */ p({
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
    modelValue: { default: r().value },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ p(["change"], ["update:modelValue"]),
  setup(n, { expose: s, emit: u }) {
    const a = n, c = u, t = v(n, "modelValue"), e = r();
    function f() {
      e.value.$el.focus();
    }
    function m() {
      a.disabled || e.value.$el.children[0].click();
    }
    function b(o) {
      c("change", o);
    }
    onMounted(() => {
      e.value.$el.children[0].addEventListener("keydown", (o) => {
        o.key === "Enter" && m();
      });
    });
    const { exposed: y, baseInputForwardedProps: B, fieldUniqueId: g, generalInputProps: h } = A(a);
    return s({ focus: f, ...y }), (o, i) => {
      const C = x("Checkbox");
      return I(), V(M, d(l(B), {
        "floating-label": !1,
        "infield-top-aligned-label": !1
      }), {
        default: _(() => [
          w(C, d({
            ref_key: "inputRef",
            ref: e
          }, l(h), {
            modelValue: t.value,
            "onUpdate:modelValue": i[0] || (i[0] = (k) => t.value = k),
            "input-id": l(g),
            binary: "",
            onChange: b
          }), null, 16, ["modelValue", "input-id"])
        ]),
        _: 1
      }, 16);
    };
  }
});
export {
  $ as default
};
