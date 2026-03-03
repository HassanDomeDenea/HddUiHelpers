import { defineComponent as _, useModel as V, ref as f, useTemplateRef as $, onMounted as R, onActivated as K, computed as G, toValue as v, resolveComponent as J, resolveDirective as X, openBlock as p, createBlock as B, mergeProps as A, unref as I, withCtx as S, createElementVNode as P, createVNode as Y, withKeys as Z, withDirectives as ee, createCommentVNode as D, resolveDynamicComponent as le, normalizeClass as q, createElementBlock as x, Fragment as te, renderList as re, toDisplayString as ae, mergeModels as E } from "vue";
import { useSortable as oe } from "@vueuse/integrations/useSortable";
import { useConfirmDialogWithInput as se } from "HddUiHelpers/components/ConfirmDialogWithInput/confirmDialogWithInputUtilities.ts";
import { useHddBaseInputUtils as ne } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { useApiClient as ue } from "HddUiHelpers/stores/apiClient.ts";
import { get as C, debounce as ie } from "lodash-es";
import { useConfirm as de } from "primevue/useconfirm";
import { useI18n as ce } from "vue-i18n";
import { _ as pe } from "../../BaseInput.vue_vue_type_script_setup_true_lang-C8yTwTDa.js";
import me from "HddUiHelpers/components/inputs/TextInput.vue";
const fe = { class: "inline-flex items-center gap-2" }, ve = ["onClick"], ke = /* @__PURE__ */ _({
  __name: "TodoListInput",
  props: /* @__PURE__ */ E({
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
  emits: /* @__PURE__ */ E(["change"], ["update:modelValue", "update:newItemValue"]),
  setup(r, { expose: T, emit: ye }) {
    const e = r, s = V(r, "modelValue"), n = V(r, "newItemValue"), { t: o } = ce(), y = f(), L = $("listRef"), z = se(), F = de(), t = ue(), g = f(!1), a = f(!1), c = f({});
    function H() {
      y.value.$el.focus();
    }
    R(() => e.refreshOnMounted && u()), K(() => e.refreshOnActivated && u());
    function M() {
      u(), y.value?.focus?.();
    }
    R(() => {
      y.value.$el.children[0].addEventListener("keydown", (l) => {
        l.key === "Enter" && M();
      });
    });
    const b = G(() => (s.value || []).map((l) => typeof l == "object" ? {
      id: C(l, e.valueProperty),
      name: C(l, e.labelProperty, l.id),
      item: l
    } : {
      id: l,
      name: l
    })), k = () => {
      e.serverUrls?.store ? (a.value = !0, t.request(e.serverUrls.store(), {
        [e.labelProperty]: n.value,
        ...v(e.urlStorePayload)
      }).then(() => {
        u(), t.toastSuccess(e.storeSuccessMessage ?? o("Item added successfully"));
      }).catch(t.toastRequestError).finally(() => {
        a.value = !1, n.value = null;
      })) : (Array.isArray(s.value) ? s.value.push(n.value) : s.value = [n.value], n.value = null);
    }, O = (l, i, m) => {
      e.confirmBeforeRemove || e.serverUrls?.destroy ? F.require({
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
          e.serverUrls?.store ? (a.value = !0, c.value[l.id] = !0, t.request(
            e.serverUrls.destroy(l.id, {
              query: v(e.urlDeleteQueryParams)
            })
          ).then(() => {
            u(), t.toastSuccess(e.removeSuccessMessage ?? o("Item removed successfully"));
          }).catch(t.toastRequestError).finally(() => {
            a.value = !1, c.value[l.id] = void 0;
          })) : s.value.splice(i, 1);
        },
        defaultFocus: "accept"
      }) : s.value.splice(i, 1);
    }, j = (l, i, m) => {
      !e.editable || c.value[l.id] || z.show({
        initialValue: l.name,
        autoSelectText: !0,
        inputType: "text",
        header: e.updateDialogHeaderMessage ?? o("Update Item"),
        acceptIcon: "i-mdi-check",
        rejectLabel: o("Cancel"),
        acceptLabel: o("Update"),
        accept: (h) => {
          e.serverUrls?.store ? (a.value = !0, c.value[l.id] = !0, t.request(e.serverUrls.update(l.id), {
            [e.labelProperty]: h,
            ...v(e.urlUpdatePayload ?? e.urlStorePayload)
          }).then(() => {
            u(), t.toastSuccess(e.updateSuccessMessage ?? o("Item updated successfully"));
          }).catch(t.toastRequestError).finally(() => {
            a.value = !1, c.value[l.id] = void 0;
          })) : s.value[i] = h;
        },
        defaultFocus: "accept"
      });
    }, u = ie(() => {
      e.serverUrls?.list && (g.value = !0, t.request(
        e.serverUrls.list({
          query: v(e.urlListQueryParams)
        })
      ).then((l) => {
        s.value = l.data.data;
      }).catch(t.toastRequestError).finally(() => {
        g.value = !1;
      }));
    }, 10);
    e.reorderable && oe(L, b, {
      handle: ".reorder-handle",
      onUpdate: (l) => {
        a.value = !0, t.request(
          e.serverUrls.reorder({
            query: {
              from_order: C(b.value[l.oldIndex]?.item, e.orderSequenceProperty),
              to_order: C(b.value[l.newIndex]?.item, e.orderSequenceProperty),
              scoped_values: v(e.urlReorderScopedValues ?? e.urlStorePayload)
            }
          })
        ).then(() => {
          u();
        }).catch(t.toastRequestError).finally(() => {
          a.value = !1;
        });
      }
    });
    const { exposed: N, baseInputForwardedProps: Q, fieldUniqueId: ge, generalInputProps: W } = ne(e);
    return T({ focus: H, ...N }), (l, i) => {
      const m = J("Button"), h = X("tooltip");
      return p(), B(pe, A(I(Q), {
        "floating-label": !1,
        "infield-top-aligned-label": !1,
        onLabelClicked: M
      }), {
        default: S(() => [
          P("div", null, [
            Y(me, A({
              ref_key: "inputRef",
              ref: y,
              modelValue: n.value,
              "onUpdate:modelValue": i[0] || (i[0] = (d) => n.value = d),
              autocomplete: "off",
              size: "small",
              placeholder: r.placeholder
            }, { ...I(W), ...r.newItemInputProps }, {
              readonly: a.value,
              onKeydown: Z(k, ["enter"])
            }), {
              afterControl: S(() => [
                r.creatable ? ee((p(), B(m, {
                  key: 0,
                  icon: "i-mdi-plus",
                  size: "small",
                  disabled: !s.value || g.value || a.value,
                  loading: g.value || a.value,
                  onClick: k
                }, null, 8, ["disabled", "loading"])), [
                  [h, I(o)("Add")]
                ]) : D("", !0)
              ]),
              _: 1
            }, 16, ["modelValue", "placeholder", "readonly"]),
            (p(), B(le(r.numericList ? "ol" : "ul"), {
              ref_key: "listRef",
              ref: L,
              class: q(["ms-4 mt-2 list-disc space-y-1", { "list-decimal-inside": r.numericList, "list-disc-inside": !r.numericList }])
            }, {
              default: S(() => [
                (p(!0), x(te, null, re(b.value, (d, w) => (p(), x("li", {
                  key: d.id,
                  class: q({ "reorder-handle": !a.value && r.reorderable })
                }, [
                  P("div", fe, [
                    P("span", {
                      class: q(["font-bold", { "cursor-pointer underline-offset-4 hover:underline": r.editable }]),
                      onClick: (U) => j(d, w)
                    }, ae(d.name), 11, ve),
                    r.removable ? (p(), B(m, {
                      key: 0,
                      title: I(o)("Remove"),
                      icon: "i-mdi-close",
                      loading: c.value[d.id],
                      size: "small",
                      severity: "danger",
                      text: "",
                      onClick: (U) => O(d, w, U)
                    }, null, 8, ["title", "loading", "onClick"])) : D("", !0)
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
  ke as default
};
