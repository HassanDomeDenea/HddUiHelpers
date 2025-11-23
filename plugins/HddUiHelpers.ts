import type { AxiosInstance } from 'axios';
import type { ServerDataTableProps } from 'HddUiHelpers/components/datatables/ServerDataTableTypes.ts';
import { i18n } from 'HddUiHelpers/plugins/i18n';
import pinia from 'HddUiHelpers/plugins/pinia';
import primevue from 'HddUiHelpers/plugins/primevue';
import { useApiClient } from 'HddUiHelpers/stores/apiClient';
import primeVueLocales from 'HddUiHelpers/utils/primeVueLocales.ts';
import type { App, InjectionKey } from 'vue';
import { inject } from 'vue';
import type { I18n } from 'vue-i18n';
import YAML from 'yaml';

export interface HddUiHelpers {
  axiosInstance: AxiosInstance;
  routeNameResolver: (name: string, parameter?: string | number) => string;
  i18nInstance: I18n<any>;
  commonServerDataTableProps: Partial<ServerDataTableProps>;
  withBroadcasting: boolean;
  presenceUsersChannel: string | null;
  dateArabicMonthNamesAsNumbers?: boolean;
  dateEnglishMonthNamesAsNumbers?: boolean;
}

export interface HddUiHelpersComposable {
  axiosInstance: AxiosInstance;
  route: (name: string, parameter?: string | number) => string;
  commonServerDataTableProps: Partial<ServerDataTableProps>;
  withBroadcasting: boolean;
  presenceUsersChannel: string | null;
}

export const HddUiHelpersSymbol: InjectionKey<Partial<HddUiHelpersComposable>> = Symbol('HddUiHelpersSymbol');

export type HddUiHelpersPluginOptions = Partial<HddUiHelpers>;

export default {
  install(app: App, options: HddUiHelpersPluginOptions = {}) {
    const routeNameResolver =
      options.routeNameResolver ??
      function (name: string, parameter?: string | number) {
        return `/${name}${parameter !== undefined ? `/${parameter}` : ''}`;
      };
    const initiallyProvidedValues = {
      route: routeNameResolver,
      commonServerDataTableProps: options.commonServerDataTableProps ?? {},
      withBroadcasting: options.withBroadcasting ?? false,
      presenceUsersChannel: options.presenceUsersChannel ?? null,
    };
    app.provide(HddUiHelpersSymbol, initiallyProvidedValues);

    if (options.dateArabicMonthNamesAsNumbers === true) {
      primeVueLocales.ar.monthNames = ['شهر 1', 'شهر 2', 'شهر 3', 'شهر 4', 'شهر 5', 'شهر 6', 'شهر 7', 'شهر 8', 'شهر 9', 'شهر 10', 'شهر 11', 'شهر 12'];
      primeVueLocales.ar.monthNamesShort = [
        'شهر 1',
        'شهر 2',
        'شهر 3',
        'شهر 4',
        'شهر 5',
        'شهر 6',
        'شهر 7',
        'شهر 8',
        'شهر 9',
        'شهر 10',
        'شهر 11',
        'شهر 12',
      ];
    }
    if (options.dateEnglishMonthNamesAsNumbers === true) {
      primeVueLocales.en.monthNames = [
        'Month 1',
        'Month 2',
        'Month 3',
        'Month 4',
        'Month 5',
        'Month 6',
        'Month 7',
        'Month 8',
        'Month 9',
        'Month 10',
        'Month 11',
        'Month 12',
      ];
      primeVueLocales.en.monthNamesShort = [
        'Month 1',
        'Month 2',
        'Month 3',
        'Month 4',
        'Month 5',
        'Month 6',
        'Month 7',
        'Month 8',
        'Month 9',
        'Month 10',
        'Month 11',
        'Month 12',
      ];
    }

    app.use(i18n);
    app.use(pinia);
    const apiClient = useApiClient();
    if (options.axiosInstance) {
      apiClient.setAxiosInstance(options.axiosInstance);
    }

    app.use(primevue);
    app.provide(HddUiHelpersSymbol, {
      ...initiallyProvidedValues,
      axiosInstance: apiClient.axiosInstance,
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
  return {
    axiosInstance: apiClient.axiosInstance,
    route(name: string, parameter?: string | number) {
      return `/${name}${parameter !== undefined ? `/${parameter}` : ''}`;
    },
    commonServerDataTableProps: {},
    withBroadcasting: false,
    presenceUsersChannel: null,
    ...inject(HddUiHelpersSymbol),
  };
}
