import { defineComponent as Z, useModel as k, ref as p, resolveComponent as _, openBlock as h, createBlock as ee, mergeProps as M, unref as s, createSlots as le, withCtx as d, createVNode as te, createElementVNode as y, createElementBlock as w, createCommentVNode as C, withDirectives as ae, renderSlot as b, mergeModels as $ } from "vue";
import { vElementVisibility as oe } from "@vueuse/components";
import { useHddBaseInputUtils as ne } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { useApiClient as ie } from "HddUiHelpers/stores/apiClient.ts";
import { get as A } from "lodash-es";
import { _ as re } from "../../BaseInput.vue_vue_type_script_setup_true_lang-DGVI56PE.js";
const ue = ["innerHTML"], se = {
  key: 0,
  class: "flex justify-center"
}, de = ["innerHTML"], fe = ["aria-labelledby", "data-value"], ce = ["innerHTML"], me = ["aria-labelledby", "data-value"], pe = ["innerHTML"], ye = { class: "flex justify-center" }, be = {
  key: 0,
  class: "i-mdi-loading mx-auto my-1 animate-spin"
}, Se = /* @__PURE__ */ Z({
  __name: "InfiniteMultiSelectInput",
  props: /* @__PURE__ */ $({
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
  emits: /* @__PURE__ */ $(["keydown", "blur", "hide", "cleared", "itemSelected"], ["update:item", "update:modelValue"]),
  setup(n, { expose: j, emit: q }) {
    const l = n, f = q, { t: F } = useI18n(), u = k(n, "item"), v = k(n, "modelValue"), H = ie(), r = p([]), x = p(0), P = p(), g = p(!1), S = p(!1), V = p(!1);
    async function L(e) {
      P.value = e.query || "";
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
      return H.request({
        method: "get",
        ...typeof l.url == "string" ? { url: l.url } : l.url,
        params: o
      }).then((i) => {
        e.offset ? r.value.push(...i.data.data.items) : r.value = i.data.data.items, x.value = i.data.data.total, g.value = !1, S.value = !1;
      });
    }
    function E(e) {
      e && x.value > r.value.length && g.value === !1 && (g.value = !0, L({ query: P.value, offset: r.value.length - 1 }));
    }
    const c = useTemplateRef("inputRef");
    function T(e = !1) {
      l.disabled || (e ? c.value.show() : c.value.$refs.focusInput.focus());
    }
    function I(e) {
      (!c.value).overlayVisible && f("keydown", e);
    }
    function O(e) {
      l.onKeydown && e.code === "Enter" && c.value?.hide(), f("keydown", e);
    }
    function D(e) {
      f("blur", e);
    }
    const K = computed(() => r.value.length > 0 ? Object.keys(r.value[0]) : l.filterFields ?? []);
    watch(
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
          const m = r.value.find((Y) => Y[l.optionValueProperty] === t);
          m ? o[a] = m : i.push({
            id: t,
            index: a
          });
        }), i.length > 0 ? (V.value = !0, L({
          query: i.map((t) => t.id),
          limit: i.length,
          onlyId: !0,
          multipleIds: !0
        }).then(() => {
          nextTick(() => {
            i.forEach((t) => {
              const a = r.value.find(
                (m) => m[l.optionValueProperty] === t.id
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
    function N() {
      l.useIdModel && (v.value = null), u.value = null, nextTick(() => {
        setTimeout(T, 50);
      }), f("cleared");
    }
    function B(e, o) {
      return e ? l.optionLabelFormatter ? l.optionLabelFormatter(e, o) : l.optionAndValueLabelFormatter ? l.optionAndValueLabelFormatter(e) : e[l.optionLabelProperty] ?? "&nbsp;" : "&nbsp;";
    }
    function R(e, o) {
      const i = o ? `<span class="text-muted px-2">${o}</span>` : void 0;
      return !e || e.length < 1 ? i ?? "&nbsp;" : e.length > l.maxSelectedLabels ? `${e.length} ${F("multiSelectItemsSelectedLabel")}` : e.map((t) => {
        const a = u.value?.find((m) => m[l.optionValueProperty] === t);
        return a ? l.valueLabelFormatter ? l.valueLabelFormatter(a, o) ?? "---" : l.optionAndValueLabelFormatter ? l.optionAndValueLabelFormatter(a) ?? "---" : a?.[l.optionLabelProperty] ?? "---" : "---";
      });
    }
    function U() {
      S.value = !0, L({});
    }
    function W(e) {
      v.value = e.value, f("itemSelected", u.value);
    }
    function z(e) {
      L({ query: e.value });
    }
    const { exposed: Q, baseInputForwardedProps: G, fieldUniqueId: J, generalInputProps: X } = ne(l);
    return j({ focus: T, clear: N, selectedItems: u, ...Q }), (e, o) => {
      const i = _("MultiSelect");
      return h(), ee(re, M(s(G), {
        onLabelClicked: o[1] || (o[1] = (t) => s(c)?.show())
      }), le({
        labelText: d(() => [
          b(e.$slots, "label-text")
        ]),
        default: d(() => [
          te(i, M(s(X), {
            ref_key: "inputRef",
            ref: c,
            "input-id": s(J),
            name: n.name,
            "model-value": v.value,
            "data-name": n.name,
            placeholder: n.placeholder,
            "auto-filter-focus": !0,
            variant: n.variant,
            "filter-fields": s(K),
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
                  onkeydown: I,
                  onblur: D
                }
              }
            },
            onKeydown: O,
            onBeforeShow: U,
            onHide: o[0] || (o[0] = (t) => f("hide")),
            onChange: W,
            onFilter: z
          }), {
            empty: d(() => [
              S.value ? (h(), w("div", se, [...o[2] || (o[2] = [
                y("i", { class: "i-mdi-loading mx-auto my-1 animate-spin" }, null, -1)
              ])])) : C("", !0)
            ]),
            value: d(({ value: t, placeholder: a }) => [
              b(e.$slots, "value", {
                value: t,
                placeholder: a
              }, () => [
                y("div", {
                  innerHTML: R(t, a)
                }, null, 8, de)
              ])
            ]),
            option: d(({ option: t, index: a }) => [
              a + 1 === r.value.length ? ae((h(), w("span", {
                key: 0,
                "aria-labelledby": B(t, a),
                "data-value": s(A)(t, n.optionValueProperty)
              }, [
                b(e.$slots, "option", {
                  option: { option: t, index: a }
                }, () => [
                  y("div", {
                    innerHTML: B(t, a)
                  }, null, 8, ce)
                ])
              ], 8, fe)), [
                [s(oe), E]
              ]) : (h(), w("span", {
                key: 1,
                "aria-labelledby": B(t, a),
                "data-value": s(A)(t, n.optionValueProperty)
              }, [
                b(e.$slots, "option", {
                  option: { option: t, index: a }
                }, () => [
                  y("div", {
                    innerHTML: B(t, a)
                  }, null, 8, pe)
                ])
              ], 8, me))
            ]),
            footer: d(() => [
              y("div", ye, [
                g.value ? (h(), w("i", be)) : C("", !0)
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
              y("div", { innerHTML: n.helperText }, null, 8, ue)
            ])
          ]),
          key: "1"
        } : void 0
      ]), 1040);
    };
  }
});
export {
  Se as default
};
