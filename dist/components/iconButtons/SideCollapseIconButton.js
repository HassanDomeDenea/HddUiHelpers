import c from "primevue/tooltip";
import { defineComponent as s, useModel as d, ref as i, openBlock as n, createElementBlock as u, withDirectives as m, createElementVNode as x, normalizeClass as p, unref as a, mergeModels as f } from "vue";
import { useI18n as v } from "vue-i18n";
const C = { class: "inline-flex items-center" }, B = /* @__PURE__ */ s({
  __name: "SideCollapseIconButton",
  props: /* @__PURE__ */ f({
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
    const l = d(e, "isCollapsed"), { t } = v();
    i(), i(!1);
    function r() {
      l.value = !l.value;
    }
    return (h, g) => {
      const o = c;
      return n(), u("div", C, [
        m(x("i", {
          tabindex: "0",
          class: p({
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
  B as default
};
