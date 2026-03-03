import { set as x, cloneDeep as D, flatten as T, map as z, filter as q } from "lodash-es";
import { ref as c } from "vue";
import { ValidationError as J } from "yup";
function Y(a = {}) {
  const l = computed(() => toValue(a.fields)?.filter((e) => !(typeof e == "object" && ["separator", "divider"].includes(e.type))).map((e) => typeof e == "string" ? { name: e } : e) ?? []), v = toRef(a.staticInitialValues), o = c([]), f = a.defaultValidationMode ?? "onSubmit", h = computed(() => l.value.reduce(
    (e, t) => (t.rules && (e[t.name] = t.rules.label(t.label ?? t.name)), e),
    {}
  )), y = computed(() => l.value.map((e) => e.name)), m = computed(() => l.value.reduce(
    (e, t) => (t.name && (e[t.name] = t.validationMode || f), e),
    {}
  )), A = computed(() => l.value.reduce(
    (e, t) => (e[t.name] = t.label ?? t.name, e),
    {}
  )), B = computed(() => l.value.reduce(
    (e, t) => (e[t.name] = !!t.rules?.tests.find(
      (n) => n.OPTIONS?.name === "required"
    ), e),
    {}
  )), b = computed(() => v.value ? v.value : l.value.reduce(
    (e, t) => (x(
      e,
      t.name.split("."),
      typeof t.defaultValue == "function" ? t.defaultValue() : t.defaultValue
    ), e),
    {}
  )), i = c(D(b.value)), G = c({});
  function F() {
    return {
      touched: !1,
      dirty: !1,
      pristine: !0,
      valid: !0,
      invalid: !1,
      error: null,
      errors: [],
      busy: !1
    };
  }
  function S() {
    const e = {};
    return y.value.forEach((t) => {
      e[t] = F();
    }), e;
  }
  const r = c(S()), u = c(F());
  function L(e) {
    const t = i.value[e];
    r.value[e].pristine = !1, u.value.pristine = !1, r.value[e].dirty = t !== b.value[e], m.value[e] === "onValueUpdate" && d(e);
  }
  function O(e, t) {
    x(i.value, e.split("."), t);
  }
  function d(e, t = !0) {
    const n = h.value[e];
    if (n) {
      try {
        n.validateSync(i.value[e], {
          strict: !0,
          abortEarly: a.fieldValidatorGetFirstErrorOnly ?? !0
        }), r.value[e].errors = [];
      } catch (s) {
        s instanceof J && (r.value[e].errors = s.errors.map((K) => ({
          message: K
        })));
      }
      return g(e, t), r.value[e].errors.length;
    }
    return null;
  }
  function g(e, t = !0) {
    r.value[e].valid = r.value[e].errors.length === 0, r.value[e].invalid = !r.value[e].valid, r.value[e].error = r.value[e].errors[0], t && p();
  }
  function p() {
    u.value.errors = [
      ...o.value,
      ...T(z(r.value, (e) => e.errors))
    ], u.value.error = u.value.errors[0], u.value.valid = u.value.errors.length === 0, u.value.invalid = !u.value.valid, u.value.touched || (u.value.touched = q(r.value, (e) => e.touched).length > 0), u.value.pristine && (u.value.pristine = q(r.value, (e) => e.pristine).length > 0);
  }
  function V() {
    y.value.forEach((e) => {
      d(e, !1);
    }), p();
  }
  function P(e) {
    r.value[e].touched = !0, m.value[e] === "onBlur" ? d(e) : u.value.touched = !0;
  }
  function R() {
    r.value = S(), i.value = D(b.value), u.value = F(), o.value = [];
  }
  const E = c({});
  onMounted(() => {
    a?.watchFieldValues !== !1 && (y.value.forEach((e) => {
      E.value[e] && E.value[e](), E.value[e] = watch(
        () => i.value[e],
        () => {
          L(e);
        },
        {
          deep: a.watchFieldValuesDeep ?? !1
        }
      );
    }), a.validateOnInitialLoad && V());
  });
  function U(e, t) {
    r.value[e] = t.map((n) => typeof n == "string" ? { message: n } : n), g(e, !0);
  }
  function j(e) {
    for (const t in e) {
      const n = e[t].map(
        (s) => typeof s == "string" ? { message: s } : s
      );
      if (r.value[t])
        r.value[t].errors = n, g(t, !1);
      else
        for (const s in n)
          M(n[s], !1);
    }
    p();
  }
  function k(e, t) {
    r.value[e].errors.push(
      typeof t == "string" ? { message: t } : t
    ), g(e, !0);
  }
  function M(e, t = !0) {
    o.value.push(typeof e == "string" ? { message: e } : e), t && p();
  }
  function I(e) {
    r.value[e].error = null, r.value[e].errors = [], r.value[e].valid = !0, r.value[e].invalid = !1;
  }
  function C() {
    o.value = [];
    for (const e in r.value)
      I(e);
    u.value.errors = [], u.value.error = null, u.value.valid = !0, u.value.invalid = !1;
  }
  const w = {
    currentValues: i,
    currentFiles: G,
    fieldNames: y,
    initialValues: b,
    clearFieldError: I,
    clearErrors: C,
    fieldsStates: r,
    formState: u,
    reset: R,
    onBlur: P,
    setValue: O,
    fields: l,
    submitForm: H,
    validateField: d,
    validateAll: V,
    fieldsLabels: A,
    setFieldErrors: U,
    addFieldError: k,
    addGlobalError: M,
    setMultiFieldsErrors: j,
    requiredFieldsNames: B
  };
  async function H() {
    let e = !1;
    for (const t in m.value)
      m.value[t] === "onSubmit" && d(t, !1) !== null && (e = !0);
    return e && p(), typeof a?.onSubmit == "function" && !e ? a.onSubmit(i.value, w) : Promise.resolve(u.value.valid);
  }
  return w;
}
function Z(a) {
  const l = [];
  for (const v in a) {
    let o = "text";
    const f = a[v], h = typeof a[v];
    h === "number" || h === "bigint" ? o = "number" : typeof f == "boolean" ? o = "checkbox" : typeof f == "object" && f instanceof Date && (o = "date"), l.push({
      name: v,
      type: o
    });
  }
  return l;
}
export {
  Z as objectIntoFields,
  Y as useHddForm
};
