import { defineComponent as a, resolveComponent as s, openBlock as i, createElementBlock as f, createElementVNode as p, createVNode as u, withCtx as d, renderSlot as _ } from "vue";
const m = { class: "inline-flex items-center" }, g = /* @__PURE__ */ a({
  __name: "CogIconButton",
  setup(v) {
    const t = ref(), o = ref(!1);
    function n(e) {
      t.value.toggle(e);
    }
    function r() {
      o.value = !0;
    }
    function l() {
      o.value = !1;
    }
    return (e, h) => {
      const c = s("Popover");
      return i(), f("div", m, [
        p("i", {
          tabindex: "0",
          class: "i-mdi-cog dark:(text-teal-300 hover:text-teal-200) light:(text-teal-500 hover:text-teal-700) cursor-pointer",
          onClick: n
        }),
        u(c, {
          ref_key: "popoverRef",
          ref: t,
          onShow: r,
          onHide: l
        }, {
          default: d(() => [
            _(e.$slots, "default")
          ]),
          _: 3
        }, 512)
      ]);
    };
  }
});
export {
  g as default
};
