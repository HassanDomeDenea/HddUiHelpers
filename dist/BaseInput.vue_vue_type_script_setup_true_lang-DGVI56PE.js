import { defineComponent as W, useSlots as F, useTemplateRef as S, resolveComponent as m, resolveDirective as K, openBlock as l, createElementBlock as a, normalizeClass as u, unref as f, Fragment as y, renderList as N, normalizeStyle as w, createElementVNode as s, renderSlot as d, toDisplayString as k, createBlock as i, withCtx as r, createCommentVNode as n, createVNode as A, withKeys as G, resolveDynamicComponent as j, withDirectives as O, mergeProps as P, withModifiers as H } from "vue";
import { useElementSize as J } from "@vueuse/core";
import { omit as Q } from "lodash-es";
import { FloatLabel as U, IftaLabel as X } from "primevue";
import { useI18n as Y } from "vue-i18n";
const Z = ["for", "data-label-form-name"], p = { key: 1 }, _ = ["for"], ee = { key: 1 }, le = { class: "text-xs" }, re = /* @__PURE__ */ W({
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
  setup(e, { expose: z, emit: V }) {
    const D = V, B = F(), R = ref(), { t: C } = Y(), L = computed(() => e.showErrorMessage && e.error), I = S("labelRef"), { width: $ } = J(I, void 0, {
      box: "border-box"
    }), h = S("defaultSlotRef");
    return z({ labelWidth: $, disabled: e.disabled, defaultSlotRef: h }), (t, o) => {
      const g = m("Message"), v = m("InputGroupAddon"), T = m("InputIcon"), x = m("IconField"), E = m("Button"), M = m("InputGroup"), q = K("tooltip");
      return l(), a("div", {
        class: u(["form-control-wrapper hdd-form-control", [
          e.wrapperClass,
          {
            "flex items-center gap-2": e.inline,
            "!items-start": e.inline && (t.$slots.helper || e.helperText || f(L))
          }
        ]])
      }, [
        (l(), a(y, null, N([0, 1, 2], (c) => (l(), a(y, { key: c }, [
          c === 1 && !e.floatingLabel && !e.infieldTopAlignedLabel ? (l(), a("label", {
            key: 0,
            ref_for: !0,
            ref_key: "labelRef",
            ref: I,
            for: e.inputId,
            class: u(["flex items-center gap-1", [
              e.labelClass,
              {
                "text-sm": e.size === "small",
                "text-lg": e.size === "large",
                "form-control-label-selector": !e.ignoreLabelSelector,
                "mt-[8px]": e.inline && (t.$slots.helper || e.helperText || f(L))
              }
            ]]),
            "data-label-form-name": e.formName,
            style: w([
              e.labelStyle,
              {
                minWidth: t.toValue(e.labelMinWidth) ? t.toValue(e.labelMinWidth) + "px" : ""
              }
            ]),
            onClick: o[0] || (o[0] = (b) => D("labelClicked", b))
          }, [
            s("span", {
              class: u([e.icon, e.iconClass])
            }, null, 2),
            d(t.$slots, "labelText", {}, () => [
              e.label ? (l(), a(y, { key: 0 }, [
                s("span", {
                  class: u({ "whitespace-pre": e.labelSingleLine })
                }, k(e.autoI18nLabel === !0 ? f(C)(e.label) : e.label), 3),
                e.required && e.showRequiredAsterisk ? (l(), i(g, {
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
                }, 8, ["severity"])) : n("", !0),
                e.hideLabelDoubleDots ? n("", !0) : (l(), a("span", p, ":"))
              ], 64)) : n("", !0)
            ])
          ], 14, Z)) : n("", !0),
          c === 1 ? d(t.$slots, "afterLabel", { key: 1 }) : n("", !0),
          !e.controlBeforeLabel && c === 2 || e.controlBeforeLabel && c === 0 ? (l(), a("div", {
            key: 2,
            class: u([{ "min-w-0 flex-1": !e.controlBeforeLabel }, e.controlWrapperClass])
          }, [
            A(M, {
              onKeydown: o[2] || (o[2] = G((b) => e.onLocalEnterKeyDown ? e.onLocalEnterKeyDown(b) : null, ["enter"]))
            }, {
              default: r(() => [
                d(t.$slots, "beforeControl"),
                !e.floatingLabel && !e.infieldTopAlignedLabel ? d(t.$slots, "default", {
                  key: 0,
                  ref_for: !0,
                  ref_key: "defaultSlotRef",
                  ref: h
                }) : (l(), a(y, { key: 1 }, [
                  e.iconAsAddon ? (l(), i(v, { key: 0 }, {
                    default: r(() => [
                      s("i", {
                        class: u([e.icon, e.iconClass])
                      }, null, 2)
                    ]),
                    _: 1
                  })) : n("", !0),
                  (l(), i(j(e.floatingLabel ? f(U) : f(X)), {
                    variant: e.floatingLabel ? e.floatingLabelVariant ?? "over" : void 0
                  }, {
                    default: r(() => [
                      e.icon && !e.iconAsAddon ? (l(), i(x, { key: 0 }, {
                        default: r(() => [
                          e.icon ? (l(), i(T, {
                            key: 0,
                            class: u(["z-2", [e.icon, e.iconClass]])
                          }, null, 8, ["class"])) : n("", !0),
                          d(t.$slots, "default", {
                            ref_for: !0,
                            ref_key: "defaultSlotRef",
                            ref: h
                          })
                        ]),
                        _: 3
                      })) : d(t.$slots, "default", {
                        key: 1,
                        ref_for: !0,
                        ref_key: "defaultSlotRef",
                        ref: h
                      }),
                      s("label", {
                        for: e.inputId,
                        class: "z-2 flex items-center gap-1",
                        style: w(e.labelStyle)
                      }, [
                        e.label ? (l(), a(y, { key: 0 }, [
                          s("span", {
                            class: u({ "whitespace-pre": e.labelSingleLine })
                          }, k(e.autoI18nLabel === !0 ? f(C)(e.label) : e.label), 3),
                          e.required ? (l(), i(g, {
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
                          }, 8, ["severity"])) : n("", !0),
                          e.hideLabelDoubleDots ? n("", !0) : (l(), a("span", ee, ":"))
                        ], 64)) : n("", !0)
                      ], 12, _)
                    ]),
                    _: 3
                  }, 8, ["variant"]))
                ], 64)),
                d(t.$slots, "afterControl"),
                e.buttonAddon && (t.toValue(e.buttonAddon).showable?.({ value: e.modelValue, control: e.controlComponent }) ?? !0) ? (l(), i(v, {
                  key: 2,
                  class: "!min-w-unset"
                }, {
                  default: r(() => [
                    O(A(E, P({ size: e.size }, { ref_for: !0 }, f(Q)(t.toValue(e.buttonAddon), ["command", "tooltip"]), {
                      onClick: o[1] || (o[1] = H((b) => t.toValue(e.buttonAddon).command?.({
                        event: b,
                        value: e.modelValue,
                        control: e.controlComponent
                      }), ["stop"]))
                    }), null, 16, ["size"]), [
                      [
                        q,
                        t.toValue(e.buttonAddon).tooltip,
                        void 0,
                        { top: !0 }
                      ]
                    ])
                  ]),
                  _: 1
                })) : n("", !0),
                B.addon ? (l(), i(v, { key: 3 }, {
                  default: r(() => [
                    d(t.$slots, "addon")
                  ]),
                  _: 3
                })) : n("", !0)
              ]),
              _: 3
            }),
            f(L) && typeof e.error == "string" ? (l(), i(g, {
              key: 0,
              id: e.inputId ? `${e.inputId}-error` : "",
              icon: "i-heroicons-exclamation-triangle-20-solid",
              size: "small",
              variant: "simple",
              severity: "error",
              class: "mt-1 px-2"
            }, {
              default: r(() => [
                s("span", null, k(e.error), 1)
              ]),
              _: 1
            }, 8, ["id"])) : n("", !0),
            B.helper?.length || e.helperText ? (l(), i(g, {
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
              default: r(() => [
                d(t.$slots, "helper", {}, () => [
                  s("span", le, k(e.helperText), 1)
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
  re as _
};
