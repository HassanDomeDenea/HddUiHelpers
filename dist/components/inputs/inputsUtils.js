import { uniqueId as f, pick as b } from "lodash-es";
import { computed as i, ref as h } from "vue";
const T = {
  hideLabelDoubleDots: !0
}, m = [
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
], v = function(e) {
  const n = i(() => !!e.error), t = h(), r = i(() => e.uniqueId ?? f(e.name ?? "unnamed")), o = i(() => ({
    inputId: r.value,
    ref: (u) => t.value = u,
    ...b(e, m)
  })), l = {
    hasError: n,
    baseInputRef: t,
    name: e.name,
    disabled: e.disabled
  }, s = i(() => ({
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
function I(e, n, t = "id", r = "children") {
  let o = null;
  function l(s, u) {
    for (const a of s) {
      if (o) return;
      const c = u.concat(a);
      if (a[t] === e) {
        o = [];
        for (let d = c.length - 1; d >= 0; d--)
          o.push(c[d]);
        return;
      }
      a[r]?.length && l(a[r], c);
    }
  }
  return l(n, []), o;
}
function x(e, n, t = "id", r = "label", o = "children") {
  const l = I(e, n, t, o);
  return l ? g(l, r) : "";
}
function g(e, n = "label", t = ">>") {
  return e.slice().reverse().map((r) => r[n]).join(`  ${t}  `);
}
function A(e) {
  if (!e) return !1;
  const n = e.selectionStart;
  return !(e.selectionStart !== e.selectionEnd) && n === 0;
}
function P(e) {
  if (!e) return !1;
  const n = e.selectionStart;
  return !(e.selectionStart !== e.selectionEnd) && n === e.value.length;
}
export {
  T as DefaultBasInputProps,
  P as cursorAtEndOfInput,
  A as cursorAtStartOfInput,
  g as getTextFromTreePath,
  I as getTreeAncestorsById,
  x as getTreeItemLabelWithParents,
  v as useHddBaseInputUtils
};
