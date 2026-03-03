import { defineComponent as C, useModel as S, computed as p, nextTick as g, ref as A, resolveComponent as x, openBlock as q, createBlock as M, mergeProps as d, unref as n, withCtx as _, createElementVNode as F, createVNode as D, mergeModels as v } from "vue";
import { useHddBaseInputUtils as P } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { pick as T } from "lodash-es";
import r from "moment";
import { useI18n as E } from "vue-i18n";
import { _ as R } from "../../BaseInput.vue_vue_type_script_setup_true_lang-C8yTwTDa.js";
const U = { class: "flex items-center gap-6" }, $ = /* @__PURE__ */ C({
  __name: "DateFromToPickerInput",
  props: /* @__PURE__ */ v({
    manualInput: { type: Boolean, default: !0 },
    clearable: { type: Boolean },
    outputDateFormat: { default: "YYYY-MM-DD HH:mm:ss" },
    placeholderTwo: {},
    formatAsString: { type: Boolean, default: !0 },
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
  emits: /* @__PURE__ */ v(["changed"], ["update:modelValue"]),
  setup(u, { expose: V, emit: w }) {
    const l = u, m = w, { t: i } = E(), t = S(u, "modelValue"), c = p({
      get: () => t.value?.map((e) => e ? r(e).toDate() : null)[0] ?? null,
      set: (e) => {
        const o = t.value ?? [null, null];
        o[0] = e && l.formatAsString ? r(e).format(l.outputDateFormat) : e, t.value = o, g(() => {
          m("changed", o);
        });
      }
    }), f = p({
      get: () => t.value?.map((e) => e ? r(e).toDate() : null)[1] ?? null,
      set: (e) => {
        const o = t.value ?? [null, null];
        o[1] = e && l.formatAsString ? r(e).format(l.outputDateFormat) : e, t.value = o, g(() => {
          m("changed", o);
        });
      }
    }), a = A();
    function y() {
      a.value.$el.focus();
    }
    function I(e) {
      a.value.overlayVisible && (a.value.overlayVisible = !1, e.stopPropagation());
    }
    const { exposed: h, baseInputForwardedProps: L, fieldUniqueId: k } = P(l), b = p(() => ({
      labelSingleLine: !0,
      ...T(l, [
        "placeholder",
        "size",
        "disabled",
        "readonly",
        "error",
        "manualInput",
        "clearable"
      ]),
      placeholder: l.placeholder ?? i("Unspecified"),
      withSuggestionsButtons: !0,
      inline: !0
    }));
    return V({ focus: y, ...h }), (e, o) => {
      const B = x("DatePickerInput");
      return q(), M(R, d(n(L), {
        "on-local-enter-key-down": u.onLocalEnterKeyDown ?? I,
        onClick: y
      }), {
        default: _(() => [
          F("div", U, [
            D(B, d({
              ref_key: "inputRef",
              ref: a,
              modelValue: c.value,
              "onUpdate:modelValue": o[0] || (o[0] = (s) => c.value = s),
              label: n(i)("From")
            }, b.value, { "unique-id": n(k) }), null, 16, ["modelValue", "label", "unique-id"]),
            D(B, d({
              modelValue: f.value,
              "onUpdate:modelValue": o[1] || (o[1] = (s) => f.value = s),
              label: n(i)("To")
            }, b.value), null, 16, ["modelValue", "label"])
          ])
        ]),
        _: 1
      }, 16, ["on-local-enter-key-down"]);
    };
  }
});
export {
  $ as default
};
