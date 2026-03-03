import { defineComponent as h, computed as v, toValue as x, resolveComponent as r, openBlock as t, createBlock as a, normalizeClass as l, withCtx as o, createTextVNode as y, toDisplayString as g, createElementBlock as n, Fragment as T, renderList as C, mergeProps as w, unref as c, createElementVNode as z, createCommentVNode as i, normalizeStyle as B } from "vue";
import { get as N, isBoolean as b } from "lodash-es";
import { useI18n as I } from "vue-i18n";
const P = {
  key: 1,
  class: "flex flex-wrap items-center gap-1"
}, V = { key: 3 }, F = { key: 4 }, H = { key: 5 }, L = ["innerHTML"], W = /* @__PURE__ */ h({
  __name: "CellContent",
  props: {
    column: {},
    renderedData: {},
    row: {},
    size: {}
  },
  setup(e) {
    const { t: m } = I(), d = v(() => typeof e.column.renderTypeProps == "function" ? e.column.renderTypeProps : x(e.column.renderTypeProps));
    return (E, M) => {
      const u = r("Chip"), f = r("Tag"), k = r("Badge"), D = r("Image");
      return e.column.renderType === "chip" ? (t(), a(u, {
        key: 0,
        class: l({ "text-sm": e.size === "small" })
      }, {
        default: o(() => [
          y(g(e.renderedData), 1)
        ]),
        _: 1
      }, 8, ["class"])) : e.column.renderType === "chips" ? (t(), n("div", P, [
        (t(!0), n(T, null, C(e.renderedData, (s) => (t(), a(u, {
          key: s,
          class: l({ "text-sm": e.size === "small" })
        }, {
          default: o(() => [
            y(g(s), 1)
          ]),
          _: 2
        }, 1032, ["class"]))), 128))
      ])) : e.column.renderType === "tag" ? (t(), a(f, w(
        { key: 2 },
        typeof d.value == "function" ? d.value({
          value: c(N)(e.row, e.column.fullFieldName),
          text: e.renderedData,
          row: e.row,
          options: e.column.selectOptions
        }) : d.value,
        { value: e.renderedData }
      ), null, 16, ["value"])) : e.column.renderType === "yesNoIconBadge" ? (t(), n("div", V, [
        c(b)(e.renderedData) ? (t(), a(k, {
          key: 0,
          size: e.size,
          severity: e.renderedData ? "success" : "danger",
          title: c(m)(e.renderedData ? "Yes" : "No")
        }, {
          default: o(() => [
            z("i", {
              class: l(["scale-120", { "i-mdi-check": e.renderedData, "i-mdi-times": !e.renderedData }])
            }, null, 2)
          ]),
          _: 1
        }, 8, ["size", "severity", "title"])) : i("", !0)
      ])) : e.column.type === "color" ? (t(), n("div", F, [
        e.renderedData ? (t(), n("span", {
          key: 0,
          class: l(["hdd-color-box !cursor-initial inline-block", [{ "!size-6": e.size === "small" }]]),
          style: B({ backgroundColor: e.renderedData })
        }, null, 6)) : i("", !0)
      ])) : e.column.type === "image" ? (t(), n("div", H, [
        e.renderedData ? (t(), a(D, {
          key: 0,
          src: e.renderedData,
          alt: c(m)("Image not found"),
          "image-style": {
            maxWidth: "50px",
            maxHeight: "50px"
          },
          preview: ""
        }, null, 8, ["src", "alt"])) : i("", !0)
      ])) : (t(), n("div", {
        key: 6,
        class: l(["inline-block", [
          { "whitespace-pre-wrap": e.column.type === "textarea" },
          e.column.bodyClassFunction?.(e.renderedData, e.row, e.column)
        ]]),
        innerHTML: e.renderedData
      }, null, 10, L));
    };
  }
});
export {
  W as default
};
