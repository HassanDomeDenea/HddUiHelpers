import { defineComponent as D, useModel as I, useTemplateRef as k, nextTick as g, onMounted as q, ref as j, resolveComponent as H, openBlock as u, createElementBlock as c, createBlock as b, unref as s, withCtx as J, createElementVNode as F, createVNode as K, createCommentVNode as y, normalizeClass as Q, withModifiers as R, toDisplayString as B, Fragment as S, renderList as X, withDirectives as M, vShow as T, mergeModels as V } from "vue";
import { useSortable as Y, moveArrayElement as Z } from "@vueuse/integrations/useSortable";
import _ from "HddUiHelpers/components/datatables/filters/ToolbarFilterValue.vue";
import ee from "HddUiHelpers/components/datatables/filters/ToolbarFilterWrapper.vue";
import { isToolbarFilterEmpty as v } from "HddUiHelpers/components/datatables/ServerDataTableUtilities.ts";
import { hidePrimevuePopovers as te } from "HddUiHelpers/plugins/primevue.ts";
import { pullAt as oe, uniqueId as le } from "lodash-es";
import re from "primevue/popover";
import { isToolbarFilterValue as ne } from "../ServerDataTableTypes.js";
import { useI18n as ie } from "vue-i18n";
const ae = ["title"], se = ["data-custom-id"], ue = ["title"], W = "toolbarFiltersSortedEvent", be = /* @__PURE__ */ D({
  __name: "ToolbarFilterWrapper",
  props: /* @__PURE__ */ V({
    operator: {},
    columns: {},
    hideOperator: { type: Boolean },
    isPrinting: { type: Boolean, default: !1 },
    isGrouped: { type: Boolean },
    makeOperatorAfterFields: { type: Boolean }
  }, {
    filters: {},
    filtersModifiers: {}
  }),
  emits: /* @__PURE__ */ V(["filterCallback", "filtersChanged", "remove", "operatorChanged"], ["update:filters"]),
  setup(l, { expose: L, emit: U }) {
    const a = U, e = I(l, "filters"), m = k(
      "filtersRefs"
    ), { t: d } = ie();
    function w(t) {
      let o = !0;
      v(e.value.fields[t]) && (o = !1);
      const i = [...e.value.fields];
      i.splice(t, 1), e.value.fields = i, e.value.fields.length === 0 && a("remove", e.value), o && a("filtersChanged");
    }
    const p = k("filtersListWrapperRef");
    l.isPrinting || Y(p, e.value.fields, {
      group: "toolbar-filters",
      swapThreshold: 0.3,
      invertSwap: !0,
      onEnd: function(t) {
        if (t.from === t.to) {
          if (t.oldIndex === t.newIndex)
            return;
          const o = [...e.value.fields];
          Z(o, t.oldIndex, t.newIndex, t), g(() => {
            e.value.fields = o;
          });
        } else {
          const o = [...e.value.fields], [i] = oe(o, t.oldIndex), n = new CustomEvent(
            W,
            {
              detail: {
                toIndex: t.newIndex,
                item: i,
                callback: () => {
                  e.value.fields.length === 0 && a("remove", e.value);
                }
              }
            }
          );
          t.to.dispatchEvent(n), g(() => {
            e.value.fields = o;
          });
        }
      },
      onUpdate() {
      }
    });
    function E(t) {
      a("filterCallback", t), a("filtersChanged");
    }
    function P(t) {
      e.value.operator = t, v(e.value) || a("filtersChanged");
    }
    function A() {
      l.isPrinting;
    }
    function G(t) {
      let o = !0;
      const i = e.value.fields[t];
      v(i) && (o = !1);
      const n = [...e.value.fields];
      n[t] = {
        operator: "and",
        fields: [i],
        id: le("toolbar-filter-")
      }, e.value.fields = n, o && a("filtersChanged");
    }
    q(() => {
      p.value.addEventListener(
        W,
        function(t) {
          const { toIndex: o, item: i, callback: n } = t.detail, r = [...e.value.fields];
          r.splice(o, 0, i), g(() => {
            p.value.children[o].remove(), e.value.fields = r, v(i) || a("filtersChanged"), n && g(n);
          });
        }
      );
    });
    const h = j(), C = k("operatorChangerRef");
    function O(t) {
      l.isPrinting || (h.value = l.operator, te(), C.value.toggle(t));
    }
    function x(t) {
      t && t !== l.operator && a("operatorChanged", t), C.value.hide();
    }
    function z() {
      m.value[0]?.focus?.();
    }
    function N(t) {
      m.value[t]?.focus?.();
    }
    function $() {
      m.value[e.value.fields.length - 1]?.focus?.();
    }
    return L({
      focusLast: $,
      focusFilter: N,
      focus: z
    }), (t, o) => {
      const i = H("SelectButton");
      return u(), c("div", null, [
        l.isPrinting ? y("", !0) : (u(), b(s(re), {
          key: 0,
          ref_key: "operatorChangerRef",
          ref: C
        }, {
          default: J(() => [
            F("div", null, [
              K(i, {
                modelValue: h.value,
                "onUpdate:modelValue": o[0] || (o[0] = (n) => h.value = n),
                "option-label": "label",
                "option-value": "value",
                size: "small",
                fluid: "",
                options: [
                  { value: "and", label: s(d)("and") },
                  { value: "or", label: s(d)("or") }
                ],
                onChange: o[1] || (o[1] = (n) => x(n.value))
              }, null, 8, ["modelValue", "options"])
            ])
          ]),
          _: 1
        }, 512)),
        F("div", {
          class: Q({
            "border-1 my-2 me-1 ms-6 rounded-lg border-dashed border-zinc-600 dark:border-zinc-500/75": l.isGrouped
          })
        }, [
          !l.hideOperator && e.value.fields.length && !l.makeOperatorAfterFields ? (u(), c("span", {
            key: 0,
            title: s(d)("Change Filtering Method"),
            class: "operator-span mx-2",
            onClick: R(O, ["stop"])
          }, B(s(d)(l.operator)) + " :", 9, ae)) : y("", !0),
          F("div", {
            ref_key: "filtersListWrapperRef",
            ref: p,
            "data-custom-id": e.value.id,
            onContextmenu: R(A, ["prevent"])
          }, [
            (u(!0), c(S, null, X(e.value.fields, (n, r) => (u(), c(S, {
              key: n.id
            }, [
              s(ne)(e.value.fields[r]) ? M((u(), b(_, {
                key: 0,
                ref_for: !0,
                ref_key: "filtersRefs",
                ref: m,
                filter: e.value.fields[r],
                "onUpdate:filter": (f) => e.value.fields[r] = f,
                "is-printing": l.isPrinting,
                operator: r !== 0 ? e.value.operator : null,
                columns: l.columns,
                "can-create-group": e.value.fields.length > 1,
                onFilterCallback: E,
                onRemove: (f) => w(r),
                onOperatorChanged: P,
                onIsolateIntoGroup: (f) => G(r)
              }, null, 8, ["filter", "onUpdate:filter", "is-printing", "operator", "columns", "can-create-group", "onRemove", "onIsolateIntoGroup"])), [
                [T, !l.isPrinting || !s(v)(e.value.fields[r])]
              ]) : M((u(), b(ee, {
                key: 1,
                ref_for: !0,
                ref_key: "filtersRefs",
                ref: m,
                filters: e.value.fields[r],
                "onUpdate:filters": (f) => e.value.fields[r] = f,
                "is-grouped": "",
                operator: e.value.operator,
                "make-operator-after-fields": r === 0 && e.value.fields.length > 1,
                columns: l.columns,
                onRemove: (f) => w(r),
                onOperatorChanged: P,
                onFiltersChanged: o[2] || (o[2] = (f) => a("filtersChanged")),
                onFilterCallback: E
              }, null, 8, ["filters", "onUpdate:filters", "operator", "make-operator-after-fields", "columns", "onRemove"])), [
                [T, !l.isPrinting || !s(v)(e.value.fields[r])]
              ])
            ], 64))), 128))
          ], 40, se)
        ], 2),
        !l.hideOperator && e.value.fields.length && l.makeOperatorAfterFields ? (u(), c("span", {
          key: 1,
          class: "operator-span mx-2",
          title: s(d)("Change Filtering Method"),
          onClick: R(O, ["stop"])
        }, B(s(d)(l.operator)) + " : ", 9, ue)) : y("", !0)
      ]);
    };
  }
});
export {
  be as default
};
