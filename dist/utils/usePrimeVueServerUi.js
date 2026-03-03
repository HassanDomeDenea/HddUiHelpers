import { inject as e } from "vue";
import { useI18n as m } from "vue-i18n";
import { primeVueServerUiDefaultAxiosSymbol as a, primeVueServerUiRouteNameResolverSymbol as s, primeVueServerUiDataTableRecordsService as u } from "./symbols.js";
function v() {
  const r = e(a), o = e(
    s
  ), t = e(
    u
  ), { t: i } = m();
  return { axios: r, routeNameResolver: o, t: i, dataTableRecordsService: t };
}
export {
  v as default
};
