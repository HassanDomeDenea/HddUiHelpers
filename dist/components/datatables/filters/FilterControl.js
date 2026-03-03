import { defineComponent as h, useModel as D, computed as A, watch as I, resolveComponent as s, openBlock as n, createBlock as d, withCtx as N, mergeProps as b, withKeys as x, unref as a, createElementBlock as m, Fragment as c, renderList as S, createElementVNode as y, toDisplayString as k, createVNode as v, createCommentVNode as B, mergeModels as p } from "vue";
import { getColumnTitle as f } from "HddUiHelpers/components/datatables/ServerDataTableUtilities.ts";
import O from "HddUiHelpers/components/misc/AutoFocusable.vue";
import T from "HddUiHelpers/components/primeVueServerTable/MultiSelectColumnFilter.vue";
import $ from "HddUiHelpers/components/primeVueServerTable/SelectColumnFilter.vue";
import L from "HddUiHelpers/components/YesNoCheckbox.vue";
import { startCase as H, isBoolean as K } from "lodash-es";
import C from "moment/moment";
import E from "primevue/button";
import { useI18n as j } from "vue-i18n";
const Y = { class: "my-1 underline underline-offset-4" }, q = { class: "my-1 underline underline-offset-4" }, G = {
  key: 0,
  class: "flex justify-end"
}, ae = /* @__PURE__ */ h({
  __name: "FilterControl",
  props: /* @__PURE__ */ p({
    column: {},
    filterCallback: { type: Function },
    size: {}
  }, {
    filterModel: {},
    filterModelModifiers: {}
  }),
  emits: ["update:filterModel"],
  setup(e) {
    const l = D(e, "filterModel"), { t: o } = j(), z = A(() => ["dateBetween", "dateNotBetween"].includes(l.value.matchMode));
    I(z, (i) => {
      i && !Array.isArray(l.value.value) ? l.value.value = null : !i && Array.isArray(l.value.value) && (l.value.value = l.value.value[0] ?? null);
    });
    function F(i) {
      i === null ? (l.value.value = null, e.filterCallback()) : i[0] && i[1] && (l.value.value = [
        C(i[0]).format(),
        C(i[1]).format()
      ], e.filterCallback());
    }
    const V = A(() => ["numeric", "price"].includes(e.column.type));
    return (i, u) => {
      const P = s("InputText"), g = s("DatePicker"), w = s("NumberInput"), U = s("ColorPickerInput");
      return n(), d(O, { duration: 150 }, {
        default: N(({ setRef: r }) => [
          !e.column.type || e.column.type === "text" ? (n(), d(P, b({
            key: 0,
            ref: r
          }, e.column.filterInputProps ?? {}, {
            modelValue: l.value.value,
            "onUpdate:modelValue": u[0] || (u[0] = (t) => l.value.value = t),
            size: e.size,
            title: a(o)("Hit enter key to filter"),
            type: "text",
            placeholder: `${a(o)("Search by")} ${e.column.label || a(o)(a(H)(e.column.name ?? e.column.field)).toLowerCase()} `,
            onKeydown: u[1] || (u[1] = x((t) => e.filterCallback(), ["enter"]))
          }), null, 16, ["modelValue", "size", "title", "placeholder"])) : e.column.type === "date" ? (n(), m(c, { key: 1 }, [
            z.value ? (n(), d(g, {
              key: 1,
              size: e.size,
              "hide-on-range-selection": "",
              "model-value": l.value.value && Array.isArray(l.value.value) ? [
                l.value.value[0] ? new Date(l.value.value[0]) : null,
                l.value.value[1] ? new Date(l.value.value[1]) : null
              ] : null,
              "selection-mode": "range",
              "date-format": "yy-mm-dd",
              placeholder: "yyyy-mm-dd",
              onDateSelect: console.log,
              "onUpdate:modelValue": F
            }, null, 8, ["size", "model-value", "onDateSelect"])) : (n(), d(g, {
              key: 0,
              size: e.size,
              "model-value": l.value.value && !Array.isArray(l.value.value) ? new Date(l.value.value) : null,
              "date-format": "yy-mm-dd",
              placeholder: "yyyy-mm-dd",
              "onUpdate:modelValue": u[2] || (u[2] = (t) => (l.value.value = t ? a(C)(t).format() : null) && e.filterCallback())
            }, null, 8, ["size", "model-value"]))
          ], 64)) : V.value && !["between", "notBetween"].includes(l.value.matchMode) ? (n(), d(w, b({
            key: 2,
            ref: r,
            modelValue: l.value.value,
            "onUpdate:modelValue": u[3] || (u[3] = (t) => l.value.value = t),
            modelModifiers: { number: !0 },
            "use-grouping": e.column.type === "price",
            size: e.size,
            "allow-empty": "",
            "text-addon": e.column.filterCurrency ? a(o)(e.column.filterCurrency) : void 0
          }, e.column.filterInputProps ?? {}, {
            onKeydown: u[4] || (u[4] = x((t) => e.filterCallback(), ["enter"]))
          }), null, 16, ["modelValue", "use-grouping", "size", "text-addon"])) : V.value && ["between", "notBetween"].includes(l.value.matchMode) ? (n(), m(c, { key: 3 }, S([0, 1], (t) => y("div", { key: t }, [
            y("div", null, k(t === 0 ? a(o)("From") : a(o)("To")) + ":", 1),
            v(w, b({
              ref_for: !0,
              ref: t === 0 ? r : void 0,
              size: e.size,
              "text-addon": e.column.filterCurrency ? a(o)(e.column.filterCurrency) : void 0,
              "allow-empty": "",
              "use-grouping": e.column.type === "price",
              "model-value": (l.value.value || [])[t]
            }, { ref_for: !0 }, e.column.filterInputProps ?? {}, {
              "onUpdate:modelValue": (M) => l.value.value = [
                t === 0 ? M : (l.value.value || [])[0],
                t === 1 ? M : (l.value.value || [])[1]
              ]
            }), null, 16, ["size", "text-addon", "use-grouping", "model-value", "onUpdate:modelValue"])
          ])), 64)) : e.column.type === "boolean" ? (n(), m(c, { key: 4 }, [
            y("div", Y, k(a(o)("Filter By")) + ":", 1),
            v(L, {
              ref: r,
              modelValue: l.value.value,
              "onUpdate:modelValue": u[5] || (u[5] = (t) => l.value.value = t),
              size: e.size,
              class: "ms-4",
              "label-position": "start",
              label: a(f)(e.column, a(o)),
              "with-status-label": "",
              "checked-label": e.column.booleanCheckedValue,
              "un-checked-label-label": e.column.booleanUncheckedValue,
              onChange: u[6] || (u[6] = (t) => e.filterCallback())
            }, null, 8, ["modelValue", "size", "label", "checked-label", "un-checked-label-label"])
          ], 64)) : e.column.type === "color" ? (n(), m(c, { key: 5 }, [
            y("div", q, k(a(o)("Filter By")) + ":", 1),
            v(U, {
              ref: r,
              modelValue: l.value.value,
              "onUpdate:modelValue": u[7] || (u[7] = (t) => l.value.value = t),
              size: e.size,
              clearable: "",
              class: "ms-4",
              "label-position": "start",
              label: a(f)(e.column, a(o)),
              "with-status-label": "",
              onChange: u[8] || (u[8] = (t) => e.filterCallback())
            }, null, 8, ["modelValue", "size", "label"])
          ], 64)) : e.column.type === "select" ? (n(), m(c, { key: 6 }, [
            !a(K)(e.column.showFilterAddButton) || e.column.isMultiSelect === !0 ? (n(), m(c, { key: 0 }, [
              v(T, {
                ref: r,
                size: e.size,
                label: e.column.selectFilterHeader ?? a(f)(e.column, a(o)),
                options: Array.isArray(e.column.selectOptions) ? e.column.selectOptions : e.column.selectOptions?.list ?? [],
                "slot-props": { filterModel: l.value, filterCallback: e.filterCallback },
                "option-value-property": e.column.selectValueProperty,
                "option-label-property": e.column.selectLabelProperty
              }, null, 8, ["size", "label", "options", "slot-props", "option-value-property", "option-label-property"]),
              l.value.value ? (n(), m("div", G, [
                v(a(E), {
                  size: "small",
                  type: "button",
                  icon: "pi pi-filter-slash",
                  outlined: "",
                  label: a(o)("Clear"),
                  onClick: u[9] || (u[9] = (t) => {
                    l.value.value = null, e.filterCallback();
                  })
                }, null, 8, ["label"])
              ])) : B("", !0)
            ], 64)) : (n(), d($, {
              key: 1,
              ref: r,
              size: e.size,
              label: e.column.selectFilterHeader ?? a(f)(e.column, a(o)),
              options: Array.isArray(e.column.selectOptions) ? e.column.selectOptions : e.column.selectOptions?.list ?? [],
              "slot-props": { filterModel: l.value, filterCallback: e.filterCallback },
              "option-value-property": e.column.selectValueProperty,
              "option-label-property": e.column.selectLabelProperty
            }, null, 8, ["size", "label", "options", "slot-props", "option-value-property", "option-label-property"]))
          ], 64)) : B("", !0)
        ]),
        _: 1
      });
    };
  }
});
export {
  ae as default
};
