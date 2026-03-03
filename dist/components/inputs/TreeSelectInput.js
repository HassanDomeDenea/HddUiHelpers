import { defineComponent as R, useModel as U, computed as P, ref as C, onMounted as j, resolveComponent as z, openBlock as u, createBlock as T, mergeProps as x, unref as m, withCtx as d, createVNode as W, createSlots as G, createElementVNode as J, normalizeClass as Q, renderSlot as f, normalizeProps as b, guardReactiveProps as v, createElementBlock as c, Fragment as X, createTextVNode as Y, toDisplayString as Z, createCommentVNode as h, mergeModels as I, toValue as _ } from "vue";
import { useHddBaseInputUtils as ee, getTreeAncestorsById as le } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import te from "HddUiHelpers/components/misc/TextWithTitleAttribute.vue";
import { isEmpty as oe, reduce as M } from "lodash-es";
import { useI18n as ae } from "vue-i18n";
import { _ as ne } from "../../BaseInput.vue_vue_type_script_setup_true_lang-C8yTwTDa.js";
const re = ["innerHTML"], ie = { key: 1 }, ue = ["innerHTML"], be = /* @__PURE__ */ R({
  __name: "TreeSelectInput",
  props: /* @__PURE__ */ I({
    options: {},
    optionLabelProperty: { default: "name" },
    optionDisabledProperty: { type: [String, null, Function], default: "disabled" },
    optionValueProperty: { default: "id" },
    optionChildrenProperty: { default: "children" },
    formatter: {},
    clearable: { type: Boolean, default: !1 },
    disabledValues: {},
    checkmark: { type: Boolean, default: !0 },
    expanded: { type: Boolean, default: !1 },
    fullPathValueLabel: { type: Boolean, default: !1 },
    hasFilter: { type: Boolean, default: !0 },
    display: { default: "comma" },
    selectionMode: { default: "single" },
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
  emits: /* @__PURE__ */ I(["change"], ["update:modelValue"]),
  setup(n, { expose: S, emit: w }) {
    const o = n, N = w, { t: de } = ae(), r = U(n, "modelValue"), g = P({
      get() {
        return r.value ? Array.isArray(r.value) ? M(
          r.value,
          (e, t) => (e[t] = !0, e),
          {}
        ) : r.value ? {
          [r.value]: !0
        } : null : null;
      },
      set(e) {
        if (e) {
          const t = Object.keys(e).map(D).map((a) => a[o.optionValueProperty]);
          if (oe(t) && !o.clearable) {
            k(r.value);
            return;
          }
          o.selectionMode === "single" ? r.value = t[0] : r.value = t;
        } else
          r.value = null;
      }
    });
    function V(e) {
      if (e.key && e.label)
        return e;
      {
        let t = typeof o.optionDisabledProperty == "function" ? o.optionDisabledProperty({ option: e, value: r.value }) : e[o.optionDisabledProperty] ?? !1;
        const a = _(o.disabledValues);
        return !t && a?.length && a.includes(e[o.optionValueProperty]) && (t = !0), {
          [o.optionValueProperty]: e[o.optionValueProperty],
          key: e[o.optionValueProperty].toString(),
          label: e[o.optionLabelProperty],
          selectable: !t,
          styleClass: t ? "text-muted" : null,
          children: e[o.optionChildrenProperty]?.map(V) ?? []
        };
      }
    }
    function D(e) {
      let t = null;
      function a(l) {
        if (l.key === e)
          return t = l, !0;
        if (l.children) {
          for (const y of l.children)
            if (a(y))
              break;
        }
        return !1;
      }
      return a({
        [o.optionValueProperty]: null,
        key: null,
        children: p.value
      }), t;
    }
    const p = P(() => o.options.map(V)), i = C();
    function B() {
      o.disabled || setTimeout(() => {
        const e = i.value.$refs.focusInput;
        i.value.onClick({ target: e });
      }, 500);
    }
    function F() {
    }
    function k(e) {
      e ? o.selectionMode === "single" ? i.value.d_value = {
        [Array.isArray(e) ? e[0] : e]: !0
      } : i.value.d_value = M(
        Array.isArray(e) ? e : [e],
        (t, a) => (t[a] = !0, t),
        {}
      ) : i.value.d_value = {};
    }
    const s = C({});
    function L(e, t = !0) {
      if (e.children && e.children.length && (s.value[e.key] = !0, t))
        for (const a of e.children)
          L(a);
    }
    function $() {
      for (const e of p.value)
        L(e);
      s.value = { ...s.value };
    }
    j(() => {
      o.expanded && $();
    });
    function A(e) {
      const t = le(
        e[o.optionValueProperty],
        p.value,
        o.optionValueProperty
      );
      return !t || !t.length ? "" : t.slice().reverse().map((a) => a.label).join(" > ");
    }
    const { exposed: E, baseInputForwardedProps: q, fieldUniqueId: H, generalInputProps: K } = ee(o);
    return S({ focus: B, ...E, setVisibleElementValue: k, getFullPathLabel: A }), (e, t) => {
      const a = z("TreeSelect");
      return u(), T(ne, x(m(q), { onClick: B }), {
        default: d(() => [
          W(a, x(m(K), {
            ref_key: "inputRef",
            ref: i,
            modelValue: g.value,
            "onUpdate:modelValue": t[0] || (t[0] = (l) => g.value = l),
            "expanded-keys": s.value,
            "onUpdate:expandedKeys": t[1] || (t[1] = (l) => s.value = l),
            "input-id": m(H),
            placeholder: n.placeholder,
            filter: n.hasFilter,
            options: p.value,
            "show-clear": n.clearable,
            class: "!w-full",
            "selection-mode": n.selectionMode,
            "scroll-height": "18rem",
            display: n.display,
            onBlur: F,
            onChange: t[2] || (t[2] = (l) => N("change", l))
          }), G({
            footer: d((l) => [
              f(e.$slots, "footer", b(v(l)))
            ]),
            header: d((l) => [
              f(e.$slots, "header", b(v(l)))
            ]),
            itemtogglericon: d((l) => [
              J("i", {
                class: Q(["text-[2em]", [
                  l.class,
                  {
                    "i-ic:round-keyboard-arrow-up": l.expanded,
                    "rtl:i-ic:round-keyboard-arrow-left ltr:i-ic:round-keyboard-arrow-right": !l.expanded
                  }
                ]])
              }, null, 2)
            ]),
            _: 2
          }, [
            e.$slots.value || n.fullPathValueLabel ? {
              name: "value",
              fn: d((l) => [
                f(e.$slots, "value", b(v(l)), () => [
                  n.formatter ? (u(), c("div", {
                    key: 0,
                    innerHTML: n.formatter(l.value, "value")
                  }, null, 8, re)) : r.value ? (u(), c("div", ie, [
                    n.fullPathValueLabel ? (u(), T(te, {
                      key: 0,
                      text: A(
                        Array.isArray(l.value) ? l.value[0] : l.value
                      )
                    }, null, 8, ["text"])) : r.value ? (u(), c(X, { key: 1 }, [
                      Y(Z(Array.isArray(l.value) ? l.value[0].label : l.value.label), 1)
                    ], 64)) : h("", !0)
                  ])) : h("", !0)
                ])
              ]),
              key: "0"
            } : void 0,
            e.$slots.option ? {
              name: "option",
              fn: d(({ node: l, selected: y, expanded: O }) => [
                f(e.$slots, "option", {
                  node: l,
                  selected: y,
                  expanded: O
                }, () => [
                  n.formatter ? (u(), c("div", {
                    key: 0,
                    innerHTML: n.formatter(l, "option")
                  }, null, 8, ue)) : h("", !0)
                ])
              ]),
              key: "1"
            } : void 0
          ]), 1040, ["modelValue", "expanded-keys", "input-id", "placeholder", "filter", "options", "show-clear", "selection-mode", "display"])
        ]),
        _: 3
      }, 16);
    };
  }
});
export {
  be as default
};
