import { defineComponent as te, useModel as x, ref as s, resolveComponent as S, openBlock as I, createBlock as $, normalizeProps as oe, guardReactiveProps as le, unref as c, createSlots as ae, withCtx as y, createVNode as ne, mergeProps as ie, createElementVNode as B, createElementBlock as C, createCommentVNode as A, withDirectives as ue, renderSlot as g, mergeModels as E } from "vue";
import { vElementVisibility as se } from "@vueuse/components";
import { useHddBaseInputUtils as re } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { useLoader as de } from "HddUiHelpers/composables/loader.ts";
import { useApiClient as ce } from "HddUiHelpers/stores/apiClient.ts";
import { _ as pe } from "./BaseInput.vue_vue_type_script_setup_true_lang-DGVI56PE.js";
const fe = ["innerHTML"], me = { key: 0 }, ye = ["innerHTML"], ve = { key: 1 }, he = ["innerHTML"], be = { class: "flex justify-center" }, Ie = {
  key: 0,
  class: "i-mdi-loading mx-auto my-1 animate-spin"
}, Pe = /* @__PURE__ */ te({
  __name: "AutoCompleteInput",
  props: /* @__PURE__ */ E({
    url: {},
    c: {},
    disabled: { type: Boolean },
    dropdownMode: {},
    dropdown: { type: Boolean },
    options: { default: () => [] },
    searchOnFocus: { type: Boolean, default: !0 },
    optionLabelProperty: { default: "name" },
    helperText: {},
    optionIdProperty: { default: "id" },
    withoutObject: { type: Boolean, default: !1 },
    noManualInput: { type: Boolean, default: !1 },
    hideCurrentOption: { type: Boolean },
    useIdModel: { type: Boolean, default: !1 },
    clearable: { type: Boolean, default: !1 },
    clearOnDblClick: { type: Boolean, default: !1 },
    hideListWhenEmpty: { type: Boolean, default: !1 },
    formatter: {},
    inputClass: { default: "w-full" },
    panelClass: {},
    ajaxParams: {},
    autoCompleteClass: { default: "" },
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
    placeholder: {},
    autoI18nLabel: { type: Boolean },
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
    modelValue: {
      default: s().value
    },
    modelModifiers: {},
    id: {},
    idModifiers: {}
  }),
  emits: /* @__PURE__ */ E(["containerDblClick", "keydown", "blur", "itemSelected", "cleared"], ["update:modelValue", "update:id"]),
  setup(o, { expose: O, emit: q }) {
    const t = o, v = q, n = x(o, "modelValue"), u = x(o, "id"), i = s([]), D = s(!1), M = s(0), w = s(), h = s(!1), p = s(), P = ce(), { isLoading: V, startLoading: H, endLoading: N } = de(), b = s(null), r = computed({
      get() {
        return t.withoutObject ? n.value : n.value?.[t.optionLabelProperty];
      },
      set(e) {
        t.withoutObject ? n.value = typeof e == "string" ? e : e[t.optionLabelProperty] : n.value = e;
      }
    });
    async function L(e) {
      w.value = e.query;
      const a = {
        name: e.query,
        offset: e.offset || 0,
        limit: e.limit,
        only_id: e.onlyId ? 1 : 0
      };
      if (typeof t.ajaxParams == "object")
        for (const l in t.ajaxParams)
          a[l] = t.ajaxParams[l];
      else typeof t.ajaxParams == "function" && t.ajaxParams(a);
      let f;
      if (t.url) {
        let l;
        typeof t.url == "function" ? l = t.url() : l = t.url, typeof l == "string" ? f = P.get(l, { params: a }) : f = P.request({ ...l, params: a });
      } else
        f = new Promise((l) => {
          const d = t.options.filter((m) => m[t.optionLabelProperty].includes(a.name) && !(t.hideCurrentOption && m[t.optionLabelProperty].trim() === a.name));
          l({
            data: {
              data: {
                items: d,
                total: d.length,
                hasMore: !1
              }
            }
          });
        });
      return H(), f.then((l) => {
        e.offset ? i.value.push(...l.data.data.items) : i.value.length === 0 && l.data.data.items.length === 0 || (i.value = l.data.data.items), D.value = l.data.data.hasMore, M.value = l.data.data.total, h.value = !1, N();
      });
    }
    function R(e) {
      e && M.value > i.value.length && h.value === !1 && (h.value = !0, L({ query: w.value, offset: i.value.length - 1 }));
    }
    function W(e) {
      v("itemSelected", e.value), t.useIdModel && (u.value = e.value[t.optionIdProperty]), t.noManualInput && (r.value = e.value);
    }
    function z() {
    }
    function k() {
      p.value?.$refs.focusInput.$el.focus();
    }
    function F() {
      const e = p.value?.$refs.focusInput.$el;
      e.selectionStart = e.selectionEnd;
      const a = e.value.length;
      e.setSelectionRange(a, a), e.focus();
    }
    function K(e) {
      v("containerDblClick", e), t.clearOnDblClick && T();
    }
    watch(
      () => r.value,
      (e) => {
        t.noManualInput && (b.value = e);
      },
      {
        immediate: !0,
        deep: !0
      }
    );
    function U(e) {
      t.noManualInput ? b.value = e : r.value = e;
    }
    function Q(e) {
      v("blur", e), t.noManualInput && n.value && (b.value = t.withoutObject ? n.value : n.value?.[t.optionLabelProperty]);
    }
    function G(e) {
      p.value.overlayVisible || v("keydown", e), e.code === "Enter" && t.noManualInput && b.value === "" && (n.value = null, t.useIdModel && (u.value = null));
    }
    function J(e = !0) {
      p.value.show(e);
    }
    function X(e = !0) {
      p.value.hide(e);
    }
    watch(
      () => u.value,
      () => {
        if (t.useIdModel) {
          if (n.value?.[t.optionIdProperty] === u.value)
            return;
          let e = i.value.find((a) => a[t.optionIdProperty] === u.value);
          e ? r.value = e : L({ query: `${u.value}`, limit: 1, onlyId: !0 }).then(() => {
            e = i.value.find((a) => a[t.optionIdProperty] === u.value), nextTick(() => {
              e && (r.value = e);
            });
          });
        }
      },
      {
        immediate: !0
      }
    );
    function T() {
      t.useIdModel && (u.value = null), n.value = null, nextTick(() => {
        setTimeout(k, 50);
      }), v("cleared");
    }
    function j(e) {
      return t.formatter ? t.formatter(e) : e[t.optionLabelProperty];
    }
    const { exposed: Y, baseInputForwardedProps: Z, fieldUniqueId: _, generalInputProps: ee } = re(t);
    return O({
      focus: k,
      deselectAndMoveCaretToEnd: F,
      showList: J,
      hideList: X,
      ...Y
    }), (e, a) => {
      const f = S("Button"), l = S("AutoComplete");
      return I(), $(pe, oe(le(c(Z))), ae({
        labelText: y(() => [
          g(e.$slots, "label-text")
        ]),
        default: y(() => [
          ne(l, ie(c(ee), {
            ref_key: "inputRef",
            ref: p,
            "input-id": c(_),
            "show-empty-message": !o.hideListWhenEmpty,
            "model-value": o.noManualInput ? b.value : c(r),
            class: ["!w-full", o.autoCompleteClass],
            placeholder: o.placeholder,
            "input-class": o.inputClass,
            "panel-class": o.panelClass,
            suggestions: i.value,
            "option-label": o.optionLabelProperty,
            "auto-option-focus": "",
            "complete-on-focus": o.searchOnFocus && !o.dropdown,
            "scroll-height": "18rem",
            "force-selection": o.noManualInput,
            pt: {
              pcInput: { root: { name: o.name } }
            },
            loading: h.value || c(V),
            dropdown: o.dropdown,
            "dropdown-mode": o.dropdownMode,
            onDblclick: K,
            "onUpdate:modelValue": U,
            onBlur: Q,
            onItemSelect: W,
            onInput: z,
            onComplete: L,
            onKeydown: G
          }), {
            option: y(({ option: d, index: m }) => [
              m + 1 === i.value.length ? ue((I(), C("span", me, [
                g(e.$slots, "option", {
                  option: { option: d, index: m }
                }, () => [
                  B("div", {
                    innerHTML: j(d)
                  }, null, 8, ye)
                ])
              ])), [
                [c(se), R]
              ]) : (I(), C("span", ve, [
                g(e.$slots, "option", {
                  option: { option: d, index: m }
                }, () => [
                  B("div", {
                    innerHTML: j(d)
                  }, null, 8, he)
                ])
              ]))
            ]),
            footer: y(() => [
              B("div", be, [
                h.value ? (I(), C("i", Ie)) : A("", !0)
              ])
            ]),
            _: 3
          }, 16, ["input-id", "show-empty-message", "model-value", "class", "placeholder", "input-class", "panel-class", "suggestions", "option-label", "complete-on-focus", "force-selection", "pt", "loading", "dropdown", "dropdown-mode"])
        ]),
        _: 2
      }, [
        e.$slots.addon || o.clearable ? {
          name: "addon",
          fn: y(() => [
            o.clearable && c(r) ? (I(), $(f, {
              key: 0,
              disabled: o.disabled,
              size: "small",
              severity: "danger",
              icon: "i-mdi-times",
              onClick: T
            }, null, 8, ["disabled"])) : A("", !0),
            g(e.$slots, "addon")
          ]),
          key: "0"
        } : void 0,
        e.$slots.helper || o.helperText ? {
          name: "helper",
          fn: y(() => [
            g(e.$slots, "helper", {}, () => [
              B("div", { innerHTML: o.helperText }, null, 8, fe)
            ])
          ]),
          key: "1"
        } : void 0
      ]), 1040);
    };
  }
});
export {
  Pe as _
};
