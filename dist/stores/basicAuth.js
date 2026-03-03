import { configureEcho as H, echo as d, echoIsConfigured as j } from "@laravel/echo-vue";
import { useCookies as D } from "@vueuse/integrations/useCookies";
import { useApiClient as U } from "HddUiHelpers/stores/apiClient";
import { cloneDeep as h, each as E } from "lodash-es";
import { defineStore as P } from "pinia";
import { useHddUiHelpers as R } from "HddUiHelpers/plugins/HddUiHelpers";
import { safeRequest as B } from "../utils/safeTry.js";
import { useStorage as I } from "@vueuse/core";
import { ref as u, computed as p, watch as L } from "vue";
const x = P("basicAuth", () => {
  const o = u(null), r = R(), a = u([]), i = U(), v = D(), l = I(
    "authorizationToken",
    new URLSearchParams(window.location.search).get("_authorization_token")
  ), g = p(() => !!o.value), m = u(h(r.defaultUserOptions)), c = u(h({}));
  function w(e = null) {
    const n = h(r.defaultUserOptions);
    e && E(e, (t, s) => {
      n[s] = t;
    }), m.value = n;
  }
  function k(e, n) {
    o.value = e, w(e.options), c.value = e.global_options ?? {}, l.value = n, v.set("authorizationToken", n, {
      secure: window.location.protocol === "https:"
    });
  }
  function T() {
    o.value = null, w(), l.value = null, v.remove("authorizationToken");
  }
  async function y(e, n) {
    try {
      await i.request({ method: "post", url: "/api/change-option" }, { option: e, value: n }), m.value[e] = n;
    } catch (t) {
      throw i.toastError(t?.response?.data?.message ?? ""), t;
    }
  }
  async function b(e, n) {
    try {
      const t = {
        method: "put",
        url: "/api/global_options"
      };
      if (n instanceof File) {
        const s = new FormData();
        s.append("option", e), s.append("value", n), s.append("_method", t.method);
        const F = await i.request(
          {
            url: t.url,
            method: "POST",
            headers: {
              "Content-Type": "multipart/form-data"
            }
          },
          s
        );
        c.value[e] = F.data.data;
      } else
        await i.request(t, { option: e, value: n }), c.value[e] = n;
    } catch (t) {
      throw i.toastError(t?.response?.data?.message ?? ""), t;
    }
  }
  function O(e) {
    return o.value?.role_names?.includes(e) === !0;
  }
  const z = p(() => o.value?.role_names?.includes("super_admin") === !0);
  function A(...e) {
    return o.value ? o.value.role_names?.includes("super_admin") ? !0 : o.value.permission_names ? e.some((n) => o.value?.permission_names?.includes(n)) : !1 : !1;
  }
  function _(e, n, t = void 0) {
    return f(e) ? n : t;
  }
  function S(e) {
    return !f(e);
  }
  function f(e) {
    return o.value ? o.value.role_names?.includes("super_admin") ? !0 : o.value.permission_names ? Array.isArray(e) ? e.every((n) => o.value?.permission_names?.includes(n)) : o.value.permission_names.includes(e) : !1 : !1;
  }
  const C = u();
  r.withBroadcasting && L(
    g,
    (e) => {
      console.log(r.presenceUsersChannel), e ? (H({
        broadcaster: "reverb",
        bearerToken: l.value
      }), r.presenceUsersChannel && (C.value = d().join(r.presenceUsersChannel).here((n) => {
        a.value = n;
      }).joining((n) => {
        a.value.push(n);
      }).leaving((n) => {
        a.value = a.value.filter((t) => t.id !== n.id);
      }))) : r.presenceUsersChannel && (j() && (d().leave(r.presenceUsersChannel), d().disconnect()), C.value = null, a.value = []);
    },
    {
      immediate: !0
    }
  );
  const q = p(() => o.value?.name ?? "");
  return {
    canAny: A,
    ifCan: _,
    userFullName: q,
    ifHasPermission: _,
    can: f,
    cannot: S,
    hasRole: O,
    isSuperAdmin: z,
    changeOption: y,
    changeGlobalOption: b,
    options: m,
    connectedUsers: a,
    globalOptions: c,
    isLoggedIn: g,
    user: o,
    authorizationToken: p(() => l.value),
    login: k,
    logout: T
  };
});
async function Y() {
  const o = x(), r = U();
  if (o.authorizationToken) {
    const [a] = await B(() => r.get("/api/me"));
    a && o.login(a, o.authorizationToken);
  }
}
export {
  Y as setUserFromToken,
  x as useBasicAuthStore
};
