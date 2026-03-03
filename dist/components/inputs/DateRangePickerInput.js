import D from "primevue/datepicker";
import { defineComponent as I, useModel as V, computed as Y, ref as M, openBlock as v, createBlock as C, mergeProps as d, unref as n, withCtx as m, createVNode as L, isRef as k, mergeModels as x } from "vue";
import { useHddBaseInputUtils as A } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import p from "moment";
import { _ as P } from "../../BaseInput.vue_vue_type_script_setup_true_lang-Ca5DqyVP.js";
import { useI18n as _ } from "vue-i18n";
const N = /* @__PURE__ */ I({
  __name: "DateRangePickerInput",
  props: /* @__PURE__ */ x({
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
    const f = r, { t: y } = _(), t = V(r, "modelValue"), i = Y({
      get: () => t.value?.map((e) => e ? p(e).toDate() : null),
      set: (e) => {
        t.value = e?.map((o) => o ? p(o).format("YYYY-MM-DD") : null);
      }
    }), s = M();
    function u() {
      s.value.$el.focus();
    }
    function b(e) {
      if (e.key === "Enter") {
        const a = e.target.value;
        if (a.split("-").length === 3) {
          const l = p(a);
          l.isValid() && (t.value ? t.value[0] = l.format("YYYY-MM-DD") : t.value = [l.format("YYYY-MM-DD"), null]);
        }
      }
    }
    const { exposed: B, baseInputForwardedProps: g, fieldUniqueId: h, generalInputProps: w } = A(f);
    return c({ focus: u, ...B }), (e, o) => {
      const a = D;
      return v(), C(P, d(n(g), { onClick: u }), {
        default: m(() => [
          L(a, d(n(w), {
            ref_key: "inputRef",
            ref: s,
            modelValue: n(i),
            "onUpdate:modelValue": o[0] || (o[0] = (l) => k(i) ? i.value = l : null),
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
  N as default
};
