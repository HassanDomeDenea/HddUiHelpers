import z from "primevue/tabpanels";
import E from "primevue/tabpanel";
import w from "primevue/tablist";
import F from "primevue/tab";
import { defineComponent as I, computed as y, ref as R, onActivated as U, watch as v, openBlock as t, createBlock as a, unref as o, isRef as _, withCtx as i, createVNode as g, createElementBlock as f, Fragment as p, renderList as A, createElementVNode as B, normalizeClass as $, createCommentVNode as q, toDisplayString as H, KeepAlive as K, resolveDynamicComponent as h, mergeProps as C, renderSlot as O } from "vue";
import j from "primevue/tabs";
import { useBasicAuthStore as G } from "HddUiHelpers/stores/basicAuth.ts";
import { isBoolean as J, isString as M, startCase as W } from "lodash-es";
import { useI18n as X } from "vue-i18n";
import { useRoute as Y, useRouter as Z } from "vue-router";
const ee = { class: "flex items-center gap-1" }, ce = /* @__PURE__ */ I({
  __name: "TabularPanel",
  props: {
    basedOnRouteQuery: { type: Boolean, default: !0 },
    queryName: { default: "tab" },
    initialTab: {},
    lazy: { default: !0 },
    keepAlive: { type: Boolean, default: !0 },
    tabs: {}
  },
  setup(u, { expose: P }) {
    const { t: Q } = X(), l = Y(), s = Z(), m = y(() => u.tabs.filter((n) => J(n.visible) ? n.visible : M(n.permission) ? T.can(n.permission) : n.permission instanceof Array ? n.permission.every((c) => T.can(c)) : !0)), d = y(
      () => u.basedOnRouteQuery ? l.query[u.queryName] : void 0
    ), T = G(), b = y(() => m.value.map((n) => n.name)), r = R(
      (u.basedOnRouteQuery ? l.query[u.queryName] : void 0) ?? u.initialTab ?? m.value[0]?.name
    );
    function S(n) {
      n !== r.value && b.value.includes(n) && (r.value = n);
    }
    function k() {
      u.basedOnRouteQuery && (typeof l.query[u.queryName] == "string" ? S(l.query[u.queryName]) : r.value ? s.replace({ query: { ...l.query, [u.queryName]: r.value } }) : r.value !== d.value && s.replace({ query: { ...l.query, [u.queryName]: r.value } }));
    }
    U(() => {
      k();
    }), v(r, (n) => {
      u.basedOnRouteQuery && (d.value ? s.push({ query: { ...l.query, [u.queryName]: n } }) : s.replace({ query: { ...l.query, [u.queryName]: n } }));
    }), v(d, () => {
      u.basedOnRouteQuery && k();
    });
    const N = R([]);
    return v(
      r,
      (n) => {
        N.value.includes(n) || N.value.push(n);
      },
      {
        immediate: !0
      }
    ), P({ currentTab: r }), (n, c) => {
      const V = F, D = w, L = E, x = z;
      return t(), a(o(j), {
        value: o(r),
        "onUpdate:value": c[0] || (c[0] = (e) => _(r) ? r.value = e : null),
        class: "HDD-TABULAR-PANEL"
      }, {
        default: i(() => [
          g(D, null, {
            default: i(() => [
              (t(!0), f(p, null, A(o(m), (e) => (t(), a(V, {
                key: e.name,
                disabled: e.disabled,
                value: e.name
              }, {
                default: i(() => [
                  B("div", ee, [
                    e.icon ? (t(), f("i", {
                      key: 0,
                      class: $(e.icon)
                    }, null, 2)) : q("", !0),
                    B("span", null, H(e.label ?? o(Q)(o(W)(e.name))), 1)
                  ])
                ]),
                _: 2
              }, 1032, ["disabled", "value"]))), 128))
            ]),
            _: 1
          }),
          g(x, null, {
            default: i(() => [
              (t(!0), f(p, null, A(o(m), (e) => (t(), a(L, {
                key: e.name,
                value: e.name
              }, {
                default: i(() => [
                  u.keepAlive ? (t(), a(K, { key: 0 }, [
                    e.component && e.name === o(r) ? (t(), a(h(e.component), C({
                      key: 0,
                      ref_for: !0
                    }, e.binds), null, 16)) : e.name === o(r) ? O(n.$slots, e.name, { key: 1 }) : q("", !0)
                  ], 1024)) : !u.lazy || e.name === o(r) ? (t(), f(p, { key: 1 }, [
                    e.component ? (t(), a(h(e.component), C({
                      key: 0,
                      ref_for: !0
                    }, e.binds), null, 16)) : O(n.$slots, e.name, { key: 1 })
                  ], 64)) : q("", !0)
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
  ce as default
};
