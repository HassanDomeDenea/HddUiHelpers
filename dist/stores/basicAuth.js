import { configureEcho as q, echo as f, echoIsConfigured as F } from "@laravel/echo-vue";
import { useCookies as H } from "@vueuse/integrations/useCookies";
import { useApiClient as _ } from "HddUiHelpers/stores/apiClient";
import { cloneDeep as m, each as j } from "lodash-es";
import { defineStore as D } from "pinia";
import { useHddUiHelpers as E } from "HddUiHelpers/plugins/HddUiHelpers";
import { safeRequest as P } from "../utils/safeTry.js";
import { useStorage as R } from "@vueuse/core";
const B = D("basicAuth", () => {
  const o = ref(null), r = E(), a = ref([]), i = _(), d = H(), u = R(
    "authorizationToken",
    new URLSearchParams(window.location.search).get("_authorization_token")
  ), h = computed(() => !!o.value), c = ref(m(r.defaultUserOptions)), l = ref(m({}));
  function v(e = null) {
    const n = m(r.defaultUserOptions);
    e && j(e, (t, s) => {
      n[s] = t;
    }), c.value = n;
  }
  function C(e, n) {
    o.value = e, v(e.options), l.value = e.global_options ?? {}, u.value = n, d.set("authorizationToken", n, {
      secure: window.location.protocol === "https:"
    });
  }
  function U() {
    o.value = null, v(), u.value = null, d.remove("authorizationToken");
  }
  async function k(e, n) {
    try {
      await i.request({ method: "post", url: "/api/change-option" }, { option: e, value: n }), c.value[e] = n;
    } catch (t) {
      throw i.toastError(t?.response?.data?.message ?? ""), t;
    }
  }
  async function T(e, n) {
    try {
      const t = {
        method: "put",
        url: "/api/global_options"
      };
      if (n instanceof File) {
        const s = new FormData();
        s.append("option", e), s.append("value", n), s.append("_method", t.method);
        const S = await i.request(
          {
            url: t.url,
            method: "POST",
            headers: {
              "Content-Type": "multipart/form-data"
            }
          },
          s
        );
        l.value[e] = S.data.data;
      } else
        await i.request(t, { option: e, value: n }), l.value[e] = n;
    } catch (t) {
      throw i.toastError(t?.response?.data?.message ?? ""), t;
    }
  }
  function y(e) {
    return o.value?.role_names?.includes(e) === !0;
  }
  const b = computed(() => o.value?.role_names?.includes("super_admin") === !0);
  function O(...e) {
    return o.value ? o.value.role_names?.includes("super_admin") ? !0 : o.value.permission_names ? e.some((n) => o.value?.permission_names?.includes(n)) : !1 : !1;
  }
  function g(e, n, t = void 0) {
    return p(e) ? n : t;
  }
  function z(e) {
    return !p(e);
  }
  function p(e) {
    return o.value ? o.value.role_names?.includes("super_admin") ? !0 : o.value.permission_names ? Array.isArray(e) ? e.every((n) => o.value?.permission_names?.includes(n)) : o.value.permission_names.includes(e) : !1 : !1;
  }
  const w = ref();
  r.withBroadcasting && watch(
    h,
    (e) => {
      console.log(r.presenceUsersChannel), e ? (q({
        broadcaster: "reverb",
        bearerToken: u.value
      }), r.presenceUsersChannel && (w.value = f().join(r.presenceUsersChannel).here((n) => {
        a.value = n;
      }).joining((n) => {
        a.value.push(n);
      }).leaving((n) => {
        a.value = a.value.filter((t) => t.id !== n.id);
      }))) : r.presenceUsersChannel && (F() && (f().leave(r.presenceUsersChannel), f().disconnect()), w.value = null, a.value = []);
    },
    {
      immediate: !0
    }
  );
  const A = computed(() => o.value?.name ?? "");
  return {
    canAny: O,
    ifCan: g,
    userFullName: A,
    ifHasPermission: g,
    can: p,
    cannot: z,
    hasRole: y,
    isSuperAdmin: b,
    changeOption: k,
    changeGlobalOption: T,
    options: c,
    connectedUsers: a,
    globalOptions: l,
    isLoggedIn: h,
    user: o,
    authorizationToken: computed(() => u.value),
    login: C,
    logout: U
  };
});
async function Q() {
  const o = B(), r = _();
  if (o.authorizationToken) {
    const [a] = await P(() => r.get("/api/me"));
    a && o.login(a, o.authorizationToken);
  }
}
export {
  Q as setUserFromToken,
  B as useBasicAuthStore
};
