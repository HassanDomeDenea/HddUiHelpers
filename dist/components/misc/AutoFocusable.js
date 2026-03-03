import { defineComponent as f, useSlots as c, onMounted as l, ref as r, renderSlot as a } from "vue";
const p = /* @__PURE__ */ f({
  __name: "AutoFocusable",
  props: {
    duration: { default: 0 }
  },
  setup(t) {
    const s = c();
    l(() => {
      s.default && setTimeout(() => {
        u();
      }, t.duration);
    });
    function u() {
      const e = o.value;
      e && (e.focus && e.focus() || e.$el.focus && e.$el.focus() || e.$el.querySelector("input")?.focus());
    }
    const o = r();
    function n(e) {
      o.value = e;
    }
    return (e, i) => a(e.$slots, "default", { setRef: n });
  }
});
export {
  p as default
};
