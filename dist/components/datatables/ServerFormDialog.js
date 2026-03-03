import { defineComponent as Ue, ref as v, useTemplateRef as oe, computed as B, resolveComponent as Y, resolveDirective as De, openBlock as C, createBlock as q, normalizeClass as Be, unref as o, withCtx as c, createVNode as A, mergeProps as K, createSlots as Me, createElementVNode as k, createTextVNode as xe, toDisplayString as M, withDirectives as ze, createCommentVNode as Z, renderSlot as h, normalizeProps as x, guardReactiveProps as z, renderList as _, createElementBlock as $, Fragment as $e, nextTick as w, toValue as we } from "vue";
import Ie from "HddUiHelpers/components/FormWrapper/HddForm.vue";
import { appendToUrl as ee, getFieldSlotName as R, getColumnTitle as Pe } from "HddUiHelpers/components/datatables/ServerDataTableUtilities.ts";
import re from "HddUiHelpers/components/inputs/BaseInput.vue";
import { useApiClient as He } from "HddUiHelpers/stores/apiClient.ts";
import { useStackableDialog as de } from "HddUiHelpers/stores/stackableDialogs.ts";
import { startCase as Ne, get as U, set as D, cloneDeep as ce, isEqual as je } from "lodash-es";
import { useConfirm as pe } from "primevue/useconfirm";
import { useI18n as Le } from "vue-i18n";
const qe = { key: 0 }, Ke = { class: "font-bold" }, Ge = ["innerHTML"], We = {
  key: 0,
  class: "font-bold"
}, Je = {
  key: 1,
  class: "font-bold"
}, Qe = { class: "mx-4" }, Xe = { class: "mt-2 flex w-full justify-between" }, Ye = { class: "flex flex-wrap gap-1" }, ot = /* @__PURE__ */ Ue({
  __name: "ServerFormDialog",
  props: {
    url: { type: [Object, Function, String] },
    createUrlMethod: { default: "post" },
    singleEditUrl: { type: Function },
    focusFieldOnShown: {},
    editUrl: { type: [String, Object, Function] },
    deleteUrl: { type: [String, Object, Function] },
    autoAppendIdToEditUrl: { type: Boolean, default: !1 },
    title: {},
    subtitle: {},
    popupTarget: {},
    submitPayloadTransformer: { type: Function },
    autoLabelsWidth: { type: [Boolean, Number], default: !0 },
    closeOnEsc: {},
    fieldsContainerClass: {},
    createRecordHeader: {},
    editRecordHeader: {},
    deleteRecordHeader: {},
    deleteRecordMessage: {},
    customDefaultValuesOnCreate: {},
    customDefaultValuesOnEdit: {},
    dialogContentStyle: {},
    dialogClass: {},
    dialogName: {},
    successMessageTitle: {},
    successMessageText: {},
    submitSeverity: {},
    submitText: {},
    submitIcon: {},
    primaryKey: { default: "id" },
    inlineFields: { type: Boolean, default: !0 },
    size: {},
    columns: {},
    fields: {},
    keepFormOpenAfterCreate: { type: Boolean, default: !1 },
    focusFirstOnEdit: { type: Boolean, default: !0 },
    focusFirstOnCreate: { type: Boolean, default: !0 },
    onShown: { type: Function },
    onHidden: { type: Function },
    onVisible: { type: Function },
    onSubmitted: { type: Function },
    submitAndOpenProps: { type: Function },
    submitAndOpenButton: { type: [Boolean, Function] },
    submitAndOpenText: { type: [String, Function] },
    submitAndOpenIcon: { type: [String, Function], default: "i-garden:check-double-fill-12" },
    submitAndOpenSeverity: { default: "info" },
    dismissableMask: { type: Boolean, default: !0 },
    autoComplete: {}
  },
  emits: ["hidden", "shown", "visible", "submitted", "submitAndOpen"],
  setup(t, { expose: fe, emit: me }) {
    const F = me, { t: n } = Le(), b = v(!1), s = v(!1), O = v(!1), te = v(!1), G = v(), y = v(), I = v(), f = v(), d = v([]), P = v([]);
    function ve(e) {
      let l, a, u;
      return e.type === "select" ? (l = e.isMultiSelect ? "multiselect" : "select", Array.isArray(e.selectOptions) ? a = e.selectOptions : Array.isArray(e.selectOptions?.list) && (a = e.selectOptions.list)) : e.type === "numeric" ? l = "number" : e.type === "date" ? l = "date" : e.type === "textarea" ? l = "textarea" : e.type === "boolean" && (l = "checkbox"), e.showable && (u = e.showable), {
        name: e.fullFieldName,
        label: Pe(e, n),
        multiEditable: e.multiEditable,
        type: l,
        options: a,
        showable: u,
        ...e.formProps ?? {}
      };
    }
    const T = He(), m = oe("hddFormRef"), g = B(() => [
      ...(t.fields ?? []).map((e) => (e.label || (e.label = n(Ne(e.name))), e)),
      ...t.columns?.filter(
        (e) => e.inForm !== !1 && (s.value ? e.editable !== !1 : e.creatable !== !1)
      ).map(ve) ?? []
    ]), H = B(() => {
      let e = typeof t.url == "function" ? t.url(G.value).url : typeof t.url == "object" ? t.url.url : t.url, l = t.createUrlMethod;
      if (s.value)
        if (l = "put", t.singleEditUrl && y.value)
          e = t.singleEditUrl(y.value).url;
        else if (t.editUrl) {
          if (typeof t.editUrl == "function") {
            const u = t.editUrl(y.value);
            e = u.url, l = u.method;
          } else
            e = typeof t.editUrl == "object" ? t.editUrl.url : t.editUrl;
          t.autoAppendIdToEditUrl && y.value && (e = ee(e, y.value));
        } else y.value && (e = ee(e, y.value));
      let a;
      return O.value ? a = (u, r) => {
        const S = r.fieldsStates.value;
        for (const i in S)
          if (!S[i].pristine) {
            const p = U(r.currentValues.value, i);
            for (const L in d.value)
              D(d.value[L], i, p), t.submitPayloadTransformer && (d.value[L] = t.submitPayloadTransformer(
                d.value[L]
              ));
          }
        return {
          data: d.value
        };
      } : t.submitPayloadTransformer && (a = t.submitPayloadTransformer), {
        url: {
          url: e,
          method: l
        },
        fieldsContainerClass: t.fieldsContainerClass,
        unifyLabelsWidth: t.autoLabelsWidth,
        autoFocusFirstOnMount: !1,
        submitSeverity: t.submitSeverity ?? (s.value ? "success" : "primary"),
        submitText: t.submitText ?? (s.value ? n("Update") : n("Create")),
        submitIcon: t.submitIcon ?? (s.value ? "i-material-symbols:save" : "i-mdi-check"),
        initialValues: f.value,
        submitPayloadTransformer: a,
        size: "small",
        inlineFields: t.inlineFields,
        fields: g,
        autoComplete: t.autoComplete,
        isEditing: s.value,
        onFailure(u) {
          V.value && T.toastRequestError(u);
        },
        onSuccess: (u) => {
          F("submitted", u.data, s.value ? "update" : "create"), (s.value || !t.keepFormOpenAfterCreate) && (b.value = !1), t.successMessageTitle || t.successMessageText ? T.toastSuccess(t.successMessageTitle, t.successMessageText) : T.toastSuccess(
            s.value ? n("Updated!") : n("Created!"),
            s.value ? O.value ? n("Record Updated Successfully!") : n(
              "n Record Updated Successfully!",
              { n: d.value.length || 1 },
              d.value.length || 1
            ) : te.value ? n("Record Created Successfully!") : n(
              "n Record Created Successfully!",
              { n: P.value.length || 1 },
              P.value.length || 1
            )
          ), V.value = !1;
        }
      };
    }), E = B(() => m?.value?.form), W = B(() => m.value?.currentValues);
    function le(e, l) {
      E?.value?.setValue(e, l);
    }
    function be(e) {
      return U(W.value, e);
    }
    function J(e) {
      for (const l in e)
        E?.value?.setValue(l, e[l]);
    }
    function ye(e = !1, l) {
      if (e || t.customDefaultValuesOnCreate) {
        if (f.value = typeof e == "object" ? e : {}, g.value)
          for (const a of g.value)
            a.defaultValue !== void 0 && D(
              f.value,
              a.name.split("."),
              typeof a.defaultValue == "function" ? a.defaultValue(e ? U(e, a.name) : void 0, e) : a.defaultValue
            );
        G.value = l ?? f.value[t.primaryKey], t.customDefaultValuesOnCreate && (X(t.customDefaultValuesOnCreate), J(t.customDefaultValuesOnCreate));
      }
      w(() => {
        b.value = !0;
      });
    }
    function ge(e) {
      if (e.length !== 0) {
        if (e.length === 1) return Q(e[0]);
        s.value = !0, f.value = e[0], d.value = ce(e), O.value = !0, w(() => {
          b.value = !0;
        });
      }
    }
    function Q(e, l = !0) {
      if (s.value = !0, O.value = !1, I.value = e, f.value = ce(e), y.value = e[t.primaryKey], g.value) {
        for (const a of g.value)
          if (a.customEditGetter) {
            const u = U(e, a.name);
            D(
              f.value,
              a.name,
              typeof a.customEditGetter == "function" ? a.customEditGetter(u, e) : u
            );
          }
      }
      t.customDefaultValuesOnEdit && (X(t.customDefaultValuesOnEdit), J(t.customDefaultValuesOnEdit)), l && w(() => {
        b.value = !0;
      });
    }
    function ae() {
      b.value = !1;
    }
    function Ce() {
    }
    const ie = oe("dialogRef"), { isClosable: he, dialogStackIndex: Ze } = de({
      dialogVisibilityRef: b,
      dialogRef: ie
    });
    function Fe() {
      s.value = !1, f.value = void 0, G.value = void 0, y.value = void 0, I.value = void 0, O.value = !1, d.value = [], F("hidden"), F("visible", !1);
    }
    function Oe() {
      t.focusFieldOnShown ? Ee(t.focusFieldOnShown, 100) : s.value ? t.focusFirstOnEdit && ue() : t.focusFirstOnCreate && ue(), F("shown"), F("visible", !0);
    }
    function ne(e) {
      return e.multiEditable === !0;
    }
    function Se(e) {
      if (d.value.length === 0) return !1;
      const l = U(d.value[0], e.name);
      return !d.value.every(
        (u) => je(U(u, e.name), l)
      );
    }
    function X(e) {
      for (const l in e)
        D(f.value, l.split("."), e[l]);
    }
    function Te(e) {
      const l = typeof e.defaultValue == "function" ? e.defaultValue() : e.defaultValue;
      D(W.value, e.name.split("."), l);
      for (let a = 0; a < d.value.length; a++)
        D(d.value[a], e.name.split("."), l);
      w(() => {
        m.value?.fieldRefs[e.name]?.focus();
      });
    }
    function Ae() {
      b.value = !1;
    }
    function ue() {
      setTimeout(() => {
        m.value?.focusFirst();
      }, 100);
    }
    function Ee(e, l = 0) {
      setTimeout(() => {
        m.value?.focusField(e);
      }, l);
    }
    const Ve = pe(), { updateDialogVisibility: N } = de();
    function se(e) {
      if (!e) return;
      let l = 1;
      Array.isArray(e) && (l = e.length);
      const a = we(t.popupTarget);
      F("visible", !0), N(!0), Ve.require({
        message: t.deleteRecordMessage ?? n("Are you sure to delete n records?", { n: l }, l),
        header: t.deleteRecordHeader ?? n("Confirmation"),
        target: a,
        icon: "pi pi-info-circle",
        rejectLabel: n("Cancel"),
        acceptLabel: n("Delete"),
        group: a ? "popup" : "dismissable",
        rejectClass: "p-button-secondary p-button-outlined",
        acceptClass: "p-button-danger",
        accept: async () => {
          const u = Array.isArray(e) ? e.map((r) => r[t.primaryKey]) : [e[t.primaryKey]];
          try {
            if (!t.url && !t.deleteUrl)
              throw new Error("No Url");
            let r, S = "delete";
            if (t.deleteUrl)
              if (typeof t.deleteUrl == "function") {
                const i = t.deleteUrl(u[0]);
                r = i.url, S = i.method;
              } else typeof t.deleteUrl == "object" ? (r = t.deleteUrl.url, S = t.deleteUrl.method) : r = t.deleteUrl;
            else
              r = typeof t.url == "object" ? t.url.url : t.url, l === 1 && (r = ee(r, u[0]));
            await T.request({
              url: r,
              method: S,
              params: { ids: u }
            }), T.toastSuccess(n("Deleted!"), n("n Record Deleted Successfully", { n: l }, l)), F("submitted", e, "delete");
          } catch (r) {
            console.error(r), T.toastRequestError(r);
          }
          N(!1);
        },
        reject() {
          N(!1);
        },
        onHide: () => {
          N(!1);
        }
      });
    }
    const V = v(!1);
    function ke(e, ...l) {
      V.value = !0;
      try {
        Q(e), w(() => {
          setTimeout(() => {
            l.forEach(([a, u]) => {
              le(a, u);
            }), E.value.submitForm();
          });
        });
      } catch (a) {
        V.value = !1, T.toastError(a);
      }
    }
    const j = B(() => ({
      row: I.value ?? f.value,
      submit: E.value?.submitForm,
      cancel: ae
    }));
    function Re() {
      E.value.submitForm().then((e) => {
        e && F("submitAndOpen", e.data ?? e, s.value ? "update" : "create");
      });
    }
    return fe({
      mappedFormFields: g,
      currentValues: W,
      setDefaultValues: X,
      setValue: le,
      getValue: be,
      setValues: J,
      create: ye,
      editMulti: ge,
      edit: Q,
      updateDirectly: ke,
      deleteRecord: se,
      delete: se,
      close: Ae
    }), (e, l) => {
      const a = Y("Button"), u = Y("Message"), r = Y("Dialog"), S = De("tooltip");
      return C(), q(r, {
        ref_key: "dialogRef",
        ref: ie,
        visible: b.value,
        "onUpdate:visible": l[1] || (l[1] = (i) => b.value = i),
        "dismissable-mask": t.dismissableMask,
        modal: !V.value,
        "keep-in-viewport": "",
        "close-on-escape": o(he),
        "content-style": t.dialogContentStyle,
        draggable: !1,
        class: Be(["w-580px", [t.dialogClass, { "!hidden": V.value }]]),
        name: t.dialogName,
        onShow: Oe,
        onAfterHide: Fe
      }, {
        header: c(() => [
          h(e.$slots, "header", {
            row: I.value ?? f.value
          }, () => [
            t.title ? (C(), $("div", qe, [
              k("div", Ke, M(t.title), 1),
              t.subtitle ? (C(), $("div", {
                key: 0,
                class: "mt-1",
                innerHTML: t.subtitle
              }, null, 8, Ge)) : Z("", !0)
            ])) : (C(), $($e, { key: 1 }, [
              s.value ? (C(), $("span", We, M(t.editRecordHeader ?? (O.value ? o(n)("Edit n Records", { n: d.value.length }, d.value.length) : o(n)("Edit Record"))), 1)) : (C(), $("span", Je, M(t.createRecordHeader ?? (te.value ? o(n)("Create n Records", { n: P.value.length }, P.value.length) : o(n)("Create Record"))), 1))
            ], 64))
          ])
        ]),
        closebutton: c(({ closeCallback: i }) => [
          A(a, {
            text: "",
            title: o(n)("Close"),
            severity: "contrast",
            size: "small",
            variant: "text",
            rounded: "",
            icon: "i-mdi-close scale-180",
            onClick: i
          }, null, 8, ["title", "onClick"])
        ]),
        footer: c(() => [
          k("div", Xe, [
            k("div", null, [
              h(e.$slots, "beforeCancelButton", x(z(j.value))),
              A(a, {
                size: t.size,
                loading: m.value?.isSubmitting,
                label: o(n)("Cancel"),
                icon: "i-material-symbols:close",
                severity: "secondary",
                outlined: "",
                onClick: ae
              }, null, 8, ["size", "loading", "label"]),
              h(e.$slots, "afterCancel", x(z(j.value)))
            ]),
            k("div", Ye, [
              h(e.$slots, "beforeSubmitButton", x(z(j.value))),
              A(a, {
                size: t.size,
                loading: m.value?.isSubmitting,
                disabled: m.value?.isSubmitting,
                label: H.value.submitText || o(n)("Submit"),
                icon: H.value.submitIcon,
                severity: H.value.submitSeverity,
                onClick: l[0] || (l[0] = (i) => E.value.submitForm())
              }, null, 8, ["size", "loading", "disabled", "label", "icon", "severity"]),
              t.submitAndOpenButton && (typeof t.submitAndOpenButton == "function" ? t.submitAndOpenButton({ isEditing: s.value }) : t.submitAndOpenButton) ? (C(), q(a, K({
                key: 0,
                size: t.size,
                loading: m.value?.isSubmitting,
                disabled: m.value?.isSubmitting,
                label: t.submitAndOpenText ? typeof t.submitAndOpenText == "function" ? t.submitAndOpenText({ isEditing: s.value }) : t.submitAndOpenText : o(n)("Submit & Open"),
                icon: t.submitAndOpenIcon ? typeof t.submitAndOpenIcon == "function" ? t.submitAndOpenIcon({ isEditing: s.value }) : t.submitAndOpenIcon : void 0,
                severity: t.submitAndOpenSeverity
              }, t.submitAndOpenProps, { onClick: Re }), null, 16, ["size", "loading", "disabled", "label", "icon", "severity"])) : Z("", !0),
              h(e.$slots, "afterSubmitButton", x(z(j.value)))
            ])
          ])
        ]),
        default: c(() => [
          A(Ie, K({
            ref_key: "hddFormRef",
            ref: m
          }, H.value, { onReset: Ce }), Me({
            beforeControls: c((i) => [
              h(e.$slots, "beforeControls", x(z(i)))
            ]),
            fieldInput: c(({ field: i, binds: p }) => [
              O.value && !ne(i) ? (C(), q(re, K({ key: 0 }, p, {
                "helper-text": "",
                "hide-label-double-dots": !1,
                label: i.label ?? i.name,
                "label-single-line": "",
                inline: "",
                disabled: "",
                "button-addon": void 0
              }), {
                default: c(() => [
                  A(u, {
                    severity: "secondary",
                    variant: "simple",
                    size: "small",
                    class: "w-full ps-8"
                  }, {
                    default: c(() => [
                      xe(M(o(n)("Unavailable in multi edit")), 1)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 16, ["label"])) : O.value && ne(i) && Se(i) ? (C(), q(re, K({ key: 1 }, p, {
                "hide-label-double-dots": !1,
                label: i.label ?? i.name,
                "label-single-line": "",
                inline: "",
                disabled: "",
                "button-addon": void 0
              }), {
                default: c(() => [
                  A(u, {
                    severity: "secondary",
                    variant: "simple",
                    size: "small",
                    class: "w-full ps-8"
                  }, {
                    default: c(() => [
                      k("span", Qe, M(o(n)("Different Values")), 1),
                      ze(A(a, {
                        size: "small",
                        variant: "text",
                        raised: "",
                        icon: "pi pi-pencil",
                        severity: "warn",
                        onClick: (L) => Te(i)
                      }, null, 8, ["onClick"]), [
                        [S, o(n)("Edit All")]
                      ])
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1040, ["label"])) : Z("", !0)
            ]),
            "buttons-area": c(() => [
              l[2] || (l[2] = k("div", null, null, -1))
            ]),
            _: 2
          }, [
            _(g.value, (i) => ({
              name: `${o(R)(i)}BeforeControl`,
              fn: c(() => [
                h(e.$slots, `${o(R)(i)}BeforeControl`)
              ])
            })),
            _(g.value, (i) => ({
              name: `${o(R)(i)}ControlBody`,
              fn: c(() => [
                h(e.$slots, `${o(R)(i)}ControlBody`)
              ])
            })),
            _(g.value, (i) => ({
              name: `${o(R)(i)}AfterControl`,
              fn: c(() => [
                h(e.$slots, `${o(R)(i)}AfterControl`)
              ])
            }))
          ]), 1040)
        ]),
        _: 3
      }, 8, ["visible", "dismissable-mask", "modal", "close-on-escape", "content-style", "name", "class"]);
    };
  }
});
export {
  ot as default
};
