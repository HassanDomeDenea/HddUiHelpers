import type {App} from 'vue'
import type {AxiosInstance} from 'axios'
import axios from 'axios'
import type {RecordsServiceType} from '../components/primeVueServerTable/types'
import PrimeVueServerTable from '../components/primeVueServerTable/PrimeVueServerTable.vue'
import AutoCompleteInput from '../components/inputs/AutoCompleteInput.vue'
import SelectInput from '../components/inputs/SelectInput.vue'
import TextInput from '../components/inputs/TextInput.vue'
import TriCheckboxInput from '../components/inputs/TriCheckboxInput.vue'
import type {I18n} from "vue-i18n";
import YAML from "yaml";
import {
    primeVueServerUiDefaultAxiosSymbol,
    primeVueServerUiRouteNameResolverSymbol,
    primeVueServerUiDataTableRecordsService
} from "./symbols";

export interface PrimeVueServerUiOptions {
    axiosInstance: AxiosInstance
    i18nInstance: I18n,
    routeNameResolver: (name: string, parameter?: string | number) => string
    dataTableRecordsService: Partial<RecordsServiceType>
    name: string
    location: 'right' | 'left'
}


export default {
    install(app: App, options: Partial<PrimeVueServerUiOptions> = {}): void {
        const defaultAxios = options.axiosInstance ?? axios.create({})
        if (options.i18nInstance) {

            const locales = import.meta.glob('../locales/*.yaml', {eager: true, query: '?raw', import: 'default'})

            for (const [key, value] of Object.entries(locales)) {
                const locale = key.split('/').pop()?.split('.')[0] // Extract locale name (e.g., "en", "fr")
                if (locale) {
                    options.i18nInstance.global.mergeLocaleMessage(locale, YAML.parse(value as string))
                }
            }

        }
        const routeNameResolver = options.routeNameResolver ?? function (name: string, parameter?: string | number) {
            return `/${name}${parameter !== undefined ? `/${parameter}` : ''}`
        }
        app.provide(primeVueServerUiDefaultAxiosSymbol, defaultAxios)
        app.provide(primeVueServerUiRouteNameResolverSymbol, routeNameResolver)
        app.provide(primeVueServerUiDataTableRecordsService, options.dataTableRecordsService ?? null)

        app.component('PrimeVueServerTable', PrimeVueServerTable);
        [AutoCompleteInput, SelectInput, TextInput, TriCheckboxInput].forEach((component) => {
            if ('__name' in component) {
                const name = component.__name
                if (name) {
                    app.component(name, component)
                }
            }
        })
    },
}
