import { defineComponent as M, useTemplateRef as b, computed as d, toValue as k, resolveComponent as w, resolveDirective as E, openBlock as a, createElementBlock as m, normalizeClass as f, createElementVNode as x, Fragment as G, toDisplayString as B, createCommentVNode as I, renderSlot as N, createBlock as s, unref as c, mergeProps as q, createVNode as P, withDirectives as j } from "vue";
import H from "HddUiHelpers/components/inputs/TreeSelectInput.vue";
import { useApiClient as $ } from "HddUiHelpers/stores/apiClient";
import { useBasicAuthStore as J } from "HddUiHelpers/stores/basicAuth";
import { uniqueId as K, map as Q } from "lodash-es";
import { FileUpload as W } from "primevue";
import X from "primevue/select";
import { useConfirm as Y } from "primevue/useconfirm";
import { useI18n as Z } from "vue-i18n";
import _ from "HddUiHelpers/components/inputs/SelectButtonInput.vue";
import ee from "HddUiHelpers/components/inputs/TextInput.vue";
const le = ["for"], te = { key: 0 }, oe = {
  key: 1,
  class: "self-center"
}, ve = /* @__PURE__ */ M({
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
    const p = J(), S = $(), v = b("selectInputRef"), y = b("treeSelectInputRef"), { t: i } = Z(), z = b("labelRef"), C = b("fileUploadRef"), R = d(() => e.isGlobal !== !1), l = d({
      get() {
        return R.value === !0 ? p.globalOptions?.[e.option] : p.options[e.option];
      },
      set(o) {
        let t;
        k(R) === !0 ? t = p.changeGlobalOption(e.option, o) : t = p.changeOption(e.option, o), t.then(() => {
          e.showSuccess && (e.type === "checkbox" || e.type === "switch" ? S.toastSuccess(
            e.label || z.value?.innerHTML,
            i(o ? "Enabled" : "Disabled"),
            {
              life: 2e3,
              contentStyleClass: "[&_.p-toast-detail]:!font-bold",
              severity: o ? "success" : "warn"
            }
          ) : S.toastSuccess(e.successToastMessage ?? i("Option Changed Successfully"), "", {
            life: 1e3
          }));
        }).catch((V) => {
          console.error(V), v.value && (v.value.d_value = k(l)), y.value && y.value.setVisibleElementValue(k(l));
        });
      }
    }), r = d(() => K("user-option")), u = d(() => typeof e.options == "object" && !Array.isArray(e.options) ? Q(e.options, (o, t) => ({
      value: t,
      label: o
    })) : e.options ?? []), g = d(
      () => u.value.length > 0 && typeof u.value[0] == "string" ? void 0 : e.optionLabel
    ), h = d(
      () => u.value.length > 0 && typeof u.value[0] == "string" ? void 0 : e.optionValue
    );
    function U(o) {
      o.files[0] && (l.value = o.files[0]);
    }
    const F = Y();
    function T(o) {
      F.require({
        target: o.currentTarget,
        group: "popup",
        message: i("Are you sure to delete this image?"),
        icon: "pi pi-info-circle",
        rejectProps: {
          label: i("Cancel"),
          severity: "secondary",
          outlined: !0
        },
        acceptProps: {
          label: i("Delete"),
          severity: "danger"
        },
        accept: () => {
          l.value = null;
        }
      });
    }
    function D() {
      e.type === "image" ? C.value?.choose() : e.type === "select" && v.value.show(!0);
    }
    return (o, t) => {
      const V = w("ToggleSwitch"), O = w("Image"), A = w("Button"), L = E("tooltip");
      return a(), m("div", {
        class: f(["items-center gap-2", { flex: e.fluid, "inline-flex": !e.fluid }])
      }, [
        x("label", {
          ref_key: "labelRef",
          ref: z,
          for: r.value,
          class: f([[{ grow: !e.controlFluid }], "light:hover:bg-yellow-300/25 cursor-pointer rounded-lg dark:hover:bg-zinc-100/10"]),
          onClick: D
        }, [
          e.label ? (a(), m(G, { key: 0 }, [
            x("span", null, B(e.label), 1),
            e.showAfterLabelDots ? (a(), m("span", te, ": ")) : I("", !0)
          ], 64)) : N(o.$slots, "default", { key: 1 })
        ], 10, le),
        e.type === "switch" ? (a(), s(V, {
          key: 0,
          modelValue: l.value,
          "onUpdate:modelValue": t[0] || (t[0] = (n) => l.value = n),
          "input-id": r.value
        }, null, 8, ["modelValue", "input-id"])) : e.type === "select_button" ? (a(), s(_, {
          key: 1,
          modelValue: l.value,
          "onUpdate:modelValue": t[1] || (t[1] = (n) => l.value = n),
          "input-id": r.value,
          class: f({ grow: e.controlFluid }),
          "option-label": g.value,
          "option-value": h.value,
          size: e.size,
          options: u.value
        }, null, 8, ["modelValue", "input-id", "class", "option-label", "option-value", "size", "options"])) : e.type === "select" ? (a(), s(c(X), {
          key: 2,
          ref_key: "selectInputRef",
          ref: v,
          modelValue: l.value,
          "onUpdate:modelValue": t[2] || (t[2] = (n) => l.value = n),
          class: f({ grow: e.controlFluid }),
          "option-label": g.value,
          "option-value": h.value,
          options: u.value,
          "input-id": r.value,
          size: e.size
        }, null, 8, ["modelValue", "class", "option-label", "option-value", "options", "input-id", "size"])) : e.type === "tree_select" ? (a(), s(H, q({
          key: 3,
          ref_key: "treeSelectInputRef",
          ref: y,
          modelValue: l.value,
          "onUpdate:modelValue": t[3] || (t[3] = (n) => l.value = n),
          class: { grow: e.controlFluid },
          clearable: e.clearable,
          "option-label": g.value,
          "option-value": h.value,
          options: u.value,
          "input-id": r.value,
          size: e.size
        }, e.binds ?? {}), null, 16, ["modelValue", "class", "clearable", "option-label", "option-value", "options", "input-id", "size"])) : e.type === "text" ? (a(), s(ee, {
          key: 4,
          modelValue: l.value,
          "onUpdate:modelValue": t[4] || (t[4] = (n) => l.value = n),
          modelModifiers: { lazy: !0 },
          "input-id": r.value,
          lazy: "",
          class: f({ grow: e.controlFluid })
        }, null, 8, ["modelValue", "input-id", "class"])) : e.type === "image" ? (a(), m("div", {
          key: 5,
          class: f(["flex items-center gap-2", { grow: e.controlFluid }])
        }, [
          l.value ? (a(), s(O, {
            key: 0,
            src: l.value,
            alt: c(i)("Missing Image"),
            style: { "max-height": "200px", "max-width": "200px" },
            preview: ""
          }, null, 8, ["src", "alt"])) : (a(), m("div", oe, B(c(i)("No Image Selected")), 1)),
          P(c(W), {
            ref_key: "fileUploadRef",
            ref: C,
            mode: "basic",
            accept: "image/*",
            bs: "",
            auto: "",
            "custom-upload": "",
            "choose-label": l.value ? c(i)("Change Image") : c(i)("Upload Image"),
            "choose-button-props": { size: "small", severity: "info" },
            "choose-icon": "i-mdi-upload",
            onUploader: U
          }, null, 8, ["choose-label"]),
          l.value ? j((a(), s(A, {
            key: 2,
            type: "button",
            icon: "pi pi-trash",
            class: "p-button-text p-button-danger",
            onClick: T
          }, null, 512)), [
            [
              L,
              c(i)("Delete"),
              void 0,
              { top: !0 }
            ]
          ]) : I("", !0)
        ], 2)) : I("", !0)
      ], 2);
    };
  }
});
export {
  ve as default
};
