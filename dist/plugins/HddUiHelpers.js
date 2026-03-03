import { _ as M, a as d } from "../en-CxIK6t2V.js";
import { i18n as l } from "HddUiHelpers/plugins/i18n";
import f from "HddUiHelpers/plugins/pinia";
import p from "HddUiHelpers/plugins/primevue";
import { useApiClient as c } from "HddUiHelpers/stores/apiClient.ts";
import s from "HddUiHelpers/utils/primeVueLocales";
import { merge as b } from "lodash-es";
import "moment/locale/ar";
import g from "moment/moment";
import { shallowReactive as v, inject as U } from "vue";
import _ from "yaml";
g.locale("en");
const h = /* @__PURE__ */ Symbol("HddUiHelpersSymbol"), w = {
  install(o, e = {}) {
    const t = e.routeNameResolver ?? function(a, n) {
      return `/${a}${n !== void 0 ? `/${n}` : ""}`;
    }, i = v({
      route: t,
      commonServerDataTableProps: e.commonServerDataTableProps ?? {},
      withBroadcasting: e.withBroadcasting ?? !1,
      presenceUsersChannel: e.presenceUsersChannel ?? null,
      defaultUserOptions: e.defaultUserOptions ?? {}
    });
    o.provide(h, i), console.log("HddUiHelpersPluginOptions"), e.dateArabicMonthNamesAsNumbers === !0 && (s.ar.monthNames = [
      "شهر 1",
      "شهر 2",
      "شهر 3",
      "شهر 4",
      "شهر 5",
      "شهر 6",
      "شهر 7",
      "شهر 8",
      "شهر 9",
      "شهر 10",
      "شهر 11",
      "شهر 12"
    ], s.ar.monthNamesShort = [
      "شهر 1",
      "شهر 2",
      "شهر 3",
      "شهر 4",
      "شهر 5",
      "شهر 6",
      "شهر 7",
      "شهر 8",
      "شهر 9",
      "شهر 10",
      "شهر 11",
      "شهر 12"
    ]), e.dateEnglishMonthNamesAsNumbers === !0 && (s.en.monthNames = [
      "Month 1",
      "Month 2",
      "Month 3",
      "Month 4",
      "Month 5",
      "Month 6",
      "Month 7",
      "Month 8",
      "Month 9",
      "Month 10",
      "Month 11",
      "Month 12"
    ], s.en.monthNamesShort = [
      "Month 1",
      "Month 2",
      "Month 3",
      "Month 4",
      "Month 5",
      "Month 6",
      "Month 7",
      "Month 8",
      "Month 9",
      "Month 10",
      "Month 11",
      "Month 12"
    ]), o.use(l), o.use(f);
    const m = c();
    e.axiosInstance && m.setAxiosInstance(e.axiosInstance), o.use(p), i.axiosInstance = m.axiosInstance;
    const u = /* @__PURE__ */ Object.assign({
      "../locales/ar.yaml": d,
      "../locales/en.yaml": M
    });
    for (const [a, n] of Object.entries(u)) {
      const r = a.split("/").pop()?.split(".")[0];
      r && l.global.setLocaleMessage(
        r,
        b(_.parse(n), l.global.getLocaleMessage(r))
      );
    }
  }
};
function L() {
  return {
    axiosInstance: c().axiosInstance,
    route(e, t) {
      return `/${e}${t !== void 0 ? `/${t}` : ""}`;
    },
    commonServerDataTableProps: {},
    withBroadcasting: !1,
    presenceUsersChannel: null,
    defaultUserOptions: {},
    ...U(h, {})
  };
}
export {
  h as HddUiHelpersSymbol,
  w as default,
  L as useHddUiHelpers
};
