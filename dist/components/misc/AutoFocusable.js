import { defineComponent as n, renderSlot as l } from "vue";
const a = /* @__PURE__ */ n({
  __name: "AutoFocusable",
  props: {
    duration: { default: 0 }
  },
  setup(t) {
    useTemplateRef("slotRef");
    const s = useSlots();
    onMounted(() => {
      s.default && setTimeout(() => {
        u();
      }, t.duration);
    });
    function u() {
      const e = o.value;
      e && (e.focus && e.focus() || e.$el.focus && e.$el.focus() || e.$el.querySelector("input")?.focus());
    }
    const o = ref();
    function f(e) {
      o.value = e;
    }
    return (e, c) => l(e.$slots, "default", { setRef: f });
  }
});
export {
  a as default
};
