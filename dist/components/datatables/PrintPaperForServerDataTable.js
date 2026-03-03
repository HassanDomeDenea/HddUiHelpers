import { defineComponent as w, ref as P, useTemplateRef as M, useModel as H, computed as x, openBlock as r, createElementBlock as l, unref as n, toValue as u, createElementVNode as o, createCommentVNode as s, renderSlot as F, toDisplayString as m, createVNode as D, normalizeClass as T, Fragment as y, renderList as v, normalizeStyle as $, mergeModels as q, nextTick as L } from "vue";
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
}, te = { class: "underline-offset-5 underline" }, re = { key: 1 }, le = { class: "mt-1" }, ne = { class: "underline-offset-5 underline" }, oe = ["dir"], ae = { class: "printable-table mx-auto mt-3" }, se = { key: 0 }, ie = { class: "flex items-center gap-1" }, de = { class: "flex-grow-1" }, ue = { key: 0 }, ce = {
  key: 0,
  class: "i-mdi:sort-ascending scale-y-[-1]"
}, me = {
  key: 1,
  class: "i-mdi:sort-descending scale-y-[-1]"
}, fe = { key: 0 }, ge = { key: 0 }, he = { key: 0 }, ye = ["innerHTML"], Se = /* @__PURE__ */ w({
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
    const C = z, c = P([]), f = P(), b = P(!1), S = M("printNodeRef"), I = H(e, "isPrinting"), N = A();
    async function U(a = !1, i = {}) {
      I.value = !0;
      try {
        if (a) {
          const h = (await e.getData(-1, null, i)).data.data;
          c.value = h.data, f.value = h.extra;
        } else
          c.value = u(e.records), f.value = u(e.extraData);
        b.value = !0, await L();
        const t = S.value;
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
      b.value = !1, I.value = !1;
    }
    const { t: k } = J();
    B({ print: U });
    const p = x(() => e.sorts.reduce(
      (a, i) => (a[i.field] = i.direction, a),
      {}
    )), g = x(() => e.columns.filter((a) => a.printable !== !1 && e.checkColumnIsVisible(a))), V = x(() => g.value.some((a) => a.footer));
    return (a, i) => (r(), l("div", Q, [
      b.value ? (r(), l("div", {
        key: 0,
        ref_key: "printNodeRef",
        ref: S,
        class: "bg-white text-black"
      }, [
        ("toValue" in a ? a.toValue : n(u))(e.headerImageUrl) ? (r(), l("div", X, [
          o("img", {
            src: ("toValue" in a ? a.toValue : n(u))(e.headerImageUrl),
            style: { width: "100%" },
            alt: n(N).user.global_options.city_name
          }, null, 8, Y)
        ])) : s("", !0),
        F(a.$slots, "printPageHeader", {
          records: c.value,
          extra: f.value
        }, () => [
          o("div", Z, m(e.title), 1)
        ]),
        o("div", _, [
          o("div", null, [
            e.filters._global?.value ? (r(), l("div", ee, [
              o("span", te, m(n(k)("Search")), 1),
              i[0] || (i[0] = o("span", { class: "" }, ": ", -1)),
              o("span", null, m(e.filters._global.value), 1)
            ])) : s("", !0),
            n(E)(e.toolbarFilters) ? s("", !0) : (r(), l("div", re, [
              o("div", le, [
                o("span", ne, m(n(k)("Filtering Options")), 1),
                i[1] || (i[1] = o("span", null, ": ", -1))
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
        o("div", {
          dir: e.printDirection,
          class: T({
            "ltr text-left": e.printDirection === "ltr",
            "rtl text-right": e.printDirection === "rtl"
          })
        }, [
          o("table", ae, [
            o("thead", null, [
              o("tr", null, [
                e.hasSequenceColumn ? (r(), l("th", se, "#")) : s("", !0),
                (r(!0), l(y, null, v(n(g), (t) => (r(), l("th", {
                  key: n(C)(t)
                }, [
                  o("div", ie, [
                    o("span", de, m(t.printLabel ?? n(K)(t, n(k))), 1),
                    e.hasSorts && n(p)[t.sortField ?? t.fullFieldName] ? (r(), l("span", ue, [
                      n(p)[t.sortField ?? t.fullFieldName] === "asc" ? (r(), l("i", ce)) : (r(), l("i", me))
                    ])) : s("", !0)
                  ])
                ]))), 128))
              ])
            ]),
            o("tbody", null, [
              (r(!0), l(y, null, v(c.value, (t, h) => (r(), l("tr", {
                key: t[e.primaryKey]
              }, [
                e.hasSequenceColumn ? (r(), l("td", fe, m(h + 1), 1)) : s("", !0),
                (r(!0), l(y, null, v(n(g), (d) => (r(), l("td", {
                  key: n(C)(d),
                  style: $(d.bodyStyle),
                  class: T(d.bodyClass ? n(O)(t, d) : null)
                }, [
                  F(a.$slots, `${n(W)(d)}ColumnPrintBody`, {}, () => [
                    D(R, {
                      column: d,
                      "rendered-data": e.getColumnBody(t, d),
                      row: t
                    }, null, 8, ["column", "rendered-data", "row"])
                  ])
                ], 6))), 128))
              ]))), 128))
            ]),
            n(V) ? (r(), l("tfoot", ge, [
              o("tr", null, [
                e.hasSequenceColumn ? (r(), l("th", he, "xx")) : s("", !0),
                (r(!0), l(y, null, v(n(g), (t) => (r(), l("th", {
                  key: n(C)(t)
                }, [
                  t.footer ? (r(), l("span", {
                    key: 0,
                    innerHTML: typeof t.footer == "string" ? t.footer : t.footer(c.value)
                  }, null, 8, ye)) : s("", !0)
                ]))), 128))
              ])
            ])) : s("", !0)
          ])
        ], 10, oe),
        o("div", null, [
          F(a.$slots, "printPageFooter", {
            records: c.value,
            extra: f.value
          })
        ])
      ], 512)) : s("", !0)
    ]));
  }
});
export {
  Se as default
};
