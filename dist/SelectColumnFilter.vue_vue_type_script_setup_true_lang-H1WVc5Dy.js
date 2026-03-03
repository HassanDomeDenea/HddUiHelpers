import { defineComponent as r, useModel as n, openBlock as p, createBlock as i, unref as u, mergeModels as s } from "vue";
import { _ as d } from "./SelectInput.vue_vue_type_script_setup_true_lang-Ck-rW3-O.js";
import { useI18n as c } from "vue-i18n";
const P = /* @__PURE__ */ r({
  __name: "SelectColumnFilter",
  props: /* @__PURE__ */ s({
    options: {},
    label: {},
    optionLabelProperty: { default: "name" },
    optionValueProperty: { default: "id" }
  }, {
    slotProps: { required: !0 },
    slotPropsModifiers: {}
  }),
  emits: ["update:slotProps"],
  setup(e) {
    const o = n(e, "slotProps"), { t } = c();
    function a(l) {
      o.value.filterModel.value = l, o.value.filterModel.matchMode = "equals", o.value.filterCallback();
    }
    return (l, m) => (p(), i(d, {
      "model-value": o.value.filterModel.value,
      clearable: "",
      "option-label-property": e.optionLabelProperty,
      "label-class": "mb-2",
      "option-value-property": e.optionValueProperty,
      placeholder: u(t)("Choose to filter"),
      label: e.label,
      options: e.options,
      "onUpdate:modelValue": a
    }, null, 8, ["model-value", "option-label-property", "option-value-property", "placeholder", "label", "options"]));
  }
});
export {
  P as _
};
