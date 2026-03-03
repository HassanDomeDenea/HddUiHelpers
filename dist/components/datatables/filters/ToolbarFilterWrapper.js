import { defineComponent as N, useModel as $, resolveComponent as D, openBlock as u, createElementBlock as v, createBlock as C, unref as a, withCtx as I, createElementVNode as k, createVNode as q, isRef as j, createCommentVNode as b, normalizeClass as H, withModifiers as F, toDisplayString as E, Fragment as P, renderList as J, withDirectives as O, vShow as B, mergeModels as S } from "vue";
import { useSortable as K, moveArrayElement as Q } from "@vueuse/integrations/useSortable";
import X from "HddUiHelpers/components/datatables/filters/ToolbarFilterValue.vue";
import Y from "HddUiHelpers/components/datatables/filters/ToolbarFilterWrapper.vue";
import { isToolbarFilterEmpty as c } from "HddUiHelpers/components/datatables/ServerDataTableUtilities.ts";
import { hidePrimevuePopovers as Z } from "HddUiHelpers/plugins/primevue.ts";
import { pullAt as _, uniqueId as ee } from "lodash-es";
import te from "primevue/popover";
import { isToolbarFilterValue as oe } from "../ServerDataTableTypes.js";
const le = ["title"], re = ["data-custom-id"], ne = ["title"], M = "toolbarFiltersSortedEvent", pe = /* @__PURE__ */ N({
  __name: "ToolbarFilterWrapper",
  props: /* @__PURE__ */ S({
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
  emits: /* @__PURE__ */ S(["filterCallback", "filtersChanged", "remove", "operatorChanged"], ["update:filters"]),
  setup(l, { expose: V, emit: x }) {
    const s = x, e = $(l, "filters"), m = useTemplateRef(
      "filtersRefs"
    ), { t: d } = useI18n();
    function R(t) {
      let o = !0;
      c(e.value.fields[t]) && (o = !1);
      const i = [...e.value.fields];
      i.splice(t, 1), e.value.fields = i, e.value.fields.length === 0 && s("remove", e.value), o && s("filtersChanged");
    }
    const p = useTemplateRef("filtersListWrapperRef");
    l.isPrinting || K(p, e.value.fields, {
      group: "toolbar-filters",
      swapThreshold: 0.3,
      invertSwap: !0,
      onEnd: function(t) {
        if (t.from === t.to) {
          if (t.oldIndex === t.newIndex)
            return;
          const o = [...e.value.fields];
          Q(o, t.oldIndex, t.newIndex, t), nextTick(() => {
            e.value.fields = o;
          });
        } else {
          const o = [...e.value.fields], [i] = _(o, t.oldIndex), n = new CustomEvent(
            M,
            {
              detail: {
                toIndex: t.newIndex,
                item: i,
                callback: () => {
                  e.value.fields.length === 0 && s("remove", e.value);
                }
              }
            }
          );
          t.to.dispatchEvent(n), nextTick(() => {
            e.value.fields = o;
          });
        }
      },
      onUpdate() {
      }
    });
    function y(t) {
      s("filterCallback", t), s("filtersChanged");
    }
    function w(t) {
      e.value.operator = t, c(e.value) || s("filtersChanged");
    }
    function W() {
      l.isPrinting;
    }
    function L(t) {
      let o = !0;
      const i = e.value.fields[t];
      c(i) && (o = !1);
      const n = [...e.value.fields];
      n[t] = {
        operator: "and",
        fields: [i],
        id: ee("toolbar-filter-")
      }, e.value.fields = n, o && s("filtersChanged");
    }
    onMounted(() => {
      p.value.addEventListener(
        M,
        function(t) {
          const { toIndex: o, item: i, callback: n } = t.detail, r = [...e.value.fields];
          r.splice(o, 0, i), nextTick(() => {
            p.value.children[o].remove(), e.value.fields = r, c(i) || s("filtersChanged"), n && nextTick(n);
          });
        }
      );
    });
    const g = ref(), h = useTemplateRef("operatorChangerRef");
    function T(t) {
      l.isPrinting || (g.value = l.operator, Z(), h.value.toggle(t));
    }
    function U(t) {
      t && t !== l.operator && s("operatorChanged", t), h.value.hide();
    }
    function A() {
      m.value[0]?.focus?.();
    }
    function G(t) {
      m.value[t]?.focus?.();
    }
    function z() {
      m.value[e.value.fields.length - 1]?.focus?.();
    }
    return V({
      focusLast: z,
      focusFilter: G,
      focus: A
    }), (t, o) => {
      const i = D("SelectButton");
      return u(), v("div", null, [
        l.isPrinting ? b("", !0) : (u(), C(a(te), {
          key: 0,
          ref_key: "operatorChangerRef",
          ref: h
        }, {
          default: I(() => [
            k("div", null, [
              q(i, {
                modelValue: a(g),
                "onUpdate:modelValue": o[0] || (o[0] = (n) => j(g) ? g.value = n : null),
                "option-label": "label",
                "option-value": "value",
                size: "small",
                fluid: "",
                options: [
                  { value: "and", label: a(d)("and") },
                  { value: "or", label: a(d)("or") }
                ],
                onChange: o[1] || (o[1] = (n) => U(n.value))
              }, null, 8, ["modelValue", "options"])
            ])
          ]),
          _: 1
        }, 512)),
        k("div", {
          class: H({
            "border-1 my-2 me-1 ms-6 rounded-lg border-dashed border-zinc-600 dark:border-zinc-500/75": l.isGrouped
          })
        }, [
          !l.hideOperator && e.value.fields.length && !l.makeOperatorAfterFields ? (u(), v("span", {
            key: 0,
            title: a(d)("Change Filtering Method"),
            class: "operator-span mx-2",
            onClick: F(T, ["stop"])
          }, E(a(d)(l.operator)) + " :", 9, le)) : b("", !0),
          k("div", {
            ref_key: "filtersListWrapperRef",
            ref: p,
            "data-custom-id": e.value.id,
            onContextmenu: F(W, ["prevent"])
          }, [
            (u(!0), v(P, null, J(e.value.fields, (n, r) => (u(), v(P, {
              key: n.id
            }, [
              a(oe)(e.value.fields[r]) ? O((u(), C(X, {
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
                onFilterCallback: y,
                onRemove: (f) => R(r),
                onOperatorChanged: w,
                onIsolateIntoGroup: (f) => L(r)
              }, null, 8, ["filter", "onUpdate:filter", "is-printing", "operator", "columns", "can-create-group", "onRemove", "onIsolateIntoGroup"])), [
                [B, !l.isPrinting || !a(c)(e.value.fields[r])]
              ]) : O((u(), C(Y, {
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
                onRemove: (f) => R(r),
                onOperatorChanged: w,
                onFiltersChanged: o[2] || (o[2] = (f) => s("filtersChanged")),
                onFilterCallback: y
              }, null, 8, ["filters", "onUpdate:filters", "operator", "make-operator-after-fields", "columns", "onRemove"])), [
                [B, !l.isPrinting || !a(c)(e.value.fields[r])]
              ])
            ], 64))), 128))
          ], 40, re)
        ], 2),
        !l.hideOperator && e.value.fields.length && l.makeOperatorAfterFields ? (u(), v("span", {
          key: 1,
          class: "operator-span mx-2",
          title: a(d)("Change Filtering Method"),
          onClick: F(T, ["stop"])
        }, E(a(d)(l.operator)) + " : ", 9, ne)) : b("", !0)
      ]);
    };
  }
});
export {
  pe as default
};
