import defaultOptions from '@/default_options.json';
import type { AppPermission, GlobalOptionData, UserOptionsData } from '@/types/laravel_generated';
import UserController from '@/wayfinder/actions/App/Http/Controllers/UserController';
import GlobalOptionController from '@/wayfinder/actions/Modules/GlobalOption/Http/Controllers/GlobalOptionController.ts';
import { useApiClient } from 'HddUiHelpers/stores/apiClient';
import type { BasicUserData } from 'HddUiHelpers/types/BasicModels';
import { safeRequest } from 'HddUiHelpers/utils/safeTry';
import { each } from 'lodash-es';
import cloneDeep from 'lodash/cloneDeep';
import { defineStore } from 'pinia';

export const useBasicAuthStore = defineStore('basicAuth', () => {
  const user = ref<BasicUserData | null>(null);
  const apiClient = useApiClient();
  const authorizationToken = useStorage<string | null>('authorizationToken', null);
  const isLoggedIn = computed(() => !!user.value);

  const options = ref<UserOptionsData>(cloneDeep(defaultOptions as UserOptionsData));
  const globalOptions = ref<GlobalOptionData>(cloneDeep({} as GlobalOptionData));

  function resetOptions(data: UserOptionsData | null = null) {
    const newOptions: UserOptionsData = cloneDeep(defaultOptions as UserOptionsData);
    if (data) {
      each(data, (_value, _key) => {
        newOptions[_key] = _value;
      });
    }
    options.value = newOptions;
  }

  function login(_user: BasicUserData, _token: string) {
    user.value = _user;
    resetOptions(_user.options);
    globalOptions.value = _user.global_options;
    authorizationToken.value = _token;
  }

  function logout() {
    user.value = null;
    resetOptions();
    authorizationToken.value = null;
  }

  async function changeOption<TKey extends keyof UserOptionsData>(option: TKey, value: UserOptionsData[TKey]) {
    try {
      await apiClient.request(UserController.changeOption(), { option, value });
      options.value[option] = value;
    } catch (error: any) {
      apiClient.toastError(error?.response?.data?.message ?? '');
      throw error;
    }
  }

  async function changeGlobalOption<TKey extends keyof GlobalOptionData>(option: TKey, value: GlobalOptionData[TKey]) {
    try {
      // Check if the value is a File
      if (value instanceof File) {
        const urlObject = GlobalOptionController.update();

        const formData = new FormData();
        formData.append('value', value);
        formData.append('option', option);
        formData.append('_method', urlObject.method);
        const response = await apiClient.request(
          {
            url: urlObject.url,
            method: 'POST',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
          formData,
        );

        globalOptions.value[option] = response.data.data;
      } else {
        await apiClient.request(GlobalOptionController.update(), { option, value });
        globalOptions.value[option] = value;
      }
    } catch (error: any) {
      apiClient.toastError(error?.response?.data?.message ?? '');
      throw error;
    }
  }

  function canAny(...permissions: string[]): boolean {
    if (!user.value) {
      return false;
    }
    if (user.value.role_names?.includes('super_admin')) {
      return true;
    }
    if (!user.value.permission_names) {
      return false;
    }
    return permissions.some((p) => user.value.permission_names.includes(p));
  }

  function can(permission: AppPermission | AppPermission[]) {
    if (!user.value) {
      return false;
    }
    if (user.value.role_names?.includes('super_admin')) {
      return true;
    }
    if (!user.value.permission_names) {
      return false;
    }
    if (Array.isArray(permission)) {
      return permission.every((p) => user.value.permission_names.includes(p));
    }
    return user.value.permission_names.includes(permission);
  }

  return {
    canAny,
    can,
    changeOption,
    changeGlobalOption,
    options,
    globalOptions,
    isLoggedIn,
    user,
    authorizationToken: computed<string | null>(() => authorizationToken.value),
    login,
    logout,
  };
});

export async function setUserFromToken() {
  const authStore = useBasicAuthStore();
  const apiClient = useApiClient();
  if (authStore.authorizationToken) {
    const [data] = await safeRequest(() => apiClient.get<BasicUserData>(UserController.me().url));
    if (data) {
      authStore.login(data, authStore.authorizationToken);
    }
  }
}
