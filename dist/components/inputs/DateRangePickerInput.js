import { defineComponent as D, useModel as v, computed as w, ref as I, resolveComponent as V, openBlock as Y, createBlock as C, mergeProps as d, unref as a, withCtx as M, createVNode as L, mergeModels as k } from "vue";
import { useHddBaseInputUtils as x } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import i from "moment";
import { useI18n as _ } from "vue-i18n";
import { _ as A } from "../../BaseInput.vue_vue_type_script_setup_true_lang-C8yTwTDa.js";
const K = /* @__PURE__ */ D({
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
  setup(r, { expose: m }) {
    const c = r, { t: f } = _(), t = v(r, "modelValue"), p = w({
      get: () => t.value?.map((e) => e ? i(e).toDate() : null),
      set: (e) => {
        t.value = e?.map((o) => o ? i(o).format("YYYY-MM-DD") : null);
      }
    }), s = I();
    function u() {
      s.value.$el.focus();
    }
    function y(e) {
      if (e.key === "Enter") {
        const n = e.target.value;
        if (n.split("-").length === 3) {
          const l = i(n);
          l.isValid() && (t.value ? t.value[0] = l.format("YYYY-MM-DD") : t.value = [l.format("YYYY-MM-DD"), null]);
        }
      }
    }
    const { exposed: b, baseInputForwardedProps: B, fieldUniqueId: g, generalInputProps: h } = x(c);
    return m({ focus: u, ...b }), (e, o) => {
      const n = V("DatePicker");
      return Y(), C(A, d(a(B), { onClick: u }), {
        default: M(() => [
          L(n, d(a(h), {
            ref_key: "inputRef",
            ref: s,
            modelValue: p.value,
            "onUpdate:modelValue": o[0] || (o[0] = (l) => p.value = l),
            "input-id": a(g),
            "selection-mode": "range",
            "number-of-months": 2,
            variant: "filled",
            "date-format": "yy-mm-dd",
            "show-button-bar": "",
            class: "w-full",
            "show-icon": "",
            "select-other-months": !0,
            placeholder: r.placeholder ?? a(f)("Choose Date"),
            "manual-input": !0,
            "input-class": "text-center",
            pt: {
              pcInput: {
                root: {
                  class: "dir-ltr min-w-170px",
                  onKeydown: y
                }
              }
            }
          }), null, 16, ["modelValue", "input-id", "placeholder", "pt"])
        ]),
        _: 1
      }, 16);
    };
  }
});
export {
  K as default
};
