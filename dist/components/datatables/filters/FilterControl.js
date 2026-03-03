import { defineComponent as U, useModel as h, resolveComponent as v, openBlock as n, createBlock as d, withCtx as D, mergeProps as b, withKeys as A, unref as t, createElementBlock as m, Fragment as c, renderList as I, createElementVNode as y, toDisplayString as k, createVNode as s, createCommentVNode as x, mergeModels as N } from "vue";
import { getColumnTitle as f } from "HddUiHelpers/components/datatables/ServerDataTableUtilities.ts";
import S from "HddUiHelpers/components/misc/AutoFocusable.vue";
import p from "HddUiHelpers/components/primeVueServerTable/MultiSelectColumnFilter.vue";
import O from "HddUiHelpers/components/primeVueServerTable/SelectColumnFilter.vue";
import T from "HddUiHelpers/components/YesNoCheckbox.vue";
import { startCase as $, isBoolean as L } from "lodash-es";
import C from "moment/moment";
import H from "primevue/button";
const K = { class: "my-1 underline underline-offset-4" }, E = { class: "my-1 underline underline-offset-4" }, j = {
  key: 0,
  class: "flex justify-end"
}, _ = /* @__PURE__ */ U({
  __name: "FilterControl",
  props: /* @__PURE__ */ N({
    column: {},
    filterCallback: { type: Function },
    size: {}
  }, {
    filterModel: {},
    filterModelModifiers: {}
  }),
  emits: ["update:filterModel"],
  setup(e) {
    const l = h(e, "filterModel"), { t: o } = useI18n(), z = computed(() => ["dateBetween", "dateNotBetween"].includes(l.value.matchMode));
    watch(z, (i) => {
      i && !Array.isArray(l.value.value) ? l.value.value = null : !i && Array.isArray(l.value.value) && (l.value.value = l.value.value[0] ?? null);
    });
    function B(i) {
      i === null ? (l.value.value = null, e.filterCallback()) : i[0] && i[1] && (l.value.value = [
        C(i[0]).format(),
        C(i[1]).format()
      ], e.filterCallback());
    }
    const V = computed(() => ["numeric", "price"].includes(e.column.type));
    return (i, a) => {
      const F = v("InputText"), g = v("DatePicker"), w = v("NumberInput"), P = v("ColorPickerInput");
      return n(), d(S, { duration: 150 }, {
        default: D(({ setRef: r }) => [
          !e.column.type || e.column.type === "text" ? (n(), d(F, b({
            key: 0,
            ref: r
          }, e.column.filterInputProps ?? {}, {
            modelValue: l.value.value,
            "onUpdate:modelValue": a[0] || (a[0] = (u) => l.value.value = u),
            size: e.size,
            title: t(o)("Hit enter key to filter"),
            type: "text",
            placeholder: `${t(o)("Search by")} ${e.column.label || t(o)(t($)(e.column.name ?? e.column.field)).toLowerCase()} `,
            onKeydown: a[1] || (a[1] = A((u) => e.filterCallback(), ["enter"]))
          }), null, 16, ["modelValue", "size", "title", "placeholder"])) : e.column.type === "date" ? (n(), m(c, { key: 1 }, [
            t(z) ? (n(), d(g, {
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
              "onUpdate:modelValue": B
            }, null, 8, ["size", "model-value", "onDateSelect"])) : (n(), d(g, {
              key: 0,
              size: e.size,
              "model-value": l.value.value && !Array.isArray(l.value.value) ? new Date(l.value.value) : null,
              "date-format": "yy-mm-dd",
              placeholder: "yyyy-mm-dd",
              "onUpdate:modelValue": a[2] || (a[2] = (u) => (l.value.value = u ? t(C)(u).format() : null) && e.filterCallback())
            }, null, 8, ["size", "model-value"]))
          ], 64)) : t(V) && !["between", "notBetween"].includes(l.value.matchMode) ? (n(), d(w, b({
            key: 2,
            ref: r,
            modelValue: l.value.value,
            "onUpdate:modelValue": a[3] || (a[3] = (u) => l.value.value = u),
            modelModifiers: { number: !0 },
            "use-grouping": e.column.type === "price",
            size: e.size,
            "allow-empty": "",
            "text-addon": e.column.filterCurrency ? t(o)(e.column.filterCurrency) : void 0
          }, e.column.filterInputProps ?? {}, {
            onKeydown: a[4] || (a[4] = A((u) => e.filterCallback(), ["enter"]))
          }), null, 16, ["modelValue", "use-grouping", "size", "text-addon"])) : t(V) && ["between", "notBetween"].includes(l.value.matchMode) ? (n(), m(c, { key: 3 }, I([0, 1], (u) => y("div", { key: u }, [
            y("div", null, k(u === 0 ? t(o)("From") : t(o)("To")) + ":", 1),
            s(w, b({
              ref_for: !0,
              ref: u === 0 ? r : void 0,
              size: e.size,
              "text-addon": e.column.filterCurrency ? t(o)(e.column.filterCurrency) : void 0,
              "allow-empty": "",
              "use-grouping": e.column.type === "price",
              "model-value": (l.value.value || [])[u]
            }, { ref_for: !0 }, e.column.filterInputProps ?? {}, {
              "onUpdate:modelValue": (M) => l.value.value = [
                u === 0 ? M : (l.value.value || [])[0],
                u === 1 ? M : (l.value.value || [])[1]
              ]
            }), null, 16, ["size", "text-addon", "use-grouping", "model-value", "onUpdate:modelValue"])
          ])), 64)) : e.column.type === "boolean" ? (n(), m(c, { key: 4 }, [
            y("div", K, k(t(o)("Filter By")) + ":", 1),
            s(T, {
              ref: r,
              modelValue: l.value.value,
              "onUpdate:modelValue": a[5] || (a[5] = (u) => l.value.value = u),
              size: e.size,
              class: "ms-4",
              "label-position": "start",
              label: t(f)(e.column, t(o)),
              "with-status-label": "",
              "checked-label": e.column.booleanCheckedValue,
              "un-checked-label-label": e.column.booleanUncheckedValue,
              onChange: a[6] || (a[6] = (u) => e.filterCallback())
            }, null, 8, ["modelValue", "size", "label", "checked-label", "un-checked-label-label"])
          ], 64)) : e.column.type === "color" ? (n(), m(c, { key: 5 }, [
            y("div", E, k(t(o)("Filter By")) + ":", 1),
            s(P, {
              ref: r,
              modelValue: l.value.value,
              "onUpdate:modelValue": a[7] || (a[7] = (u) => l.value.value = u),
              size: e.size,
              clearable: "",
              class: "ms-4",
              "label-position": "start",
              label: t(f)(e.column, t(o)),
              "with-status-label": "",
              onChange: a[8] || (a[8] = (u) => e.filterCallback())
            }, null, 8, ["modelValue", "size", "label"])
          ], 64)) : e.column.type === "select" ? (n(), m(c, { key: 6 }, [
            !t(L)(e.column.showFilterAddButton) || e.column.isMultiSelect === !0 ? (n(), m(c, { key: 0 }, [
              s(p, {
                ref: r,
                size: e.size,
                label: e.column.selectFilterHeader ?? t(f)(e.column, t(o)),
                options: Array.isArray(e.column.selectOptions) ? e.column.selectOptions : e.column.selectOptions?.list ?? [],
                "slot-props": { filterModel: l.value, filterCallback: e.filterCallback },
                "option-value-property": e.column.selectValueProperty,
                "option-label-property": e.column.selectLabelProperty
              }, null, 8, ["size", "label", "options", "slot-props", "option-value-property", "option-label-property"]),
              l.value.value ? (n(), m("div", j, [
                s(t(H), {
                  size: "small",
                  type: "button",
                  icon: "pi pi-filter-slash",
                  outlined: "",
                  label: t(o)("Clear"),
                  onClick: a[9] || (a[9] = (u) => {
                    l.value.value = null, e.filterCallback();
                  })
                }, null, 8, ["label"])
              ])) : x("", !0)
            ], 64)) : (n(), d(O, {
              key: 1,
              ref: r,
              size: e.size,
              label: e.column.selectFilterHeader ?? t(f)(e.column, t(o)),
              options: Array.isArray(e.column.selectOptions) ? e.column.selectOptions : e.column.selectOptions?.list ?? [],
              "slot-props": { filterModel: l.value, filterCallback: e.filterCallback },
              "option-value-property": e.column.selectValueProperty,
              "option-label-property": e.column.selectLabelProperty
            }, null, 8, ["size", "label", "options", "slot-props", "option-value-property", "option-label-property"]))
          ], 64)) : x("", !0)
        ]),
        _: 1
      });
    };
  }
});
export {
  _ as default
};
