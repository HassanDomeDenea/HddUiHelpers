import { _ as U } from "./ColorPickerInput.vue_vue_type_script_setup_true_lang--CG2xF6W.js";
import { _ as h } from "./NumberInput.vue_vue_type_script_setup_true_lang-RdKVNSfW.js";
import D from "primevue/datepicker";
import p from "primevue/inputtext";
import { defineComponent as I, useModel as N, computed as M, watch as S, openBlock as n, createBlock as d, withCtx as $, mergeProps as f, withKeys as A, unref as t, createElementBlock as m, Fragment as c, renderList as O, createElementVNode as v, toDisplayString as b, createVNode as s, createCommentVNode as x, mergeModels as T } from "vue";
import { getColumnTitle as y } from "HddUiHelpers/components/datatables/ServerDataTableUtilities.ts";
import L from "HddUiHelpers/components/misc/AutoFocusable.vue";
import H from "HddUiHelpers/components/primeVueServerTable/MultiSelectColumnFilter.vue";
import K from "HddUiHelpers/components/primeVueServerTable/SelectColumnFilter.vue";
import E from "HddUiHelpers/components/YesNoCheckbox.vue";
import { startCase as j, isBoolean as Y } from "lodash-es";
import k from "moment/moment";
import q from "primevue/button";
import { useI18n as G } from "vue-i18n";
const J = { class: "my-1 underline underline-offset-4" }, Q = { class: "my-1 underline underline-offset-4" }, W = {
  key: 0,
  class: "flex justify-end"
}, de = /* @__PURE__ */ I({
  __name: "FilterControl",
  props: /* @__PURE__ */ T({
    column: {},
    filterCallback: { type: Function },
    size: {}
  }, {
    filterModel: {},
    filterModelModifiers: {}
  }),
  emits: ["update:filterModel"],
  setup(e) {
    const l = N(e, "filterModel"), { t: u } = G(), C = M(() => ["dateBetween", "dateNotBetween"].includes(l.value.matchMode));
    S(C, (i) => {
      i && !Array.isArray(l.value.value) ? l.value.value = null : !i && Array.isArray(l.value.value) && (l.value.value = l.value.value[0] ?? null);
    });
    function B(i) {
      i === null ? (l.value.value = null, e.filterCallback()) : i[0] && i[1] && (l.value.value = [
        k(i[0]).format(),
        k(i[1]).format()
      ], e.filterCallback());
    }
    const z = M(() => ["numeric", "price"].includes(e.column.type));
    return (i, o) => {
      const F = p, V = D, g = h, P = U;
      return n(), d(L, { duration: 150 }, {
        default: $(({ setRef: r }) => [
          !e.column.type || e.column.type === "text" ? (n(), d(F, f({
            key: 0,
            ref: r
          }, e.column.filterInputProps ?? {}, {
            modelValue: l.value.value,
            "onUpdate:modelValue": o[0] || (o[0] = (a) => l.value.value = a),
            size: e.size,
            title: t(u)("Hit enter key to filter"),
            type: "text",
            placeholder: `${t(u)("Search by")} ${e.column.label || t(u)(t(j)(e.column.name ?? e.column.field)).toLowerCase()} `,
            onKeydown: o[1] || (o[1] = A((a) => e.filterCallback(), ["enter"]))
          }), null, 16, ["modelValue", "size", "title", "placeholder"])) : e.column.type === "date" ? (n(), m(c, { key: 1 }, [
            t(C) ? (n(), d(V, {
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
            }, null, 8, ["size", "model-value", "onDateSelect"])) : (n(), d(V, {
              key: 0,
              size: e.size,
              "model-value": l.value.value && !Array.isArray(l.value.value) ? new Date(l.value.value) : null,
              "date-format": "yy-mm-dd",
              placeholder: "yyyy-mm-dd",
              "onUpdate:modelValue": o[2] || (o[2] = (a) => (l.value.value = a ? t(k)(a).format() : null) && e.filterCallback())
            }, null, 8, ["size", "model-value"]))
          ], 64)) : t(z) && !["between", "notBetween"].includes(l.value.matchMode) ? (n(), d(g, f({
            key: 2,
            ref: r,
            modelValue: l.value.value,
            "onUpdate:modelValue": o[3] || (o[3] = (a) => l.value.value = a),
            modelModifiers: { number: !0 },
            "use-grouping": e.column.type === "price",
            size: e.size,
            "allow-empty": "",
            "text-addon": e.column.filterCurrency ? t(u)(e.column.filterCurrency) : void 0
          }, e.column.filterInputProps ?? {}, {
            onKeydown: o[4] || (o[4] = A((a) => e.filterCallback(), ["enter"]))
          }), null, 16, ["modelValue", "use-grouping", "size", "text-addon"])) : t(z) && ["between", "notBetween"].includes(l.value.matchMode) ? (n(), m(c, { key: 3 }, O([0, 1], (a) => v("div", { key: a }, [
            v("div", null, b(a === 0 ? t(u)("From") : t(u)("To")) + ":", 1),
            s(g, f({
              ref_for: !0,
              ref: a === 0 ? r : void 0,
              size: e.size,
              "text-addon": e.column.filterCurrency ? t(u)(e.column.filterCurrency) : void 0,
              "allow-empty": "",
              "use-grouping": e.column.type === "price",
              "model-value": (l.value.value || [])[a]
            }, { ref_for: !0 }, e.column.filterInputProps ?? {}, {
              "onUpdate:modelValue": (w) => l.value.value = [
                a === 0 ? w : (l.value.value || [])[0],
                a === 1 ? w : (l.value.value || [])[1]
              ]
            }), null, 16, ["size", "text-addon", "use-grouping", "model-value", "onUpdate:modelValue"])
          ])), 64)) : e.column.type === "boolean" ? (n(), m(c, { key: 4 }, [
            v("div", J, b(t(u)("Filter By")) + ":", 1),
            s(E, {
              ref: r,
              modelValue: l.value.value,
              "onUpdate:modelValue": o[5] || (o[5] = (a) => l.value.value = a),
              size: e.size,
              class: "ms-4",
              "label-position": "start",
              label: t(y)(e.column, t(u)),
              "with-status-label": "",
              "checked-label": e.column.booleanCheckedValue,
              "un-checked-label-label": e.column.booleanUncheckedValue,
              onChange: o[6] || (o[6] = (a) => e.filterCallback())
            }, null, 8, ["modelValue", "size", "label", "checked-label", "un-checked-label-label"])
          ], 64)) : e.column.type === "color" ? (n(), m(c, { key: 5 }, [
            v("div", Q, b(t(u)("Filter By")) + ":", 1),
            s(P, {
              ref: r,
              modelValue: l.value.value,
              "onUpdate:modelValue": o[7] || (o[7] = (a) => l.value.value = a),
              size: e.size,
              clearable: "",
              class: "ms-4",
              "label-position": "start",
              label: t(y)(e.column, t(u)),
              "with-status-label": "",
              onChange: o[8] || (o[8] = (a) => e.filterCallback())
            }, null, 8, ["modelValue", "size", "label"])
          ], 64)) : e.column.type === "select" ? (n(), m(c, { key: 6 }, [
            !t(Y)(e.column.showFilterAddButton) || e.column.isMultiSelect === !0 ? (n(), m(c, { key: 0 }, [
              s(H, {
                ref: r,
                size: e.size,
                label: e.column.selectFilterHeader ?? t(y)(e.column, t(u)),
                options: Array.isArray(e.column.selectOptions) ? e.column.selectOptions : e.column.selectOptions?.list ?? [],
                "slot-props": { filterModel: l.value, filterCallback: e.filterCallback },
                "option-value-property": e.column.selectValueProperty,
                "option-label-property": e.column.selectLabelProperty
              }, null, 8, ["size", "label", "options", "slot-props", "option-value-property", "option-label-property"]),
              l.value.value ? (n(), m("div", W, [
                s(t(q), {
                  size: "small",
                  type: "button",
                  icon: "pi pi-filter-slash",
                  outlined: "",
                  label: t(u)("Clear"),
                  onClick: o[9] || (o[9] = (a) => {
                    l.value.value = null, e.filterCallback();
                  })
                }, null, 8, ["label"])
              ])) : x("", !0)
            ], 64)) : (n(), d(K, {
              key: 1,
              ref: r,
              size: e.size,
              label: e.column.selectFilterHeader ?? t(y)(e.column, t(u)),
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
  de as _
};
