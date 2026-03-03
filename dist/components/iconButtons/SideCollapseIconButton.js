import { defineComponent as c, useModel as s, ref as i, resolveDirective as d, openBlock as n, createElementBlock as u, withDirectives as m, createElementVNode as x, normalizeClass as v, unref as a, mergeModels as p } from "vue";
import { useI18n as f } from "vue-i18n";
const C = { class: "inline-flex items-center" }, k = /* @__PURE__ */ c({
  __name: "SideCollapseIconButton",
  props: /* @__PURE__ */ p({
    collapseDirection: { default: "start" },
    disabled: { type: Boolean },
    expandText: {},
    collapsedClass: {},
    expandedClass: {},
    collapseText: {}
  }, {
    isCollapsed: { type: Boolean, required: !0 },
    isCollapsedModifiers: {}
  }),
  emits: ["update:isCollapsed"],
  setup(e) {
    const l = s(e, "isCollapsed"), { t } = f();
    i(), i(!1);
    function r() {
      l.value = !l.value;
    }
    return (h, g) => {
      const o = d("tooltip");
      return n(), u("div", C, [
        m(x("i", {
          tabindex: "0",
          class: v({
            [e.collapsedClass ?? "dark:(text-teal-500 hover:text-teal-400) light:(text-teal-500 hover:text-teal-700)"]: l.value,
            [e.expandedClass ?? "dark:(text-teal-300 hover:text-teal-200) light:(text-teal-500 hover:text-teal-700)"]: !l.value,
            "rtl:i-mdi:arrow-left-circle ltr:i-mdi:arrow-right-circle": l.value && e.collapseDirection === "start",
            "rtl:i-mdi:arrow-right-circle ltr:i-mdi:arrow-left-circle": !l.value && e.collapseDirection === "start",
            "rtl:i-mdi:arrow-right-circle ltr:i-mdi:arrow-left-circle": l.value && e.collapseDirection === "end",
            "rtl:i-mdi:arrow-left-circle ltr:i-mdi:arrow-right-circle 12": !l.value && e.collapseDirection === "end",
            "cursor-pointer": !e.disabled
          }),
          onClick: r
        }, null, 2), [
          [o, l.value ? e.expandText ?? a(t)("Expand") : e.collapseText ?? a(t)("Collapse")]
        ])
      ]);
    };
  }
});
export {
  k as default
};
