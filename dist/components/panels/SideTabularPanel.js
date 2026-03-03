import { defineComponent as B, computed as y, onActivated as D, ref as M, resolveComponent as p, resolveDirective as w, openBlock as r, createBlock as h, withCtx as d, createElementVNode as l, normalizeClass as x, createVNode as A, withDirectives as C, createElementBlock as i, mergeProps as I, toDisplayString as a, createCommentVNode as q, vShow as E, unref as L, resolveDynamicComponent as P } from "vue";
import { isBoolean as R, isString as V } from "lodash-es";
import { useBasicAuthStore as F } from "HddUiHelpers/stores/basicAuth.ts";
import { useI18n as T } from "vue-i18n";
import { useRoute as z, useRouter as H } from "vue-router";
const U = { class: "text-xl font-bold" }, $ = { class: "flex" }, j = ["onClick"], G = { class: "ms-2" }, J = {
  key: 0,
  class: "border-surface bg-emphasis text-muted-color ms-auto rounded border p-1 text-xs"
}, K = { class: "flex-grow px-4 pt-2" }, O = {
  key: 1,
  class: "text-lg font-bold"
}, te = /* @__PURE__ */ B({
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
    const { t: b } = T(), s = z(), c = H(), f = F(), m = y(() => t.items.filter((e) => R(e.visible) ? e.visible : V(e.permission) ? f.can(e.permission) : e.permission instanceof Array ? e.permission.every((v) => f.can(v)) : !0));
    D(() => {
      typeof s.query[t.queryName] == "string" ? n.value = s.query[t.queryName] : n.value ? c.replace({ query: { ...s.query, [t.queryName]: n.value } }) : t.autoSelectFirst && (n.value = m.value[0].name, c.replace({ query: { ...s.query, [t.queryName]: n.value } }));
    });
    const n = M();
    function S(e) {
      n.value !== e.name && (c.push({ query: { ...s.query, [t.queryName]: e.name } }), n.value = e.name);
    }
    const u = y(() => m.value.find((e) => n.value === e.name));
    return (e, v) => {
      const g = p("Menu"), k = p("Card"), N = w("ripple");
      return r(), h(k, { class: "HDD-SIDE-TABULAR-PANEL" }, {
        title: d(() => [
          l("div", U, a(t.title) + ":", 1)
        ]),
        content: d(() => [
          l("div", $, [
            l("div", {
              class: x(t.menuContainerClass)
            }, [
              A(g, { model: m.value }, {
                item: d(({ item: o, props: _ }) => [
                  C((r(), i("a", I({ class: "flex items-center" }, _.action, {
                    class: {
                      "bg-secondary-1 rounded-lg font-bold": o.name === n.value
                    },
                    onClick: (Q) => S(o)
                  }), [
                    l("i", {
                      class: x(o.icon)
                    }, null, 2),
                    l("span", G, a(o.label), 1),
                    o.shortcut ? (r(), i("span", J, a(o.shortcut), 1)) : q("", !0)
                  ], 16, j)), [
                    [N]
                  ])
                ]),
                _: 1
              }, 8, ["model"])
            ], 2),
            l("div", K, [
              u.value?.label ? C((r(), i("div", {
                key: 0,
                class: "light:text-purple-900 underline-offset-6 dark:underline-amber-100 light:underline-amber-900 ms-4 text-lg font-bold underline dark:text-purple-100"
              }, a(u.value.label) + ": ", 513)), [
                [E, t.showSelectedMenuLabel]
              ]) : (r(), i("div", O, a(L(b)("Please Select from Side Menu")), 1)),
              u.value ? (r(), h(P(u.value.component), { key: 2 })) : q("", !0)
            ])
          ])
        ]),
        _: 1
      });
    };
  }
});
export {
  te as default
};
