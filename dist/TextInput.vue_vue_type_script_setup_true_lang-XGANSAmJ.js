import { defineComponent as P, useSlots as V, useModel as T, resolveComponent as q, resolveDirective as z, openBlock as D, createBlock as M, mergeProps as f, unref as t, createSlots as N, withCtx as y, withDirectives as U, createVNode as E, withKeys as m, renderList as K, renderSlot as O, mergeModels as b } from "vue";
import { useHddBaseInputUtils as R, cursorAtStartOfInput as F, cursorAtEndOfInput as W } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { _ as j } from "./BaseInput.vue_vue_type_script_setup_true_lang-DGVI56PE.js";
const Q = /* @__PURE__ */ P({
  __name: "TextInput",
  props: /* @__PURE__ */ b({
    type: { default: "text" },
    lazy: { type: Boolean },
    filterPattern: {},
    autocomplete: { default: "off" },
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
    modelValue: { required: !0 },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ b(["blur", "focus", "keydown", "focusPrevious", "focusNext"], ["update:modelValue"]),
  setup(e, { expose: B, emit: v }) {
    const n = e, w = V(), a = v, r = T(e, "modelValue"), s = ref(null);
    n.lazy && watch(
      r,
      (i) => {
        s.value = i;
      },
      {
        immediate: !0
      }
    );
    const u = ref();
    function p() {
      u.value.$el.focus();
    }
    function I() {
      u.value.$el.select();
    }
    const g = computed(() => ({
      root: {
        readonly: n.readonly,
        type: n.type,
        name: n.name
      }
    }));
    function C() {
      n.lazy && (r.value = s.value);
    }
    const { exposed: x, baseInputForwardedProps: L, fieldUniqueId: d, generalInputProps: h } = R(n), A = () => F(u.value.$el) && a("focusPrevious"), $ = () => W(u.value.$el) && a("focusNext");
    return B({ select: I, focus: p, ...x }), (i, l) => {
      const k = q("InputText"), S = z("keyfilter");
      return D(), M(j, f(t(L), { onLabelClicked: p }), N({
        default: y(() => [
          U(E(k, f({
            id: t(d),
            ref_key: "inputRef",
            ref: u
          }, t(h), {
            "model-value": e.lazy ? t(s) : r.value,
            placeholder: e.placeholder,
            class: [e.inputClass],
            "aria-describedby": `${e.error ? `${t(d)}-error` : ""} ${i.$slots.helper || e.helperText ? `${t(d)}-desc` : ""}`,
            pt: t(g),
            autocomplete: e.autocomplete,
            "onUpdate:modelValue": l[0] || (l[0] = (o) => e.lazy ? s.value = o : r.value = o),
            onBlur: l[1] || (l[1] = (o) => a("blur", o)),
            onFocus: l[2] || (l[2] = (o) => a("focus", o)),
            onChange: C,
            onKeydown: [
              m(A, ["up"]),
              m($, ["down"]),
              l[3] || (l[3] = (o) => a("keydown", o))
            ]
          }), null, 16, ["id", "model-value", "placeholder", "class", "aria-describedby", "pt", "autocomplete"]), [
            [S, e.filterPattern]
          ])
        ]),
        _: 2
      }, [
        K(w, (o, c) => ({
          name: c,
          fn: y(() => [
            O(i.$slots, c, { value: r.value })
          ])
        }))
      ]), 1040);
    };
  }
});
export {
  Q as _
};
