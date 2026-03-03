import { defineComponent as h, resolveComponent as r, openBlock as t, createBlock as l, normalizeClass as c, withCtx as o, createTextVNode as y, toDisplayString as g, createElementBlock as n, Fragment as x, renderList as v, mergeProps as T, unref as a, createElementVNode as C, createCommentVNode as i, normalizeStyle as w } from "vue";
import { get as z, isBoolean as B } from "lodash-es";
const N = {
  key: 1,
  class: "flex flex-wrap items-center gap-1"
}, b = { key: 3 }, I = { key: 4 }, P = { key: 5 }, V = ["innerHTML"], M = /* @__PURE__ */ h({
  __name: "CellContent",
  props: {
    column: {},
    renderedData: {},
    row: {},
    size: {}
  },
  setup(e) {
    const { t: m } = useI18n(), d = computed(() => typeof e.column.renderTypeProps == "function" ? e.column.renderTypeProps : toValue(e.column.renderTypeProps));
    return (F, H) => {
      const s = r("Chip"), k = r("Tag"), f = r("Badge"), D = r("Image");
      return e.column.renderType === "chip" ? (t(), l(s, {
        key: 0,
        class: c({ "text-sm": e.size === "small" })
      }, {
        default: o(() => [
          y(g(e.renderedData), 1)
        ]),
        _: 1
      }, 8, ["class"])) : e.column.renderType === "chips" ? (t(), n("div", N, [
        (t(!0), n(x, null, v(e.renderedData, (u) => (t(), l(s, {
          key: u,
          class: c({ "text-sm": e.size === "small" })
        }, {
          default: o(() => [
            y(g(u), 1)
          ]),
          _: 2
        }, 1032, ["class"]))), 128))
      ])) : e.column.renderType === "tag" ? (t(), l(k, T(
        { key: 2 },
        typeof a(d) == "function" ? a(d)({
          value: a(z)(e.row, e.column.fullFieldName),
          text: e.renderedData,
          row: e.row,
          options: e.column.selectOptions
        }) : a(d),
        { value: e.renderedData }
      ), null, 16, ["value"])) : e.column.renderType === "yesNoIconBadge" ? (t(), n("div", b, [
        a(B)(e.renderedData) ? (t(), l(f, {
          key: 0,
          size: e.size,
          severity: e.renderedData ? "success" : "danger",
          title: a(m)(e.renderedData ? "Yes" : "No")
        }, {
          default: o(() => [
            C("i", {
              class: c(["scale-120", { "i-mdi-check": e.renderedData, "i-mdi-times": !e.renderedData }])
            }, null, 2)
          ]),
          _: 1
        }, 8, ["size", "severity", "title"])) : i("", !0)
      ])) : e.column.type === "color" ? (t(), n("div", I, [
        e.renderedData ? (t(), n("span", {
          key: 0,
          class: c(["hdd-color-box !cursor-initial inline-block", [{ "!size-6": e.size === "small" }]]),
          style: w({ backgroundColor: e.renderedData })
        }, null, 6)) : i("", !0)
      ])) : e.column.type === "image" ? (t(), n("div", P, [
        e.renderedData ? (t(), l(D, {
          key: 0,
          src: e.renderedData,
          alt: a(m)("Image not found"),
          "image-style": {
            maxWidth: "50px",
            maxHeight: "50px"
          },
          preview: ""
        }, null, 8, ["src", "alt"])) : i("", !0)
      ])) : (t(), n("div", {
        key: 6,
        class: c(["inline-block", [
          { "whitespace-pre-wrap": e.column.type === "textarea" },
          e.column.bodyClassFunction?.(e.renderedData, e.row, e.column)
        ]]),
        innerHTML: e.renderedData
      }, null, 10, V));
    };
  }
});
export {
  M as default
};
