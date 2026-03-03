import V from "primevue/keyfilter";
import T from "primevue/inputtext";
import { defineComponent as q, useSlots as z, useModel as D, ref as f, watch as M, computed as N, openBlock as U, createBlock as E, mergeProps as m, unref as t, createSlots as K, withCtx as y, withDirectives as O, createVNode as R, withKeys as b, renderList as F, renderSlot as W, mergeModels as B } from "vue";
import { useHddBaseInputUtils as j, cursorAtStartOfInput as H, cursorAtEndOfInput as G } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { _ as J } from "./BaseInput.vue_vue_type_script_setup_true_lang-Ca5DqyVP.js";
const ee = /* @__PURE__ */ q({
  __name: "TextInput",
  props: /* @__PURE__ */ B({
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
  emits: /* @__PURE__ */ B(["blur", "focus", "keydown", "focusPrevious", "focusNext"], ["update:modelValue"]),
  setup(e, { expose: v, emit: w }) {
    const n = e, g = z(), a = w, r = D(e, "modelValue"), s = f(null);
    n.lazy && M(
      r,
      (i) => {
        s.value = i;
      },
      {
        immediate: !0
      }
    );
    const u = f();
    function p() {
      u.value.$el.focus();
    }
    function I() {
      u.value.$el.select();
    }
    const x = N(() => ({
      root: {
        readonly: n.readonly,
        type: n.type,
        name: n.name
      }
    }));
    function C() {
      n.lazy && (r.value = s.value);
    }
    const { exposed: L, baseInputForwardedProps: h, fieldUniqueId: d, generalInputProps: A } = j(n), $ = () => H(u.value.$el) && a("focusPrevious"), S = () => G(u.value.$el) && a("focusNext");
    return v({ select: I, focus: p, ...L }), (i, l) => {
      const k = T, P = V;
      return U(), E(J, m(t(h), { onLabelClicked: p }), K({
        default: y(() => [
          O(R(k, m({
            id: t(d),
            ref_key: "inputRef",
            ref: u
          }, t(A), {
            "model-value": e.lazy ? t(s) : r.value,
            placeholder: e.placeholder,
            class: [e.inputClass],
            "aria-describedby": `${e.error ? `${t(d)}-error` : ""} ${i.$slots.helper || e.helperText ? `${t(d)}-desc` : ""}`,
            pt: t(x),
            autocomplete: e.autocomplete,
            "onUpdate:modelValue": l[0] || (l[0] = (o) => e.lazy ? s.value = o : r.value = o),
            onBlur: l[1] || (l[1] = (o) => a("blur", o)),
            onFocus: l[2] || (l[2] = (o) => a("focus", o)),
            onChange: C,
            onKeydown: [
              b($, ["up"]),
              b(S, ["down"]),
              l[3] || (l[3] = (o) => a("keydown", o))
            ]
          }), null, 16, ["id", "model-value", "placeholder", "class", "aria-describedby", "pt", "autocomplete"]), [
            [P, e.filterPattern]
          ])
        ]),
        _: 2
      }, [
        F(g, (o, c) => ({
          name: c,
          fn: y(() => [
            W(i.$slots, c, { value: r.value })
          ])
        }))
      ]), 1040);
    };
  }
});
export {
  ee as _
};
