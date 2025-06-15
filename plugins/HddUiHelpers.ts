import type { AxiosInstance } from 'axios';
import { i18n } from 'HddUiHelpers/plugins/i18n';
import pinia from 'HddUiHelpers/plugins/pinia';
import primevue from 'HddUiHelpers/plugins/primevue';
import { useApiClient } from 'HddUiHelpers/stores/apiClient';
import type { App, InjectionKey } from 'vue';
import { inject } from 'vue';
import type { ComposerTranslation, I18n } from 'vue-i18n';
import YAML from 'yaml';
import type { ToastServiceMethods } from 'primevue';
import { useToast } from 'primevue/usetoast';

export interface HddUiHelpers {
    axiosInstance: AxiosInstance;
    routeNameResolver: (name: string, parameter?: string | number) => string;
    i18nInstance: I18n<any>;
}

export interface HddUiHelpersComposable {
    axiosInstance: AxiosInstance;
    route: (name: string, parameter?: string | number) => string;
}

export const HddUiHelpersSymbol: InjectionKey<HddUiHelpersComposable> = Symbol('HddUiHelpersSymbol');

export type HddUiHelpersPluginOptions = Partial<HddUiHelpers>;

export default {
    install(app: App, options: HddUiHelpersPluginOptions = {}) {
        app.use(i18n);
        app.use(pinia);
        const apiClient = useApiClient();
        if (options.axiosInstance) {
            apiClient.setAxiosInstance(options.axiosInstance);
        }
        const routeNameResolver =
            options.routeNameResolver ??
            function (name: string, parameter?: string | number) {
                return `/${name}${parameter !== undefined ? `/${parameter}` : ''}`;
            };

        app.use(primevue);

        app.provide(HddUiHelpersSymbol, {
            axiosInstance: apiClient.axiosInstance,
            route: routeNameResolver,
        });

        // Extend the locales
        const locales = import.meta.glob('../locales/*.yaml', { eager: true, query: '?raw', import: 'default' });
        for (const [key, value] of Object.entries(locales)) {
            const locale = key.split('/').pop()?.split('.')[0]; // Extract locale name (e.g., "en", "fr")
            if (locale) {
                i18n.global.mergeLocaleMessage(locale, YAML.parse(value as string));
            }
        }
    },
};

/*
export default function HddUiHelpersPlugin(options: HddUiHelpersPluginOptions = {}): Plugin {
    return (app) => {

    };
}
*/

export function useHddUiHelpers(): HddUiHelpersComposable {
    const apiClient = useApiClient();
    return inject(HddUiHelpersSymbol, {
        axiosInstance: apiClient.axiosInstance,
        route(name: string, parameter?: string | number) {
            return `/${name}${parameter !== undefined ? `/${parameter}` : ''}`;
        },
    });
}
