import i from "primevue/popover";
import { defineComponent as s, ref as n, openBlock as f, createElementBlock as p, createElementVNode as u, createVNode as d, withCtx as _, renderSlot as m } from "vue";
const v = { class: "inline-flex items-center" }, C = /* @__PURE__ */ s({
  __name: "CogIconButton",
  setup(h) {
    const t = n(), o = n(!1);
    function r(e) {
      t.value.toggle(e);
    }
    function l() {
      o.value = !0;
    }
    function c() {
      o.value = !1;
    }
    return (e, x) => {
      const a = i;
      return f(), p("div", v, [
        u("i", {
          tabindex: "0",
          class: "i-mdi-cog dark:(text-teal-300 hover:text-teal-200) light:(text-teal-500 hover:text-teal-700) cursor-pointer",
          onClick: r
        }),
        d(a, {
          ref_key: "popoverRef",
          ref: t,
          onShow: l,
          onHide: c
        }, {
          default: _(() => [
            m(e.$slots, "default")
          ]),
          _: 3
        }, 512)
      ]);
    };
  }
});
export {
  C as default
};
