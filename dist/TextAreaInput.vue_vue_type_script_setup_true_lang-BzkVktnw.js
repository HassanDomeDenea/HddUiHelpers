import w from "primevue/textarea";
import { defineComponent as z, useModel as C, ref as L, openBlock as R, createBlock as I, mergeProps as s, unref as t, withCtx as V, createVNode as h, mergeModels as u } from "vue";
import { useHddBaseInputUtils as x } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { _ as k } from "./BaseInput.vue_vue_type_script_setup_true_lang-Ca5DqyVP.js";
const T = /* @__PURE__ */ z({
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
    const m = e, a = p, i = C(e, "modelValue"), n = L();
    function r() {
      n.value.$el.focus();
    }
    function c() {
      n.value.$el.select();
    }
    const { exposed: y, baseInputForwardedProps: f, fieldUniqueId: B, generalInputProps: b } = x(m);
    return d({ focus: r, select: c, ...y }), (A, o) => {
      const g = w;
      return R(), I(k, s(t(f), { onClick: r }), {
        default: V(() => [
          h(g, s(t(b), {
            id: t(B),
            ref_key: "inputRef",
            ref: n,
            modelValue: i.value,
            "onUpdate:modelValue": o[0] || (o[0] = (l) => i.value = l),
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
            onChange: o[1] || (o[1] = (l) => a("change", l)),
            onKeydown: o[2] || (o[2] = (l) => a("keydown", l))
          }), null, 16, ["id", "modelValue", "rows", "placeholder", "name", "auto-resize", "noresize", "pt"])
        ]),
        _: 1
      }, 16);
    };
  }
});
export {
  T as _
};
