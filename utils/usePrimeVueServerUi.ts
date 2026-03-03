import type { AxiosInstance } from 'axios';
import { inject } from 'vue';
import { useI18n } from 'vue-i18n';
import type { RecordsServiceType } from '../components/primeVueServerTable/types.ts';
import type { PrimeVueServerUiOptions } from './PrimeVueServerUi';
import { primeVueServerUiDataTableRecordsService, primeVueServerUiDefaultAxiosSymbol, primeVueServerUiRouteNameResolverSymbol } from './symbols';

export default function usePrimeVueServerUi() {
  const ax = inject(primeVueServerUiDefaultAxiosSymbol) as AxiosInstance;
  const routeNameResolver = inject(primeVueServerUiRouteNameResolverSymbol) as PrimeVueServerUiOptions['routeNameResolver'];
  const dataTableRecordsService = inject(primeVueServerUiDataTableRecordsService) as Partial<RecordsServiceType>;
  const { t } = useI18n();

  return { axios: ax, routeNameResolver, t, dataTableRecordsService };
}
