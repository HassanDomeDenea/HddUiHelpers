import _ from "primevue/multiselect";
import { defineComponent as ee, useModel as k, ref as p, useTemplateRef as le, computed as te, watch as ae, nextTick as M, openBlock as h, createBlock as oe, mergeProps as C, unref as s, createSlots as ne, withCtx as d, createVNode as ie, createElementVNode as y, createElementBlock as w, createCommentVNode as $, withDirectives as re, renderSlot as b, mergeModels as A } from "vue";
import { vElementVisibility as ue } from "@vueuse/components";
import { useHddBaseInputUtils as se } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { useApiClient as de } from "HddUiHelpers/stores/apiClient.ts";
import { get as j } from "lodash-es";
import { _ as fe } from "./BaseInput.vue_vue_type_script_setup_true_lang-Ca5DqyVP.js";
import { useI18n as me } from "vue-i18n";
const ce = ["innerHTML"], pe = {
  key: 0,
  class: "flex justify-center"
}, ye = ["innerHTML"], be = ["aria-labelledby", "data-value"], he = ["innerHTML"], ve = ["aria-labelledby", "data-value"], ge = ["innerHTML"], Le = { class: "flex justify-center" }, Be = {
  key: 0,
  class: "i-mdi-loading mx-auto my-1 animate-spin"
}, Me = /* @__PURE__ */ ee({
  __name: "InfiniteMultiSelectInput",
  props: /* @__PURE__ */ A({
    url: {},
    disabled: { type: Boolean },
    searchOnFocus: { type: Boolean, default: !0 },
    optionLabelProperty: { default: "name" },
    optionValueProperty: { default: "id" },
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
    resetFilterOnHide: { type: Boolean },
    display: { default: "comma" },
    maxSelectedLabels: { default: 5 },
    selectionLimit: {},
    showToggleAll: { type: Boolean, default: !0 },
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
  setup(n, { expose: q, emit: H }) {
    const l = n, f = H, { t: F } = me(), u = k(n, "item"), v = k(n, "modelValue"), E = de(), r = p([]), P = p(0), x = p(), g = p(!1), S = p(!1), V = p(!1);
    async function L(e) {
      x.value = e.query || "";
      const o = {
        name: e.query || "",
        offset: e.offset || 0,
        limit: e.limit,
        only_id: e.onlyId ? 1 : 0,
        multiple_ids: e.multipleIds ? 1 : 0
      };
      if (typeof l.ajaxParams == "object")
        for (const i in l.ajaxParams)
          o[i] = l.ajaxParams[i];
      else typeof l.ajaxParams == "function" && l.ajaxParams(o);
      return E.request({
        method: "get",
        ...typeof l.url == "string" ? { url: l.url } : l.url,
        params: o
      }).then((i) => {
        e.offset ? r.value.push(...i.data.data.items) : r.value = i.data.data.items, P.value = i.data.data.total, g.value = !1, S.value = !1;
      });
    }
    function I(e) {
      e && P.value > r.value.length && g.value === !1 && (g.value = !0, L({ query: x.value, offset: r.value.length - 1 }));
    }
    const m = le("inputRef");
    function T(e = !1) {
      l.disabled || (e ? m.value.show() : m.value.$refs.focusInput.focus());
    }
    function O(e) {
      (!m.value).overlayVisible && f("keydown", e);
    }
    function D(e) {
      l.onKeydown && e.code === "Enter" && m.value?.hide(), f("keydown", e);
    }
    function K(e) {
      f("blur", e);
    }
    const N = te(() => r.value.length > 0 ? Object.keys(r.value[0]) : l.filterFields ?? []);
    ae(
      () => v.value,
      (e) => {
        if (e === null) {
          u.value = null;
          return;
        }
        if (u.value?.length === e.length && u.value?.every(
          (t, a) => t[l.optionValueProperty] === e[a]
        ))
          return;
        const o = new Array(e.length), i = [];
        e.forEach((t, a) => {
          const c = r.value.find((Z) => Z[l.optionValueProperty] === t);
          c ? o[a] = c : i.push({
            id: t,
            index: a
          });
        }), i.length > 0 ? (V.value = !0, L({
          query: i.map((t) => t.id),
          limit: i.length,
          onlyId: !0,
          multipleIds: !0
        }).then(() => {
          M(() => {
            i.forEach((t) => {
              const a = r.value.find(
                (c) => c[l.optionValueProperty] === t.id
              );
              a && (o[t.index] = a);
            }), u.value = o;
          }), V.value = !1;
        })) : u.value = o;
      },
      {
        deep: !0,
        immediate: !0
      }
    );
    function R() {
      l.useIdModel && (v.value = null), u.value = null, M(() => {
        setTimeout(T, 50);
      }), f("cleared");
    }
    function B(e, o) {
      return e ? l.optionLabelFormatter ? l.optionLabelFormatter(e, o) : l.optionAndValueLabelFormatter ? l.optionAndValueLabelFormatter(e) : e[l.optionLabelProperty] ?? "&nbsp;" : "&nbsp;";
    }
    function U(e, o) {
      const i = o ? `<span class="text-muted px-2">${o}</span>` : void 0;
      return !e || e.length < 1 ? i ?? "&nbsp;" : e.length > l.maxSelectedLabels ? `${e.length} ${F("multiSelectItemsSelectedLabel")}` : e.map((t) => {
        const a = u.value?.find((c) => c[l.optionValueProperty] === t);
        return a ? l.valueLabelFormatter ? l.valueLabelFormatter(a, o) ?? "---" : l.optionAndValueLabelFormatter ? l.optionAndValueLabelFormatter(a) ?? "---" : a?.[l.optionLabelProperty] ?? "---" : "---";
      });
    }
    function W() {
      S.value = !0, L({});
    }
    function z(e) {
      v.value = e.value, f("itemSelected", u.value);
    }
    function Q(e) {
      L({ query: e.value });
    }
    const { exposed: G, baseInputForwardedProps: J, fieldUniqueId: X, generalInputProps: Y } = se(l);
    return q({ focus: T, clear: R, selectedItems: u, ...G }), (e, o) => {
      const i = _;
      return h(), oe(fe, C(s(J), {
        onLabelClicked: o[1] || (o[1] = (t) => s(m)?.show())
      }), ne({
        labelText: d(() => [
          b(e.$slots, "label-text")
        ]),
        default: d(() => [
          ie(i, C(s(Y), {
            ref_key: "inputRef",
            ref: m,
            "input-id": s(X),
            name: n.name,
            "model-value": v.value,
            "data-name": n.name,
            placeholder: n.placeholder,
            "auto-filter-focus": !0,
            variant: n.variant,
            "filter-fields": s(N),
            "filter-placeholder": n.filterPlaceholder,
            display: n.display,
            "max-selected-labels": n.maxSelectedLabels,
            "selection-limit": n.selectionLimit,
            "show-toggle-all": n.showToggleAll,
            "auto-option-focus": "",
            "reset-filter-on-hide": "",
            filled: "",
            fluid: "",
            highlightonselect: "",
            filter: "",
            options: r.value,
            "selected-items-label": `{0} ${s(F)("multiSelectItemsSelectedLabel")}`,
            "option-label": n.optionLabelProperty,
            "option-value": n.optionValueProperty,
            "show-clear": n.clearable,
            class: "!w-full",
            "scroll-height": "18rem",
            loading: V.value,
            pt: {
              pcFilter: {
                root: {
                  class: "p-inputtext-sm",
                  onkeydown: O,
                  onblur: K
                }
              }
            },
            onKeydown: D,
            onBeforeShow: W,
            onHide: o[0] || (o[0] = (t) => f("hide")),
            onChange: z,
            onFilter: Q
          }), {
            empty: d(() => [
              S.value ? (h(), w("div", pe, [...o[2] || (o[2] = [
                y("i", { class: "i-mdi-loading mx-auto my-1 animate-spin" }, null, -1)
              ])])) : $("", !0)
            ]),
            value: d(({ value: t, placeholder: a }) => [
              b(e.$slots, "value", {
                value: t,
                placeholder: a
              }, () => [
                y("div", {
                  innerHTML: U(t, a)
                }, null, 8, ye)
              ])
            ]),
            option: d(({ option: t, index: a }) => [
              a + 1 === r.value.length ? re((h(), w("span", {
                key: 0,
                "aria-labelledby": B(t, a),
                "data-value": s(j)(t, n.optionValueProperty)
              }, [
                b(e.$slots, "option", {
                  option: { option: t, index: a }
                }, () => [
                  y("div", {
                    innerHTML: B(t, a)
                  }, null, 8, he)
                ])
              ], 8, be)), [
                [s(ue), I]
              ]) : (h(), w("span", {
                key: 1,
                "aria-labelledby": B(t, a),
                "data-value": s(j)(t, n.optionValueProperty)
              }, [
                b(e.$slots, "option", {
                  option: { option: t, index: a }
                }, () => [
                  y("div", {
                    innerHTML: B(t, a)
                  }, null, 8, ge)
                ])
              ], 8, ve))
            ]),
            footer: d(() => [
              y("div", Le, [
                g.value ? (h(), w("i", Be)) : $("", !0)
              ])
            ]),
            _: 3
          }, 16, ["input-id", "name", "model-value", "data-name", "placeholder", "variant", "filter-fields", "filter-placeholder", "display", "max-selected-labels", "selection-limit", "show-toggle-all", "options", "selected-items-label", "option-label", "option-value", "show-clear", "loading", "pt"])
        ]),
        _: 2
      }, [
        e.$slots.addon ? {
          name: "addon",
          fn: d(() => [
            b(e.$slots, "addon")
          ]),
          key: "0"
        } : void 0,
        e.$slots.helper || n.helperText ? {
          name: "helper",
          fn: d(() => [
            b(e.$slots, "helper", {}, () => [
              y("div", { innerHTML: n.helperText }, null, 8, ce)
            ])
          ]),
          key: "1"
        } : void 0
      ]), 1040);
    };
  }
});
export {
  Me as _
};
