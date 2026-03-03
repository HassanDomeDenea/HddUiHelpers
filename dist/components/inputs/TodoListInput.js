import { defineComponent as W, useModel as w, ref as f, resolveComponent as U, resolveDirective as $, openBlock as p, createBlock as B, mergeProps as R, unref as v, withCtx as C, createElementVNode as S, createVNode as K, withKeys as G, withDirectives as J, createCommentVNode as A, resolveDynamicComponent as X, normalizeClass as P, createElementBlock as x, Fragment as Y, renderList as Z, toDisplayString as ee, mergeModels as D } from "vue";
import { useSortable as te } from "@vueuse/integrations/useSortable";
import { useConfirmDialogWithInput as le } from "HddUiHelpers/components/ConfirmDialogWithInput/confirmDialogWithInputUtilities.ts";
import { useHddBaseInputUtils as oe } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { useApiClient as ae } from "HddUiHelpers/stores/apiClient.ts";
import { get as I, debounce as re } from "lodash-es";
import { useConfirm as se } from "primevue/useconfirm";
import { _ as ne } from "../../BaseInput.vue_vue_type_script_setup_true_lang-DGVI56PE.js";
const ue = { class: "inline-flex items-center gap-2" }, ie = ["onClick"], Be = /* @__PURE__ */ W({
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
  setup(o, { expose: E, emit: de }) {
    const e = o, s = w(o, "modelValue"), n = w(o, "newItemValue"), { t: r } = useI18n(), y = f(), q = useTemplateRef("listRef"), T = le(), _ = se(), l = ae(), g = f(!1), a = f(!1), c = f({});
    function z() {
      y.value.$el.focus();
    }
    onMounted(() => e.refreshOnMounted && u()), onActivated(() => e.refreshOnActivated && u());
    function L() {
      u(), y.value?.focus?.();
    }
    onMounted(() => {
      y.value.$el.children[0].addEventListener("keydown", (t) => {
        t.key === "Enter" && L();
      });
    });
    const b = computed(() => (s.value || []).map((t) => typeof t == "object" ? {
      id: I(t, e.valueProperty),
      name: I(t, e.labelProperty, t.id),
      item: t
    } : {
      id: t,
      name: t
    })), V = () => {
      e.serverUrls?.store ? (a.value = !0, l.request(e.serverUrls.store(), {
        [e.labelProperty]: n.value,
        ...toValue(e.urlStorePayload)
      }).then(() => {
        u(), l.toastSuccess(e.storeSuccessMessage ?? r("Item added successfully"));
      }).catch(l.toastRequestError).finally(() => {
        a.value = !1, n.value = null;
      })) : (Array.isArray(s.value) ? s.value.push(n.value) : s.value = [n.value], n.value = null);
    }, F = (t, i, m) => {
      e.confirmBeforeRemove || e.serverUrls?.destroy ? _.require({
        target: m.target,
        message: e.removeConfirmBodyMessage ?? r("Are you sure you want to remove this item?"),
        header: e.removeConfirmHeaderMessage ?? r("Remove item"),
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
              query: toValue(e.urlDeleteQueryParams)
            })
          ).then(() => {
            u(), l.toastSuccess(e.removeSuccessMessage ?? r("Item removed successfully"));
          }).catch(l.toastRequestError).finally(() => {
            a.value = !1, c.value[t.id] = void 0;
          })) : s.value.splice(i, 1);
        },
        defaultFocus: "accept"
      }) : s.value.splice(i, 1);
    }, H = (t, i, m) => {
      !e.editable || c.value[t.id] || T.show({
        initialValue: t.name,
        autoSelectText: !0,
        inputType: "text",
        header: e.updateDialogHeaderMessage ?? r("Update Item"),
        acceptIcon: "i-mdi-check",
        rejectLabel: r("Cancel"),
        acceptLabel: r("Update"),
        accept: (h) => {
          e.serverUrls?.store ? (a.value = !0, c.value[t.id] = !0, l.request(e.serverUrls.update(t.id), {
            [e.labelProperty]: h,
            ...toValue(e.urlUpdatePayload ?? e.urlStorePayload)
          }).then(() => {
            u(), l.toastSuccess(e.updateSuccessMessage ?? r("Item updated successfully"));
          }).catch(l.toastRequestError).finally(() => {
            a.value = !1, c.value[t.id] = void 0;
          })) : s.value[i] = h;
        },
        defaultFocus: "accept"
      });
    }, u = re(() => {
      e.serverUrls?.list && (g.value = !0, l.request(
        e.serverUrls.list({
          query: toValue(e.urlListQueryParams)
        })
      ).then((t) => {
        s.value = t.data.data;
      }).catch(l.toastRequestError).finally(() => {
        g.value = !1;
      }));
    }, 10);
    e.reorderable && te(q, b, {
      handle: ".reorder-handle",
      onUpdate: (t) => {
        a.value = !0, l.request(
          e.serverUrls.reorder({
            query: {
              from_order: I(b.value[t.oldIndex]?.item, e.orderSequenceProperty),
              to_order: I(b.value[t.newIndex]?.item, e.orderSequenceProperty),
              scoped_values: toValue(e.urlReorderScopedValues ?? e.urlStorePayload)
            }
          })
        ).then(() => {
          u();
        }).catch(l.toastRequestError).finally(() => {
          a.value = !1;
        });
      }
    });
    const { exposed: O, baseInputForwardedProps: j, fieldUniqueId: ce, generalInputProps: N } = oe(e);
    return E({ focus: z, ...O }), (t, i) => {
      const m = U("Button"), h = U("TextInput"), Q = $("tooltip");
      return p(), B(ne, R(v(j), {
        "floating-label": !1,
        "infield-top-aligned-label": !1,
        onLabelClicked: L
      }), {
        default: C(() => [
          S("div", null, [
            K(h, R({
              ref_key: "inputRef",
              ref: y,
              modelValue: n.value,
              "onUpdate:modelValue": i[0] || (i[0] = (d) => n.value = d),
              autocomplete: "off",
              size: "small",
              placeholder: o.placeholder
            }, { ...v(N), ...o.newItemInputProps }, {
              readonly: a.value,
              onKeydown: G(V, ["enter"])
            }), {
              afterControl: C(() => [
                o.creatable ? J((p(), B(m, {
                  key: 0,
                  icon: "i-mdi-plus",
                  size: "small",
                  disabled: !s.value || g.value || a.value,
                  loading: g.value || a.value,
                  onClick: V
                }, null, 8, ["disabled", "loading"])), [
                  [Q, v(r)("Add")]
                ]) : A("", !0)
              ]),
              _: 1
            }, 16, ["modelValue", "placeholder", "readonly"]),
            (p(), B(X(o.numericList ? "ol" : "ul"), {
              ref_key: "listRef",
              ref: q,
              class: P(["ms-4 mt-2 list-disc space-y-1", { "list-decimal-inside": o.numericList, "list-disc-inside": !o.numericList }])
            }, {
              default: C(() => [
                (p(!0), x(Y, null, Z(v(b), (d, M) => (p(), x("li", {
                  key: d.id,
                  class: P({ "reorder-handle": !a.value && o.reorderable })
                }, [
                  S("div", ue, [
                    S("span", {
                      class: P(["font-bold", { "cursor-pointer underline-offset-4 hover:underline": o.editable }]),
                      onClick: (k) => H(d, M)
                    }, ee(d.name), 11, ie),
                    o.removable ? (p(), B(m, {
                      key: 0,
                      title: v(r)("Remove"),
                      icon: "i-mdi-close",
                      loading: c.value[d.id],
                      size: "small",
                      severity: "danger",
                      text: "",
                      onClick: (k) => F(d, M, k)
                    }, null, 8, ["title", "loading", "onClick"])) : A("", !0)
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
  Be as default
};
