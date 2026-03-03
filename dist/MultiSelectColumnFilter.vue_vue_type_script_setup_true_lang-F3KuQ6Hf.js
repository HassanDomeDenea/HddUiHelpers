import { defineComponent as r, useModel as n, openBlock as i, createBlock as p, unref as u, mergeModels as s } from "vue";
import { _ as d } from "./MultiSelectInput.vue_vue_type_script_setup_true_lang-DpPUkLut.js";
const b = /* @__PURE__ */ r({
  __name: "MultiSelectColumnFilter",
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
  setup(l) {
    const e = n(l, "slotProps"), { t } = useI18n();
    function a(o) {
      o.length ? (e.value.filterModel.value = o, e.value.filterModel.matchMode = "whereIn") : (e.value.filterModel.value = null, e.value.filterModel.matchMode = "whereIn"), e.value.filterCallback();
    }
    return (o, c) => (i(), p(d, {
      "model-value": e.value.filterModel.value,
      clearable: "",
      "option-label-property": l.optionLabelProperty,
      "label-class": "mb-2",
      "option-value-property": l.optionValueProperty,
      placeholder: u(t)("Choose to filter"),
      label: l.label,
      options: l.options,
      "onUpdate:modelValue": a
    }, null, 8, ["model-value", "option-label-property", "option-value-property", "placeholder", "label", "options"]));
  }
});
export {
  b as _
};
