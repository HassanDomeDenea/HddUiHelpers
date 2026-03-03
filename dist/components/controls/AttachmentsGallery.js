import Pe from "primevue/tooltip";
import ze from "primevue/galleria";
import { _ as Se } from "../../DatePickerInput.vue_vue_type_script_setup_true_lang-D6B1ypZM.js";
import { _ as Me } from "../../TextAreaInput.vue_vue_type_script_setup_true_lang-BzkVktnw.js";
import De from "primevue/skeleton";
import Be from "primevue/button";
import { defineComponent as Ie, useTemplateRef as Ee, useModel as Te, ref as f, computed as x, watch as j, openBlock as l, createElementBlock as s, createElementVNode as d, Fragment as Ve, renderList as $e, normalizeStyle as S, withDirectives as Ye, createVNode as p, unref as n, createCommentVNode as u, isRef as N, createSlots as Ae, withCtx as I, renderSlot as We, createTextVNode as Re, createBlock as E, toDisplayString as A, mergeModels as F } from "vue";
import qe from "downloadjs";
import { useApiClient as Ue } from "HddUiHelpers/stores/apiClient.ts";
import { useStackableDialog as Le } from "HddUiHelpers/stores/stackableDialogs.ts";
import { debounce as Ze, get as G } from "lodash-es";
import O from "moment";
import { useConfirm as Xe } from "primevue/useconfirm";
import { useI18n as je } from "vue-i18n";
import { useWindowSize as Ne } from "@vueuse/core";
const Fe = {
  ref: "sortableWrapper",
  class: "flex flex-wrap items-stretch gap-4 p-4"
}, Ge = {
  key: 0,
  class: "z-2 absolute top-0 ltr:right-0 rtl:left-0"
}, Oe = ["onClick"], He = {
  key: 1,
  class: "z-100 absolute bottom-0 left-0 right-0 top-0"
}, _e = ["src", "alt"], Je = { key: 0 }, Ke = { key: 1 }, Qe = { class: "h-full w-full space-y-1" }, et = {
  key: 0,
  class: "rounded-4xl z-1 border-1 absolute right-1 top-1 inline-block space-y-1 border-gray-700 bg-gray-100/50 px-3 py-1 backdrop-blur-sm dark:border-gray-300 dark:bg-gray-900/50"
}, tt = { class: "flex items-center gap-2" }, at = {
  key: 0,
  class: "flex justify-center"
}, it = ["src", "height", "width"], ot = {
  key: 1,
  width: "100%",
  height: "100%",
  controls: ""
}, nt = ["src", "type"], lt = ["src", "alt"], rt = { class: "relative" }, st = ["src", "alt"], dt = { class: "cols-2 grid gap-4" }, ut = ["title"], ct = { class: "text-end" }, mt = ["title"], ht = ["onClick"], vt = ["title"], It = /* @__PURE__ */ Ie({
  __name: "AttachmentsGallery",
  props: /* @__PURE__ */ F({
    attachments: {},
    nameProperty: { default: "file_name" },
    sizeProperty: { default: "size" },
    srcProperty: { default: "original_url" },
    idProperty: { default: "id" },
    descriptionInputPlaceholder: {},
    withDescription: { type: Boolean },
    withDateInput: { type: Boolean },
    canEditDate: { type: Boolean, default: !0 },
    canEditDescription: { type: Boolean, default: !0 },
    thumbnailSize: { default: 60 },
    includeTimeWithDate: { type: Boolean },
    thumbProperty: { default: "thumb_url" },
    hasThumbnails: { type: Boolean, default: !0 },
    mimeTypeProperty: { default: "mime_type" },
    originalOrderProperty: { default: "order_original" },
    orderProperty: { default: "order" },
    autoSubmitChanges: { type: Boolean },
    orderChangedProperty: { default: "order_changed" },
    downloadProperty: { default: "download_url" },
    dateProperty: { default: "date" },
    descriptionProperty: { default: "description" },
    captionProperty: { default: "caption" },
    sortable: { type: Boolean, default: !1 },
    rotateDisabled: { type: Boolean },
    zoomable: { type: Boolean, default: !0 },
    scalable: { type: Boolean, default: !0 },
    deletable: { type: Boolean, default: !1 },
    toolbarButtons: { type: Boolean, default: !0 },
    savableTransformation: { type: Boolean },
    zoomStep: { default: 0.1 },
    minZoom: { default: 0.5 },
    maxZoom: { default: 5 }
  }, {
    loading: { type: Boolean, default: !1 },
    loadingModifiers: {}
  }),
  emits: /* @__PURE__ */ F(["sorted", "toggled", "dateChanged", "descriptionChanged", "transformationApplied", "deleted", "delete", "shown", "hidden", "confirming", "confirmed", "changed"], ["update:loading"]),
  setup(t, { expose: H, emit: _ }) {
    const i = t, r = _, { t: P } = je(), W = Ee("mainWrapper"), m = Te(t, "loading"), y = f(!1), c = f(0), T = f(!1), R = Ne(), J = f([
      {
        breakpoint: "1500px",
        numVisible: 20
      },
      {
        breakpoint: "1024px",
        numVisible: 10
      },
      {
        breakpoint: "768px",
        numVisible: 7
      },
      {
        breakpoint: "560px",
        numVisible: 5
      }
    ]), K = x(() => i.attachments[c.value]);
    j(
      () => y.value,
      (e) => {
        e ? (window.addEventListener("click", q), window.addEventListener("keydown", U), r("shown"), k(!0)) : (window.removeEventListener("click", q), window.removeEventListener("keydown", U), r("hidden"), k(!1)), r("toggled", e);
      }
    );
    const { updateDialogVisibility: k } = Le();
    j(c, () => {
      $(), g.value = 1;
    });
    function q(e) {
      e.target?.classList.contains("galleriaMaskDismissClass") && (y.value = !1);
    }
    function U(e) {
      if (e.code === "Escape") {
        y.value = !1;
        return;
      }
      const v = getComputedStyle(W.value).direction === "rtl";
      e.code === "ArrowRight" ? v ? Z() : L() : e.code === "ArrowLeft" && (v ? L() : Z());
    }
    function L() {
      V(Math.min(c.value + 1, i.attachments.length - 1));
    }
    function Z() {
      V(Math.max(c.value - 1, 0));
    }
    function Q(e) {
      qe(e[i.downloadProperty] ?? e[i.srcProperty]);
    }
    function V(e) {
      c.value = e, y.value = !0;
    }
    const ee = x(() => R.height.value), te = x(() => R.width.value), w = f(0), M = f(0), D = f(0), g = f(1), h = f({
      isPanning: !1,
      startX: 0,
      startY: 0
    });
    function $() {
      C.value = !1, w.value = 0, M.value = 0, D.value = 0, h.value = {
        isPanning: !1,
        startX: 0,
        startY: 0
      };
    }
    const ae = x(() => ({
      transition: h.value.isPanning ? "none" : "transform 0.15s",
      transform: "rotate(" + w.value + "deg) scale(" + g.value + ") translate(" + M.value + "px, " + D.value + "px)"
    })), ie = x(() => w.value % 360 !== 0), oe = x(() => g.value <= i.minZoom), ne = x(() => g.value >= i.maxZoom), C = f(!1);
    function le() {
      w.value += 90, C.value = !0;
    }
    function re() {
      w.value -= 90, C.value = !0;
    }
    function se() {
      g.value -= i.zoomStep, C.value = !0;
    }
    function de() {
      g.value += i.zoomStep, C.value = !0;
    }
    function ue() {
      y.value = !1;
    }
    const b = Ue();
    function ce(e, o) {
      i.canEditDate && (i.autoSubmitChanges && e[i.idProperty] ? (m.value = !0, b.request({
        method: "patch",
        url: `/api/medias/${e[i.idProperty]}/update-date`,
        data: {
          date: o
        }
      }).then(() => {
        r("dateChanged", e, o), r("changed");
      }).catch(b.toastRequestError).finally(() => {
        m.value = !1;
      })) : r("dateChanged", e, o));
    }
    const me = Ze(function(e, o) {
      i.canEditDescription && (i.autoSubmitChanges && e[i.idProperty] ? (m.value = !0, b.request({
        method: "patch",
        url: `/api/medias/${e[i.idProperty]}/update-description`,
        data: {
          description: o
        }
      }).then(() => {
        r("descriptionChanged", e, o), r("changed");
      }).catch(b.toastRequestError).finally(() => {
        m.value = !1;
      })) : r("descriptionChanged", e, o));
    }, 500);
    function he(e) {
      if (i.savableTransformation) {
        const o = {
          rotation: w.value % 360
        };
        i.autoSubmitChanges && e[i.idProperty] ? (m.value = !0, b.request({
          method: "patch",
          url: `/api/medias/${e[i.idProperty]}/manipulate`,
          data: o
        }).then(() => {
          $(), r("transformationApplied", e, o), r("changed");
        }).catch(b.toastRequestError).finally(() => {
          m.value = !1;
        })) : r("transformationApplied", e, o);
      }
    }
    const ve = Xe();
    function fe(e) {
      r("confirming"), k(!0), ve.require({
        group: "dismissable",
        header: P("Delete Confirmation"),
        message: P("Are you sure you want to delete this file?"),
        icon: "i-material-symbols:warning-outline-rounded",
        acceptProps: {
          severity: "danger",
          icon: "i-line-md:confirm"
        },
        acceptClass: "font-bold",
        rejectProps: {
          severity: "secondary"
          // icon: 'i-line-md:cancel',
        },
        accept() {
          i.autoSubmitChanges && e[i.idProperty] ? (m.value = !0, b.request({
            method: "delete",
            url: `/api/medias/${e[i.idProperty]}`
          }).then(() => {
            r("changed"), r("deleted", e);
          }).catch(b.toastRequestError).finally(() => {
            m.value = !1;
          })) : r("delete", e), r("confirmed"), k(!1);
        },
        reject() {
          k(!1), r("confirmed");
        },
        onHide() {
          k(!1);
        }
      });
    }
    const pe = (e) => {
      e.preventDefault();
      const o = e.deltaY > 0 ? -i.zoomStep : i.zoomStep;
      g.value = Math.min(i.maxZoom, Math.max(i.minZoom, g.value + o));
    }, ye = (e) => {
      e.preventDefault(), h.value.isPanning = !0, h.value.startX = e.clientX - M.value, h.value.startY = e.clientY - D.value;
    }, ge = (e) => {
      h.value.isPanning && (M.value = e.clientX - h.value.startX, D.value = e.clientY - h.value.startY);
    }, X = () => h.value.isPanning = !1, be = () => {
      h.value.isPanning || (T.value = !T.value);
    };
    return H({ resetTransformation: $ }), (e, o) => {
      const v = Be, B = De, xe = Me, ke = Se, we = ze, Ce = Pe;
      return l(), s("div", {
        ref_key: "mainWrapper",
        ref: W
      }, [
        d("div", Fe, [
          (l(!0), s(Ve, null, $e(t.attachments, (a, Y) => (l(), s("div", {
            key: Y,
            style: S({ width: (t.thumbnailSize || 60) + "px" }),
            class: "space-y-2"
          }, [
            d("div", {
              class: "border-inset light:border-teal-800 group relative flex items-center justify-center rounded-lg border-2 border-solid p-1 dark:border-teal-200",
              style: S({ width: (t.thumbnailSize || 60) + "px", height: (t.thumbnailSize || 60) + "px" })
            }, [
              t.deletable ? (l(), s("div", Ge, [
                Ye(p(v, {
                  icon: "i-mdi-trash",
                  severity: "danger",
                  text: "",
                  size: "small",
                  raised: "",
                  onClick: (z) => fe(a)
                }, null, 8, ["onClick"]), [
                  [Ce, n(P)("Delete")]
                ])
              ])) : u("", !0),
              d("div", {
                class: "light:bg-gray-100/45 z-1 absolute inset-0 hidden cursor-pointer items-center justify-center hover:visible group-hover:flex dark:bg-gray-900/45",
                onClick: (z) => V(Y)
              }, [
                d("i", {
                  class: "i-mdi:eye light:text-teal-700 dark:text-teal-200",
                  style: S({ fontSize: Math.max((t.thumbnailSize || 60) / 5, 12) + "px" })
                }, null, 4)
              ], 8, Oe),
              m.value ? (l(), s("div", He, [
                p(B, { class: "!h-full !w-full" })
              ])) : u("", !0),
              d("img", {
                src: a[t.hasThumbnails ? t.thumbProperty : t.srcProperty],
                alt: a.alt,
                style: { cursor: "pointer" },
                class: "max-w-100% max-h-100% mx-auto my-auto"
              }, null, 8, _e)
            ], 4),
            t.withDescription ? (l(), s("div", Je, [
              p(xe, {
                "model-value": n(G)(a, t.descriptionProperty),
                placeholder: t.descriptionInputPlaceholder ?? n(P)("Description"),
                "initial-rows": 1,
                "onUpdate:modelValue": (z) => n(me)(a, z)
              }, null, 8, ["model-value", "placeholder", "onUpdate:modelValue"])
            ])) : u("", !0),
            t.withDateInput ? (l(), s("div", Ke, [
              p(ke, {
                size: "small",
                clearable: !1,
                "model-value": n(G)(a, t.dateProperty),
                disabled: !t.canEditDate,
                "onUpdate:modelValue": (z) => ce(a, z)
              }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"])
            ])) : u("", !0)
          ], 4))), 128)),
          m.value ? (l(), s("div", {
            key: 0,
            class: "border-inset light:border-teal-800/50 group relative flex items-center justify-center rounded-lg border-2 border-dashed p-1 dark:border-teal-200/50",
            style: S({ width: (t.thumbnailSize || 60) + "px", height: (t.thumbnailSize || 60) + "px" })
          }, [
            d("div", Qe, [
              p(B, { style: { height: "65%" } }),
              p(B, { style: { height: "15%" } }),
              p(B, { style: { height: "15%" } })
            ])
          ], 4)) : u("", !0)
        ], 512),
        p(we, {
          visible: n(y),
          "onUpdate:visible": o[1] || (o[1] = (a) => N(y) ? y.value = a : null),
          "active-index": n(c),
          "onUpdate:activeIndex": o[2] || (o[2] = (a) => N(c) ? c.value = a : null),
          value: t.attachments,
          "responsive-options": n(J),
          "num-visible": Math.min(t.attachments.length, 9),
          "container-style": "width: 90%",
          circular: !0,
          "full-screen": !0,
          "show-item-navigators": !0,
          "mask-class": "galleriaMaskDismissClass",
          pt: {
            // itemsContainer: 'min-h-[calc(100vh_-_120px)]',
            items: "min-h-[calc(100vh_-_120px)]",
            item: "my-auto",
            closeButton: t.toolbarButtons ? "!hidden" : "!absolute z-10"
            // previousItemButton: '!fixed rtl:(right-0 left-unset)',
            // prevButton: '!fixed rtl:(right-0 left-unset)',
            // nextItemButton: '!fixed rtl:(left-0 right-unset)',
            // nextButton: '!fixed rtl:(left-0 right-unset)',
          }
        }, Ae({
          header: I(() => [
            t.toolbarButtons ? (l(), s("div", et, [
              d("div", tt, [
                p(v, {
                  rounded: "",
                  severity: "contrast",
                  variant: "text",
                  icon: "i-fa7-solid:times  ",
                  onClick: ue
                }),
                t.scalable ? (l(), E(v, {
                  key: 0,
                  rounded: "",
                  severity: "contrast",
                  variant: "text",
                  icon: "i-fa7-solid:rotate-right",
                  onClick: le
                })) : u("", !0),
                t.scalable ? (l(), E(v, {
                  key: 1,
                  rounded: "",
                  severity: "contrast",
                  variant: "text",
                  icon: "i-fa7-solid:rotate-left",
                  onClick: re
                })) : u("", !0),
                t.zoomable ? (l(), E(v, {
                  key: 2,
                  rounded: "",
                  severity: "contrast",
                  variant: "text",
                  disabled: n(oe),
                  icon: "i-fa:search-minus",
                  onClick: se
                }, null, 8, ["disabled"])) : u("", !0),
                t.zoomable ? (l(), E(v, {
                  key: 3,
                  rounded: "",
                  severity: "contrast",
                  variant: "text",
                  disabled: n(ne),
                  icon: "i-fa:search-plus",
                  onClick: de
                }, null, 8, ["disabled"])) : u("", !0)
              ]),
              t.savableTransformation && n(C) && n(ie) ? (l(), s("div", at, [
                p(v, {
                  icon: "i-material-symbols:save-rounded",
                  variant: "outlined",
                  rounded: "",
                  label: n(P)("Save Changes"),
                  size: "small",
                  onClick: o[0] || (o[0] = (a) => he(n(K)))
                }, null, 8, ["label"])
              ])) : u("", !0)
            ])) : u("", !0)
          ]),
          item: I((a) => [
            d("div", {
              class: "light:bg-gray-50/95 relative touch-none dark:bg-slate-900/95",
              style: S(n(ae))
            }, [
              We(e.$slots, "viewerImageIcons", {
                item: a.item,
                activeIndex: n(c)
              }),
              a.item.mime_type === "application/pdf" ? (l(), s("embed", {
                key: 0,
                src: `${a.item[t.srcProperty]}#toolbar=1&navpanes=0&scrollbar=1`,
                type: "application/pdf",
                frameBorder: "0",
                scrolling: "auto",
                height: `${n(ee) - 300}px`,
                width: `${n(te) - 150}px`
              }, null, 8, it)) : a.item.mime_type.startsWith("video/") ? (l(), s("video", ot, [
                d("source", {
                  src: a.item[t.srcProperty],
                  type: a.item.mime_type
                }, null, 8, nt),
                o[3] || (o[3] = Re(" Your browser does not support the video tag. ", -1))
              ])) : (l(), s("img", {
                key: 2,
                class: "select-none",
                src: a.item[t.srcProperty],
                alt: a.item.name,
                style: { "max-width": "100%", "max-height": "calc(100vh - 130px)", display: "block" },
                onWheel: pe,
                onMousedown: ye,
                onMousemove: ge,
                onMouseup: X,
                onMouseleave: X,
                onClick: be
              }, null, 40, lt))
            ], 4)
          ]),
          thumbnail: I((a) => [
            d("div", rt, [
              d("img", {
                src: a.item[t.hasThumbnails ? t.thumbProperty : t.srcProperty],
                alt: a.item.name,
                class: "max-w-50px max-h-50px border-1 border-inset light:border-gray-700 cursor-pointer rounded-md p-1 text-xs dark:border-gray-200",
                style: { display: "block" }
              }, null, 8, st)
            ])
          ]),
          _: 2
        }, [
          t.attachments[n(c)] && !t.attachments[n(c)].mime_type.startsWith("video/") && n(T) ? {
            name: "caption",
            fn: I((a) => [
              d("div", dt, [
                a.item[t.captionProperty] ? u("", !0) : (l(), s("div", {
                  key: 0,
                  class: "ms-2 overflow-x-clip text-ellipsis text-xs",
                  title: a.item[t.nameProperty]
                }, A(a.item[t.nameProperty]), 9, ut)),
                d("div", ct, [
                  d("span", {
                    class: "text-xs",
                    title: n(O)(a.item[t.dateProperty]).fromNow()
                  }, A(n(O)(a.item[t.dateProperty]).format("YYYY-MM-DD hh:mm A")), 9, mt),
                  d("i", {
                    class: "i-mdi-download hover:light:text-blue-400 ms-2 cursor-pointer hover:dark:text-blue-300",
                    onClick: (Y) => Q(a.item)
                  }, null, 8, ht)
                ])
              ]),
              a.item[t.captionProperty] ? (l(), s("div", {
                key: 0,
                class: "mb-2 font-bold",
                title: a.item[t.nameProperty]
              }, A(a.item[t.captionProperty]), 9, vt)) : u("", !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["visible", "active-index", "value", "responsive-options", "num-visible", "pt"])
      ], 512);
    };
  }
});
export {
  It as default
};
