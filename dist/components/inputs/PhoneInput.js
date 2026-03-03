import { defineComponent as U, useModel as b, ref as R, resolveComponent as v, openBlock as d, createBlock as m, mergeProps as w, unref as o, withCtx as s, createVNode as T, normalizeClass as f, createElementVNode as a, toDisplayString as g, createElementBlock as $, createCommentVNode as B, resolveDynamicComponent as j, withKeys as k, mergeModels as h } from "vue";
import { useHddBaseInputUtils as K, cursorAtStartOfInput as O, cursorAtEndOfInput as G } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { InputMask as W } from "primevue";
import F from "primevue/inputtext";
import { _ as H } from "../../BaseInput.vue_vue_type_script_setup_true_lang-DGVI56PE.js";
const Q = {
  key: 0,
  class: "flex h-full items-center gap-1 text-sm"
}, J = { class: "text-xs font-bold" }, X = { class: "flex items-center gap-1 text-sm" }, le = /* @__PURE__ */ U({
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
    const i = e, p = V, y = b(e, "modelValue"), u = b(e, "countryCode"), { t: A } = useI18n(), r = R();
    function c() {
      r.value.$el.focus();
    }
    const C = computed(() => [
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
    ]), n = computed(
      () => C.value.find((x) => x.value === u.value)
    );
    onMounted(() => {
      i.defaultCountryCode && !u.value && (u.value = i.defaultCountryCode);
    });
    function L() {
      setTimeout(c, 5);
    }
    const S = () => O(r.value.$el) && p("focusPrevious"), M = () => G(r.value.$el) && p("focusNext"), { exposed: q, baseInputForwardedProps: D, fieldUniqueId: N, generalInputProps: z } = K(i);
    return I({ focus: c, ...q }), (x, l) => {
      const E = v("Select"), P = v("InputGroup");
      return d(), m(H, w(o(D), { onClick: c }), {
        default: s(() => [
          T(P, { class: "dir-ltr" }, {
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
                  o(n) ? (d(), $("div", Q, [
                    a("i", {
                      class: f([o(n).flag, "!w-[30px]"])
                    }, null, 2),
                    a("span", J, g(o(n).label), 1)
                  ])) : B("", !0)
                ]),
                option: s((t) => [
                  a("div", X, [
                    a("i", {
                      class: f(t.option.flag)
                    }, null, 2),
                    a("span", null, g(t.option.label), 1)
                  ])
                ]),
                _: 1
              }, 8, ["modelValue", "class", "size", "disabled", "options"])) : B("", !0),
              (d(), m(j(e.mask ?? o(n)?.mask ? o(W) : o(F)), w(o(z), {
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
                  k(S, ["up"]),
                  k(M, ["down"]),
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
  le as default
};
