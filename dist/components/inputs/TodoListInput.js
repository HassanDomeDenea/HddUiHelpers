import W from "primevue/tooltip";
import { _ as K } from "../../TextInput.vue_vue_type_script_setup_true_lang-CDqh5_am.js";
import G from "primevue/button";
import { defineComponent as J, useModel as V, ref as f, useTemplateRef as X, onMounted as R, onActivated as Y, computed as Z, toValue as v, openBlock as p, createBlock as I, mergeProps as A, unref as y, withCtx as S, createElementVNode as P, createVNode as ee, withKeys as te, withDirectives as le, createCommentVNode as _, resolveDynamicComponent as re, normalizeClass as q, createElementBlock as x, Fragment as ae, renderList as oe, toDisplayString as se, mergeModels as D } from "vue";
import { useSortable as ne } from "@vueuse/integrations/useSortable";
import { useConfirmDialogWithInput as ue } from "HddUiHelpers/components/ConfirmDialogWithInput/confirmDialogWithInputUtilities.ts";
import { useHddBaseInputUtils as ie } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { useApiClient as de } from "HddUiHelpers/stores/apiClient.ts";
import { get as C, debounce as ce } from "lodash-es";
import { useConfirm as pe } from "primevue/useconfirm";
import { _ as me } from "../../BaseInput.vue_vue_type_script_setup_true_lang-Ca5DqyVP.js";
import { useI18n as fe } from "vue-i18n";
const ve = { class: "inline-flex items-center gap-2" }, ye = ["onClick"], Ve = /* @__PURE__ */ J({
  __name: "TodoListInput",
  props: /* @__PURE__ */ D({
    newItemInputProps: {},
    numericList: { type: Boolean },
    removable: { type: Boolean, default: !0 },
    creatable: { type: Boolean, default: !0 },
    editable: { type: Boolean },
    reorderable: { type: Boolean, default: !0 },
    serverUrls: {},
    labelProperty: { default: "name" },
    valueProperty: { default: "id" },
    orderSequenceProperty: { default: "order_sequence" },
    storeSuccessMessage: {},
    updateSuccessMessage: {},
    removeSuccessMessage: {},
    removeConfirmHeaderMessage: {},
    removeConfirmBodyMessage: {},
    updateDialogHeaderMessage: {},
    urlDeleteQueryParams: {},
    urlListQueryParams: {},
    urlStorePayload: {},
    urlUpdatePayload: {},
    urlReorderScopedValues: {},
    refreshOnMounted: { type: Boolean, default: !0 },
    refreshOnActivated: { type: Boolean, default: !1 },
    confirmBeforeRemove: { type: Boolean },
    autocomplete: {},
    icon: {},
    uniqueId: {},
    modelValue: {},
    label: {},
    labelMinWidth: {},
    variant: {},
    iconAsAddon: { type: Boolean },
    onLocalEnterKeyDown: {},
    floatingLabel: { type: Boolean },
    showErrorMessage: { type: Boolean },
    floatingLabelVariant: {},
    infieldTopAlignedLabel: { type: Boolean },
    inputId: {},
    required: { type: Boolean },
    showRequiredAsterisk: { type: Boolean },
    requiredInLabel: { type: Boolean },
    formName: {},
    name: {},
    error: { type: [String, Boolean] },
    helperText: {},
    placeholder: {},
    autoI18nLabel: { type: Boolean },
    disabled: { type: Boolean },
    readonly: { type: Boolean },
    inline: { type: Boolean },
    controlBeforeLabel: { type: Boolean },
    labelSingleLine: { type: Boolean },
    hideLabelDoubleDots: { type: Boolean },
    ignoreLabelSelector: { type: Boolean },
    labelClass: {},
    labelStyle: { type: [Boolean, null, String, Object, Array] },
    iconClass: {},
    inputClass: {},
    wrapperClass: {},
    controlWrapperClass: {},
    size: {},
    buttonAddon: {},
    controlComponent: {}
  }, {
    modelValue: { default: f([]).value },
    modelModifiers: {},
    newItemValue: {},
    newItemValueModifiers: {}
  }),
  emits: /* @__PURE__ */ D(["change"], ["update:modelValue", "update:newItemValue"]),
  setup(r, { expose: E, emit: ge }) {
    const e = r, s = V(r, "modelValue"), n = V(r, "newItemValue"), { t: o } = fe(), g = f(), L = X("listRef"), T = ue(), z = pe(), l = de(), b = f(!1), a = f(!1), c = f({});
    function F() {
      g.value.$el.focus();
    }
    R(() => e.refreshOnMounted && u()), Y(() => e.refreshOnActivated && u());
    function M() {
      u(), g.value?.focus?.();
    }
    R(() => {
      g.value.$el.children[0].addEventListener("keydown", (t) => {
        t.key === "Enter" && M();
      });
    });
    const h = Z(() => (s.value || []).map((t) => typeof t == "object" ? {
      id: C(t, e.valueProperty),
      name: C(t, e.labelProperty, t.id),
      item: t
    } : {
      id: t,
      name: t
    })), k = () => {
      e.serverUrls?.store ? (a.value = !0, l.request(e.serverUrls.store(), {
        [e.labelProperty]: n.value,
        ...v(e.urlStorePayload)
      }).then(() => {
        u(), l.toastSuccess(e.storeSuccessMessage ?? o("Item added successfully"));
      }).catch(l.toastRequestError).finally(() => {
        a.value = !1, n.value = null;
      })) : (Array.isArray(s.value) ? s.value.push(n.value) : s.value = [n.value], n.value = null);
    }, H = (t, i, m) => {
      e.confirmBeforeRemove || e.serverUrls?.destroy ? z.require({
        target: m.target,
        message: e.removeConfirmBodyMessage ?? o("Are you sure you want to remove this item?"),
        header: e.removeConfirmHeaderMessage ?? o("Remove item"),
        icon: "i-mdi-alert-circle text-danger",
        group: "popup",
        acceptIcon: "i-mdi-check",
        acceptClass: "font-bold",
        acceptProps: {
          severity: "danger"
        },
        rejectProps: {
          severity: "secondary"
        },
        accept: () => {
          e.serverUrls?.store ? (a.value = !0, c.value[t.id] = !0, l.request(
            e.serverUrls.destroy(t.id, {
              query: v(e.urlDeleteQueryParams)
            })
          ).then(() => {
            u(), l.toastSuccess(e.removeSuccessMessage ?? o("Item removed successfully"));
          }).catch(l.toastRequestError).finally(() => {
            a.value = !1, c.value[t.id] = void 0;
          })) : s.value.splice(i, 1);
        },
        defaultFocus: "accept"
      }) : s.value.splice(i, 1);
    }, O = (t, i, m) => {
      !e.editable || c.value[t.id] || T.show({
        initialValue: t.name,
        autoSelectText: !0,
        inputType: "text",
        header: e.updateDialogHeaderMessage ?? o("Update Item"),
        acceptIcon: "i-mdi-check",
        rejectLabel: o("Cancel"),
        acceptLabel: o("Update"),
        accept: (B) => {
          e.serverUrls?.store ? (a.value = !0, c.value[t.id] = !0, l.request(e.serverUrls.update(t.id), {
            [e.labelProperty]: B,
            ...v(e.urlUpdatePayload ?? e.urlStorePayload)
          }).then(() => {
            u(), l.toastSuccess(e.updateSuccessMessage ?? o("Item updated successfully"));
          }).catch(l.toastRequestError).finally(() => {
            a.value = !1, c.value[t.id] = void 0;
          })) : s.value[i] = B;
        },
        defaultFocus: "accept"
      });
    }, u = ce(() => {
      e.serverUrls?.list && (b.value = !0, l.request(
        e.serverUrls.list({
          query: v(e.urlListQueryParams)
        })
      ).then((t) => {
        s.value = t.data.data;
      }).catch(l.toastRequestError).finally(() => {
        b.value = !1;
      }));
    }, 10);
    e.reorderable && ne(L, h, {
      handle: ".reorder-handle",
      onUpdate: (t) => {
        a.value = !0, l.request(
          e.serverUrls.reorder({
            query: {
              from_order: C(h.value[t.oldIndex]?.item, e.orderSequenceProperty),
              to_order: C(h.value[t.newIndex]?.item, e.orderSequenceProperty),
              scoped_values: v(e.urlReorderScopedValues ?? e.urlStorePayload)
            }
          })
        ).then(() => {
          u();
        }).catch(l.toastRequestError).finally(() => {
          a.value = !1;
        });
      }
    });
    const { exposed: $, baseInputForwardedProps: j, fieldUniqueId: be, generalInputProps: N } = ie(e);
    return E({ focus: F, ...$ }), (t, i) => {
      const m = G, B = K, Q = W;
      return p(), I(me, A(y(j), {
        "floating-label": !1,
        "infield-top-aligned-label": !1,
        onLabelClicked: M
      }), {
        default: S(() => [
          P("div", null, [
            ee(B, A({
              ref_key: "inputRef",
              ref: g,
              modelValue: n.value,
              "onUpdate:modelValue": i[0] || (i[0] = (d) => n.value = d),
              autocomplete: "off",
              size: "small",
              placeholder: r.placeholder
            }, { ...y(N), ...r.newItemInputProps }, {
              readonly: a.value,
              onKeydown: te(k, ["enter"])
            }), {
              afterControl: S(() => [
                r.creatable ? le((p(), I(m, {
                  key: 0,
                  icon: "i-mdi-plus",
                  size: "small",
                  disabled: !s.value || b.value || a.value,
                  loading: b.value || a.value,
                  onClick: k
                }, null, 8, ["disabled", "loading"])), [
                  [Q, y(o)("Add")]
                ]) : _("", !0)
              ]),
              _: 1
            }, 16, ["modelValue", "placeholder", "readonly"]),
            (p(), I(re(r.numericList ? "ol" : "ul"), {
              ref_key: "listRef",
              ref: L,
              class: q(["ms-4 mt-2 list-disc space-y-1", { "list-decimal-inside": r.numericList, "list-disc-inside": !r.numericList }])
            }, {
              default: S(() => [
                (p(!0), x(ae, null, oe(y(h), (d, w) => (p(), x("li", {
                  key: d.id,
                  class: q({ "reorder-handle": !a.value && r.reorderable })
                }, [
                  P("div", ve, [
                    P("span", {
                      class: q(["font-bold", { "cursor-pointer underline-offset-4 hover:underline": r.editable }]),
                      onClick: (U) => O(d, w)
                    }, se(d.name), 11, ye),
                    r.removable ? (p(), I(m, {
                      key: 0,
                      title: y(o)("Remove"),
                      icon: "i-mdi-close",
                      loading: c.value[d.id],
                      size: "small",
                      severity: "danger",
                      text: "",
                      onClick: (U) => H(d, w, U)
                    }, null, 8, ["title", "loading", "onClick"])) : _("", !0)
                  ])
                ], 2))), 128))
              ]),
              _: 1
            }, 8, ["class"]))
          ])
        ]),
        _: 1
      }, 16);
    };
  }
});
export {
  Ve as default
};
