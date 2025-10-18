import { echo, echoIsConfigured } from '@laravel/echo-vue';
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import { useHddUiHelpers } from 'HddUiHelpers/plugins/HddUiHelpers.ts';
import { useBasicAuthStore } from 'HddUiHelpers/stores/basicAuth';
import { defineStore } from 'pinia';
import type { ToastMessageOptions, ToastServiceMethods } from 'primevue';
import type { ComposerTranslation } from 'vue-i18n';
import type { Router } from 'vue-router';

function appendFormData(formData: FormData, data: any, parentKey: string = '') {
  if (data && typeof data === 'object' && !(data instanceof File)) {
    Object.keys(data).forEach((key) => {
      const value = data[key];
      const newKey = parentKey ? `${parentKey}[${key}]` : key;
      appendFormData(formData, value, newKey);
    });
  } else {
    formData.append(parentKey, data);
  }
}

export const useApiClient = defineStore('apiClient', () => {
  const authStore = useBasicAuthStore();
  const t = ref<ComposerTranslation | null>(null);
  const toast = ref<ToastServiceMethods | null>(null);
  const router = ref<Router>();
  const hddUiHelpers = useHddUiHelpers();
  function setRouter(_router: Router) {
    router.value = _router;
  }

  function setI18n(_t: ComposerTranslation) {
    t.value = _t;
  }

  function setToast(_toast: ToastServiceMethods) {
    toast.value = _toast;
  }

  const activeRequests = ref(0);
  const isLoading = computed(() => activeRequests.value > 0);
  const uploadProgress = ref(0);
  const isUploading = ref(false);

  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/',
    withCredentials: false,
    headers: {
      accept: 'application/json',
    },
  });
  instance.interceptors.request.use((config) => {
    activeRequests.value++;
    if (authStore.authorizationToken) {
      config.headers.Authorization = `Bearer ${authStore.authorizationToken}`;
    }
    if (hddUiHelpers.withBroadcasting && echoIsConfigured()) {
      config.headers['X-Socket-ID'] = echo().socketId();
    }

    return config;
  });
  instance.interceptors.response.use(
    (response) => {
      activeRequests.value--;
      return response;
    },
    (error: AxiosError) => {
      triggerErrorNotifierFor(0.2);
      activeRequests.value--;
      if (error.status === 401 && authStore.isLoggedIn) {
        authStore.logout();
        console.log(error);
        router.value?.push({ path: '/login', query: { redirect_url: window.location.pathname } } as any).then();
      }
      return Promise.reject(error);
    },
  );

  const hasError = ref<boolean>(false);
  const hasErrorSetterTimeout = ref<ReturnType<typeof setTimeout> | null>(null);

  function triggerErrorNotifierFor(delay: number) {
    hasError.value = true;
    clearTimeout(hasErrorSetterTimeout.value);
    hasErrorSetterTimeout.value = setTimeout(() => {
      hasError.value = false;
    }, delay * 1000);
  }

  const axiosInstance = ref(instance);

  function request<T = any>(config: AxiosRequestConfig, data: any = null, withApiBaseUrl: boolean = false): Promise<AxiosResponse<T>> {
    return axiosInstance.value.request<T>({
      ...config,
      ...(data ? { data } : {}),
      ...(!withApiBaseUrl ? { baseURL: '/' } : {}),
    });
  }

  function setAxiosInstance(instance: AxiosInstance) {
    axiosInstance.value = instance;
  }

  function get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return axiosInstance.value.get<T>(url, config);
  }

  function post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return axiosInstance.value.post<T>(url, data, config);
  }

  function upload<T = any>(
    url: string | { url: string; method: string },
    files: File | File[] | FileList | { [k: string]: File | File[] | FileList },
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    const form = new FormData();

    if (Array.isArray(files) || files instanceof FileList) {
      for (let i = 0; i < files.length; i++) {
        form.append('files[]', files[i]); // change 'files[]' if needed
      }
    } else if (Object.keys(files).length > 0) {
      for (const i in files) {
        if (Array.isArray(files[i]) || files[i] instanceof FileList) {
          for (let j = 0; j < files[i].length; j++) {
            form.append(i + '[]', files[i][j]);
          }
        } else {
          form.append(i, files[i]);
        }
      }
    } else {
      form.append('file', files as File);
    }

    if (data) {
      appendFormData(form, data);
    }

    if (typeof url !== 'string' && url.method.toLowerCase() !== 'post') {
      form.append('_method', url.method);
    }
    uploadProgress.value = 0;
    isUploading.value = true;
    return axiosInstance.value
      .request<T>({
        url: typeof url === 'string' ? url : url.url,
        method: 'POST',
        data: form,
        onUploadProgress(progressEvent) {
          if (!progressEvent.lengthComputable) return;
          uploadProgress.value = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        },
        ...config,
      })
      .finally(() => (isUploading.value = false));
  }

  function put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return axiosInstance.value.put<T>(url, data, config);
  }
  function patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return axiosInstance.value.patch<T>(url, data, config);
  }

  function deleteRequest<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return axiosInstance.value.delete<T>(url, config);
  }

  function toastRequestError(error: AxiosError) {
    let message =
      (error.response?.data as any)?.message ||
      ((error.response?.data as any)?.data as any)?.message ||
      error.message ||
      t.value?.('Error Occurred') ||
      'Error Occurred';
    if (error.status === 403 && message === 'This action is unauthorized.') {
      message = t.value?.(message);
    }
    if (error.status === 401 && message === 'Unauthenticated.') {
      message = t.value?.(message);
    }
    if (error.status === 413 && error?.response?.statusText) {
      message = t.value?.(error.response.statusText);
    }
    toast.value?.add({
      group: 'errors',
      severity: 'error',
      summary: message,
      life: 3000,
    });
  }

  function toastError(title: string = '', message = '', options: ToastMessageOptions = {}) {
    toast.value?.add({
      group: 'errors',
      severity: 'error',
      summary: title || t.value?.('Error Occurred') || 'Error Occurred',
      detail: message,
      life: 3000,
      ...options,
    });
  }

  function toastSuccess(title: string = '', message = '', options: ToastMessageOptions = {}) {
    toast.value?.add({
      group: 'success',
      severity: 'success',
      summary: title || t.value?.('Successful') || 'Successful',
      detail: message,
      life: 2000,
      ...options,
    });
  }

  return {
    uploadProgress,
    isUploading,
    isLoading,
    setToast,
    setI18n,
    hasError,
    toastRequestError,
    upload,
    toastError,
    toastSuccess,
    request,
    axiosInstance,
    setAxiosInstance,
    setRouter,
    get,
    post,
    put,
    patch,
    delete: deleteRequest,
    deleteRequest: deleteRequest,
  };
});
