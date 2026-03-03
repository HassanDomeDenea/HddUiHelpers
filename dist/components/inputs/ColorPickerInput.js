import { defineComponent as E, useModel as j, ref as S, resolveComponent as F, openBlock as r, createBlock as b, mergeProps as G, unref as n, withCtx as g, createElementVNode as u, createElementBlock as d, createCommentVNode as f, resolveDynamicComponent as J, withModifiers as U, normalizeClass as c, Fragment as x, renderList as P, normalizeStyle as C, createVNode as I, withDirectives as W, vModelText as H, renderSlot as K, createSlots as Q, mergeModels as D } from "vue";
import { useHddBaseInputUtils as X } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { uniq as Y, take as Z } from "lodash-es";
import _ from "primevue/popover";
import { _ as ee } from "../../BaseInput.vue_vue_type_script_setup_true_lang-DGVI56PE.js";
const oe = { ref: "relative" }, le = { class: "m-1 flex flex-wrap gap-1" }, te = ["disabled", "onClick"], ae = {
  key: 0,
  class: "m-1 mt-3 flex flex-wrap gap-1"
}, ne = ["disabled", "onClick"], ie = { class: "flex justify-center" }, re = {
  key: 0,
  class: "mt-2 flex items-center justify-center gap-1"
}, se = ["disabled"], me = /* @__PURE__ */ E({
  __name: "ColorPickerInput",
  props: /* @__PURE__ */ D({
    colors: {},
    autoOpen: { type: Boolean, default: !1 },
    autoDismiss: { type: Boolean },
    asPopover: { type: Boolean, default: !0 },
    appendInline: { type: Boolean, default: !1 },
    withTrigger: { type: Boolean, default: !0 },
    clearable: { type: Boolean },
    customSelector: { type: Boolean, default: !0 },
    withRecentColors: { type: Boolean, default: !0 },
    recentColorsGroupName: {},
    triggerButtonColorBoxClass: {},
    triggerButtonSeverity: { default: "secondary" },
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
    modelValue: { default: S().value },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ D(["change"], ["update:modelValue"]),
  setup(e, { expose: z, emit: L }) {
    const a = e, p = L, o = j(e, "modelValue"), { t: m } = useI18n(), B = S(), h = useTemplateRef("customColorInputRef"), s = useTemplateRef(
      "colorPalateContainerRef"
    ), T = useTemplateRef("colorsContainerDivRef"), k = useTemplateRef("popoverShowContainerRef");
    function w() {
      B.value.$el.click();
    }
    const V = computed(() => a.colors ?? [
      "#000000",
      "#ffffff",
      "#cccccc",
      "#8d8d8d",
      "#525252",
      "#2d2d2d",
      "#ffb0b0",
      "#ff7171",
      "#ff3636",
      "#ff0000",
      "#980000",
      "#480000",
      "#acacff",
      "#5151ff",
      "#0000ff",
      "#0000a2",
      "#00004b",
      "#c7ffc7",
      "#65ff65",
      "#00ff00",
      "#009300",
      "#004b00",
      "#f6b3ff",
      "#ee5dff",
      "#e600ff",
      "#6b0077",
      "#ffe2b3",
      "#ffbb58",
      "#ff9900",
      "#774800",
      "#eaff9a",
      "#c8ff00",
      "#708d00",
      "#00ffff",
      "#007575"
    ]), v = useStorage(
      () => "recent_colors_" + a.recentColorsGroupName,
      null,
      localStorage,
      {
        serializer: {
          read: (t) => (t ? JSON.parse(t) : null) || null,
          write: (t) => JSON.stringify(t)
        }
      }
    );
    function R(t) {
      o.value = t, p("change", o.value), a.autoDismiss && a.asPopover && s.value?.hide();
    }
    function M() {
      o.value = null, p("change", o.value), a.autoDismiss && a.asPopover && s.value?.hide();
    }
    function N(t) {
      if (o.value = t.target.value, p("change", o.value), a.withRecentColors) {
        const i = Y([o.value, ...v.value || []]);
        v.value = Z(i, 5);
      }
      a.autoDismiss && a.asPopover && s.value?.hide();
    }
    onMounted(() => {
      a.autoOpen && setTimeout(() => {
        w(), setTimeout(() => {
          console.log(s.value), s.value.alignOverlay();
        }, 10);
      }, 10);
    });
    const { exposed: A, baseInputForwardedProps: O } = X(a);
    function q(t) {
      s.value?.toggle?.(t);
    }
    return z({ focus: w, toggle: q, ...A }), (t, i) => {
      const y = F("Button");
      return r(), b(ee, G(n(O), {
        "floating-label": !1,
        "infield-top-aligned-label": !1
      }), {
        default: g(() => [
          u("div", oe, [
            e.appendInline ? (r(), d("div", {
              key: 0,
              ref_key: "popoverShowContainerRef",
              ref: k,
              class: "fixed left-0 top-0 h-screen w-screen"
            }, null, 512)) : f("", !0),
            (r(), b(J(e.asPopover ? n(_) : "div"), {
              ref_key: "colorPalateContainerRef",
              ref: s,
              "append-to": e.appendInline ? n(k) : void 0,
              class: c([
                {
                  "border-1 max-w-[480px] rounded border-dotted p-1": !e.asPopover,
                  "max-w-[360px]": e.asPopover
                }
              ]),
              onClick: i[2] || (i[2] = U(() => {
              }, ["stop", "prevent"]))
            }, {
              default: g(() => [
                u("div", {
                  ref_key: "colorsContainerDivRef",
                  ref: T
                }, [
                  u("div", le, [
                    (r(!0), d(x, null, P(n(V), (l) => (r(), d("button", {
                      key: l,
                      class: c(["hdd-color-box", { active: l === o.value, disabled: e.disabled }]),
                      disabled: e.disabled,
                      style: C({ backgroundColor: l }),
                      onClick: ($) => R(l)
                    }, null, 14, te))), 128))
                  ]),
                  e.withRecentColors ? (r(), d("div", ae, [
                    (r(!0), d(x, null, P(n(v), (l) => (r(), d("button", {
                      key: l,
                      class: c(["hdd-color-box", { active: l === o.value, disabled: e.disabled }]),
                      disabled: e.disabled,
                      style: C({ backgroundColor: l }),
                      onClick: ($) => R(l)
                    }, null, 14, ne))), 128))
                  ])) : f("", !0),
                  u("div", ie, [
                    e.customSelector ? (r(), d("div", re, [
                      I(y, {
                        icon: "i-ic:outline-color-lens",
                        size: "small",
                        label: n(m)("Select a Color"),
                        severity: "info",
                        onClick: i[0] || (i[0] = () => n(h).click())
                      }, null, 8, ["label"]),
                      W(u("input", {
                        ref_key: "customColorInputRef",
                        ref: h,
                        "onUpdate:modelValue": i[1] || (i[1] = (l) => o.value = l),
                        style: { height: "0", width: "0" },
                        type: "color",
                        disabled: e.disabled,
                        onChange: N
                      }, null, 40, se), [
                        [H, o.value]
                      ])
                    ])) : f("", !0),
                    u("div", null, [
                      e.clearable && o.value ? (r(), b(y, {
                        key: 0,
                        size: "small",
                        title: n(m)("Clear Selection"),
                        severity: "danger",
                        outlined: "",
                        icon: "i-iconamoon:sign-times",
                        class: "mt-2",
                        onClick: M
                      }, null, 8, ["title"])) : f("", !0)
                    ])
                  ])
                ], 512)
              ]),
              _: 1
            }, 8, ["append-to", "class"])),
            e.asPopover && e.withTrigger ? K(t.$slots, "trigger", {
              key: 1,
              toggle: n(s)?.toggle,
              value: o.value
            }, () => [
              I(y, {
                ref_key: "inputRef",
                ref: B,
                size: e.size,
                label: o.value ? " " : n(m)("Select Color"),
                severity: e.triggerButtonSeverity,
                onClick: i[3] || (i[3] = (l) => n(s).toggle(l))
              }, Q({ _: 2 }, [
                o.value ? {
                  name: "icon",
                  fn: g(() => [
                    u("span", {
                      class: c(["hdd-color-box inline-block", [{ "!size-4": e.size === "small" }, e.triggerButtonColorBoxClass]]),
                      style: C({ backgroundColor: o.value })
                    }, null, 6)
                  ]),
                  key: "0"
                } : void 0
              ]), 1032, ["size", "label", "severity"])
            ]) : f("", !0)
          ], 512)
        ]),
        _: 3
      }, 16);
    };
  }
});
export {
  me as default
};
