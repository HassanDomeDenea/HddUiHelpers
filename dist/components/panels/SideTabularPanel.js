import { defineComponent as B, resolveComponent as p, resolveDirective as D, openBlock as s, createBlock as h, withCtx as f, createElementVNode as l, normalizeClass as x, createVNode as M, unref as o, withDirectives as C, createElementBlock as c, mergeProps as w, toDisplayString as u, createCommentVNode as q, vShow as A, resolveDynamicComponent as I } from "vue";
import { isBoolean as E, isString as L } from "lodash-es";
import { useBasicAuthStore as P } from "HddUiHelpers/stores/basicAuth.ts";
const R = { class: "text-xl font-bold" }, V = { class: "flex" }, F = ["onClick"], T = { class: "ms-2" }, z = {
  key: 0,
  class: "border-surface bg-emphasis text-muted-color ms-auto rounded border p-1 text-xs"
}, H = { class: "flex-grow px-4 pt-2" }, U = {
  key: 1,
  class: "text-lg font-bold"
}, K = /* @__PURE__ */ B({
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
    const { t: b } = useI18n(), a = useRoute(), d = useRouter(), v = P(), m = computed(() => t.items.filter((e) => E(e.visible) ? e.visible : L(e.permission) ? v.can(e.permission) : e.permission instanceof Array ? e.permission.every((y) => v.can(y)) : !0));
    onActivated(() => {
      typeof a.query[t.queryName] == "string" ? n.value = a.query[t.queryName] : n.value ? d.replace({ query: { ...a.query, [t.queryName]: n.value } }) : t.autoSelectFirst && (n.value = m.value[0].name, d.replace({ query: { ...a.query, [t.queryName]: n.value } }));
    });
    const n = ref();
    function S(e) {
      n.value !== e.name && (d.push({ query: { ...a.query, [t.queryName]: e.name } }), n.value = e.name);
    }
    const i = computed(() => m.value.find((e) => n.value === e.name));
    return (e, y) => {
      const g = p("Menu"), k = p("Card"), N = D("ripple");
      return s(), h(k, { class: "HDD-SIDE-TABULAR-PANEL" }, {
        title: f(() => [
          l("div", R, u(t.title) + ":", 1)
        ]),
        content: f(() => [
          l("div", V, [
            l("div", {
              class: x(t.menuContainerClass)
            }, [
              M(g, { model: o(m) }, {
                item: f(({ item: r, props: _ }) => [
                  C((s(), c("a", w({ class: "flex items-center" }, _.action, {
                    class: {
                      "bg-secondary-1 rounded-lg font-bold": r.name === o(n)
                    },
                    onClick: ($) => S(r)
                  }), [
                    l("i", {
                      class: x(r.icon)
                    }, null, 2),
                    l("span", T, u(r.label), 1),
                    r.shortcut ? (s(), c("span", z, u(r.shortcut), 1)) : q("", !0)
                  ], 16, F)), [
                    [N]
                  ])
                ]),
                _: 1
              }, 8, ["model"])
            ], 2),
            l("div", H, [
              o(i)?.label ? C((s(), c("div", {
                key: 0,
                class: "light:text-purple-900 underline-offset-6 dark:underline-amber-100 light:underline-amber-900 ms-4 text-lg font-bold underline dark:text-purple-100"
              }, u(o(i).label) + ": ", 513)), [
                [A, t.showSelectedMenuLabel]
              ]) : (s(), c("div", U, u(o(b)("Please Select from Side Menu")), 1)),
              o(i) ? (s(), h(I(o(i).component), { key: 2 })) : q("", !0)
            ])
          ])
        ]),
        _: 1
      });
    };
  }
});
export {
  K as default
};
