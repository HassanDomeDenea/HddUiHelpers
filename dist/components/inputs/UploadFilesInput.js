import Z from "primevue/tooltip";
import ee from "primevue/button";
import te from "primevue/image";
import { defineComponent as le, useModel as R, ref as g, computed as q, openBlock as a, createBlock as F, mergeProps as oe, unref as o, createSlots as ae, withCtx as b, createElementVNode as n, createElementBlock as u, toDisplayString as M, createCommentVNode as y, Fragment as C, renderList as D, createVNode as x, withDirectives as p, normalizeClass as ne, normalizeStyle as ie, renderSlot as N, mergeModels as V } from "vue";
import { useHddBaseInputUtils as se } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { reduce as re } from "lodash-es";
import { rotateImageFile as ue } from "../../utils/filesManipulations.js";
import { _ as ce } from "../../BaseInput.vue_vue_type_script_setup_true_lang-Ca5DqyVP.js";
import { templateRef as W } from "@vueuse/core";
import { useI18n as de } from "vue-i18n";
const fe = ["id", "name", "accept"], pe = {
  key: 0,
  class: "mb-1 font-bold"
}, ve = { class: "flex items-center gap-2" }, me = {
  key: 0,
  class: "italic"
}, ge = {
  key: 1,
  class: "flex flex-wrap items-start gap-4"
}, ye = ["src", "alt"], he = { class: "flex flex-col gap-1" }, be = { key: 1 }, Be = { class: "flex flex-wrap items-start gap-4" }, ke = { class: "relative" }, _e = {
  key: 0,
  class: "z-1 pointer-events-none absolute inset-0 flex items-center justify-center"
}, Fe = ["src", "alt"], Ce = { class: "flex flex-col gap-1" }, Oe = /* @__PURE__ */ le({
  __name: "UploadFilesInput",
  props: /* @__PURE__ */ V({
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
    newFiles: { default: g([]).value },
    newFilesModifiers: {},
    oldFiles: { default: g([]).value },
    oldFilesModifiers: {},
    toBeRemovedFiles: { default: g([]).value },
    toBeRemovedFilesModifiers: {},
    toBeModifiedFiles: {
      default: g({}).value
    },
    toBeModifiedFilesModifiers: {}
  }),
  emits: /* @__PURE__ */ V(["fileSelected"], ["update:newFiles", "update:oldFiles", "update:toBeRemovedFiles", "update:toBeModifiedFiles"]),
  setup(d, { expose: E, emit: xe }) {
    const I = d, s = R(d, "newFiles"), B = R(d, "oldFiles");
    R(d, "toBeRemovedFiles");
    const t = R(d, "toBeModifiedFiles"), k = W("fileInputRef"), U = W("buttonRef");
    g({});
    const w = g({}), { t: r } = de();
    function j() {
      U.value?.$el.focus();
    }
    function O() {
      k.value?.click();
    }
    function H() {
      s.value ? s.value = Object.values(k.value.files || []) : s.value = Object.values(k.value.files || []), k.value.value = "";
    }
    function T(e) {
      return URL.createObjectURL(e);
    }
    function P(e) {
      s.value.splice(e, 1);
    }
    const K = q(() => I.accept ?? I.acceptImages ? "image/png,image/jpeg" : void 0);
    function z(e, i = !0) {
      i ? (t.value || (t.value = {}), t.value[e] || (t.value[e] = {}), t.value[e].remove = !0) : (t.value || (t.value = {}), t.value[e] || (t.value[e] = {}), t.value[e].remove = !1);
    }
    const S = q(() => re(
      t.value || {},
      (e, i, h) => (i.remove && (e[h] = !0), e),
      {}
    ));
    function G(e, i) {
      w.value && w.value[i] && t.value && t.value[e.id] && (w.value[i].rotate = t.value[e.id].rotate || 0);
    }
    function L(e, i) {
      t.value || (t.value = {}), t.value[e.id] || (t.value[e.id] = {}), t.value[e.id].rotate || (t.value[e.id].rotate = 0), t.value[e.id].rotate += i === "left" ? -90 : 90, t.value[e.id].rotate >= 360 && (t.value[e.id].rotate = t.value[e.id].rotate % 360);
    }
    const v = g(0);
    function $(e, i, h = !1) {
      v.value += i === "left" ? -90 : 90, v.value >= 360 && (v.value = v.value % 360), h && A(e);
    }
    async function A(e) {
      v.value !== 0 && (s.value[e] = await ue(
        s.value[e],
        v.value
      )), v.value = 0;
    }
    const { exposed: J, baseInputForwardedProps: Q, fieldUniqueId: X, generalInputProps: Y } = se(I);
    return E({ focus: j, ...J }), (e, i) => {
      const h = te, m = ee, f = Z;
      return a(), F(ce, oe(o(Q), { onClick: j }), ae({
        labelText: b(() => [
          N(e.$slots, "label-text")
        ]),
        default: b(() => [
          n("div", null, [
            n("input", {
              id: o(X),
              ref_key: "fileInputRef",
              ref: k,
              name: o(Y).name,
              type: "file",
              hidden: "",
              accept: o(K),
              multiple: !0,
              onChange: H
            }, null, 40, fe),
            B.value?.length && s.value?.length ? (a(), u("div", pe, M(o(r)("New Files")) + ": ", 1)) : y("", !0),
            n("div", ve, [
              n("div", null, [
                s.value?.length ? (a(), u("div", ge, [
                  (a(!0), u(C, null, D(s.value, (l, c) => (a(), u("div", {
                    key: c,
                    class: "flex items-start gap-1"
                  }, [
                    x(h, {
                      src: T(l),
                      alt: l.name,
                      preview: "",
                      pt: {
                        rotateLeftButton: {
                          onClick: () => $(c, "left")
                        },
                        rotateRightButton: {
                          onClick: () => $(c, "right")
                        }
                      },
                      onHide: (_) => A(c)
                    }, {
                      image: b(() => [
                        n("img", {
                          src: T(l),
                          alt: l.name,
                          class: "max-h-60px max-w-60px"
                        }, null, 8, ye)
                      ]),
                      _: 2
                    }, 1032, ["src", "alt", "pt", "onHide"]),
                    n("div", he, [
                      d.clearable ? p((a(), F(m, {
                        key: 0,
                        text: "",
                        icon: "pi pi-times",
                        severity: "danger",
                        class: "p-button-xs",
                        onClick: (_) => P(c)
                      }, null, 8, ["onClick"])), [
                        [f, o(r)("Remove Selection")]
                      ]) : y("", !0),
                      p(x(m, {
                        text: "",
                        icon: "pi pi-refresh",
                        severity: "info",
                        class: "p-button-xs",
                        onClick: (_) => $(c, "right", !0)
                      }, null, 8, ["onClick"]), [
                        [f, o(r)("Rotate Image")]
                      ])
                    ])
                  ]))), 128))
                ])) : (a(), u(C, { key: 0 }, [
                  B.value?.length ? y("", !0) : (a(), u("span", me, M(o(r)("No File Selected")), 1))
                ], 64))
              ]),
              !s.value?.length || d.showUploadButtonsWhenFileSelected ? (a(), u(C, { key: 0 }, [
                n("div", null, [
                  p(x(m, {
                    ref_key: "buttonRef",
                    ref: U,
                    icon: "pi pi-upload",
                    severity: "info",
                    size: "small",
                    onClick: O
                  }, null, 512), [
                    [f, s.value?.length ? o(r)("Choose another image") : o(r)("Choose Image")]
                  ])
                ]),
                n("div", null, [
                  p(x(m, {
                    icon: "i-mdi-scanner",
                    severity: "warn",
                    size: "small",
                    onClick: O
                  }, null, 512), [
                    [f, o(r)("Use Scanner")]
                  ])
                ])
              ], 64)) : y("", !0)
            ]),
            B.value && B.value.length > 0 ? (a(), u("div", be, [
              n("div", {
                class: ne(["font-bold", { "mt-2": s.value?.length }])
              }, M(o(r)("Current Files")) + ": ", 3),
              n("div", Be, [
                (a(!0), u(C, null, D(B.value, (l, c) => (a(), u("div", {
                  key: c,
                  class: "flex items-start gap-1"
                }, [
                  n("div", ke, [
                    o(S)[l.id] ? (a(), u("div", _e, [...i[0] || (i[0] = [
                      n("div", { class: "size-40px flex items-center justify-center rounded-lg bg-white/50 p-2" }, [
                        n("i", { class: "i-pepicons-print-times-off light:text-red-800/75 text-4xl font-bold dark:text-red-400/75" })
                      ], -1)
                    ])])) : y("", !0),
                    p((a(), F(h, {
                      ref_for: !0,
                      ref_key: "oldFilesImageRefs",
                      ref: w,
                      src: l.original_url,
                      alt: l.name,
                      preview: "",
                      "preview-button-props": { onClick: () => G(l, c) },
                      pt: {
                        rotateLeftButton: {
                          onClick: () => L(l, "left")
                        },
                        rotateRightButton: {
                          onClick: () => L(l, "right")
                        }
                      }
                    }, {
                      image: b(() => [
                        n("img", {
                          src: l.thumb_url,
                          alt: l.name,
                          class: "max-h-60px max-w-60px",
                          style: ie(
                            t.value?.[l.id]?.rotate ? { transform: `rotate(${t.value[l.id].rotate}deg)` } : void 0
                          )
                        }, null, 12, Fe)
                      ]),
                      _: 2
                    }, 1032, ["src", "alt", "preview-button-props", "pt"])), [
                      [
                        f,
                        o(S)[l.id] ? o(r)("Will be deleted") : void 0
                      ]
                    ])
                  ]),
                  n("div", Ce, [
                    d.clearable ? (a(), u(C, { key: 0 }, [
                      o(S)[l.id] ? p((a(), F(m, {
                        key: 0,
                        text: "",
                        icon: "pi pi-history",
                        severity: "danger",
                        class: "p-button-xs",
                        onClick: (_) => z(l.id, !1)
                      }, null, 8, ["onClick"])), [
                        [f, o(r)("Restore File")]
                      ]) : p((a(), F(m, {
                        key: 1,
                        text: "",
                        icon: "pi pi-times",
                        severity: "danger",
                        class: "p-button-xs",
                        onClick: (_) => z(l.id)
                      }, null, 8, ["onClick"])), [
                        [f, o(r)("Remove File")]
                      ])
                    ], 64)) : y("", !0),
                    p(x(m, {
                      text: "",
                      icon: "pi pi-refresh",
                      severity: "info",
                      class: "p-button-xs",
                      onClick: (_) => L(l, "right")
                    }, null, 8, ["onClick"]), [
                      [f, o(r)("Rotate Image")]
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
  Oe as default
};
