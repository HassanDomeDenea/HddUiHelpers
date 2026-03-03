import { defineComponent as _, useModel as O, ref as C, resolveComponent as s, openBlock as c, createBlock as V, mergeProps as k, unref as i, createSlots as P, withCtx as u, createVNode as m, withKeys as f, withModifiers as b, createElementVNode as L, createElementBlock as M, toDisplayString as W, createCommentVNode as g, renderSlot as w, normalizeClass as j, mergeModels as N } from "vue";
import { useHddBaseInputUtils as J } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { formatNumberGrouped as Q } from "HddUiHelpers/utils/useFormatters.ts";
import { evaluate as X } from "mathjs";
import { _ as Y } from "../../BaseInput.vue_vue_type_script_setup_true_lang-DGVI56PE.js";
const Z = ["innerHTML"], ee = { class: "flex gap-1" }, te = { key: 0 }, ne = ["innerHTML"], se = /* @__PURE__ */ _({
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
    const y = t, A = S, o = O(t, "modelValue"), { t: $ } = useI18n(), v = C();
    function x() {
      v.value.$el.focus();
    }
    function K() {
      v.value.$el.select();
    }
    const l = C();
    watch(
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
      const r = l.value?.trim();
      if (r === null || r === "") {
        o.value = null;
        return;
      }
      try {
        const p = ("" + r).replaceAll(" ", "");
        n = X(p);
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
    const { exposed: D, baseInputForwardedProps: E, fieldUniqueId: G, generalInputProps: H } = J(y);
    return T({ focus: x, ...D, select: K, hasMathOperatorNotFirst: h }), (e, n) => {
      const r = s("InputText"), d = s("InputIcon"), p = s("IconField"), R = s("InputGroupAddon"), U = s("InputGroup");
      return c(), V(Y, k(i(E), { onClick: x }), P({
        labelText: u(() => [
          w(e.$slots, "label-text")
        ]),
        default: u(() => [
          m(U, null, {
            default: u(() => [
              m(p, null, {
                default: u(() => [
                  m(r, k(i(H), {
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
                default: u(() => [
                  L("div", ee, [
                    o.value > 999 ? (c(), M("span", te, W(o.value !== null ? i(Q)(o.value, !1) : null), 1)) : g("", !0),
                    t.formatterAddonAppendText ? (c(), M("span", {
                      key: 1,
                      innerHTML: t.formatterAddonAppendText
                    }, null, 8, ne)) : g("", !0)
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
          fn: u(() => [
            w(e.$slots, "addon", {}, () => [
              L("span", {
                class: j({ "text-sm": t.size === "small", "text-lg": t.size === "large" }),
                innerHTML: t.textAddon
              }, null, 10, Z)
            ])
          ]),
          key: "0"
        } : void 0,
        e.$slots.helper ? {
          name: "helper",
          fn: u(() => [
            w(e.$slots, "helper")
          ]),
          key: "1"
        } : void 0
      ]), 1040);
    };
  }
});
export {
  se as default
};
