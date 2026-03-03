import C from "primevue/tooltip";
import k from "primevue/button";
import x from "primevue/divider";
import { defineComponent as M, useTemplateRef as g, ref as L, openBlock as t, createElementBlock as n, renderSlot as w, toDisplayString as f, createCommentVNode as i, Fragment as m, renderList as D, normalizeClass as d, createBlock as p, createElementVNode as _, normalizeStyle as R, withDirectives as S, withModifiers as z, unref as b } from "vue";
import N from "primevue/contextmenu";
const P = { class: "summeryDataPanel mx-4 space-y-1" }, T = {
  key: 0,
  class: "underline-offset-6 !mb-4 mt-2 text-center text-xl font-bold underline"
}, E = ["innerHTML"], F = /* @__PURE__ */ M({
  __name: "SummaryDataPanel",
  props: {
    title: {},
    labelWidth: { type: [Number, Boolean], default: 150 },
    severity: { default: "contrast" },
    items: {},
    minimumAfterLabelSpace: {}
  },
  setup(o) {
    const y = g("itemLabelRefs"), u = L({});
    function B(l, c, a) {
      c.appendContextMenu && (u[a].show(l), l.preventDefault());
    }
    return (l, c) => {
      const a = x, h = k, v = C;
      return t(), n("div", P, [
        w(l.$slots, "title", {}, () => [
          o.title ? (t(), n("div", T, f(o.title), 1)) : i("", !0)
        ]),
        (t(!0), n(m, null, D(o.items, (e, r) => (t(), n("div", {
          key: r,
          class: d([e.hidden ? "hidden" : "", e.noPrint ? "print:hidden" : "", e.wrapperClass])
        }, [
          e.type === "divider" ? (t(), p(a, { key: 0 })) : (t(), n(m, { key: 1 }, [
            _("span", {
              ref_for: !0,
              ref_key: "itemLabelRefs",
              ref: y,
              class: d(e.labelClass),
              style: R({ width: o.labelWidth + "px" })
            }, f(e.label) + ": ", 7),
            _("span", {
              class: d(["font-bold", e.valueClass]),
              innerHTML: e.value
            }, null, 10, E),
            e.appendButton && e.appendButton.visible !== !1 ? S((t(), p(h, {
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
              onClick: z(e.appendButton.onClick, ["prevent"]),
              onContextmenu: (s) => B(s, e, r)
            }, null, 8, ["icon", "severity", "loading", "disabled", "label", "href", "as", "title", "onClick", "onContextmenu"])), [
              [
                v,
                e.appendButton.tooltip,
                void 0,
                { top: !0 }
              ]
            ]) : i("", !0),
            e.appendContextMenu ? (t(), p(b(N), {
              key: 1,
              ref_for: !0,
              ref: (s) => b(u)[r] = s,
              model: e.appendContextMenu
            }, null, 8, ["model"])) : i("", !0)
          ], 64))
        ], 2))), 128))
      ]);
    };
  }
});
export {
  F as default
};
