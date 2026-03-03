import { defineComponent as n, resolveComponent as s, unref as r, openBlock as t, createBlock as a, normalizeClass as i, createCommentVNode as c } from "vue";
import { useApiClient as l } from "HddUiHelpers/stores/apiClient";
const u = /* @__PURE__ */ n({
  __name: "TopProgressBar",
  setup(m) {
    const e = l();
    return (p, d) => {
      const o = s("ProgressBar");
      return r(e).isLoading || r(e).hasError ? (t(), a(o, {
        key: 0,
        class: i([{ "light:!bg-red-600 dark:!bg-red-500": r(e).hasError }, "loading-bar"]),
        mode: "indeterminate"
      }, null, 8, ["class"])) : c("", !0);
    };
  }
});
export {
  u as default
};
