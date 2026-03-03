import s from "primevue/tooltip";
import a from "primevue/button";
import p from "primevue/menu";
import { defineComponent as f, computed as d, useTemplateRef as v, openBlock as _, createElementBlock as y, createVNode as l, unref as t, withDirectives as b } from "vue";
import { uniqueId as k } from "lodash-es";
const B = { class: "inline-block" }, C = /* @__PURE__ */ f({
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
    const o = d(() => k("button-menu-overlay-")), n = v("menuRef");
    return (g, i) => {
      const r = p, u = a, m = s;
      return _(), y("div", B, [
        l(r, {
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
        b(l(u, {
          size: e.size,
          icon: e.icon,
          label: e.label,
          "aria-haspopup": "true",
          severity: e.severity,
          "aria-controls": t(o),
          onClick: i[0] || (i[0] = (c) => t(n).toggle(c))
        }, null, 8, ["size", "icon", "label", "severity", "aria-controls"]), [
          [m, e.tooltip]
        ])
      ]);
    };
  }
});
export {
  C as default
};
