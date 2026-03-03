import { i18n as l } from "HddUiHelpers/plugins/i18n.ts";
import { isLocalListType as c } from "HddUiHelpers/utils/dynamicListsUtilities.ts";
import { get as d } from "lodash-es";
import p from "moment";
const y = () => {
  const { t: e } = useI18n(), t = ref(!1), s = ref(!1);
  function o(i, r) {
    if (!i)
      return "0";
    const n = new Intl.NumberFormat("en-US", {
      style: "decimal"
      // These options are needed to round to whole numbers if that's what you want.
      //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
      //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });
    r = ((typeof r == "object" ? r.currency : r) ?? "")?.toLowerCase();
    const f = r === "usd" ? "$" : "", a = r === "iqd" ? " " + e("IQD") : "";
    let u = +i || 0;
    return (s.value || t.value && a) && (u = Math.round(u)), f + n.format(u) + a;
  }
  function m(i, r, n) {
    const f = d(r, n + "_currency");
    return o(i, f);
  }
  return {
    suppressDecimalsInIqd: t,
    formatPrice: o,
    formatPriceWithoutCurrency: b,
    formatPriceColumn: m
  };
};
function D(e, t, s = !0, o = !0) {
  if (!e)
    return "0";
  const m = new Intl.NumberFormat("en-US", {
    style: "decimal"
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  t = ((typeof t == "object" ? t.currency : t) ?? "")?.toLowerCase();
  const i = t === "usd" ? "$" : "", r = t === "iqd" ? " " + l.global.t("IQD") : "";
  let n = +e || 0;
  return (s || o && r) && (n = Math.round(n)), i + m.format(n) + r;
}
function b(e, t = !0) {
  if (!e)
    return "0";
  const s = new Intl.NumberFormat("en-US", {
    style: "decimal"
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  let o = +e || 0;
  return t && (o = Math.round(o)), s.format(o);
}
function L(e, t = 0) {
  return isNaN(e) ? t : e;
}
function P({
  value: e,
  options: t
}) {
  return c(t) ? {
    severity: t?.keyObjectPair?.[e]?.severity
  } : {
    severity: null
  };
}
function q(e) {
  const t = e.split("-");
  return t[0][0] + "-" + t[1];
}
function v() {
  return p().format("YYYY-MM-DD HH:mm:ss");
}
export {
  v as currentTimestamp,
  P as formatListToSeverityTag,
  b as formatNumberGrouped,
  D as formatPrice,
  q as formatReceiptNumberByFirstLetter,
  L as safeNumber,
  y as useFormatters
};
