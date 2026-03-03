import { defineComponent as we, useModel as Ce, resolveComponent as P, resolveDirective as Pe, openBlock as l, createElementBlock as s, createElementVNode as d, Fragment as ze, renderList as Se, normalizeStyle as z, withDirectives as De, createVNode as f, unref as n, createCommentVNode as u, isRef as X, createSlots as Me, withCtx as B, renderSlot as Be, createTextVNode as Ie, createBlock as I, toDisplayString as A, mergeModels as j } from "vue";
import Te from "downloadjs";
import { useApiClient as Ee } from "HddUiHelpers/stores/apiClient.ts";
import { useStackableDialog as Ve } from "HddUiHelpers/stores/stackableDialogs.ts";
import { debounce as Ye, get as N } from "lodash-es";
import G from "moment";
import { useConfirm as Ae } from "primevue/useconfirm";
const $e = {
  ref: "sortableWrapper",
  class: "flex flex-wrap items-stretch gap-4 p-4"
}, We = {
  key: 0,
  class: "z-2 absolute top-0 ltr:right-0 rtl:left-0"
}, Re = ["onClick"], qe = {
  key: 1,
  class: "z-100 absolute bottom-0 left-0 right-0 top-0"
}, Ue = ["src", "alt"], Le = { key: 0 }, Ze = { key: 1 }, Xe = { class: "h-full w-full space-y-1" }, je = {
  key: 0,
  class: "rounded-4xl z-1 border-1 absolute right-1 top-1 inline-block space-y-1 border-gray-700 bg-gray-100/50 px-3 py-1 backdrop-blur-sm dark:border-gray-300 dark:bg-gray-900/50"
}, Ne = { class: "flex items-center gap-2" }, Ge = {
  key: 0,
  class: "flex justify-center"
}, Fe = ["src", "height", "width"], Oe = {
  key: 1,
  width: "100%",
  height: "100%",
  controls: ""
}, He = ["src", "type"], Je = ["src", "alt"], Ke = { class: "relative" }, Qe = ["src", "alt"], _e = { class: "cols-2 grid gap-4" }, et = ["title"], tt = { class: "text-end" }, at = ["title"], ot = ["onClick"], it = ["title"], mt = /* @__PURE__ */ we({
  __name: "AttachmentsGallery",
  props: /* @__PURE__ */ j({
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
  emits: /* @__PURE__ */ j(["sorted", "toggled", "dateChanged", "descriptionChanged", "transformationApplied", "deleted", "delete", "shown", "hidden", "confirming", "confirmed", "changed"], ["update:loading"]),
  setup(t, { expose: F, emit: O }) {
    const o = t, r = O, { t: w } = useI18n(), $ = useTemplateRef("mainWrapper"), m = Ce(t, "loading"), p = ref(!1), c = ref(0), T = ref(!1), W = useWindowSize(), H = ref([
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
    ]), J = computed(() => o.attachments[c.value]);
    watch(
      () => p.value,
      (e) => {
        e ? (window.addEventListener("click", R), window.addEventListener("keydown", q), r("shown"), b(!0)) : (window.removeEventListener("click", R), window.removeEventListener("keydown", q), r("hidden"), b(!1)), r("toggled", e);
      }
    );
    const { updateDialogVisibility: b } = Ve();
    watch(c, () => {
      V(), y.value = 1;
    });
    function R(e) {
      e.target?.classList.contains("galleriaMaskDismissClass") && (p.value = !1);
    }
    function q(e) {
      if (e.code === "Escape") {
        p.value = !1;
        return;
      }
      const v = getComputedStyle($.value).direction === "rtl";
      e.code === "ArrowRight" ? v ? L() : U() : e.code === "ArrowLeft" && (v ? U() : L());
    }
    function U() {
      E(Math.min(c.value + 1, o.attachments.length - 1));
    }
    function L() {
      E(Math.max(c.value - 1, 0));
    }
    function K(e) {
      Te(e[o.downloadProperty] ?? e[o.srcProperty]);
    }
    function E(e) {
      c.value = e, p.value = !0;
    }
    const Q = computed(() => W.height.value), _ = computed(() => W.width.value), x = ref(0), S = ref(0), D = ref(0), y = ref(1), h = ref({
      isPanning: !1,
      startX: 0,
      startY: 0
    });
    function V() {
      k.value = !1, x.value = 0, S.value = 0, D.value = 0, h.value = {
        isPanning: !1,
        startX: 0,
        startY: 0
      };
    }
    const ee = computed(() => ({
      transition: h.value.isPanning ? "none" : "transform 0.15s",
      transform: "rotate(" + x.value + "deg) scale(" + y.value + ") translate(" + S.value + "px, " + D.value + "px)"
    })), te = computed(() => x.value % 360 !== 0), ae = computed(() => y.value <= o.minZoom), oe = computed(() => y.value >= o.maxZoom), k = ref(!1);
    function ie() {
      x.value += 90, k.value = !0;
    }
    function ne() {
      x.value -= 90, k.value = !0;
    }
    function le() {
      y.value -= o.zoomStep, k.value = !0;
    }
    function re() {
      y.value += o.zoomStep, k.value = !0;
    }
    function se() {
      p.value = !1;
    }
    const g = Ee();
    function de(e, i) {
      o.canEditDate && (o.autoSubmitChanges && e[o.idProperty] ? (m.value = !0, g.request({
        method: "patch",
        url: `/api/medias/${e[o.idProperty]}/update-date`,
        data: {
          date: i
        }
      }).then(() => {
        r("dateChanged", e, i), r("changed");
      }).catch(g.toastRequestError).finally(() => {
        m.value = !1;
      })) : r("dateChanged", e, i));
    }
    const ue = Ye(function(e, i) {
      o.canEditDescription && (o.autoSubmitChanges && e[o.idProperty] ? (m.value = !0, g.request({
        method: "patch",
        url: `/api/medias/${e[o.idProperty]}/update-description`,
        data: {
          description: i
        }
      }).then(() => {
        r("descriptionChanged", e, i), r("changed");
      }).catch(g.toastRequestError).finally(() => {
        m.value = !1;
      })) : r("descriptionChanged", e, i));
    }, 500);
    function ce(e) {
      if (o.savableTransformation) {
        const i = {
          rotation: x.value % 360
        };
        o.autoSubmitChanges && e[o.idProperty] ? (m.value = !0, g.request({
          method: "patch",
          url: `/api/medias/${e[o.idProperty]}/manipulate`,
          data: i
        }).then(() => {
          V(), r("transformationApplied", e, i), r("changed");
        }).catch(g.toastRequestError).finally(() => {
          m.value = !1;
        })) : r("transformationApplied", e, i);
      }
    }
    const me = Ae();
    function he(e) {
      r("confirming"), b(!0), me.require({
        group: "dismissable",
        header: w("Delete Confirmation"),
        message: w("Are you sure you want to delete this file?"),
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
          o.autoSubmitChanges && e[o.idProperty] ? (m.value = !0, g.request({
            method: "delete",
            url: `/api/medias/${e[o.idProperty]}`
          }).then(() => {
            r("changed"), r("deleted", e);
          }).catch(g.toastRequestError).finally(() => {
            m.value = !1;
          })) : r("delete", e), r("confirmed"), b(!1);
        },
        reject() {
          b(!1), r("confirmed");
        },
        onHide() {
          b(!1);
        }
      });
    }
    const ve = (e) => {
      e.preventDefault();
      const i = e.deltaY > 0 ? -o.zoomStep : o.zoomStep;
      y.value = Math.min(o.maxZoom, Math.max(o.minZoom, y.value + i));
    }, fe = (e) => {
      e.preventDefault(), h.value.isPanning = !0, h.value.startX = e.clientX - S.value, h.value.startY = e.clientY - D.value;
    }, pe = (e) => {
      h.value.isPanning && (S.value = e.clientX - h.value.startX, D.value = e.clientY - h.value.startY);
    }, Z = () => h.value.isPanning = !1, ye = () => {
      h.value.isPanning || (T.value = !T.value);
    };
    return F({ resetTransformation: V }), (e, i) => {
      const v = P("Button"), M = P("Skeleton"), ge = P("TextAreaInput"), be = P("DatePickerInput"), xe = P("Galleria"), ke = Pe("tooltip");
      return l(), s("div", {
        ref_key: "mainWrapper",
        ref: $
      }, [
        d("div", $e, [
          (l(!0), s(ze, null, Se(t.attachments, (a, Y) => (l(), s("div", {
            key: Y,
            style: z({ width: (t.thumbnailSize || 60) + "px" }),
            class: "space-y-2"
          }, [
            d("div", {
              class: "border-inset light:border-teal-800 group relative flex items-center justify-center rounded-lg border-2 border-solid p-1 dark:border-teal-200",
              style: z({ width: (t.thumbnailSize || 60) + "px", height: (t.thumbnailSize || 60) + "px" })
            }, [
              t.deletable ? (l(), s("div", We, [
                De(f(v, {
                  icon: "i-mdi-trash",
                  severity: "danger",
                  text: "",
                  size: "small",
                  raised: "",
                  onClick: (C) => he(a)
                }, null, 8, ["onClick"]), [
                  [ke, n(w)("Delete")]
                ])
              ])) : u("", !0),
              d("div", {
                class: "light:bg-gray-100/45 z-1 absolute inset-0 hidden cursor-pointer items-center justify-center hover:visible group-hover:flex dark:bg-gray-900/45",
                onClick: (C) => E(Y)
              }, [
                d("i", {
                  class: "i-mdi:eye light:text-teal-700 dark:text-teal-200",
                  style: z({ fontSize: Math.max((t.thumbnailSize || 60) / 5, 12) + "px" })
                }, null, 4)
              ], 8, Re),
              m.value ? (l(), s("div", qe, [
                f(M, { class: "!h-full !w-full" })
              ])) : u("", !0),
              d("img", {
                src: a[t.hasThumbnails ? t.thumbProperty : t.srcProperty],
                alt: a.alt,
                style: { cursor: "pointer" },
                class: "max-w-100% max-h-100% mx-auto my-auto"
              }, null, 8, Ue)
            ], 4),
            t.withDescription ? (l(), s("div", Le, [
              f(ge, {
                "model-value": n(N)(a, t.descriptionProperty),
                placeholder: t.descriptionInputPlaceholder ?? n(w)("Description"),
                "initial-rows": 1,
                "onUpdate:modelValue": (C) => n(ue)(a, C)
              }, null, 8, ["model-value", "placeholder", "onUpdate:modelValue"])
            ])) : u("", !0),
            t.withDateInput ? (l(), s("div", Ze, [
              f(be, {
                size: "small",
                clearable: !1,
                "model-value": n(N)(a, t.dateProperty),
                disabled: !t.canEditDate,
                "onUpdate:modelValue": (C) => de(a, C)
              }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"])
            ])) : u("", !0)
          ], 4))), 128)),
          m.value ? (l(), s("div", {
            key: 0,
            class: "border-inset light:border-teal-800/50 group relative flex items-center justify-center rounded-lg border-2 border-dashed p-1 dark:border-teal-200/50",
            style: z({ width: (t.thumbnailSize || 60) + "px", height: (t.thumbnailSize || 60) + "px" })
          }, [
            d("div", Xe, [
              f(M, { style: { height: "65%" } }),
              f(M, { style: { height: "15%" } }),
              f(M, { style: { height: "15%" } })
            ])
          ], 4)) : u("", !0)
        ], 512),
        f(xe, {
          visible: n(p),
          "onUpdate:visible": i[1] || (i[1] = (a) => X(p) ? p.value = a : null),
          "active-index": n(c),
          "onUpdate:activeIndex": i[2] || (i[2] = (a) => X(c) ? c.value = a : null),
          value: t.attachments,
          "responsive-options": n(H),
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
        }, Me({
          header: B(() => [
            t.toolbarButtons ? (l(), s("div", je, [
              d("div", Ne, [
                f(v, {
                  rounded: "",
                  severity: "contrast",
                  variant: "text",
                  icon: "i-fa7-solid:times  ",
                  onClick: se
                }),
                t.scalable ? (l(), I(v, {
                  key: 0,
                  rounded: "",
                  severity: "contrast",
                  variant: "text",
                  icon: "i-fa7-solid:rotate-right",
                  onClick: ie
                })) : u("", !0),
                t.scalable ? (l(), I(v, {
                  key: 1,
                  rounded: "",
                  severity: "contrast",
                  variant: "text",
                  icon: "i-fa7-solid:rotate-left",
                  onClick: ne
                })) : u("", !0),
                t.zoomable ? (l(), I(v, {
                  key: 2,
                  rounded: "",
                  severity: "contrast",
                  variant: "text",
                  disabled: n(ae),
                  icon: "i-fa:search-minus",
                  onClick: le
                }, null, 8, ["disabled"])) : u("", !0),
                t.zoomable ? (l(), I(v, {
                  key: 3,
                  rounded: "",
                  severity: "contrast",
                  variant: "text",
                  disabled: n(oe),
                  icon: "i-fa:search-plus",
                  onClick: re
                }, null, 8, ["disabled"])) : u("", !0)
              ]),
              t.savableTransformation && n(k) && n(te) ? (l(), s("div", Ge, [
                f(v, {
                  icon: "i-material-symbols:save-rounded",
                  variant: "outlined",
                  rounded: "",
                  label: n(w)("Save Changes"),
                  size: "small",
                  onClick: i[0] || (i[0] = (a) => ce(n(J)))
                }, null, 8, ["label"])
              ])) : u("", !0)
            ])) : u("", !0)
          ]),
          item: B((a) => [
            d("div", {
              class: "light:bg-gray-50/95 relative touch-none dark:bg-slate-900/95",
              style: z(n(ee))
            }, [
              Be(e.$slots, "viewerImageIcons", {
                item: a.item,
                activeIndex: n(c)
              }),
              a.item.mime_type === "application/pdf" ? (l(), s("embed", {
                key: 0,
                src: `${a.item[t.srcProperty]}#toolbar=1&navpanes=0&scrollbar=1`,
                type: "application/pdf",
                frameBorder: "0",
                scrolling: "auto",
                height: `${n(Q) - 300}px`,
                width: `${n(_) - 150}px`
              }, null, 8, Fe)) : a.item.mime_type.startsWith("video/") ? (l(), s("video", Oe, [
                d("source", {
                  src: a.item[t.srcProperty],
                  type: a.item.mime_type
                }, null, 8, He),
                i[3] || (i[3] = Ie(" Your browser does not support the video tag. ", -1))
              ])) : (l(), s("img", {
                key: 2,
                class: "select-none",
                src: a.item[t.srcProperty],
                alt: a.item.name,
                style: { "max-width": "100%", "max-height": "calc(100vh - 130px)", display: "block" },
                onWheel: ve,
                onMousedown: fe,
                onMousemove: pe,
                onMouseup: Z,
                onMouseleave: Z,
                onClick: ye
              }, null, 40, Je))
            ], 4)
          ]),
          thumbnail: B((a) => [
            d("div", Ke, [
              d("img", {
                src: a.item[t.hasThumbnails ? t.thumbProperty : t.srcProperty],
                alt: a.item.name,
                class: "max-w-50px max-h-50px border-1 border-inset light:border-gray-700 cursor-pointer rounded-md p-1 text-xs dark:border-gray-200",
                style: { display: "block" }
              }, null, 8, Qe)
            ])
          ]),
          _: 2
        }, [
          t.attachments[n(c)] && !t.attachments[n(c)].mime_type.startsWith("video/") && n(T) ? {
            name: "caption",
            fn: B((a) => [
              d("div", _e, [
                a.item[t.captionProperty] ? u("", !0) : (l(), s("div", {
                  key: 0,
                  class: "ms-2 overflow-x-clip text-ellipsis text-xs",
                  title: a.item[t.nameProperty]
                }, A(a.item[t.nameProperty]), 9, et)),
                d("div", tt, [
                  d("span", {
                    class: "text-xs",
                    title: n(G)(a.item[t.dateProperty]).fromNow()
                  }, A(n(G)(a.item[t.dateProperty]).format("YYYY-MM-DD hh:mm A")), 9, at),
                  d("i", {
                    class: "i-mdi-download hover:light:text-blue-400 ms-2 cursor-pointer hover:dark:text-blue-300",
                    onClick: (Y) => K(a.item)
                  }, null, 8, ot)
                ])
              ]),
              a.item[t.captionProperty] ? (l(), s("div", {
                key: 0,
                class: "mb-2 font-bold",
                title: a.item[t.nameProperty]
              }, A(a.item[t.captionProperty]), 9, it)) : u("", !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["visible", "active-index", "value", "responsive-options", "num-visible", "pt"])
      ], 512);
    };
  }
});
export {
  mt as default
};
