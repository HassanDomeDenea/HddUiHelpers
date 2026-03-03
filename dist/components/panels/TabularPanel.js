import { defineComponent as E, computed as f, ref as b, onActivated as w, watch as v, resolveComponent as c, openBlock as a, createBlock as l, unref as q, withCtx as o, createVNode as A, createElementBlock as d, Fragment as T, renderList as B, createElementVNode as P, normalizeClass as F, createCommentVNode as p, toDisplayString as I, KeepAlive as U, resolveDynamicComponent as C, mergeProps as g, renderSlot as h } from "vue";
import $ from "primevue/tabs";
import { useBasicAuthStore as H } from "HddUiHelpers/stores/basicAuth.ts";
import { isBoolean as K, isString as j, startCase as G } from "lodash-es";
import { useI18n as J } from "vue-i18n";
import { useRoute as M, useRouter as W } from "vue-router";
const X = { class: "flex items-center gap-1" }, re = /* @__PURE__ */ E({
  __name: "TabularPanel",
  props: {
    basedOnRouteQuery: { type: Boolean, default: !0 },
    queryName: { default: "tab" },
    initialTab: {},
    lazy: { default: !0 },
    keepAlive: { type: Boolean, default: !0 },
    tabs: {}
  },
  setup(n, { expose: O }) {
    const { t: Q } = J(), t = M(), i = W(), s = f(() => n.tabs.filter((u) => K(u.visible) ? u.visible : j(u.permission) ? k.can(u.permission) : u.permission instanceof Array ? u.permission.every((m) => k.can(m)) : !0)), y = f(
      () => n.basedOnRouteQuery ? t.query[n.queryName] : void 0
    ), k = H(), L = f(() => s.value.map((u) => u.name)), r = b(
      (n.basedOnRouteQuery ? t.query[n.queryName] : void 0) ?? n.initialTab ?? s.value[0]?.name
    );
    function S(u) {
      u !== r.value && L.value.includes(u) && (r.value = u);
    }
    function N() {
      n.basedOnRouteQuery && (typeof t.query[n.queryName] == "string" ? S(t.query[n.queryName]) : r.value ? i.replace({ query: { ...t.query, [n.queryName]: r.value } }) : r.value !== y.value && i.replace({ query: { ...t.query, [n.queryName]: r.value } }));
    }
    w(() => {
      N();
    }), v(r, (u) => {
      n.basedOnRouteQuery && (y.value ? i.push({ query: { ...t.query, [n.queryName]: u } }) : i.replace({ query: { ...t.query, [n.queryName]: u } }));
    }), v(y, () => {
      n.basedOnRouteQuery && N();
    });
    const R = b([]);
    return v(
      r,
      (u) => {
        R.value.includes(u) || R.value.push(u);
      },
      {
        immediate: !0
      }
    ), O({ currentTab: r }), (u, m) => {
      const V = c("Tab"), D = c("TabList"), x = c("TabPanel"), z = c("TabPanels");
      return a(), l(q($), {
        value: r.value,
        "onUpdate:value": m[0] || (m[0] = (e) => r.value = e),
        class: "HDD-TABULAR-PANEL"
      }, {
        default: o(() => [
          A(D, null, {
            default: o(() => [
              (a(!0), d(T, null, B(s.value, (e) => (a(), l(V, {
                key: e.name,
                disabled: e.disabled,
                value: e.name
              }, {
                default: o(() => [
                  P("div", X, [
                    e.icon ? (a(), d("i", {
                      key: 0,
                      class: F(e.icon)
                    }, null, 2)) : p("", !0),
                    P("span", null, I(e.label ?? q(Q)(q(G)(e.name))), 1)
                  ])
                ]),
                _: 2
              }, 1032, ["disabled", "value"]))), 128))
            ]),
            _: 1
          }),
          A(z, null, {
            default: o(() => [
              (a(!0), d(T, null, B(s.value, (e) => (a(), l(x, {
                key: e.name,
                value: e.name
              }, {
                default: o(() => [
                  n.keepAlive ? (a(), l(U, { key: 0 }, [
                    e.component && e.name === r.value ? (a(), l(C(e.component), g({
                      key: 0,
                      ref_for: !0
                    }, e.binds), null, 16)) : e.name === r.value ? h(u.$slots, e.name, { key: 1 }) : p("", !0)
                  ], 1024)) : !n.lazy || e.name === r.value ? (a(), d(T, { key: 1 }, [
                    e.component ? (a(), l(C(e.component), g({
                      key: 0,
                      ref_for: !0
                    }, e.binds), null, 16)) : h(u.$slots, e.name, { key: 1 })
                  ], 64)) : p("", !0)
                ]),
                _: 2
              }, 1032, ["value"]))), 128))
            ]),
            _: 3
          })
        ]),
        _: 3
      }, 8, ["value"]);
    };
  }
});
export {
  re as default
};
