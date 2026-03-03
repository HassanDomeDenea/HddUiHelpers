import { defineComponent as n, useTemplateRef as l, useSlots as c, onMounted as r, ref as a, renderSlot as i } from "vue";
const m = /* @__PURE__ */ n({
  __name: "AutoFocusable",
  props: {
    duration: { default: 0 }
  },
  setup(t) {
    l("slotRef");
    const s = c();
    r(() => {
      s.default && setTimeout(() => {
        u();
      }, t.duration);
    });
    function u() {
      const e = o.value;
      e && (e.focus && e.focus() || e.$el.focus && e.$el.focus() || e.$el.querySelector("input")?.focus());
    }
    const o = a();
    function f(e) {
      o.value = e;
    }
    return (e, p) => i(e.$slots, "default", { setRef: f });
  }
});
export {
  m as default
};
