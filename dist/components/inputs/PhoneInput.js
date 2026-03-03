import { defineComponent as R, useModel as x, ref as T, computed as b, onMounted as $, resolveComponent as w, openBlock as d, createBlock as m, mergeProps as g, unref as a, withCtx as s, createVNode as j, normalizeClass as f, createElementVNode as n, toDisplayString as B, createElementBlock as K, createCommentVNode as k, resolveDynamicComponent as O, withKeys as h, mergeModels as I } from "vue";
import { useHddBaseInputUtils as G, cursorAtStartOfInput as W, cursorAtEndOfInput as F } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { InputMask as H } from "primevue";
import Q from "primevue/inputtext";
import { useI18n as J } from "vue-i18n";
import { _ as X } from "../../BaseInput.vue_vue_type_script_setup_true_lang-C8yTwTDa.js";
const Y = {
  key: 0,
  class: "flex h-full items-center gap-1 text-sm"
}, Z = { class: "text-xs font-bold" }, _ = { class: "flex items-center gap-1 text-sm" }, ue = /* @__PURE__ */ R({
  __name: "PhoneInput",
  props: /* @__PURE__ */ I({
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
  emits: /* @__PURE__ */ I(["keydown", "focusPrevious", "focusNext"], ["update:modelValue", "update:countryCode"]),
  setup(e, { expose: V, emit: A }) {
    const i = e, p = A, y = x(e, "modelValue"), u = x(e, "countryCode"), { t: L } = J(), r = T();
    function c() {
      r.value.$el.focus();
    }
    const C = b(() => [
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
    ]), t = b(
      () => C.value.find((v) => v.value === u.value)
    );
    $(() => {
      i.defaultCountryCode && !u.value && (u.value = i.defaultCountryCode);
    });
    function S() {
      setTimeout(c, 5);
    }
    const M = () => W(r.value.$el) && p("focusPrevious"), q = () => F(r.value.$el) && p("focusNext"), { exposed: D, baseInputForwardedProps: N, fieldUniqueId: z, generalInputProps: E } = G(i);
    return V({ focus: c, ...D }), (v, o) => {
      const P = w("Select"), U = w("InputGroup");
      return d(), m(X, g(a(N), { onClick: c }), {
        default: s(() => [
          j(U, { class: "dir-ltr" }, {
            default: s(() => [
              e.withCountryCode ? (d(), m(P, {
                key: 0,
                modelValue: u.value,
                "onUpdate:modelValue": o[0] || (o[0] = (l) => u.value = l),
                class: f([{
                  "!rounded-0": e.buttonAddon
                }, "!max-w-[70px]"]),
                "option-value": "value",
                size: e.size,
                "option-label": "label",
                disabled: e.disabled || e.readonly,
                options: C.value,
                "show-clear": !1,
                pt: {
                  dropdown: {
                    style: { width: "0px" }
                  }
                },
                onChange: S
              }, {
                dropdownicon: s(() => [...o[3] || (o[3] = [
                  n("span", null, null, -1)
                ])]),
                value: s(() => [
                  t.value ? (d(), K("div", Y, [
                    n("i", {
                      class: f([t.value.flag, "!w-[30px]"])
                    }, null, 2),
                    n("span", Z, B(t.value.label), 1)
                  ])) : k("", !0)
                ]),
                option: s((l) => [
                  n("div", _, [
                    n("i", {
                      class: f(l.option.flag)
                    }, null, 2),
                    n("span", null, B(l.option.label), 1)
                  ])
                ]),
                _: 1
              }, 8, ["modelValue", "class", "size", "disabled", "options"])) : k("", !0),
              (d(), m(O(e.mask ?? t.value?.mask ? a(H) : a(Q)), g(a(E), {
                id: a(z),
                ref_key: "inputRef",
                ref: r,
                modelValue: y.value,
                "onUpdate:modelValue": o[1] || (o[1] = (l) => y.value = l),
                "auto-clear": !1,
                autocomplete: e.autocomplete,
                pt: {
                  root: {
                    autocomplete: e.autocomplete
                  }
                },
                class: ["dir-ltr", a(L)("dir") === "rtl" ? "text-right" : "text-left"],
                placeholder: e.placeholder ?? t.value?.placeholder,
                mask: e.mask ?? t.value?.mask,
                onKeydown: [
                  h(M, ["up"]),
                  h(q, ["down"]),
                  o[2] || (o[2] = (l) => p("keydown", l))
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
  ue as default
};
