import { echoIsConfigured as P, echo as B } from "@laravel/echo-vue";
import D, { isAxiosError as H } from "axios";
import { useHddUiHelpers as $ } from "HddUiHelpers/plugins/HddUiHelpers";
import { useBasicAuthStore as _ } from "HddUiHelpers/stores/basicAuth";
import { defineStore as M } from "pinia";
import { ref as r, computed as N } from "vue";
function b(l, a, u = "") {
  if (a && typeof a == "object" && !(a instanceof File)) {
    const f = a;
    Object.keys(f).forEach((p) => {
      let i = f[p];
      const m = u ? `${u}[${p}]` : p;
      typeof i == "boolean" ? i = i ? 1 : 0 : i === null && (i = ""), b(l, i, m);
    });
  } else
    l.append(u, a);
}
const Y = M("apiClient", () => {
  const l = _(), a = r(null), u = r(null), f = r(), p = $();
  function i(e) {
    f.value = e;
  }
  function m(e) {
    a.value = e;
  }
  function q(e) {
    u.value = e;
  }
  const d = r(0), E = N(() => d.value > 0), v = r(0), h = r(!1), g = D.create({
    baseURL: "/",
    withCredentials: !1,
    headers: {
      accept: "application/json"
    }
  });
  g.interceptors.request.use((e) => (d.value++, l.authorizationToken && (e.headers.Authorization = `Bearer ${l.authorizationToken}`), p.withBroadcasting && P() && (e.headers["X-Socket-ID"] = B().socketId()), e)), g.interceptors.response.use(
    (e) => (d.value--, e),
    (e) => (j(0.2), d.value--, e.status === 401 && l.isLoggedIn && (l.logout(), console.log(e), f.value?.push({ path: "/login", query: { redirect_url: window.location.pathname } }).then()), Promise.reject(e))
  );
  const y = r(!1), A = r();
  function j(e) {
    y.value = !0, clearTimeout(A.value), A.value = setTimeout(() => {
      y.value = !1;
    }, e * 1e3);
  }
  const n = r(g);
  function w(e, t = null, s = !1) {
    return n.value.request({
      ...e,
      ...t ? { data: t } : {},
      ...s ? {} : { baseURL: "/" }
    });
  }
  function x(e) {
    n.value = e;
  }
  function F(e, t) {
    return n.value.get(e, t);
  }
  function I(e, t, s) {
    return n.value.post(e, t, s);
  }
  function L(e, t, s, z) {
    const c = new FormData();
    if (Array.isArray(t) || t instanceof FileList)
      for (let o = 0; o < t.length; o++)
        c.append("files[]", t[o]);
    else if (Object.keys(t).length > 0 && !(t instanceof File))
      for (const o in t)
        if (Array.isArray(t[o]) || t[o] instanceof FileList)
          for (let T = 0; T < t[o].length; T++)
            c.append(o + "[]", t[o][T]);
        else
          c.append(o, t[o]);
    else
      c.append("file", t);
    return s && b(c, s), typeof e != "string" && e.method.toLowerCase() !== "post" && c.append("_method", e.method), v.value = 0, h.value = !0, n.value.request({
      url: typeof e == "string" ? e : e.url,
      method: "POST",
      data: c,
      onUploadProgress(o) {
        o.lengthComputable && (v.value = o.total ? Math.round(o.loaded * 100 / o.total) : 0);
      },
      ...z
    }).finally(() => h.value = !1);
  }
  function O(e, t, s) {
    return n.value.put(e, t, s);
  }
  function U(e, t, s) {
    return n.value.patch(e, t, s);
  }
  function S(e, t) {
    return n.value.delete(e, t);
  }
  function C(e) {
    if (H(e)) {
      let t = e.response?.data?.message || e.response?.data?.data?.message || e.message || a.value?.("Error Occurred") || "Error Occurred";
      e.status === 403 && t === "This action is unauthorized." && (t = a.value?.(t)), e.status === 401 && t === "Unauthenticated." && (t = a.value?.(t)), e.status === 413 && e?.response?.statusText && (t = a.value?.(e.response.statusText)), u.value?.add({
        group: "errors",
        severity: "error",
        summary: t,
        life: 3e3
      });
    }
  }
  function R(e = "", t = "", s = {}) {
    u.value?.add({
      group: "errors",
      severity: "error",
      summary: e || a.value?.("Error Occurred") || "Error Occurred",
      detail: t,
      life: 3e3,
      ...s
    });
  }
  function k(e = "", t = "", s = {}) {
    u.value?.add({
      group: "success",
      severity: "success",
      summary: e || a.value?.("Successful") || "Successful",
      detail: t,
      life: 2e3,
      ...s
    });
  }
  return {
    uploadProgress: v,
    isUploading: h,
    isLoading: E,
    setToast: q,
    setI18n: m,
    hasError: y,
    toastRequestError: C,
    upload: L,
    toastError: R,
    toastSuccess: k,
    request: w,
    axiosInstance: n,
    setAxiosInstance: x,
    setRouter: i,
    get: F,
    post: I,
    put: O,
    patch: U,
    delete: S,
    deleteRequest: S
  };
});
export {
  Y as useApiClient
};
