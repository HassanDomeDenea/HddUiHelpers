import { _ as $e } from "./ImageInput.vue_vue_type_script_setup_true_lang-ga_LQWDw.js";
import { _ as Be } from "./TipTapEditorInput.vue_vue_type_script_setup_true_lang-Cv_QDFNl.js";
import { _ as Le } from "./InfiniteMultiSelectInput.vue_vue_type_script_setup_true_lang-C27fX6kM.js";
import { _ as Me } from "./InfiniteSelectInput.vue_vue_type_script_setup_true_lang-CY5fFxjt.js";
import { _ as We } from "./AutoCompleteInput.vue_vue_type_script_setup_true_lang-D1Dc1iXJ.js";
import { _ as Ae } from "./DatePickerInput.vue_vue_type_script_setup_true_lang-D6B1ypZM.js";
import { _ as Te } from "./TextAreaInput.vue_vue_type_script_setup_true_lang-BzkVktnw.js";
import { _ as Ne } from "./MathInput.vue_vue_type_script_setup_true_lang-PPEyYQy7.js";
import { _ as Re } from "./NumberInput.vue_vue_type_script_setup_true_lang-RdKVNSfW.js";
import { _ as ze } from "./TreeSelectInput.vue_vue_type_script_setup_true_lang-DQT5AbnS.js";
import { _ as Oe } from "./PhoneInput.vue_vue_type_script_setup_true_lang-xpkaeGjC.js";
import { _ as Ke } from "./PasswordInput.vue_vue_type_script_setup_true_lang-Rvd_-qdW.js";
import { _ as Pe } from "./ToggleSwitchInput.vue_vue_type_script_setup_true_lang-CovEYjq1.js";
import { _ as qe } from "./ColorPickerInput.vue_vue_type_script_setup_true_lang--CG2xF6W.js";
import je from "primevue/message";
import { defineComponent as De, useModel as Ge, computed as E, useTemplateRef as K, ref as Y, nextTick as Z, watch as _, onMounted as He, openBlock as r, createElementBlock as F, createElementVNode as U, withModifiers as L, unref as e, createVNode as P, withCtx as ee, Fragment as q, renderList as te, toDisplayString as Je, createCommentVNode as $, renderSlot as w, normalizeClass as oe, createBlock as p, Teleport as Qe, toValue as k, mergeProps as y, withKeys as M, mergeModels as ne } from "vue";
import { isAxiosError as Xe } from "axios";
import { getFieldSlotName as j } from "HddUiHelpers/components/datatables/ServerDataTableUtilities.ts";
import Ye from "HddUiHelpers/components/inputs/CheckboxInput.vue";
import Ze from "HddUiHelpers/components/inputs/FormObjectInput.vue";
import _e from "HddUiHelpers/components/inputs/ListBoxInput.vue";
import et from "HddUiHelpers/components/inputs/MultiSelectInput.vue";
import tt from "HddUiHelpers/components/inputs/RadioButtonInput.vue";
import ot from "HddUiHelpers/components/inputs/SelectInput.vue";
import nt from "HddUiHelpers/components/inputs/TextInput.vue";
import { useApiClient as at } from "HddUiHelpers/stores/apiClient";
import { cloneDeep as lt, mapValues as ut, uniqueId as rt, maxBy as st, map as mt, throttle as it, find as dt, reduce as ct, get as m, set as s, omit as W, unset as pt } from "lodash-es";
import ae from "primevue/button";
import { useHddForm as yt } from "./utils/useHddForm.js";
import { isAxiosValidationError as bt } from "./components/FormWrapper/types.js";
import { useI18n as ft } from "vue-i18n";
import { syncRef as vt } from "@vueuse/core";
const ht = ["autocomplete"], Vt = { key: 0 }, gt = { class: "list-disc ps-4" }, Ft = { class: "mb-2" }, Ut = { class: "flex items-center gap-1" }, wt = { class: "min-w-0 flex-1" }, kt = {
  key: 0,
  class: "mt-4"
}, xt = { class: "flex items-center justify-between gap-2" }, ao = /* @__PURE__ */ De({
  __name: "HddForm",
  props: /* @__PURE__ */ ne({
    url: {},
    fields: {},
    urlMethod: { default: "post" },
    formName: {},
    fieldsContainerClass: {},
    submitPayloadTransformer: { type: Function },
    size: {},
    onSuccess: { type: Function },
    onFailure: { type: Function },
    unifyLabelsWidth: { type: [Boolean, Number], default: !1 },
    onSubmit: { type: Function },
    summarizeErrorsAtTop: { type: Boolean, default: !0 },
    showFieldErrorBelowIt: { type: Boolean, default: !1 },
    autoFocusFirstOnMount: { type: Boolean, default: !0 },
    submitOnEnter: { type: Boolean, default: !0 },
    showFieldErrorsPopover: { type: Boolean, default: !1 },
    inlineFields: { type: Boolean, default: !0 },
    iconAsAddon: { type: Boolean },
    withFooterButtons: { type: Boolean, default: !0 },
    showRequiredAsterisk: { type: Boolean, default: !1 },
    submitText: { type: [String, Boolean], default: "" },
    initialValues: {},
    submitIcon: {},
    submitSeverity: {},
    fixedLabelWidth: {},
    isEditing: { type: Boolean },
    autoComplete: {},
    defaultValidationMode: { default: "onSubmit" },
    floatingLabel: { type: Boolean },
    floatingLabelVariant: {},
    infieldTopAlignedLabel: { type: Boolean }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ ne(["reset", "submit"], ["update:modelValue"]),
  setup(a, { expose: le, emit: ue }) {
    const D = Ge(a, "modelValue"), re = ue, C = at(), { t: x } = ft(), se = E(() => ({
      fields: a.fields,
      defaultValidationMode: a.defaultValidationMode,
      staticInitialValues: a.initialValues,
      onSubmit: (o, u) => {
        if (re("submit", o, u), a.url)
          return ie().then((b) => (a.onSuccess && a.onSuccess(b), b)).catch((b) => {
            console.error(b), a.onFailure && a.onFailure(b);
          });
      }
    })), me = K("containerRef"), G = K("fieldsContainerRef"), H = K("submitButtonRef"), f = yt(se.value), I = Y(!1);
    async function ie() {
      return new Promise((o, u) => {
        if (!a.url) return u("No url provided");
        I.value = !0, f.clearErrors();
        let b = f.currentValues.value;
        const v = f.currentFiles.value, z = Object.values(v).filter((h) => h).length > 0;
        a.submitPayloadTransformer && (b = a.submitPayloadTransformer(lt(b), f));
        let g;
        if (z)
          g = C.upload(a.url, v, b);
        else if (typeof a.url == "object")
          g = C.request(a.url, b, !1);
        else
          switch (a.urlMethod) {
            case "post":
              g = C.post(a.url, b);
              break;
            case "put":
              g = C.put(a.url, b);
              break;
            case "get":
              g = C.get(a.url, { params: b });
              break;
            case "delete":
              g = C.delete(a.url, { params: b });
              break;
          }
        g.then((h) => {
          o(h.data);
        }).catch(async (h) => {
          bt(h) ? f.setMultiFieldsErrors(
            ut(h.response.data.errors, (O) => O.map((B) => ({ message: B })))
          ) : Xe(h) ? f.addGlobalError(x(h.response?.data.message ?? h.message ?? "Error Occurred")) : f.addGlobalError(x("Error Occurred")), await Z(), (!document.activeElement || document.activeElement.getAttribute("aria-invalid") !== "true") && fe() === !1 && R(), u(h);
        }).finally(() => {
          I.value = !1;
        });
      });
    }
    const { requiredFieldsNames: de, formState: A, fields: T } = f, n = f.currentValues, J = f.currentFiles, ce = f.fieldsStates, pe = E(() => a.fixedLabelWidth && a.fixedLabelWidth > 0 ? `width: ${a.fixedLabelWidth}px` : ""), V = Y({}), Q = E(() => a.formName || rt("hdd-form-")), ye = E(() => typeof a.unifyLabelsWidth == "number" ? a.unifyLabelsWidth : a.unifyLabelsWidth === !0 ? st(mt(V.value, (o) => o?.baseInputRef?.labelWidth ?? o?.labelWidth)) : null), i = E(() => ({
      labelStyle: pe.value,
      inline: a.inlineFields,
      formName: Q.value,
      labelMinWidth: ye,
      labelSingleLine: a.unifyLabelsWidth === !0 && a.inlineFields,
      iconAsAddon: a.iconAsAddon,
      size: a.size,
      floatingLabel: a.floatingLabel,
      floatingLabelVariant: a.floatingLabelVariant,
      infieldTopAlignedLabel: a.infieldTopAlignedLabel,
      onKeydown: (o) => o.key === "Enter" && a.submitOnEnter && f.submitForm()
    }));
    function d(o) {
      return {
        label: o.label,
        ref: (u) => V.value[o.name] = u,
        required: de.value[o.name],
        showRequiredAsterisk: a.showRequiredAsterisk,
        helperText: o.notes,
        name: o.name,
        autocomplete: o.autocomplete,
        disabled: typeof o.disabled == "function" ? o.disabled(n.value) : o.disabled,
        readonly: typeof o.readonly == "function" ? o.readonly(n.value) : o.readonly,
        icon: o.icon,
        placeholder: o.placeholder,
        size: o.size ?? a.size,
        error: ce.value[o.name].error?.message,
        showErrorMessage: a.showFieldErrorBelowIt,
        ...o.labelWidth || o.labelWidth === 0 ? {
          labelMinWidth: o.labelWidth || "unset"
        } : {},
        ...["text", "password"].includes(o.type ?? "text") ? {
          onFocusNext: () => he(o),
          onFocusPrevious: () => ve(o)
        } : [],
        ...o.addonCallback ? {
          textAddon: (u) => o.addonCallback({ value: u, row: k(n) })
        } : {},
        ...o.onValueUpdate ? {
          "onUpdate:modelValue": (u) => {
            be(o, u);
          }
        } : {},
        ...o.binds ? typeof o.binds == "function" ? o.binds({
          isEditing: a.isEditing,
          row: k(n)
        }) : o.binds : {},
        ...o.teleport && !o.labelWidth ? {
          labelMinWidth: "unset"
        } : {}
      };
    }
    function be(o, u) {
      o.onValueUpdate?.({
        value: u,
        row: k(n),
        setValue: f.setValue,
        fieldRef: V.value[o.name]
      });
    }
    const N = it(() => {
    }, 50);
    _(
      () => a.unifyLabelsWidth,
      () => {
        N();
      },
      {
        immediate: !0,
        flush: "post"
      }
    ), _(
      () => f.fields.value.map((o) => !o.hidden).length,
      () => {
        a.unifyLabelsWidth === !0 && N();
      },
      {
        immediate: !1,
        flush: "post"
      }
    ), He(() => {
      a.autoFocusFirstOnMount && R(), N();
    });
    function fe() {
      const o = dt(V.value, (u) => u?.hasError);
      return o ? (o.focus(), null) : !1;
    }
    function R() {
      Z(() => {
        let o = T.value[0]?.name;
        o ? X(o) : Object.values(V.value).filter((u) => !u?.disabled)[0]?.focus();
      });
    }
    function ve(o) {
      const u = Object.entries(V.value).filter((v) => !v[1]?.disabled), b = u.findIndex((v) => v[0] === o.name);
      u[b - 1]?.[1].focus?.();
    }
    function he(o) {
      const u = Object.entries(V.value).filter((v) => !v[1]?.disabled), b = u.findIndex((v) => v[0] === o.name);
      b + 1 === u.length ? ge() : u[b + 1]?.[1].focus?.();
    }
    function Ve() {
      const o = Object.values(V.value).filter((u) => !u?.disabled);
      o[o.length - 1]?.focus?.();
    }
    function ge() {
      H.value?.$el.focus();
    }
    function Fe(o, u) {
      V.value[u] = o;
    }
    function X(o) {
      V.value[o]?.focus();
    }
    le({ form: f, currentValues: n, fieldRefs: V, isSubmitting: I, focusFirst: R, focusField: X });
    const c = E(() => ct(
      T.value,
      (o, u) => (o[u.name] = u.name.split("."), o),
      {}
    ));
    function S(o, u) {
      return typeof o == "function" ? o(u) : k(o) ?? [];
    }
    return D.value && vt(D, f.currentValues), (o, u) => {
      const b = je, v = qe, z = Pe, g = Ke, h = Oe, O = ze, B = Re, Ue = Ne, we = Te, ke = Ae, xe = We, Ie = Me, Ce = Le, Ee = Be, Se = $e;
      return r(), F("div", {
        ref_key: "containerRef",
        ref: me,
        class: ""
      }, [
        U("form", {
          autocomplete: a.autoComplete,
          onSubmit: u[3] || (u[3] = L(() => {
          }, ["prevent"]))
        }, [
          a.summarizeErrorsAtTop && e(A).invalid ? (r(), F("div", Vt, [
            P(b, {
              size: a.size,
              severity: "error",
              class: "mb-2 mt-1 text-right",
              icon: "i-heroicons-exclamation-triangle-20-solid !size-8 !text-4xl"
            }, {
              default: ee(() => [
                U("ul", gt, [
                  (r(!0), F(q, null, te(e(A).errors, (t) => (r(), F("li", { key: t }, Je(t.message), 1))), 128))
                ])
              ]),
              _: 1
            }, 8, ["size"])
          ])) : $("", !0),
          w(o.$slots, "beforeControls"),
          U("div", {
            ref_key: "fieldsContainerRef",
            ref: G,
            class: oe(a.fieldsContainerClass)
          }, [
            (r(!0), F(q, null, te(e(T), (t) => (r(), p(Qe, {
              key: t.name,
              to: t.teleport ?? e(G),
              defer: "",
              disabled: !t.teleport
            }, [
              !t.hidden && (typeof t.showable == "function" ? t.showable({ row: e(n), isEditing: a.isEditing === !0 }) : !k(t.showable)) && !(a.isEditing && t.editable === !1) ? (r(), F(q, { key: 0 }, [
                w(o.$slots, `${e(j)(t)}BeforeControl`),
                w(o.$slots, `${e(j)(t)}ControlBody`, {}, () => [
                  U("div", Ft, [
                    U("div", Ut, [
                      U("div", wt, [
                        w(o.$slots, "fieldInput", {
                          field: t,
                          currentValues: e(n),
                          setRef: Fe,
                          binds: { ...e(i), ...d(t) }
                        }, () => [
                          !t.type || t.type === "text" ? (r(), p(nt, y({
                            key: 0,
                            "model-value": e(m)(e(n), t.name)
                          }, { ref_for: !0 }, { ...e(i), ...d(t) }, {
                            "onUpdate:modelValue": (l) => e(s)(e(n), e(c)[t.name], l)
                          }), null, 16, ["model-value", "onUpdate:modelValue"])) : t.type === "color" ? (r(), p(v, y({
                            key: 1,
                            "model-value": e(m)(e(n), t.name)
                          }, { ref_for: !0 }, { ...e(i), ...d(t) }, {
                            "onUpdate:modelValue": (l) => e(s)(e(n), e(c)[t.name], l)
                          }), null, 16, ["model-value", "onUpdate:modelValue"])) : t.type === "checkbox" ? (r(), p(Ye, y({
                            key: 2,
                            "model-value": e(m)(e(n), t.name)
                          }, { ref_for: !0 }, { ...e(i), ...d(t) }, {
                            "onUpdate:modelValue": (l) => e(s)(e(n), e(c)[t.name], l)
                          }), null, 16, ["model-value", "onUpdate:modelValue"])) : t.type === "radio" ? (r(), p(tt, y({
                            key: 3,
                            "model-value": e(m)(e(n), t.name)
                          }, { ref_for: !0 }, { ...e(i), ...d(t) }, {
                            options: S(t.options, e(n)),
                            "onUpdate:modelValue": (l) => e(s)(e(n), e(c)[t.name], l)
                          }), null, 16, ["model-value", "options", "onUpdate:modelValue"])) : t.type === "switch" ? (r(), p(z, y({
                            key: 4,
                            "model-value": e(m)(e(n), t.name)
                          }, { ref_for: !0 }, { ...e(i), ...d(t) }, {
                            "onUpdate:modelValue": (l) => e(s)(e(n), e(c)[t.name], l)
                          }), null, 16, ["model-value", "onUpdate:modelValue"])) : t.type === "password" ? (r(), p(g, y({
                            key: 5,
                            "model-value": e(m)(e(n), t.name)
                          }, { ref_for: !0 }, { ...e(i), ...d(t) }, {
                            "onUpdate:modelValue": (l) => e(s)(e(n), e(c)[t.name], l)
                          }), null, 16, ["model-value", "onUpdate:modelValue"])) : t.type === "phone" ? (r(), p(h, y({
                            key: 6,
                            "model-value": e(m)(e(n), t.name),
                            "country-code": t.countyCodeFieldName ? e(m)(e(n), t.countyCodeFieldName) : void 0,
                            "with-country-code": !!t.countyCodeFieldName
                          }, { ref_for: !0 }, { ...e(i), ...d(t) }, {
                            "onUpdate:countryCode": (l) => e(s)(e(n), t.countyCodeFieldName, l),
                            "onUpdate:modelValue": (l) => e(s)(e(n), e(c)[t.name], l)
                          }), null, 16, ["model-value", "country-code", "with-country-code", "onUpdate:countryCode", "onUpdate:modelValue"])) : t.type === "select" ? (r(), p(ot, y({
                            key: 7,
                            "model-value": e(m)(e(n), t.name)
                          }, { ref_for: !0 }, { ...e(i), ...d(t) }, {
                            options: S(t.options, e(n)),
                            "onUpdate:modelValue": (l) => e(s)(e(n), e(c)[t.name], l)
                          }), null, 16, ["model-value", "options", "onUpdate:modelValue"])) : t.type === "tree_select" ? (r(), p(O, y({
                            key: 8,
                            "model-value": e(m)(e(n), t.name)
                          }, { ref_for: !0 }, { ...e(i), ...d(t) }, {
                            options: S(t.options, e(n)),
                            "onUpdate:modelValue": (l) => e(s)(e(n), e(c)[t.name], l)
                          }), null, 16, ["model-value", "options", "onUpdate:modelValue"])) : t.type === "multiselect" ? (r(), p(et, y({
                            key: 9,
                            "model-value": e(m)(e(n), t.name)
                          }, { ref_for: !0 }, { ...e(i), ...d(t) }, {
                            options: S(t.options, e(n)),
                            "onUpdate:modelValue": (l) => e(s)(e(n), e(c)[t.name], l)
                          }), null, 16, ["model-value", "options", "onUpdate:modelValue"])) : t.type === "listbox" ? (r(), p(_e, y({
                            key: 10,
                            "model-value": e(m)(e(n), t.name)
                          }, { ref_for: !0 }, { ...e(i), ...d(t) }, {
                            options: S(t.options, e(n)),
                            "onUpdate:modelValue": (l) => e(s)(e(n), e(c)[t.name], l)
                          }), null, 16, ["model-value", "options", "onUpdate:modelValue"])) : t.type === "number" ? (r(), p(B, y({
                            key: 11,
                            "model-value": e(m)(e(n), t.name),
                            "allow-empty": "",
                            "immediate-update": !t.lazy
                          }, { ref_for: !0 }, { ...e(i), ...d(t) }, {
                            "onUpdate:modelValue": (l) => e(s)(e(n), e(c)[t.name], l)
                          }), null, 16, ["model-value", "immediate-update", "onUpdate:modelValue"])) : t.type === "price" ? (r(), p(B, y({
                            key: 12,
                            "model-value": e(m)(e(n), t.name),
                            "allow-empty": "",
                            "use-grouping": "",
                            "text-addon": t.currency,
                            "immediate-update": !t.lazy
                          }, { ref_for: !0 }, { ...e(i), ...d(t) }, {
                            "onUpdate:modelValue": (l) => e(s)(e(n), e(c)[t.name], l)
                          }), null, 16, ["model-value", "text-addon", "immediate-update", "onUpdate:modelValue"])) : t.type === "math" ? (r(), p(Ue, y({
                            key: 13,
                            "model-value": e(m)(e(n), t.name)
                          }, { ref_for: !0 }, { ...e(i), ...d(t) }, {
                            "onUpdate:modelValue": (l) => e(s)(e(n), e(c)[t.name], l)
                          }), null, 16, ["model-value", "onUpdate:modelValue"])) : t.type === "textarea" ? (r(), p(we, y({
                            key: 14,
                            "model-value": e(m)(e(n), t.name)
                          }, { ref_for: !0 }, {
                            ...e(W)(e(i), ["onKeydown"]),
                            ...d(t)
                          }, {
                            "onUpdate:modelValue": (l) => e(s)(e(n), e(c)[t.name], l),
                            onKeydown: u[0] || (u[0] = M(L((l) => a.submitOnEnter && e(f).submitForm(), ["ctrl", "stop"]), ["enter"]))
                          }), null, 16, ["model-value", "onUpdate:modelValue"])) : t.type === "date" ? (r(), p(ke, y({
                            key: 15,
                            "model-value": e(m)(e(n), t.name)
                          }, { ref_for: !0 }, { ...e(i), ...d(t) }, {
                            "onUpdate:modelValue": (l) => e(s)(e(n), e(c)[t.name], l)
                          }), null, 16, ["model-value", "onUpdate:modelValue"])) : t.type === "autocomplete" ? (r(), p(xe, y({
                            key: 16,
                            "model-value": e(m)(e(n), t.name)
                          }, { ref_for: !0 }, { ...e(i), ...d(t) }, {
                            url: typeof t.url == "function" ? t.url({ row: e(n) }) : k(t.url),
                            "onUpdate:modelValue": (l) => e(s)(e(n), e(c)[t.name], l)
                          }), null, 16, ["model-value", "url", "onUpdate:modelValue"])) : t.type === "server_select" ? (r(), p(Ie, y({
                            key: 17,
                            "model-value": e(m)(e(n), t.name),
                            "filter-placeholder": e(x)("Search For") + ": " + e(x)(t.label),
                            url: typeof t.url == "function" ? t.url({ row: e(n) }) : k(t.url)
                          }, { ref_for: !0 }, { ...e(i), ...d(t) }, {
                            "onUpdate:modelValue": (l) => e(s)(e(n), e(c)[t.name], l)
                          }), null, 16, ["model-value", "filter-placeholder", "url", "onUpdate:modelValue"])) : t.type === "server_multi_select" ? (r(), p(Ce, y({
                            key: 18,
                            "model-value": e(m)(e(n), t.name),
                            "filter-placeholder": e(x)("Search For") + ": " + e(x)(t.label),
                            url: typeof t.url == "function" ? t.url({ row: e(n) }) : k(t.url)
                          }, { ref_for: !0 }, { ...e(i), ...d(t) }, {
                            "onUpdate:modelValue": (l) => e(s)(e(n), e(c)[t.name], l)
                          }), null, 16, ["model-value", "filter-placeholder", "url", "onUpdate:modelValue"])) : t.type === "editor" ? (r(), p(Ee, y({
                            key: 19,
                            "model-value": e(m)(e(n), t.name)
                          }, { ref_for: !0 }, {
                            ...e(W)(e(i), ["onKeydown"]),
                            ...d(t)
                          }, {
                            "onUpdate:modelValue": (l) => e(s)(e(n), e(c)[t.name], l),
                            onKeydown: u[1] || (u[1] = M(L((l) => a.submitOnEnter && e(f).submitForm(), ["ctrl", "stop"]), ["enter"]))
                          }), null, 16, ["model-value", "onUpdate:modelValue"])) : t.type === "image" ? (r(), p(Se, y({
                            key: 20,
                            "model-value": e(m)(e(J), t.name),
                            "current-url": e(m)(e(n), t.imageUrlKey ?? t.name)
                          }, { ref_for: !0 }, {
                            ...e(W)(e(i), ["onKeydown"]),
                            ...d(t)
                          }, {
                            fields: t.fields,
                            "onUpdate:modelValue": (l) => e(s)(e(J), e(c)[t.name], l),
                            "onUpdate:currentUrl": (l) => e(s)(
                              e(n),
                              t.imageUrlKey ?? e(c)[t.name],
                              l
                            ),
                            onClear: (l) => t.imageClearKey ? e(s)(e(n), t.imageClearKey, !0) : null,
                            onUnclear: (l) => t.imageClearKey ? e(pt)(e(n), t.imageClearKey) : null
                          }), null, 16, ["model-value", "current-url", "fields", "onUpdate:modelValue", "onUpdate:currentUrl", "onClear", "onUnclear"])) : t.type === "form" ? (r(), p(Ze, y({
                            key: 21,
                            "model-value": e(m)(e(n), t.name)
                          }, { ref_for: !0 }, {
                            ...e(W)(e(i), ["onKeydown"]),
                            ...d(t)
                          }, {
                            fields: t.fields,
                            "label-class": "-mt-2",
                            "onUpdate:modelValue": (l) => e(s)(e(n), e(c)[t.name], l),
                            onKeydown: u[2] || (u[2] = M(L((l) => a.submitOnEnter && e(f).submitForm(), ["ctrl", "stop"]), ["enter"]))
                          }), null, 16, ["model-value", "fields", "onUpdate:modelValue"])) : $("", !0)
                        ])
                      ]),
                      a.showFieldErrorsPopover ? (r(), F("div", {
                        key: 0,
                        class: oe(["self-start ltr:pr-2 rtl:pl-2", { "pt-7": !a.inlineFields, "pt-1": a.inlineFields }])
                      }, [
                        P(e(ae), {
                          severity: "warn",
                          text: "",
                          size: "small"
                        }, {
                          default: ee(() => [...u[5] || (u[5] = [
                            U("i", { class: "i-heroicons-exclamation-triangle-20-solid text-2xl" }, null, -1)
                          ])]),
                          _: 1
                        })
                      ], 2)) : $("", !0)
                    ])
                  ])
                ]),
                w(o.$slots, `${e(j)(t)}AfterControl`)
              ], 64)) : $("", !0)
            ], 8, ["to", "disabled"]))), 128))
          ], 2)
        ], 40, ht),
        w(o.$slots, "buttons-area", {}, () => [
          a.withFooterButtons ? (r(), F("div", kt, [
            U("div", xt, [
              w(o.$slots, "beforeFooter", { isSubmitting: e(I) }),
              P(e(ae), {
                ref_key: "submitButtonRef",
                ref: H,
                name: e(Q) + "_submit",
                size: a.size,
                loading: e(I),
                disabled: e(I) || e(A).invalid && a.defaultValidationMode === "onValueUpdate",
                label: a.submitText === !1 ? void 0 : a.submitText || e(x)("Submit"),
                icon: a.submitIcon,
                severity: a.submitSeverity,
                onKeydown: M(Ve, ["up"]),
                onClick: u[4] || (u[4] = (t) => e(f).submitForm())
              }, null, 8, ["name", "size", "loading", "disabled", "label", "icon", "severity"]),
              w(o.$slots, "afterFooter", { isSubmitting: e(I) })
            ])
          ])) : $("", !0)
        ])
      ], 512);
    };
  }
});
export {
  ao as _
};
