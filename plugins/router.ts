import { useBasicAuthStore } from 'HddUiHelpers/stores/basicAuth';
import { createRouter, createWebHistory } from 'vue-router';
import { handleHotUpdate, routes } from 'vue-router/auto-routes';

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
    router.beforeEach((to, from, next) => {
        const authStore = useBasicAuthStore();
        if (to.meta.auth === true && !authStore.isLoggedIn) {
            return next('/login');
        } else if (to.meta.auth === false && authStore.isLoggedIn) {
            return next('/');
        }

        return next();
    });
}

// This will update routes at runtime without reloading the page
if (import.meta.hot) {
    handleHotUpdate(router);
}
