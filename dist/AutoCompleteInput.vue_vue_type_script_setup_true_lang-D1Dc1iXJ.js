import oe from "primevue/autocomplete";
import le from "primevue/button";
import { defineComponent as ae, useModel as S, ref as s, computed as ne, watch as $, nextTick as x, openBlock as g, createBlock as E, normalizeProps as ie, guardReactiveProps as ue, unref as c, createSlots as se, withCtx as y, createVNode as re, mergeProps as de, createElementVNode as B, createElementBlock as M, createCommentVNode as O, withDirectives as ce, renderSlot as I, mergeModels as q } from "vue";
import { vElementVisibility as pe } from "@vueuse/components";
import { useHddBaseInputUtils as fe } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { useLoader as me } from "HddUiHelpers/composables/loader.ts";
import { useApiClient as ye } from "HddUiHelpers/stores/apiClient.ts";
import { _ as ve } from "./BaseInput.vue_vue_type_script_setup_true_lang-Ca5DqyVP.js";
const he = ["innerHTML"], be = { key: 0 }, ge = ["innerHTML"], Ie = { key: 1 }, Be = ["innerHTML"], Le = { class: "flex justify-center" }, Me = {
  key: 0,
  class: "i-mdi-loading mx-auto my-1 animate-spin"
}, xe = /* @__PURE__ */ ae({
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
  setup(o, { expose: A, emit: D }) {
    const t = o, v = D, n = S(o, "modelValue"), u = S(o, "id"), i = s([]), V = s(!1), C = s(0), w = s(), h = s(!1), p = s(), P = ye(), { isLoading: H, startLoading: N, endLoading: R } = me(), b = s(null), r = ne({
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
      return N(), f.then((l) => {
        e.offset ? i.value.push(...l.data.data.items) : i.value.length === 0 && l.data.data.items.length === 0 || (i.value = l.data.data.items), V.value = l.data.data.hasMore, C.value = l.data.data.total, h.value = !1, R();
      });
    }
    function W(e) {
      e && C.value > i.value.length && h.value === !1 && (h.value = !0, L({ query: w.value, offset: i.value.length - 1 }));
    }
    function z(e) {
      v("itemSelected", e.value), t.useIdModel && (u.value = e.value[t.optionIdProperty]), t.noManualInput && (r.value = e.value);
    }
    function F() {
    }
    function k() {
      p.value?.$refs.focusInput.$el.focus();
    }
    function K() {
      const e = p.value?.$refs.focusInput.$el;
      e.selectionStart = e.selectionEnd;
      const a = e.value.length;
      e.setSelectionRange(a, a), e.focus();
    }
    function U(e) {
      v("containerDblClick", e), t.clearOnDblClick && T();
    }
    $(
      () => r.value,
      (e) => {
        t.noManualInput && (b.value = e);
      },
      {
        immediate: !0,
        deep: !0
      }
    );
    function Q(e) {
      t.noManualInput ? b.value = e : r.value = e;
    }
    function G(e) {
      v("blur", e), t.noManualInput && n.value && (b.value = t.withoutObject ? n.value : n.value?.[t.optionLabelProperty]);
    }
    function J(e) {
      p.value.overlayVisible || v("keydown", e), e.code === "Enter" && t.noManualInput && b.value === "" && (n.value = null, t.useIdModel && (u.value = null));
    }
    function X(e = !0) {
      p.value.show(e);
    }
    function Y(e = !0) {
      p.value.hide(e);
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
      }), v("cleared");
    }
    function j(e) {
      return t.formatter ? t.formatter(e) : e[t.optionLabelProperty];
    }
    const { exposed: Z, baseInputForwardedProps: _, fieldUniqueId: ee, generalInputProps: te } = fe(t);
    return A({
      focus: k,
      deselectAndMoveCaretToEnd: K,
      showList: X,
      hideList: Y,
      ...Z
    }), (e, a) => {
      const f = le, l = oe;
      return g(), E(ve, ie(ue(c(_))), se({
        labelText: y(() => [
          I(e.$slots, "label-text")
        ]),
        default: y(() => [
          re(l, de(c(te), {
            ref_key: "inputRef",
            ref: p,
            "input-id": c(ee),
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
            loading: h.value || c(H),
            dropdown: o.dropdown,
            "dropdown-mode": o.dropdownMode,
            onDblclick: U,
            "onUpdate:modelValue": Q,
            onBlur: G,
            onItemSelect: z,
            onInput: F,
            onComplete: L,
            onKeydown: J
          }), {
            option: y(({ option: d, index: m }) => [
              m + 1 === i.value.length ? ce((g(), M("span", be, [
                I(e.$slots, "option", {
                  option: { option: d, index: m }
                }, () => [
                  B("div", {
                    innerHTML: j(d)
                  }, null, 8, ge)
                ])
              ])), [
                [c(pe), W]
              ]) : (g(), M("span", Ie, [
                I(e.$slots, "option", {
                  option: { option: d, index: m }
                }, () => [
                  B("div", {
                    innerHTML: j(d)
                  }, null, 8, Be)
                ])
              ]))
            ]),
            footer: y(() => [
              B("div", Le, [
                h.value ? (g(), M("i", Me)) : O("", !0)
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
            o.clearable && c(r) ? (g(), E(f, {
              key: 0,
              disabled: o.disabled,
              size: "small",
              severity: "danger",
              icon: "i-mdi-times",
              onClick: T
            }, null, 8, ["disabled"])) : O("", !0),
            I(e.$slots, "addon")
          ]),
          key: "0"
        } : void 0,
        e.$slots.helper || o.helperText ? {
          name: "helper",
          fn: y(() => [
            I(e.$slots, "helper", {}, () => [
              B("div", { innerHTML: o.helperText }, null, 8, he)
            ])
          ]),
          key: "1"
        } : void 0
      ]), 1040);
    };
  }
});
export {
  xe as _
};
