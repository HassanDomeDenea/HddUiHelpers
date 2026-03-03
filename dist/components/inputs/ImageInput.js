import { defineComponent as W, useModel as v, ref as u, resolveComponent as y, resolveDirective as A, openBlock as d, createBlock as h, normalizeProps as H, guardReactiveProps as q, unref as t, withCtx as F, createElementVNode as s, normalizeClass as S, createVNode as B, createElementBlock as T, Fragment as j, withDirectives as E, createCommentVNode as I, mergeModels as w } from "vue";
import { useHddBaseInputUtils as N } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { _ as P } from "../../BaseInput.vue_vue_type_script_setup_true_lang-DGVI56PE.js";
const O = ["accept"], X = /* @__PURE__ */ W({
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
    const n = e, c = C, o = v(e, "modelValue"), i = v(e, "currentUrl"), { t: r } = useI18n(), p = useTemplateRef("fileInputRef"), f = useTemplateRef("dropzoneRef"), m = u(), { isOverDropZone: R } = useDropZone(f, {
      onDrop: (l) => {
        n.disabled || (o.value = l[0] ?? void 0);
      },
      dataTypes: n.accept.split(","),
      multiple: !1,
      preventDefaultForUnhandled: !1
    });
    function L() {
      m.value.$el.focus();
    }
    function M(l) {
      const a = l.target;
      o.value = a.files[0] ?? void 0, a.value = "";
    }
    const g = computedAsync(async () => {
      const l = o.value;
      return l ? URL.createObjectURL(l) : i.value;
    }), k = () => {
      o.value = null, i.value && (i.value = null);
    };
    watch(o, (l) => {
      c(l ? "unclear" : "clear");
    });
    const { exposed: z, baseInputForwardedProps: U, fieldUniqueId: $, generalInputProps: Z } = N(n);
    return x({ focus: L, ...z }), (l, a) => {
      const b = y("Button"), D = y("Image"), V = A("tooltip");
      return d(), h(P, H(q(t(U))), {
        default: F(() => [
          s("div", {
            ref_key: "dropzoneRef",
            ref: f,
            class: S(["flex items-center gap-1 w-full", {
              "border-amber border-1 border-dashed rounded-lg bg-amber-100/25 dark:bg-amber-700/45": t(R) && !e.disabled
            }])
          }, [
            s("div", null, [
              s("input", {
                ref_key: "fileInputRef",
                ref: p,
                type: "file",
                accept: e.accept,
                style: { display: "none" },
                onChange: M
              }, null, 40, O),
              B(b, {
                ref_key: "inputRef",
                ref: m,
                size: e.size,
                label: e.uploadButtonLabel ?? t(r)("Choose File"),
                disabled: e.disabled,
                icon: e.uploadButtonIcon ?? "pi pi-upload",
                onClick: a[0] || (a[0] = (K) => t(p)?.click())
              }, null, 8, ["size", "label", "disabled", "icon"])
            ]),
            t(g) ? (d(), T(j, { key: 0 }, [
              B(D, {
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
              e.clearable ? E((d(), h(b, {
                key: 0,
                size: "small",
                severity: "danger",
                icon: "i-ph-trash",
                onClick: k
              }, null, 512)), [
                [V, t(r)("Remove")]
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
  X as default
};
