import { defineComponent as F, useSlots as K, ref as N, computed as G, useTemplateRef as w, resolveComponent as f, resolveDirective as j, openBlock as l, createElementBlock as a, normalizeClass as u, Fragment as y, renderList as O, normalizeStyle as A, toValue as c, createElementVNode as s, renderSlot as d, toDisplayString as L, unref as h, createBlock as i, withCtx as r, createCommentVNode as t, createVNode as x, withKeys as P, resolveDynamicComponent as H, withDirectives as J, mergeProps as Q, withModifiers as U } from "vue";
import { useElementSize as X } from "@vueuse/core";
import { omit as Y } from "lodash-es";
import { FloatLabel as Z, IftaLabel as p } from "primevue";
import { useI18n as _ } from "vue-i18n";
const ee = ["for", "data-label-form-name"], le = { key: 1 }, te = ["for"], ne = { key: 1 }, oe = { class: "text-xs" }, ue = /* @__PURE__ */ F({
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
  setup(e, { expose: z, emit: D }) {
    const R = D, C = K(), $ = N(), { t: I } = _(), v = G(() => e.showErrorMessage && e.error), S = w("labelRef"), { width: T } = X(S, void 0, {
      box: "border-box"
    }), g = w("defaultSlotRef");
    return z({ labelWidth: T, disabled: e.disabled, defaultSlotRef: g }), (n, o) => {
      const k = f("Message"), B = f("InputGroupAddon"), V = f("InputIcon"), E = f("IconField"), M = f("Button"), q = f("InputGroup"), W = j("tooltip");
      return l(), a("div", {
        class: u(["form-control-wrapper hdd-form-control", [
          e.wrapperClass,
          {
            "flex items-center gap-2": e.inline,
            "!items-start": e.inline && (n.$slots.helper || e.helperText || v.value)
          }
        ]])
      }, [
        (l(), a(y, null, O([0, 1, 2], (m) => (l(), a(y, { key: m }, [
          m === 1 && !e.floatingLabel && !e.infieldTopAlignedLabel ? (l(), a("label", {
            key: 0,
            ref_for: !0,
            ref_key: "labelRef",
            ref: S,
            for: e.inputId,
            class: u(["flex items-center gap-1", [
              e.labelClass,
              {
                "text-sm": e.size === "small",
                "text-lg": e.size === "large",
                "form-control-label-selector": !e.ignoreLabelSelector,
                "mt-[8px]": e.inline && (n.$slots.helper || e.helperText || v.value)
              }
            ]]),
            "data-label-form-name": e.formName,
            style: A([
              e.labelStyle,
              {
                minWidth: c(e.labelMinWidth) ? c(e.labelMinWidth) + "px" : ""
              }
            ]),
            onClick: o[0] || (o[0] = (b) => R("labelClicked", b))
          }, [
            s("span", {
              class: u([e.icon, e.iconClass])
            }, null, 2),
            d(n.$slots, "labelText", {}, () => [
              e.label ? (l(), a(y, { key: 0 }, [
                s("span", {
                  class: u({ "whitespace-pre": e.labelSingleLine })
                }, L(e.autoI18nLabel === !0 ? h(I)(e.label) : e.label), 3),
                e.required && e.showRequiredAsterisk ? (l(), i(k, {
                  key: 0,
                  variant: "simple",
                  size: "small",
                  severity: e.error ? "error" : "contrast",
                  "aria-hidden": "true"
                }, {
                  default: r(() => [...o[3] || (o[3] = [
                    s("strong", null, "*", -1)
                  ])]),
                  _: 1
                }, 8, ["severity"])) : t("", !0),
                e.hideLabelDoubleDots ? t("", !0) : (l(), a("span", le, ":"))
              ], 64)) : t("", !0)
            ])
          ], 14, ee)) : t("", !0),
          m === 1 ? d(n.$slots, "afterLabel", { key: 1 }) : t("", !0),
          !e.controlBeforeLabel && m === 2 || e.controlBeforeLabel && m === 0 ? (l(), a("div", {
            key: 2,
            class: u([{ "min-w-0 flex-1": !e.controlBeforeLabel }, e.controlWrapperClass])
          }, [
            x(q, {
              onKeydown: o[2] || (o[2] = P((b) => e.onLocalEnterKeyDown ? e.onLocalEnterKeyDown(b) : null, ["enter"]))
            }, {
              default: r(() => [
                d(n.$slots, "beforeControl"),
                !e.floatingLabel && !e.infieldTopAlignedLabel ? d(n.$slots, "default", {
                  key: 0,
                  ref_for: !0,
                  ref_key: "defaultSlotRef",
                  ref: g
                }) : (l(), a(y, { key: 1 }, [
                  e.iconAsAddon ? (l(), i(B, { key: 0 }, {
                    default: r(() => [
                      s("i", {
                        class: u([e.icon, e.iconClass])
                      }, null, 2)
                    ]),
                    _: 1
                  })) : t("", !0),
                  (l(), i(H(e.floatingLabel ? h(Z) : h(p)), {
                    variant: e.floatingLabel ? e.floatingLabelVariant ?? "over" : void 0
                  }, {
                    default: r(() => [
                      e.icon && !e.iconAsAddon ? (l(), i(E, { key: 0 }, {
                        default: r(() => [
                          e.icon ? (l(), i(V, {
                            key: 0,
                            class: u(["z-2", [e.icon, e.iconClass]])
                          }, null, 8, ["class"])) : t("", !0),
                          d(n.$slots, "default", {
                            ref_for: !0,
                            ref_key: "defaultSlotRef",
                            ref: g
                          })
                        ]),
                        _: 3
                      })) : d(n.$slots, "default", {
                        key: 1,
                        ref_for: !0,
                        ref_key: "defaultSlotRef",
                        ref: g
                      }),
                      s("label", {
                        for: e.inputId,
                        class: "z-2 flex items-center gap-1",
                        style: A(e.labelStyle)
                      }, [
                        e.label ? (l(), a(y, { key: 0 }, [
                          s("span", {
                            class: u({ "whitespace-pre": e.labelSingleLine })
                          }, L(e.autoI18nLabel === !0 ? h(I)(e.label) : e.label), 3),
                          e.required ? (l(), i(k, {
                            key: 0,
                            variant: "simple",
                            size: "small",
                            severity: e.error ? "error" : "contrast",
                            "aria-hidden": "true"
                          }, {
                            default: r(() => [...o[4] || (o[4] = [
                              s("strong", null, "*", -1)
                            ])]),
                            _: 1
                          }, 8, ["severity"])) : t("", !0),
                          e.hideLabelDoubleDots ? t("", !0) : (l(), a("span", ne, ":"))
                        ], 64)) : t("", !0)
                      ], 12, te)
                    ]),
                    _: 3
                  }, 8, ["variant"]))
                ], 64)),
                d(n.$slots, "afterControl", { value: e.modelValue }),
                e.buttonAddon && (c(e.buttonAddon).showable?.({ value: e.modelValue, control: e.controlComponent }) ?? !0) ? (l(), i(B, {
                  key: 2,
                  class: "!min-w-unset"
                }, {
                  default: r(() => [
                    J(x(M, Q({ size: e.size }, { ref_for: !0 }, h(Y)(c(e.buttonAddon), ["command", "tooltip"]), {
                      onClick: o[1] || (o[1] = U((b) => c(e.buttonAddon).command?.({
                        event: b,
                        value: e.modelValue,
                        control: e.controlComponent
                      }), ["stop"]))
                    }), null, 16, ["size"]), [
                      [
                        W,
                        c(e.buttonAddon).tooltip,
                        void 0,
                        { top: !0 }
                      ]
                    ])
                  ]),
                  _: 1
                })) : t("", !0),
                C.addon ? (l(), i(B, { key: 3 }, {
                  default: r(() => [
                    d(n.$slots, "addon")
                  ]),
                  _: 3
                })) : t("", !0)
              ]),
              _: 3
            }),
            v.value && typeof e.error == "string" ? (l(), i(k, {
              key: 0,
              id: e.inputId ? `${e.inputId}-error` : "",
              icon: "i-heroicons-exclamation-triangle-20-solid",
              size: "small",
              variant: "simple",
              severity: "error",
              class: "mt-1 px-2"
            }, {
              default: r(() => [
                s("span", null, L(e.error), 1)
              ]),
              _: 1
            }, 8, ["id"])) : t("", !0),
            C.helper?.length || e.helperText ? (l(), i(k, {
              key: 1,
              id: e.inputId ? `${e.inputId}-desc` : "",
              ref_for: !0,
              ref_key: "helperSlotRef",
              ref: $,
              size: "small",
              variant: "simple",
              severity: "secondary",
              class: "mt-1 px-2 text-sm"
            }, {
              default: r(() => [
                d(n.$slots, "helper", {}, () => [
                  s("span", oe, L(e.helperText), 1)
                ])
              ]),
              _: 3
            }, 8, ["id"])) : t("", !0)
          ], 2)) : t("", !0)
        ], 64))), 64))
      ], 2);
    };
  }
});
export {
  ue as _
};
