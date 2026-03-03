import { defineComponent as a, computed as m, useTemplateRef as v, resolveComponent as i, resolveDirective as p, openBlock as d, createElementBlock as f, createVNode as l, withDirectives as y } from "vue";
import { uniqueId as b } from "lodash-es";
const k = { class: "inline-block" }, R = /* @__PURE__ */ a({
  __name: "ButtonMenu",
  props: {
    severity: {},
    label: {},
    size: {},
    icon: {},
    tooltip: {},
    items: {}
  },
  setup(e) {
    const t = m(() => b("button-menu-overlay-")), o = v("menuRef");
    return (B, n) => {
      const u = i("Menu"), r = i("Button"), s = p("tooltip");
      return d(), f("div", k, [
        l(u, {
          id: t.value,
          ref_key: "menuRef",
          ref: o,
          model: e.items,
          popup: !0,
          pt: {
            root: {
              class: "max-h-[90vh] overflow-y-auto"
            }
          }
        }, null, 8, ["id", "model"]),
        y(l(r, {
          size: e.size,
          icon: e.icon,
          label: e.label,
          "aria-haspopup": "true",
          severity: e.severity,
          "aria-controls": t.value,
          onClick: n[0] || (n[0] = (c) => o.value.toggle(c))
        }, null, 8, ["size", "icon", "label", "severity", "aria-controls"]), [
          [s, e.tooltip]
        ])
      ]);
    };
  }
});
export {
  R as default
};
