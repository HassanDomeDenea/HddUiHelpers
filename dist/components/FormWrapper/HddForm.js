import { defineComponent as Fe, useModel as Ue, computed as C, useTemplateRef as R, ref as H, nextTick as J, watch as Q, onMounted as we, resolveComponent as ke, openBlock as r, createElementBlock as V, createElementVNode as g, withModifiers as B, unref as t, createVNode as z, withCtx as X, Fragment as $, renderList as Y, toDisplayString as xe, createCommentVNode as S, renderSlot as F, normalizeClass as Z, createBlock as v, Teleport as Ie, toValue as U, mergeProps as y, withKeys as L, mergeModels as _ } from "vue";
import { isAxiosError as Ce } from "axios";
import { getFieldSlotName as O } from "HddUiHelpers/components/datatables/ServerDataTableUtilities.ts";
import Ee from "HddUiHelpers/components/inputs/CheckboxInput.vue";
import Se from "HddUiHelpers/components/inputs/FormObjectInput.vue";
import Be from "HddUiHelpers/components/inputs/ListBoxInput.vue";
import Le from "HddUiHelpers/components/inputs/MultiSelectInput.vue";
import Me from "HddUiHelpers/components/inputs/RadioButtonInput.vue";
import We from "HddUiHelpers/components/inputs/SelectInput.vue";
import Ae from "HddUiHelpers/components/inputs/TextInput.vue";
import { useApiClient as Te } from "HddUiHelpers/stores/apiClient";
import { cloneDeep as Ne, mapValues as Re, uniqueId as ze, maxBy as $e, map as Oe, throttle as Ke, find as Pe, reduce as qe, get as m, set as s, omit as M, unset as je } from "lodash-es";
import ee from "primevue/button";
import { useI18n as De } from "vue-i18n";
import { useHddForm as Ge } from "../../utils/useHddForm.js";
import { isAxiosValidationError as He } from "./types.js";
import { syncRef as Je } from "@vueuse/core";
import Qe from "HddUiHelpers/components/inputs/ImageInput.vue";
import Xe from "HddUiHelpers/components/inputs/InfiniteSelectInput.vue";
import Ye from "HddUiHelpers/components/inputs/TipTapEditorInput.vue";
import Ze from "HddUiHelpers/components/inputs/InfiniteMultiSelectInput.vue";
import _e from "HddUiHelpers/components/inputs/AutoCompleteInput.vue";
import et from "HddUiHelpers/components/inputs/DatePickerInput.vue";
import tt from "HddUiHelpers/components/inputs/TextAreaInput.vue";
import ot from "HddUiHelpers/components/inputs/MathInput.vue";
import te from "HddUiHelpers/components/inputs/NumberInput.vue";
import at from "HddUiHelpers/components/inputs/TreeSelectInput.vue";
import lt from "HddUiHelpers/components/inputs/PhoneInput.vue";
import nt from "HddUiHelpers/components/inputs/PasswordInput.vue";
import ut from "HddUiHelpers/components/inputs/ToggleSwitchInput.vue";
import rt from "HddUiHelpers/components/inputs/ColorPickerInput.vue";
const st = ["autocomplete"], mt = { key: 0 }, it = { class: "list-disc ps-4" }, dt = { class: "mb-2" }, ct = { class: "flex items-center gap-1" }, vt = { class: "min-w-0 flex-1" }, yt = {
  key: 0,
  class: "mt-4"
}, pt = { class: "flex items-center justify-between gap-2" }, Ht = /* @__PURE__ */ Fe({
  __name: "HddForm",
  props: /* @__PURE__ */ _({
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
  emits: /* @__PURE__ */ _(["reset", "submit"], ["update:modelValue"]),
  setup(l, { expose: oe, emit: ae }) {
    const K = Ue(l, "modelValue"), le = ae, I = Te(), { t: w } = De(), ne = C(() => ({
      fields: l.fields,
      defaultValidationMode: l.defaultValidationMode,
      staticInitialValues: l.initialValues,
      onSubmit: (o, u) => {
        if (le("submit", o, u), l.url)
          return re().then((p) => (l.onSuccess && l.onSuccess(p), p)).catch((p) => {
            console.error(p), l.onFailure && l.onFailure(p);
          });
      }
    })), ue = R("containerRef"), P = R("fieldsContainerRef"), q = R("submitButtonRef"), b = Ge(ne.value), k = H(!1);
    async function re() {
      return new Promise((o, u) => {
        if (!l.url) return u("No url provided");
        k.value = !0, b.clearErrors();
        let p = b.currentValues.value;
        const e = b.currentFiles.value, n = Object.values(e).filter((h) => h).length > 0;
        l.submitPayloadTransformer && (p = l.submitPayloadTransformer(Ne(p), b));
        let x;
        if (n)
          x = I.upload(l.url, e, p);
        else if (typeof l.url == "object")
          x = I.request(l.url, p, !1);
        else
          switch (l.urlMethod) {
            case "post":
              x = I.post(l.url, p);
              break;
            case "put":
              x = I.put(l.url, p);
              break;
            case "get":
              x = I.get(l.url, { params: p });
              break;
            case "delete":
              x = I.delete(l.url, { params: p });
              break;
          }
        x.then((h) => {
          o(h.data);
        }).catch(async (h) => {
          He(h) ? b.setMultiFieldsErrors(
            Re(h.response.data.errors, (Ve) => Ve.map((ge) => ({ message: ge })))
          ) : Ce(h) ? b.addGlobalError(w(h.response?.data.message ?? h.message ?? "Error Occurred")) : b.addGlobalError(w("Error Occurred")), await J(), (!document.activeElement || document.activeElement.getAttribute("aria-invalid") !== "true") && ve() === !1 && N(), u(h);
        }).finally(() => {
          k.value = !1;
        });
      });
    }
    const { requiredFieldsNames: se, formState: W, fields: A } = b, a = b.currentValues, j = b.currentFiles, me = b.fieldsStates, ie = C(() => l.fixedLabelWidth && l.fixedLabelWidth > 0 ? `width: ${l.fixedLabelWidth}px` : ""), f = H({}), D = C(() => l.formName || ze("hdd-form-")), de = C(() => typeof l.unifyLabelsWidth == "number" ? l.unifyLabelsWidth : l.unifyLabelsWidth === !0 ? $e(Oe(f.value, (o) => o?.baseInputRef?.labelWidth ?? o?.labelWidth)) : null), i = C(() => ({
      labelStyle: ie.value,
      inline: l.inlineFields,
      formName: D.value,
      labelMinWidth: de,
      labelSingleLine: l.unifyLabelsWidth === !0 && l.inlineFields,
      iconAsAddon: l.iconAsAddon,
      size: l.size,
      floatingLabel: l.floatingLabel,
      floatingLabelVariant: l.floatingLabelVariant,
      infieldTopAlignedLabel: l.infieldTopAlignedLabel,
      onKeydown: (o) => o.key === "Enter" && l.submitOnEnter && b.submitForm()
    }));
    function d(o) {
      return {
        label: o.label,
        ref: (u) => f.value[o.name] = u,
        required: se.value[o.name],
        showRequiredAsterisk: l.showRequiredAsterisk,
        helperText: o.notes,
        name: o.name,
        autocomplete: o.autocomplete,
        disabled: typeof o.disabled == "function" ? o.disabled(a.value) : o.disabled,
        readonly: typeof o.readonly == "function" ? o.readonly(a.value) : o.readonly,
        icon: o.icon,
        placeholder: o.placeholder,
        size: o.size ?? l.size,
        error: me.value[o.name].error?.message,
        showErrorMessage: l.showFieldErrorBelowIt,
        ...o.labelWidth || o.labelWidth === 0 ? {
          labelMinWidth: o.labelWidth || "unset"
        } : {},
        ...["text", "password"].includes(o.type ?? "text") ? {
          onFocusNext: () => pe(o),
          onFocusPrevious: () => ye(o)
        } : [],
        ...o.addonCallback ? {
          textAddon: (u) => o.addonCallback({ value: u, row: U(a) })
        } : {},
        ...o.onValueUpdate ? {
          "onUpdate:modelValue": (u) => {
            ce(o, u);
          }
        } : {},
        ...o.binds ? typeof o.binds == "function" ? o.binds({
          isEditing: l.isEditing,
          row: U(a)
        }) : o.binds : {},
        ...o.teleport && !o.labelWidth ? {
          labelMinWidth: "unset"
        } : {}
      };
    }
    function ce(o, u) {
      o.onValueUpdate?.({
        value: u,
        row: U(a),
        setValue: b.setValue,
        fieldRef: f.value[o.name]
      });
    }
    const T = Ke(() => {
    }, 50);
    Q(
      () => l.unifyLabelsWidth,
      () => {
        T();
      },
      {
        immediate: !0,
        flush: "post"
      }
    ), Q(
      () => b.fields.value.map((o) => !o.hidden).length,
      () => {
        l.unifyLabelsWidth === !0 && T();
      },
      {
        immediate: !1,
        flush: "post"
      }
    ), we(() => {
      l.autoFocusFirstOnMount && N(), T();
    });
    function ve() {
      const o = Pe(f.value, (u) => u?.hasError);
      return o ? (o.focus(), null) : !1;
    }
    function N() {
      J(() => {
        let o = A.value[0]?.name;
        o ? G(o) : Object.values(f.value).filter((u) => !u?.disabled)[0]?.focus();
      });
    }
    function ye(o) {
      const u = Object.entries(f.value).filter((e) => !e[1]?.disabled), p = u.findIndex((e) => e[0] === o.name);
      u[p - 1]?.[1].focus?.();
    }
    function pe(o) {
      const u = Object.entries(f.value).filter((e) => !e[1]?.disabled), p = u.findIndex((e) => e[0] === o.name);
      p + 1 === u.length ? fe() : u[p + 1]?.[1].focus?.();
    }
    function be() {
      const o = Object.values(f.value).filter((u) => !u?.disabled);
      o[o.length - 1]?.focus?.();
    }
    function fe() {
      q.value?.$el.focus();
    }
    function he(o, u) {
      f.value[u] = o;
    }
    function G(o) {
      f.value[o]?.focus();
    }
    oe({ form: b, currentValues: a, fieldRefs: f, isSubmitting: k, focusFirst: N, focusField: G });
    const c = C(() => qe(
      A.value,
      (o, u) => (o[u.name] = u.name.split("."), o),
      {}
    ));
    function E(o, u) {
      return typeof o == "function" ? o(u) : U(o) ?? [];
    }
    return K.value && Je(K, b.currentValues), (o, u) => {
      const p = ke("Message");
      return r(), V("div", {
        ref_key: "containerRef",
        ref: ue,
        class: ""
      }, [
        g("form", {
          autocomplete: l.autoComplete,
          onSubmit: u[3] || (u[3] = B(() => {
          }, ["prevent"]))
        }, [
          l.summarizeErrorsAtTop && t(W).invalid ? (r(), V("div", mt, [
            z(p, {
              size: l.size,
              severity: "error",
              class: "mb-2 mt-1 text-right",
              icon: "i-heroicons-exclamation-triangle-20-solid !size-8 !text-4xl"
            }, {
              default: X(() => [
                g("ul", it, [
                  (r(!0), V($, null, Y(t(W).errors, (e) => (r(), V("li", { key: e }, xe(e.message), 1))), 128))
                ])
              ]),
              _: 1
            }, 8, ["size"])
          ])) : S("", !0),
          F(o.$slots, "beforeControls"),
          g("div", {
            ref_key: "fieldsContainerRef",
            ref: P,
            class: Z(l.fieldsContainerClass)
          }, [
            (r(!0), V($, null, Y(t(A), (e) => (r(), v(Ie, {
              key: e.name,
              to: e.teleport ?? P.value,
              defer: "",
              disabled: !e.teleport
            }, [
              !e.hidden && (typeof e.showable == "function" ? e.showable({ row: t(a), isEditing: l.isEditing === !0 }) : !U(e.showable)) && !(l.isEditing && e.editable === !1) ? (r(), V($, { key: 0 }, [
                F(o.$slots, `${t(O)(e)}BeforeControl`),
                F(o.$slots, `${t(O)(e)}ControlBody`, {}, () => [
                  g("div", dt, [
                    g("div", ct, [
                      g("div", vt, [
                        F(o.$slots, "fieldInput", {
                          field: e,
                          currentValues: t(a),
                          setRef: he,
                          binds: { ...i.value, ...d(e) }
                        }, () => [
                          !e.type || e.type === "text" ? (r(), v(Ae, y({
                            key: 0,
                            "model-value": t(m)(t(a), e.name)
                          }, { ref_for: !0 }, { ...i.value, ...d(e) }, {
                            "onUpdate:modelValue": (n) => t(s)(t(a), c.value[e.name], n)
                          }), null, 16, ["model-value", "onUpdate:modelValue"])) : e.type === "color" ? (r(), v(rt, y({
                            key: 1,
                            "model-value": t(m)(t(a), e.name)
                          }, { ref_for: !0 }, { ...i.value, ...d(e) }, {
                            "onUpdate:modelValue": (n) => t(s)(t(a), c.value[e.name], n)
                          }), null, 16, ["model-value", "onUpdate:modelValue"])) : e.type === "checkbox" ? (r(), v(Ee, y({
                            key: 2,
                            "model-value": t(m)(t(a), e.name)
                          }, { ref_for: !0 }, { ...i.value, ...d(e) }, {
                            "onUpdate:modelValue": (n) => t(s)(t(a), c.value[e.name], n)
                          }), null, 16, ["model-value", "onUpdate:modelValue"])) : e.type === "radio" ? (r(), v(Me, y({
                            key: 3,
                            "model-value": t(m)(t(a), e.name)
                          }, { ref_for: !0 }, { ...i.value, ...d(e) }, {
                            options: E(e.options, t(a)),
                            "onUpdate:modelValue": (n) => t(s)(t(a), c.value[e.name], n)
                          }), null, 16, ["model-value", "options", "onUpdate:modelValue"])) : e.type === "switch" ? (r(), v(ut, y({
                            key: 4,
                            "model-value": t(m)(t(a), e.name)
                          }, { ref_for: !0 }, { ...i.value, ...d(e) }, {
                            "onUpdate:modelValue": (n) => t(s)(t(a), c.value[e.name], n)
                          }), null, 16, ["model-value", "onUpdate:modelValue"])) : e.type === "password" ? (r(), v(nt, y({
                            key: 5,
                            "model-value": t(m)(t(a), e.name)
                          }, { ref_for: !0 }, { ...i.value, ...d(e) }, {
                            "onUpdate:modelValue": (n) => t(s)(t(a), c.value[e.name], n)
                          }), null, 16, ["model-value", "onUpdate:modelValue"])) : e.type === "phone" ? (r(), v(lt, y({
                            key: 6,
                            "model-value": t(m)(t(a), e.name),
                            "country-code": e.countyCodeFieldName ? t(m)(t(a), e.countyCodeFieldName) : void 0,
                            "with-country-code": !!e.countyCodeFieldName
                          }, { ref_for: !0 }, { ...i.value, ...d(e) }, {
                            "onUpdate:countryCode": (n) => t(s)(t(a), e.countyCodeFieldName, n),
                            "onUpdate:modelValue": (n) => t(s)(t(a), c.value[e.name], n)
                          }), null, 16, ["model-value", "country-code", "with-country-code", "onUpdate:countryCode", "onUpdate:modelValue"])) : e.type === "select" ? (r(), v(We, y({
                            key: 7,
                            "model-value": t(m)(t(a), e.name)
                          }, { ref_for: !0 }, { ...i.value, ...d(e) }, {
                            options: E(e.options, t(a)),
                            "onUpdate:modelValue": (n) => t(s)(t(a), c.value[e.name], n)
                          }), null, 16, ["model-value", "options", "onUpdate:modelValue"])) : e.type === "tree_select" ? (r(), v(at, y({
                            key: 8,
                            "model-value": t(m)(t(a), e.name)
                          }, { ref_for: !0 }, { ...i.value, ...d(e) }, {
                            options: E(e.options, t(a)),
                            "onUpdate:modelValue": (n) => t(s)(t(a), c.value[e.name], n)
                          }), null, 16, ["model-value", "options", "onUpdate:modelValue"])) : e.type === "multiselect" ? (r(), v(Le, y({
                            key: 9,
                            "model-value": t(m)(t(a), e.name)
                          }, { ref_for: !0 }, { ...i.value, ...d(e) }, {
                            options: E(e.options, t(a)),
                            "onUpdate:modelValue": (n) => t(s)(t(a), c.value[e.name], n)
                          }), null, 16, ["model-value", "options", "onUpdate:modelValue"])) : e.type === "listbox" ? (r(), v(Be, y({
                            key: 10,
                            "model-value": t(m)(t(a), e.name)
                          }, { ref_for: !0 }, { ...i.value, ...d(e) }, {
                            options: E(e.options, t(a)),
                            "onUpdate:modelValue": (n) => t(s)(t(a), c.value[e.name], n)
                          }), null, 16, ["model-value", "options", "onUpdate:modelValue"])) : e.type === "number" ? (r(), v(te, y({
                            key: 11,
                            "model-value": t(m)(t(a), e.name),
                            "allow-empty": "",
                            "immediate-update": !e.lazy
                          }, { ref_for: !0 }, { ...i.value, ...d(e) }, {
                            "onUpdate:modelValue": (n) => t(s)(t(a), c.value[e.name], n)
                          }), null, 16, ["model-value", "immediate-update", "onUpdate:modelValue"])) : e.type === "price" ? (r(), v(te, y({
                            key: 12,
                            "model-value": t(m)(t(a), e.name),
                            "allow-empty": "",
                            "use-grouping": "",
                            "text-addon": e.currency,
                            "immediate-update": !e.lazy
                          }, { ref_for: !0 }, { ...i.value, ...d(e) }, {
                            "onUpdate:modelValue": (n) => t(s)(t(a), c.value[e.name], n)
                          }), null, 16, ["model-value", "text-addon", "immediate-update", "onUpdate:modelValue"])) : e.type === "math" ? (r(), v(ot, y({
                            key: 13,
                            "model-value": t(m)(t(a), e.name)
                          }, { ref_for: !0 }, { ...i.value, ...d(e) }, {
                            "onUpdate:modelValue": (n) => t(s)(t(a), c.value[e.name], n)
                          }), null, 16, ["model-value", "onUpdate:modelValue"])) : e.type === "textarea" ? (r(), v(tt, y({
                            key: 14,
                            "model-value": t(m)(t(a), e.name)
                          }, { ref_for: !0 }, {
                            ...t(M)(i.value, ["onKeydown"]),
                            ...d(e)
                          }, {
                            "onUpdate:modelValue": (n) => t(s)(t(a), c.value[e.name], n),
                            onKeydown: u[0] || (u[0] = L(B((n) => l.submitOnEnter && t(b).submitForm(), ["ctrl", "stop"]), ["enter"]))
                          }), null, 16, ["model-value", "onUpdate:modelValue"])) : e.type === "date" ? (r(), v(et, y({
                            key: 15,
                            "model-value": t(m)(t(a), e.name)
                          }, { ref_for: !0 }, { ...i.value, ...d(e) }, {
                            "onUpdate:modelValue": (n) => t(s)(t(a), c.value[e.name], n)
                          }), null, 16, ["model-value", "onUpdate:modelValue"])) : e.type === "autocomplete" ? (r(), v(_e, y({
                            key: 16,
                            "model-value": t(m)(t(a), e.name)
                          }, { ref_for: !0 }, { ...i.value, ...d(e) }, {
                            url: typeof e.url == "function" ? e.url({ row: t(a) }) : U(e.url),
                            "onUpdate:modelValue": (n) => t(s)(t(a), c.value[e.name], n)
                          }), null, 16, ["model-value", "url", "onUpdate:modelValue"])) : e.type === "server_select" ? (r(), v(Xe, y({
                            key: 17,
                            "model-value": t(m)(t(a), e.name),
                            "filter-placeholder": t(w)("Search For") + ": " + t(w)(e.label),
                            url: typeof e.url == "function" ? e.url({ row: t(a) }) : U(e.url)
                          }, { ref_for: !0 }, { ...i.value, ...d(e) }, {
                            "onUpdate:modelValue": (n) => t(s)(t(a), c.value[e.name], n)
                          }), null, 16, ["model-value", "filter-placeholder", "url", "onUpdate:modelValue"])) : e.type === "server_multi_select" ? (r(), v(Ze, y({
                            key: 18,
                            "model-value": t(m)(t(a), e.name),
                            "filter-placeholder": t(w)("Search For") + ": " + t(w)(e.label),
                            url: typeof e.url == "function" ? e.url({ row: t(a) }) : U(e.url)
                          }, { ref_for: !0 }, { ...i.value, ...d(e) }, {
                            "onUpdate:modelValue": (n) => t(s)(t(a), c.value[e.name], n)
                          }), null, 16, ["model-value", "filter-placeholder", "url", "onUpdate:modelValue"])) : e.type === "editor" ? (r(), v(Ye, y({
                            key: 19,
                            "model-value": t(m)(t(a), e.name)
                          }, { ref_for: !0 }, {
                            ...t(M)(i.value, ["onKeydown"]),
                            ...d(e)
                          }, {
                            "onUpdate:modelValue": (n) => t(s)(t(a), c.value[e.name], n),
                            onKeydown: u[1] || (u[1] = L(B((n) => l.submitOnEnter && t(b).submitForm(), ["ctrl", "stop"]), ["enter"]))
                          }), null, 16, ["model-value", "onUpdate:modelValue"])) : e.type === "image" ? (r(), v(Qe, y({
                            key: 20,
                            "model-value": t(m)(t(j), e.name),
                            "current-url": t(m)(t(a), e.imageUrlKey ?? e.name)
                          }, { ref_for: !0 }, {
                            ...t(M)(i.value, ["onKeydown"]),
                            ...d(e)
                          }, {
                            fields: e.fields,
                            "onUpdate:modelValue": (n) => t(s)(t(j), c.value[e.name], n),
                            "onUpdate:currentUrl": (n) => t(s)(
                              t(a),
                              e.imageUrlKey ?? c.value[e.name],
                              n
                            ),
                            onClear: (n) => e.imageClearKey ? t(s)(t(a), e.imageClearKey, !0) : null,
                            onUnclear: (n) => e.imageClearKey ? t(je)(t(a), e.imageClearKey) : null
                          }), null, 16, ["model-value", "current-url", "fields", "onUpdate:modelValue", "onUpdate:currentUrl", "onClear", "onUnclear"])) : e.type === "form" ? (r(), v(Se, y({
                            key: 21,
                            "model-value": t(m)(t(a), e.name)
                          }, { ref_for: !0 }, {
                            ...t(M)(i.value, ["onKeydown"]),
                            ...d(e)
                          }, {
                            fields: e.fields,
                            "label-class": "-mt-2",
                            "onUpdate:modelValue": (n) => t(s)(t(a), c.value[e.name], n),
                            onKeydown: u[2] || (u[2] = L(B((n) => l.submitOnEnter && t(b).submitForm(), ["ctrl", "stop"]), ["enter"]))
                          }), null, 16, ["model-value", "fields", "onUpdate:modelValue"])) : S("", !0)
                        ])
                      ]),
                      l.showFieldErrorsPopover ? (r(), V("div", {
                        key: 0,
                        class: Z(["self-start ltr:pr-2 rtl:pl-2", { "pt-7": !l.inlineFields, "pt-1": l.inlineFields }])
                      }, [
                        z(t(ee), {
                          severity: "warn",
                          text: "",
                          size: "small"
                        }, {
                          default: X(() => [...u[5] || (u[5] = [
                            g("i", { class: "i-heroicons-exclamation-triangle-20-solid text-2xl" }, null, -1)
                          ])]),
                          _: 1
                        })
                      ], 2)) : S("", !0)
                    ])
                  ])
                ]),
                F(o.$slots, `${t(O)(e)}AfterControl`)
              ], 64)) : S("", !0)
            ], 8, ["to", "disabled"]))), 128))
          ], 2)
        ], 40, st),
        F(o.$slots, "buttons-area", {}, () => [
          l.withFooterButtons ? (r(), V("div", yt, [
            g("div", pt, [
              F(o.$slots, "beforeFooter", { isSubmitting: k.value }),
              z(t(ee), {
                ref_key: "submitButtonRef",
                ref: q,
                name: D.value + "_submit",
                size: l.size,
                loading: k.value,
                disabled: k.value || t(W).invalid && l.defaultValidationMode === "onValueUpdate",
                label: l.submitText === !1 ? void 0 : l.submitText || t(w)("Submit"),
                icon: l.submitIcon,
                severity: l.submitSeverity,
                onKeydown: L(be, ["up"]),
                onClick: u[4] || (u[4] = (e) => t(b).submitForm())
              }, null, 8, ["name", "size", "loading", "disabled", "label", "icon", "severity"]),
              F(o.$slots, "afterFooter", { isSubmitting: k.value })
            ])
          ])) : S("", !0)
        ])
      ], 512);
    };
  }
});
export {
  Ht as default
};
