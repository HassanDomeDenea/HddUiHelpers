import j from "primevue/button";
import { defineComponent as F, useModel as G, ref as R, useTemplateRef as c, computed as J, onMounted as U, openBlock as r, createBlock as g, mergeProps as W, unref as a, withCtx as C, createElementVNode as u, createElementBlock as d, createCommentVNode as f, resolveDynamicComponent as H, withModifiers as K, normalizeClass as m, Fragment as P, renderList as I, normalizeStyle as B, createVNode as D, withDirectives as Q, vModelText as X, renderSlot as Y, createSlots as Z, mergeModels as z } from "vue";
import { useHddBaseInputUtils as _ } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { uniq as ee, take as oe } from "lodash-es";
import le from "primevue/popover";
import { _ as te } from "./BaseInput.vue_vue_type_script_setup_true_lang-Ca5DqyVP.js";
import { useI18n as ne } from "vue-i18n";
import { useStorage as ae } from "@vueuse/core";
const ie = { ref: "relative" }, re = { class: "m-1 flex flex-wrap gap-1" }, se = ["disabled", "onClick"], ue = {
  key: 0,
  class: "m-1 mt-3 flex flex-wrap gap-1"
}, de = ["disabled", "onClick"], fe = { class: "flex justify-center" }, ce = {
  key: 0,
  class: "mt-2 flex items-center justify-center gap-1"
}, me = ["disabled"], ke = /* @__PURE__ */ F({
  __name: "ColorPickerInput",
  props: /* @__PURE__ */ z({
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
    modelValue: { default: R().value },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ z(["change"], ["update:modelValue"]),
  setup(e, { expose: L, emit: V }) {
    const n = e, p = V, o = G(e, "modelValue"), { t: v } = ne(), h = R(), k = c("customColorInputRef"), s = c(
      "colorPalateContainerRef"
    ), M = c("colorsContainerDivRef"), w = c("popoverShowContainerRef");
    function S() {
      h.value.$el.click();
    }
    const N = J(() => n.colors ?? [
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
    ]), y = ae(
      () => "recent_colors_" + n.recentColorsGroupName,
      null,
      localStorage,
      {
        serializer: {
          read: (t) => (t ? JSON.parse(t) : null) || null,
          write: (t) => JSON.stringify(t)
        }
      }
    );
    function x(t) {
      o.value = t, p("change", o.value), n.autoDismiss && n.asPopover && s.value?.hide();
    }
    function T() {
      o.value = null, p("change", o.value), n.autoDismiss && n.asPopover && s.value?.hide();
    }
    function A(t) {
      if (o.value = t.target.value, p("change", o.value), n.withRecentColors) {
        const i = ee([o.value, ...y.value || []]);
        y.value = oe(i, 5);
      }
      n.autoDismiss && n.asPopover && s.value?.hide();
    }
    U(() => {
      n.autoOpen && setTimeout(() => {
        S(), setTimeout(() => {
          console.log(s.value), s.value.alignOverlay();
        }, 10);
      }, 10);
    });
    const { exposed: O, baseInputForwardedProps: q } = _(n);
    function $(t) {
      s.value?.toggle?.(t);
    }
    return L({ focus: S, toggle: $, ...O }), (t, i) => {
      const b = j;
      return r(), g(te, W(a(q), {
        "floating-label": !1,
        "infield-top-aligned-label": !1
      }), {
        default: C(() => [
          u("div", ie, [
            e.appendInline ? (r(), d("div", {
              key: 0,
              ref_key: "popoverShowContainerRef",
              ref: w,
              class: "fixed left-0 top-0 h-screen w-screen"
            }, null, 512)) : f("", !0),
            (r(), g(H(e.asPopover ? a(le) : "div"), {
              ref_key: "colorPalateContainerRef",
              ref: s,
              "append-to": e.appendInline ? a(w) : void 0,
              class: m([
                {
                  "border-1 max-w-[480px] rounded border-dotted p-1": !e.asPopover,
                  "max-w-[360px]": e.asPopover
                }
              ]),
              onClick: i[2] || (i[2] = K(() => {
              }, ["stop", "prevent"]))
            }, {
              default: C(() => [
                u("div", {
                  ref_key: "colorsContainerDivRef",
                  ref: M
                }, [
                  u("div", re, [
                    (r(!0), d(P, null, I(a(N), (l) => (r(), d("button", {
                      key: l,
                      class: m(["hdd-color-box", { active: l === o.value, disabled: e.disabled }]),
                      disabled: e.disabled,
                      style: B({ backgroundColor: l }),
                      onClick: (E) => x(l)
                    }, null, 14, se))), 128))
                  ]),
                  e.withRecentColors ? (r(), d("div", ue, [
                    (r(!0), d(P, null, I(a(y), (l) => (r(), d("button", {
                      key: l,
                      class: m(["hdd-color-box", { active: l === o.value, disabled: e.disabled }]),
                      disabled: e.disabled,
                      style: B({ backgroundColor: l }),
                      onClick: (E) => x(l)
                    }, null, 14, de))), 128))
                  ])) : f("", !0),
                  u("div", fe, [
                    e.customSelector ? (r(), d("div", ce, [
                      D(b, {
                        icon: "i-ic:outline-color-lens",
                        size: "small",
                        label: a(v)("Select a Color"),
                        severity: "info",
                        onClick: i[0] || (i[0] = () => a(k).click())
                      }, null, 8, ["label"]),
                      Q(u("input", {
                        ref_key: "customColorInputRef",
                        ref: k,
                        "onUpdate:modelValue": i[1] || (i[1] = (l) => o.value = l),
                        style: { height: "0", width: "0" },
                        type: "color",
                        disabled: e.disabled,
                        onChange: A
                      }, null, 40, me), [
                        [X, o.value]
                      ])
                    ])) : f("", !0),
                    u("div", null, [
                      e.clearable && o.value ? (r(), g(b, {
                        key: 0,
                        size: "small",
                        title: a(v)("Clear Selection"),
                        severity: "danger",
                        outlined: "",
                        icon: "i-iconamoon:sign-times",
                        class: "mt-2",
                        onClick: T
                      }, null, 8, ["title"])) : f("", !0)
                    ])
                  ])
                ], 512)
              ]),
              _: 1
            }, 8, ["append-to", "class"])),
            e.asPopover && e.withTrigger ? Y(t.$slots, "trigger", {
              key: 1,
              toggle: a(s)?.toggle,
              value: o.value
            }, () => [
              D(b, {
                ref_key: "inputRef",
                ref: h,
                size: e.size,
                label: o.value ? " " : a(v)("Select Color"),
                severity: e.triggerButtonSeverity,
                onClick: i[3] || (i[3] = (l) => a(s).toggle(l))
              }, Z({ _: 2 }, [
                o.value ? {
                  name: "icon",
                  fn: C(() => [
                    u("span", {
                      class: m(["hdd-color-box inline-block", [{ "!size-4": e.size === "small" }, e.triggerButtonColorBoxClass]]),
                      style: B({ backgroundColor: o.value })
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
  ke as _
};
