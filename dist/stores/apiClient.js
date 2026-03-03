import { echoIsConfigured as z, echo as P } from "@laravel/echo-vue";
import B, { isAxiosError as D } from "axios";
import { useHddUiHelpers as H } from "HddUiHelpers/plugins/HddUiHelpers";
import { useBasicAuthStore as $ } from "HddUiHelpers/stores/basicAuth";
import { defineStore as _ } from "pinia";
function S(i, r, n = "") {
  if (r && typeof r == "object" && !(r instanceof File)) {
    const c = r;
    Object.keys(c).forEach((f) => {
      let u = c[f];
      const d = n ? `${n}[${f}]` : f;
      typeof u == "boolean" ? u = u ? 1 : 0 : u === null && (u = ""), S(i, u, d);
    });
  } else
    i.append(n, r);
}
const Q = _("apiClient", () => {
  const i = $(), r = ref(null), n = ref(null), c = ref(), f = H();
  function u(e) {
    c.value = e;
  }
  function d(e) {
    r.value = e;
  }
  function b(e) {
    n.value = e;
  }
  const p = ref(0), q = computed(() => p.value > 0), v = ref(0), h = ref(!1), m = B.create({
    baseURL: "/",
    withCredentials: !1,
    headers: {
      accept: "application/json"
    }
  });
  m.interceptors.request.use((e) => (p.value++, i.authorizationToken && (e.headers.Authorization = `Bearer ${i.authorizationToken}`), f.withBroadcasting && z() && (e.headers["X-Socket-ID"] = P().socketId()), e)), m.interceptors.response.use(
    (e) => (p.value--, e),
    (e) => (E(0.2), p.value--, e.status === 401 && i.isLoggedIn && (i.logout(), console.log(e), c.value?.push({ path: "/login", query: { redirect_url: window.location.pathname } }).then()), Promise.reject(e))
  );
  const g = ref(!1), T = ref();
  function E(e) {
    g.value = !0, clearTimeout(T.value), T.value = setTimeout(() => {
      g.value = !1;
    }, e * 1e3);
  }
  const a = ref(m);
  function j(e, t = null, s = !1) {
    return a.value.request({
      ...e,
      ...t ? { data: t } : {},
      ...s ? {} : { baseURL: "/" }
    });
  }
  function w(e) {
    a.value = e;
  }
  function x(e, t) {
    return a.value.get(e, t);
  }
  function F(e, t, s) {
    return a.value.post(e, t, s);
  }
  function I(e, t, s, k) {
    const l = new FormData();
    if (Array.isArray(t) || t instanceof FileList)
      for (let o = 0; o < t.length; o++)
        l.append("files[]", t[o]);
    else if (Object.keys(t).length > 0 && !(t instanceof File))
      for (const o in t)
        if (Array.isArray(t[o]) || t[o] instanceof FileList)
          for (let y = 0; y < t[o].length; y++)
            l.append(o + "[]", t[o][y]);
        else
          l.append(o, t[o]);
    else
      l.append("file", t);
    return s && S(l, s), typeof e != "string" && e.method.toLowerCase() !== "post" && l.append("_method", e.method), v.value = 0, h.value = !0, a.value.request({
      url: typeof e == "string" ? e : e.url,
      method: "POST",
      data: l,
      onUploadProgress(o) {
        o.lengthComputable && (v.value = o.total ? Math.round(o.loaded * 100 / o.total) : 0);
      },
      ...k
    }).finally(() => h.value = !1);
  }
  function L(e, t, s) {
    return a.value.put(e, t, s);
  }
  function O(e, t, s) {
    return a.value.patch(e, t, s);
  }
  function A(e, t) {
    return a.value.delete(e, t);
  }
  function U(e) {
    if (D(e)) {
      let t = e.response?.data?.message || e.response?.data?.data?.message || e.message || r.value?.("Error Occurred") || "Error Occurred";
      e.status === 403 && t === "This action is unauthorized." && (t = r.value?.(t)), e.status === 401 && t === "Unauthenticated." && (t = r.value?.(t)), e.status === 413 && e?.response?.statusText && (t = r.value?.(e.response.statusText)), n.value?.add({
        group: "errors",
        severity: "error",
        summary: t,
        life: 3e3
      });
    }
  }
  function C(e = "", t = "", s = {}) {
    n.value?.add({
      group: "errors",
      severity: "error",
      summary: e || r.value?.("Error Occurred") || "Error Occurred",
      detail: t,
      life: 3e3,
      ...s
    });
  }
  function R(e = "", t = "", s = {}) {
    n.value?.add({
      group: "success",
      severity: "success",
      summary: e || r.value?.("Successful") || "Successful",
      detail: t,
      life: 2e3,
      ...s
    });
  }
  return {
    uploadProgress: v,
    isUploading: h,
    isLoading: q,
    setToast: b,
    setI18n: d,
    hasError: g,
    toastRequestError: U,
    upload: I,
    toastError: C,
    toastSuccess: R,
    request: j,
    axiosInstance: a,
    setAxiosInstance: w,
    setRouter: u,
    get: x,
    post: F,
    put: L,
    patch: O,
    delete: A,
    deleteRequest: A
  };
});
export {
  Q as useApiClient
};
