import { defineComponent as V, useSlots as T, useModel as q, ref as f, watch as z, computed as D, resolveComponent as M, resolveDirective as N, openBlock as U, createBlock as E, mergeProps as y, unref as u, createSlots as K, withCtx as m, withDirectives as O, createVNode as R, withKeys as b, renderList as F, renderSlot as W, mergeModels as v } from "vue";
import { useHddBaseInputUtils as j, cursorAtStartOfInput as H, cursorAtEndOfInput as G } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { _ as J } from "../../BaseInput.vue_vue_type_script_setup_true_lang-C8yTwTDa.js";
const Z = /* @__PURE__ */ V({
  __name: "TextInput",
  props: /* @__PURE__ */ v({
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
  emits: /* @__PURE__ */ v(["blur", "focus", "keydown", "focusPrevious", "focusNext"], ["update:modelValue"]),
  setup(e, { expose: B, emit: w }) {
    const t = e, I = T(), n = w, a = q(e, "modelValue"), s = f(null);
    t.lazy && z(
      a,
      (i) => {
        s.value = i;
      },
      {
        immediate: !0
      }
    );
    const r = f();
    function p() {
      r.value.$el.focus();
    }
    function g() {
      r.value.$el.select();
    }
    const C = D(() => ({
      root: {
        readonly: t.readonly,
        type: t.type,
        name: t.name
      }
    }));
    function x() {
      t.lazy && (a.value = s.value);
    }
    const { exposed: L, baseInputForwardedProps: h, fieldUniqueId: d, generalInputProps: A } = j(t), $ = () => H(r.value.$el) && n("focusPrevious"), k = () => G(r.value.$el) && n("focusNext");
    return B({ select: g, focus: p, ...L }), (i, l) => {
      const S = M("InputText"), P = N("keyfilter");
      return U(), E(J, y(u(h), { onLabelClicked: p }), K({
        default: m(() => [
          O(R(S, y({
            id: u(d),
            ref_key: "inputRef",
            ref: r
          }, u(A), {
            "model-value": e.lazy ? s.value : a.value,
            placeholder: e.placeholder,
            class: [e.inputClass],
            "aria-describedby": `${e.error ? `${u(d)}-error` : ""} ${i.$slots.helper || e.helperText ? `${u(d)}-desc` : ""}`,
            pt: C.value,
            autocomplete: e.autocomplete,
            "onUpdate:modelValue": l[0] || (l[0] = (o) => e.lazy ? s.value = o : a.value = o),
            onBlur: l[1] || (l[1] = (o) => n("blur", o)),
            onFocus: l[2] || (l[2] = (o) => n("focus", o)),
            onChange: x,
            onKeydown: [
              b($, ["up"]),
              b(k, ["down"]),
              l[3] || (l[3] = (o) => n("keydown", o))
            ]
          }), null, 16, ["id", "model-value", "placeholder", "class", "aria-describedby", "pt", "autocomplete"]), [
            [P, e.filterPattern]
          ])
        ]),
        _: 2
      }, [
        F(I, (o, c) => ({
          name: c,
          fn: m(() => [
            W(i.$slots, c, { value: a.value })
          ])
        }))
      ]), 1040);
    };
  }
});
export {
  Z as default
};
