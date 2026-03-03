import { defineComponent as Y, useModel as V, ref as m, computed as T, useTemplateRef as Z, watch as _, nextTick as I, openBlock as b, createBlock as ee, mergeProps as C, unref as f, createSlots as le, withCtx as d, createVNode as ae, createElementVNode as v, createElementBlock as g, createCommentVNode as M, withDirectives as te, renderSlot as y, mergeModels as A } from "vue";
import { vElementVisibility as oe } from "@vueuse/components";
import { useHddBaseInputUtils as ne } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { useApiClient as ie } from "HddUiHelpers/stores/apiClient.ts";
import { get as x } from "lodash-es";
import re from "primevue/select";
import { _ as ue } from "../../BaseInput.vue_vue_type_script_setup_true_lang-C8yTwTDa.js";
const se = ["innerHTML"], de = {
  key: 0,
  class: "flex justify-center"
}, fe = ["innerHTML"], pe = ["aria-labelledby", "data-value"], ce = ["innerHTML"], me = ["aria-labelledby", "data-value"], ve = ["innerHTML"], ye = { class: "flex justify-center" }, be = {
  key: 0,
  class: "i-mdi-loading mx-auto my-1 animate-spin"
}, ke = /* @__PURE__ */ Y({
  __name: "InfiniteSelectInput",
  props: /* @__PURE__ */ A({
    url: {},
    disabled: { type: Boolean },
    searchOnFocus: { type: Boolean, default: !0 },
    optionLabelProperty: { default: "name" },
    optionValueProperty: { default: "id" },
    optionDisabledProperty: { default: "disabled" },
    helperText: {},
    withoutObject: { type: Boolean, default: !1 },
    noManualInput: { type: Boolean, default: !1 },
    filterPlaceholder: {},
    filterFields: {},
    useIdModel: { type: Boolean, default: !1 },
    clearable: { type: Boolean, default: !1 },
    clearOnDblClick: { type: Boolean, default: !1 },
    inputClass: { default: "w-full" },
    ajaxParams: {},
    autoCompleteClass: { default: "" },
    optionLabelFormatter: {},
    valueLabelFormatter: {},
    onKeydown: {},
    optionAndValueLabelFormatter: {},
    valueSameAsLabel: { type: Boolean },
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
    item: {
      default: null
    },
    itemModifiers: {},
    modelValue: { default: null },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ A(["keydown", "blur", "hide", "cleared", "itemSelected"], ["update:item", "update:modelValue"]),
  setup(r, { expose: $, emit: j }) {
    const l = r, p = j, o = V(r, "item"), n = V(r, "modelValue"), q = ie(), i = m([]), k = m(0), P = m(), h = m(!1), w = m(!1), F = m(!1), s = T(
      () => l.valueSameAsLabel ? l.optionLabelProperty : l.optionValueProperty
    );
    async function L(e) {
      P.value = e.query || "";
      const t = {
        name: e.query || "",
        offset: e.offset || 0,
        limit: e.limit,
        only_id: e.onlyId ? 1 : 0,
        id_field: s.value
      };
      if (typeof l.ajaxParams == "object")
        for (const a in l.ajaxParams)
          t[a] = l.ajaxParams[a];
      else typeof l.ajaxParams == "function" && l.ajaxParams(t);
      return q.request({
        // method: 'get',
        ...typeof l.url == "string" ? { url: l.url } : l.url,
        params: t
      }).then((a) => {
        e.offset ? i.value.push(...a.data.data.items) : i.value = a.data.data.items, k.value = a.data.data.total, h.value = !1, w.value = !1;
      });
    }
    function H(e) {
      e && k.value > i.value.length && h.value === !1 && (h.value = !0, L({ query: P.value, offset: i.value.length - 1 }));
    }
    const c = Z("inputRef");
    function S(e = !1) {
      l.disabled || (e ? c.value?.show() : c.value?.$refs.focusInput.focus());
    }
    function D(e) {
      (!c.value).overlayVisible && p("keydown", e);
    }
    function O(e) {
      l.onKeydown && e.code === "Enter" && c.value?.hide(), p("keydown", e);
    }
    function E(e) {
      p("blur", e);
    }
    const K = T(() => i.value.length > 0 ? Object.keys(i.value[0]) : l.filterFields ?? []);
    _(
      () => n.value,
      () => {
        if (n.value === null && (o.value = null), o.value?.[s.value] === n.value)
          return;
        let e = i.value.find(
          (t) => t[s.value] === n.value
        );
        e ? o.value = e : l.valueSameAsLabel ? I(() => {
          o.value = {
            [s.value]: n.value,
            [l.optionLabelProperty]: n.value
          };
        }) : (F.value = !0, L({ query: `${n.value}`, limit: 1, onlyId: !0 }).then(() => {
          e = i.value.find(
            (t) => t[s.value] === n.value
          ), I(() => {
            e && (o.value = e);
          }), F.value = !1;
        }));
      },
      {
        immediate: !0
      }
    );
    function N() {
      l.useIdModel && (n.value = null), o.value = null, I(() => {
        setTimeout(S, 50);
      }), p("cleared");
    }
    function B(e, t) {
      return l.optionLabelFormatter ? l.optionLabelFormatter(e, t) : l.optionAndValueLabelFormatter ? l.optionAndValueLabelFormatter(e) : e[l.optionLabelProperty] ?? "&nbsp;";
    }
    function R(e, t) {
      const a = t ? `<span class="text-muted px-2">${t}</span>` : void 0;
      return o.value ? l.valueLabelFormatter ? l.valueLabelFormatter(o.value, t) ?? a ?? "&nbsp;" : l.optionAndValueLabelFormatter ? l.optionAndValueLabelFormatter(o.value) ?? a ?? "&nbsp;" : o.value[l.optionLabelProperty] ?? a ?? e ?? "&nbsp;" : a ?? "&nbsp;";
    }
    function U() {
      w.value = !0, L({});
    }
    function W(e) {
      n.value = e.value, o.value = i.value.find((t) => t[s.value] === e.value) || null, p("itemSelected", o.value);
    }
    function z(e) {
      L({ query: e.value });
    }
    const { exposed: Q, baseInputForwardedProps: G, fieldUniqueId: J, generalInputProps: X } = ne(l);
    return $({ focus: S, ...Q, clear: N, disabled: l.disabled, selectedItem: o }), (e, t) => (b(), ee(ue, C(f(G), {
      "control-component": { selectedItem: o.value },
      onLabelClicked: t[1] || (t[1] = (a) => c.value?.show())
    }), le({
      labelText: d(() => [
        y(e.$slots, "label-text")
      ]),
      default: d(() => [
        ae(f(re), C(f(X), {
          ref_key: "inputRef",
          ref: c,
          "input-id": f(J),
          "model-value": n.value,
          placeholder: r.placeholder,
          filter: !0,
          "filter-fields": K.value,
          "filter-placeholder": r.filterPlaceholder,
          loading: F.value,
          "auto-option-focus": "",
          "auto-filter-focus": !0,
          "reset-filter-on-hide": "",
          checkmark: "",
          options: i.value,
          "show-clear": r.clearable,
          "option-label": r.optionLabelProperty,
          "option-value": s.value,
          "option-disabled": r.optionDisabledProperty,
          "scroll-height": "18rem",
          pt: {
            pcFilter: {
              root: {
                class: "p-inputtext-sm",
                onkeydown: D,
                onblur: E
              }
            }
          },
          onKeydown: O,
          onBeforeShow: U,
          onHide: t[0] || (t[0] = (a) => p("hide")),
          onChange: W,
          onFilter: z
        }), {
          empty: d(() => [
            w.value ? (b(), g("div", de, [...t[2] || (t[2] = [
              v("i", { class: "i-mdi-loading mx-auto my-1 animate-spin" }, null, -1)
            ])])) : M("", !0)
          ]),
          value: d(({ value: a, placeholder: u }) => [
            y(e.$slots, "value", {
              value: { value: a, placeholder: u }
            }, () => [
              v("div", {
                innerHTML: R(a, u)
              }, null, 8, fe)
            ])
          ]),
          option: d(({ option: a, index: u }) => [
            u + 1 === i.value.length ? te((b(), g("span", {
              key: 0,
              "aria-labelledby": B(a, u),
              "data-value": f(x)(a, s.value)
            }, [
              y(e.$slots, "option", {
                option: { option: a, index: u }
              }, () => [
                v("div", {
                  innerHTML: B(a, u)
                }, null, 8, ce)
              ])
            ], 8, pe)), [
              [f(oe), H]
            ]) : (b(), g("span", {
              key: 1,
              "aria-labelledby": B(a, u),
              "data-value": f(x)(a, s.value)
            }, [
              y(e.$slots, "option", {
                option: { option: a, index: u }
              }, () => [
                v("div", {
                  innerHTML: B(a, u)
                }, null, 8, ve)
              ])
            ], 8, me))
          ]),
          footer: d(() => [
            v("div", ye, [
              h.value ? (b(), g("i", be)) : M("", !0)
            ])
          ]),
          _: 3
        }, 16, ["input-id", "model-value", "placeholder", "filter-fields", "filter-placeholder", "loading", "options", "show-clear", "option-label", "option-value", "option-disabled", "pt"])
      ]),
      _: 2
    }, [
      e.$slots.addon ? {
        name: "addon",
        fn: d(() => [
          y(e.$slots, "addon")
        ]),
        key: "0"
      } : void 0,
      e.$slots.helper || r.helperText ? {
        name: "helper",
        fn: d(() => [
          y(e.$slots, "helper", {}, () => [
            v("div", { innerHTML: r.helperText }, null, 8, se)
          ])
        ]),
        key: "1"
      } : void 0
    ]), 1040, ["control-component"]));
  }
});
export {
  ke as default
};
