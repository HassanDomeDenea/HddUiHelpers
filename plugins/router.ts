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

// This will update routes at runtime without reloading the page
if (import.meta.hot) {
    handleHotUpdate(router);
}
