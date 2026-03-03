import M from "primevue/button";
import { defineComponent as E, useModel as O, useTemplateRef as A, computed as c, openBlock as y, createBlock as P, mergeProps as v, unref as e, withCtx as w, createElementVNode as B, createVNode as d, isRef as T, createElementBlock as g, createCommentVNode as k, normalizeClass as z, withModifiers as F, mergeModels as R } from "vue";
import { useHddBaseInputUtils as $ } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import s from "moment";
import q from "primevue/datepicker";
import { _ as H } from "./BaseInput.vue_vue_type_script_setup_true_lang-Ca5DqyVP.js";
import { useI18n as K } from "vue-i18n";
const N = { class: "relative !w-full" }, W = {
  key: 0,
  class: "border-t-1 border-t-dashed border-t-gray/25 mt-1 pt-1"
}, _ = /* @__PURE__ */ E({
  __name: "DatePickerInput",
  props: /* @__PURE__ */ R({
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
  setup(t, { expose: h }) {
    const l = t, u = O(t, "modelValue"), { t: m } = K(), a = A("inputRef");
    function b() {
      a.value.input?.focus();
    }
    const i = c({
      get: () => l.isYearOnly ? u.value ? s(u.value).format("YYYY") : null : u.value,
      set: (n) => {
        l.isYearOnly ? u.value = n ? s(n).format("YYYY") : null : n && l.formatAsString ? u.value = s(n).format(l.stringFormat ?? "YYYY-MM-DD HH:mm:ss") : u.value = n;
      }
    });
    function V(n) {
      a.value.overlayVisible && (a.value.overlayVisible = !1, n.stopPropagation());
    }
    const { exposed: C, baseInputForwardedProps: Y, fieldUniqueId: D, generalInputProps: I } = $(l), L = c(
      () => l.isYearOnly ? "yy" : l.dateFormat ?? "yy-mm-dd"
    ), S = c(() => l.isYearOnly ? "year" : l.view), f = function(n) {
      i.value = n, a.value.overlayVisible && (a.value.overlayVisible = !1);
    };
    function x() {
      l.startingView === "year" ? a.value.switchToYearView(new Event("year")) : l.startingView === "month" && a.value.switchToMonthView(new Event("month"));
    }
    return h({ focus: b, inputRef: a, ...C }), (n, o) => {
      const p = M;
      return y(), P(H, v(e(Y), {
        "on-local-enter-key-down": t.onLocalEnterKeyDown ?? V,
        onClick: b
      }), {
        default: w(() => [
          B("div", N, [
            d(e(q), v(e(I), {
              ref_key: "inputRef",
              ref: a,
              modelValue: e(i),
              "onUpdate:modelValue": o[4] || (o[4] = (r) => T(i) ? i.value = r : null),
              "panel-class": "HddDatePickerPanel",
              "input-id": e(D),
              placeholder: t.placeholder,
              "date-format": e(L),
              "hide-on-date-time-select": "",
              "show-time": t.showTime,
              "hour-format": "12",
              class: "!w-full",
              "show-icon": "",
              view: e(S),
              "manual-input": t.manualInput,
              "show-button-bar": t.clearable,
              pt: {
                pcInputText: {
                  root: {
                    onKeydown: (r) => {
                    }
                  }
                }
              },
              onClearClick: o[5] || (o[5] = () => t.clearable && (i.value = null)),
              onShow: x
            }), {
              footer: w(() => [
                t.withSuggestionsButtons ? (y(), g("div", W, [
                  d(p, {
                    size: "small",
                    text: "",
                    severity: "secondary",
                    label: e(m)("Start of Month"),
                    onClick: o[0] || (o[0] = (r) => f(e(s)().startOf("month")))
                  }, null, 8, ["label"]),
                  d(p, {
                    size: "small",
                    text: "",
                    severity: "secondary",
                    label: e(m)("End of Month"),
                    onClick: o[1] || (o[1] = (r) => f(e(s)().endOf("month")))
                  }, null, 8, ["label"]),
                  d(p, {
                    size: "small",
                    text: "",
                    severity: "secondary",
                    label: e(m)("Start of Week"),
                    onClick: o[2] || (o[2] = (r) => f(e(s)().startOf("week")))
                  }, null, 8, ["label"]),
                  d(p, {
                    size: "small",
                    text: "",
                    severity: "secondary",
                    label: e(m)("End of Week"),
                    onClick: o[3] || (o[3] = (r) => f(e(s)().endOf("week")))
                  }, null, 8, ["label"])
                ])) : k("", !0)
              ]),
              _: 1
            }, 16, ["modelValue", "input-id", "placeholder", "date-format", "show-time", "view", "manual-input", "show-button-bar"]),
            t.clearable && e(i) ? (y(), g("div", {
              key: 0,
              class: z(["clear-icon-container", [t.size]])
            }, [
              B("i", {
                class: "i-mdi:times clear-icon",
                onClick: o[6] || (o[6] = F((r) => i.value = null, ["stop"]))
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
  _
};
