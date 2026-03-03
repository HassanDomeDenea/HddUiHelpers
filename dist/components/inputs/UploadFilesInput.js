import { defineComponent as Z, useModel as _, useTemplateRef as D, ref as m, computed as q, resolveComponent as ee, resolveDirective as le, openBlock as a, createBlock as C, mergeProps as te, unref as t, createSlots as oe, withCtx as b, createElementVNode as n, createElementBlock as u, toDisplayString as M, createCommentVNode as y, Fragment as x, renderList as V, createVNode as w, withDirectives as f, normalizeClass as ae, normalizeStyle as ne, renderSlot as N, mergeModels as W } from "vue";
import { useHddBaseInputUtils as ie } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { reduce as se } from "lodash-es";
import { useI18n as re } from "vue-i18n";
import { rotateImageFile as ue } from "HddUiHelpers/utils/filesManipulations";
import { _ as ce } from "../../BaseInput.vue_vue_type_script_setup_true_lang-C8yTwTDa.js";
import g from "primevue/button";
const de = ["id", "name", "accept"], ve = {
  key: 0,
  class: "mb-1 font-bold"
}, fe = { class: "flex items-center gap-2" }, pe = {
  key: 0,
  class: "italic"
}, me = {
  key: 1,
  class: "flex flex-wrap items-start gap-4"
}, ye = ["src", "alt"], ge = { class: "flex flex-col gap-1" }, he = { key: 1 }, be = { class: "flex flex-wrap items-start gap-4" }, ke = { class: "relative" }, Be = {
  key: 0,
  class: "z-1 pointer-events-none absolute inset-0 flex items-center justify-center"
}, Fe = ["src", "alt"], Ce = { class: "flex flex-col gap-1" }, $e = /* @__PURE__ */ Z({
  __name: "UploadFilesInput",
  props: /* @__PURE__ */ W({
    accept: {},
    clearable: { type: Boolean, default: !0 },
    uploadFromScanner: { type: Boolean, default: !0 },
    acceptImages: { type: Boolean, default: !0 },
    showUploadButtonsWhenFileSelected: { type: Boolean, default: !0 },
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
    newFiles: { default: m([]).value },
    newFilesModifiers: {},
    oldFiles: { default: m([]).value },
    oldFilesModifiers: {},
    toBeRemovedFiles: { default: m([]).value },
    toBeRemovedFilesModifiers: {},
    toBeModifiedFiles: {
      default: m({}).value
    },
    toBeModifiedFilesModifiers: {}
  }),
  emits: /* @__PURE__ */ W(["fileSelected"], ["update:newFiles", "update:oldFiles", "update:toBeRemovedFiles", "update:toBeModifiedFiles"]),
  setup(d, { expose: E }) {
    const I = d, s = _(d, "newFiles"), k = _(d, "oldFiles");
    _(d, "toBeRemovedFiles");
    const l = _(d, "toBeModifiedFiles"), B = D("fileInputRef"), T = D("buttonRef");
    m({});
    const R = m({}), { t: r } = re();
    function U() {
      T.value?.$el.focus();
    }
    function j() {
      B.value?.click();
    }
    function H() {
      s.value ? s.value = Object.values(B.value.files || []) : s.value = Object.values(B.value.files || []), B.value.value = "";
    }
    function O(e) {
      return URL.createObjectURL(e);
    }
    function P(e) {
      s.value.splice(e, 1);
    }
    const K = q(() => I.accept ?? I.acceptImages ? "image/png,image/jpeg" : void 0);
    function z(e, i = !0) {
      i ? (l.value || (l.value = {}), l.value[e] || (l.value[e] = {}), l.value[e].remove = !0) : (l.value || (l.value = {}), l.value[e] || (l.value[e] = {}), l.value[e].remove = !1);
    }
    const S = q(() => se(
      l.value || {},
      (e, i, h) => (i.remove && (e[h] = !0), e),
      {}
    ));
    function G(e, i) {
      R.value && R.value[i] && l.value && l.value[e.id] && (R.value[i].rotate = l.value[e.id].rotate || 0);
    }
    function L(e, i) {
      l.value || (l.value = {}), l.value[e.id] || (l.value[e.id] = {}), l.value[e.id].rotate || (l.value[e.id].rotate = 0), l.value[e.id].rotate += i === "left" ? -90 : 90, l.value[e.id].rotate >= 360 && (l.value[e.id].rotate = l.value[e.id].rotate % 360);
    }
    const p = m(0);
    function $(e, i, h = !1) {
      p.value += i === "left" ? -90 : 90, p.value >= 360 && (p.value = p.value % 360), h && A(e);
    }
    async function A(e) {
      p.value !== 0 && (s.value[e] = await ue(
        s.value[e],
        p.value
      )), p.value = 0;
    }
    const { exposed: J, baseInputForwardedProps: Q, fieldUniqueId: X, generalInputProps: Y } = ie(I);
    return E({ focus: U, ...J }), (e, i) => {
      const h = ee("Image"), v = le("tooltip");
      return a(), C(ce, te(t(Q), { onClick: U }), oe({
        labelText: b(() => [
          N(e.$slots, "label-text")
        ]),
        default: b(() => [
          n("div", null, [
            n("input", {
              id: t(X),
              ref_key: "fileInputRef",
              ref: B,
              name: t(Y).name,
              type: "file",
              hidden: "",
              accept: K.value,
              multiple: !0,
              onChange: H
            }, null, 40, de),
            k.value?.length && s.value?.length ? (a(), u("div", ve, M(t(r)("New Files")) + ": ", 1)) : y("", !0),
            n("div", fe, [
              n("div", null, [
                s.value?.length ? (a(), u("div", me, [
                  (a(!0), u(x, null, V(s.value, (o, c) => (a(), u("div", {
                    key: c,
                    class: "flex items-start gap-1"
                  }, [
                    w(h, {
                      src: O(o),
                      alt: o.name,
                      preview: "",
                      pt: {
                        rotateLeftButton: {
                          onClick: () => $(c, "left")
                        },
                        rotateRightButton: {
                          onClick: () => $(c, "right")
                        }
                      },
                      onHide: (F) => A(c)
                    }, {
                      image: b(() => [
                        n("img", {
                          src: O(o),
                          alt: o.name,
                          class: "max-h-60px max-w-60px"
                        }, null, 8, ye)
                      ]),
                      _: 2
                    }, 1032, ["src", "alt", "pt", "onHide"]),
                    n("div", ge, [
                      d.clearable ? f((a(), C(t(g), {
                        key: 0,
                        text: "",
                        icon: "pi pi-times",
                        severity: "danger",
                        class: "p-button-xs",
                        onClick: (F) => P(c)
                      }, null, 8, ["onClick"])), [
                        [v, t(r)("Remove Selection")]
                      ]) : y("", !0),
                      f(w(t(g), {
                        text: "",
                        icon: "pi pi-refresh",
                        severity: "info",
                        class: "p-button-xs",
                        onClick: (F) => $(c, "right", !0)
                      }, null, 8, ["onClick"]), [
                        [v, t(r)("Rotate Image")]
                      ])
                    ])
                  ]))), 128))
                ])) : (a(), u(x, { key: 0 }, [
                  k.value?.length ? y("", !0) : (a(), u("span", pe, M(t(r)("No File Selected")), 1))
                ], 64))
              ]),
              !s.value?.length || d.showUploadButtonsWhenFileSelected ? (a(), u(x, { key: 0 }, [
                n("div", null, [
                  f(w(t(g), {
                    ref_key: "buttonRef",
                    ref: T,
                    icon: "pi pi-upload",
                    severity: "info",
                    size: "small",
                    onClick: j
                  }, null, 512), [
                    [v, s.value?.length ? t(r)("Choose another image") : t(r)("Choose Image")]
                  ])
                ]),
                n("div", null, [
                  f(w(t(g), {
                    icon: "i-mdi-scanner",
                    severity: "warn",
                    size: "small",
                    onClick: j
                  }, null, 512), [
                    [v, t(r)("Use Scanner")]
                  ])
                ])
              ], 64)) : y("", !0)
            ]),
            k.value && k.value.length > 0 ? (a(), u("div", he, [
              n("div", {
                class: ae(["font-bold", { "mt-2": s.value?.length }])
              }, M(t(r)("Current Files")) + ": ", 3),
              n("div", be, [
                (a(!0), u(x, null, V(k.value, (o, c) => (a(), u("div", {
                  key: c,
                  class: "flex items-start gap-1"
                }, [
                  n("div", ke, [
                    S.value[o.id] ? (a(), u("div", Be, [...i[0] || (i[0] = [
                      n("div", { class: "size-40px flex items-center justify-center rounded-lg bg-white/50 p-2" }, [
                        n("i", { class: "i-pepicons-print-times-off light:text-red-800/75 text-4xl font-bold dark:text-red-400/75" })
                      ], -1)
                    ])])) : y("", !0),
                    f((a(), C(h, {
                      ref_for: !0,
                      ref_key: "oldFilesImageRefs",
                      ref: R,
                      src: o.original_url,
                      alt: o.name,
                      preview: "",
                      "preview-button-props": { onClick: () => G(o, c) },
                      pt: {
                        rotateLeftButton: {
                          onClick: () => L(o, "left")
                        },
                        rotateRightButton: {
                          onClick: () => L(o, "right")
                        }
                      }
                    }, {
                      image: b(() => [
                        n("img", {
                          src: o.thumb_url,
                          alt: o.name,
                          class: "max-h-60px max-w-60px",
                          style: ne(
                            l.value?.[o.id]?.rotate ? { transform: `rotate(${l.value[o.id].rotate}deg)` } : void 0
                          )
                        }, null, 12, Fe)
                      ]),
                      _: 2
                    }, 1032, ["src", "alt", "preview-button-props", "pt"])), [
                      [
                        v,
                        S.value[o.id] ? t(r)("Will be deleted") : void 0
                      ]
                    ])
                  ]),
                  n("div", Ce, [
                    d.clearable ? (a(), u(x, { key: 0 }, [
                      S.value[o.id] ? f((a(), C(t(g), {
                        key: 0,
                        text: "",
                        icon: "pi pi-history",
                        severity: "danger",
                        class: "p-button-xs",
                        onClick: (F) => z(o.id, !1)
                      }, null, 8, ["onClick"])), [
                        [v, t(r)("Restore File")]
                      ]) : f((a(), C(t(g), {
                        key: 1,
                        text: "",
                        icon: "pi pi-times",
                        severity: "danger",
                        class: "p-button-xs",
                        onClick: (F) => z(o.id)
                      }, null, 8, ["onClick"])), [
                        [v, t(r)("Remove File")]
                      ])
                    ], 64)) : y("", !0),
                    f(w(t(g), {
                      text: "",
                      icon: "pi pi-refresh",
                      severity: "info",
                      class: "p-button-xs",
                      onClick: (F) => L(o, "right")
                    }, null, 8, ["onClick"]), [
                      [v, t(r)("Rotate Image")]
                    ])
                  ])
                ]))), 128))
              ])
            ])) : y("", !0)
          ])
        ]),
        _: 2
      }, [
        e.$slots.addon ? {
          name: "addon",
          fn: b(() => [
            N(e.$slots, "addon")
          ]),
          key: "0"
        } : void 0,
        e.$slots.helper ? {
          name: "helper",
          fn: b(() => [
            N(e.$slots, "helper")
          ]),
          key: "1"
        } : void 0
      ]), 1040);
    };
  }
});
export {
  $e as default
};
