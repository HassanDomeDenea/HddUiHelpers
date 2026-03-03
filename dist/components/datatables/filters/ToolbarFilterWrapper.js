import D from "primevue/selectbutton";
import { defineComponent as I, useModel as q, useTemplateRef as k, nextTick as h, onMounted as j, ref as H, openBlock as f, createElementBlock as c, createBlock as b, unref as a, withCtx as J, createElementVNode as F, createVNode as K, isRef as Q, createCommentVNode as y, normalizeClass as X, withModifiers as R, toDisplayString as B, Fragment as M, renderList as Y, withDirectives as S, vShow as T, mergeModels as V } from "vue";
import { useSortable as Z, moveArrayElement as _ } from "@vueuse/integrations/useSortable";
import ee from "HddUiHelpers/components/datatables/filters/ToolbarFilterValue.vue";
import te from "HddUiHelpers/components/datatables/filters/ToolbarFilterWrapper.vue";
import { isToolbarFilterEmpty as m } from "HddUiHelpers/components/datatables/ServerDataTableUtilities.ts";
import { hidePrimevuePopovers as oe } from "HddUiHelpers/plugins/primevue.ts";
import { pullAt as le, uniqueId as re } from "lodash-es";
import ie from "primevue/popover";
import { isToolbarFilterValue as ne } from "../ServerDataTableTypes.js";
import { useI18n as ae } from "vue-i18n";
const se = ["title"], fe = ["data-custom-id"], ue = ["title"], W = "toolbarFiltersSortedEvent", ye = /* @__PURE__ */ I({
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
    const s = U, e = q(l, "filters"), v = k(
      "filtersRefs"
    ), { t: d } = ae();
    function w(t) {
      let o = !0;
      m(e.value.fields[t]) && (o = !1);
      const n = [...e.value.fields];
      n.splice(t, 1), e.value.fields = n, e.value.fields.length === 0 && s("remove", e.value), o && s("filtersChanged");
    }
    const p = k("filtersListWrapperRef");
    l.isPrinting || Z(p, e.value.fields, {
      group: "toolbar-filters",
      swapThreshold: 0.3,
      invertSwap: !0,
      onEnd: function(t) {
        if (t.from === t.to) {
          if (t.oldIndex === t.newIndex)
            return;
          const o = [...e.value.fields];
          _(o, t.oldIndex, t.newIndex, t), h(() => {
            e.value.fields = o;
          });
        } else {
          const o = [...e.value.fields], [n] = le(o, t.oldIndex), i = new CustomEvent(
            W,
            {
              detail: {
                toIndex: t.newIndex,
                item: n,
                callback: () => {
                  e.value.fields.length === 0 && s("remove", e.value);
                }
              }
            }
          );
          t.to.dispatchEvent(i), h(() => {
            e.value.fields = o;
          });
        }
      },
      onUpdate() {
      }
    });
    function E(t) {
      s("filterCallback", t), s("filtersChanged");
    }
    function P(t) {
      e.value.operator = t, m(e.value) || s("filtersChanged");
    }
    function A() {
      l.isPrinting;
    }
    function G(t) {
      let o = !0;
      const n = e.value.fields[t];
      m(n) && (o = !1);
      const i = [...e.value.fields];
      i[t] = {
        operator: "and",
        fields: [n],
        id: re("toolbar-filter-")
      }, e.value.fields = i, o && s("filtersChanged");
    }
    j(() => {
      p.value.addEventListener(
        W,
        function(t) {
          const { toIndex: o, item: n, callback: i } = t.detail, r = [...e.value.fields];
          r.splice(o, 0, n), h(() => {
            p.value.children[o].remove(), e.value.fields = r, m(n) || s("filtersChanged"), i && h(i);
          });
        }
      );
    });
    const g = H(), C = k("operatorChangerRef");
    function O(t) {
      l.isPrinting || (g.value = l.operator, oe(), C.value.toggle(t));
    }
    function x(t) {
      t && t !== l.operator && s("operatorChanged", t), C.value.hide();
    }
    function z() {
      v.value[0]?.focus?.();
    }
    function N(t) {
      v.value[t]?.focus?.();
    }
    function $() {
      v.value[e.value.fields.length - 1]?.focus?.();
    }
    return L({
      focusLast: $,
      focusFilter: N,
      focus: z
    }), (t, o) => {
      const n = D;
      return f(), c("div", null, [
        l.isPrinting ? y("", !0) : (f(), b(a(ie), {
          key: 0,
          ref_key: "operatorChangerRef",
          ref: C
        }, {
          default: J(() => [
            F("div", null, [
              K(n, {
                modelValue: a(g),
                "onUpdate:modelValue": o[0] || (o[0] = (i) => Q(g) ? g.value = i : null),
                "option-label": "label",
                "option-value": "value",
                size: "small",
                fluid: "",
                options: [
                  { value: "and", label: a(d)("and") },
                  { value: "or", label: a(d)("or") }
                ],
                onChange: o[1] || (o[1] = (i) => x(i.value))
              }, null, 8, ["modelValue", "options"])
            ])
          ]),
          _: 1
        }, 512)),
        F("div", {
          class: X({
            "border-1 my-2 me-1 ms-6 rounded-lg border-dashed border-zinc-600 dark:border-zinc-500/75": l.isGrouped
          })
        }, [
          !l.hideOperator && e.value.fields.length && !l.makeOperatorAfterFields ? (f(), c("span", {
            key: 0,
            title: a(d)("Change Filtering Method"),
            class: "operator-span mx-2",
            onClick: R(O, ["stop"])
          }, B(a(d)(l.operator)) + " :", 9, se)) : y("", !0),
          F("div", {
            ref_key: "filtersListWrapperRef",
            ref: p,
            "data-custom-id": e.value.id,
            onContextmenu: R(A, ["prevent"])
          }, [
            (f(!0), c(M, null, Y(e.value.fields, (i, r) => (f(), c(M, {
              key: i.id
            }, [
              a(ne)(e.value.fields[r]) ? S((f(), b(ee, {
                key: 0,
                ref_for: !0,
                ref_key: "filtersRefs",
                ref: v,
                filter: e.value.fields[r],
                "onUpdate:filter": (u) => e.value.fields[r] = u,
                "is-printing": l.isPrinting,
                operator: r !== 0 ? e.value.operator : null,
                columns: l.columns,
                "can-create-group": e.value.fields.length > 1,
                onFilterCallback: E,
                onRemove: (u) => w(r),
                onOperatorChanged: P,
                onIsolateIntoGroup: (u) => G(r)
              }, null, 8, ["filter", "onUpdate:filter", "is-printing", "operator", "columns", "can-create-group", "onRemove", "onIsolateIntoGroup"])), [
                [T, !l.isPrinting || !a(m)(e.value.fields[r])]
              ]) : S((f(), b(te, {
                key: 1,
                ref_for: !0,
                ref_key: "filtersRefs",
                ref: v,
                filters: e.value.fields[r],
                "onUpdate:filters": (u) => e.value.fields[r] = u,
                "is-grouped": "",
                operator: e.value.operator,
                "make-operator-after-fields": r === 0 && e.value.fields.length > 1,
                columns: l.columns,
                onRemove: (u) => w(r),
                onOperatorChanged: P,
                onFiltersChanged: o[2] || (o[2] = (u) => s("filtersChanged")),
                onFilterCallback: E
              }, null, 8, ["filters", "onUpdate:filters", "operator", "make-operator-after-fields", "columns", "onRemove"])), [
                [T, !l.isPrinting || !a(m)(e.value.fields[r])]
              ])
            ], 64))), 128))
          ], 40, fe)
        ], 2),
        !l.hideOperator && e.value.fields.length && l.makeOperatorAfterFields ? (f(), c("span", {
          key: 1,
          class: "operator-span mx-2",
          title: a(d)("Change Filtering Method"),
          onClick: R(O, ["stop"])
        }, B(a(d)(l.operator)) + " : ", 9, ue)) : y("", !0)
      ]);
    };
  }
});
export {
  ye as default
};
