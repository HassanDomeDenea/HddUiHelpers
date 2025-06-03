import type { AxiosInstance } from 'axios'
import type { InjectionKey, Plugin } from 'vue'
import type { I18n } from 'vue-i18n'
import axios from 'axios'
import { inject } from 'vue'
import { createI18n } from 'vue-i18n'
import YAML from 'yaml'
import PrimevueComponents from './PrimevueComponents'

export interface HddUiHelpers {
  axiosInstance: AxiosInstance
  routeNameResolver: (name: string, parameter?: string | number) => string
  i18nInstance: I18n<any>

}

export interface HddUiHelpersComposable {
  axiosInstance: AxiosInstance
  route: (name: string, parameter?: string | number) => string
}

const HddUiHelpersSymbol: InjectionKey<HddUiHelpersComposable> = Symbol('HddUiHelpersSymbol')

export default function HddUiHelpersPlugin(options: Partial<HddUiHelpers> = {}): Plugin {
  return (app) => {
    const defaultAxiosInstance = options.axiosInstance ?? axios.create({})
    const routeNameResolver = options.routeNameResolver ?? function (name: string, parameter?: string | number) {
      return `/${name}${parameter !== undefined ? `/${parameter}` : ''}`
    }

    const defaultI18nInstance = options.i18nInstance ?? createI18n({
      locale: 'en',
      messages: {
        en: {},
      },
    })
    if (!options.i18nInstance && !app.config.globalProperties.$i18n) {
      app.use(defaultI18nInstance)
    }

    if (!app.config.globalProperties.$primevue) {
      // app.use(primevuePlugin, {})
    }
    app.use(PrimevueComponents)

    app.provide(HddUiHelpersSymbol, {
      axiosInstance: defaultAxiosInstance,
      route: routeNameResolver,
    })

    // Extend the locales
    const locales = import.meta.glob('../locales/*.yaml', { eager: true, query: '?raw', import: 'default' })
    for (const [key, value] of Object.entries(locales)) {
      const locale = key.split('/').pop()?.split('.')[0] // Extract locale name (e.g., "en", "fr")
      if (locale) {
        defaultI18nInstance.global.mergeLocaleMessage(locale, YAML.parse(value as string))
      }
    }
  }
}

export function useHddUiHelpers(): HddUiHelpersComposable {
  return inject(HddUiHelpersSymbol, {
    axiosInstance: axios.create({}),
    route(name: string, parameter?: string | number) {
      return `/${name}${parameter !== undefined ? `/${parameter}` : ''}`
    },
  })
}
