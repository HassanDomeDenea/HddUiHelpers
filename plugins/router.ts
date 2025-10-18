import { i18n } from 'HddUiHelpers/plugins/i18n.ts';
import { useApiClient } from 'HddUiHelpers/stores/apiClient.ts';
import { useBasicAuthStore } from 'HddUiHelpers/stores/basicAuth';
import type { RouteMeta } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import { handleHotUpdate, routes } from 'vue-router/auto-routes';
const MAIN_APP_NAME = import.meta.env.VITE_APP_NAME;
routes.push({
  path: '/:pathMatch(.*)*',
  // redirect: (to) => `/redirected-path/${to.params.id}`,
  redirect: `/`,
});
export const router = createRouter({
  history: createWebHistory(),
  routes,
});

export function setBasicRouterAuthGuard() {
  const apiClient = useApiClient();
  apiClient.setRouter(router);
  router.beforeEach((to, from, next) => {
    const authStore = useBasicAuthStore();
    const meta: RouteMeta = to.meta;
    if (meta.auth === true && !authStore.isLoggedIn) {
      return next({ path: '/login', query: { redirect_url: to.fullPath } });
    } else if (meta.auth === false && authStore.isLoggedIn) {
      return next('/');
    } else if (meta.permission && !authStore.can(meta.permissions)) {
      return next('/');
    }

    return next();
  });
  router.afterEach((to) => {
    document.title = (to.meta.title ? i18n.global.t(to.meta.title) + ' - ' : '') + i18n.global.t(MAIN_APP_NAME);
  });
}

// This will update routes at runtime without reloading the page
if (import.meta.hot) {
  handleHotUpdate(router);
}
