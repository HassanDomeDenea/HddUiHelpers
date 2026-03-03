import { _ as s, a as n } from "../en-Rb8QJDuU.js";
import c from "axios";
import u from "yaml";
import f from "HddUiHelpers/components/inputs/AutoCompleteInput.vue";
import v from "HddUiHelpers/components/inputs/SelectInput.vue";
import _ from "HddUiHelpers/components/inputs/TextInput.vue";
import p from "HddUiHelpers/components/inputs/TriCheckboxInput.vue";
import b from "HddUiHelpers/components/primeVueServerTable/PrimeVueServerTable.vue";
import { primeVueServerUiDefaultAxiosSymbol as S, primeVueServerUiRouteNameResolverSymbol as d, primeVueServerUiDataTableRecordsService as x } from "./symbols.js";
const P = {
  install(o, t = {}) {
    const a = t.axiosInstance ?? c.create({});
    if (t.i18nInstance) {
      const e = /* @__PURE__ */ Object.assign({
        "../locales/ar.yaml": n,
        "../locales/en.yaml": s
      });
      for (const [r, m] of Object.entries(e)) {
        const i = r.split("/").pop()?.split(".")[0];
        i && t.i18nInstance.global.mergeLocaleMessage(i, u.parse(m));
      }
    }
    const l = t.routeNameResolver ?? function(e, r) {
      return `/${e}${r !== void 0 ? `/${r}` : ""}`;
    };
    o.provide(S, a), o.provide(d, l), o.provide(x, t.dataTableRecordsService ?? null), o.component("PrimeVueServerTable", b), [f, v, _, p].forEach((e) => {
      if ("__name" in e) {
        const r = e.__name;
        r && o.component(r, e);
      }
    });
  }
};
export {
  P as default
};
