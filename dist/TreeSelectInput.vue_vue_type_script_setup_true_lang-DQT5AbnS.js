import R from "primevue/treeselect";
import { defineComponent as U, useModel as j, computed as P, ref as x, onMounted as z, openBlock as u, createBlock as C, mergeProps as T, unref as p, withCtx as d, createVNode as W, isRef as G, createSlots as J, createElementVNode as Q, normalizeClass as X, renderSlot as c, normalizeProps as v, guardReactiveProps as h, createElementBlock as y, Fragment as Y, createTextVNode as Z, toDisplayString as _, createCommentVNode as g, mergeModels as I, toValue as ee } from "vue";
import { useHddBaseInputUtils as le, getTreeAncestorsById as te } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import oe from "HddUiHelpers/components/misc/TextWithTitleAttribute.vue";
import { isEmpty as ae, reduce as M } from "lodash-es";
import { _ as ne } from "./BaseInput.vue_vue_type_script_setup_true_lang-Ca5DqyVP.js";
import { useI18n as re } from "vue-i18n";
const ie = ["innerHTML"], ue = { key: 1 }, de = ["innerHTML"], he = /* @__PURE__ */ U({
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
  setup(n, { expose: w, emit: N }) {
    const o = n, S = N, { t: se } = re(), r = j(n, "modelValue"), m = P({
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
          if (ae(t) && !o.clearable) {
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
        const a = ee(o.disabledValues);
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
          for (const b of l.children)
            if (a(b))
              break;
        }
        return !1;
      }
      return a({
        [o.optionValueProperty]: null,
        key: null,
        children: f.value
      }), t;
    }
    const f = P(() => o.options.map(V)), i = x();
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
    const s = x({});
    function L(e, t = !0) {
      if (e.children && e.children.length && (s.value[e.key] = !0, t))
        for (const a of e.children)
          L(a);
    }
    function $() {
      for (const e of f.value)
        L(e);
      s.value = { ...s.value };
    }
    z(() => {
      o.expanded && $();
    });
    function A(e) {
      const t = te(
        e[o.optionValueProperty],
        f.value,
        o.optionValueProperty
      );
      return !t || !t.length ? "" : t.slice().reverse().map((a) => a.label).join(" > ");
    }
    const { exposed: E, baseInputForwardedProps: q, fieldUniqueId: H, generalInputProps: K } = le(o);
    return w({ focus: B, ...E, setVisibleElementValue: k, getFullPathLabel: A }), (e, t) => {
      const a = R;
      return u(), C(ne, T(p(q), { onClick: B }), {
        default: d(() => [
          W(a, T(p(K), {
            ref_key: "inputRef",
            ref: i,
            modelValue: p(m),
            "onUpdate:modelValue": t[0] || (t[0] = (l) => G(m) ? m.value = l : null),
            "expanded-keys": s.value,
            "onUpdate:expandedKeys": t[1] || (t[1] = (l) => s.value = l),
            "input-id": p(H),
            placeholder: n.placeholder,
            filter: n.hasFilter,
            options: p(f),
            "show-clear": n.clearable,
            class: "!w-full",
            "selection-mode": n.selectionMode,
            "scroll-height": "18rem",
            display: n.display,
            onBlur: F,
            onChange: t[2] || (t[2] = (l) => S("change", l))
          }), J({
            footer: d((l) => [
              c(e.$slots, "footer", v(h(l)))
            ]),
            header: d((l) => [
              c(e.$slots, "header", v(h(l)))
            ]),
            itemtogglericon: d((l) => [
              Q("i", {
                class: X(["text-[2em]", [
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
                c(e.$slots, "value", v(h(l)), () => [
                  n.formatter ? (u(), y("div", {
                    key: 0,
                    innerHTML: n.formatter(l.value, "value")
                  }, null, 8, ie)) : r.value ? (u(), y("div", ue, [
                    n.fullPathValueLabel ? (u(), C(oe, {
                      key: 0,
                      text: A(
                        Array.isArray(l.value) ? l.value[0] : l.value
                      )
                    }, null, 8, ["text"])) : r.value ? (u(), y(Y, { key: 1 }, [
                      Z(_(Array.isArray(l.value) ? l.value[0].label : l.value.label), 1)
                    ], 64)) : g("", !0)
                  ])) : g("", !0)
                ])
              ]),
              key: "0"
            } : void 0,
            e.$slots.option ? {
              name: "option",
              fn: d(({ node: l, selected: b, expanded: O }) => [
                c(e.$slots, "option", {
                  node: l,
                  selected: b,
                  expanded: O
                }, () => [
                  n.formatter ? (u(), y("div", {
                    key: 0,
                    innerHTML: n.formatter(l, "option")
                  }, null, 8, de)) : g("", !0)
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
  he as _
};
