import { defineComponent as J, useModel as S, ref as m, openBlock as b, createBlock as X, mergeProps as T, unref as n, createSlots as Y, withCtx as f, createVNode as Z, createElementVNode as v, createElementBlock as g, createCommentVNode as V, withDirectives as _, renderSlot as y, mergeModels as C } from "vue";
import { vElementVisibility as ee } from "@vueuse/components";
import { useHddBaseInputUtils as le } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { useApiClient as te } from "HddUiHelpers/stores/apiClient.ts";
import { get as M } from "lodash-es";
import ae from "primevue/select";
import { _ as oe } from "../../BaseInput.vue_vue_type_script_setup_true_lang-DGVI56PE.js";
const ne = ["innerHTML"], ie = {
  key: 0,
  class: "flex justify-center"
}, re = ["innerHTML"], ue = ["aria-labelledby", "data-value"], se = ["innerHTML"], de = ["aria-labelledby", "data-value"], fe = ["innerHTML"], pe = { class: "flex justify-center" }, ce = {
  key: 0,
  class: "i-mdi-loading mx-auto my-1 animate-spin"
}, ge = /* @__PURE__ */ J({
  __name: "InfiniteSelectInput",
  props: /* @__PURE__ */ C({
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
  emits: /* @__PURE__ */ C(["keydown", "blur", "hide", "cleared", "itemSelected"], ["update:item", "update:modelValue"]),
  setup(u, { expose: x, emit: A }) {
    const l = u, p = A, o = S(u, "item"), i = S(u, "modelValue"), $ = te(), r = m([]), F = m(0), I = m(), h = m(!1), w = m(!1), k = m(!1), d = computed(
      () => l.valueSameAsLabel ? l.optionLabelProperty : l.optionValueProperty
    );
    async function L(e) {
      I.value = e.query || "";
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
      return $.request({
        // method: 'get',
        ...typeof l.url == "string" ? { url: l.url } : l.url,
        params: a
      }).then((t) => {
        e.offset ? r.value.push(...t.data.data.items) : r.value = t.data.data.items, F.value = t.data.data.total, h.value = !1, w.value = !1;
      });
    }
    function j(e) {
      e && F.value > r.value.length && h.value === !1 && (h.value = !0, L({ query: I.value, offset: r.value.length - 1 }));
    }
    const c = useTemplateRef("inputRef");
    function P(e = !1) {
      l.disabled || (e ? c.value?.show() : c.value?.$refs.focusInput.focus());
    }
    function q(e) {
      (!c.value).overlayVisible && p("keydown", e);
    }
    function H(e) {
      l.onKeydown && e.code === "Enter" && c.value?.hide(), p("keydown", e);
    }
    function D(e) {
      p("blur", e);
    }
    const O = computed(() => r.value.length > 0 ? Object.keys(r.value[0]) : l.filterFields ?? []);
    watch(
      () => i.value,
      () => {
        if (i.value === null && (o.value = null), o.value?.[d.value] === i.value)
          return;
        let e = r.value.find(
          (a) => a[d.value] === i.value
        );
        e ? o.value = e : l.valueSameAsLabel ? nextTick(() => {
          o.value = {
            [d.value]: i.value,
            [l.optionLabelProperty]: i.value
          };
        }) : (k.value = !0, L({ query: `${i.value}`, limit: 1, onlyId: !0 }).then(() => {
          e = r.value.find(
            (a) => a[d.value] === i.value
          ), nextTick(() => {
            e && (o.value = e);
          }), k.value = !1;
        }));
      },
      {
        immediate: !0
      }
    );
    function E() {
      l.useIdModel && (i.value = null), o.value = null, nextTick(() => {
        setTimeout(P, 50);
      }), p("cleared");
    }
    function B(e, a) {
      return l.optionLabelFormatter ? l.optionLabelFormatter(e, a) : l.optionAndValueLabelFormatter ? l.optionAndValueLabelFormatter(e) : e[l.optionLabelProperty] ?? "&nbsp;";
    }
    function K(e, a) {
      const t = a ? `<span class="text-muted px-2">${a}</span>` : void 0;
      return o.value ? l.valueLabelFormatter ? l.valueLabelFormatter(o.value, a) ?? t ?? "&nbsp;" : l.optionAndValueLabelFormatter ? l.optionAndValueLabelFormatter(o.value) ?? t ?? "&nbsp;" : o.value[l.optionLabelProperty] ?? t ?? e ?? "&nbsp;" : t ?? "&nbsp;";
    }
    function N() {
      w.value = !0, L({});
    }
    function R(e) {
      i.value = e.value, o.value = r.value.find((a) => a[d.value] === e.value) || null, p("itemSelected", o.value);
    }
    function U(e) {
      L({ query: e.value });
    }
    const { exposed: W, baseInputForwardedProps: z, fieldUniqueId: Q, generalInputProps: G } = le(l);
    return x({ focus: P, ...W, clear: E, disabled: l.disabled, selectedItem: o }), (e, a) => (b(), X(oe, T(n(z), {
      "control-component": { selectedItem: o.value },
      onLabelClicked: a[1] || (a[1] = (t) => n(c)?.show())
    }), Y({
      labelText: f(() => [
        y(e.$slots, "label-text")
      ]),
      default: f(() => [
        Z(n(ae), T(n(G), {
          ref_key: "inputRef",
          ref: c,
          "input-id": n(Q),
          "model-value": i.value,
          placeholder: u.placeholder,
          filter: !0,
          "filter-fields": n(O),
          "filter-placeholder": u.filterPlaceholder,
          loading: k.value,
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
                onkeydown: q,
                onblur: D
              }
            }
          },
          onKeydown: H,
          onBeforeShow: N,
          onHide: a[0] || (a[0] = (t) => p("hide")),
          onChange: R,
          onFilter: U
        }), {
          empty: f(() => [
            w.value ? (b(), g("div", ie, [...a[2] || (a[2] = [
              v("i", { class: "i-mdi-loading mx-auto my-1 animate-spin" }, null, -1)
            ])])) : V("", !0)
          ]),
          value: f(({ value: t, placeholder: s }) => [
            y(e.$slots, "value", {
              value: { value: t, placeholder: s }
            }, () => [
              v("div", {
                innerHTML: K(t, s)
              }, null, 8, re)
            ])
          ]),
          option: f(({ option: t, index: s }) => [
            s + 1 === r.value.length ? _((b(), g("span", {
              key: 0,
              "aria-labelledby": B(t, s),
              "data-value": n(M)(t, n(d))
            }, [
              y(e.$slots, "option", {
                option: { option: t, index: s }
              }, () => [
                v("div", {
                  innerHTML: B(t, s)
                }, null, 8, se)
              ])
            ], 8, ue)), [
              [n(ee), j]
            ]) : (b(), g("span", {
              key: 1,
              "aria-labelledby": B(t, s),
              "data-value": n(M)(t, n(d))
            }, [
              y(e.$slots, "option", {
                option: { option: t, index: s }
              }, () => [
                v("div", {
                  innerHTML: B(t, s)
                }, null, 8, fe)
              ])
            ], 8, de))
          ]),
          footer: f(() => [
            v("div", pe, [
              h.value ? (b(), g("i", ce)) : V("", !0)
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
            v("div", { innerHTML: u.helperText }, null, 8, ne)
          ])
        ]),
        key: "1"
      } : void 0
    ]), 1040, ["control-component"]));
  }
});
export {
  ge as default
};
