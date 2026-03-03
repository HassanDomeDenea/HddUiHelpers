import { i18n as a } from "HddUiHelpers/plugins/i18n";
import { useApiClient as n } from "HddUiHelpers/stores/apiClient";
import { useBasicAuthStore as s } from "HddUiHelpers/stores/basicAuth";
import { createRouter as m, createWebHistory as c } from "vue-router";
import { routes as l } from "vue-router/auto-routes";
const p = void 0, i = m({
  history: c(),
  routes: [
    ...l,
    {
      path: "/:pathMatch(.*)*",
      // redirect: (to) => `/redirected-path/${to.params.id}`,
      redirect: "/"
    }
  ]
});
function S() {
  n().setRouter(i), i.beforeEach((e, u, t) => {
    const o = s(), r = e.meta;
    return r.auth === !0 && !o.isLoggedIn ? t({ path: "/login", query: { redirect_url: e.fullPath } }) : r.auth === !1 && o.isLoggedIn || r.permissions && !o.can(r.permissions) ? t("/") : t();
  }), i.afterEach((e) => {
    const t = s().globalOptions?.app_name ?? a.global.t(p) ?? "";
    document.title = (e.meta.title ? a.global.t(e.meta.title) + " - " : "") + t;
  });
}
export {
  i as router,
  S as setBasicRouterAuthGuard
};
