import type { AxiosInstance } from 'axios';
import type { App, InjectionKey, Plugin } from 'vue';
import type { I18n } from 'vue-i18n';
import axios from 'axios';
import { inject } from 'vue';
import { createI18n } from 'vue-i18n';
import YAML from 'yaml';
import PrimevueComponents from './PrimevueComponents';
import pinia from 'HddUiHelpers/plugins/pinia';
import { i18n } from 'HddUiHelpers/plugins/i18n';
import primevue from 'HddUiHelpers/plugins/primevue';

export interface HddUiHelpers {
    axiosInstance: AxiosInstance;
    routeNameResolver: (name: string, parameter?: string | number) => string;
    i18nInstance: I18n<any>;

}

export interface HddUiHelpersComposable {
    axiosInstance: AxiosInstance;
    route: (name: string, parameter?: string | number) => string;
}

const HddUiHelpersSymbol: InjectionKey<HddUiHelpersComposable> = Symbol('HddUiHelpersSymbol');

export type HddUiHelpersPluginOptions = Partial<HddUiHelpers>

export default {
    install(app: App, options: HddUiHelpersPluginOptions = {}) {

        app.use(pinia);

        app.use(i18n);


        const defaultAxiosInstance = options.axiosInstance ?? axios.create({});
        const routeNameResolver = options.routeNameResolver ?? function(name: string, parameter?: string | number) {
            return `/${name}${parameter !== undefined ? `/${parameter}` : ''}`;
        };

        app.use(primevue);

        app.provide(HddUiHelpersSymbol, {
            axiosInstance: defaultAxiosInstance,
            route: routeNameResolver
        });

        // Extend the locales
        const locales = import.meta.glob('../locales/*.yaml', { eager: true, query: '?raw', import: 'default' });
        for (const [key, value] of Object.entries(locales)) {
            const locale = key.split('/').pop()?.split('.')[0]; // Extract locale name (e.g., "en", "fr")
            if (locale) {
                i18n.global.mergeLocaleMessage(locale, YAML.parse(value as string));
            }
        }
    }
};

/*
export default function HddUiHelpersPlugin(options: HddUiHelpersPluginOptions = {}): Plugin {
    return (app) => {

    };
}
*/

export function useHddUiHelpers(): HddUiHelpersComposable {
    return inject(HddUiHelpersSymbol, {
        axiosInstance: axios.create({}),
        route(name: string, parameter?: string | number) {
            return `/${name}${parameter !== undefined ? `/${parameter}` : ''}`;
        }
    });
}
