import { defineComponent as D, useModel as I, ref as V, resolveComponent as Y, openBlock as v, createBlock as C, mergeProps as d, unref as n, withCtx as m, createVNode as M, isRef as L, mergeModels as k } from "vue";
import { useHddBaseInputUtils as x } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import s from "moment";
import { _ as A } from "../../BaseInput.vue_vue_type_script_setup_true_lang-DGVI56PE.js";
const S = /* @__PURE__ */ D({
  __name: "DateRangePickerInput",
  props: /* @__PURE__ */ k({
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
  setup(r, { expose: c }) {
    const f = r, { t: y } = useI18n(), t = I(r, "modelValue"), i = computed({
      get: () => t.value?.map((e) => e ? s(e).toDate() : null),
      set: (e) => {
        t.value = e?.map((o) => o ? s(o).format("YYYY-MM-DD") : null);
      }
    }), p = V();
    function u() {
      p.value.$el.focus();
    }
    function b(e) {
      if (e.key === "Enter") {
        const a = e.target.value;
        if (a.split("-").length === 3) {
          const l = s(a);
          l.isValid() && (t.value ? t.value[0] = l.format("YYYY-MM-DD") : t.value = [l.format("YYYY-MM-DD"), null]);
        }
      }
    }
    const { exposed: B, baseInputForwardedProps: g, fieldUniqueId: h, generalInputProps: w } = x(f);
    return c({ focus: u, ...B }), (e, o) => {
      const a = Y("DatePicker");
      return v(), C(A, d(n(g), { onClick: u }), {
        default: m(() => [
          M(a, d(n(w), {
            ref_key: "inputRef",
            ref: p,
            modelValue: n(i),
            "onUpdate:modelValue": o[0] || (o[0] = (l) => L(i) ? i.value = l : null),
            "input-id": n(h),
            "selection-mode": "range",
            "number-of-months": 2,
            variant: "filled",
            "date-format": "yy-mm-dd",
            "show-button-bar": "",
            class: "w-full",
            "show-icon": "",
            "select-other-months": !0,
            placeholder: r.placeholder ?? n(y)("Choose Date"),
            "manual-input": !0,
            "input-class": "text-center",
            pt: {
              pcInput: {
                root: {
                  class: "dir-ltr min-w-170px",
                  onKeydown: b
                }
              }
            }
          }), {
            ww: m(() => [...o[1] || (o[1] = [])]),
            _: 1
          }, 16, ["modelValue", "input-id", "placeholder", "pt"])
        ]),
        _: 1
      }, 16);
    };
  }
});
export {
  S as default
};
