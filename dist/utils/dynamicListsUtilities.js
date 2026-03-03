import { useEcho as se } from "@laravel/echo-vue";
import { useApiClient as le } from "HddUiHelpers/stores/apiClient.ts";
import { reduce as oe, keyBy as j, orderBy as ue, debounce as ce, startCase as fe, omit as B, uniq as de, map as me, uniqueId as D, set as w, unset as k, get as N } from "lodash-es";
import I from "moment";
import { useStorage as M } from "@vueuse/core";
import { ref as h, computed as m, toValue as E, onMounted as R, onUnmounted as q, onActivated as ve, onDeactivated as he, watch as ye } from "vue";
import { useI18n as be } from "vue-i18n";
function ke(i, e = {}) {
  const a = e.idProperty ?? "id", c = e.labelProperty ?? "name", y = e.isActiveProperty ?? "is_active", $ = e.disabledProperty ?? "disabled", U = e.refreshable ?? !1, x = e.withoutPagination ?? !0, z = e.refreshTime ?? 5, p = (typeof i == "string" ? i : i.url).toString().replace(/[^a-zA-Z0-9]/g, "_");
  let l, v;
  if (e.storage) {
    const t = e.storage === "session" ? window.sessionStorage : window.localStorage;
    v = M(
      "dynamic_lists_" + p + "_last_fetched_at",
      I().toISOString(),
      t
    ), (e.storageDuration ?? 0) > 0 && v.value && I().diff(I(v.value), "seconds") > (e.storageDuration ?? 0) && t.removeItem("dynamic_lists_" + p), l = M("dynamic_lists_" + p, null, t, {
      serializer: {
        read: (r) => (r ? JSON.parse(r) : null) || null,
        write: (r) => JSON.stringify(r)
      }
    });
  }
  l || (l = h(null)), v || (v = h(null));
  const A = e.sortBy ?? "uses", J = e.sortByDirection ?? "asc", W = le(), Z = m(() => !!l.value), f = m(() => (l.value || d().then(), l.value ?? [])), G = m(() => (f.value || []).filter((t) => t[y] === !0)), H = m(() => (f.value || []).map((t) => (t[$] = !t[y], t))), L = m(() => (l.value || d().then(), oe(
    l.value || [],
    (t, r) => (t[r[a]] = r[c], t),
    {}
  ))), K = m(() => (l.value || d().then(), j(l.value || [], a))), g = h(!1), P = h(!1);
  function Q(t = !0) {
    P.value !== t && (P.value = t, d().then());
  }
  const T = h();
  async function d() {
    if (!g.value) {
      g.value = !0, clearTimeout(T.value);
      try {
        const t = { perPage: -1 };
        e.hasActiveItems && P.value !== !0 && (t.filters = {
          [y]: {
            operator: "and",
            constraints: [{ value: 1, matchMode: "equals" }]
          }
        });
        let r = "get", n = "";
        typeof i == "string" ? n = i : typeof i == "object" && (n = i.url, r = i.method);
        const s = await W.request({
          url: n,
          method: r,
          params: t
        });
        let o;
        x ? o = s.data.data : o = s.data.data.data, A ? l.value = ue(o, A, J) : l.value = o, v && (v.value = I().toISOString()), b.value && Object.values(b.value).forEach((u) => u(E(f)));
      } finally {
        g.value = !1, U && (T.value = setTimeout(
          () => {
            d();
          },
          z * 60 * 1e3
        ));
      }
    }
  }
  function X() {
    return new Promise((t) => {
      let r;
      r = ye(
        l,
        (n) => {
          try {
            n !== null ? (typeof r == "function" && r(), t()) : f.value;
          } catch (s) {
            console.error(s);
          }
        },
        {
          immediate: !0
        }
      );
    });
  }
  e.subscribeToEvents && e.subscribeToEvents(l);
  const Y = ce(d, 1e3);
  e.withBroadcasting && se(
    "App.Models",
    [
      `.${e.modelName}Created`,
      `.${e.modelName}Updated`,
      `.${e.modelName}Deleted`,
      `.${e.modelName}Restored`
    ],
    (t) => {
      Y();
    }
  ), e.listenForWebsocket || e.websocketChangeEvent && e.listenForWebsocket;
  function V(t) {
    return typeof t != "object" ? L.value[t] : L.value[t[a]];
  }
  const F = h({}), b = h({});
  function ee(t) {
    const r = D("serverListFirstLoadCallback_");
    R(() => {
      w(F.value, r, t);
    }), q(() => {
      k(F.value, r);
    });
  }
  function te(t, r = "mounted", n = !1) {
    const s = D("serverListRefreshCallback_");
    (r === "mounted" || r == "both") && (R(() => {
      w(b.value, s, t);
    }), q(() => {
      k(b.value, s);
    })), (r === "activated" || r == "both") && (ve(() => {
      w(b.value, s, t);
    }), he(() => {
      k(b.value, s);
    })), n && t(E(f));
  }
  const C = m(() => {
    if (e.childrenProperty) {
      let t = function(n, s = []) {
        return s.push(B(n, e.childrenProperty)), n[e.childrenProperty]?.map((o) => t(o, s)), s;
      };
      const r = [];
      return f.value.map((n) => t(n, r)), r;
    } else
      return f.value;
  }), S = function(t) {
    if (!t)
      return;
    function r(n) {
      for (const s of n) {
        if (N(s, e.idProperty ?? "id") === t)
          return s;
        const o = N(s, e.childrenProperty);
        if (o && o.length > 0) {
          const u = r(o);
          if (u)
            return u;
        }
      }
    }
    return r(f.value);
  }, O = function(t, r = !1) {
    if (!t)
      return [];
    let n;
    if (typeof t == "string" || typeof t == "number" ? n = S(t) : n = t, !n)
      return [];
    if (e.childrenProperty) {
      let s = function(u, _ = []) {
        return _.push(B(u, e.childrenProperty)), u[e.childrenProperty]?.map((ie) => s(ie, _)), _;
      };
      const o = [];
      return r ? [n].map((u) => s(u, o)) : n[e.childrenProperty]?.map((u) => s(u, o)), o;
    } else
      return r ? [n] : [];
  }, re = function(t, r) {
    const n = O(t, r);
    return de(me(n, a));
  }, ae = m(() => (l.value || d().then(), j(C.value, a)));
  function ne(t) {
    l.value?.push(t);
  }
  return {
    waitFirstLoad: X,
    isLoaded: Z,
    items: f,
    getLabel: V,
    addItem: ne,
    flatList: C,
    onFirstLoad: ee,
    onRefresh: te,
    keyItemPairItems: K,
    keyItemPairFlatItems: ae,
    keyLabelPairItems: L,
    isLoading: g,
    refresh: d,
    activeItems: G,
    includeInactive: Q,
    inActiveAsDisabledItems: H,
    getNestedItem: S,
    getFlatChildrenOfItem: O,
    getFlatIdsOfItem: re
  };
}
function Ae(i) {
  return i && i.keyObjectPair;
}
function Te(i) {
  return {
    list: i,
    object: i.reduce((e, a) => (e[a.id] = a.name, e), {}),
    keyObjectPair: i.reduce((e, a) => (e[a.id] = a, e), {}),
    keyLabelPairItems: i.reduce((e, a) => (e[a.id] = a.name, e), {}),
    getById: (e) => i.find((a) => a.id === e)
  };
}
function Fe(i) {
  const e = i.map((a) => ({ name: a, id: a }));
  return {
    list: e,
    object: e.reduce((a, c) => (a[c.id] = c.name, a), {})
  };
}
function Ce(i) {
  const { t: e } = be(), a = i.map((c) => ({ name: e(fe(c + "")), id: c }));
  return {
    list: a,
    object: a.reduce((c, y) => (c[y.id] = y.name, c), {})
  };
}
export {
  ke as createListStore,
  Te as createLocalList,
  Ce as createLocalListAutoTitleLabel,
  Fe as createLocalListSameLabelValue,
  Ae as isLocalListType
};
