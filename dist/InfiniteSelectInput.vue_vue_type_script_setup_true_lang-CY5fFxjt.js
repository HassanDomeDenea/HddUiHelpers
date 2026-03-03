import { defineComponent as X, useModel as V, ref as m, computed as T, useTemplateRef as Y, watch as Z, nextTick as I, openBlock as b, createBlock as ee, mergeProps as C, unref as n, createSlots as le, withCtx as f, createVNode as te, createElementVNode as v, createElementBlock as g, createCommentVNode as M, withDirectives as ae, renderSlot as y, mergeModels as A } from "vue";
import { vElementVisibility as oe } from "@vueuse/components";
import { useHddBaseInputUtils as ne } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { useApiClient as ie } from "HddUiHelpers/stores/apiClient.ts";
import { get as x } from "lodash-es";
import re from "primevue/select";
import { _ as ue } from "./BaseInput.vue_vue_type_script_setup_true_lang-Ca5DqyVP.js";
const se = ["innerHTML"], de = {
  key: 0,
  class: "flex justify-center"
}, fe = ["innerHTML"], pe = ["aria-labelledby", "data-value"], ce = ["innerHTML"], me = ["aria-labelledby", "data-value"], ve = ["innerHTML"], ye = { class: "flex justify-center" }, be = {
  key: 0,
  class: "i-mdi-loading mx-auto my-1 animate-spin"
}, ke = /* @__PURE__ */ X({
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
  setup(u, { expose: $, emit: j }) {
    const l = u, p = j, o = V(u, "item"), i = V(u, "modelValue"), q = ie(), r = m([]), k = m(0), P = m(), h = m(!1), w = m(!1), F = m(!1), d = T(
      () => l.valueSameAsLabel ? l.optionLabelProperty : l.optionValueProperty
    );
    async function L(e) {
      P.value = e.query || "";
      const a = {
        name: e.query || "",
        offset: e.offset || 0,
        limit: e.limit,
        only_id: e.onlyId ? 1 : 0,
        id_field: d.value
      };
      if (typeof l.ajaxParams == "object")
        for (const t in l.ajaxParams)
          a[t] = l.ajaxParams[t];
      else typeof l.ajaxParams == "function" && l.ajaxParams(a);
      return q.request({
        // method: 'get',
        ...typeof l.url == "string" ? { url: l.url } : l.url,
        params: a
      }).then((t) => {
        e.offset ? r.value.push(...t.data.data.items) : r.value = t.data.data.items, k.value = t.data.data.total, h.value = !1, w.value = !1;
      });
    }
    function H(e) {
      e && k.value > r.value.length && h.value === !1 && (h.value = !0, L({ query: P.value, offset: r.value.length - 1 }));
    }
    const c = Y("inputRef");
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
    const K = T(() => r.value.length > 0 ? Object.keys(r.value[0]) : l.filterFields ?? []);
    Z(
      () => i.value,
      () => {
        if (i.value === null && (o.value = null), o.value?.[d.value] === i.value)
          return;
        let e = r.value.find(
          (a) => a[d.value] === i.value
        );
        e ? o.value = e : l.valueSameAsLabel ? I(() => {
          o.value = {
            [d.value]: i.value,
            [l.optionLabelProperty]: i.value
          };
        }) : (F.value = !0, L({ query: `${i.value}`, limit: 1, onlyId: !0 }).then(() => {
          e = r.value.find(
            (a) => a[d.value] === i.value
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
      l.useIdModel && (i.value = null), o.value = null, I(() => {
        setTimeout(S, 50);
      }), p("cleared");
    }
    function B(e, a) {
      return l.optionLabelFormatter ? l.optionLabelFormatter(e, a) : l.optionAndValueLabelFormatter ? l.optionAndValueLabelFormatter(e) : e[l.optionLabelProperty] ?? "&nbsp;";
    }
    function R(e, a) {
      const t = a ? `<span class="text-muted px-2">${a}</span>` : void 0;
      return o.value ? l.valueLabelFormatter ? l.valueLabelFormatter(o.value, a) ?? t ?? "&nbsp;" : l.optionAndValueLabelFormatter ? l.optionAndValueLabelFormatter(o.value) ?? t ?? "&nbsp;" : o.value[l.optionLabelProperty] ?? t ?? e ?? "&nbsp;" : t ?? "&nbsp;";
    }
    function _() {
      w.value = !0, L({});
    }
    function U(e) {
      i.value = e.value, o.value = r.value.find((a) => a[d.value] === e.value) || null, p("itemSelected", o.value);
    }
    function W(e) {
      L({ query: e.value });
    }
    const { exposed: z, baseInputForwardedProps: Q, fieldUniqueId: G, generalInputProps: J } = ne(l);
    return $({ focus: S, ...z, clear: N, disabled: l.disabled, selectedItem: o }), (e, a) => (b(), ee(ue, C(n(Q), {
      "control-component": { selectedItem: o.value },
      onLabelClicked: a[1] || (a[1] = (t) => n(c)?.show())
    }), le({
      labelText: f(() => [
        y(e.$slots, "label-text")
      ]),
      default: f(() => [
        te(n(re), C(n(J), {
          ref_key: "inputRef",
          ref: c,
          "input-id": n(G),
          "model-value": i.value,
          placeholder: u.placeholder,
          filter: !0,
          "filter-fields": n(K),
          "filter-placeholder": u.filterPlaceholder,
          loading: F.value,
          "auto-option-focus": "",
          "auto-filter-focus": !0,
          "reset-filter-on-hide": "",
          checkmark: "",
          options: r.value,
          "show-clear": u.clearable,
          "option-label": u.optionLabelProperty,
          "option-value": n(d),
          "option-disabled": u.optionDisabledProperty,
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
          onBeforeShow: _,
          onHide: a[0] || (a[0] = (t) => p("hide")),
          onChange: U,
          onFilter: W
        }), {
          empty: f(() => [
            w.value ? (b(), g("div", de, [...a[2] || (a[2] = [
              v("i", { class: "i-mdi-loading mx-auto my-1 animate-spin" }, null, -1)
            ])])) : M("", !0)
          ]),
          value: f(({ value: t, placeholder: s }) => [
            y(e.$slots, "value", {
              value: { value: t, placeholder: s }
            }, () => [
              v("div", {
                innerHTML: R(t, s)
              }, null, 8, fe)
            ])
          ]),
          option: f(({ option: t, index: s }) => [
            s + 1 === r.value.length ? ae((b(), g("span", {
              key: 0,
              "aria-labelledby": B(t, s),
              "data-value": n(x)(t, n(d))
            }, [
              y(e.$slots, "option", {
                option: { option: t, index: s }
              }, () => [
                v("div", {
                  innerHTML: B(t, s)
                }, null, 8, ce)
              ])
            ], 8, pe)), [
              [n(oe), H]
            ]) : (b(), g("span", {
              key: 1,
              "aria-labelledby": B(t, s),
              "data-value": n(x)(t, n(d))
            }, [
              y(e.$slots, "option", {
                option: { option: t, index: s }
              }, () => [
                v("div", {
                  innerHTML: B(t, s)
                }, null, 8, ve)
              ])
            ], 8, me))
          ]),
          footer: f(() => [
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
        fn: f(() => [
          y(e.$slots, "addon")
        ]),
        key: "0"
      } : void 0,
      e.$slots.helper || u.helperText ? {
        name: "helper",
        fn: f(() => [
          y(e.$slots, "helper", {}, () => [
            v("div", { innerHTML: u.helperText }, null, 8, se)
          ])
        ]),
        key: "1"
      } : void 0
    ]), 1040, ["control-component"]));
  }
});
export {
  ke as _
};
