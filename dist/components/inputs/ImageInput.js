import { defineComponent as A, useModel as b, useTemplateRef as y, ref as u, watch as H, resolveComponent as h, resolveDirective as q, openBlock as d, createBlock as B, normalizeProps as F, guardReactiveProps as S, unref as t, withCtx as j, createElementVNode as s, normalizeClass as E, createVNode as I, createElementBlock as N, Fragment as P, withDirectives as T, createCommentVNode as w, mergeModels as x } from "vue";
import { useHddBaseInputUtils as O } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { useDropZone as $, computedAsync as Z } from "@vueuse/core";
import { useI18n as K } from "vue-i18n";
import { _ as G } from "../../BaseInput.vue_vue_type_script_setup_true_lang-C8yTwTDa.js";
const J = ["accept"], ae = /* @__PURE__ */ A({
  __name: "ImageInput",
  props: /* @__PURE__ */ x({
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
  emits: /* @__PURE__ */ x(["change", "clear", "unclear"], ["update:modelValue", "update:currentUrl"]),
  setup(e, { expose: C, emit: L }) {
    const n = e, c = L, o = b(e, "modelValue"), i = b(e, "currentUrl"), { t: r } = K(), p = y("fileInputRef"), m = y("dropzoneRef"), f = u(), { isOverDropZone: M } = $(m, {
      onDrop: (l) => {
        n.disabled || (o.value = l[0] ?? void 0);
      },
      dataTypes: n.accept.split(","),
      multiple: !1,
      preventDefaultForUnhandled: !1
    });
    function R() {
      f.value.$el.focus();
    }
    function k(l) {
      const a = l.target;
      o.value = a.files[0] ?? void 0, a.value = "";
    }
    const g = Z(async () => {
      const l = o.value;
      return l ? URL.createObjectURL(l) : i.value;
    }), z = () => {
      o.value = null, i.value && (i.value = null);
    };
    H(o, (l) => {
      c(l ? "unclear" : "clear");
    });
    const { exposed: U, baseInputForwardedProps: D, fieldUniqueId: Q, generalInputProps: X } = O(n);
    return C({ focus: R, ...U }), (l, a) => {
      const v = h("Button"), V = h("Image"), W = q("tooltip");
      return d(), B(G, F(S(t(D))), {
        default: j(() => [
          s("div", {
            ref_key: "dropzoneRef",
            ref: m,
            class: E(["flex items-center gap-1 w-full", {
              "border-amber border-1 border-dashed rounded-lg bg-amber-100/25 dark:bg-amber-700/45": t(M) && !e.disabled
            }])
          }, [
            s("div", null, [
              s("input", {
                ref_key: "fileInputRef",
                ref: p,
                type: "file",
                accept: e.accept,
                style: { display: "none" },
                onChange: k
              }, null, 40, J),
              I(v, {
                ref_key: "inputRef",
                ref: f,
                size: e.size,
                label: e.uploadButtonLabel ?? t(r)("Choose File"),
                disabled: e.disabled,
                icon: e.uploadButtonIcon ?? "pi pi-upload",
                onClick: a[0] || (a[0] = (Y) => p.value?.click())
              }, null, 8, ["size", "label", "disabled", "icon"])
            ]),
            t(g) ? (d(), N(P, { key: 0 }, [
              I(V, {
                src: t(g),
                alt: t(r)("Image not found"),
                "image-style": {
                  minWidth: e.previewMinWidth + "px",
                  minHeight: e.previewMinHeight + "px",
                  maxWidth: e.previewMaxWidth + "px",
                  maxHeight: e.previewMaxHeight + "px"
                },
                preview: ""
              }, null, 8, ["src", "alt", "image-style"]),
              e.clearable ? T((d(), B(v, {
                key: 0,
                size: "small",
                severity: "danger",
                icon: "i-ph-trash",
                onClick: z
              }, null, 512)), [
                [W, t(r)("Remove")]
              ]) : w("", !0)
            ], 64)) : w("", !0)
          ], 2)
        ]),
        _: 1
      }, 16);
    };
  }
});
export {
  ae as default
};
