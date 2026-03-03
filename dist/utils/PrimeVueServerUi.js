import { _ as l, a as _ } from "../en-CxIK6t2V.js";
import c from "axios";
import n from "yaml";
import { _ as f } from "../AutoCompleteInput.vue_vue_type_script_setup_true_lang-D1Dc1iXJ.js";
import { _ as v } from "../SelectInput.vue_vue_type_script_setup_true_lang-Ck-rW3-O.js";
import { _ as u } from "../TextInput.vue_vue_type_script_setup_true_lang-CDqh5_am.js";
import { _ as b } from "../TriCheckboxInput.vue_vue_type_script_setup_true_lang-K0dlQ5gU.js";
import { _ as d } from "../PrimeVueServerTable.vue_vue_type_script_setup_true_lang-BUDvL_4f.js";
import { primeVueServerUiDefaultAxiosSymbol as S, primeVueServerUiRouteNameResolverSymbol as p, primeVueServerUiDataTableRecordsService as $ } from "./symbols.js";
const T = {
  install(o, a = {}) {
    const s = a.axiosInstance ?? c.create({});
    if (a.i18nInstance) {
      const e = /* @__PURE__ */ Object.assign({
        "../locales/ar.yaml": _,
        "../locales/en.yaml": l
      });
      for (const [r, t] of Object.entries(e)) {
        const i = r.split("/").pop()?.split(".")[0];
        i && a.i18nInstance.global.mergeLocaleMessage(i, n.parse(t));
      }
    }
    const m = a.routeNameResolver ?? function(e, r) {
      return `/${e}${r !== void 0 ? `/${r}` : ""}`;
    };
    o.provide(S, s), o.provide(p, m), o.provide($, a.dataTableRecordsService ?? null), o.component("PrimeVueServerTable", d), [f, v, u, b].forEach((e) => {
      if ("__name" in e) {
        const r = e.__name;
        r && o.component(r, e);
      }
    });
  }
};
export {
  T as default
};
