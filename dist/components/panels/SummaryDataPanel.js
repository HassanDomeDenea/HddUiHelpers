import { defineComponent as k, resolveComponent as f, resolveDirective as x, openBlock as t, createElementBlock as n, renderSlot as M, toDisplayString as v, createCommentVNode as i, Fragment as b, renderList as D, normalizeClass as d, createBlock as p, createElementVNode as m, normalizeStyle as L, withDirectives as w, withModifiers as g, unref as y } from "vue";
import R from "primevue/contextmenu";
const S = { class: "summeryDataPanel mx-4 space-y-1" }, z = {
  key: 0,
  class: "underline-offset-6 !mb-4 mt-2 text-center text-xl font-bold underline"
}, N = ["innerHTML"], E = /* @__PURE__ */ k({
  __name: "SummaryDataPanel",
  props: {
    title: {},
    labelWidth: { type: [Number, Boolean], default: 150 },
    severity: { default: "contrast" },
    items: {},
    minimumAfterLabelSpace: {}
  },
  setup(o) {
    const B = useTemplateRef("itemLabelRefs"), u = ref({});
    function h(l, c, a) {
      c.appendContextMenu && (u[a].show(l), l.preventDefault());
    }
    return (l, c) => {
      const a = f("Divider"), C = f("Button"), _ = x("tooltip");
      return t(), n("div", S, [
        M(l.$slots, "title", {}, () => [
          o.title ? (t(), n("div", z, v(o.title), 1)) : i("", !0)
        ]),
        (t(!0), n(b, null, D(o.items, (e, r) => (t(), n("div", {
          key: r,
          class: d([e.hidden ? "hidden" : "", e.noPrint ? "print:hidden" : "", e.wrapperClass])
        }, [
          e.type === "divider" ? (t(), p(a, { key: 0 })) : (t(), n(b, { key: 1 }, [
            m("span", {
              ref_for: !0,
              ref_key: "itemLabelRefs",
              ref: B,
              class: d(e.labelClass),
              style: L({ width: o.labelWidth + "px" })
            }, v(e.label) + ": ", 7),
            m("span", {
              class: d(["font-bold", e.valueClass]),
              innerHTML: e.value
            }, null, 10, N),
            e.appendButton && e.appendButton.visible !== !1 ? w((t(), p(C, {
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
              onClick: g(e.appendButton.onClick, ["prevent"]),
              onContextmenu: (s) => h(s, e, r)
            }, null, 8, ["icon", "severity", "loading", "disabled", "label", "href", "as", "title", "onClick", "onContextmenu"])), [
              [
                _,
                e.appendButton.tooltip,
                void 0,
                { top: !0 }
              ]
            ]) : i("", !0),
            e.appendContextMenu ? (t(), p(y(R), {
              key: 1,
              ref_for: !0,
              ref: (s) => y(u)[r] = s,
              model: e.appendContextMenu
            }, null, 8, ["model"])) : i("", !0)
          ], 64))
        ], 2))), 128))
      ]);
    };
  }
});
export {
  E as default
};
