import { defineComponent as f, openBlock as s, createElementBlock as l, renderSlot as a, createElementVNode as t, unref as c, createBlock as m, createCommentVNode as u } from "vue";
import { _ as p } from "../../ChatWidget.vue_vue_type_script_setup_true_lang-BQvkWdlB.js";
import { useBasicAuthStore as g } from "../../stores/basicAuth.js";
import { useDimensionsStore as _ } from "../../stores/dimensions.js";
const b = { class: "grid w-full grid-cols-3" }, k = { class: "flex justify-end pe-2" }, B = /* @__PURE__ */ f({
  __name: "MainFootbar",
  setup(x) {
    const n = g(), r = ref(), i = _(), { height: d } = useElementSize(r, void 0, {
      box: "border-box"
    });
    return watch(
      d,
      (o) => {
        i.botFooterHeight = o;
      },
      {
        immediate: !0
      }
    ), (o, e) => (s(), l("nav", {
      ref_key: "footerRef",
      ref: r,
      class: "light:bg-sky-200 rounded-t-2 border-t-1 flex justify-center gap-4 border-t-sky-300 py-2 text-xl dark:border-t-zinc-800 dark:bg-zinc-900"
    }, [
      a(o.$slots, "default", {}, () => [
        t("div", b, [
          e[0] || (e[0] = t("div", null, " ", -1)),
          e[1] || (e[1] = t("div", { class: "flex justify-center" }, "HDD 2025", -1)),
          t("div", k, [
            c(n).isLoggedIn ? (s(), m(p, { key: 0 })) : u("", !0)
          ])
        ])
      ])
    ], 512));
  }
});
export {
  B as default
};
