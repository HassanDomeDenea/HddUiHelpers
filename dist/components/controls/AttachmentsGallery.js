import { defineComponent as Pe, useTemplateRef as ze, useModel as Se, ref as h, computed as x, watch as N, resolveComponent as S, resolveDirective as De, openBlock as n, createElementBlock as r, createElementVNode as s, Fragment as Me, renderList as Be, normalizeStyle as D, withDirectives as Ie, createVNode as f, unref as g, createCommentVNode as d, createSlots as Te, withCtx as T, renderSlot as Ee, createTextVNode as Ve, createBlock as E, toDisplayString as W, mergeModels as G } from "vue";
import Ye from "downloadjs";
import { useApiClient as Ae } from "HddUiHelpers/stores/apiClient.ts";
import { useStackableDialog as $e } from "HddUiHelpers/stores/stackableDialogs.ts";
import { debounce as We, get as F } from "lodash-es";
import O from "moment";
import { useConfirm as qe } from "primevue/useconfirm";
import { useI18n as Re } from "vue-i18n";
import { useWindowSize as Ue } from "@vueuse/core";
const Le = {
  ref: "sortableWrapper",
  class: "flex flex-wrap items-stretch gap-4 p-4"
}, Ze = {
  key: 0,
  class: "z-2 absolute top-0 ltr:right-0 rtl:left-0"
}, Xe = ["onClick"], je = {
  key: 1,
  class: "z-100 absolute bottom-0 left-0 right-0 top-0"
}, Ne = ["src", "alt"], Ge = { key: 0 }, Fe = { key: 1 }, Oe = { class: "h-full w-full space-y-1" }, He = {
  key: 0,
  class: "rounded-4xl z-1 border-1 absolute right-1 top-1 inline-block space-y-1 border-gray-700 bg-gray-100/50 px-3 py-1 backdrop-blur-sm dark:border-gray-300 dark:bg-gray-900/50"
}, Je = { class: "flex items-center gap-2" }, Ke = {
  key: 0,
  class: "flex justify-center"
}, Qe = ["src", "height", "width"], _e = {
  key: 1,
  width: "100%",
  height: "100%",
  controls: ""
}, et = ["src", "type"], tt = ["src", "alt"], at = { class: "relative" }, it = ["src", "alt"], ot = { class: "cols-2 grid gap-4" }, nt = ["title"], lt = { class: "text-end" }, rt = ["title"], st = ["onClick"], dt = ["title"], bt = /* @__PURE__ */ Pe({
  __name: "AttachmentsGallery",
  props: /* @__PURE__ */ G({
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
  emits: /* @__PURE__ */ G(["sorted", "toggled", "dateChanged", "descriptionChanged", "transformationApplied", "deleted", "delete", "shown", "hidden", "confirming", "confirmed", "changed"], ["update:loading"]),
  setup(t, { expose: H, emit: J }) {
    const i = t, l = J, { t: P } = Re(), q = ze("mainWrapper"), u = Se(t, "loading"), b = h(!1), c = h(0), V = h(!1), R = Ue(), K = h([
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
    ]), Q = x(() => i.attachments[c.value]);
    N(
      () => b.value,
      (e) => {
        e ? (window.addEventListener("click", U), window.addEventListener("keydown", L), l("shown"), k(!0)) : (window.removeEventListener("click", U), window.removeEventListener("keydown", L), l("hidden"), k(!1)), l("toggled", e);
      }
    );
    const { updateDialogVisibility: k } = $e();
    N(c, () => {
      A(), p.value = 1;
    });
    function U(e) {
      e.target?.classList.contains("galleriaMaskDismissClass") && (b.value = !1);
    }
    function L(e) {
      if (e.code === "Escape") {
        b.value = !1;
        return;
      }
      const v = getComputedStyle(q.value).direction === "rtl";
      e.code === "ArrowRight" ? v ? X() : Z() : e.code === "ArrowLeft" && (v ? Z() : X());
    }
    function Z() {
      Y(Math.min(c.value + 1, i.attachments.length - 1));
    }
    function X() {
      Y(Math.max(c.value - 1, 0));
    }
    function _(e) {
      Ye(e[i.downloadProperty] ?? e[i.srcProperty]);
    }
    function Y(e) {
      c.value = e, b.value = !0;
    }
    const ee = x(() => R.height.value), te = x(() => R.width.value), w = h(0), M = h(0), B = h(0), p = h(1), m = h({
      isPanning: !1,
      startX: 0,
      startY: 0
    });
    function A() {
      C.value = !1, w.value = 0, M.value = 0, B.value = 0, m.value = {
        isPanning: !1,
        startX: 0,
        startY: 0
      };
    }
    const ae = x(() => ({
      transition: m.value.isPanning ? "none" : "transform 0.15s",
      transform: "rotate(" + w.value + "deg) scale(" + p.value + ") translate(" + M.value + "px, " + B.value + "px)"
    })), ie = x(() => w.value % 360 !== 0), oe = x(() => p.value <= i.minZoom), ne = x(() => p.value >= i.maxZoom), C = h(!1);
    function le() {
      w.value += 90, C.value = !0;
    }
    function re() {
      w.value -= 90, C.value = !0;
    }
    function se() {
      p.value -= i.zoomStep, C.value = !0;
    }
    function de() {
      p.value += i.zoomStep, C.value = !0;
    }
    function ue() {
      b.value = !1;
    }
    const y = Ae();
    function ce(e, o) {
      i.canEditDate && (i.autoSubmitChanges && e[i.idProperty] ? (u.value = !0, y.request({
        method: "patch",
        url: `/api/medias/${e[i.idProperty]}/update-date`,
        data: {
          date: o
        }
      }).then(() => {
        l("dateChanged", e, o), l("changed");
      }).catch(y.toastRequestError).finally(() => {
        u.value = !1;
      })) : l("dateChanged", e, o));
    }
    const me = We(function(e, o) {
      i.canEditDescription && (i.autoSubmitChanges && e[i.idProperty] ? (u.value = !0, y.request({
        method: "patch",
        url: `/api/medias/${e[i.idProperty]}/update-description`,
        data: {
          description: o
        }
      }).then(() => {
        l("descriptionChanged", e, o), l("changed");
      }).catch(y.toastRequestError).finally(() => {
        u.value = !1;
      })) : l("descriptionChanged", e, o));
    }, 500);
    function ve(e) {
      if (i.savableTransformation) {
        const o = {
          rotation: w.value % 360
        };
        i.autoSubmitChanges && e[i.idProperty] ? (u.value = !0, y.request({
          method: "patch",
          url: `/api/medias/${e[i.idProperty]}/manipulate`,
          data: o
        }).then(() => {
          A(), l("transformationApplied", e, o), l("changed");
        }).catch(y.toastRequestError).finally(() => {
          u.value = !1;
        })) : l("transformationApplied", e, o);
      }
    }
    const he = qe();
    function fe(e) {
      l("confirming"), k(!0), he.require({
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
          i.autoSubmitChanges && e[i.idProperty] ? (u.value = !0, y.request({
            method: "delete",
            url: `/api/medias/${e[i.idProperty]}`
          }).then(() => {
            l("changed"), l("deleted", e);
          }).catch(y.toastRequestError).finally(() => {
            u.value = !1;
          })) : l("delete", e), l("confirmed"), k(!1);
        },
        reject() {
          k(!1), l("confirmed");
        },
        onHide() {
          k(!1);
        }
      });
    }
    const pe = (e) => {
      e.preventDefault();
      const o = e.deltaY > 0 ? -i.zoomStep : i.zoomStep;
      p.value = Math.min(i.maxZoom, Math.max(i.minZoom, p.value + o));
    }, ye = (e) => {
      e.preventDefault(), m.value.isPanning = !0, m.value.startX = e.clientX - M.value, m.value.startY = e.clientY - B.value;
    }, ge = (e) => {
      m.value.isPanning && (M.value = e.clientX - m.value.startX, B.value = e.clientY - m.value.startY);
    }, j = () => m.value.isPanning = !1, be = () => {
      m.value.isPanning || (V.value = !V.value);
    };
    return H({ resetTransformation: A }), (e, o) => {
      const v = S("Button"), I = S("Skeleton"), xe = S("TextAreaInput"), ke = S("DatePickerInput"), we = S("Galleria"), Ce = De("tooltip");
      return n(), r("div", {
        ref_key: "mainWrapper",
        ref: q
      }, [
        s("div", Le, [
          (n(!0), r(Me, null, Be(t.attachments, (a, $) => (n(), r("div", {
            key: $,
            style: D({ width: (t.thumbnailSize || 60) + "px" }),
            class: "space-y-2"
          }, [
            s("div", {
              class: "border-inset light:border-teal-800 group relative flex items-center justify-center rounded-lg border-2 border-solid p-1 dark:border-teal-200",
              style: D({ width: (t.thumbnailSize || 60) + "px", height: (t.thumbnailSize || 60) + "px" })
            }, [
              t.deletable ? (n(), r("div", Ze, [
                Ie(f(v, {
                  icon: "i-mdi-trash",
                  severity: "danger",
                  text: "",
                  size: "small",
                  raised: "",
                  onClick: (z) => fe(a)
                }, null, 8, ["onClick"]), [
                  [Ce, g(P)("Delete")]
                ])
              ])) : d("", !0),
              s("div", {
                class: "light:bg-gray-100/45 z-1 absolute inset-0 hidden cursor-pointer items-center justify-center hover:visible group-hover:flex dark:bg-gray-900/45",
                onClick: (z) => Y($)
              }, [
                s("i", {
                  class: "i-mdi:eye light:text-teal-700 dark:text-teal-200",
                  style: D({ fontSize: Math.max((t.thumbnailSize || 60) / 5, 12) + "px" })
                }, null, 4)
              ], 8, Xe),
              u.value ? (n(), r("div", je, [
                f(I, { class: "!h-full !w-full" })
              ])) : d("", !0),
              s("img", {
                src: a[t.hasThumbnails ? t.thumbProperty : t.srcProperty],
                alt: a.alt,
                style: { cursor: "pointer" },
                class: "max-w-100% max-h-100% mx-auto my-auto"
              }, null, 8, Ne)
            ], 4),
            t.withDescription ? (n(), r("div", Ge, [
              f(xe, {
                "model-value": g(F)(a, t.descriptionProperty),
                placeholder: t.descriptionInputPlaceholder ?? g(P)("Description"),
                "initial-rows": 1,
                "onUpdate:modelValue": (z) => g(me)(a, z)
              }, null, 8, ["model-value", "placeholder", "onUpdate:modelValue"])
            ])) : d("", !0),
            t.withDateInput ? (n(), r("div", Fe, [
              f(ke, {
                size: "small",
                clearable: !1,
                "model-value": g(F)(a, t.dateProperty),
                disabled: !t.canEditDate,
                "onUpdate:modelValue": (z) => ce(a, z)
              }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"])
            ])) : d("", !0)
          ], 4))), 128)),
          u.value ? (n(), r("div", {
            key: 0,
            class: "border-inset light:border-teal-800/50 group relative flex items-center justify-center rounded-lg border-2 border-dashed p-1 dark:border-teal-200/50",
            style: D({ width: (t.thumbnailSize || 60) + "px", height: (t.thumbnailSize || 60) + "px" })
          }, [
            s("div", Oe, [
              f(I, { style: { height: "65%" } }),
              f(I, { style: { height: "15%" } }),
              f(I, { style: { height: "15%" } })
            ])
          ], 4)) : d("", !0)
        ], 512),
        f(we, {
          visible: b.value,
          "onUpdate:visible": o[1] || (o[1] = (a) => b.value = a),
          "active-index": c.value,
          "onUpdate:activeIndex": o[2] || (o[2] = (a) => c.value = a),
          value: t.attachments,
          "responsive-options": K.value,
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
        }, Te({
          header: T(() => [
            t.toolbarButtons ? (n(), r("div", He, [
              s("div", Je, [
                f(v, {
                  rounded: "",
                  severity: "contrast",
                  variant: "text",
                  icon: "i-fa7-solid:times  ",
                  onClick: ue
                }),
                t.scalable ? (n(), E(v, {
                  key: 0,
                  rounded: "",
                  severity: "contrast",
                  variant: "text",
                  icon: "i-fa7-solid:rotate-right",
                  onClick: le
                })) : d("", !0),
                t.scalable ? (n(), E(v, {
                  key: 1,
                  rounded: "",
                  severity: "contrast",
                  variant: "text",
                  icon: "i-fa7-solid:rotate-left",
                  onClick: re
                })) : d("", !0),
                t.zoomable ? (n(), E(v, {
                  key: 2,
                  rounded: "",
                  severity: "contrast",
                  variant: "text",
                  disabled: oe.value,
                  icon: "i-fa:search-minus",
                  onClick: se
                }, null, 8, ["disabled"])) : d("", !0),
                t.zoomable ? (n(), E(v, {
                  key: 3,
                  rounded: "",
                  severity: "contrast",
                  variant: "text",
                  disabled: ne.value,
                  icon: "i-fa:search-plus",
                  onClick: de
                }, null, 8, ["disabled"])) : d("", !0)
              ]),
              t.savableTransformation && C.value && ie.value ? (n(), r("div", Ke, [
                f(v, {
                  icon: "i-material-symbols:save-rounded",
                  variant: "outlined",
                  rounded: "",
                  label: g(P)("Save Changes"),
                  size: "small",
                  onClick: o[0] || (o[0] = (a) => ve(Q.value))
                }, null, 8, ["label"])
              ])) : d("", !0)
            ])) : d("", !0)
          ]),
          item: T((a) => [
            s("div", {
              class: "light:bg-gray-50/95 relative touch-none dark:bg-slate-900/95",
              style: D(ae.value)
            }, [
              Ee(e.$slots, "viewerImageIcons", {
                item: a.item,
                activeIndex: c.value
              }),
              a.item.mime_type === "application/pdf" ? (n(), r("embed", {
                key: 0,
                src: `${a.item[t.srcProperty]}#toolbar=1&navpanes=0&scrollbar=1`,
                type: "application/pdf",
                frameBorder: "0",
                scrolling: "auto",
                height: `${ee.value - 300}px`,
                width: `${te.value - 150}px`
              }, null, 8, Qe)) : a.item.mime_type.startsWith("video/") ? (n(), r("video", _e, [
                s("source", {
                  src: a.item[t.srcProperty],
                  type: a.item.mime_type
                }, null, 8, et),
                o[3] || (o[3] = Ve(" Your browser does not support the video tag. ", -1))
              ])) : (n(), r("img", {
                key: 2,
                class: "select-none",
                src: a.item[t.srcProperty],
                alt: a.item.name,
                style: { "max-width": "100%", "max-height": "calc(100vh - 130px)", display: "block" },
                onWheel: pe,
                onMousedown: ye,
                onMousemove: ge,
                onMouseup: j,
                onMouseleave: j,
                onClick: be
              }, null, 40, tt))
            ], 4)
          ]),
          thumbnail: T((a) => [
            s("div", at, [
              s("img", {
                src: a.item[t.hasThumbnails ? t.thumbProperty : t.srcProperty],
                alt: a.item.name,
                class: "max-w-50px max-h-50px border-1 border-inset light:border-gray-700 cursor-pointer rounded-md p-1 text-xs dark:border-gray-200",
                style: { display: "block" }
              }, null, 8, it)
            ])
          ]),
          _: 2
        }, [
          t.attachments[c.value] && !t.attachments[c.value].mime_type.startsWith("video/") && V.value ? {
            name: "caption",
            fn: T((a) => [
              s("div", ot, [
                a.item[t.captionProperty] ? d("", !0) : (n(), r("div", {
                  key: 0,
                  class: "ms-2 overflow-x-clip text-ellipsis text-xs",
                  title: a.item[t.nameProperty]
                }, W(a.item[t.nameProperty]), 9, nt)),
                s("div", lt, [
                  s("span", {
                    class: "text-xs",
                    title: g(O)(a.item[t.dateProperty]).fromNow()
                  }, W(g(O)(a.item[t.dateProperty]).format("YYYY-MM-DD hh:mm A")), 9, rt),
                  s("i", {
                    class: "i-mdi-download hover:light:text-blue-400 ms-2 cursor-pointer hover:dark:text-blue-300",
                    onClick: ($) => _(a.item)
                  }, null, 8, st)
                ])
              ]),
              a.item[t.captionProperty] ? (n(), r("div", {
                key: 0,
                class: "mb-2 font-bold",
                title: a.item[t.nameProperty]
              }, W(a.item[t.captionProperty]), 9, dt)) : d("", !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["visible", "active-index", "value", "responsive-options", "num-visible", "pt"])
      ], 512);
    };
  }
});
export {
  bt as default
};
