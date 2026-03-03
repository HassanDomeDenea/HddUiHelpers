import W from "primevue/tooltip";
import A from "primevue/image";
import H from "primevue/button";
import { defineComponent as q, useModel as v, useTemplateRef as y, ref as u, watch as F, openBlock as d, createBlock as h, normalizeProps as S, guardReactiveProps as j, unref as l, withCtx as E, createElementVNode as s, normalizeClass as N, createVNode as B, createElementBlock as P, Fragment as T, withDirectives as O, createCommentVNode as I, mergeModels as w } from "vue";
import { useHddBaseInputUtils as $ } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { _ as Z } from "./BaseInput.vue_vue_type_script_setup_true_lang-Ca5DqyVP.js";
import { useI18n as _ } from "vue-i18n";
import { useDropZone as K, computedAsync as G } from "@vueuse/core";
const J = ["accept"], ue = /* @__PURE__ */ q({
  __name: "ImageInput",
  props: /* @__PURE__ */ w({
    accept: { default: "image/png,image/jpeg,image/jpg,image/svg+xml" },
    previewMaxWidth: { default: 120 },
    previewMaxHeight: { default: 120 },
    previewMinWidth: {},
    previewMinHeight: {},
    clearable: { type: Boolean, default: !0 },
    uploadButtonIcon: {},
    uploadButtonLabel: {},
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
    modelValue: { default: u().value },
    modelModifiers: {},
    currentUrl: { default: u().value },
    currentUrlModifiers: {}
  }),
  emits: /* @__PURE__ */ w(["change", "clear", "unclear"], ["update:modelValue", "update:currentUrl"]),
  setup(e, { expose: x, emit: C }) {
    const a = e, c = C, o = v(e, "modelValue"), i = v(e, "currentUrl"), { t: r } = _(), p = y("fileInputRef"), m = y("dropzoneRef"), f = u(), { isOverDropZone: L } = K(m, {
      onDrop: (t) => {
        a.disabled || (o.value = t[0] ?? void 0);
      },
      dataTypes: a.accept.split(","),
      multiple: !1,
      preventDefaultForUnhandled: !1
    });
    function M() {
      f.value.$el.focus();
    }
    function R(t) {
      const n = t.target;
      o.value = n.files[0] ?? void 0, n.value = "";
    }
    const g = G(async () => {
      const t = o.value;
      return t ? URL.createObjectURL(t) : i.value;
    }), k = () => {
      o.value = null, i.value && (i.value = null);
    };
    F(o, (t) => {
      c(t ? "unclear" : "clear");
    });
    const { exposed: z, baseInputForwardedProps: U, fieldUniqueId: Q, generalInputProps: X } = $(a);
    return x({ focus: M, ...z }), (t, n) => {
      const b = H, D = A, V = W;
      return d(), h(Z, S(j(l(U))), {
        default: E(() => [
          s("div", {
            ref_key: "dropzoneRef",
            ref: m,
            class: N(["flex items-center gap-1 w-full", {
              "border-amber border-1 border-dashed rounded-lg bg-amber-100/25 dark:bg-amber-700/45": l(L) && !e.disabled
            }])
          }, [
            s("div", null, [
              s("input", {
                ref_key: "fileInputRef",
                ref: p,
                type: "file",
                accept: e.accept,
                style: { display: "none" },
                onChange: R
              }, null, 40, J),
              B(b, {
                ref_key: "inputRef",
                ref: f,
                size: e.size,
                label: e.uploadButtonLabel ?? l(r)("Choose File"),
                disabled: e.disabled,
                icon: e.uploadButtonIcon ?? "pi pi-upload",
                onClick: n[0] || (n[0] = (Y) => l(p)?.click())
              }, null, 8, ["size", "label", "disabled", "icon"])
            ]),
            l(g) ? (d(), P(T, { key: 0 }, [
              B(D, {
                src: l(g),
                alt: l(r)("Image not found"),
                "image-style": {
                  minWidth: e.previewMinWidth + "px",
                  minHeight: e.previewMinHeight + "px",
                  maxWidth: e.previewMaxWidth + "px",
                  maxHeight: e.previewMaxHeight + "px"
                },
                preview: ""
              }, null, 8, ["src", "alt", "image-style"]),
              e.clearable ? O((d(), h(b, {
                key: 0,
                size: "small",
                severity: "danger",
                icon: "i-ph-trash",
                onClick: k
              }, null, 512)), [
                [V, l(r)("Remove")]
              ]) : I("", !0)
            ], 64)) : I("", !0)
          ], 2)
        ]),
        _: 1
      }, 16);
    };
  }
});
export {
  ue as _
};
