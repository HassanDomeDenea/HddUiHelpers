import { defineComponent as _, useModel as O, ref as C, watch as P, resolveComponent as s, openBlock as c, createBlock as V, mergeProps as k, unref as i, createSlots as W, withCtx as r, createVNode as m, withKeys as f, withModifiers as b, createElementVNode as L, createElementBlock as M, toDisplayString as j, createCommentVNode as g, renderSlot as w, normalizeClass as J, mergeModels as N } from "vue";
import { useHddBaseInputUtils as Q } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { formatNumberGrouped as X } from "HddUiHelpers/utils/useFormatters.ts";
import { evaluate as Y } from "mathjs";
import { useI18n as Z } from "vue-i18n";
import { _ as ee } from "../../BaseInput.vue_vue_type_script_setup_true_lang-C8yTwTDa.js";
const te = ["innerHTML"], ne = { class: "flex gap-1" }, oe = { key: 0 }, le = ["innerHTML"], pe = /* @__PURE__ */ _({
  __name: "MathInput",
  props: /* @__PURE__ */ N({
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
  emits: /* @__PURE__ */ N(["keydown", "input", "updated"], ["update:modelValue"]),
  setup(t, { expose: T, emit: S }) {
    const y = t, A = S, o = O(t, "modelValue"), { t: $ } = Z(), v = C();
    function x() {
      v.value.$el.focus();
    }
    function K() {
      v.value.$el.select();
    }
    const l = C();
    P(
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
        const p = ("" + u).replaceAll(" ", "");
        n = Y(p);
      } catch {
      }
      const d = isNaN(+n) ? null : +n;
      return e === !0 && I(d), d;
    }
    function z(e) {
      a(), A("keydown", e);
    }
    function F() {
      if (h(l.value))
        a();
      else {
        let e = a(!1);
        e = (isNaN(e) ? 0 : e) + y.step, I(e);
      }
    }
    function q() {
      if (h(l.value))
        a();
      else {
        let e = a(!1);
        e = (isNaN(e) ? 0 : e) - y.step, I(e);
      }
    }
    function I(e = null) {
      l.value = e?.toString() ?? "", o.value = e, A("updated", o.value);
    }
    function h(e) {
      return /[^]{1}.*[+\-/*]/.test(e.slice(1));
    }
    const { exposed: D, baseInputForwardedProps: E, fieldUniqueId: G, generalInputProps: H } = Q(y);
    return T({ focus: x, ...D, select: K, hasMathOperatorNotFirst: h }), (e, n) => {
      const u = s("InputText"), d = s("InputIcon"), p = s("IconField"), R = s("InputGroupAddon"), U = s("InputGroup");
      return c(), V(ee, k(i(E), { onClick: x }), W({
        labelText: r(() => [
          w(e.$slots, "label-text")
        ]),
        default: r(() => [
          m(U, null, {
            default: r(() => [
              m(p, null, {
                default: r(() => [
                  m(u, k(i(H), {
                    id: i(G),
                    ref_key: "inputRef",
                    ref: v,
                    modelValue: l.value,
                    "onUpdate:modelValue": n[0] || (n[0] = (B) => l.value = B),
                    style: { paddingRight: "20px" },
                    class: t.inputClass,
                    onKeydown: [
                      f(b(z, ["prevent"]), ["enter"]),
                      f(b(F, ["prevent"]), ["up"]),
                      f(b(q, ["prevent"]), ["down"]),
                      n[1] || (n[1] = f((B) => a(), ["space"]))
                    ],
                    onChange: n[2] || (n[2] = (B) => a())
                  }), null, 16, ["id", "modelValue", "style", "class", "onKeydown"]),
                  m(d, {
                    title: i($)("Support Math Operations"),
                    class: "i-mdi-calculator !light:text-zinc-400 !dark:text-zinc-500"
                  }, null, 8, ["title"])
                ]),
                _: 1
              }),
              t.withFormattedAddon ? (c(), V(R, {
                key: 0,
                style: { "min-width": "unset" }
              }, {
                default: r(() => [
                  L("div", ne, [
                    o.value > 999 ? (c(), M("span", oe, j(o.value !== null ? i(X)(o.value, !1) : null), 1)) : g("", !0),
                    t.formatterAddonAppendText ? (c(), M("span", {
                      key: 1,
                      innerHTML: t.formatterAddonAppendText
                    }, null, 8, le)) : g("", !0)
                  ])
                ]),
                _: 1
              })) : g("", !0)
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
              L("span", {
                class: J({ "text-sm": t.size === "small", "text-lg": t.size === "large" }),
                innerHTML: t.textAddon
              }, null, 10, te)
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
  pe as default
};
