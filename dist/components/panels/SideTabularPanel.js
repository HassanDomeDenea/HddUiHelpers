import B from "primevue/ripple";
import w from "primevue/card";
import A from "primevue/menu";
import { defineComponent as D, computed as y, onActivated as M, ref as I, openBlock as s, createBlock as _, withCtx as f, createElementVNode as l, normalizeClass as h, createVNode as E, unref as o, withDirectives as x, createElementBlock as c, mergeProps as L, toDisplayString as u, createCommentVNode as g, vShow as P, resolveDynamicComponent as R } from "vue";
import { isBoolean as V, isString as F } from "lodash-es";
import { useBasicAuthStore as T } from "HddUiHelpers/stores/basicAuth.ts";
import { useI18n as z } from "vue-i18n";
import { useRoute as H, useRouter as U } from "vue-router";
const $ = { class: "text-xl font-bold" }, j = { class: "flex" }, G = ["onClick"], J = { class: "ms-2" }, K = {
  key: 0,
  class: "border-surface bg-emphasis text-muted-color ms-auto rounded border p-1 text-xs"
}, O = { class: "flex-grow px-4 pt-2" }, Q = {
  key: 1,
  class: "text-lg font-bold"
}, se = /* @__PURE__ */ D({
  __name: "SideTabularPanel",
  props: {
    items: {},
    title: {},
    queryName: { default: "menu" },
    menuContainerClass: {},
    autoSelectFirst: { type: Boolean, default: !0 },
    showSelectedMenuLabel: { type: Boolean, default: !0 }
  },
  setup(t) {
    const { t: q } = z(), i = H(), m = U(), p = T(), d = y(() => t.items.filter((e) => V(e.visible) ? e.visible : F(e.permission) ? p.can(e.permission) : e.permission instanceof Array ? e.permission.every((v) => p.can(v)) : !0));
    M(() => {
      typeof i.query[t.queryName] == "string" ? n.value = i.query[t.queryName] : n.value ? m.replace({ query: { ...i.query, [t.queryName]: n.value } }) : t.autoSelectFirst && (n.value = d.value[0].name, m.replace({ query: { ...i.query, [t.queryName]: n.value } }));
    });
    const n = I();
    function b(e) {
      n.value !== e.name && (m.push({ query: { ...i.query, [t.queryName]: e.name } }), n.value = e.name);
    }
    const a = y(() => d.value.find((e) => n.value === e.name));
    return (e, v) => {
      const C = A, S = w, k = B;
      return s(), _(S, { class: "HDD-SIDE-TABULAR-PANEL" }, {
        title: f(() => [
          l("div", $, u(t.title) + ":", 1)
        ]),
        content: f(() => [
          l("div", j, [
            l("div", {
              class: h(t.menuContainerClass)
            }, [
              E(C, { model: o(d) }, {
                item: f(({ item: r, props: N }) => [
                  x((s(), c("a", L({ class: "flex items-center" }, N.action, {
                    class: {
                      "bg-secondary-1 rounded-lg font-bold": r.name === o(n)
                    },
                    onClick: (W) => b(r)
                  }), [
                    l("i", {
                      class: h(r.icon)
                    }, null, 2),
                    l("span", J, u(r.label), 1),
                    r.shortcut ? (s(), c("span", K, u(r.shortcut), 1)) : g("", !0)
                  ], 16, G)), [
                    [k]
                  ])
                ]),
                _: 1
              }, 8, ["model"])
            ], 2),
            l("div", O, [
              o(a)?.label ? x((s(), c("div", {
                key: 0,
                class: "light:text-purple-900 underline-offset-6 dark:underline-amber-100 light:underline-amber-900 ms-4 text-lg font-bold underline dark:text-purple-100"
              }, u(o(a).label) + ": ", 513)), [
                [P, t.showSelectedMenuLabel]
              ]) : (s(), c("div", Q, u(o(q)("Please Select from Side Menu")), 1)),
              o(a) ? (s(), _(R(o(a).component), { key: 2 })) : g("", !0)
            ])
          ])
        ]),
        _: 1
      });
    };
  }
});
export {
  se as default
};
