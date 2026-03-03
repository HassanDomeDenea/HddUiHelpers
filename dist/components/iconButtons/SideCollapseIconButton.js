import { defineComponent as o, useModel as c, resolveDirective as s, openBlock as d, createElementBlock as n, withDirectives as u, createElementVNode as x, normalizeClass as m, unref as i, mergeModels as v } from "vue";
const f = { class: "inline-flex items-center" }, g = /* @__PURE__ */ o({
  __name: "SideCollapseIconButton",
  props: /* @__PURE__ */ v({
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
    const l = c(e, "isCollapsed"), { t } = useI18n();
    ref(), ref(!1);
    function a() {
      l.value = !l.value;
    }
    return (p, C) => {
      const r = s("tooltip");
      return d(), n("div", f, [
        u(x("i", {
          tabindex: "0",
          class: m({
            [e.collapsedClass ?? "dark:(text-teal-500 hover:text-teal-400) light:(text-teal-500 hover:text-teal-700)"]: l.value,
            [e.expandedClass ?? "dark:(text-teal-300 hover:text-teal-200) light:(text-teal-500 hover:text-teal-700)"]: !l.value,
            "rtl:i-mdi:arrow-left-circle ltr:i-mdi:arrow-right-circle": l.value && e.collapseDirection === "start",
            "rtl:i-mdi:arrow-right-circle ltr:i-mdi:arrow-left-circle": !l.value && e.collapseDirection === "start",
            "rtl:i-mdi:arrow-right-circle ltr:i-mdi:arrow-left-circle": l.value && e.collapseDirection === "end",
            "rtl:i-mdi:arrow-left-circle ltr:i-mdi:arrow-right-circle 12": !l.value && e.collapseDirection === "end",
            "cursor-pointer": !e.disabled
          }),
          onClick: a
        }, null, 2), [
          [r, l.value ? e.expandText ?? i(t)("Expand") : e.collapseText ?? i(t)("Collapse")]
        ])
      ]);
    };
  }
});
export {
  g as default
};
