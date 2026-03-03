import { defineComponent as x, resolveComponent as p, openBlock as t, createElementBlock as l, renderSlot as u, createVNode as B, withCtx as S, createElementVNode as a, normalizeClass as c, toDisplayString as r, createCommentVNode as m, Fragment as h, renderList as y, unref as n } from "vue";
import { pick as z } from "lodash-es";
const M = { key: 0 }, $ = { key: 0 }, E = ["colspan"], N = ["onClick"], V = { key: 0 }, F = /* @__PURE__ */ x({
  __name: "SimpleDataTable",
  props: {
    values: {},
    only: {},
    headers: {},
    hideHead: { type: Boolean },
    rounded: { type: Boolean, default: !0 },
    showEmptyMessage: { type: Boolean },
    title: {},
    showSequenceColumn: { type: Boolean },
    severity: { default: "primary" },
    size: {},
    onRowClick: { type: Function }
  },
  emits: ["rowClick"],
  setup(e, { emit: C }) {
    const { t: v } = useI18n(), g = useTemplateRefsList(), f = useTemplateRef("theadRef"), d = computed(() => e.only ? e.values.map((s) => z(s, e.only)) : e.values), b = C;
    return (s, q) => {
      const w = p("Message");
      return t(), l("div", null, [
        u(s.$slots, "title", {}, () => [
          B(w, {
            severity: e.severity,
            variant: "simple",
            class: "[&_.p-message-text]:w-full"
          }, {
            default: S(() => [
              a("div", {
                class: c(["pb-4 pt-3 text-center text-2xl font-bold", { "pb-2 text-lg": e.size === "small", "pb-4 text-3xl": e.size === "large" }])
              }, r(e.title), 3)
            ]),
            _: 1
          }, 8, ["severity"])
        ]),
        a("table", {
          class: c(["hdd-simple-table", [e.severity, e.size, { "rounded-table": e.rounded }]])
        }, [
          e.hideHead !== !0 ? (t(), l("thead", {
            key: 0,
            ref_key: "theadRef",
            ref: f
          }, [
            a("tr", null, [
              e.showSequenceColumn ? (t(), l("th", M, "#")) : m("", !0),
              u(s.$slots, "header", {}, () => [
                (t(!0), l(h, null, y(e.headers ?? Object.keys(n(d)[0] ?? {}), (o, i) => (t(), l("th", {
                  key: i,
                  ref_for: !0,
                  ref: n(g).set
                }, r(o), 1))), 128))
              ])
            ])
          ], 512)) : m("", !0),
          a("tbody", null, [
            e.showEmptyMessage && n(d).length === 0 ? (t(), l("tr", $, [
              u(s.$slots, "emptyMessage", {}, () => [
                a("td", {
                  class: "font-italic text-muted text-center",
                  colspan: n(f)?.firstChild?.children?.length || 1
                }, r(n(v)("No Records")), 9, E)
              ])
            ])) : (t(!0), l(h, { key: 1 }, y(n(d), (o, i) => (t(), l("tr", {
              key: i,
              class: c({ "cursor-pointer": !!e.onRowClick }),
              onClick: (k) => b("rowClick", o)
            }, [
              e.showSequenceColumn ? (t(), l("td", V, r(i + 1), 1)) : m("", !0),
              u(s.$slots, "row", {
                row: o
              }, () => [
                (t(!0), l(h, null, y(o, (k, R) => (t(), l("td", { key: R }, r(k), 1))), 128))
              ])
            ], 10, N))), 128))
          ])
        ], 2)
      ]);
    };
  }
});
export {
  F as default
};
