import { defineComponent as x, useModel as M, resolveComponent as E, openBlock as c, createBlock as O, mergeProps as b, unref as e, withCtx as v, createElementVNode as w, createVNode as d, isRef as A, createElementBlock as B, createCommentVNode as g, normalizeClass as P, withModifiers as T, mergeModels as z } from "vue";
import { useHddBaseInputUtils as F } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import s from "moment";
import R from "primevue/datepicker";
import { _ as $ } from "../../BaseInput.vue_vue_type_script_setup_true_lang-DGVI56PE.js";
const q = { class: "relative !w-full" }, H = {
  key: 0,
  class: "border-t-1 border-t-dashed border-t-gray/25 mt-1 pt-1"
}, G = /* @__PURE__ */ x({
  __name: "DatePickerInput",
  props: /* @__PURE__ */ z({
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
  setup(t, { expose: k }) {
    const l = t, u = M(t, "modelValue"), { t: m } = useI18n(), a = useTemplateRef("inputRef");
    function y() {
      a.value.input?.focus();
    }
    const i = computed({
      get: () => l.isYearOnly ? u.value ? s(u.value).format("YYYY") : null : u.value,
      set: (n) => {
        l.isYearOnly ? u.value = n ? s(n).format("YYYY") : null : n && l.formatAsString ? u.value = s(n).format(l.stringFormat ?? "YYYY-MM-DD HH:mm:ss") : u.value = n;
      }
    });
    function h(n) {
      a.value.overlayVisible && (a.value.overlayVisible = !1, n.stopPropagation());
    }
    const { exposed: V, baseInputForwardedProps: C, fieldUniqueId: Y, generalInputProps: D } = F(l), I = computed(
      () => l.isYearOnly ? "yy" : l.dateFormat ?? "yy-mm-dd"
    ), L = computed(() => l.isYearOnly ? "year" : l.view), f = function(n) {
      i.value = n, a.value.overlayVisible && (a.value.overlayVisible = !1);
    };
    function S() {
      l.startingView === "year" ? a.value.switchToYearView(new Event("year")) : l.startingView === "month" && a.value.switchToMonthView(new Event("month"));
    }
    return k({ focus: y, inputRef: a, ...V }), (n, o) => {
      const p = E("Button");
      return c(), O($, b(e(C), {
        "on-local-enter-key-down": t.onLocalEnterKeyDown ?? h,
        onClick: y
      }), {
        default: v(() => [
          w("div", q, [
            d(e(R), b(e(D), {
              ref_key: "inputRef",
              ref: a,
              modelValue: e(i),
              "onUpdate:modelValue": o[4] || (o[4] = (r) => A(i) ? i.value = r : null),
              "panel-class": "HddDatePickerPanel",
              "input-id": e(Y),
              placeholder: t.placeholder,
              "date-format": e(I),
              "hide-on-date-time-select": "",
              "show-time": t.showTime,
              "hour-format": "12",
              class: "!w-full",
              "show-icon": "",
              view: e(L),
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
              onShow: S
            }), {
              footer: v(() => [
                t.withSuggestionsButtons ? (c(), B("div", H, [
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
                ])) : g("", !0)
              ]),
              _: 1
            }, 16, ["modelValue", "input-id", "placeholder", "date-format", "show-time", "view", "manual-input", "show-button-bar"]),
            t.clearable && e(i) ? (c(), B("div", {
              key: 0,
              class: P(["clear-icon-container", [t.size]])
            }, [
              w("i", {
                class: "i-mdi:times clear-icon",
                onClick: o[6] || (o[6] = T((r) => i.value = null, ["stop"]))
              })
            ], 2)) : g("", !0)
          ])
        ]),
        _: 1
      }, 16, ["on-local-enter-key-down"]);
    };
  }
});
export {
  G as default
};
