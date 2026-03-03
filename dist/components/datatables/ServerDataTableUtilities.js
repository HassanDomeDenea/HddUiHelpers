import { useEventBus as y } from "@vueuse/core";
import { replace as b, startCase as d, snakeCase as p } from "lodash-es";
import s from "moment";
import { isToolbarFilterWrapper as c } from "./ServerDataTableTypes.js";
function f(e) {
  return e.name ?? e.field ?? "";
}
function O(e, t) {
  return e.label ?? t(d((e.relation ? e.relation + "." : "") + f(e)));
}
function w(e) {
  return b(f(e), ".", "_");
}
function D(e) {
  return b(e.name || "", ".", "_");
}
function N(e, t) {
  return typeof t.bodyClass == "function" ? t.bodyClass(e, t) : t.bodyClass ?? null;
}
const m = /* @__PURE__ */ Symbol(
  " DynamicServerFormDialogEventBus Symbol Key"
), S = function() {
  const e = y(m);
  return {
    create: (t, l) => {
      const a = {};
      return e.emit({ event: "create", options: t, row: l, dialogRefGetter: a }), a;
    },
    edit: (t, l) => {
      const a = {};
      return e.emit({ event: "edit", options: t, row: l, dialogRefGetter: a }), a;
    },
    delete: (t, l) => {
      const a = {};
      return e.emit({ event: "delete", options: t, row: l, dialogRefGetter: a }), a;
    }
  };
};
function A(e) {
  return !["boolean", "select", "color"].includes(e.type || "text");
}
function F(e) {
  return !["boolean", "select"].includes(e.type || "text");
}
function B(e) {
  return !["boolean", "select"].includes(e.type || "text");
}
function q(e) {
  return !["boolean", "select"].includes(e.type || "text");
}
function M(e) {
  return e === "start" ? "left" : e === "end" ? "right" : null;
}
function T(e) {
  return e && s(e).isValid() ? s(e).format("YYYY-MM-DD") : "";
}
function _(e) {
  return s(e).isValid() ? s(e).format("YYYY") : "";
}
function x(e, t, l = "/") {
  const a = new URL("https://" + window.location.hostname + e);
  return a.pathname = a.pathname + l + t, a.pathname + a.search;
}
function Y(e) {
  const t = [
    { label: e("Starts with"), value: "startsWith" },
    { label: e("Contains"), value: "contains" },
    { label: e("Contains words"), value: "containsAll" },
    { label: e("Contains any word"), value: "containsAny" },
    { label: e("Not contains"), value: "notContains" },
    { label: e("Ends with"), value: "endsWith" },
    { label: e("Equals"), value: "equals", symbol: "=" },
    { label: e("Not equals"), value: "notEquals", symbol: "!=" }
  ], l = [
    { label: e("Equals"), value: "equals", symbol: "=" },
    { label: e("Not equals"), value: "notEquals", symbol: "!=" },
    { label: e("Less than"), value: "lt", symbol: "<" },
    { label: e("Less than or equals"), value: "lte", symbol: "<=" },
    { label: e("Greater than"), value: "gt", symbol: ">" },
    { label: e("Greater than or equals"), value: "gte", symbol: ">=" },
    { label: e("Between"), value: "between" },
    { label: e("Not Between"), value: "notBetween" }
  ];
  return {
    text: t,
    textarea: t,
    numeric: l,
    price: l,
    date: [
      { label: e("Date is"), value: "dateIs", symbol: "=" },
      { label: e("Date is not"), value: "dateIsNot", symbol: "!=" },
      { label: e("Date before"), value: "dateBefore", symbol: "<" },
      { label: e("Date is or before"), value: "dateIsOrBefore", symbol: "<=" },
      { label: e("Date after"), value: "dateAfter", symbol: ">" },
      { label: e("Date is or after"), value: "dateIsOrAfter", symbol: ">=" },
      { label: e("Date between"), value: "dateBetween", symbol: e("Between") },
      { label: e("Date not between"), value: "dateNotBetween", symbol: e("Not Between") }
    ],
    boolean: [
      { label: e("True value"), value: "isTrue" },
      { label: e("False value"), value: "isFalse" },
      { label: e("Equals"), value: "equals", symbol: "=" },
      { label: e("Not specified"), value: "isNull" },
      { label: e("Specified"), value: "isNotNull" }
    ],
    color: [],
    select: [],
    hidden: []
  };
}
function E(e, t, l) {
  let a = t.field || "";
  if (typeof t.formatter == "string" && (a = t.formatter), typeof t.formatter == "function")
    return t.formatter(e, { id: "" }, a);
  if (t.type === "select") {
    let n, r = {};
    return t.selectOptionsKeyed ? r = t.selectOptionsKeyed : t.selectOptions && (Array.isArray(t.selectOptions) ? r = t.selectOptions.reduce((o, i) => (o[i[t.selectValueProperty ?? "id"]] = i[t.selectLabelProperty ?? "name"], o), {}) : r = t.selectOptions.object), Array.isArray(e) ? n = e.map((o) => r?.[o] || o) : n = r?.[e] || e, !n && t.emptyValuePlaceholder && (n = `<span class="italic text-muted">${t.emptyValuePlaceholder}</span>`), n;
  }
  if (t.type === "boolean") {
    let n = e === !0 ? l("Yes") : e === !1 ? l("No") : "";
    return n || (n = `<span class="italic text-muted">${t.emptyValuePlaceholder ?? "null"}</span>`), n;
  }
  return e;
}
function u(e, t = !0) {
  return Array.isArray(e) ? e.every((l) => u(l, t)) : c(e) ? e.fields.length < 1 || e.fields.every((l) => u(l, t)) : t && e.isFixed ? !0 : e.value === null;
}
function L(e) {
  return e;
}
function P(e) {
  return e.split(".").map((t) => p(t)).join(".");
}
const R = "TWO_COLUMNS_FORM_CLASS_ON_MD";
export {
  R as TWO_COLUMNS_FORM_CLASS_ON_MD,
  x as appendToUrl,
  m as dynamicServerFormDialogKey,
  T as formatDateOnly,
  _ as formatDateYearOnly,
  N as getColumnBodyClass,
  F as getColumnCanShowAddButton,
  q as getColumnCanShowFilterApplyButton,
  A as getColumnCanShowFilterMatchModes,
  B as getColumnCanShowFilterOperator,
  E as getColumnCellFormatedText,
  f as getColumnName,
  w as getColumnSlotName,
  O as getColumnTitle,
  D as getFieldSlotName,
  Y as getFilterMatchModesByTypeOptions,
  u as isToolbarFilterEmpty,
  M as localeAlignToFrozenAlign,
  L as serverDataTablePropFn,
  P as snakeCasePreserveDots,
  S as useDynamicServerFormDialog
};
