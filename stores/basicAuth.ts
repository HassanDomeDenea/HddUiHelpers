import defaultOptions from '@/default_options.json';
import type { UserOptionsData } from '@/types/laravel_generated';
import UserController from '@/wayfinder/actions/App/Http/Controllers/UserController';
import { useApiClient } from 'HddUiHelpers/stores/apiClient';
import type { BasicUserData } from 'HddUiHelpers/types/BasicModels';
import { safeRequest } from 'HddUiHelpers/utils/safeTry';
import { each } from 'lodash-es';
import cloneDeep from 'lodash/cloneDeep';
import { defineStore } from 'pinia';

export const useBasicAuthStore = defineStore('basicAuth', () => {
    const user = ref<BasicUserData | null>(null);
    const apiClient = useApiClient();
    const authorizationToken = ref(localStorage.getItem('authorizationToken'));
    const isLoggedIn = computed(() => !!user.value);

    const options = ref<UserOptionsData>(cloneDeep(defaultOptions as UserOptionsData));

    function resetOptions(data: UserOptionsData | null = null) {
        const newOptions: UserOptionsData = cloneDeep(defaultOptions as UserOptionsData);
        if (data) {
            each(data, (_value, _key) => {
                // @ts-expect-error Ignore Error
                newOptions[_key] = _value;
            });
        }
        options.value = newOptions;
    }

    function login(_user: BasicUserData, _token: string) {
        user.value = _user;
        resetOptions(_user.options);
        authorizationToken.value = _token;
        localStorage.setItem('authorizationToken', _token);
    }

    function logout() {
        user.value = null;
        resetOptions();
        authorizationToken.value = null;
        localStorage.removeItem('authorizationToken');
    }

    function changeOption<TKey extends keyof UserOptionsData>(option: TKey, value: UserOptionsData[TKey]) {
        return apiClient
            .request(UserController.changeOption(), { option, value })
            .then(() => {
                options.value[option] = value;
            })
            .catch((error) => {
                apiClient.toastError(error.response.data.message ?? '');
                throw error;
            });
    }

    return {
        changeOption,
        options,
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
