import { printValue as i, ValidationError as u } from "yup";
const r = {
  default: "${path} غير صحيح",
  required: "${path} مطلوب",
  defined: "${path} يجب ان يكون معرف",
  notNull: "${path} لا يمكن أن يكون فارغاً",
  oneOf: "${path} لا بد أن يكون أحد القيم: ${values}",
  notOneOf: "${path} لا بد أن لا يكون أحد القيم: ${values}",
  notType: ({ path: a, type: n, value: t, originalValue: s }) => {
    const e = s != null && s !== t ? ` (cast from the value \`${i(s, !0)}\`).` : ".";
    return n !== "mixed" ? `${a} must be a \`${n}\` type, but the final value was: \`${i(t, !0)}\`${e}` : `${a} must match the configured type. The validated value was: \`${i(t, !0)}\`${e}`;
  }
}, $ = {
  length: "${path} يجب ان يتكون من ${length} حرف",
  min: "${path} يجب أن يتكون على الأقل من ${min} حرف",
  max: "${path} يجب أن يتكون على الأكثر من ${max} حرف",
  matches: '${path} يجب أن يكون مطابق لـ: "${regex}"',
  email: "${path} يجب أن يكون بريد الكتروني صحيح",
  url: "${path} يجب أن يكون رابط صحيح",
  uuid: "${path} must be a valid UUID",
  datetime: "${path} must be a valid ISO date-time",
  datetime_precision: "${path} must be a valid ISO date-time with a sub-second precision of exactly ${precision} digits",
  datetime_offset: '${path} must be a valid ISO date-time with UTC "Z" timezone',
  trim: "${path} must be a trimmed string",
  lowercase: "${path} must be a lowercase string",
  uppercase: "${path} must be a upper case string"
}, h = {
  min: "${path} must be greater than or equal to ${min}",
  max: "${path} must be less than or equal to ${max}",
  lessThan: "${path} must be less than ${less}",
  moreThan: "${path} must be greater than ${more}",
  positive: "${path} must be a positive number",
  negative: "${path} must be a negative number",
  integer: "${path} must be an integer"
}, m = {
  min: "${path} field must be later than ${min}",
  max: "${path} field must be at earlier than ${max}"
}, o = {
  isValue: "${path} field must be ${value}"
}, p = {
  noUnknown: "${path} field has unspecified keys: ${unknown}",
  exact: "${path} object contains unknown properties: ${properties}"
}, l = {
  min: "${path} field must have at least ${min} items",
  max: "${path} field must have less than or equal to ${max} items",
  length: "${path} must have ${length} items"
}, c = {
  notType: (a) => {
    const { path: n, value: t, spec: s } = a, e = s.types.length;
    if (Array.isArray(t)) {
      if (t.length < e)
        return `${n} tuple value has too few items, expected a length of ${e} but got ${t.length} for value: \`${i(t, !0)}\``;
      if (t.length > e)
        return `${n} tuple value has too many items, expected a length of ${e} but got ${t.length} for value: \`${i(t, !0)}\``;
    }
    return u.formatError(r.notType, a);
  }
}, b = Object.assign(/* @__PURE__ */ Object.create(null), {
  mixed: r,
  string: $,
  number: h,
  date: m,
  object: p,
  array: l,
  boolean: o,
  tuple: c
});
export {
  b as default
};
