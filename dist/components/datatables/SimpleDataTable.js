import R from "primevue/message";
import { defineComponent as x, useTemplateRef as B, computed as S, openBlock as t, createElementBlock as l, renderSlot as u, createVNode as z, withCtx as $, createElementVNode as a, normalizeClass as c, toDisplayString as r, createCommentVNode as m, Fragment as h, renderList as y, unref as s } from "vue";
import { pick as E } from "lodash-es";
import { useI18n as M } from "vue-i18n";
import { useTemplateRefsList as N } from "@vueuse/core";
const V = { key: 0 }, q = { key: 0 }, T = ["colspan"], D = ["onClick"], F = { key: 0 }, I = /* @__PURE__ */ x({
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
    const { t: g } = M(), v = N(), f = B("theadRef"), d = S(() => e.only ? e.values.map((n) => E(n, e.only)) : e.values), b = C;
    return (n, H) => {
      const p = R;
      return t(), l("div", null, [
        u(n.$slots, "title", {}, () => [
          z(p, {
            severity: e.severity,
            variant: "simple",
            class: "[&_.p-message-text]:w-full"
          }, {
            default: $(() => [
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
              e.showSequenceColumn ? (t(), l("th", V, "#")) : m("", !0),
              u(n.$slots, "header", {}, () => [
                (t(!0), l(h, null, y(e.headers ?? Object.keys(s(d)[0] ?? {}), (o, i) => (t(), l("th", {
                  key: i,
                  ref_for: !0,
                  ref: s(v).set
                }, r(o), 1))), 128))
              ])
            ])
          ], 512)) : m("", !0),
          a("tbody", null, [
            e.showEmptyMessage && s(d).length === 0 ? (t(), l("tr", q, [
              u(n.$slots, "emptyMessage", {}, () => [
                a("td", {
                  class: "font-italic text-muted text-center",
                  colspan: s(f)?.firstChild?.children?.length || 1
                }, r(s(g)("No Records")), 9, T)
              ])
            ])) : (t(!0), l(h, { key: 1 }, y(s(d), (o, i) => (t(), l("tr", {
              key: i,
              class: c({ "cursor-pointer": !!e.onRowClick }),
              onClick: (k) => b("rowClick", o)
            }, [
              e.showSequenceColumn ? (t(), l("td", F, r(i + 1), 1)) : m("", !0),
              u(n.$slots, "row", {
                row: o
              }, () => [
                (t(!0), l(h, null, y(o, (k, w) => (t(), l("td", { key: w }, r(k), 1))), 128))
              ])
            ], 10, D))), 128))
          ])
        ], 2)
      ]);
    };
  }
});
export {
  I as default
};
