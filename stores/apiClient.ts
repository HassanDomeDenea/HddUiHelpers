import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import { useBasicAuthStore } from 'HddUiHelpers/stores/basicAuth';
import { defineStore } from 'pinia';
import type { ToastMessageOptions, ToastServiceMethods } from 'primevue';
import type { ComposerTranslation } from 'vue-i18n';

export const useApiClient = defineStore('apiClient', () => {
    const authStore = useBasicAuthStore();
    const t = ref<ComposerTranslation | null>(null);
    const toast = ref<ToastServiceMethods | null>(null);

    function setI18n(_t: ComposerTranslation) {
        t.value = _t;
    }

    function setToast(_toast: ToastServiceMethods) {
        toast.value = _toast;
    }

    const instance = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
        withCredentials: false,
        headers: {
            Authorization: `Bearer ${authStore.authorizationToken}`,
        },
    });
    const axiosInstance = ref<AxiosInstance>(instance);

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

    function put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return axiosInstance.value.put<T>(url, data, config);
    }

    function deleteRequest<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return axiosInstance.value.delete<T>(url, config);
    }

    function toastError(title: string = '',message = '', options: ToastMessageOptions = {}) {
        toast.value?.add({
            group: 'errors',
            severity: 'error',
            summary: title || t.value?.('Error Occurred') || 'Error Occurred',
            detail: message,
            life: 3000,
            ...options,
        });
    }

    function toastSuccess(title: string = '',message = '', options: ToastMessageOptions = {}) {
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
        setToast,
        setI18n,
        toastError,
        toastSuccess,
        request,
        axiosInstance,
        setAxiosInstance,
        get,
        post,
        put,
        delete: deleteRequest,
        deleteRequest: deleteRequest,
    };
});
