import { defineComponent as L, useModel as C, ref as S, resolveComponent as x, openBlock as A, createBlock as q, mergeProps as m, unref as l, withCtx as M, createElementVNode as T, createVNode as B, isRef as g, mergeModels as D } from "vue";
import { useHddBaseInputUtils as _ } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { pick as F } from "lodash-es";
import r from "moment";
import { _ as P } from "../../BaseInput.vue_vue_type_script_setup_true_lang-DGVI56PE.js";
const R = { class: "flex items-center gap-6" }, N = /* @__PURE__ */ L({
  __name: "DateFromToPickerInput",
  props: /* @__PURE__ */ D({
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
  emits: /* @__PURE__ */ D(["changed"], ["update:modelValue"]),
  setup(u, { expose: V, emit: w }) {
    const t = u, c = w, { t: i } = useI18n(), n = C(u, "modelValue"), s = computed({
      get: () => n.value?.map((e) => e ? r(e).toDate() : null)[0] ?? null,
      set: (e) => {
        const o = n.value ?? [null, null];
        o[0] = e && t.formatAsString ? r(e).format(t.outputDateFormat) : e, n.value = o, nextTick(() => {
          c("changed", o);
        });
      }
    }), p = computed({
      get: () => n.value?.map((e) => e ? r(e).toDate() : null)[1] ?? null,
      set: (e) => {
        const o = n.value ?? [null, null];
        o[1] = e && t.formatAsString ? r(e).format(t.outputDateFormat) : e, n.value = o, nextTick(() => {
          c("changed", o);
        });
      }
    }), a = S();
    function f() {
      a.value.$el.focus();
    }
    function I(e) {
      a.value.overlayVisible && (a.value.overlayVisible = !1, e.stopPropagation());
    }
    const { exposed: h, baseInputForwardedProps: k, fieldUniqueId: v } = _(t), y = computed(() => ({
      labelSingleLine: !0,
      ...F(t, [
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
    return V({ focus: f, ...h }), (e, o) => {
      const b = x("DatePickerInput");
      return A(), q(P, m(l(k), {
        "on-local-enter-key-down": u.onLocalEnterKeyDown ?? I,
        onClick: f
      }), {
        default: M(() => [
          T("div", R, [
            B(b, m({
              ref_key: "inputRef",
              ref: a,
              modelValue: l(s),
              "onUpdate:modelValue": o[0] || (o[0] = (d) => g(s) ? s.value = d : null),
              label: l(i)("From")
            }, l(y), { "unique-id": l(v) }), null, 16, ["modelValue", "label", "unique-id"]),
            B(b, m({
              modelValue: l(p),
              "onUpdate:modelValue": o[1] || (o[1] = (d) => g(p) ? p.value = d : null),
              label: l(i)("To")
            }, l(y)), null, 16, ["modelValue", "label"])
          ])
        ]),
        _: 1
      }, 16, ["on-local-enter-key-down"]);
    };
  }
});
export {
  N as default
};
