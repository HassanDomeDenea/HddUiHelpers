import { defineComponent as w, useModel as C, ref as z, resolveComponent as L, openBlock as R, createBlock as x, mergeProps as s, unref as a, withCtx as I, createVNode as V, mergeModels as u } from "vue";
import { useHddBaseInputUtils as h } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { _ as k } from "../../BaseInput.vue_vue_type_script_setup_true_lang-DGVI56PE.js";
const S = /* @__PURE__ */ w({
  __name: "TextAreaInput",
  props: /* @__PURE__ */ u({
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
    initialRows: {},
    autoResize: { type: Boolean, default: !0 },
    noResize: { type: Boolean }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ u(["keydown", "change"], ["update:modelValue"]),
  setup(e, { expose: d, emit: p }) {
    const m = e, t = p, r = C(e, "modelValue"), n = z();
    function i() {
      n.value.$el.focus();
    }
    function c() {
      n.value.$el.select();
    }
    const { exposed: y, baseInputForwardedProps: f, fieldUniqueId: B, generalInputProps: b } = h(m);
    return d({ focus: i, select: c, ...y }), (v, o) => {
      const g = L("Textarea");
      return R(), x(k, s(a(f), { onClick: i }), {
        default: I(() => [
          V(g, s(a(b), {
            id: a(B),
            ref_key: "inputRef",
            ref: n,
            modelValue: r.value,
            "onUpdate:modelValue": o[0] || (o[0] = (l) => r.value = l),
            rows: e.initialRows,
            placeholder: e.placeholder,
            name: e.name,
            "auto-resize": e.autoResize,
            noresize: e.noResize,
            class: "w-full",
            pt: {
              root: {
                class: e.inputClass,
                style: { resize: e.noResize ? "none" : "" }
              }
            },
            onChange: o[1] || (o[1] = (l) => t("change", l)),
            onKeydown: o[2] || (o[2] = (l) => t("keydown", l))
          }), null, 16, ["id", "modelValue", "rows", "placeholder", "name", "auto-resize", "noresize", "pt"])
        ]),
        _: 1
      }, 16);
    };
  }
});
export {
  S as default
};
