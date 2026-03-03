import { defineComponent as g, useModel as $, ref as x, resolveComponent as S, openBlock as s, createBlock as I, mergeProps as p, unref as l, withModifiers as V, createSlots as T, withCtx as t, createVNode as w, createElementBlock as m, createCommentVNode as f, renderSlot as n, createElementVNode as M, mergeModels as A } from "vue";
import { useHddBaseInputUtils as q } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { _ as E } from "./BaseInput.vue_vue_type_script_setup_true_lang-DGVI56PE.js";
const N = {
  key: 0,
  class: "pi pi-check text-[var(--p-checkbox-icon-checked-color)]"
}, D = {
  key: 1,
  class: "pi pi-times light:text-red-100 dark:text-red-700"
}, H = ["innerHTML"], W = /* @__PURE__ */ g({
  __name: "TriCheckboxInput",
  props: /* @__PURE__ */ A({
    notSelectedValue: { default: "null" },
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
    controlBeforeLabel: { type: Boolean, default: !0 },
    labelSingleLine: { type: Boolean },
    hideLabelDoubleDots: { type: Boolean, default: !0 },
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
  setup(a, { expose: b }) {
    const r = a, o = $(a, "modelValue"), h = x();
    function y() {
      h.value.$el.focus();
    }
    const i = computed(() => o.value === !0 || o.value === !1), d = computed(() => o.value === !1);
    function c() {
      if (!r.disabled)
        switch (o.value) {
          case !0:
            o.value = !1;
            break;
          case !1:
            o.value = r.notSelectedValue === "null" ? null : void 0;
            break;
          default:
            o.value = !0;
            break;
        }
    }
    const { exposed: k, baseInputForwardedProps: v, fieldUniqueId: B, generalInputProps: C } = q(r);
    return b({ focus: y, ...k }), (e, _) => {
      const L = S("Checkbox");
      return s(), I(E, p(l(v), {
        "label-class": `${a.labelClass} select-none`,
        onLabelClicked: V(c, ["stop", "prevent"])
      }), T({
        labelText: t(() => [
          n(e.$slots, "labelText")
        ]),
        default: t(() => [
          w(L, p(l(C), {
            "input-id": l(B),
            "model-value": l(i),
            indeterminate: l(d),
            binary: "",
            class: { "p-checkbox-checked": l(i), "p-checkbox-indeterminate": l(d) },
            readonly: "",
            onClick: c
          }), {
            icon: t((u) => [
              u.checked ? (s(), m("i", N)) : f("", !0),
              u.indeterminate ? (s(), m("i", D)) : f("", !0)
            ]),
            _: 1
          }, 16, ["input-id", "model-value", "indeterminate", "class"])
        ]),
        _: 2
      }, [
        e.$slots.afterLabel ? {
          name: "afterLabel",
          fn: t(() => [
            n(e.$slots, "afterLabel")
          ]),
          key: "0"
        } : void 0,
        e.$slots.afterControl ? {
          name: "afterControl",
          fn: t(() => [
            n(e.$slots, "afterControl")
          ]),
          key: "1"
        } : void 0,
        e.$slots.addon ? {
          name: "addon",
          fn: t(() => [
            n(e.$slots, "addon")
          ]),
          key: "2"
        } : void 0,
        e.$slots.helper || a.helperText ? {
          name: "helper",
          fn: t(() => [
            n(e.$slots, "helper", {}, () => [
              M("div", { innerHTML: a.helperText }, null, 8, H)
            ])
          ]),
          key: "3"
        } : void 0
      ]), 1040, ["label-class"]);
    };
  }
});
export {
  W as _
};
