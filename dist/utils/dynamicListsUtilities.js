import { useEcho as ee } from "@laravel/echo-vue";
import { useApiClient as te } from "HddUiHelpers/stores/apiClient.ts";
import { reduce as re, keyBy as C, orderBy as ne, debounce as ae, startCase as ie, omit as O, uniq as se, map as le, uniqueId as j, set as P, unset as _, get as B } from "lodash-es";
import b from "moment";
function de(i, e = {}) {
  const n = e.idProperty ?? "id", c = e.labelProperty ?? "name", v = e.isActiveProperty ?? "is_active", D = e.disabledProperty ?? "disabled", M = e.refreshable ?? !1, N = e.withoutPagination ?? !0, E = e.refreshTime ?? 5, g = (typeof i == "string" ? i : i.url).toString().replace(/[^a-zA-Z0-9]/g, "_");
  let l, m;
  if (e.storage) {
    const t = e.storage === "session" ? window.sessionStorage : window.localStorage;
    m = useStorage(
      "dynamic_lists_" + g + "_last_fetched_at",
      b().toISOString(),
      t
    ), (e.storageDuration ?? 0) > 0 && m.value && b().diff(b(m.value), "seconds") > (e.storageDuration ?? 0) && t.removeItem("dynamic_lists_" + g), l = useStorage("dynamic_lists_" + g, null, t, {
      serializer: {
        read: (r) => (r ? JSON.parse(r) : null) || null,
        write: (r) => JSON.stringify(r)
      }
    });
  }
  l || (l = ref(null)), m || (m = ref(null));
  const w = e.sortBy ?? "uses", R = e.sortByDirection ?? "asc", q = te(), U = computed(() => !!l.value), f = computed(() => (l.value || d().then(), l.value ?? [])), $ = computed(() => (f.value || []).filter((t) => t[v] === !0)), x = computed(() => (f.value || []).map((t) => (t[D] = !t[v], t))), p = computed(() => (l.value || d().then(), re(
    l.value || [],
    (t, r) => (t[r[n]] = r[c], t),
    {}
  ))), z = computed(() => (l.value || d().then(), C(l.value || [], n))), y = ref(!1), I = ref(!1);
  function J(t = !0) {
    I.value !== t && (I.value = t, d().then());
  }
  const k = ref();
  async function d() {
    if (!y.value) {
      y.value = !0, clearTimeout(k.value);
      try {
        const t = { perPage: -1 };
        e.hasActiveItems && I.value !== !0 && (t.filters = {
          [v]: {
            operator: "and",
            constraints: [{ value: 1, matchMode: "equals" }]
          }
        });
        let r = "get", a = "";
        typeof i == "string" ? a = i : typeof i == "object" && (a = i.url, r = i.method);
        const s = await q.request({
          url: a,
          method: r,
          params: t
        });
        let o;
        N ? o = s.data.data : o = s.data.data.data, w ? l.value = ne(o, w, R) : l.value = o, m && (m.value = b().toISOString()), h.value && Object.values(h.value).forEach((u) => u(toValue(f)));
      } finally {
        y.value = !1, M && (k.value = setTimeout(
          () => {
            d();
          },
          E * 60 * 1e3
        ));
      }
    }
  }
  function W() {
    return new Promise((t) => {
      let r;
      r = watch(
        l,
        (a) => {
          try {
            a !== null ? (typeof r == "function" && r(), t()) : f.value;
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
  const Z = ae(d, 1e3);
  e.withBroadcasting && ee(
    "App.Models",
    [
      `.${e.modelName}Created`,
      `.${e.modelName}Updated`,
      `.${e.modelName}Deleted`,
      `.${e.modelName}Restored`
    ],
    (t) => {
      Z();
    }
  ), e.listenForWebsocket || e.websocketChangeEvent && e.listenForWebsocket;
  function G(t) {
    return typeof t != "object" ? p.value[t] : p.value[t[n]];
  }
  const A = ref({}), h = ref({});
  function H(t) {
    const r = j("serverListFirstLoadCallback_");
    onMounted(() => {
      P(A.value, r, t);
    }), onUnmounted(() => {
      _(A.value, r);
    });
  }
  function K(t, r = "mounted", a = !1) {
    const s = j("serverListRefreshCallback_");
    (r === "mounted" || r == "both") && (onMounted(() => {
      P(h.value, s, t);
    }), onUnmounted(() => {
      _(h.value, s);
    })), (r === "activated" || r == "both") && (onActivated(() => {
      P(h.value, s, t);
    }), onDeactivated(() => {
      _(h.value, s);
    })), a && t(toValue(f));
  }
  const T = computed(() => {
    if (e.childrenProperty) {
      let t = function(a, s = []) {
        return s.push(O(a, e.childrenProperty)), a[e.childrenProperty]?.map((o) => t(o, s)), s;
      };
      const r = [];
      return f.value.map((a) => t(a, r)), r;
    } else
      return f.value;
  }), F = function(t) {
    if (!t)
      return;
    function r(a) {
      for (const s of a) {
        if (B(s, e.idProperty ?? "id") === t)
          return s;
        const o = B(s, e.childrenProperty);
        if (o && o.length > 0) {
          const u = r(o);
          if (u)
            return u;
        }
      }
    }
    return r(f.value);
  }, S = function(t, r = !1) {
    if (!t)
      return [];
    let a;
    if (typeof t == "string" || typeof t == "number" ? a = F(t) : a = t, !a)
      return [];
    if (e.childrenProperty) {
      let s = function(u, L = []) {
        return L.push(O(u, e.childrenProperty)), u[e.childrenProperty]?.map((V) => s(V, L)), L;
      };
      const o = [];
      return r ? [a].map((u) => s(u, o)) : a[e.childrenProperty]?.map((u) => s(u, o)), o;
    } else
      return r ? [a] : [];
  }, Q = function(t, r) {
    const a = S(t, r);
    return se(le(a, n));
  }, X = computed(() => (l.value || d().then(), C(T.value, n)));
  function Y(t) {
    l.value?.push(t);
  }
  return {
    waitFirstLoad: W,
    isLoaded: U,
    items: f,
    getLabel: G,
    addItem: Y,
    flatList: T,
    onFirstLoad: H,
    onRefresh: K,
    keyItemPairItems: z,
    keyItemPairFlatItems: X,
    keyLabelPairItems: p,
    isLoading: y,
    refresh: d,
    activeItems: $,
    includeInactive: J,
    inActiveAsDisabledItems: x,
    getNestedItem: F,
    getFlatChildrenOfItem: S,
    getFlatIdsOfItem: Q
  };
}
function me(i) {
  return i && i.keyObjectPair;
}
function ve(i) {
  return {
    list: i,
    object: i.reduce((e, n) => (e[n.id] = n.name, e), {}),
    keyObjectPair: i.reduce((e, n) => (e[n.id] = n, e), {}),
    keyLabelPairItems: i.reduce((e, n) => (e[n.id] = n.name, e), {}),
    getById: (e) => i.find((n) => n.id === e)
  };
}
function he(i) {
  const e = i.map((n) => ({ name: n, id: n }));
  return {
    list: e,
    object: e.reduce((n, c) => (n[c.id] = c.name, n), {})
  };
}
function ye(i) {
  const { t: e } = useI18n(), n = i.map((c) => ({ name: e(ie(c + "")), id: c }));
  return {
    list: n,
    object: n.reduce((c, v) => (c[v.id] = v.name, c), {})
  };
}
export {
  de as createListStore,
  ve as createLocalList,
  ye as createLocalListAutoTitleLabel,
  he as createLocalListSameLabelValue,
  me as isLocalListType
};
