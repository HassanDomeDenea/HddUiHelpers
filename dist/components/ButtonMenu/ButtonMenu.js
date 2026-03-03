import { defineComponent as a, resolveComponent as l, resolveDirective as p, openBlock as d, createElementBlock as f, createVNode as r, unref as t, withDirectives as v } from "vue";
import { uniqueId as y } from "lodash-es";
const b = { class: "inline-block" }, z = /* @__PURE__ */ a({
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
    const o = computed(() => y("button-menu-overlay-")), n = useTemplateRef("menuRef");
    return (k, i) => {
      const s = l("Menu"), u = l("Button"), c = p("tooltip");
      return d(), f("div", b, [
        r(s, {
          id: t(o),
          ref_key: "menuRef",
          ref: n,
          model: e.items,
          popup: !0,
          pt: {
            root: {
              class: "max-h-[90vh] overflow-y-auto"
            }
          }
        }, null, 8, ["id", "model"]),
        v(r(u, {
          size: e.size,
          icon: e.icon,
          label: e.label,
          "aria-haspopup": "true",
          severity: e.severity,
          "aria-controls": t(o),
          onClick: i[0] || (i[0] = (m) => t(n).toggle(m))
        }, null, 8, ["size", "icon", "label", "severity", "aria-controls"]), [
          [c, e.tooltip]
        ])
      ]);
    };
  }
});
export {
  z as default
};
