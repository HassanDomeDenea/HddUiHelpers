import U from "primevue/inputgroup";
import R from "primevue/select";
import { defineComponent as T, useModel as b, ref as $, computed as g, onMounted as j, openBlock as d, createBlock as m, mergeProps as v, unref as o, withCtx as s, createVNode as K, normalizeClass as f, createElementVNode as a, toDisplayString as w, createElementBlock as O, createCommentVNode as B, resolveDynamicComponent as W, withKeys as k, mergeModels as h } from "vue";
import { useHddBaseInputUtils as F, cursorAtStartOfInput as G, cursorAtEndOfInput as H } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { InputMask as Q } from "primevue";
import J from "primevue/inputtext";
import { _ as X } from "./BaseInput.vue_vue_type_script_setup_true_lang-Ca5DqyVP.js";
import { useI18n as Y } from "vue-i18n";
const Z = {
  key: 0,
  class: "flex h-full items-center gap-1 text-sm"
}, _ = { class: "text-xs font-bold" }, ee = { class: "flex items-center gap-1 text-sm" }, de = /* @__PURE__ */ T({
  __name: "PhoneInput",
  props: /* @__PURE__ */ h({
    mask: {},
    withCountryCode: { type: Boolean, default: !0 },
    defaultCountryCode: { default: "964" },
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
    modelValue: {},
    modelModifiers: {},
    countryCode: {},
    countryCodeModifiers: {}
  }),
  emits: /* @__PURE__ */ h(["keydown", "focusPrevious", "focusNext"], ["update:modelValue", "update:countryCode"]),
  setup(e, { expose: I, emit: V }) {
    const i = e, p = V, y = b(e, "modelValue"), u = b(e, "countryCode"), { t: A } = Y(), r = $();
    function c() {
      r.value.$el.focus();
    }
    const C = g(() => [
      {
        value: "964",
        label: "+964",
        code: "IQ",
        flag: "i-twemoji:flag-iraq",
        placeholder: "7x xxxx xxxx",
        mask: "99 9999 9999"
      },
      {
        value: "98",
        label: "+98",
        code: "IR",
        flag: "i-twemoji-flag-iran",
        placeholder: "",
        // ?
        mask: ""
        // ?
      }
    ]), n = g(
      () => C.value.find((x) => x.value === u.value)
    );
    j(() => {
      i.defaultCountryCode && !u.value && (u.value = i.defaultCountryCode);
    });
    function L() {
      setTimeout(c, 5);
    }
    const M = () => G(r.value.$el) && p("focusPrevious"), S = () => H(r.value.$el) && p("focusNext"), { exposed: q, baseInputForwardedProps: D, fieldUniqueId: N, generalInputProps: z } = F(i);
    return I({ focus: c, ...q }), (x, l) => {
      const E = R, P = U;
      return d(), m(X, v(o(D), { onClick: c }), {
        default: s(() => [
          K(P, { class: "dir-ltr" }, {
            default: s(() => [
              e.withCountryCode ? (d(), m(E, {
                key: 0,
                modelValue: u.value,
                "onUpdate:modelValue": l[0] || (l[0] = (t) => u.value = t),
                class: f([{
                  "!rounded-0": e.buttonAddon
                }, "!max-w-[70px]"]),
                "option-value": "value",
                size: e.size,
                "option-label": "label",
                disabled: e.disabled || e.readonly,
                options: o(C),
                "show-clear": !1,
                pt: {
                  dropdown: {
                    style: { width: "0px" }
                  }
                },
                onChange: L
              }, {
                dropdownicon: s(() => [...l[3] || (l[3] = [
                  a("span", null, null, -1)
                ])]),
                value: s(() => [
                  o(n) ? (d(), O("div", Z, [
                    a("i", {
                      class: f([o(n).flag, "!w-[30px]"])
                    }, null, 2),
                    a("span", _, w(o(n).label), 1)
                  ])) : B("", !0)
                ]),
                option: s((t) => [
                  a("div", ee, [
                    a("i", {
                      class: f(t.option.flag)
                    }, null, 2),
                    a("span", null, w(t.option.label), 1)
                  ])
                ]),
                _: 1
              }, 8, ["modelValue", "class", "size", "disabled", "options"])) : B("", !0),
              (d(), m(W(e.mask ?? o(n)?.mask ? o(Q) : o(J)), v(o(z), {
                id: o(N),
                ref_key: "inputRef",
                ref: r,
                modelValue: y.value,
                "onUpdate:modelValue": l[1] || (l[1] = (t) => y.value = t),
                "auto-clear": !1,
                autocomplete: e.autocomplete,
                pt: {
                  root: {
                    autocomplete: e.autocomplete
                  }
                },
                class: ["dir-ltr", o(A)("dir") === "rtl" ? "text-right" : "text-left"],
                placeholder: e.placeholder ?? o(n)?.placeholder,
                mask: e.mask ?? o(n)?.mask,
                onKeydown: [
                  k(M, ["up"]),
                  k(S, ["down"]),
                  l[2] || (l[2] = (t) => p("keydown", t))
                ]
              }), null, 16, ["id", "modelValue", "autocomplete", "pt", "class", "placeholder", "mask"]))
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 16);
    };
  }
});
export {
  de as _
};
