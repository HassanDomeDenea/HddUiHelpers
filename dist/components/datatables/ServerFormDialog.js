import Re from "primevue/tooltip";
import Ue from "primevue/dialog";
import De from "primevue/message";
import Be from "primevue/button";
import { defineComponent as xe, ref as b, useTemplateRef as ue, computed as B, openBlock as C, createBlock as q, normalizeClass as Me, unref as l, isRef as pe, withCtx as c, createVNode as A, mergeProps as K, createSlots as ze, createElementVNode as k, createTextVNode as $e, toDisplayString as x, withDirectives as we, createCommentVNode as Y, renderSlot as h, normalizeProps as M, guardReactiveProps as p, renderList as Z, createElementBlock as z, Fragment as Ie, nextTick as $, toValue as Pe } from "vue";
import He from "HddUiHelpers/components/FormWrapper/HddForm.vue";
import { appendToUrl as _, getFieldSlotName as R, getColumnTitle as Ne } from "HddUiHelpers/components/datatables/ServerDataTableUtilities.ts";
import oe from "HddUiHelpers/components/inputs/BaseInput.vue";
import { useApiClient as je } from "HddUiHelpers/stores/apiClient.ts";
import { useStackableDialog as re } from "HddUiHelpers/stores/stackableDialogs.ts";
import { startCase as Le, get as U, set as D, cloneDeep as de, isEqual as qe } from "lodash-es";
import { useConfirm as Ke } from "primevue/useconfirm";
import { useI18n as Ge } from "vue-i18n";
const We = { key: 0 }, Je = { class: "font-bold" }, Qe = ["innerHTML"], Xe = {
  key: 0,
  class: "font-bold"
}, Ye = {
  key: 1,
  class: "font-bold"
}, Ze = { class: "mx-4" }, _e = { class: "mt-2 flex w-full justify-between" }, et = { class: "flex flex-wrap gap-1" }, vt = /* @__PURE__ */ xe({
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
  setup(t, { expose: ce, emit: fe }) {
    const F = fe, { t: s } = Ge(), v = b(!1), o = b(!1), O = b(!1), ee = b(!1), G = b(), y = b(), w = b(), f = b(), d = b([]), I = b([]);
    function me(e) {
      let i, a, u;
      return e.type === "select" ? (i = e.isMultiSelect ? "multiselect" : "select", Array.isArray(e.selectOptions) ? a = e.selectOptions : Array.isArray(e.selectOptions?.list) && (a = e.selectOptions.list)) : e.type === "numeric" ? i = "number" : e.type === "date" ? i = "date" : e.type === "textarea" ? i = "textarea" : e.type === "boolean" && (i = "checkbox"), e.showable && (u = e.showable), {
        name: e.fullFieldName,
        label: Ne(e, s),
        multiEditable: e.multiEditable,
        type: i,
        options: a,
        showable: u,
        ...e.formProps ?? {}
      };
    }
    const T = je(), m = ue("hddFormRef"), g = B(() => [
      ...(t.fields ?? []).map((e) => (e.label || (e.label = s(Le(e.name))), e)),
      ...t.columns?.filter(
        (e) => e.inForm !== !1 && (o.value ? e.editable !== !1 : e.creatable !== !1)
      ).map(me) ?? []
    ]), P = B(() => {
      let e = typeof t.url == "function" ? t.url(G.value).url : typeof t.url == "object" ? t.url.url : t.url, i = t.createUrlMethod;
      if (o.value)
        if (i = "put", t.singleEditUrl && y.value)
          e = t.singleEditUrl(y.value).url;
        else if (t.editUrl) {
          if (typeof t.editUrl == "function") {
            const u = t.editUrl(y.value);
            e = u.url, i = u.method;
          } else
            e = typeof t.editUrl == "object" ? t.editUrl.url : t.editUrl;
          t.autoAppendIdToEditUrl && y.value && (e = _(e, y.value));
        } else y.value && (e = _(e, y.value));
      let a;
      return O.value ? a = (u, r) => {
        const S = r.fieldsStates.value;
        for (const n in S)
          if (!S[n].pristine) {
            const j = U(r.currentValues.value, n);
            for (const L in d.value)
              D(d.value[L], n, j), t.submitPayloadTransformer && (d.value[L] = t.submitPayloadTransformer(
                d.value[L]
              ));
          }
        return {
          data: d.value
        };
      } : t.submitPayloadTransformer && (a = t.submitPayloadTransformer), {
        url: {
          url: e,
          method: i
        },
        fieldsContainerClass: t.fieldsContainerClass,
        unifyLabelsWidth: t.autoLabelsWidth,
        autoFocusFirstOnMount: !1,
        submitSeverity: t.submitSeverity ?? (o.value ? "success" : "primary"),
        submitText: t.submitText ?? (o.value ? s("Update") : s("Create")),
        submitIcon: t.submitIcon ?? (o.value ? "i-material-symbols:save" : "i-mdi-check"),
        initialValues: f.value,
        submitPayloadTransformer: a,
        size: "small",
        inlineFields: t.inlineFields,
        fields: g,
        autoComplete: t.autoComplete,
        isEditing: o.value,
        onFailure(u) {
          V.value && T.toastRequestError(u);
        },
        onSuccess: (u) => {
          F("submitted", u.data, o.value ? "update" : "create"), (o.value || !t.keepFormOpenAfterCreate) && (v.value = !1), t.successMessageTitle || t.successMessageText ? T.toastSuccess(t.successMessageTitle, t.successMessageText) : T.toastSuccess(
            o.value ? s("Updated!") : s("Created!"),
            o.value ? O.value ? s("Record Updated Successfully!") : s(
              "n Record Updated Successfully!",
              { n: d.value.length || 1 },
              d.value.length || 1
            ) : ee.value ? s("Record Created Successfully!") : s(
              "n Record Created Successfully!",
              { n: I.value.length || 1 },
              I.value.length || 1
            )
          ), V.value = !1;
        }
      };
    }), E = B(() => m?.value?.form), W = B(() => m.value?.currentValues);
    function te(e, i) {
      E?.value?.setValue(e, i);
    }
    function be(e) {
      return U(W.value, e);
    }
    function J(e) {
      for (const i in e)
        E?.value?.setValue(i, e[i]);
    }
    function ve(e = !1, i) {
      if (e || t.customDefaultValuesOnCreate) {
        if (f.value = typeof e == "object" ? e : {}, g.value)
          for (const a of g.value)
            a.defaultValue !== void 0 && D(
              f.value,
              a.name.split("."),
              typeof a.defaultValue == "function" ? a.defaultValue(e ? U(e, a.name) : void 0, e) : a.defaultValue
            );
        G.value = i ?? f.value[t.primaryKey], t.customDefaultValuesOnCreate && (X(t.customDefaultValuesOnCreate), J(t.customDefaultValuesOnCreate));
      }
      $(() => {
        v.value = !0;
      });
    }
    function ye(e) {
      if (e.length !== 0) {
        if (e.length === 1) return Q(e[0]);
        o.value = !0, f.value = e[0], d.value = de(e), O.value = !0, $(() => {
          v.value = !0;
        });
      }
    }
    function Q(e, i = !0) {
      if (o.value = !0, O.value = !1, w.value = e, f.value = de(e), y.value = e[t.primaryKey], g.value) {
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
      t.customDefaultValuesOnEdit && (X(t.customDefaultValuesOnEdit), J(t.customDefaultValuesOnEdit)), i && $(() => {
        v.value = !0;
      });
    }
    function le() {
      v.value = !1;
    }
    function ge() {
    }
    const ie = ue("dialogRef"), { isClosable: Ce, dialogStackIndex: tt } = re({
      dialogVisibilityRef: v,
      dialogRef: ie
    });
    function he() {
      o.value = !1, f.value = void 0, G.value = void 0, y.value = void 0, w.value = void 0, O.value = !1, d.value = [], F("hidden"), F("visible", !1);
    }
    function Fe() {
      t.focusFieldOnShown ? Ae(t.focusFieldOnShown, 100) : o.value ? t.focusFirstOnEdit && ne() : t.focusFirstOnCreate && ne(), F("shown"), F("visible", !0);
    }
    function ae(e) {
      return e.multiEditable === !0;
    }
    function Oe(e) {
      if (d.value.length === 0) return !1;
      const i = U(d.value[0], e.name);
      return !d.value.every(
        (u) => qe(U(u, e.name), i)
      );
    }
    function X(e) {
      for (const i in e)
        D(f.value, i.split("."), e[i]);
    }
    function Se(e) {
      const i = typeof e.defaultValue == "function" ? e.defaultValue() : e.defaultValue;
      D(W.value, e.name.split("."), i);
      for (let a = 0; a < d.value.length; a++)
        D(d.value[a], e.name.split("."), i);
      $(() => {
        m.value?.fieldRefs[e.name]?.focus();
      });
    }
    function Te() {
      v.value = !1;
    }
    function ne() {
      setTimeout(() => {
        m.value?.focusFirst();
      }, 100);
    }
    function Ae(e, i = 0) {
      setTimeout(() => {
        m.value?.focusField(e);
      }, i);
    }
    const Ee = Ke(), { updateDialogVisibility: H } = re();
    function se(e) {
      if (!e) return;
      let i = 1;
      Array.isArray(e) && (i = e.length);
      const a = Pe(t.popupTarget);
      F("visible", !0), H(!0), Ee.require({
        message: t.deleteRecordMessage ?? s("Are you sure to delete n records?", { n: i }, i),
        header: t.deleteRecordHeader ?? s("Confirmation"),
        target: a,
        icon: "pi pi-info-circle",
        rejectLabel: s("Cancel"),
        acceptLabel: s("Delete"),
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
                const n = t.deleteUrl(u[0]);
                r = n.url, S = n.method;
              } else typeof t.deleteUrl == "object" ? (r = t.deleteUrl.url, S = t.deleteUrl.method) : r = t.deleteUrl;
            else
              r = typeof t.url == "object" ? t.url.url : t.url, i === 1 && (r = _(r, u[0]));
            await T.request({
              url: r,
              method: S,
              params: { ids: u }
            }), T.toastSuccess(s("Deleted!"), s("n Record Deleted Successfully", { n: i }, i)), F("submitted", e, "delete");
          } catch (r) {
            console.error(r), T.toastRequestError(r);
          }
          H(!1);
        },
        reject() {
          H(!1);
        },
        onHide: () => {
          H(!1);
        }
      });
    }
    const V = b(!1);
    function Ve(e, ...i) {
      V.value = !0;
      try {
        Q(e), $(() => {
          setTimeout(() => {
            i.forEach(([a, u]) => {
              te(a, u);
            }), E.value.submitForm();
          });
        });
      } catch (a) {
        V.value = !1, T.toastError(a);
      }
    }
    const N = B(() => ({
      row: w.value ?? f.value,
      submit: E.value?.submitForm,
      cancel: le
    }));
    function ke() {
      E.value.submitForm().then((e) => {
        e && F("submitAndOpen", e.data ?? e, o.value ? "update" : "create");
      });
    }
    return ce({
      mappedFormFields: g,
      currentValues: W,
      setDefaultValues: X,
      setValue: te,
      getValue: be,
      setValues: J,
      create: ve,
      editMulti: ye,
      edit: Q,
      updateDirectly: Ve,
      deleteRecord: se,
      delete: se,
      close: Te
    }), (e, i) => {
      const a = Be, u = De, r = Ue, S = Re;
      return C(), q(r, {
        ref_key: "dialogRef",
        ref: ie,
        visible: l(v),
        "onUpdate:visible": i[1] || (i[1] = (n) => pe(v) ? v.value = n : null),
        "dismissable-mask": t.dismissableMask,
        modal: !l(V),
        "keep-in-viewport": "",
        "close-on-escape": l(Ce),
        "content-style": t.dialogContentStyle,
        draggable: !1,
        class: Me(["w-580px", [t.dialogClass, { "!hidden": l(V) }]]),
        name: t.dialogName,
        onShow: Fe,
        onAfterHide: he
      }, {
        header: c(() => [
          h(e.$slots, "header", {
            row: l(w) ?? l(f)
          }, () => [
            t.title ? (C(), z("div", We, [
              k("div", Je, x(t.title), 1),
              t.subtitle ? (C(), z("div", {
                key: 0,
                class: "mt-1",
                innerHTML: t.subtitle
              }, null, 8, Qe)) : Y("", !0)
            ])) : (C(), z(Ie, { key: 1 }, [
              l(o) ? (C(), z("span", Xe, x(t.editRecordHeader ?? (l(O) ? l(s)("Edit n Records", { n: l(d).length }, l(d).length) : l(s)("Edit Record"))), 1)) : (C(), z("span", Ye, x(t.createRecordHeader ?? (l(ee) ? l(s)("Create n Records", { n: l(I).length }, l(I).length) : l(s)("Create Record"))), 1))
            ], 64))
          ])
        ]),
        closebutton: c(({ closeCallback: n }) => [
          A(a, {
            text: "",
            title: l(s)("Close"),
            severity: "contrast",
            size: "small",
            variant: "text",
            rounded: "",
            icon: "i-mdi-close scale-180",
            onClick: n
          }, null, 8, ["title", "onClick"])
        ]),
        footer: c(() => [
          k("div", _e, [
            k("div", null, [
              h(e.$slots, "beforeCancelButton", M(p(l(N)))),
              A(a, {
                size: t.size,
                loading: l(m)?.isSubmitting,
                label: l(s)("Cancel"),
                icon: "i-material-symbols:close",
                severity: "secondary",
                outlined: "",
                onClick: le
              }, null, 8, ["size", "loading", "label"]),
              h(e.$slots, "afterCancel", M(p(l(N))))
            ]),
            k("div", et, [
              h(e.$slots, "beforeSubmitButton", M(p(l(N)))),
              A(a, {
                size: t.size,
                loading: l(m)?.isSubmitting,
                disabled: l(m)?.isSubmitting,
                label: l(P).submitText || l(s)("Submit"),
                icon: l(P).submitIcon,
                severity: l(P).submitSeverity,
                onClick: i[0] || (i[0] = (n) => l(E).submitForm())
              }, null, 8, ["size", "loading", "disabled", "label", "icon", "severity"]),
              t.submitAndOpenButton && (typeof t.submitAndOpenButton == "function" ? t.submitAndOpenButton({ isEditing: l(o) }) : t.submitAndOpenButton) ? (C(), q(a, K({
                key: 0,
                size: t.size,
                loading: l(m)?.isSubmitting,
                disabled: l(m)?.isSubmitting,
                label: t.submitAndOpenText ? typeof t.submitAndOpenText == "function" ? t.submitAndOpenText({ isEditing: l(o) }) : t.submitAndOpenText : l(s)("Submit & Open"),
                icon: t.submitAndOpenIcon ? typeof t.submitAndOpenIcon == "function" ? t.submitAndOpenIcon({ isEditing: l(o) }) : t.submitAndOpenIcon : void 0,
                severity: t.submitAndOpenSeverity
              }, t.submitAndOpenProps, { onClick: ke }), null, 16, ["size", "loading", "disabled", "label", "icon", "severity"])) : Y("", !0),
              h(e.$slots, "afterSubmitButton", M(p(l(N))))
            ])
          ])
        ]),
        default: c(() => [
          A(He, K({
            ref_key: "hddFormRef",
            ref: m
          }, l(P), { onReset: ge }), ze({
            beforeControls: c((n) => [
              h(e.$slots, "beforeControls", M(p(n)))
            ]),
            fieldInput: c(({ field: n, binds: j }) => [
              l(O) && !ae(n) ? (C(), q(oe, K({ key: 0 }, j, {
                "helper-text": "",
                "hide-label-double-dots": !1,
                label: n.label ?? n.name,
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
                      $e(x(l(s)("Unavailable in multi edit")), 1)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 16, ["label"])) : l(O) && ae(n) && Oe(n) ? (C(), q(oe, K({ key: 1 }, j, {
                "hide-label-double-dots": !1,
                label: n.label ?? n.name,
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
                      k("span", Ze, x(l(s)("Different Values")), 1),
                      we(A(a, {
                        size: "small",
                        variant: "text",
                        raised: "",
                        icon: "pi pi-pencil",
                        severity: "warn",
                        onClick: (L) => Se(n)
                      }, null, 8, ["onClick"]), [
                        [S, l(s)("Edit All")]
                      ])
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1040, ["label"])) : Y("", !0)
            ]),
            "buttons-area": c(() => [
              i[2] || (i[2] = k("div", null, null, -1))
            ]),
            _: 2
          }, [
            Z(l(g), (n) => ({
              name: `${l(R)(n)}BeforeControl`,
              fn: c(() => [
                h(e.$slots, `${l(R)(n)}BeforeControl`)
              ])
            })),
            Z(l(g), (n) => ({
              name: `${l(R)(n)}ControlBody`,
              fn: c(() => [
                h(e.$slots, `${l(R)(n)}ControlBody`)
              ])
            })),
            Z(l(g), (n) => ({
              name: `${l(R)(n)}AfterControl`,
              fn: c(() => [
                h(e.$slots, `${l(R)(n)}AfterControl`)
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
  vt as default
};
