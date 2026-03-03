import { useHddUiHelpers } from 'HddUiHelpers/plugins/HddUiHelpers';
import { useApiClient } from 'HddUiHelpers/stores/apiClient';
import type { BasicUserData, GlobalOptionsMap, HddGlobalOption, HddPermission, HddUserOption, UserOptionsMap } from 'HddUiHelpers/types/types';
import { configureEcho, echo, echoIsConfigured } from '@laravel/echo-vue';
import { useStorage } from '@vueuse/core';
import { useCookies } from '@vueuse/integrations/useCookies';
import { cloneDeep, each } from 'lodash-es';
import { defineStore } from 'pinia';
import { computed, type Ref, ref, watch } from 'vue';
import { safeRequest } from '../utils/safeTry';

export const useBasicAuthStore = defineStore('basicAuth', () => {
  const user = ref<BasicUserData | null>(null);
  const hddUiHelpers = useHddUiHelpers();
  const connectedUsers = ref<BasicUserData[]>([]);
  const apiClient = useApiClient();
  const cookies = useCookies();
  const authorizationToken = useStorage<string | null>('authorizationToken', new URLSearchParams(window.location.search).get('_authorization_token'));
  const isLoggedIn = computed(() => !!user.value);

  const options = ref<UserOptionsMap>(cloneDeep(hddUiHelpers.defaultUserOptions));
  const globalOptions: Ref<GlobalOptionsMap> = ref<GlobalOptionsMap>(cloneDeep({}));

  function resetOptions(data: UserOptionsMap | null = null) {
    const newOptions = cloneDeep(hddUiHelpers.defaultUserOptions) as UserOptionsMap;
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
    globalOptions.value = _user.global_options ?? {};
    authorizationToken.value = _token;
    cookies.set('authorizationToken', _token, {
      secure: window.location.protocol === 'https:',
    });
  }

  function logout() {
    user.value = null;
    resetOptions();
    authorizationToken.value = null;
    cookies.remove('authorizationToken');
  }

  async function changeOption(option: HddUserOption, value: UserOptionsMap[HddUserOption]) {
    try {
      await apiClient.request({ method: 'post', url: '/api/change-option' }, { option, value });
      options.value[option] = value as any;
    } catch (error: any) {
      apiClient.toastError(error?.response?.data?.message ?? '');
      throw error;
    }
  }

  async function changeGlobalOption(option: HddGlobalOption, value: GlobalOptionsMap[HddGlobalOption]) {
    try {
      // Check if the value is a File
      const urlObject = {
        method: 'put',
        url: '/api/global_options',
      };
      if (value instanceof File) {
        const formData = new FormData();
        formData.append('option', option);
        formData.append('value', value);
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
        await apiClient.request(urlObject, { option, value });
        globalOptions.value[option] = value;
      }
    } catch (error: any) {
      apiClient.toastError(error?.response?.data?.message ?? '');
      throw error;
    }
  }

  function hasRole(role: string): boolean {
    return user.value?.role_names?.includes(role) === true;
  }

  const isSuperAdmin = computed(() => {
    return user.value?.role_names?.includes('super_admin') === true;
  });

  function canAny(...permissions: HddPermission[]): boolean {
    if (!user.value) {
      return false;
    }
    if (user.value.role_names?.includes('super_admin')) {
      return true;
    }
    if (!user.value.permission_names) {
      return false;
    }
    return permissions.some((p) => user.value?.permission_names?.includes(p));
  }

  function ifCan<TValue>(permission: HddPermission | HddPermission[], value: TValue, elseValue = undefined) {
    if (can(permission)) {
      return value;
    } else {
      return elseValue;
    }
  }

  function cannot(permission: HddPermission | HddPermission[]) {
    return !can(permission);
  }

  function can(permission: HddPermission | HddPermission[]) {
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
      return permission.every((p) => user.value?.permission_names?.includes(p));
    }
    return user.value.permission_names.includes(permission);
  }

  const presenceChannel = ref();
  if (hddUiHelpers.withBroadcasting) {
    watch(
      isLoggedIn,
      (val) => {
        if (val) {
          configureEcho({
            broadcaster: 'reverb',
            bearerToken: authorizationToken.value,
          });
          if (hddUiHelpers.presenceUsersChannel) {
            presenceChannel.value = echo()
              .join(hddUiHelpers.presenceUsersChannel)
              .here((users: BasicUserData[]) => {
                // console.log('HERE', users);
                connectedUsers.value = users;
              })
              .joining((user: BasicUserData) => {
                // console.log('Joining ', user);
                connectedUsers.value.push(user);
              })
              .leaving((user: BasicUserData) => {
                // console.log('Leaving ', user);
                connectedUsers.value = connectedUsers.value.filter((u) => u.id !== user.id);
              });
          }
        } else {
          if (hddUiHelpers.presenceUsersChannel) {
            if (echoIsConfigured()) {
              echo().leave(hddUiHelpers.presenceUsersChannel);
              echo().disconnect();
            }
            presenceChannel.value = null;
            connectedUsers.value = [];
          }
        }
      },
      {
        immediate: true,
      },
    );
  }

  const userFullName = computed(() => {
    return user.value?.name ?? '';
  });

  return {
    canAny,
    ifCan,
    userFullName,
    ifHasPermission: ifCan,
    can,
    cannot,
    hasRole,
    isSuperAdmin,
    changeOption,
    changeGlobalOption,
    options,
    connectedUsers,
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
    const [data] = await safeRequest(() => apiClient.get<BasicUserData>('/api/me'));
    if (data) {
      authStore.login(data, authStore.authorizationToken);
    }
  }
}
