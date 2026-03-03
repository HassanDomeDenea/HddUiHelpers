import D from "primevue/image";
import h from "primevue/badge";
import x from "primevue/tag";
import v from "primevue/chip";
import { defineComponent as T, computed as w, toValue as z, openBlock as n, createBlock as l, normalizeClass as o, withCtx as c, createTextVNode as s, toDisplayString as y, createElementBlock as t, Fragment as C, renderList as B, mergeProps as N, unref as a, createElementVNode as b, createCommentVNode as d, normalizeStyle as P } from "vue";
import { get as I, isBoolean as V } from "lodash-es";
import { useI18n as F } from "vue-i18n";
const H = {
  key: 1,
  class: "flex flex-wrap items-center gap-1"
}, L = { key: 3 }, E = { key: 4 }, M = { key: 5 }, S = ["innerHTML"], J = /* @__PURE__ */ T({
  __name: "CellContent",
  props: {
    column: {},
    renderedData: {},
    row: {},
    size: {}
  },
  setup(e) {
    const { t: i } = F(), r = w(() => typeof e.column.renderTypeProps == "function" ? e.column.renderTypeProps : z(e.column.renderTypeProps));
    return (O, R) => {
      const m = v, f = x, g = h, k = D;
      return e.column.renderType === "chip" ? (n(), l(m, {
        key: 0,
        class: o({ "text-sm": e.size === "small" })
      }, {
        default: c(() => [
          s(y(e.renderedData), 1)
        ]),
        _: 1
      }, 8, ["class"])) : e.column.renderType === "chips" ? (n(), t("div", H, [
        (n(!0), t(C, null, B(e.renderedData, (u) => (n(), l(m, {
          key: u,
          class: o({ "text-sm": e.size === "small" })
        }, {
          default: c(() => [
            s(y(u), 1)
          ]),
          _: 2
        }, 1032, ["class"]))), 128))
      ])) : e.column.renderType === "tag" ? (n(), l(f, N(
        { key: 2 },
        typeof a(r) == "function" ? a(r)({
          value: a(I)(e.row, e.column.fullFieldName),
          text: e.renderedData,
          row: e.row,
          options: e.column.selectOptions
        }) : a(r),
        { value: e.renderedData }
      ), null, 16, ["value"])) : e.column.renderType === "yesNoIconBadge" ? (n(), t("div", L, [
        a(V)(e.renderedData) ? (n(), l(g, {
          key: 0,
          size: e.size,
          severity: e.renderedData ? "success" : "danger",
          title: a(i)(e.renderedData ? "Yes" : "No")
        }, {
          default: c(() => [
            b("i", {
              class: o(["scale-120", { "i-mdi-check": e.renderedData, "i-mdi-times": !e.renderedData }])
            }, null, 2)
          ]),
          _: 1
        }, 8, ["size", "severity", "title"])) : d("", !0)
      ])) : e.column.type === "color" ? (n(), t("div", E, [
        e.renderedData ? (n(), t("span", {
          key: 0,
          class: o(["hdd-color-box !cursor-initial inline-block", [{ "!size-6": e.size === "small" }]]),
          style: P({ backgroundColor: e.renderedData })
        }, null, 6)) : d("", !0)
      ])) : e.column.type === "image" ? (n(), t("div", M, [
        e.renderedData ? (n(), l(k, {
          key: 0,
          src: e.renderedData,
          alt: a(i)("Image not found"),
          "image-style": {
            maxWidth: "50px",
            maxHeight: "50px"
          },
          preview: ""
        }, null, 8, ["src", "alt"])) : d("", !0)
      ])) : (n(), t("div", {
        key: 6,
        class: o(["inline-block", [
          { "whitespace-pre-wrap": e.column.type === "textarea" },
          e.column.bodyClassFunction?.(e.renderedData, e.row, e.column)
        ]]),
        innerHTML: e.renderedData
      }, null, 10, S));
    };
  }
});
export {
  J as default
};
