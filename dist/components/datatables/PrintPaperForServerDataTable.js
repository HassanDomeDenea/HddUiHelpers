import { defineComponent as V, ref as k, useModel as U, openBlock as r, createElementBlock as l, createElementVNode as o, unref as a, createCommentVNode as s, renderSlot as P, toDisplayString as c, createVNode as p, normalizeClass as I, Fragment as h, renderList as y, normalizeStyle as w, mergeModels as M } from "vue";
import H from "HddUiHelpers/components/datatables/CellContent.vue";
import $ from "HddUiHelpers/components/datatables/filters/ToolbarFilterWrapper.vue";
import { isToolbarFilterEmpty as q, getColumnName as L, getColumnTitle as R, getColumnBodyClass as j, getColumnSlotName as E } from "HddUiHelpers/components/datatables/ServerDataTableUtilities.ts";
import { useBasicAuthStore as z } from "HddUiHelpers/stores/basicAuth.ts";
import { printDomWithStyles as K } from "HddUiHelpers/utils/printDom.ts";
const O = { class: "hidden" }, W = {
  key: 0,
  hidden: "",
  class: "flex items-center justify-center text-3xl font-bold"
}, A = ["src", "alt"], G = { class: "my-2 text-center text-xl font-bold" }, J = { class: "flex justify-start ps-4" }, Q = {
  key: 0,
  class: "mt-1"
}, X = { class: "underline-offset-5 underline" }, Y = { key: 1 }, Z = { class: "mt-1" }, _ = { class: "underline-offset-5 underline" }, ee = ["dir"], te = { class: "printable-table mx-auto mt-3" }, re = { key: 0 }, le = { class: "flex items-center gap-1" }, oe = { class: "flex-grow-1" }, ae = { key: 0 }, ne = {
  key: 0,
  class: "i-mdi:sort-ascending scale-y-[-1]"
}, se = {
  key: 1,
  class: "i-mdi:sort-descending scale-y-[-1]"
}, ie = { key: 0 }, de = { key: 0 }, ue = { key: 0 }, ce = ["innerHTML"], Ce = /* @__PURE__ */ V({
  __name: "PrintPaperForServerDataTable",
  props: /* @__PURE__ */ M({
    checkColumnIsVisible: { type: Function },
    columns: {},
    sorts: {},
    mappedColumns: {},
    getColumnBody: { type: Function },
    getData: { type: Function },
    firstPageHeaderImageUrl: {},
    headerImageUrl: {},
    footerImageUrl: {},
    hasSequenceColumn: { type: Boolean },
    showPageCounter: { type: Boolean },
    hasSorts: { type: Boolean },
    showCurrentPrintTime: { type: Boolean },
    primaryKey: { default: "id" },
    printDirection: { default: () => {
    } },
    records: {},
    extraData: {},
    toolbarFilters: {},
    filters: {},
    title: { default: () => {
    } }
  }, {
    isPrinting: { type: Boolean, default: !1 },
    isPrintingModifiers: {}
  }),
  emits: ["update:isPrinting"],
  setup(e, { expose: D }) {
    const v = L, u = k([]), m = k(), C = k(!1), x = useTemplateRef("printNodeRef"), F = U(e, "isPrinting"), T = z();
    async function B(n = !1, i = {}) {
      F.value = !0;
      try {
        if (n) {
          const g = (await e.getData(-1, null, i)).data.data;
          u.value = g.data, m.value = g.extra;
        } else
          u.value = toValue(e.records), m.value = toValue(e.extraData);
        C.value = !0, await nextTick();
        const t = x.value;
        t && await K(t, {
          pageCounter: e.showPageCounter,
          leftMargin: 8,
          rightMargin: 8,
          topMargin: 8,
          bottomMargin: 8,
          showPrintTime: e.showCurrentPrintTime,
          firstPageHeaderImageUrl: toValue(e.firstPageHeaderImageUrl),
          headerImageUrl: toValue(e.headerImageUrl),
          footerImageUrl: toValue(e.footerImageUrl)
        });
      } catch (t) {
        console.error(t);
      }
      C.value = !1, F.value = !1;
    }
    const { t: b } = useI18n();
    D({ print: B });
    const S = computed(() => e.sorts.reduce(
      (n, i) => (n[i.field] = i.direction, n),
      {}
    )), f = computed(() => e.columns.filter((n) => n.printable !== !1 && e.checkColumnIsVisible(n))), N = computed(() => f.value.some((n) => n.footer));
    return (n, i) => (r(), l("div", O, [
      C.value ? (r(), l("div", {
        key: 0,
        ref_key: "printNodeRef",
        ref: x,
        class: "bg-white text-black"
      }, [
        n.toValue(e.headerImageUrl) ? (r(), l("div", W, [
          o("img", {
            src: n.toValue(e.headerImageUrl),
            style: { width: "100%" },
            alt: a(T).user.global_options.city_name
          }, null, 8, A)
        ])) : s("", !0),
        P(n.$slots, "printPageHeader", {
          records: u.value,
          extra: m.value
        }, () => [
          o("div", G, c(e.title), 1)
        ]),
        o("div", J, [
          o("div", null, [
            e.filters._global?.value ? (r(), l("div", Q, [
              o("span", X, c(a(b)("Search")), 1),
              i[0] || (i[0] = o("span", { class: "" }, ": ", -1)),
              o("span", null, c(e.filters._global.value), 1)
            ])) : s("", !0),
            a(q)(e.toolbarFilters) ? s("", !0) : (r(), l("div", Y, [
              o("div", Z, [
                o("span", _, c(a(b)("Filtering Options")), 1),
                i[1] || (i[1] = o("span", null, ": ", -1))
              ]),
              p($, {
                "is-printing": "",
                filters: e.toolbarFilters,
                "hide-operator": !0,
                columns: e.mappedColumns,
                operator: e.toolbarFilters.operator
              }, null, 8, ["filters", "columns", "operator"])
            ]))
          ])
        ]),
        o("div", {
          dir: e.printDirection,
          class: I({
            "ltr text-left": e.printDirection === "ltr",
            "rtl text-right": e.printDirection === "rtl"
          })
        }, [
          o("table", te, [
            o("thead", null, [
              o("tr", null, [
                e.hasSequenceColumn ? (r(), l("th", re, "#")) : s("", !0),
                (r(!0), l(h, null, y(a(f), (t) => (r(), l("th", {
                  key: a(v)(t)
                }, [
                  o("div", le, [
                    o("span", oe, c(t.printLabel ?? a(R)(t, a(b))), 1),
                    e.hasSorts && a(S)[t.sortField ?? t.fullFieldName] ? (r(), l("span", ae, [
                      a(S)[t.sortField ?? t.fullFieldName] === "asc" ? (r(), l("i", ne)) : (r(), l("i", se))
                    ])) : s("", !0)
                  ])
                ]))), 128))
              ])
            ]),
            o("tbody", null, [
              (r(!0), l(h, null, y(u.value, (t, g) => (r(), l("tr", {
                key: t[e.primaryKey]
              }, [
                e.hasSequenceColumn ? (r(), l("td", ie, c(g + 1), 1)) : s("", !0),
                (r(!0), l(h, null, y(a(f), (d) => (r(), l("td", {
                  key: a(v)(d),
                  style: w(d.bodyStyle),
                  class: I(d.bodyClass ? a(j)(t, d) : null)
                }, [
                  P(n.$slots, `${a(E)(d)}ColumnPrintBody`, {}, () => [
                    p(H, {
                      column: d,
                      "rendered-data": e.getColumnBody(t, d),
                      row: t
                    }, null, 8, ["column", "rendered-data", "row"])
                  ])
                ], 6))), 128))
              ]))), 128))
            ]),
            a(N) ? (r(), l("tfoot", de, [
              o("tr", null, [
                e.hasSequenceColumn ? (r(), l("th", ue, "xx")) : s("", !0),
                (r(!0), l(h, null, y(a(f), (t) => (r(), l("th", {
                  key: a(v)(t)
                }, [
                  t.footer ? (r(), l("span", {
                    key: 0,
                    innerHTML: typeof t.footer == "string" ? t.footer : t.footer(u.value)
                  }, null, 8, ce)) : s("", !0)
                ]))), 128))
              ])
            ])) : s("", !0)
          ])
        ], 10, ee),
        o("div", null, [
          P(n.$slots, "printPageFooter", {
            records: u.value,
            extra: m.value
          })
        ])
      ], 512)) : s("", !0)
    ]));
  }
});
export {
  Ce as default
};
