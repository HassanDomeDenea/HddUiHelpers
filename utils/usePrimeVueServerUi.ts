import {inject} from 'vue'
import type {AxiosInstance} from 'axios'
import {useI18n} from 'vue-i18n'
import {
    primeVueServerUiDataTableRecordsService,
    primeVueServerUiDefaultAxiosSymbol,
    primeVueServerUiRouteNameResolverSymbol,
} from './symbols'
import type {PrimeVueServerUiOptions} from './PrimeVueServerUi'
import type {RecordsServiceType} from '../components/primeVueServerTable/types.ts'

export default function usePrimeVueServerUi() {
    const ax = inject(primeVueServerUiDefaultAxiosSymbol) as AxiosInstance
    const routeNameResolver = inject(primeVueServerUiRouteNameResolverSymbol) as PrimeVueServerUiOptions['routeNameResolver']
    const dataTableRecordsService = inject(primeVueServerUiDataTableRecordsService) as Partial<RecordsServiceType>
    const {t} = useI18n()

    return {axios: ax, routeNameResolver, t, dataTableRecordsService}
}
