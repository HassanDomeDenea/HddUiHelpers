import K from "primevue/tooltip";
import N from "primevue/inputgroup";
import F from "primevue/button";
import x from "primevue/iconfield";
import G from "primevue/inputicon";
import j from "primevue/inputgroupaddon";
import O from "primevue/message";
import { defineComponent as P, useSlots as H, ref as J, computed as Q, useTemplateRef as w, openBlock as t, createElementBlock as i, normalizeClass as f, unref as o, Fragment as y, renderList as U, normalizeStyle as V, toValue as m, createElementVNode as s, renderSlot as d, toDisplayString as k, createBlock as r, withCtx as u, createCommentVNode as n, createVNode as I, withKeys as X, resolveDynamicComponent as Y, withDirectives as Z, mergeProps as p, withModifiers as _ } from "vue";
import { useElementSize as ee } from "@vueuse/core";
import { omit as le } from "lodash-es";
import { FloatLabel as te, IftaLabel as ne } from "primevue";
import { useI18n as oe } from "vue-i18n";
const ae = ["for", "data-label-form-name"], ie = { key: 1 }, re = ["for"], ue = { key: 1 }, se = { class: "text-xs" }, Ce = /* @__PURE__ */ P({
  __name: "BaseInput",
  props: {
    autocomplete: {},
    icon: {},
    uniqueId: {},
    modelValue: {},
    label: {},
    labelMinWidth: {},
    variant: {},
    iconAsAddon: { type: Boolean },
    onLocalEnterKeyDown: { type: Function },
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
    hideLabelDoubleDots: { type: Boolean, default: !0 },
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
  },
  emits: ["labelClicked"],
  setup(e, { expose: A, emit: z }) {
    const $ = z, v = H(), R = J(), { t: C } = oe(), L = Q(() => e.showErrorMessage && e.error), S = w("labelRef"), { width: D } = ee(S, void 0, {
      box: "border-box"
    }), g = w("defaultSlotRef");
    return A({ labelWidth: D, disabled: e.disabled, defaultSlotRef: g }), (l, a) => {
      const h = O, B = j, T = G, E = x, q = F, M = N, W = K;
      return t(), i("div", {
        class: f(["form-control-wrapper hdd-form-control", [
          e.wrapperClass,
          {
            "flex items-center gap-2": e.inline,
            "!items-start": e.inline && (l.$slots.helper || e.helperText || o(L))
          }
        ]])
      }, [
        (t(), i(y, null, U([0, 1, 2], (c) => (t(), i(y, { key: c }, [
          c === 1 && !e.floatingLabel && !e.infieldTopAlignedLabel ? (t(), i("label", {
            key: 0,
            ref_for: !0,
            ref_key: "labelRef",
            ref: S,
            for: e.inputId,
            class: f(["flex items-center gap-1", [
              e.labelClass,
              {
                "text-sm": e.size === "small",
                "text-lg": e.size === "large",
                "form-control-label-selector": !e.ignoreLabelSelector,
                "mt-[8px]": e.inline && (l.$slots.helper || e.helperText || o(L))
              }
            ]]),
            "data-label-form-name": e.formName,
            style: V([
              e.labelStyle,
              {
                minWidth: ("toValue" in l ? l.toValue : o(m))(e.labelMinWidth) ? ("toValue" in l ? l.toValue : o(m))(e.labelMinWidth) + "px" : ""
              }
            ]),
            onClick: a[0] || (a[0] = (b) => $("labelClicked", b))
          }, [
            s("span", {
              class: f([e.icon, e.iconClass])
            }, null, 2),
            d(l.$slots, "labelText", {}, () => [
              e.label ? (t(), i(y, { key: 0 }, [
                s("span", {
                  class: f({ "whitespace-pre": e.labelSingleLine })
                }, k(e.autoI18nLabel === !0 ? o(C)(e.label) : e.label), 3),
                e.required && e.showRequiredAsterisk ? (t(), r(h, {
                  key: 0,
                  variant: "simple",
                  size: "small",
                  severity: e.error ? "error" : "contrast",
                  "aria-hidden": "true"
                }, {
                  default: u(() => [...a[3] || (a[3] = [
                    s("strong", null, "*", -1)
                  ])]),
                  _: 1
                }, 8, ["severity"])) : n("", !0),
                e.hideLabelDoubleDots ? n("", !0) : (t(), i("span", ie, ":"))
              ], 64)) : n("", !0)
            ])
          ], 14, ae)) : n("", !0),
          c === 1 ? d(l.$slots, "afterLabel", { key: 1 }) : n("", !0),
          !e.controlBeforeLabel && c === 2 || e.controlBeforeLabel && c === 0 ? (t(), i("div", {
            key: 2,
            class: f([{ "min-w-0 flex-1": !e.controlBeforeLabel }, e.controlWrapperClass])
          }, [
            I(M, {
              onKeydown: a[2] || (a[2] = X((b) => e.onLocalEnterKeyDown ? e.onLocalEnterKeyDown(b) : null, ["enter"]))
            }, {
              default: u(() => [
                d(l.$slots, "beforeControl"),
                !e.floatingLabel && !e.infieldTopAlignedLabel ? d(l.$slots, "default", {
                  key: 0,
                  ref_for: !0,
                  ref_key: "defaultSlotRef",
                  ref: g
                }) : (t(), i(y, { key: 1 }, [
                  e.iconAsAddon ? (t(), r(B, { key: 0 }, {
                    default: u(() => [
                      s("i", {
                        class: f([e.icon, e.iconClass])
                      }, null, 2)
                    ]),
                    _: 1
                  })) : n("", !0),
                  (t(), r(Y(e.floatingLabel ? o(te) : o(ne)), {
                    variant: e.floatingLabel ? e.floatingLabelVariant ?? "over" : void 0
                  }, {
                    default: u(() => [
                      e.icon && !e.iconAsAddon ? (t(), r(E, { key: 0 }, {
                        default: u(() => [
                          e.icon ? (t(), r(T, {
                            key: 0,
                            class: f(["z-2", [e.icon, e.iconClass]])
                          }, null, 8, ["class"])) : n("", !0),
                          d(l.$slots, "default", {
                            ref_for: !0,
                            ref_key: "defaultSlotRef",
                            ref: g
                          })
                        ]),
                        _: 3
                      })) : d(l.$slots, "default", {
                        key: 1,
                        ref_for: !0,
                        ref_key: "defaultSlotRef",
                        ref: g
                      }),
                      s("label", {
                        for: e.inputId,
                        class: "z-2 flex items-center gap-1",
                        style: V(e.labelStyle)
                      }, [
                        e.label ? (t(), i(y, { key: 0 }, [
                          s("span", {
                            class: f({ "whitespace-pre": e.labelSingleLine })
                          }, k(e.autoI18nLabel === !0 ? o(C)(e.label) : e.label), 3),
                          e.required ? (t(), r(h, {
                            key: 0,
                            variant: "simple",
                            size: "small",
                            severity: e.error ? "error" : "contrast",
                            "aria-hidden": "true"
                          }, {
                            default: u(() => [...a[4] || (a[4] = [
                              s("strong", null, "*", -1)
                            ])]),
                            _: 1
                          }, 8, ["severity"])) : n("", !0),
                          e.hideLabelDoubleDots ? n("", !0) : (t(), i("span", ue, ":"))
                        ], 64)) : n("", !0)
                      ], 12, re)
                    ]),
                    _: 3
                  }, 8, ["variant"]))
                ], 64)),
                d(l.$slots, "afterControl"),
                e.buttonAddon && (("toValue" in l ? l.toValue : o(m))(e.buttonAddon).showable?.({ value: e.modelValue, control: e.controlComponent }) ?? !0) ? (t(), r(B, {
                  key: 2,
                  class: "!min-w-unset"
                }, {
                  default: u(() => [
                    Z(I(q, p({ size: e.size }, { ref_for: !0 }, o(le)(("toValue" in l ? l.toValue : o(m))(e.buttonAddon), ["command", "tooltip"]), {
                      onClick: a[1] || (a[1] = _((b) => ("toValue" in l ? l.toValue : o(m))(e.buttonAddon).command?.({
                        event: b,
                        value: e.modelValue,
                        control: e.controlComponent
                      }), ["stop"]))
                    }), null, 16, ["size"]), [
                      [
                        W,
                        ("toValue" in l ? l.toValue : o(m))(e.buttonAddon).tooltip,
                        void 0,
                        { top: !0 }
                      ]
                    ])
                  ]),
                  _: 1
                })) : n("", !0),
                v.addon ? (t(), r(B, { key: 3 }, {
                  default: u(() => [
                    d(l.$slots, "addon")
                  ]),
                  _: 3
                })) : n("", !0)
              ]),
              _: 3
            }),
            o(L) && typeof e.error == "string" ? (t(), r(h, {
              key: 0,
              id: e.inputId ? `${e.inputId}-error` : "",
              icon: "i-heroicons-exclamation-triangle-20-solid",
              size: "small",
              variant: "simple",
              severity: "error",
              class: "mt-1 px-2"
            }, {
              default: u(() => [
                s("span", null, k(e.error), 1)
              ]),
              _: 1
            }, 8, ["id"])) : n("", !0),
            v.helper?.length || e.helperText ? (t(), r(h, {
              key: 1,
              id: e.inputId ? `${e.inputId}-desc` : "",
              ref_for: !0,
              ref_key: "helperSlotRef",
              ref: R,
              size: "small",
              variant: "simple",
              severity: "secondary",
              class: "mt-1 px-2 text-sm"
            }, {
              default: u(() => [
                d(l.$slots, "helper", {}, () => [
                  s("span", se, k(e.helperText), 1)
                ])
              ]),
              _: 3
            }, 8, ["id"])) : n("", !0)
          ], 2)) : n("", !0)
        ], 64))), 64))
      ], 2);
    };
  }
});
export {
  Ce as _
};
