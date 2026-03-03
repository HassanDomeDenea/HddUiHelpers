import n from "primevue/progressbar";
import { defineComponent as t, unref as r, openBlock as s, createBlock as a, normalizeClass as i, createCommentVNode as m } from "vue";
import { useApiClient as c } from "HddUiHelpers/stores/apiClient";
const f = /* @__PURE__ */ t({
  __name: "TopProgressBar",
  setup(p) {
    const e = c();
    return (l, _) => {
      const o = n;
      return r(e).isLoading || r(e).hasError ? (s(), a(o, {
        key: 0,
        class: i([{ "light:!bg-red-600 dark:!bg-red-500": r(e).hasError }, "loading-bar"]),
        mode: "indeterminate"
      }, null, 8, ["class"])) : m("", !0);
    };
  }
});
export {
  f as default
};
