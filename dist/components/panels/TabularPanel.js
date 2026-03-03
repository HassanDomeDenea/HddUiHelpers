import { defineComponent as w, resolveComponent as d, openBlock as t, createBlock as o, unref as a, isRef as D, withCtx as i, createVNode as N, createElementBlock as y, Fragment as v, renderList as R, createElementVNode as b, normalizeClass as x, createCommentVNode as q, toDisplayString as z, KeepAlive as E, resolveDynamicComponent as A, mergeProps as h, renderSlot as B } from "vue";
import F from "primevue/tabs";
import { useBasicAuthStore as I } from "HddUiHelpers/stores/basicAuth.ts";
import { isBoolean as U, isString as $, startCase as H } from "lodash-es";
const K = { class: "flex items-center gap-1" }, W = /* @__PURE__ */ w({
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
    const { t: C } = useI18n(), l = useRoute(), s = useRouter(), m = computed(() => u.tabs.filter((n) => U(n.visible) ? n.visible : $(n.permission) ? T.can(n.permission) : n.permission instanceof Array ? n.permission.every((c) => T.can(c)) : !0)), f = computed(
      () => u.basedOnRouteQuery ? l.query[u.queryName] : void 0
    ), T = I(), g = computed(() => m.value.map((n) => n.name)), r = ref(
      (u.basedOnRouteQuery ? l.query[u.queryName] : void 0) ?? u.initialTab ?? m.value[0]?.name
    );
    function O(n) {
      n !== r.value && g.value.includes(n) && (r.value = n);
    }
    function p() {
      u.basedOnRouteQuery && (typeof l.query[u.queryName] == "string" ? O(l.query[u.queryName]) : r.value ? s.replace({ query: { ...l.query, [u.queryName]: r.value } }) : r.value !== f.value && s.replace({ query: { ...l.query, [u.queryName]: r.value } }));
    }
    onActivated(() => {
      p();
    }), watch(r, (n) => {
      u.basedOnRouteQuery && (f.value ? s.push({ query: { ...l.query, [u.queryName]: n } }) : s.replace({ query: { ...l.query, [u.queryName]: n } }));
    }), watch(f, () => {
      u.basedOnRouteQuery && p();
    });
    const k = ref([]);
    return watch(
      r,
      (n) => {
        k.value.includes(n) || k.value.push(n);
      },
      {
        immediate: !0
      }
    ), P({ currentTab: r }), (n, c) => {
      const Q = d("Tab"), L = d("TabList"), S = d("TabPanel"), V = d("TabPanels");
      return t(), o(a(F), {
        value: a(r),
        "onUpdate:value": c[0] || (c[0] = (e) => D(r) ? r.value = e : null),
        class: "HDD-TABULAR-PANEL"
      }, {
        default: i(() => [
          N(L, null, {
            default: i(() => [
              (t(!0), y(v, null, R(a(m), (e) => (t(), o(Q, {
                key: e.name,
                disabled: e.disabled,
                value: e.name
              }, {
                default: i(() => [
                  b("div", K, [
                    e.icon ? (t(), y("i", {
                      key: 0,
                      class: x(e.icon)
                    }, null, 2)) : q("", !0),
                    b("span", null, z(e.label ?? a(C)(a(H)(e.name))), 1)
                  ])
                ]),
                _: 2
              }, 1032, ["disabled", "value"]))), 128))
            ]),
            _: 1
          }),
          N(V, null, {
            default: i(() => [
              (t(!0), y(v, null, R(a(m), (e) => (t(), o(S, {
                key: e.name,
                value: e.name
              }, {
                default: i(() => [
                  u.keepAlive ? (t(), o(E, { key: 0 }, [
                    e.component && e.name === a(r) ? (t(), o(A(e.component), h({
                      key: 0,
                      ref_for: !0
                    }, e.binds), null, 16)) : e.name === a(r) ? B(n.$slots, e.name, { key: 1 }) : q("", !0)
                  ], 1024)) : !u.lazy || e.name === a(r) ? (t(), y(v, { key: 1 }, [
                    e.component ? (t(), o(A(e.component), h({
                      key: 0,
                      ref_for: !0
                    }, e.binds), null, 16)) : B(n.$slots, e.name, { key: 1 })
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
  W as default
};
