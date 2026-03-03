import U from "primevue/inputgroup";
import G from "primevue/inputgroupaddon";
import O from "primevue/iconfield";
import P from "primevue/inputicon";
import W from "primevue/inputtext";
import { defineComponent as j, useModel as J, ref as A, watch as Q, openBlock as p, createBlock as x, mergeProps as V, unref as s, createSlots as X, withCtx as r, createVNode as m, withKeys as c, withModifiers as B, createElementVNode as k, createElementBlock as C, toDisplayString as Y, createCommentVNode as b, renderSlot as w, normalizeClass as Z, mergeModels as L } from "vue";
import { useHddBaseInputUtils as ee } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { formatNumberGrouped as te } from "HddUiHelpers/utils/useFormatters.ts";
import { evaluate as ne } from "mathjs";
import { _ as oe } from "./BaseInput.vue_vue_type_script_setup_true_lang-Ca5DqyVP.js";
import { useI18n as le } from "vue-i18n";
const ae = ["innerHTML"], re = { class: "flex gap-1" }, ue = { key: 0 }, se = ["innerHTML"], be = /* @__PURE__ */ j({
  __name: "MathInput",
  props: /* @__PURE__ */ L({
    inputClass: {},
    step: { default: 1 },
    withFormattedAddon: { type: Boolean },
    textAddon: {},
    formatterAddonAppendText: {},
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
    wrapperClass: {},
    controlWrapperClass: {},
    size: {},
    buttonAddon: {},
    controlComponent: {}
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ L(["keydown", "input", "updated"], ["update:modelValue"]),
  setup(t, { expose: M, emit: N }) {
    const f = t, _ = N, o = J(t, "modelValue"), { t: T } = le(), y = A();
    function I() {
      y.value.$el.focus();
    }
    function S() {
      y.value.$el.select();
    }
    const l = A();
    Q(
      o,
      (e) => {
        l.value = e?.toString() ?? "";
      },
      {
        immediate: !0
      }
    );
    function a(e = !0) {
      let n = null;
      const u = l.value?.trim();
      if (u === null || u === "") {
        o.value = null;
        return;
      }
      try {
        const d = ("" + u).replaceAll(" ", "");
        n = ne(d);
      } catch {
      }
      const i = isNaN(+n) ? null : +n;
      return e === !0 && v(i), i;
    }
    function $(e) {
      a(), _("keydown", e);
    }
    function K() {
      if (g(l.value))
        a();
      else {
        let e = a(!1);
        e = (isNaN(e) ? 0 : e) + f.step, v(e);
      }
    }
    function z() {
      if (g(l.value))
        a();
      else {
        let e = a(!1);
        e = (isNaN(e) ? 0 : e) - f.step, v(e);
      }
    }
    function v(e = null) {
      l.value = e?.toString() ?? "", o.value = e, _("updated", o.value);
    }
    function g(e) {
      return /[^]{1}.*[+\-/*]/.test(e.slice(1));
    }
    const { exposed: q, baseInputForwardedProps: D, fieldUniqueId: E, generalInputProps: F } = ee(f);
    return M({ focus: I, ...q, select: S, hasMathOperatorNotFirst: g }), (e, n) => {
      const u = W, i = P, d = O, H = G, R = U;
      return p(), x(oe, V(s(D), { onClick: I }), X({
        labelText: r(() => [
          w(e.$slots, "label-text")
        ]),
        default: r(() => [
          m(R, null, {
            default: r(() => [
              m(d, null, {
                default: r(() => [
                  m(u, V(s(F), {
                    id: s(E),
                    ref_key: "inputRef",
                    ref: y,
                    modelValue: l.value,
                    "onUpdate:modelValue": n[0] || (n[0] = (h) => l.value = h),
                    style: { paddingRight: "20px" },
                    class: t.inputClass,
                    onKeydown: [
                      c(B($, ["prevent"]), ["enter"]),
                      c(B(K, ["prevent"]), ["up"]),
                      c(B(z, ["prevent"]), ["down"]),
                      n[1] || (n[1] = c((h) => a(), ["space"]))
                    ],
                    onChange: n[2] || (n[2] = (h) => a())
                  }), null, 16, ["id", "modelValue", "style", "class", "onKeydown"]),
                  m(i, {
                    title: s(T)("Support Math Operations"),
                    class: "i-mdi-calculator !light:text-zinc-400 !dark:text-zinc-500"
                  }, null, 8, ["title"])
                ]),
                _: 1
              }),
              t.withFormattedAddon ? (p(), x(H, {
                key: 0,
                style: { "min-width": "unset" }
              }, {
                default: r(() => [
                  k("div", re, [
                    o.value > 999 ? (p(), C("span", ue, Y(o.value !== null ? s(te)(o.value, !1) : null), 1)) : b("", !0),
                    t.formatterAddonAppendText ? (p(), C("span", {
                      key: 1,
                      innerHTML: t.formatterAddonAppendText
                    }, null, 8, se)) : b("", !0)
                  ])
                ]),
                _: 1
              })) : b("", !0)
            ]),
            _: 1
          })
        ]),
        _: 2
      }, [
        e.$slots.addon || t.textAddon ? {
          name: "addon",
          fn: r(() => [
            w(e.$slots, "addon", {}, () => [
              k("span", {
                class: Z({ "text-sm": t.size === "small", "text-lg": t.size === "large" }),
                innerHTML: t.textAddon
              }, null, 10, ae)
            ])
          ]),
          key: "0"
        } : void 0,
        e.$slots.helper ? {
          name: "helper",
          fn: r(() => [
            w(e.$slots, "helper")
          ]),
          key: "1"
        } : void 0
      ]), 1040);
    };
  }
});
export {
  be as _
};
