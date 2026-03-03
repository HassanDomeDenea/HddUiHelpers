import { defineComponent as xe, useModel as Ce, resolveComponent as f, openBlock as r, createElementBlock as U, createElementVNode as I, withModifiers as L, unref as e, createVNode as O, withCtx as X, Fragment as K, renderList as Y, toDisplayString as Se, createCommentVNode as B, renderSlot as w, normalizeClass as Z, createBlock as p, Teleport as Ee, toValue as k, mergeProps as y, withKeys as M, mergeModels as _ } from "vue";
import { isAxiosError as Be } from "axios";
import { getFieldSlotName as q } from "HddUiHelpers/components/datatables/ServerDataTableUtilities.ts";
import Te from "HddUiHelpers/components/inputs/CheckboxInput.vue";
import Le from "HddUiHelpers/components/inputs/FormObjectInput.vue";
import Me from "HddUiHelpers/components/inputs/ListBoxInput.vue";
import Ae from "HddUiHelpers/components/inputs/MultiSelectInput.vue";
import We from "HddUiHelpers/components/inputs/RadioButtonInput.vue";
import Re from "HddUiHelpers/components/inputs/SelectInput.vue";
import Ne from "HddUiHelpers/components/inputs/TextInput.vue";
import { useApiClient as ze } from "HddUiHelpers/stores/apiClient";
import { cloneDeep as Pe, mapValues as $e, uniqueId as Oe, maxBy as Ke, map as qe, throttle as je, find as De, reduce as Ge, get as m, set as s, omit as A, unset as He } from "lodash-es";
import ee from "primevue/button";
import { useHddForm as Je } from "../../utils/useHddForm.js";
import { isAxiosValidationError as Qe } from "./types.js";
const Xe = ["autocomplete"], Ye = { key: 0 }, Ze = { class: "list-disc ps-4" }, _e = { class: "mb-2" }, et = { class: "flex items-center gap-1" }, tt = { class: "min-w-0 flex-1" }, ot = {
  key: 0,
  class: "mt-4"
}, nt = { class: "flex items-center justify-between gap-2" }, Vt = /* @__PURE__ */ xe({
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
  setup(a, { expose: te, emit: oe }) {
    const j = Ce(a, "modelValue"), ne = oe, S = ze(), { t: x } = useI18n(), ae = computed(() => ({
      fields: a.fields,
      defaultValidationMode: a.defaultValidationMode,
      staticInitialValues: a.initialValues,
      onSubmit: (o, u) => {
        if (ne("submit", o, u), a.url)
          return ue().then((b) => (a.onSuccess && a.onSuccess(b), b)).catch((b) => {
            console.error(b), a.onFailure && a.onFailure(b);
          });
      }
    })), le = useTemplateRef("containerRef"), D = useTemplateRef("fieldsContainerRef"), G = useTemplateRef("submitButtonRef"), v = Je(ae.value), C = ref(!1);
    async function ue() {
      return new Promise((o, u) => {
        if (!a.url) return u("No url provided");
        C.value = !0, v.clearErrors();
        let b = v.currentValues.value;
        const h = v.currentFiles.value, P = Object.values(h).filter((V) => V).length > 0;
        a.submitPayloadTransformer && (b = a.submitPayloadTransformer(Pe(b), v));
        let F;
        if (P)
          F = S.upload(a.url, h, b);
        else if (typeof a.url == "object")
          F = S.request(a.url, b, !1);
        else
          switch (a.urlMethod) {
            case "post":
              F = S.post(a.url, b);
              break;
            case "put":
              F = S.put(a.url, b);
              break;
            case "get":
              F = S.get(a.url, { params: b });
              break;
            case "delete":
              F = S.delete(a.url, { params: b });
              break;
          }
        F.then((V) => {
          o(V.data);
        }).catch(async (V) => {
          Qe(V) ? v.setMultiFieldsErrors(
            $e(V.response.data.errors, ($) => $.map((T) => ({ message: T })))
          ) : Be(V) ? v.addGlobalError(x(V.response?.data.message ?? V.message ?? "Error Occurred")) : v.addGlobalError(x("Error Occurred")), await nextTick(), (!document.activeElement || document.activeElement.getAttribute("aria-invalid") !== "true") && ce() === !1 && z(), u(V);
        }).finally(() => {
          C.value = !1;
        });
      });
    }
    const { requiredFieldsNames: re, formState: W, fields: R } = v, n = v.currentValues, H = v.currentFiles, se = v.fieldsStates, me = computed(() => a.fixedLabelWidth && a.fixedLabelWidth > 0 ? `width: ${a.fixedLabelWidth}px` : ""), g = ref({}), J = computed(() => a.formName || Oe("hdd-form-")), ie = computed(() => typeof a.unifyLabelsWidth == "number" ? a.unifyLabelsWidth : a.unifyLabelsWidth === !0 ? Ke(qe(g.value, (o) => o?.baseInputRef?.labelWidth ?? o?.labelWidth)) : null), i = computed(() => ({
      labelStyle: me.value,
      inline: a.inlineFields,
      formName: J.value,
      labelMinWidth: ie,
      labelSingleLine: a.unifyLabelsWidth === !0 && a.inlineFields,
      iconAsAddon: a.iconAsAddon,
      size: a.size,
      floatingLabel: a.floatingLabel,
      floatingLabelVariant: a.floatingLabelVariant,
      infieldTopAlignedLabel: a.infieldTopAlignedLabel,
      onKeydown: (o) => o.key === "Enter" && a.submitOnEnter && v.submitForm()
    }));
    function d(o) {
      return {
        label: o.label,
        ref: (u) => g.value[o.name] = u,
        required: re.value[o.name],
        showRequiredAsterisk: a.showRequiredAsterisk,
        helperText: o.notes,
        name: o.name,
        autocomplete: o.autocomplete,
        disabled: typeof o.disabled == "function" ? o.disabled(n.value) : o.disabled,
        readonly: typeof o.readonly == "function" ? o.readonly(n.value) : o.readonly,
        icon: o.icon,
        placeholder: o.placeholder,
        size: o.size ?? a.size,
        error: se.value[o.name].error?.message,
        showErrorMessage: a.showFieldErrorBelowIt,
        ...o.labelWidth || o.labelWidth === 0 ? {
          labelMinWidth: o.labelWidth || "unset"
        } : {},
        ...["text", "password"].includes(o.type ?? "text") ? {
          onFocusNext: () => ye(o),
          onFocusPrevious: () => pe(o)
        } : [],
        ...o.addonCallback ? {
          textAddon: (u) => o.addonCallback({ value: u, row: k(n) })
        } : {},
        ...o.onValueUpdate ? {
          "onUpdate:modelValue": (u) => {
            de(o, u);
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
    function de(o, u) {
      o.onValueUpdate?.({
        value: u,
        row: k(n),
        setValue: v.setValue,
        fieldRef: g.value[o.name]
      });
    }
    const N = je(() => {
    }, 50);
    watch(
      () => a.unifyLabelsWidth,
      () => {
        N();
      },
      {
        immediate: !0,
        flush: "post"
      }
    ), watch(
      () => v.fields.value.map((o) => !o.hidden).length,
      () => {
        a.unifyLabelsWidth === !0 && N();
      },
      {
        immediate: !1,
        flush: "post"
      }
    ), onMounted(() => {
      a.autoFocusFirstOnMount && z(), N();
    });
    function ce() {
      const o = De(g.value, (u) => u?.hasError);
      return o ? (o.focus(), null) : !1;
    }
    function z() {
      nextTick(() => {
        let o = R.value[0]?.name;
        o ? Q(o) : Object.values(g.value).filter((u) => !u?.disabled)[0]?.focus();
      });
    }
    function pe(o) {
      const u = Object.entries(g.value).filter((h) => !h[1]?.disabled), b = u.findIndex((h) => h[0] === o.name);
      u[b - 1]?.[1].focus?.();
    }
    function ye(o) {
      const u = Object.entries(g.value).filter((h) => !h[1]?.disabled), b = u.findIndex((h) => h[0] === o.name);
      b + 1 === u.length ? ve() : u[b + 1]?.[1].focus?.();
    }
    function be() {
      const o = Object.values(g.value).filter((u) => !u?.disabled);
      o[o.length - 1]?.focus?.();
    }
    function ve() {
      G.value?.$el.focus();
    }
    function fe(o, u) {
      g.value[u] = o;
    }
    function Q(o) {
      g.value[o]?.focus();
    }
    te({ form: v, currentValues: n, fieldRefs: g, isSubmitting: C, focusFirst: z, focusField: Q });
    const c = computed(() => Ge(
      R.value,
      (o, u) => (o[u.name] = u.name.split("."), o),
      {}
    ));
    function E(o, u) {
      return typeof o == "function" ? o(u) : k(o) ?? [];
    }
    return j.value && syncRef(j, v.currentValues), (o, u) => {
      const b = f("Message"), h = f("ColorPickerInput"), P = f("ToggleSwitchInput"), F = f("PasswordInput"), V = f("PhoneInput"), $ = f("TreeSelectInput"), T = f("NumberInput"), he = f("MathInput"), Ve = f("TextAreaInput"), ge = f("DatePickerInput"), Fe = f("AutoCompleteInput"), Ue = f("InfiniteSelectInput"), Ie = f("InfiniteMultiSelectInput"), we = f("TipTapEditorInput"), ke = f("ImageInput");
      return r(), U("div", {
        ref_key: "containerRef",
        ref: le,
        class: ""
      }, [
        I("form", {
          autocomplete: a.autoComplete,
          onSubmit: u[3] || (u[3] = L(() => {
          }, ["prevent"]))
        }, [
          a.summarizeErrorsAtTop && e(W).invalid ? (r(), U("div", Ye, [
            O(b, {
              size: a.size,
              severity: "error",
              class: "mb-2 mt-1 text-right",
              icon: "i-heroicons-exclamation-triangle-20-solid !size-8 !text-4xl"
            }, {
              default: X(() => [
                I("ul", Ze, [
                  (r(!0), U(K, null, Y(e(W).errors, (t) => (r(), U("li", { key: t }, Se(t.message), 1))), 128))
                ])
              ]),
              _: 1
            }, 8, ["size"])
          ])) : B("", !0),
          w(o.$slots, "beforeControls"),
          I("div", {
            ref_key: "fieldsContainerRef",
            ref: D,
            class: Z(a.fieldsContainerClass)
          }, [
            (r(!0), U(K, null, Y(e(R), (t) => (r(), p(Ee, {
              key: t.name,
              to: t.teleport ?? e(D),
              defer: "",
              disabled: !t.teleport
            }, [
              !t.hidden && (typeof t.showable == "function" ? t.showable({ row: e(n), isEditing: a.isEditing === !0 }) : !k(t.showable)) && !(a.isEditing && t.editable === !1) ? (r(), U(K, { key: 0 }, [
                w(o.$slots, `${e(q)(t)}BeforeControl`),
                w(o.$slots, `${e(q)(t)}ControlBody`, {}, () => [
                  I("div", _e, [
                    I("div", et, [
                      I("div", tt, [
                        w(o.$slots, "fieldInput", {
                          field: t,
                          currentValues: e(n),
                          setRef: fe,
                          binds: { ...e(i), ...d(t) }
                        }, () => [
                          !t.type || t.type === "text" ? (r(), p(Ne, y({
                            key: 0,
                            "model-value": e(m)(e(n), t.name)
                          }, { ref_for: !0 }, { ...e(i), ...d(t) }, {
                            "onUpdate:modelValue": (l) => e(s)(e(n), e(c)[t.name], l)
                          }), null, 16, ["model-value", "onUpdate:modelValue"])) : t.type === "color" ? (r(), p(h, y({
                            key: 1,
                            "model-value": e(m)(e(n), t.name)
                          }, { ref_for: !0 }, { ...e(i), ...d(t) }, {
                            "onUpdate:modelValue": (l) => e(s)(e(n), e(c)[t.name], l)
                          }), null, 16, ["model-value", "onUpdate:modelValue"])) : t.type === "checkbox" ? (r(), p(Te, y({
                            key: 2,
                            "model-value": e(m)(e(n), t.name)
                          }, { ref_for: !0 }, { ...e(i), ...d(t) }, {
                            "onUpdate:modelValue": (l) => e(s)(e(n), e(c)[t.name], l)
                          }), null, 16, ["model-value", "onUpdate:modelValue"])) : t.type === "radio" ? (r(), p(We, y({
                            key: 3,
                            "model-value": e(m)(e(n), t.name)
                          }, { ref_for: !0 }, { ...e(i), ...d(t) }, {
                            options: E(t.options, e(n)),
                            "onUpdate:modelValue": (l) => e(s)(e(n), e(c)[t.name], l)
                          }), null, 16, ["model-value", "options", "onUpdate:modelValue"])) : t.type === "switch" ? (r(), p(P, y({
                            key: 4,
                            "model-value": e(m)(e(n), t.name)
                          }, { ref_for: !0 }, { ...e(i), ...d(t) }, {
                            "onUpdate:modelValue": (l) => e(s)(e(n), e(c)[t.name], l)
                          }), null, 16, ["model-value", "onUpdate:modelValue"])) : t.type === "password" ? (r(), p(F, y({
                            key: 5,
                            "model-value": e(m)(e(n), t.name)
                          }, { ref_for: !0 }, { ...e(i), ...d(t) }, {
                            "onUpdate:modelValue": (l) => e(s)(e(n), e(c)[t.name], l)
                          }), null, 16, ["model-value", "onUpdate:modelValue"])) : t.type === "phone" ? (r(), p(V, y({
                            key: 6,
                            "model-value": e(m)(e(n), t.name),
                            "country-code": t.countyCodeFieldName ? e(m)(e(n), t.countyCodeFieldName) : void 0,
                            "with-country-code": !!t.countyCodeFieldName
                          }, { ref_for: !0 }, { ...e(i), ...d(t) }, {
                            "onUpdate:countryCode": (l) => e(s)(e(n), t.countyCodeFieldName, l),
                            "onUpdate:modelValue": (l) => e(s)(e(n), e(c)[t.name], l)
                          }), null, 16, ["model-value", "country-code", "with-country-code", "onUpdate:countryCode", "onUpdate:modelValue"])) : t.type === "select" ? (r(), p(Re, y({
                            key: 7,
                            "model-value": e(m)(e(n), t.name)
                          }, { ref_for: !0 }, { ...e(i), ...d(t) }, {
                            options: E(t.options, e(n)),
                            "onUpdate:modelValue": (l) => e(s)(e(n), e(c)[t.name], l)
                          }), null, 16, ["model-value", "options", "onUpdate:modelValue"])) : t.type === "tree_select" ? (r(), p($, y({
                            key: 8,
                            "model-value": e(m)(e(n), t.name)
                          }, { ref_for: !0 }, { ...e(i), ...d(t) }, {
                            options: E(t.options, e(n)),
                            "onUpdate:modelValue": (l) => e(s)(e(n), e(c)[t.name], l)
                          }), null, 16, ["model-value", "options", "onUpdate:modelValue"])) : t.type === "multiselect" ? (r(), p(Ae, y({
                            key: 9,
                            "model-value": e(m)(e(n), t.name)
                          }, { ref_for: !0 }, { ...e(i), ...d(t) }, {
                            options: E(t.options, e(n)),
                            "onUpdate:modelValue": (l) => e(s)(e(n), e(c)[t.name], l)
                          }), null, 16, ["model-value", "options", "onUpdate:modelValue"])) : t.type === "listbox" ? (r(), p(Me, y({
                            key: 10,
                            "model-value": e(m)(e(n), t.name)
                          }, { ref_for: !0 }, { ...e(i), ...d(t) }, {
                            options: E(t.options, e(n)),
                            "onUpdate:modelValue": (l) => e(s)(e(n), e(c)[t.name], l)
                          }), null, 16, ["model-value", "options", "onUpdate:modelValue"])) : t.type === "number" ? (r(), p(T, y({
                            key: 11,
                            "model-value": e(m)(e(n), t.name),
                            "allow-empty": "",
                            "immediate-update": !t.lazy
                          }, { ref_for: !0 }, { ...e(i), ...d(t) }, {
                            "onUpdate:modelValue": (l) => e(s)(e(n), e(c)[t.name], l)
                          }), null, 16, ["model-value", "immediate-update", "onUpdate:modelValue"])) : t.type === "price" ? (r(), p(T, y({
                            key: 12,
                            "model-value": e(m)(e(n), t.name),
                            "allow-empty": "",
                            "use-grouping": "",
                            "text-addon": t.currency,
                            "immediate-update": !t.lazy
                          }, { ref_for: !0 }, { ...e(i), ...d(t) }, {
                            "onUpdate:modelValue": (l) => e(s)(e(n), e(c)[t.name], l)
                          }), null, 16, ["model-value", "text-addon", "immediate-update", "onUpdate:modelValue"])) : t.type === "math" ? (r(), p(he, y({
                            key: 13,
                            "model-value": e(m)(e(n), t.name)
                          }, { ref_for: !0 }, { ...e(i), ...d(t) }, {
                            "onUpdate:modelValue": (l) => e(s)(e(n), e(c)[t.name], l)
                          }), null, 16, ["model-value", "onUpdate:modelValue"])) : t.type === "textarea" ? (r(), p(Ve, y({
                            key: 14,
                            "model-value": e(m)(e(n), t.name)
                          }, { ref_for: !0 }, {
                            ...e(A)(e(i), ["onKeydown"]),
                            ...d(t)
                          }, {
                            "onUpdate:modelValue": (l) => e(s)(e(n), e(c)[t.name], l),
                            onKeydown: u[0] || (u[0] = M(L((l) => a.submitOnEnter && e(v).submitForm(), ["ctrl", "stop"]), ["enter"]))
                          }), null, 16, ["model-value", "onUpdate:modelValue"])) : t.type === "date" ? (r(), p(ge, y({
                            key: 15,
                            "model-value": e(m)(e(n), t.name)
                          }, { ref_for: !0 }, { ...e(i), ...d(t) }, {
                            "onUpdate:modelValue": (l) => e(s)(e(n), e(c)[t.name], l)
                          }), null, 16, ["model-value", "onUpdate:modelValue"])) : t.type === "autocomplete" ? (r(), p(Fe, y({
                            key: 16,
                            "model-value": e(m)(e(n), t.name)
                          }, { ref_for: !0 }, { ...e(i), ...d(t) }, {
                            url: typeof t.url == "function" ? t.url({ row: e(n) }) : k(t.url),
                            "onUpdate:modelValue": (l) => e(s)(e(n), e(c)[t.name], l)
                          }), null, 16, ["model-value", "url", "onUpdate:modelValue"])) : t.type === "server_select" ? (r(), p(Ue, y({
                            key: 17,
                            "model-value": e(m)(e(n), t.name),
                            "filter-placeholder": e(x)("Search For") + ": " + e(x)(t.label),
                            url: typeof t.url == "function" ? t.url({ row: e(n) }) : k(t.url)
                          }, { ref_for: !0 }, { ...e(i), ...d(t) }, {
                            "onUpdate:modelValue": (l) => e(s)(e(n), e(c)[t.name], l)
                          }), null, 16, ["model-value", "filter-placeholder", "url", "onUpdate:modelValue"])) : t.type === "server_multi_select" ? (r(), p(Ie, y({
                            key: 18,
                            "model-value": e(m)(e(n), t.name),
                            "filter-placeholder": e(x)("Search For") + ": " + e(x)(t.label),
                            url: typeof t.url == "function" ? t.url({ row: e(n) }) : k(t.url)
                          }, { ref_for: !0 }, { ...e(i), ...d(t) }, {
                            "onUpdate:modelValue": (l) => e(s)(e(n), e(c)[t.name], l)
                          }), null, 16, ["model-value", "filter-placeholder", "url", "onUpdate:modelValue"])) : t.type === "editor" ? (r(), p(we, y({
                            key: 19,
                            "model-value": e(m)(e(n), t.name)
                          }, { ref_for: !0 }, {
                            ...e(A)(e(i), ["onKeydown"]),
                            ...d(t)
                          }, {
                            "onUpdate:modelValue": (l) => e(s)(e(n), e(c)[t.name], l),
                            onKeydown: u[1] || (u[1] = M(L((l) => a.submitOnEnter && e(v).submitForm(), ["ctrl", "stop"]), ["enter"]))
                          }), null, 16, ["model-value", "onUpdate:modelValue"])) : t.type === "image" ? (r(), p(ke, y({
                            key: 20,
                            "model-value": e(m)(e(H), t.name),
                            "current-url": e(m)(e(n), t.imageUrlKey ?? t.name)
                          }, { ref_for: !0 }, {
                            ...e(A)(e(i), ["onKeydown"]),
                            ...d(t)
                          }, {
                            fields: t.fields,
                            "onUpdate:modelValue": (l) => e(s)(e(H), e(c)[t.name], l),
                            "onUpdate:currentUrl": (l) => e(s)(
                              e(n),
                              t.imageUrlKey ?? e(c)[t.name],
                              l
                            ),
                            onClear: (l) => t.imageClearKey ? e(s)(e(n), t.imageClearKey, !0) : null,
                            onUnclear: (l) => t.imageClearKey ? e(He)(e(n), t.imageClearKey) : null
                          }), null, 16, ["model-value", "current-url", "fields", "onUpdate:modelValue", "onUpdate:currentUrl", "onClear", "onUnclear"])) : t.type === "form" ? (r(), p(Le, y({
                            key: 21,
                            "model-value": e(m)(e(n), t.name)
                          }, { ref_for: !0 }, {
                            ...e(A)(e(i), ["onKeydown"]),
                            ...d(t)
                          }, {
                            fields: t.fields,
                            "label-class": "-mt-2",
                            "onUpdate:modelValue": (l) => e(s)(e(n), e(c)[t.name], l),
                            onKeydown: u[2] || (u[2] = M(L((l) => a.submitOnEnter && e(v).submitForm(), ["ctrl", "stop"]), ["enter"]))
                          }), null, 16, ["model-value", "fields", "onUpdate:modelValue"])) : B("", !0)
                        ])
                      ]),
                      a.showFieldErrorsPopover ? (r(), U("div", {
                        key: 0,
                        class: Z(["self-start ltr:pr-2 rtl:pl-2", { "pt-7": !a.inlineFields, "pt-1": a.inlineFields }])
                      }, [
                        O(e(ee), {
                          severity: "warn",
                          text: "",
                          size: "small"
                        }, {
                          default: X(() => [...u[5] || (u[5] = [
                            I("i", { class: "i-heroicons-exclamation-triangle-20-solid text-2xl" }, null, -1)
                          ])]),
                          _: 1
                        })
                      ], 2)) : B("", !0)
                    ])
                  ])
                ]),
                w(o.$slots, `${e(q)(t)}AfterControl`)
              ], 64)) : B("", !0)
            ], 8, ["to", "disabled"]))), 128))
          ], 2)
        ], 40, Xe),
        w(o.$slots, "buttons-area", {}, () => [
          a.withFooterButtons ? (r(), U("div", ot, [
            I("div", nt, [
              w(o.$slots, "beforeFooter", { isSubmitting: e(C) }),
              O(e(ee), {
                ref_key: "submitButtonRef",
                ref: G,
                name: e(J) + "_submit",
                size: a.size,
                loading: e(C),
                disabled: e(C) || e(W).invalid && a.defaultValidationMode === "onValueUpdate",
                label: a.submitText === !1 ? void 0 : a.submitText || e(x)("Submit"),
                icon: a.submitIcon,
                severity: a.submitSeverity,
                onKeydown: M(be, ["up"]),
                onClick: u[4] || (u[4] = (t) => e(v).submitForm())
              }, null, 8, ["name", "size", "loading", "disabled", "label", "icon", "severity"]),
              w(o.$slots, "afterFooter", { isSubmitting: e(C) })
            ])
          ])) : B("", !0)
        ])
      ], 512);
    };
  }
});
export {
  Vt as default
};
