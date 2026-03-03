import { defineComponent as t } from "vue";
const e = {
  render() {
    return [this.$slots.default()];
  }
}, r = /* @__PURE__ */ t({
  ...e,
  __name: "RawHtml",
  props: {
    content: {}
  },
  setup(n) {
    return {};
  }
});
export {
  r as default
};
