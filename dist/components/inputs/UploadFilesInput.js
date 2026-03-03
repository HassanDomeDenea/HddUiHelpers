import { defineComponent as X, useModel as w, resolveComponent as A, resolveDirective as Y, openBlock as a, createBlock as F, mergeProps as Z, unref as o, createSlots as ee, withCtx as h, createElementVNode as n, createElementBlock as u, toDisplayString as $, createCommentVNode as y, Fragment as C, renderList as D, createVNode as x, withDirectives as p, normalizeClass as te, normalizeStyle as le, renderSlot as M, mergeModels as q } from "vue";
import { useHddBaseInputUtils as oe } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import { reduce as ae } from "lodash-es";
import { rotateImageFile as ne } from "../../utils/filesManipulations.js";
import { _ as ie } from "../../BaseInput.vue_vue_type_script_setup_true_lang-DGVI56PE.js";
const se = ["id", "name", "accept"], re = {
  key: 0,
  class: "mb-1 font-bold"
}, ue = { class: "flex items-center gap-2" }, ce = {
  key: 0,
  class: "italic"
}, de = {
  key: 1,
  class: "flex flex-wrap items-start gap-4"
}, fe = ["src", "alt"], pe = { class: "flex flex-col gap-1" }, ve = { key: 1 }, me = { class: "flex flex-wrap items-start gap-4" }, ye = { class: "relative" }, ge = {
  key: 0,
  class: "z-1 pointer-events-none absolute inset-0 flex items-center justify-center"
}, he = ["src", "alt"], be = { class: "flex flex-col gap-1" }, we = /* @__PURE__ */ X({
  __name: "UploadFilesInput",
  props: /* @__PURE__ */ q({
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
    newFiles: { default: ref([]).value },
    newFilesModifiers: {},
    oldFiles: { default: ref([]).value },
    oldFilesModifiers: {},
    toBeRemovedFiles: { default: ref([]).value },
    toBeRemovedFilesModifiers: {},
    toBeModifiedFiles: {
      default: ref({}).value
    },
    toBeModifiedFilesModifiers: {}
  }),
  emits: /* @__PURE__ */ q(["fileSelected"], ["update:newFiles", "update:oldFiles", "update:toBeRemovedFiles", "update:toBeModifiedFiles"]),
  setup(d, { expose: V, emit: Be }) {
    const R = d, s = w(d, "newFiles"), b = w(d, "oldFiles");
    w(d, "toBeRemovedFiles");
    const t = w(d, "toBeModifiedFiles"), B = templateRef("fileInputRef"), N = templateRef("buttonRef");
    ref({});
    const _ = ref({}), { t: r } = useI18n();
    function U() {
      N.value?.$el.focus();
    }
    function j() {
      B.value?.click();
    }
    function W() {
      s.value ? s.value = Object.values(B.value.files || []) : s.value = Object.values(B.value.files || []), B.value.value = "";
    }
    function O(e) {
      return URL.createObjectURL(e);
    }
    function E(e) {
      s.value.splice(e, 1);
    }
    const H = computed(() => R.accept ?? R.acceptImages ? "image/png,image/jpeg" : void 0);
    function T(e, i = !0) {
      i ? (t.value || (t.value = {}), t.value[e] || (t.value[e] = {}), t.value[e].remove = !0) : (t.value || (t.value = {}), t.value[e] || (t.value[e] = {}), t.value[e].remove = !1);
    }
    const I = computed(() => ae(
      t.value || {},
      (e, i, g) => (i.remove && (e[g] = !0), e),
      {}
    ));
    function P(e, i) {
      _.value && _.value[i] && t.value && t.value[e.id] && (_.value[i].rotate = t.value[e.id].rotate || 0);
    }
    function S(e, i) {
      t.value || (t.value = {}), t.value[e.id] || (t.value[e.id] = {}), t.value[e.id].rotate || (t.value[e.id].rotate = 0), t.value[e.id].rotate += i === "left" ? -90 : 90, t.value[e.id].rotate >= 360 && (t.value[e.id].rotate = t.value[e.id].rotate % 360);
    }
    const v = ref(0);
    function L(e, i, g = !1) {
      v.value += i === "left" ? -90 : 90, v.value >= 360 && (v.value = v.value % 360), g && z(e);
    }
    async function z(e) {
      v.value !== 0 && (s.value[e] = await ne(
        s.value[e],
        v.value
      )), v.value = 0;
    }
    const { exposed: K, baseInputForwardedProps: G, fieldUniqueId: J, generalInputProps: Q } = oe(R);
    return V({ focus: U, ...K }), (e, i) => {
      const g = A("Image"), m = A("Button"), f = Y("tooltip");
      return a(), F(ie, Z(o(G), { onClick: U }), ee({
        labelText: h(() => [
          M(e.$slots, "label-text")
        ]),
        default: h(() => [
          n("div", null, [
            n("input", {
              id: o(J),
              ref_key: "fileInputRef",
              ref: B,
              name: o(Q).name,
              type: "file",
              hidden: "",
              accept: o(H),
              multiple: !0,
              onChange: W
            }, null, 40, se),
            b.value?.length && s.value?.length ? (a(), u("div", re, $(o(r)("New Files")) + ": ", 1)) : y("", !0),
            n("div", ue, [
              n("div", null, [
                s.value?.length ? (a(), u("div", de, [
                  (a(!0), u(C, null, D(s.value, (l, c) => (a(), u("div", {
                    key: c,
                    class: "flex items-start gap-1"
                  }, [
                    x(g, {
                      src: O(l),
                      alt: l.name,
                      preview: "",
                      pt: {
                        rotateLeftButton: {
                          onClick: () => L(c, "left")
                        },
                        rotateRightButton: {
                          onClick: () => L(c, "right")
                        }
                      },
                      onHide: (k) => z(c)
                    }, {
                      image: h(() => [
                        n("img", {
                          src: O(l),
                          alt: l.name,
                          class: "max-h-60px max-w-60px"
                        }, null, 8, fe)
                      ]),
                      _: 2
                    }, 1032, ["src", "alt", "pt", "onHide"]),
                    n("div", pe, [
                      d.clearable ? p((a(), F(m, {
                        key: 0,
                        text: "",
                        icon: "pi pi-times",
                        severity: "danger",
                        class: "p-button-xs",
                        onClick: (k) => E(c)
                      }, null, 8, ["onClick"])), [
                        [f, o(r)("Remove Selection")]
                      ]) : y("", !0),
                      p(x(m, {
                        text: "",
                        icon: "pi pi-refresh",
                        severity: "info",
                        class: "p-button-xs",
                        onClick: (k) => L(c, "right", !0)
                      }, null, 8, ["onClick"]), [
                        [f, o(r)("Rotate Image")]
                      ])
                    ])
                  ]))), 128))
                ])) : (a(), u(C, { key: 0 }, [
                  b.value?.length ? y("", !0) : (a(), u("span", ce, $(o(r)("No File Selected")), 1))
                ], 64))
              ]),
              !s.value?.length || d.showUploadButtonsWhenFileSelected ? (a(), u(C, { key: 0 }, [
                n("div", null, [
                  p(x(m, {
                    ref_key: "buttonRef",
                    ref: N,
                    icon: "pi pi-upload",
                    severity: "info",
                    size: "small",
                    onClick: j
                  }, null, 512), [
                    [f, s.value?.length ? o(r)("Choose another image") : o(r)("Choose Image")]
                  ])
                ]),
                n("div", null, [
                  p(x(m, {
                    icon: "i-mdi-scanner",
                    severity: "warn",
                    size: "small",
                    onClick: j
                  }, null, 512), [
                    [f, o(r)("Use Scanner")]
                  ])
                ])
              ], 64)) : y("", !0)
            ]),
            b.value && b.value.length > 0 ? (a(), u("div", ve, [
              n("div", {
                class: te(["font-bold", { "mt-2": s.value?.length }])
              }, $(o(r)("Current Files")) + ": ", 3),
              n("div", me, [
                (a(!0), u(C, null, D(b.value, (l, c) => (a(), u("div", {
                  key: c,
                  class: "flex items-start gap-1"
                }, [
                  n("div", ye, [
                    o(I)[l.id] ? (a(), u("div", ge, [...i[0] || (i[0] = [
                      n("div", { class: "size-40px flex items-center justify-center rounded-lg bg-white/50 p-2" }, [
                        n("i", { class: "i-pepicons-print-times-off light:text-red-800/75 text-4xl font-bold dark:text-red-400/75" })
                      ], -1)
                    ])])) : y("", !0),
                    p((a(), F(g, {
                      ref_for: !0,
                      ref_key: "oldFilesImageRefs",
                      ref: _,
                      src: l.original_url,
                      alt: l.name,
                      preview: "",
                      "preview-button-props": { onClick: () => P(l, c) },
                      pt: {
                        rotateLeftButton: {
                          onClick: () => S(l, "left")
                        },
                        rotateRightButton: {
                          onClick: () => S(l, "right")
                        }
                      }
                    }, {
                      image: h(() => [
                        n("img", {
                          src: l.thumb_url,
                          alt: l.name,
                          class: "max-h-60px max-w-60px",
                          style: le(
                            t.value?.[l.id]?.rotate ? { transform: `rotate(${t.value[l.id].rotate}deg)` } : void 0
                          )
                        }, null, 12, he)
                      ]),
                      _: 2
                    }, 1032, ["src", "alt", "preview-button-props", "pt"])), [
                      [
                        f,
                        o(I)[l.id] ? o(r)("Will be deleted") : void 0
                      ]
                    ])
                  ]),
                  n("div", be, [
                    d.clearable ? (a(), u(C, { key: 0 }, [
                      o(I)[l.id] ? p((a(), F(m, {
                        key: 0,
                        text: "",
                        icon: "pi pi-history",
                        severity: "danger",
                        class: "p-button-xs",
                        onClick: (k) => T(l.id, !1)
                      }, null, 8, ["onClick"])), [
                        [f, o(r)("Restore File")]
                      ]) : p((a(), F(m, {
                        key: 1,
                        text: "",
                        icon: "pi pi-times",
                        severity: "danger",
                        class: "p-button-xs",
                        onClick: (k) => T(l.id)
                      }, null, 8, ["onClick"])), [
                        [f, o(r)("Remove File")]
                      ])
                    ], 64)) : y("", !0),
                    p(x(m, {
                      text: "",
                      icon: "pi pi-refresh",
                      severity: "info",
                      class: "p-button-xs",
                      onClick: (k) => S(l, "right")
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
          fn: h(() => [
            M(e.$slots, "addon")
          ]),
          key: "0"
        } : void 0,
        e.$slots.helper ? {
          name: "helper",
          fn: h(() => [
            M(e.$slots, "helper")
          ]),
          key: "1"
        } : void 0
      ]), 1040);
    };
  }
});
export {
  we as default
};
