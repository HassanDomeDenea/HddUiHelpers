import { defineComponent as M, useModel as E, useTemplateRef as O, computed as c, resolveComponent as A, openBlock as y, createBlock as P, mergeProps as b, unref as o, withCtx as w, createElementVNode as B, createVNode as d, createElementBlock as g, createCommentVNode as k, normalizeClass as T, withModifiers as z, mergeModels as F } from "vue";
import { useHddBaseInputUtils as $ } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import r from "moment";
import q from "primevue/datepicker";
import { useI18n as R } from "vue-i18n";
import { _ as H } from "../../BaseInput.vue_vue_type_script_setup_true_lang-C8yTwTDa.js";
const K = { class: "relative !w-full" }, N = {
  key: 0,
  class: "border-t-1 border-t-dashed border-t-gray/25 mt-1 pt-1"
}, X = /* @__PURE__ */ M({
  __name: "DatePickerInput",
  props: /* @__PURE__ */ F({
    manualInput: { type: Boolean, default: !1 },
    isYearOnly: { type: Boolean, default: !1 },
    withSuggestionsButtons: { type: Boolean, default: !1 },
    clearable: { type: Boolean },
    showTime: { type: Boolean },
    dateFormat: {},
    formatAsString: { type: Boolean, default: !0 },
    stringFormat: {},
    startingView: {},
    view: {},
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
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(l, { expose: h }) {
    const t = l, s = E(l, "modelValue"), { t: m } = R(), n = O("inputRef");
    function v() {
      n.value.input?.focus();
    }
    const u = c({
      get: () => t.isYearOnly ? s.value ? r(s.value).format("YYYY") : null : s.value,
      set: (a) => {
        t.isYearOnly ? s.value = a ? r(a).format("YYYY") : null : a && t.formatAsString ? s.value = r(a).format(t.stringFormat ?? "YYYY-MM-DD HH:mm:ss") : s.value = a;
      }
    });
    function V(a) {
      n.value.overlayVisible && (n.value.overlayVisible = !1, a.stopPropagation());
    }
    const { exposed: C, baseInputForwardedProps: Y, fieldUniqueId: D, generalInputProps: I } = $(t), L = c(
      () => t.isYearOnly ? "yy" : t.dateFormat ?? "yy-mm-dd"
    ), S = c(() => t.isYearOnly ? "year" : t.view), f = function(a) {
      u.value = a, n.value.overlayVisible && (n.value.overlayVisible = !1);
    };
    function x() {
      t.startingView === "year" ? n.value.switchToYearView(new Event("year")) : t.startingView === "month" && n.value.switchToMonthView(new Event("month"));
    }
    return h({ focus: v, inputRef: n, ...C }), (a, e) => {
      const p = A("Button");
      return y(), P(H, b(o(Y), {
        "on-local-enter-key-down": l.onLocalEnterKeyDown ?? V,
        onClick: v
      }), {
        default: w(() => [
          B("div", K, [
            d(o(q), b(o(I), {
              ref_key: "inputRef",
              ref: n,
              modelValue: u.value,
              "onUpdate:modelValue": e[4] || (e[4] = (i) => u.value = i),
              "panel-class": "HddDatePickerPanel",
              "input-id": o(D),
              placeholder: l.placeholder,
              "date-format": L.value,
              "hide-on-date-time-select": "",
              "show-time": l.showTime,
              "hour-format": "12",
              class: "!w-full",
              "show-icon": "",
              view: S.value,
              "manual-input": l.manualInput,
              "show-button-bar": l.clearable,
              pt: {
                pcInputText: {
                  root: {
                    onKeydown: (i) => {
                    }
                  }
                }
              },
              onClearClick: e[5] || (e[5] = () => l.clearable && (u.value = null)),
              onShow: x
            }), {
              footer: w(() => [
                l.withSuggestionsButtons ? (y(), g("div", N, [
                  d(p, {
                    size: "small",
                    text: "",
                    severity: "secondary",
                    label: o(m)("Start of Month"),
                    onClick: e[0] || (e[0] = (i) => f(o(r)().startOf("month")))
                  }, null, 8, ["label"]),
                  d(p, {
                    size: "small",
                    text: "",
                    severity: "secondary",
                    label: o(m)("End of Month"),
                    onClick: e[1] || (e[1] = (i) => f(o(r)().endOf("month")))
                  }, null, 8, ["label"]),
                  d(p, {
                    size: "small",
                    text: "",
                    severity: "secondary",
                    label: o(m)("Start of Week"),
                    onClick: e[2] || (e[2] = (i) => f(o(r)().startOf("week")))
                  }, null, 8, ["label"]),
                  d(p, {
                    size: "small",
                    text: "",
                    severity: "secondary",
                    label: o(m)("End of Week"),
                    onClick: e[3] || (e[3] = (i) => f(o(r)().endOf("week")))
                  }, null, 8, ["label"])
                ])) : k("", !0)
              ]),
              _: 1
            }, 16, ["modelValue", "input-id", "placeholder", "date-format", "show-time", "view", "manual-input", "show-button-bar"]),
            l.clearable && u.value ? (y(), g("div", {
              key: 0,
              class: T(["clear-icon-container", [l.size]])
            }, [
              B("i", {
                class: "i-mdi:times clear-icon",
                onClick: e[6] || (e[6] = z((i) => u.value = null, ["stop"]))
              })
            ], 2)) : k("", !0)
          ])
        ]),
        _: 1
      }, 16, ["on-local-enter-key-down"]);
    };
  }
});
export {
  X as default
};
