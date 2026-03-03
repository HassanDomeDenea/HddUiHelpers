import { defineComponent as Ae, resolveComponent as J, resolveDirective as Ee, openBlock as g, createBlock as N, normalizeClass as Ve, unref as l, isRef as Re, withCtx as c, createVNode as T, mergeProps as j, createSlots as Ue, createElementVNode as E, createTextVNode as De, toDisplayString as D, withDirectives as xe, createCommentVNode as Q, renderSlot as C, normalizeProps as x, guardReactiveProps as B, renderList as X, createElementBlock as M, Fragment as Be } from "vue";
import Me from "HddUiHelpers/components/FormWrapper/HddForm.vue";
import { appendToUrl as Y, getFieldSlotName as V, getColumnTitle as ze } from "HddUiHelpers/components/datatables/ServerDataTableUtilities.ts";
import ne from "HddUiHelpers/components/inputs/BaseInput.vue";
import { useApiClient as $e } from "HddUiHelpers/stores/apiClient.ts";
import { useStackableDialog as se } from "HddUiHelpers/stores/stackableDialogs.ts";
import { startCase as pe, get as R, set as U, cloneDeep as ue, isEqual as we } from "lodash-es";
import { useConfirm as Ie } from "primevue/useconfirm";
const Pe = { key: 0 }, He = { class: "font-bold" }, Ne = ["innerHTML"], je = {
  key: 0,
  class: "font-bold"
}, Le = {
  key: 1,
  class: "font-bold"
}, qe = { class: "mx-4" }, Ke = { class: "mt-2 flex w-full justify-between" }, Ge = { class: "flex flex-wrap gap-1" }, lt = /* @__PURE__ */ Ae({
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
  setup(t, { expose: oe, emit: re }) {
    const h = re, { t: s } = useI18n(), b = ref(!1), o = ref(!1), F = ref(!1), Z = ref(!1), L = ref(), v = ref(), z = ref(), f = ref(), d = ref([]), $ = ref([]);
    function de(e) {
      let i, a, u;
      return e.type === "select" ? (i = e.isMultiSelect ? "multiselect" : "select", Array.isArray(e.selectOptions) ? a = e.selectOptions : Array.isArray(e.selectOptions?.list) && (a = e.selectOptions.list)) : e.type === "numeric" ? i = "number" : e.type === "date" ? i = "date" : e.type === "textarea" ? i = "textarea" : e.type === "boolean" && (i = "checkbox"), e.showable && (u = e.showable), {
        name: e.fullFieldName,
        label: ze(e, s),
        multiEditable: e.multiEditable,
        type: i,
        options: a,
        showable: u,
        ...e.formProps ?? {}
      };
    }
    const S = $e(), m = useTemplateRef("hddFormRef"), y = computed(() => [
      ...(t.fields ?? []).map((e) => (e.label || (e.label = s(pe(e.name))), e)),
      ...t.columns?.filter(
        (e) => e.inForm !== !1 && (o.value ? e.editable !== !1 : e.creatable !== !1)
      ).map(de) ?? []
    ]), p = computed(() => {
      let e = typeof t.url == "function" ? t.url(L.value).url : typeof t.url == "object" ? t.url.url : t.url, i = t.createUrlMethod;
      if (o.value)
        if (i = "put", t.singleEditUrl && v.value)
          e = t.singleEditUrl(v.value).url;
        else if (t.editUrl) {
          if (typeof t.editUrl == "function") {
            const u = t.editUrl(v.value);
            e = u.url, i = u.method;
          } else
            e = typeof t.editUrl == "object" ? t.editUrl.url : t.editUrl;
          t.autoAppendIdToEditUrl && v.value && (e = Y(e, v.value));
        } else v.value && (e = Y(e, v.value));
      let a;
      return F.value ? a = (u, r) => {
        const O = r.fieldsStates.value;
        for (const n in O)
          if (!O[n].pristine) {
            const P = R(r.currentValues.value, n);
            for (const H in d.value)
              U(d.value[H], n, P), t.submitPayloadTransformer && (d.value[H] = t.submitPayloadTransformer(
                d.value[H]
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
        fields: y,
        autoComplete: t.autoComplete,
        isEditing: o.value,
        onFailure(u) {
          A.value && S.toastRequestError(u);
        },
        onSuccess: (u) => {
          h("submitted", u.data, o.value ? "update" : "create"), (o.value || !t.keepFormOpenAfterCreate) && (b.value = !1), t.successMessageTitle || t.successMessageText ? S.toastSuccess(t.successMessageTitle, t.successMessageText) : S.toastSuccess(
            o.value ? s("Updated!") : s("Created!"),
            o.value ? F.value ? s("Record Updated Successfully!") : s(
              "n Record Updated Successfully!",
              { n: d.value.length || 1 },
              d.value.length || 1
            ) : Z.value ? s("Record Created Successfully!") : s(
              "n Record Created Successfully!",
              { n: $.value.length || 1 },
              $.value.length || 1
            )
          ), A.value = !1;
        }
      };
    }), k = computed(() => m?.value?.form), q = computed(() => m.value?.currentValues);
    function _(e, i) {
      k?.value?.setValue(e, i);
    }
    function ce(e) {
      return R(q.value, e);
    }
    function K(e) {
      for (const i in e)
        k?.value?.setValue(i, e[i]);
    }
    function fe(e = !1, i) {
      if (e || t.customDefaultValuesOnCreate) {
        if (f.value = typeof e == "object" ? e : {}, y.value)
          for (const a of y.value)
            a.defaultValue !== void 0 && U(
              f.value,
              a.name.split("."),
              typeof a.defaultValue == "function" ? a.defaultValue(e ? R(e, a.name) : void 0, e) : a.defaultValue
            );
        L.value = i ?? f.value[t.primaryKey], t.customDefaultValuesOnCreate && (W(t.customDefaultValuesOnCreate), K(t.customDefaultValuesOnCreate));
      }
      nextTick(() => {
        b.value = !0;
      });
    }
    function me(e) {
      if (e.length !== 0) {
        if (e.length === 1) return G(e[0]);
        o.value = !0, f.value = e[0], d.value = ue(e), F.value = !0, nextTick(() => {
          b.value = !0;
        });
      }
    }
    function G(e, i = !0) {
      if (o.value = !0, F.value = !1, z.value = e, f.value = ue(e), v.value = e[t.primaryKey], y.value) {
        for (const a of y.value)
          if (a.customEditGetter) {
            const u = R(e, a.name);
            U(
              f.value,
              a.name,
              typeof a.customEditGetter == "function" ? a.customEditGetter(u, e) : u
            );
          }
      }
      t.customDefaultValuesOnEdit && (W(t.customDefaultValuesOnEdit), K(t.customDefaultValuesOnEdit)), i && nextTick(() => {
        b.value = !0;
      });
    }
    function ee() {
      b.value = !1;
    }
    function be() {
    }
    const te = useTemplateRef("dialogRef"), { isClosable: ve, dialogStackIndex: We } = se({
      dialogVisibilityRef: b,
      dialogRef: te
    });
    function ye() {
      o.value = !1, f.value = void 0, L.value = void 0, v.value = void 0, z.value = void 0, F.value = !1, d.value = [], h("hidden"), h("visible", !1);
    }
    function ge() {
      t.focusFieldOnShown ? Oe(t.focusFieldOnShown, 100) : o.value ? t.focusFirstOnEdit && ie() : t.focusFirstOnCreate && ie(), h("shown"), h("visible", !0);
    }
    function le(e) {
      return e.multiEditable === !0;
    }
    function Ce(e) {
      if (d.value.length === 0) return !1;
      const i = R(d.value[0], e.name);
      return !d.value.every(
        (u) => we(R(u, e.name), i)
      );
    }
    function W(e) {
      for (const i in e)
        U(f.value, i.split("."), e[i]);
    }
    function he(e) {
      const i = typeof e.defaultValue == "function" ? e.defaultValue() : e.defaultValue;
      U(q.value, e.name.split("."), i);
      for (let a = 0; a < d.value.length; a++)
        U(d.value[a], e.name.split("."), i);
      nextTick(() => {
        m.value?.fieldRefs[e.name]?.focus();
      });
    }
    function Fe() {
      b.value = !1;
    }
    function ie() {
      setTimeout(() => {
        m.value?.focusFirst();
      }, 100);
    }
    function Oe(e, i = 0) {
      setTimeout(() => {
        m.value?.focusField(e);
      }, i);
    }
    const Se = Ie(), { updateDialogVisibility: w } = se();
    function ae(e) {
      if (!e) return;
      let i = 1;
      Array.isArray(e) && (i = e.length);
      const a = toValue(t.popupTarget);
      h("visible", !0), w(!0), Se.require({
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
            let r, O = "delete";
            if (t.deleteUrl)
              if (typeof t.deleteUrl == "function") {
                const n = t.deleteUrl(u[0]);
                r = n.url, O = n.method;
              } else typeof t.deleteUrl == "object" ? (r = t.deleteUrl.url, O = t.deleteUrl.method) : r = t.deleteUrl;
            else
              r = typeof t.url == "object" ? t.url.url : t.url, i === 1 && (r = Y(r, u[0]));
            await S.request({
              url: r,
              method: O,
              params: { ids: u }
            }), S.toastSuccess(s("Deleted!"), s("n Record Deleted Successfully", { n: i }, i)), h("submitted", e, "delete");
          } catch (r) {
            console.error(r), S.toastRequestError(r);
          }
          w(!1);
        },
        reject() {
          w(!1);
        },
        onHide: () => {
          w(!1);
        }
      });
    }
    const A = ref(!1);
    function Te(e, ...i) {
      A.value = !0;
      try {
        G(e), nextTick(() => {
          setTimeout(() => {
            i.forEach(([a, u]) => {
              _(a, u);
            }), k.value.submitForm();
          });
        });
      } catch (a) {
        A.value = !1, S.toastError(a);
      }
    }
    const I = computed(() => ({
      row: z.value ?? f.value,
      submit: k.value?.submitForm,
      cancel: ee
    }));
    function ke() {
      k.value.submitForm().then((e) => {
        e && h("submitAndOpen", e.data ?? e, o.value ? "update" : "create");
      });
    }
    return oe({
      mappedFormFields: y,
      currentValues: q,
      setDefaultValues: W,
      setValue: _,
      getValue: ce,
      setValues: K,
      create: fe,
      editMulti: me,
      edit: G,
      updateDirectly: Te,
      deleteRecord: ae,
      delete: ae,
      close: Fe
    }), (e, i) => {
      const a = J("Button"), u = J("Message"), r = J("Dialog"), O = Ee("tooltip");
      return g(), N(r, {
        ref_key: "dialogRef",
        ref: te,
        visible: l(b),
        "onUpdate:visible": i[1] || (i[1] = (n) => Re(b) ? b.value = n : null),
        "dismissable-mask": t.dismissableMask,
        modal: !l(A),
        "keep-in-viewport": "",
        "close-on-escape": l(ve),
        "content-style": t.dialogContentStyle,
        draggable: !1,
        class: Ve(["w-580px", [t.dialogClass, { "!hidden": l(A) }]]),
        name: t.dialogName,
        onShow: ge,
        onAfterHide: ye
      }, {
        header: c(() => [
          C(e.$slots, "header", {
            row: l(z) ?? l(f)
          }, () => [
            t.title ? (g(), M("div", Pe, [
              E("div", He, D(t.title), 1),
              t.subtitle ? (g(), M("div", {
                key: 0,
                class: "mt-1",
                innerHTML: t.subtitle
              }, null, 8, Ne)) : Q("", !0)
            ])) : (g(), M(Be, { key: 1 }, [
              l(o) ? (g(), M("span", je, D(t.editRecordHeader ?? (l(F) ? l(s)("Edit n Records", { n: l(d).length }, l(d).length) : l(s)("Edit Record"))), 1)) : (g(), M("span", Le, D(t.createRecordHeader ?? (l(Z) ? l(s)("Create n Records", { n: l($).length }, l($).length) : l(s)("Create Record"))), 1))
            ], 64))
          ])
        ]),
        closebutton: c(({ closeCallback: n }) => [
          T(a, {
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
          E("div", Ke, [
            E("div", null, [
              C(e.$slots, "beforeCancelButton", x(B(l(I)))),
              T(a, {
                size: t.size,
                loading: l(m)?.isSubmitting,
                label: l(s)("Cancel"),
                icon: "i-material-symbols:close",
                severity: "secondary",
                outlined: "",
                onClick: ee
              }, null, 8, ["size", "loading", "label"]),
              C(e.$slots, "afterCancel", x(B(l(I))))
            ]),
            E("div", Ge, [
              C(e.$slots, "beforeSubmitButton", x(B(l(I)))),
              T(a, {
                size: t.size,
                loading: l(m)?.isSubmitting,
                disabled: l(m)?.isSubmitting,
                label: l(p).submitText || l(s)("Submit"),
                icon: l(p).submitIcon,
                severity: l(p).submitSeverity,
                onClick: i[0] || (i[0] = (n) => l(k).submitForm())
              }, null, 8, ["size", "loading", "disabled", "label", "icon", "severity"]),
              t.submitAndOpenButton && (typeof t.submitAndOpenButton == "function" ? t.submitAndOpenButton({ isEditing: l(o) }) : t.submitAndOpenButton) ? (g(), N(a, j({
                key: 0,
                size: t.size,
                loading: l(m)?.isSubmitting,
                disabled: l(m)?.isSubmitting,
                label: t.submitAndOpenText ? typeof t.submitAndOpenText == "function" ? t.submitAndOpenText({ isEditing: l(o) }) : t.submitAndOpenText : l(s)("Submit & Open"),
                icon: t.submitAndOpenIcon ? typeof t.submitAndOpenIcon == "function" ? t.submitAndOpenIcon({ isEditing: l(o) }) : t.submitAndOpenIcon : void 0,
                severity: t.submitAndOpenSeverity
              }, t.submitAndOpenProps, { onClick: ke }), null, 16, ["size", "loading", "disabled", "label", "icon", "severity"])) : Q("", !0),
              C(e.$slots, "afterSubmitButton", x(B(l(I))))
            ])
          ])
        ]),
        default: c(() => [
          T(Me, j({
            ref_key: "hddFormRef",
            ref: m
          }, l(p), { onReset: be }), Ue({
            beforeControls: c((n) => [
              C(e.$slots, "beforeControls", x(B(n)))
            ]),
            fieldInput: c(({ field: n, binds: P }) => [
              l(F) && !le(n) ? (g(), N(ne, j({ key: 0 }, P, {
                "helper-text": "",
                "hide-label-double-dots": !1,
                label: n.label ?? n.name,
                "label-single-line": "",
                inline: "",
                disabled: "",
                "button-addon": void 0
              }), {
                default: c(() => [
                  T(u, {
                    severity: "secondary",
                    variant: "simple",
                    size: "small",
                    class: "w-full ps-8"
                  }, {
                    default: c(() => [
                      De(D(l(s)("Unavailable in multi edit")), 1)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 16, ["label"])) : l(F) && le(n) && Ce(n) ? (g(), N(ne, j({ key: 1 }, P, {
                "hide-label-double-dots": !1,
                label: n.label ?? n.name,
                "label-single-line": "",
                inline: "",
                disabled: "",
                "button-addon": void 0
              }), {
                default: c(() => [
                  T(u, {
                    severity: "secondary",
                    variant: "simple",
                    size: "small",
                    class: "w-full ps-8"
                  }, {
                    default: c(() => [
                      E("span", qe, D(l(s)("Different Values")), 1),
                      xe(T(a, {
                        size: "small",
                        variant: "text",
                        raised: "",
                        icon: "pi pi-pencil",
                        severity: "warn",
                        onClick: (H) => he(n)
                      }, null, 8, ["onClick"]), [
                        [O, l(s)("Edit All")]
                      ])
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1040, ["label"])) : Q("", !0)
            ]),
            "buttons-area": c(() => [
              i[2] || (i[2] = E("div", null, null, -1))
            ]),
            _: 2
          }, [
            X(l(y), (n) => ({
              name: `${l(V)(n)}BeforeControl`,
              fn: c(() => [
                C(e.$slots, `${l(V)(n)}BeforeControl`)
              ])
            })),
            X(l(y), (n) => ({
              name: `${l(V)(n)}ControlBody`,
              fn: c(() => [
                C(e.$slots, `${l(V)(n)}ControlBody`)
              ])
            })),
            X(l(y), (n) => ({
              name: `${l(V)(n)}AfterControl`,
              fn: c(() => [
                C(e.$slots, `${l(V)(n)}AfterControl`)
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
  lt as default
};
