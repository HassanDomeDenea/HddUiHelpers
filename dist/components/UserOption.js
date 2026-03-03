import { defineComponent as M, resolveComponent as f, resolveDirective as E, openBlock as i, createElementBlock as p, normalizeClass as d, createElementVNode as R, unref as t, Fragment as G, toDisplayString as z, createCommentVNode as k, renderSlot as N, createBlock as c, isRef as m, mergeProps as q, createVNode as P, withDirectives as j } from "vue";
import H from "HddUiHelpers/components/inputs/TreeSelectInput.vue";
import { useApiClient as $ } from "HddUiHelpers/stores/apiClient";
import { useBasicAuthStore as J } from "HddUiHelpers/stores/basicAuth";
import { uniqueId as K, map as Q } from "lodash-es";
import { FileUpload as W } from "primevue";
import X from "primevue/select";
import { useConfirm as Y } from "primevue/useconfirm";
const Z = ["for"], _ = { key: 0 }, ee = {
  key: 1,
  class: "self-center"
}, ce = /* @__PURE__ */ M({
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
    const b = J(), w = $(), y = useTemplateRef("selectInputRef"), g = useTemplateRef("treeSelectInputRef"), { t: a } = useI18n(), I = useTemplateRef("labelRef"), S = useTemplateRef("fileUploadRef"), x = computed(() => e.isGlobal !== !1), l = computed({
      get() {
        return x.value === !0 ? b.globalOptions?.[e.option] : b.options[e.option];
      },
      set(n) {
        let o;
        toValue(x) === !0 ? o = b.changeGlobalOption(e.option, n) : o = b.changeOption(e.option, n), o.then(() => {
          e.showSuccess && (e.type === "checkbox" || e.type === "switch" ? w.toastSuccess(
            e.label || I.value?.innerHTML,
            a(n ? "Enabled" : "Disabled"),
            {
              life: 2e3,
              contentStyleClass: "[&_.p-toast-detail]:!font-bold",
              severity: n ? "success" : "warn"
            }
          ) : w.toastSuccess(e.successToastMessage ?? a("Option Changed Successfully"), "", {
            life: 1e3
          }));
        }).catch((V) => {
          console.error(V), y.value && (y.value.d_value = toValue(l)), g.value && g.value.setVisibleElementValue(toValue(l));
        });
      }
    }), r = computed(() => K("user-option")), s = computed(() => typeof e.options == "object" && !Array.isArray(e.options) ? Q(e.options, (n, o) => ({
      value: o,
      label: n
    })) : e.options ?? []), v = computed(
      () => s.value.length > 0 && typeof s.value[0] == "string" ? void 0 : e.optionLabel
    ), h = computed(
      () => s.value.length > 0 && typeof s.value[0] == "string" ? void 0 : e.optionValue
    );
    function C(n) {
      n.files[0] && (l.value = n.files[0]);
    }
    const B = Y();
    function T(n) {
      B.require({
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
    function U() {
      e.type === "image" ? S.value?.choose() : e.type === "select" && y.value.show(!0);
    }
    return (n, o) => {
      const V = f("ToggleSwitch"), F = f("SelectButtonInput"), D = f("TextInput"), O = f("Image"), A = f("Button"), L = E("tooltip");
      return i(), p("div", {
        class: d(["items-center gap-2", { flex: e.fluid, "inline-flex": !e.fluid }])
      }, [
        R("label", {
          ref_key: "labelRef",
          ref: I,
          for: t(r),
          class: d([[{ "flex-grow": !e.controlFluid }], "light:hover:bg-yellow-300/25 cursor-pointer rounded-lg dark:hover:bg-zinc-100/10"]),
          onClick: U
        }, [
          e.label ? (i(), p(G, { key: 0 }, [
            R("span", null, z(e.label), 1),
            e.showAfterLabelDots ? (i(), p("span", _, ": ")) : k("", !0)
          ], 64)) : N(n.$slots, "default", { key: 1 })
        ], 10, Z),
        e.type === "switch" ? (i(), c(V, {
          key: 0,
          modelValue: t(l),
          "onUpdate:modelValue": o[0] || (o[0] = (u) => m(l) ? l.value = u : null),
          "input-id": t(r)
        }, null, 8, ["modelValue", "input-id"])) : e.type === "select_button" ? (i(), c(F, {
          key: 1,
          modelValue: t(l),
          "onUpdate:modelValue": o[1] || (o[1] = (u) => m(l) ? l.value = u : null),
          "input-id": t(r),
          class: d({ "flex-grow": e.controlFluid }),
          "option-label": t(v),
          "option-value": t(h),
          size: e.size,
          options: t(s)
        }, null, 8, ["modelValue", "input-id", "class", "option-label", "option-value", "size", "options"])) : e.type === "select" ? (i(), c(t(X), {
          key: 2,
          ref_key: "selectInputRef",
          ref: y,
          modelValue: t(l),
          "onUpdate:modelValue": o[2] || (o[2] = (u) => m(l) ? l.value = u : null),
          class: d({ "flex-grow": e.controlFluid }),
          "option-label": t(v),
          "option-value": t(h),
          options: t(s),
          "input-id": t(r),
          size: e.size
        }, null, 8, ["modelValue", "class", "option-label", "option-value", "options", "input-id", "size"])) : e.type === "tree_select" ? (i(), c(H, q({
          key: 3,
          ref_key: "treeSelectInputRef",
          ref: g,
          modelValue: t(l),
          "onUpdate:modelValue": o[3] || (o[3] = (u) => m(l) ? l.value = u : null),
          class: { "flex-grow": e.controlFluid },
          clearable: e.clearable,
          "option-label": t(v),
          "option-value": t(h),
          options: t(s),
          "input-id": t(r),
          size: e.size
        }, e.binds ?? {}), null, 16, ["modelValue", "class", "clearable", "option-label", "option-value", "options", "input-id", "size"])) : e.type === "text" ? (i(), c(D, {
          key: 4,
          modelValue: t(l),
          "onUpdate:modelValue": o[4] || (o[4] = (u) => m(l) ? l.value = u : null),
          modelModifiers: { lazy: !0 },
          "input-id": t(r),
          lazy: "",
          class: d({ "flex-grow": e.controlFluid })
        }, null, 8, ["modelValue", "input-id", "class"])) : e.type === "image" ? (i(), p("div", {
          key: 5,
          class: d(["flex items-center gap-2", { "flex-grow": e.controlFluid }])
        }, [
          t(l) ? (i(), c(O, {
            key: 0,
            src: t(l),
            alt: t(a)("Missing Image"),
            style: { "max-height": "200px", "max-width": "200px" },
            preview: ""
          }, null, 8, ["src", "alt"])) : (i(), p("div", ee, z(t(a)("No Image Selected")), 1)),
          P(t(W), {
            ref_key: "fileUploadRef",
            ref: S,
            mode: "basic",
            accept: "image/*",
            bs: "",
            auto: "",
            "custom-upload": "",
            "choose-label": t(l) ? t(a)("Change Image") : t(a)("Upload Image"),
            "choose-button-props": { size: "small", severity: "info" },
            "choose-icon": "i-mdi-upload",
            onUploader: C
          }, null, 8, ["choose-label"]),
          t(l) ? j((i(), c(A, {
            key: 2,
            type: "button",
            icon: "pi pi-trash",
            class: "p-button-text p-button-danger",
            onClick: T
          }, null, 512)), [
            [
              L,
              t(a)("Delete"),
              void 0,
              { top: !0 }
            ]
          ]) : k("", !0)
        ], 2)) : k("", !0)
      ], 2);
    };
  }
});
export {
  ce as default
};
