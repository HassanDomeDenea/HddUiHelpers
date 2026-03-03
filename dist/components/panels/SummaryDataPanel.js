import { defineComponent as _, useTemplateRef as k, ref as x, resolveComponent as f, resolveDirective as M, openBlock as t, createElementBlock as n, renderSlot as D, toDisplayString as v, createCommentVNode as i, Fragment as b, renderList as L, normalizeClass as d, createBlock as p, createElementVNode as m, normalizeStyle as w, withDirectives as g, withModifiers as R, unref as S } from "vue";
import z from "primevue/contextmenu";
const N = { class: "summeryDataPanel mx-4 space-y-1" }, P = {
  key: 0,
  class: "underline-offset-6 !mb-4 mt-2 text-center text-xl font-bold underline"
}, T = ["innerHTML"], V = /* @__PURE__ */ _({
  __name: "SummaryDataPanel",
  props: {
    title: {},
    labelWidth: { type: [Number, Boolean], default: 150 },
    severity: { default: "contrast" },
    items: {},
    minimumAfterLabelSpace: {}
  },
  setup(o) {
    const y = k("itemLabelRefs"), u = x({});
    function B(l, c, a) {
      c.appendContextMenu && (u[a].show(l), l.preventDefault());
    }
    return (l, c) => {
      const a = f("Divider"), h = f("Button"), C = M("tooltip");
      return t(), n("div", N, [
        D(l.$slots, "title", {}, () => [
          o.title ? (t(), n("div", P, v(o.title), 1)) : i("", !0)
        ]),
        (t(!0), n(b, null, L(o.items, (e, r) => (t(), n("div", {
          key: r,
          class: d([e.hidden ? "hidden" : "", e.noPrint ? "print:hidden" : "", e.wrapperClass])
        }, [
          e.type === "divider" ? (t(), p(a, { key: 0 })) : (t(), n(b, { key: 1 }, [
            m("span", {
              ref_for: !0,
              ref_key: "itemLabelRefs",
              ref: y,
              class: d(e.labelClass),
              style: w({ width: o.labelWidth + "px" })
            }, v(e.label) + ": ", 7),
            m("span", {
              class: d(["font-bold", e.valueClass]),
              innerHTML: e.value
            }, null, 10, T),
            e.appendButton && e.appendButton.visible !== !1 ? g((t(), p(h, {
              key: 0,
              icon: e.appendButton.icon ? `${e.appendButton.icon} !min-w-0.5rem` : null,
              size: "small",
              text: "",
              class: "ms-4 size-6 print:!hidden",
              severity: e.appendButton.severity,
              loading: e.appendButton.loading,
              disabled: e.appendButton.disabled,
              label: e.appendButton.label,
              href: e.appendButton.href,
              as: e.appendButton.href ? "a" : void 0,
              title: e.appendButton.title,
              onClick: R(e.appendButton.onClick, ["prevent"]),
              onContextmenu: (s) => B(s, e, r)
            }, null, 8, ["icon", "severity", "loading", "disabled", "label", "href", "as", "title", "onClick", "onContextmenu"])), [
              [
                C,
                e.appendButton.tooltip,
                void 0,
                { top: !0 }
              ]
            ]) : i("", !0),
            e.appendContextMenu ? (t(), p(S(z), {
              key: 1,
              ref_for: !0,
              ref: (s) => u.value[r] = s,
              model: e.appendContextMenu
            }, null, 8, ["model"])) : i("", !0)
          ], 64))
        ], 2))), 128))
      ]);
    };
  }
});
export {
  V as default
};
