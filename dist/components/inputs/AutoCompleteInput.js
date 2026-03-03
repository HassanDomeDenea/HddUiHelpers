import { defineComponent as le, useModel as S, ref as s, computed as ae, watch as $, nextTick as x, resolveComponent as A, openBlock as b, createBlock as E, normalizeProps as ne, guardReactiveProps as ie, unref as I, createSlots as ue, withCtx as m, createVNode as se, mergeProps as re, createElementVNode as B, createElementBlock as C, createCommentVNode as O, withDirectives as de, renderSlot as g, mergeModels as q } from "vue";
import { vElementVisibility as ce } from "@vueuse/components";
import { useHddBaseInputUtils as pe } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { useLoader as fe } from "HddUiHelpers/composables/loader.ts";
import { useApiClient as me } from "HddUiHelpers/stores/apiClient.ts";
import { _ as ye } from "../../BaseInput.vue_vue_type_script_setup_true_lang-C8yTwTDa.js";
const ve = ["innerHTML"], he = { key: 0 }, be = ["innerHTML"], Ie = { key: 1 }, ge = ["innerHTML"], Be = { class: "flex justify-center" }, Le = {
  key: 0,
  class: "i-mdi-loading mx-auto my-1 animate-spin"
}, je = /* @__PURE__ */ le({
  __name: "AutoCompleteInput",
  props: /* @__PURE__ */ q({
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
  emits: /* @__PURE__ */ q(["containerDblClick", "keydown", "blur", "itemSelected", "cleared"], ["update:modelValue", "update:id"]),
  setup(o, { expose: D, emit: V }) {
    const t = o, y = V, n = S(o, "modelValue"), u = S(o, "id"), i = s([]), H = s(!1), M = s(0), w = s(), v = s(!1), c = s(), P = me(), { isLoading: N, startLoading: R, endLoading: W } = fe(), h = s(null), r = ae({
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
      let p;
      if (t.url) {
        let l;
        typeof t.url == "function" ? l = t.url() : l = t.url, typeof l == "string" ? p = P.get(l, { params: a }) : p = P.request({ ...l, params: a });
      } else
        p = new Promise((l) => {
          const d = t.options.filter((f) => f[t.optionLabelProperty].includes(a.name) && !(t.hideCurrentOption && f[t.optionLabelProperty].trim() === a.name));
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
      return R(), p.then((l) => {
        e.offset ? i.value.push(...l.data.data.items) : i.value.length === 0 && l.data.data.items.length === 0 || (i.value = l.data.data.items), H.value = l.data.data.hasMore, M.value = l.data.data.total, v.value = !1, W();
      });
    }
    function z(e) {
      e && M.value > i.value.length && v.value === !1 && (v.value = !0, L({ query: w.value, offset: i.value.length - 1 }));
    }
    function F(e) {
      y("itemSelected", e.value), t.useIdModel && (u.value = e.value[t.optionIdProperty]), t.noManualInput && (r.value = e.value);
    }
    function K() {
    }
    function k() {
      c.value?.$refs.focusInput.$el.focus();
    }
    function U() {
      const e = c.value?.$refs.focusInput.$el;
      e.selectionStart = e.selectionEnd;
      const a = e.value.length;
      e.setSelectionRange(a, a), e.focus();
    }
    function Q(e) {
      y("containerDblClick", e), t.clearOnDblClick && T();
    }
    $(
      () => r.value,
      (e) => {
        t.noManualInput && (h.value = e);
      },
      {
        immediate: !0,
        deep: !0
      }
    );
    function G(e) {
      t.noManualInput ? h.value = e : r.value = e;
    }
    function J(e) {
      y("blur", e), t.noManualInput && n.value && (h.value = t.withoutObject ? n.value : n.value?.[t.optionLabelProperty]);
    }
    function X(e) {
      c.value.overlayVisible || y("keydown", e), e.code === "Enter" && t.noManualInput && h.value === "" && (n.value = null, t.useIdModel && (u.value = null));
    }
    function Y(e = !0) {
      c.value.show(e);
    }
    function Z(e = !0) {
      c.value.hide(e);
    }
    $(
      () => u.value,
      () => {
        if (t.useIdModel) {
          if (n.value?.[t.optionIdProperty] === u.value)
            return;
          let e = i.value.find((a) => a[t.optionIdProperty] === u.value);
          e ? r.value = e : L({ query: `${u.value}`, limit: 1, onlyId: !0 }).then(() => {
            e = i.value.find((a) => a[t.optionIdProperty] === u.value), x(() => {
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
      t.useIdModel && (u.value = null), n.value = null, x(() => {
        setTimeout(k, 50);
      }), y("cleared");
    }
    function j(e) {
      return t.formatter ? t.formatter(e) : e[t.optionLabelProperty];
    }
    const { exposed: _, baseInputForwardedProps: ee, fieldUniqueId: te, generalInputProps: oe } = pe(t);
    return D({
      focus: k,
      deselectAndMoveCaretToEnd: U,
      showList: Y,
      hideList: Z,
      ..._
    }), (e, a) => {
      const p = A("Button"), l = A("AutoComplete");
      return b(), E(ye, ne(ie(I(ee))), ue({
        labelText: m(() => [
          g(e.$slots, "label-text")
        ]),
        default: m(() => [
          se(l, re(I(oe), {
            ref_key: "inputRef",
            ref: c,
            "input-id": I(te),
            "show-empty-message": !o.hideListWhenEmpty,
            "model-value": o.noManualInput ? h.value : r.value,
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
            loading: v.value || I(N),
            dropdown: o.dropdown,
            "dropdown-mode": o.dropdownMode,
            onDblclick: Q,
            "onUpdate:modelValue": G,
            onBlur: J,
            onItemSelect: F,
            onInput: K,
            onComplete: L,
            onKeydown: X
          }), {
            option: m(({ option: d, index: f }) => [
              f + 1 === i.value.length ? de((b(), C("span", he, [
                g(e.$slots, "option", {
                  option: { option: d, index: f }
                }, () => [
                  B("div", {
                    innerHTML: j(d)
                  }, null, 8, be)
                ])
              ])), [
                [I(ce), z]
              ]) : (b(), C("span", Ie, [
                g(e.$slots, "option", {
                  option: { option: d, index: f }
                }, () => [
                  B("div", {
                    innerHTML: j(d)
                  }, null, 8, ge)
                ])
              ]))
            ]),
            footer: m(() => [
              B("div", Be, [
                v.value ? (b(), C("i", Le)) : O("", !0)
              ])
            ]),
            _: 3
          }, 16, ["input-id", "show-empty-message", "model-value", "class", "placeholder", "input-class", "panel-class", "suggestions", "option-label", "complete-on-focus", "force-selection", "pt", "loading", "dropdown", "dropdown-mode"])
        ]),
        _: 2
      }, [
        e.$slots.addon || o.clearable ? {
          name: "addon",
          fn: m(() => [
            o.clearable && r.value ? (b(), E(p, {
              key: 0,
              disabled: o.disabled,
              size: "small",
              severity: "danger",
              icon: "i-mdi-times",
              onClick: T
            }, null, 8, ["disabled"])) : O("", !0),
            g(e.$slots, "addon")
          ]),
          key: "0"
        } : void 0,
        e.$slots.helper || o.helperText ? {
          name: "helper",
          fn: m(() => [
            g(e.$slots, "helper", {}, () => [
              B("div", { innerHTML: o.helperText }, null, 8, ve)
            ])
          ]),
          key: "1"
        } : void 0
      ]), 1040);
    };
  }
});
export {
  je as default
};
