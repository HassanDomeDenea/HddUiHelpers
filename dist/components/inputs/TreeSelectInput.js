import { defineComponent as O, useModel as R, ref as P, resolveComponent as U, openBlock as u, createBlock as C, mergeProps as T, unref as p, withCtx as d, createVNode as j, isRef as z, createSlots as W, createElementVNode as G, normalizeClass as J, renderSlot as f, normalizeProps as v, guardReactiveProps as h, createElementBlock as y, Fragment as Q, createTextVNode as X, toDisplayString as Y, createCommentVNode as g, mergeModels as x } from "vue";
import { useHddBaseInputUtils as Z, getTreeAncestorsById as _ } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import ee from "HddUiHelpers/components/misc/TextWithTitleAttribute.vue";
import { isEmpty as le, reduce as I } from "lodash-es";
import { _ as te } from "../../BaseInput.vue_vue_type_script_setup_true_lang-DGVI56PE.js";
const oe = ["innerHTML"], ae = { key: 1 }, ne = ["innerHTML"], ce = /* @__PURE__ */ O({
  __name: "TreeSelectInput",
  props: /* @__PURE__ */ x({
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
  emits: /* @__PURE__ */ x(["change"], ["update:modelValue"]),
  setup(n, { expose: M, emit: S }) {
    const o = n, w = S, { t: re } = useI18n(), r = R(n, "modelValue"), m = computed({
      get() {
        return r.value ? Array.isArray(r.value) ? I(
          r.value,
          (e, t) => (e[t] = !0, e),
          {}
        ) : r.value ? {
          [r.value]: !0
        } : null : null;
      },
      set(e) {
        if (e) {
          const t = Object.keys(e).map(N).map((a) => a[o.optionValueProperty]);
          if (le(t) && !o.clearable) {
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
        const a = toValue(o.disabledValues);
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
    function N(e) {
      let t = null;
      function a(l) {
        if (l.key === e)
          return t = l, !0;
        if (l.children) {
          for (const b of l.children)
            if (a(b))
              break;
        }
        return !1;
      }
      return a({
        [o.optionValueProperty]: null,
        key: null,
        children: c.value
      }), t;
    }
    const c = computed(() => o.options.map(V)), i = P();
    function B() {
      o.disabled || setTimeout(() => {
        const e = i.value.$refs.focusInput;
        i.value.onClick({ target: e });
      }, 500);
    }
    function D() {
    }
    function k(e) {
      e ? o.selectionMode === "single" ? i.value.d_value = {
        [Array.isArray(e) ? e[0] : e]: !0
      } : i.value.d_value = I(
        Array.isArray(e) ? e : [e],
        (t, a) => (t[a] = !0, t),
        {}
      ) : i.value.d_value = {};
    }
    const s = P({});
    function L(e, t = !0) {
      if (e.children && e.children.length && (s.value[e.key] = !0, t))
        for (const a of e.children)
          L(a);
    }
    function F() {
      for (const e of c.value)
        L(e);
      s.value = { ...s.value };
    }
    onMounted(() => {
      o.expanded && F();
    });
    function A(e) {
      const t = _(
        e[o.optionValueProperty],
        c.value,
        o.optionValueProperty
      );
      return !t || !t.length ? "" : t.slice().reverse().map((a) => a.label).join(" > ");
    }
    const { exposed: $, baseInputForwardedProps: E, fieldUniqueId: q, generalInputProps: H } = Z(o);
    return M({ focus: B, ...$, setVisibleElementValue: k, getFullPathLabel: A }), (e, t) => {
      const a = U("TreeSelect");
      return u(), C(te, T(p(E), { onClick: B }), {
        default: d(() => [
          j(a, T(p(H), {
            ref_key: "inputRef",
            ref: i,
            modelValue: p(m),
            "onUpdate:modelValue": t[0] || (t[0] = (l) => z(m) ? m.value = l : null),
            "expanded-keys": s.value,
            "onUpdate:expandedKeys": t[1] || (t[1] = (l) => s.value = l),
            "input-id": p(q),
            placeholder: n.placeholder,
            filter: n.hasFilter,
            options: p(c),
            "show-clear": n.clearable,
            class: "!w-full",
            "selection-mode": n.selectionMode,
            "scroll-height": "18rem",
            display: n.display,
            onBlur: D,
            onChange: t[2] || (t[2] = (l) => w("change", l))
          }), W({
            footer: d((l) => [
              f(e.$slots, "footer", v(h(l)))
            ]),
            header: d((l) => [
              f(e.$slots, "header", v(h(l)))
            ]),
            itemtogglericon: d((l) => [
              G("i", {
                class: J(["text-[2em]", [
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
                f(e.$slots, "value", v(h(l)), () => [
                  n.formatter ? (u(), y("div", {
                    key: 0,
                    innerHTML: n.formatter(l.value, "value")
                  }, null, 8, oe)) : r.value ? (u(), y("div", ae, [
                    n.fullPathValueLabel ? (u(), C(ee, {
                      key: 0,
                      text: A(
                        Array.isArray(l.value) ? l.value[0] : l.value
                      )
                    }, null, 8, ["text"])) : r.value ? (u(), y(Q, { key: 1 }, [
                      X(Y(Array.isArray(l.value) ? l.value[0].label : l.value.label), 1)
                    ], 64)) : g("", !0)
                  ])) : g("", !0)
                ])
              ]),
              key: "0"
            } : void 0,
            e.$slots.option ? {
              name: "option",
              fn: d(({ node: l, selected: b, expanded: K }) => [
                f(e.$slots, "option", {
                  node: l,
                  selected: b,
                  expanded: K
                }, () => [
                  n.formatter ? (u(), y("div", {
                    key: 0,
                    innerHTML: n.formatter(l, "option")
                  }, null, 8, ne)) : g("", !0)
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
  ce as default
};
