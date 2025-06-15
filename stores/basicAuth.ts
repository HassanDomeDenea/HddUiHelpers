import { useApiClient } from 'HddUiHelpers/stores/apiClient';
import type { BasicUserData } from 'HddUiHelpers/types/BasicModels';
import { safeRequest } from 'HddUiHelpers/utils/safeTry';
import { defineStore } from 'pinia';

export const useBasicAuthStore = defineStore('basicAuth', () => {
    const user = ref<BasicUserData | null>(null);
    const authorizationToken = ref(localStorage.getItem('authorizationToken'));
    const isLoggedIn = computed(() => !!user.value);

    function login(_user: BasicUserData, _token: string) {
        user.value = _user;
        authorizationToken.value = _token;
        localStorage.setItem('authorizationToken', _token);
    }

    function logout() {
        user.value = null;
        authorizationToken.value = null;
        localStorage.removeItem('authorizationToken');
    }

    return {
        isLoggedIn,
        user,
        authorizationToken,
        login,
        logout,
    };
});

export async function setUserFromToken() {
    const authStore = useBasicAuthStore();
    const apiClient = useApiClient();

    if (authStore.authorizationToken) {
        const [data] = await safeRequest(() => apiClient.get<BasicUserData>('me'));
        if (data) {
            authStore.login(data, authStore.authorizationToken);
        }
    }
}
