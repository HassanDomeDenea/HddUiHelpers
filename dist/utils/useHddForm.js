import { set as D, cloneDeep as q, flatten as z, map as J, filter as A } from "lodash-es";
import { computed as v, toValue as Q, toRef as W, ref as f, onMounted as X, watch as Y } from "vue";
import { ValidationError as Z } from "yup";
function ee(u = {}) {
  const l = v(() => Q(u.fields)?.filter((e) => !(typeof e == "object" && ["separator", "divider"].includes(e.type))).map((e) => typeof e == "string" ? { name: e } : e) ?? []), c = W(u.staticInitialValues), o = f([]), d = u.defaultValidationMode ?? "onSubmit", y = v(() => l.value.reduce(
    (e, r) => (r.rules && (e[r.name] = r.rules.label(r.label ?? r.name)), e),
    {}
  )), b = v(() => l.value.map((e) => e.name)), g = v(() => l.value.reduce(
    (e, r) => (r.name && (e[r.name] = r.validationMode || d), e),
    {}
  )), B = v(() => l.value.reduce(
    (e, r) => (e[r.name] = r.label ?? r.name, e),
    {}
  )), G = v(() => l.value.reduce(
    (e, r) => (e[r.name] = !!r.rules?.tests.find(
      (n) => n.OPTIONS?.name === "required"
    ), e),
    {}
  )), F = v(() => c.value ? c.value : l.value.reduce(
    (e, r) => (D(
      e,
      r.name.split("."),
      typeof r.defaultValue == "function" ? r.defaultValue() : r.defaultValue
    ), e),
    {}
  )), i = f(q(F.value)), L = f({});
  function E() {
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
  function V() {
    const e = {};
    return b.value.forEach((r) => {
      e[r] = E();
    }), e;
  }
  const t = f(V()), a = f(E());
  function O(e) {
    const r = i.value[e];
    t.value[e].pristine = !1, a.value.pristine = !1, t.value[e].dirty = r !== F.value[e], g.value[e] === "onValueUpdate" && p(e);
  }
  function P(e, r) {
    D(i.value, e.split("."), r);
  }
  function p(e, r = !0) {
    const n = y.value[e];
    if (n) {
      try {
        n.validateSync(i.value[e], {
          strict: !0,
          abortEarly: u.fieldValidatorGetFirstErrorOnly ?? !0
        }), t.value[e].errors = [];
      } catch (s) {
        s instanceof Z && (t.value[e].errors = s.errors.map((T) => ({
          message: T
        })));
      }
      return m(e, r), t.value[e].errors.length;
    }
    return null;
  }
  function m(e, r = !0) {
    t.value[e].valid = t.value[e].errors.length === 0, t.value[e].invalid = !t.value[e].valid, t.value[e].error = t.value[e].errors[0], r && h();
  }
  function h() {
    a.value.errors = [
      ...o.value,
      ...z(J(t.value, (e) => e.errors))
    ], a.value.error = a.value.errors[0], a.value.valid = a.value.errors.length === 0, a.value.invalid = !a.value.valid, a.value.touched || (a.value.touched = A(t.value, (e) => e.touched).length > 0), a.value.pristine && (a.value.pristine = A(t.value, (e) => e.pristine).length > 0);
  }
  function M() {
    b.value.forEach((e) => {
      p(e, !1);
    }), h();
  }
  function R(e) {
    t.value[e].touched = !0, g.value[e] === "onBlur" ? p(e) : a.value.touched = !0;
  }
  function U() {
    t.value = V(), i.value = q(F.value), a.value = E(), o.value = [];
  }
  const S = f({});
  X(() => {
    u?.watchFieldValues !== !1 && (b.value.forEach((e) => {
      S.value[e] && S.value[e](), S.value[e] = Y(
        () => i.value[e],
        () => {
          O(e);
        },
        {
          deep: u.watchFieldValuesDeep ?? !1
        }
      );
    }), u.validateOnInitialLoad && M());
  });
  function j(e, r) {
    t.value[e] = r.map((n) => typeof n == "string" ? { message: n } : n), m(e, !0);
  }
  function k(e) {
    for (const r in e) {
      const n = e[r].map(
        (s) => typeof s == "string" ? { message: s } : s
      );
      if (t.value[r])
        t.value[r].errors = n, m(r, !1);
      else
        for (const s in n)
          I(n[s], !1);
    }
    h();
  }
  function C(e, r) {
    t.value[e].errors.push(
      typeof r == "string" ? { message: r } : r
    ), m(e, !0);
  }
  function I(e, r = !0) {
    o.value.push(typeof e == "string" ? { message: e } : e), r && h();
  }
  function w(e) {
    t.value[e].error = null, t.value[e].errors = [], t.value[e].valid = !0, t.value[e].invalid = !1;
  }
  function H() {
    o.value = [];
    for (const e in t.value)
      w(e);
    a.value.errors = [], a.value.error = null, a.value.valid = !0, a.value.invalid = !1;
  }
  const x = {
    currentValues: i,
    currentFiles: L,
    fieldNames: b,
    initialValues: F,
    clearFieldError: w,
    clearErrors: H,
    fieldsStates: t,
    formState: a,
    reset: U,
    onBlur: R,
    setValue: P,
    fields: l,
    submitForm: K,
    validateField: p,
    validateAll: M,
    fieldsLabels: B,
    setFieldErrors: j,
    addFieldError: C,
    addGlobalError: I,
    setMultiFieldsErrors: k,
    requiredFieldsNames: G
  };
  async function K() {
    let e = !1;
    for (const r in g.value)
      g.value[r] === "onSubmit" && p(r, !1) !== null && (e = !0);
    return e && h(), typeof u?.onSubmit == "function" && !e ? u.onSubmit(i.value, x) : Promise.resolve(a.value.valid);
  }
  return x;
}
function re(u) {
  const l = [];
  for (const c in u) {
    let o = "text";
    const d = u[c], y = typeof u[c];
    y === "number" || y === "bigint" ? o = "number" : typeof d == "boolean" ? o = "checkbox" : typeof d == "object" && d instanceof Date && (o = "date"), l.push({
      name: c,
      type: o
    });
  }
  return l;
}
export {
  re as objectIntoFields,
  ee as useHddForm
};
