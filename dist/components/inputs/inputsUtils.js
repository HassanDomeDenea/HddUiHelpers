import { uniqueId as d, pick as f } from "lodash-es";
const g = {
  hideLabelDoubleDots: !0
}, b = [
  "autocomplete",
  "icon",
  "uniqueId",
  "modelValue",
  "label",
  "labelMinWidth",
  "variant",
  "iconAsAddon",
  "onLocalEnterKeyDown",
  "floatingLabel",
  "showErrorMessage",
  "floatingLabelVariant",
  "infieldTopAlignedLabel",
  "inputId",
  "required",
  "showRequiredAsterisk",
  "requiredInLabel",
  "formName",
  "name",
  "error",
  "helperText",
  "placeholder",
  "autoI18nLabel",
  "disabled",
  "readonly",
  "inline",
  "controlBeforeLabel",
  "labelSingleLine",
  "hideLabelDoubleDots",
  "ignoreLabelSelector",
  "labelClass",
  "labelStyle",
  "iconClass",
  "inputClass",
  "wrapperClass",
  "controlWrapperClass",
  "size",
  "buttonAddon",
  "controlComponent"
], L = function(e) {
  const n = computed(() => !!e.error), t = ref(), r = computed(() => e.uniqueId ?? d(e.name ?? "unnamed")), o = computed(() => ({
    inputId: r.value,
    ref: (i) => t.value = i,
    ...f(e, b)
  })), l = {
    hasError: n,
    baseInputRef: t,
    name: e.name,
    disabled: e.disabled
  }, s = computed(() => ({
    fluid: !0,
    size: e.size,
    name: e.name,
    invalid: n.value,
    disabled: e.disabled,
    readonly: e.readonly,
    variant: e.variant
  }));
  return {
    exposed: l,
    baseInputRef: t,
    fieldUniqueId: r,
    hasError: n,
    baseInputForwardedProps: o,
    generalInputProps: s
  };
};
function m(e, n, t = "id", r = "children") {
  let o = null;
  function l(s, i) {
    for (const a of s) {
      if (o) return;
      const u = i.concat(a);
      if (a[t] === e) {
        o = [];
        for (let c = u.length - 1; c >= 0; c--)
          o.push(u[c]);
        return;
      }
      a[r]?.length && l(a[r], u);
    }
  }
  return l(n, []), o;
}
function S(e, n, t = "id", r = "label", o = "children") {
  const l = m(e, n, t, o);
  return l ? h(l, r) : "";
}
function h(e, n = "label", t = ">>") {
  return e.slice().reverse().map((r) => r[n]).join(`  ${t}  `);
}
function T(e) {
  if (!e) return !1;
  const n = e.selectionStart;
  return !(e.selectionStart !== e.selectionEnd) && n === 0;
}
function v(e) {
  if (!e) return !1;
  const n = e.selectionStart;
  return !(e.selectionStart !== e.selectionEnd) && n === e.value.length;
}
export {
  g as DefaultBasInputProps,
  v as cursorAtEndOfInput,
  T as cursorAtStartOfInput,
  h as getTextFromTreePath,
  m as getTreeAncestorsById,
  S as getTreeItemLabelWithParents,
  L as useHddBaseInputUtils
};
