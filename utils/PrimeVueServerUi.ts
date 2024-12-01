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

export interface PrimeVueServerUiOptions {
    axiosInstance: AxiosInstance
    i18nInstance: I18n,
    routeNameResolver: (name: string, parameter?: string | number) => string
    dataTableRecordsService: Partial<RecordsServiceType>
    name: string
    location: 'right' | 'left'
}

export const primeVueServerUiDefaultAxiosSymbol = Symbol('primeVueServerUiDefaultAxiosSymbol')
export const primeVueServerUiRouteNameResolverSymbol = Symbol('primeVueServerUiRouteNameResolverSymbol')
export const primeVueServerUiDataTableRecordsService = Symbol('primeVueServerUiDataTableRecordsService')

export default {
    install(app: App, options: Partial<PrimeVueServerUiOptions> = {}): void {
        const defaultAxios = options.axiosInstance ?? axios.create({})
        if (options.i18nInstance) {
            options.i18nInstance.global.mergeLocaleMessage('ar', {
                'Entries': 'مدخل',
                'Show': 'عرض',
                'No Data': 'لا توجد مدخلات',
                'Search For': 'بحث عن',
                'dir': 'rtl',
                'All': 'الكل',
                'Error Occurred': "حصل خطأ ما",
                'Showing start To end From filtered (Filtered From total)': 'عرض {start} إلى {end} من  أصل {filtered} (مفلتر من {total})',
                'Showing start To end From total': ' عرض {start} إلى {end} من أصل {total}',
                'New': "جديد",
                "Create Record": "إضافة مدخل",
                "Create": "إضافة",
            })
            options.i18nInstance.global.mergeLocaleMessage('en', {})
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
