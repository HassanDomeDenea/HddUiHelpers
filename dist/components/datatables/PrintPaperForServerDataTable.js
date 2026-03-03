import { defineComponent as M, ref as x, useTemplateRef as H, useModel as V, computed as P, openBlock as r, createElementBlock as l, toValue as u, createElementVNode as a, unref as o, createCommentVNode as s, renderSlot as F, toDisplayString as m, createVNode as D, normalizeClass as T, Fragment as y, renderList as v, normalizeStyle as $, mergeModels as q, nextTick as L } from "vue";
import R from "HddUiHelpers/components/datatables/CellContent.vue";
import j from "HddUiHelpers/components/datatables/filters/ToolbarFilterWrapper.vue";
import { isToolbarFilterEmpty as E, getColumnName as z, getColumnTitle as K, getColumnBodyClass as O, getColumnSlotName as W } from "HddUiHelpers/components/datatables/ServerDataTableUtilities.ts";
import { useBasicAuthStore as A } from "HddUiHelpers/stores/basicAuth.ts";
import { printDomWithStyles as G } from "HddUiHelpers/utils/printDom.ts";
import { useI18n as J } from "vue-i18n";
const Q = { class: "hidden" }, X = {
  key: 0,
  hidden: "",
  class: "flex items-center justify-center text-3xl font-bold"
}, Y = ["src", "alt"], Z = { class: "my-2 text-center text-xl font-bold" }, _ = { class: "flex justify-start ps-4" }, ee = {
  key: 0,
  class: "mt-1"
}, te = { class: "underline-offset-5 underline" }, re = { key: 1 }, le = { class: "mt-1" }, ae = { class: "underline-offset-5 underline" }, ne = ["dir"], oe = { class: "printable-table mx-auto mt-3" }, se = { key: 0 }, ie = { class: "flex items-center gap-1" }, de = { class: "flex-grow-1" }, ue = { key: 0 }, ce = {
  key: 0,
  class: "i-mdi:sort-ascending scale-y-[-1]"
}, me = {
  key: 1,
  class: "i-mdi:sort-descending scale-y-[-1]"
}, fe = { key: 0 }, ge = { key: 0 }, he = { key: 0 }, ye = ["innerHTML"], pe = /* @__PURE__ */ M({
  __name: "PrintPaperForServerDataTable",
  props: /* @__PURE__ */ q({
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
  setup(e, { expose: B }) {
    const C = z, c = x([]), f = x(), b = x(!1), p = H("printNodeRef"), S = V(e, "isPrinting"), N = A();
    async function U(n = !1, i = {}) {
      S.value = !0;
      try {
        if (n) {
          const h = (await e.getData(-1, null, i)).data.data;
          c.value = h.data, f.value = h.extra;
        } else
          c.value = u(e.records), f.value = u(e.extraData);
        b.value = !0, await L();
        const t = p.value;
        t && await G(t, {
          pageCounter: e.showPageCounter,
          leftMargin: 8,
          rightMargin: 8,
          topMargin: 8,
          bottomMargin: 8,
          showPrintTime: e.showCurrentPrintTime,
          firstPageHeaderImageUrl: u(e.firstPageHeaderImageUrl),
          headerImageUrl: u(e.headerImageUrl),
          footerImageUrl: u(e.footerImageUrl)
        });
      } catch (t) {
        console.error(t);
      }
      b.value = !1, S.value = !1;
    }
    const { t: k } = J();
    B({ print: U });
    const I = P(() => e.sorts.reduce(
      (n, i) => (n[i.field] = i.direction, n),
      {}
    )), g = P(() => e.columns.filter((n) => n.printable !== !1 && e.checkColumnIsVisible(n))), w = P(() => g.value.some((n) => n.footer));
    return (n, i) => (r(), l("div", Q, [
      b.value ? (r(), l("div", {
        key: 0,
        ref_key: "printNodeRef",
        ref: p,
        class: "bg-white text-black"
      }, [
        u(e.headerImageUrl) ? (r(), l("div", X, [
          a("img", {
            src: u(e.headerImageUrl),
            style: { width: "100%" },
            alt: o(N).user.global_options.app_name
          }, null, 8, Y)
        ])) : s("", !0),
        F(n.$slots, "printPageHeader", {
          records: c.value,
          extra: f.value
        }, () => [
          a("div", Z, m(e.title), 1)
        ]),
        a("div", _, [
          a("div", null, [
            e.filters._global?.value ? (r(), l("div", ee, [
              a("span", te, m(o(k)("Search")), 1),
              i[0] || (i[0] = a("span", { class: "" }, ": ", -1)),
              a("span", null, m(e.filters._global.value), 1)
            ])) : s("", !0),
            o(E)(e.toolbarFilters) ? s("", !0) : (r(), l("div", re, [
              a("div", le, [
                a("span", ae, m(o(k)("Filtering Options")), 1),
                i[1] || (i[1] = a("span", null, ": ", -1))
              ]),
              D(j, {
                "is-printing": "",
                filters: e.toolbarFilters,
                "hide-operator": !0,
                columns: e.mappedColumns,
                operator: e.toolbarFilters.operator
              }, null, 8, ["filters", "columns", "operator"])
            ]))
          ])
        ]),
        a("div", {
          dir: e.printDirection,
          class: T({
            "ltr text-left": e.printDirection === "ltr",
            "rtl text-right": e.printDirection === "rtl"
          })
        }, [
          a("table", oe, [
            a("thead", null, [
              a("tr", null, [
                e.hasSequenceColumn ? (r(), l("th", se, "#")) : s("", !0),
                (r(!0), l(y, null, v(g.value, (t) => (r(), l("th", {
                  key: o(C)(t)
                }, [
                  a("div", ie, [
                    a("span", de, m(t.printLabel ?? o(K)(t, o(k))), 1),
                    e.hasSorts && I.value[t.sortField ?? t.fullFieldName] ? (r(), l("span", ue, [
                      I.value[t.sortField ?? t.fullFieldName] === "asc" ? (r(), l("i", ce)) : (r(), l("i", me))
                    ])) : s("", !0)
                  ])
                ]))), 128))
              ])
            ]),
            a("tbody", null, [
              (r(!0), l(y, null, v(c.value, (t, h) => (r(), l("tr", {
                key: t[e.primaryKey]
              }, [
                e.hasSequenceColumn ? (r(), l("td", fe, m(h + 1), 1)) : s("", !0),
                (r(!0), l(y, null, v(g.value, (d) => (r(), l("td", {
                  key: o(C)(d),
                  style: $(d.bodyStyle),
                  class: T(d.bodyClass ? o(O)(t, d) : null)
                }, [
                  F(n.$slots, `${o(W)(d)}ColumnPrintBody`, {}, () => [
                    D(R, {
                      column: d,
                      "rendered-data": e.getColumnBody(t, d),
                      row: t
                    }, null, 8, ["column", "rendered-data", "row"])
                  ])
                ], 6))), 128))
              ]))), 128))
            ]),
            w.value ? (r(), l("tfoot", ge, [
              a("tr", null, [
                e.hasSequenceColumn ? (r(), l("th", he, "xx")) : s("", !0),
                (r(!0), l(y, null, v(g.value, (t) => (r(), l("th", {
                  key: o(C)(t)
                }, [
                  t.footer ? (r(), l("span", {
                    key: 0,
                    innerHTML: typeof t.footer == "string" ? t.footer : t.footer(c.value)
                  }, null, 8, ye)) : s("", !0)
                ]))), 128))
              ])
            ])) : s("", !0)
          ])
        ], 10, ne),
        a("div", null, [
          F(n.$slots, "printPageFooter", {
            records: c.value,
            extra: f.value
          })
        ])
      ], 512)) : s("", !0)
    ]));
  }
});
export {
  pe as default
};
