import { i18n as c } from "HddUiHelpers/plugins/i18n.ts";
import { isLocalListType as p } from "HddUiHelpers/utils/dynamicListsUtilities.ts";
import { get as d } from "lodash-es";
import b from "moment";
import { useI18n as I } from "vue-i18n";
import { ref as l } from "vue";
const q = () => {
  const { t: r } = I(), t = l(!1), m = l(!1);
  function o(i, e) {
    if (!i)
      return "0";
    const n = new Intl.NumberFormat("en-US", {
      style: "decimal"
      // These options are needed to round to whole numbers if that's what you want.
      //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
      //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });
    e = ((typeof e == "object" ? e.currency : e) ?? "")?.toLowerCase();
    const f = e === "usd" ? "$" : "", a = e === "iqd" ? " " + r("IQD") : "";
    let u = +i || 0;
    return (m.value || t.value && a) && (u = Math.round(u)), f + n.format(u) + a;
  }
  function s(i, e, n) {
    const f = d(e, n + "_currency");
    return o(i, f);
  }
  return {
    suppressDecimalsInIqd: t,
    formatPrice: o,
    formatPriceWithoutCurrency: N,
    formatPriceColumn: s
  };
};
function v(r, t, m = !0, o = !0) {
  if (!r)
    return "0";
  const s = new Intl.NumberFormat("en-US", {
    style: "decimal"
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  t = ((typeof t == "object" ? t.currency : t) ?? "")?.toLowerCase();
  const i = t === "usd" ? "$" : "", e = t === "iqd" ? " " + c.global.t("IQD") : "";
  let n = +r || 0;
  return (m || o && e) && (n = Math.round(n)), i + s.format(n) + e;
}
function N(r, t = !0) {
  if (!r)
    return "0";
  const m = new Intl.NumberFormat("en-US", {
    style: "decimal"
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  let o = +r || 0;
  return t && (o = Math.round(o)), m.format(o);
}
function w(r, t = 0) {
  return isNaN(r) ? t : r;
}
function F({
  value: r,
  options: t
}) {
  return p(t) ? {
    severity: t?.keyObjectPair?.[r]?.severity
  } : {
    severity: null
  };
}
function M(r) {
  const t = r.split("-");
  return t[0][0] + "-" + t[1];
}
function h() {
  return b().format("YYYY-MM-DD HH:mm:ss");
}
export {
  h as currentTimestamp,
  F as formatListToSeverityTag,
  N as formatNumberGrouped,
  v as formatPrice,
  M as formatReceiptNumberByFirstLetter,
  w as safeNumber,
  q as useFormatters
};
