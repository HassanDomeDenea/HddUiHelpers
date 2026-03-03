import { defineComponent as p, useTemplateRef as x, computed as B, resolveComponent as S, openBlock as t, createElementBlock as l, renderSlot as i, createVNode as z, withCtx as M, createElementVNode as o, normalizeClass as d, toDisplayString as a, createCommentVNode as c, Fragment as m, renderList as h, unref as k } from "vue";
import { pick as $ } from "lodash-es";
import { useI18n as E } from "vue-i18n";
import { useTemplateRefsList as N } from "@vueuse/core";
const V = { key: 0 }, q = { key: 0 }, T = ["colspan"], D = ["onClick"], F = { key: 0 }, G = /* @__PURE__ */ p({
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
  setup(e, { emit: v }) {
    const { t: C } = E(), g = N(), y = x("theadRef"), u = B(() => e.only ? e.values.map((s) => $(s, e.only)) : e.values), b = v;
    return (s, H) => {
      const w = S("Message");
      return t(), l("div", null, [
        i(s.$slots, "title", {}, () => [
          z(w, {
            severity: e.severity,
            variant: "simple",
            class: "[&_.p-message-text]:w-full"
          }, {
            default: M(() => [
              o("div", {
                class: d(["pb-4 pt-3 text-center text-2xl font-bold", { "pb-2 text-lg": e.size === "small", "pb-4 text-3xl": e.size === "large" }])
              }, a(e.title), 3)
            ]),
            _: 1
          }, 8, ["severity"])
        ]),
        o("table", {
          class: d(["hdd-simple-table", [e.severity, e.size, { "rounded-table": e.rounded }]])
        }, [
          e.hideHead !== !0 ? (t(), l("thead", {
            key: 0,
            ref_key: "theadRef",
            ref: y
          }, [
            o("tr", null, [
              e.showSequenceColumn ? (t(), l("th", V, "#")) : c("", !0),
              i(s.$slots, "header", {}, () => [
                (t(!0), l(m, null, h(e.headers ?? Object.keys(u.value[0] ?? {}), (n, r) => (t(), l("th", {
                  key: r,
                  ref_for: !0,
                  ref: k(g).set
                }, a(n), 1))), 128))
              ])
            ])
          ], 512)) : c("", !0),
          o("tbody", null, [
            e.showEmptyMessage && u.value.length === 0 ? (t(), l("tr", q, [
              i(s.$slots, "emptyMessage", {}, () => [
                o("td", {
                  class: "font-italic text-muted text-center",
                  colspan: y.value?.firstChild?.children?.length || 1
                }, a(k(C)("No Records")), 9, T)
              ])
            ])) : (t(!0), l(m, { key: 1 }, h(u.value, (n, r) => (t(), l("tr", {
              key: r,
              class: d({ "cursor-pointer": !!e.onRowClick }),
              onClick: (f) => b("rowClick", n)
            }, [
              e.showSequenceColumn ? (t(), l("td", F, a(r + 1), 1)) : c("", !0),
              i(s.$slots, "row", {
                row: n
              }, () => [
                (t(!0), l(m, null, h(n, (f, R) => (t(), l("td", { key: R }, a(f), 1))), 128))
              ])
            ], 10, D))), 128))
          ])
        ], 2)
      ]);
    };
  }
});
export {
  G as default
};
