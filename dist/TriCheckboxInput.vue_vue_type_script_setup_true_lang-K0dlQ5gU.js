import $ from "primevue/checkbox";
import { defineComponent as S, useModel as x, ref as I, computed as p, openBlock as s, createBlock as V, mergeProps as m, unref as l, withModifiers as T, createSlots as w, withCtx as t, createVNode as M, createElementBlock as f, createCommentVNode as b, renderSlot as n, createElementVNode as _, mergeModels as A } from "vue";
import { useHddBaseInputUtils as q } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { _ as E } from "./BaseInput.vue_vue_type_script_setup_true_lang-Ca5DqyVP.js";
const N = {
  key: 0,
  class: "pi pi-check text-[var(--p-checkbox-icon-checked-color)]"
}, D = {
  key: 1,
  class: "pi pi-times light:text-red-100 dark:text-red-700"
}, H = ["innerHTML"], z = /* @__PURE__ */ S({
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
  setup(a, { expose: h }) {
    const r = a, o = x(a, "modelValue"), y = I();
    function k() {
      y.value.$el.focus();
    }
    const i = p(() => o.value === !0 || o.value === !1), d = p(() => o.value === !1);
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
    const { exposed: B, baseInputForwardedProps: v, fieldUniqueId: C, generalInputProps: L } = q(r);
    return h({ focus: k, ...B }), (e, P) => {
      const g = $;
      return s(), V(E, m(l(v), {
        "label-class": `${a.labelClass} select-none`,
        onLabelClicked: T(c, ["stop", "prevent"])
      }), w({
        labelText: t(() => [
          n(e.$slots, "labelText")
        ]),
        default: t(() => [
          M(g, m(l(L), {
            "input-id": l(C),
            "model-value": l(i),
            indeterminate: l(d),
            binary: "",
            class: { "p-checkbox-checked": l(i), "p-checkbox-indeterminate": l(d) },
            readonly: "",
            onClick: c
          }), {
            icon: t((u) => [
              u.checked ? (s(), f("i", N)) : b("", !0),
              u.indeterminate ? (s(), f("i", D)) : b("", !0)
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
              _("div", { innerHTML: a.helperText }, null, 8, H)
            ])
          ]),
          key: "3"
        } : void 0
      ]), 1040, ["label-class"]);
    };
  }
});
export {
  z as _
};
