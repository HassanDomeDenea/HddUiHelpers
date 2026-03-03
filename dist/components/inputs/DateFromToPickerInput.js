import { _ } from "../../DatePickerInput.vue_vue_type_script_setup_true_lang-D6B1ypZM.js";
import { defineComponent as A, useModel as C, computed as m, nextTick as g, ref as x, openBlock as q, createBlock as M, mergeProps as c, unref as l, withCtx as F, createElementVNode as R, createVNode as D, isRef as V, mergeModels as w } from "vue";
import { useHddBaseInputUtils as T } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { pick as E } from "lodash-es";
import r from "moment";
import { _ as P } from "../../BaseInput.vue_vue_type_script_setup_true_lang-Ca5DqyVP.js";
import { useI18n as U } from "vue-i18n";
const Y = { class: "flex items-center gap-6" }, O = /* @__PURE__ */ A({
  __name: "DateFromToPickerInput",
  props: /* @__PURE__ */ w({
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
  emits: /* @__PURE__ */ w(["changed"], ["update:modelValue"]),
  setup(u, { expose: h, emit: I }) {
    const t = u, f = I, { t: i } = U(), n = C(u, "modelValue"), s = m({
      get: () => n.value?.map((e) => e ? r(e).toDate() : null)[0] ?? null,
      set: (e) => {
        const o = n.value ?? [null, null];
        o[0] = e && t.formatAsString ? r(e).format(t.outputDateFormat) : e, n.value = o, g(() => {
          f("changed", o);
        });
      }
    }), p = m({
      get: () => n.value?.map((e) => e ? r(e).toDate() : null)[1] ?? null,
      set: (e) => {
        const o = n.value ?? [null, null];
        o[1] = e && t.formatAsString ? r(e).format(t.outputDateFormat) : e, n.value = o, g(() => {
          f("changed", o);
        });
      }
    }), a = x();
    function y() {
      a.value.$el.focus();
    }
    function L(e) {
      a.value.overlayVisible && (a.value.overlayVisible = !1, e.stopPropagation());
    }
    const { exposed: v, baseInputForwardedProps: k, fieldUniqueId: S } = T(t), b = m(() => ({
      labelSingleLine: !0,
      ...E(t, [
        "placeholder",
        "size",
        "disabled",
        "readonly",
        "error",
        "manualInput",
        "clearable"
      ]),
      placeholder: t.placeholder ?? i("Unspecified"),
      withSuggestionsButtons: !0,
      inline: !0
    }));
    return h({ focus: y, ...v }), (e, o) => {
      const B = _;
      return q(), M(P, c(l(k), {
        "on-local-enter-key-down": u.onLocalEnterKeyDown ?? L,
        onClick: y
      }), {
        default: F(() => [
          R("div", Y, [
            D(B, c({
              ref_key: "inputRef",
              ref: a,
              modelValue: l(s),
              "onUpdate:modelValue": o[0] || (o[0] = (d) => V(s) ? s.value = d : null),
              label: l(i)("From")
            }, l(b), { "unique-id": l(S) }), null, 16, ["modelValue", "label", "unique-id"]),
            D(B, c({
              modelValue: l(p),
              "onUpdate:modelValue": o[1] || (o[1] = (d) => V(p) ? p.value = d : null),
              label: l(i)("To")
            }, l(b)), null, 16, ["modelValue", "label"])
          ])
        ]),
        _: 1
      }, 16, ["on-local-enter-key-down"]);
    };
  }
});
export {
  O as default
};
