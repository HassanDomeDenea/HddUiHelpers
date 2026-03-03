import G from "primevue/tooltip";
import N from "primevue/button";
import $ from "primevue/image";
import { _ as q } from "../TextInput.vue_vue_type_script_setup_true_lang-CDqh5_am.js";
import { _ as P } from "../SelectButtonInput.vue_vue_type_script_setup_true_lang-DF6BjwMi.js";
import j from "primevue/toggleswitch";
import { defineComponent as H, useTemplateRef as g, computed as f, toValue as w, openBlock as i, createElementBlock as m, normalizeClass as d, createElementVNode as C, unref as t, Fragment as J, toDisplayString as B, createCommentVNode as x, renderSlot as K, createBlock as c, isRef as p, mergeProps as Q, createVNode as W, withDirectives as X } from "vue";
import Y from "HddUiHelpers/components/inputs/TreeSelectInput.vue";
import { useApiClient as Z } from "HddUiHelpers/stores/apiClient";
import { useBasicAuthStore as _ } from "HddUiHelpers/stores/basicAuth";
import { uniqueId as ee, map as te } from "lodash-es";
import { FileUpload as le } from "primevue";
import oe from "primevue/select";
import { useConfirm as ne } from "primevue/useconfirm";
import { useI18n as ie } from "vue-i18n";
const ae = ["for"], ue = { key: 0 }, se = {
  key: 1,
  class: "self-center"
}, Ie = /* @__PURE__ */ H({
  __name: "UserOption",
  props: {
    isGlobal: { default: !1 },
    option: {},
    label: {},
    size: { default: "small" },
    fluid: { type: Boolean, default: !1 },
    binds: {},
    controlFluid: { type: Boolean, default: !1 },
    clearable: { type: Boolean },
    showSuccess: { type: Boolean, default: !0 },
    options: {},
    optionLabel: { default: "label" },
    optionValue: { default: "value" },
    showAfterLabelDots: { type: Boolean, default: !0 },
    successToastMessage: {},
    type: { default: "switch" }
  },
  setup(e) {
    const b = _(), I = Z(), y = g("selectInputRef"), v = g("treeSelectInputRef"), { t: a } = ie(), S = g("labelRef"), z = g("fileUploadRef"), R = f(() => e.isGlobal !== !1), l = f({
      get() {
        return R.value === !0 ? b.globalOptions?.[e.option] : b.options[e.option];
      },
      set(n) {
        let o;
        w(R) === !0 ? o = b.changeGlobalOption(e.option, n) : o = b.changeOption(e.option, n), o.then(() => {
          e.showSuccess && (e.type === "checkbox" || e.type === "switch" ? I.toastSuccess(
            e.label || S.value?.innerHTML,
            a(n ? "Enabled" : "Disabled"),
            {
              life: 2e3,
              contentStyleClass: "[&_.p-toast-detail]:!font-bold",
              severity: n ? "success" : "warn"
            }
          ) : I.toastSuccess(e.successToastMessage ?? a("Option Changed Successfully"), "", {
            life: 1e3
          }));
        }).catch((k) => {
          console.error(k), y.value && (y.value.d_value = w(l)), v.value && v.value.setVisibleElementValue(w(l));
        });
      }
    }), r = f(() => ee("user-option")), s = f(() => typeof e.options == "object" && !Array.isArray(e.options) ? te(e.options, (n, o) => ({
      value: o,
      label: n
    })) : e.options ?? []), h = f(
      () => s.value.length > 0 && typeof s.value[0] == "string" ? void 0 : e.optionLabel
    ), V = f(
      () => s.value.length > 0 && typeof s.value[0] == "string" ? void 0 : e.optionValue
    );
    function U(n) {
      n.files[0] && (l.value = n.files[0]);
    }
    const F = ne();
    function O(n) {
      F.require({
        target: n.currentTarget,
        group: "popup",
        message: a("Are you sure to delete this image?"),
        icon: "pi pi-info-circle",
        rejectProps: {
          label: a("Cancel"),
          severity: "secondary",
          outlined: !0
        },
        acceptProps: {
          label: a("Delete"),
          severity: "danger"
        },
        accept: () => {
          l.value = null;
        }
      });
    }
    function T() {
      e.type === "image" ? z.value?.choose() : e.type === "select" && y.value.show(!0);
    }
    return (n, o) => {
      const k = j, A = P, D = q, L = $, M = N, E = G;
      return i(), m("div", {
        class: d(["items-center gap-2", { flex: e.fluid, "inline-flex": !e.fluid }])
      }, [
        C("label", {
          ref_key: "labelRef",
          ref: S,
          for: t(r),
          class: d([[{ "flex-grow": !e.controlFluid }], "light:hover:bg-yellow-300/25 cursor-pointer rounded-lg dark:hover:bg-zinc-100/10"]),
          onClick: T
        }, [
          e.label ? (i(), m(J, { key: 0 }, [
            C("span", null, B(e.label), 1),
            e.showAfterLabelDots ? (i(), m("span", ue, ": ")) : x("", !0)
          ], 64)) : K(n.$slots, "default", { key: 1 })
        ], 10, ae),
        e.type === "switch" ? (i(), c(k, {
          key: 0,
          modelValue: t(l),
          "onUpdate:modelValue": o[0] || (o[0] = (u) => p(l) ? l.value = u : null),
          "input-id": t(r)
        }, null, 8, ["modelValue", "input-id"])) : e.type === "select_button" ? (i(), c(A, {
          key: 1,
          modelValue: t(l),
          "onUpdate:modelValue": o[1] || (o[1] = (u) => p(l) ? l.value = u : null),
          "input-id": t(r),
          class: d({ "flex-grow": e.controlFluid }),
          "option-label": t(h),
          "option-value": t(V),
          size: e.size,
          options: t(s)
        }, null, 8, ["modelValue", "input-id", "class", "option-label", "option-value", "size", "options"])) : e.type === "select" ? (i(), c(t(oe), {
          key: 2,
          ref_key: "selectInputRef",
          ref: y,
          modelValue: t(l),
          "onUpdate:modelValue": o[2] || (o[2] = (u) => p(l) ? l.value = u : null),
          class: d({ "flex-grow": e.controlFluid }),
          "option-label": t(h),
          "option-value": t(V),
          options: t(s),
          "input-id": t(r),
          size: e.size
        }, null, 8, ["modelValue", "class", "option-label", "option-value", "options", "input-id", "size"])) : e.type === "tree_select" ? (i(), c(Y, Q({
          key: 3,
          ref_key: "treeSelectInputRef",
          ref: v,
          modelValue: t(l),
          "onUpdate:modelValue": o[3] || (o[3] = (u) => p(l) ? l.value = u : null),
          class: { "flex-grow": e.controlFluid },
          clearable: e.clearable,
          "option-label": t(h),
          "option-value": t(V),
          options: t(s),
          "input-id": t(r),
          size: e.size
        }, e.binds ?? {}), null, 16, ["modelValue", "class", "clearable", "option-label", "option-value", "options", "input-id", "size"])) : e.type === "text" ? (i(), c(D, {
          key: 4,
          modelValue: t(l),
          "onUpdate:modelValue": o[4] || (o[4] = (u) => p(l) ? l.value = u : null),
          modelModifiers: { lazy: !0 },
          "input-id": t(r),
          lazy: "",
          class: d({ "flex-grow": e.controlFluid })
        }, null, 8, ["modelValue", "input-id", "class"])) : e.type === "image" ? (i(), m("div", {
          key: 5,
          class: d(["flex items-center gap-2", { "flex-grow": e.controlFluid }])
        }, [
          t(l) ? (i(), c(L, {
            key: 0,
            src: t(l),
            alt: t(a)("Missing Image"),
            style: { "max-height": "200px", "max-width": "200px" },
            preview: ""
          }, null, 8, ["src", "alt"])) : (i(), m("div", se, B(t(a)("No Image Selected")), 1)),
          W(t(le), {
            ref_key: "fileUploadRef",
            ref: z,
            mode: "basic",
            accept: "image/*",
            bs: "",
            auto: "",
            "custom-upload": "",
            "choose-label": t(l) ? t(a)("Change Image") : t(a)("Upload Image"),
            "choose-button-props": { size: "small", severity: "info" },
            "choose-icon": "i-mdi-upload",
            onUploader: U
          }, null, 8, ["choose-label"]),
          t(l) ? X((i(), c(M, {
            key: 2,
            type: "button",
            icon: "pi pi-trash",
            class: "p-button-text p-button-danger",
            onClick: O
          }, null, 512)), [
            [
              E,
              t(a)("Delete"),
              void 0,
              { top: !0 }
            ]
          ]) : x("", !0)
        ], 2)) : x("", !0)
      ], 2);
    };
  }
});
export {
  Ie as default
};
