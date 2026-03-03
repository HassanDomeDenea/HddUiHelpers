import { defineComponent as t, openBlock as l, createElementBlock as n, normalizeClass as a } from "vue";
const d = /* @__PURE__ */ t({
  __name: "RefreshIconButton",
  props: {
    loading: { type: Boolean },
    disabled: { type: Boolean }
  },
  setup(e) {
    return (i, o) => (l(), n("i", {
      tabindex: "0",
      class: a([{
        "dark:(text-blue-300) light:(text-blue-500) i-svg-spinners-180-ring cursor-wait": e.loading,
        "i-mdi-refresh": !e.loading,
        "dark:(text-blue-300 hover:text-blue-200) light:(text-blue-500 hover:text-blue-700) cursor-pointer": !e.loading && !e.disabled,
        "dark:(text-gray-500) light:(text-gray-400 )": !e.loading && e.disabled
      }, "inline-block"])
    }, null, 2));
  }
});
export {
  d as default
};
