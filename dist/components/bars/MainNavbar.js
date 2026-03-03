import { _ as $ } from "../../UserAvatar.vue_vue_type_script_setup_true_lang-CjLdVMbP.js";
import N from "primevue/badge";
import { defineComponent as R, useTemplateRef as z, computed as c, watch as q, openBlock as s, createBlock as n, unref as d, normalizeClass as h, withCtx as f, createElementVNode as b, createCommentVNode as o, renderSlot as _, resolveDynamicComponent as H, mergeProps as V, toDisplayString as B, createElementBlock as k } from "vue";
import O from "HddUiHelpers/components/misc/DarkModeButton.vue";
import { useBasicAuthStore as P } from "HddUiHelpers/stores/basicAuth";
import { useDimensionsStore as T } from "HddUiHelpers/stores/dimensions.ts";
import { Menubar as U } from "primevue";
import { useI18n as j } from "vue-i18n";
import { useElementSize as g } from "@vueuse/core";
const F = {
  key: 1,
  class: "surface-border border-round surface-100 border-1 me-auto p-1 text-xs"
}, G = { class: "flex items-center" }, re = /* @__PURE__ */ R({
  __name: "MainNavbar",
  props: {
    withDarkModeButton: { type: Boolean, default: !0 },
    items: {},
    navbarClass: { default: "light:!bg-sky-200 light:!border-b-sky-300 " },
    activeItemClass: { default: "light:bg-sky-100 dark:bg-gray-800 rounded-lg font-bold" }
  },
  setup(l) {
    const a = P(), { t: y } = j(), u = z("menuBarRef"), w = c(() => {
      const r = [], i = [], p = l.items.filter((e) => !(e.auth === !0 && !a.user || e.auth === !1 && a.user || e.permission && !a.can(e.permission))).map((e) => ({
        ...e,
        estimated_width: e.label.length * 13
      }));
      let t = 169;
      return p.forEach((e) => {
        t + e.estimated_width > D.value ? i.push(e) : r.push(e), t += e.estimated_width;
      }), i.length > 0 && r.push({
        label: y("Others"),
        items: i
      }), r;
    }), E = T(), S = c(
      () => u.value?.$el?.querySelector(".p-menubar-start")
    ), C = c(
      () => u.value?.$el?.querySelector(".p-menubar-end")
    ), { width: I, height: A } = g(
      u,
      {},
      {
        box: "border-box"
      }
    ), { width: W } = g(S), { width: x } = g(C), D = c(() => I.value - W.value - x.value - 12);
    return q(
      A,
      (r) => {
        E.topNavbarHeight = r;
      },
      {
        immediate: !0
      }
    ), (r, i) => {
      const p = N, v = $;
      return s(), n(d(U), {
        ref_key: "menuBarRef",
        ref: u,
        model: d(w),
        class: h([l.navbarClass, "z-2"])
      }, {
        start: f(() => [
          _(r.$slots, "start")
        ]),
        item: f(({ item: t, props: e, hasSubmenu: M, root: m }) => [
          (s(), n(H(t.to ? "router-link" : "a"), V({
            to: t.to
          }, e.action, {
            class: t.class,
            "active-class": l.activeItemClass
          }), {
            default: f(() => [
              b("i", {
                class: h(t.icon)
              }, null, 2),
              b("span", null, B(t.label), 1),
              t.badge ? (s(), n(p, {
                key: 0,
                class: h({ "ms-auto": !m, "ms-2": m }),
                value: t.badge
              }, null, 8, ["class", "value"])) : o("", !0),
              t.shortcut ? (s(), k("span", F, B(t.shortcut), 1)) : o("", !0),
              M ? (s(), k("i", {
                key: 2,
                class: h(["pi pi-angle-down", [
                  {
                    "i-uil:angle-down ms-auto": m,
                    "ltr:i-uil-angle-right-b rtl:i-uil-angle-left-b i-mdi-angle-left ms-auto": !m
                  }
                ]])
              }, null, 2)) : o("", !0)
            ]),
            _: 2
          }, 1040, ["to", "class", "active-class"]))
        ]),
        end: f(() => [
          b("div", G, [
            l.withDarkModeButton ? (s(), n(O, { key: 0 })) : o("", !0),
            d(a).user ? (s(), n(v, {
              key: 1,
              class: "ms-1",
              user: d(a).user
            }, null, 8, ["user"])) : o("", !0),
            _(r.$slots, "end")
          ])
        ]),
        _: 3
      }, 8, ["model", "class"]);
    };
  }
});
export {
  re as default
};
