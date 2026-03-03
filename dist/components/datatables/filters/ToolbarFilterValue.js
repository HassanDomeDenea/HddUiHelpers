import { defineComponent as X, useModel as Y, resolveComponent as p, openBlock as u, createElementBlock as m, createBlock as S, unref as t, createCommentVNode as v, createElementVNode as d, withModifiers as M, withDirectives as Z, vShow as ee, toDisplayString as F, normalizeStyle as te, normalizeClass as oe, createVNode as h, withCtx as A, isRef as D, mergeModels as T } from "vue";
import { getColumnTitle as le, getColumnCellFormatedText as ne, getFilterMatchModesByTypeOptions as ae, getColumnCanShowFilterMatchModes as re, getColumnCanShowFilterApplyButton as ie } from "HddUiHelpers/components/datatables/ServerDataTableUtilities.ts";
import { hidePrimevuePopovers as z } from "HddUiHelpers/plugins/primevue.ts";
import { useFormatters as se } from "HddUiHelpers/utils/useFormatters.ts";
import { isBoolean as ue, isNull as R, toLower as ce } from "lodash-es";
import _ from "moment";
import $ from "primevue/popover";
const me = ["data-sort-id"], de = ["title"], fe = { class: "w-[20px]" }, pe = ["title"], ve = { class: "ms-2 whitespace-pre-wrap font-bold" }, he = { class: "mx-2" }, ye = ["innerHTML"], ge = { class: "flex min-w-[200px] flex-col items-stretch gap-1" }, Ce = {
  key: 1,
  class: "mt-4 flex justify-end"
}, we = /* @__PURE__ */ X({
  __name: "ToolbarFilterValue",
  props: /* @__PURE__ */ T({
    operator: {},
    columns: {},
    isPrinting: { type: Boolean, default: !1 },
    canCreateGroup: { type: Boolean }
  }, {
    filter: {},
    filterModifiers: {}
  }),
  emits: /* @__PURE__ */ T(["remove", "isolateIntoGroup", "operatorChanged", "filterCallback"], ["update:filter"]),
  setup(r, { expose: I, emit: G }) {
    const y = G, a = Y(r, "filter"), P = useTemplateRef("filterDivRef"), { t: l } = useI18n(), n = computed(() => r.columns.find((e) => (e.filterField ?? e.fullFieldName) === a.value.field)), b = se(), N = computed(() => le(n.value, l)), g = computed(() => {
      let e = a.value.value;
      const o = ne(e, n.value, l);
      switch (n.value.type === "date" && n.value.dateFormat && (Array.isArray(e) ? e = e.map((c) => _(c).format(n.value.dateFormat)) : e = _(e).format(n.value.dateFormat)), n.value.type) {
        case "date":
          if (Array.isArray(e))
            return `<span class="inline-block ltr">${e[0]}</span> <span class="mx-1 italic font-light"> ${l("and")} </span> <span class="inline-block ltr">${e[1]}</span>`;
          break;
        case "price":
        case "numeric":
          const c = n.value.type === "price", f = typeof n.value.currency == "string" ? n.value.currency : void 0;
          return Array.isArray(e) ? `<span class="inline-block ltr">${c ? b.formatPrice(e[0], f) : e[0]}</span> <span class="mx-1 italic font-light"> ${l("and")} </span> <span class="inline-block ltr">${c ? b.formatPrice(e[1], f) : e[1]}</span>` : R(e) ? null : b.formatPrice(o, f);
        case "select":
          return Array.isArray(o) ? o.length === 1 ? o[0] : o.join(
            a.value.matchMode === "whereIn" ? `<span class="mx-1 italic font-light"> ${l("or")} </span>` : l(",") + " "
          ) : o;
        case "boolean":
          return ue(e) ? o : null;
      }
      return o || null;
    }), H = computed(() => {
      if (a.value.matchMode === "whereIn")
        return "=";
      {
        const e = w.value.find(
          (o) => o.value === a.value.matchMode
        );
        return e ? e.symbol ? e.symbol : ce(e.label) : l("?");
      }
    }), i = ref(), k = useTemplateRef("menuPopoverRef"), x = useTemplateRef("operatorChangerRef"), w = computed(() => ae(l)[n.value.type ?? "text"]);
    function L(e) {
      r.isPrinting || (i.value = {
        value: a.value.value,
        matchMode: a.value.matchMode
      }, k.value?.toggle(e));
    }
    function V() {
      a.value.value = i.value.value, a.value.matchMode = i.value.matchMode, k.value?.hide(), y("filterCallback", a.value);
    }
    function O() {
    }
    const C = ref();
    function U(e) {
      r.isPrinting || (C.value = r.operator, z(), x.value.toggle(e));
    }
    function j(e) {
      e && e !== r.operator && y("operatorChanged", e), x.value.hide();
    }
    const B = useTemplateRef("filterDivContextMenuRef");
    function E(e) {
      r.isPrinting || (z(), r.canCreateGroup && B.value.toggle(e));
    }
    const q = computed(() => [
      {
        label: l("Isolate into Group"),
        icon: "i-mdi:filter-multiple",
        command: () => {
          y("isolateIntoGroup");
        }
      }
    ]);
    function J() {
      P.value.click();
    }
    return I({ focus: J }), (e, o) => {
      const c = p("ContextMenu"), f = p("Select"), K = p("FilterControl"), Q = p("Button"), W = p("SelectButton");
      return u(), m("div", {
        "data-sort-id": a.value.id
      }, [
        r.isPrinting ? v("", !0) : (u(), S(c, {
          key: 0,
          ref_key: "filterDivContextMenuRef",
          ref: B,
          model: t(q)
        }, null, 8, ["model"])),
        d("div", {
          ref_key: "filterDivRef",
          ref: P,
          class: "border-1 py-0.25 m-1 flex select-none items-center rounded-xl border-gray-800/75 px-3 text-sm dark:border-gray-400/75",
          onClick: L,
          onContextmenu: M(E, ["prevent"])
        }, [
          r.isPrinting ? v("", !0) : Z((u(), m("i", {
            key: 0,
            class: "i-mdi-close text-danger-3 hover:text-danger-2 cursor-pointer print:hidden",
            tabindex: "-1",
            title: t(l)("Remove"),
            onClick: o[0] || (o[0] = M((s) => y("remove", a.value.field), ["stop"]))
          }, null, 8, de)), [
            [ee, !a.value.isFixed]
          ]),
          d("span", fe, [
            r.operator ? (u(), m("span", {
              key: 0,
              class: "mx-1 cursor-pointer rounded px-1 font-bold italic text-zinc-500 hover:bg-gray-200/75 dark:text-zinc-300 hover:dark:bg-gray-700/75",
              title: t(l)("Change Filtering Method"),
              onClick: M(U, ["stop"])
            }, F(t(l)(r.operator)), 9, pe)) : v("", !0)
          ]),
          d("span", ve, F(t(N)), 1),
          d("span", he, F(t(H)), 1),
          t(n).type === "color" && !t(R)(t(g)) ? (u(), m("span", {
            key: 1,
            class: oe(["hdd-color-box inline-block !cursor-initial", ["!size-5"]]),
            style: te({ backgroundColor: t(g) })
          }, null, 4)) : (u(), m("span", {
            key: 2,
            class: "ms- 2 font-bold",
            innerHTML: t(R)(t(g)) ? t(l)("?") : t(g)
          }, null, 8, ye))
        ], 544),
        h(t($), {
          ref_key: "menuPopoverRef",
          ref: k,
          onHide: O
        }, {
          default: A(() => [
            d("div", ge, [
              t(re)(t(n)) ? (u(), S(f, {
                key: 0,
                modelValue: t(i).matchMode,
                "onUpdate:modelValue": o[1] || (o[1] = (s) => t(i).matchMode = s),
                size: "small",
                "option-label": "label",
                "option-value": "value",
                options: t(w)
              }, null, 8, ["modelValue", "options"])) : v("", !0),
              h(K, {
                "filter-model": t(i),
                "onUpdate:filterModel": o[2] || (o[2] = (s) => D(i) ? i.value = s : null),
                "filter-callback": V,
                column: t(n),
                size: "small"
              }, null, 8, ["filter-model", "column"]),
              t(ie)(t(n)) ? (u(), m("div", Ce, [
                h(Q, {
                  size: "small",
                  label: t(l)("Apply"),
                  icon: "i-mdi-check",
                  severity: "success",
                  onClick: V
                }, null, 8, ["label"])
              ])) : v("", !0)
            ])
          ]),
          _: 1
        }, 512),
        h(t($), {
          ref_key: "operatorChangerRef",
          ref: x
        }, {
          default: A(() => [
            d("div", null, [
              h(W, {
                modelValue: t(C),
                "onUpdate:modelValue": o[3] || (o[3] = (s) => D(C) ? C.value = s : null),
                "option-label": "label",
                "option-value": "value",
                size: "small",
                fluid: "",
                options: [
                  { value: "and", label: t(l)("and") },
                  { value: "or", label: t(l)("or") }
                ],
                onChange: o[4] || (o[4] = (s) => j(s.value))
              }, null, 8, ["modelValue", "options"])
            ])
          ]),
          _: 1
        }, 512)
      ], 8, me);
    };
  }
});
export {
  we as default
};
