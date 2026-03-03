import { defineComponent as f, ref as l, watch as m, openBlock as s, createElementBlock as a, renderSlot as c, createElementVNode as t, unref as u, createBlock as p, createCommentVNode as g } from "vue";
import { _ } from "../../ChatWidget.vue_vue_type_script_setup_true_lang-BChQ6lOc.js";
import { useBasicAuthStore as b } from "../../stores/basicAuth.js";
import { useDimensionsStore as k } from "../../stores/dimensions.js";
import { useElementSize as x } from "@vueuse/core";
const y = { class: "grid w-full grid-cols-3" }, h = { class: "flex justify-end pe-2" }, E = /* @__PURE__ */ f({
  __name: "MainFootbar",
  setup(v) {
    const i = b(), r = l(), n = k(), { height: d } = x(r, void 0, {
      box: "border-box"
    });
    return m(
      d,
      (o) => {
        n.botFooterHeight = o;
      },
      {
        immediate: !0
      }
    ), (o, e) => (s(), a("nav", {
      ref_key: "footerRef",
      ref: r,
      class: "light:bg-sky-200 rounded-t-2 border-t-1 flex justify-center gap-4 border-t-sky-300 py-2 text-xl dark:border-t-zinc-800 dark:bg-zinc-900"
    }, [
      c(o.$slots, "default", {}, () => [
        t("div", y, [
          e[0] || (e[0] = t("div", null, " ", -1)),
          e[1] || (e[1] = t("div", { class: "flex justify-center" }, "HDD 2025", -1)),
          t("div", h, [
            u(i).isLoggedIn ? (s(), p(_, { key: 0 })) : g("", !0)
          ])
        ])
      ])
    ], 512));
  }
});
export {
  E as default
};
