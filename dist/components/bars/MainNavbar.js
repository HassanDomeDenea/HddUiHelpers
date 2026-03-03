import { defineComponent as R, useTemplateRef as $, computed as m, watch as z, resolveComponent as B, openBlock as s, createBlock as n, unref as p, normalizeClass as d, withCtx as h, createElementVNode as b, createCommentVNode as o, renderSlot as k, resolveDynamicComponent as q, mergeProps as H, toDisplayString as y, createElementBlock as _ } from "vue";
import U from "HddUiHelpers/components/misc/DarkModeButton.vue";
import { useBasicAuthStore as V } from "HddUiHelpers/stores/basicAuth";
import { useDimensionsStore as O } from "HddUiHelpers/stores/dimensions.ts";
import { Menubar as P } from "primevue";
import { useI18n as T } from "vue-i18n";
import { useElementSize as g } from "@vueuse/core";
const j = {
  key: 1,
  class: "surface-border border-round surface-100 border-1 me-auto p-1 text-xs"
}, F = { class: "flex items-center" }, Z = /* @__PURE__ */ R({
  __name: "MainNavbar",
  props: {
    withDarkModeButton: { type: Boolean, default: !0 },
    items: {},
    navbarClass: { default: "light:!bg-sky-200 light:!border-b-sky-300 " },
    activeItemClass: { default: "light:bg-sky-100 dark:bg-gray-800 rounded-lg font-bold" }
  },
  setup(l) {
    const a = V(), { t: w } = T(), u = $("menuBarRef"), E = m(() => {
      const r = [], i = [], f = l.items.filter((e) => !(e.auth === !0 && !a.user || e.auth === !1 && a.user || e.permission && !a.can(e.permission))).map((e) => ({
        ...e,
        estimated_width: e.label.length * 13
      }));
      let t = 169;
      return f.forEach((e) => {
        t + e.estimated_width > M.value ? i.push(e) : r.push(e), t += e.estimated_width;
      }), i.length > 0 && r.push({
        label: w("Others"),
        items: i
      }), r;
    }), S = O(), C = m(
      () => u.value?.$el?.querySelector(".p-menubar-start")
    ), A = m(
      () => u.value?.$el?.querySelector(".p-menubar-end")
    ), { width: I, height: W } = g(
      u,
      {},
      {
        box: "border-box"
      }
    ), { width: x } = g(C), { width: D } = g(A), M = m(() => I.value - x.value - D.value - 12);
    return z(
      W,
      (r) => {
        S.topNavbarHeight = r;
      },
      {
        immediate: !0
      }
    ), (r, i) => {
      const f = B("Badge"), v = B("UserAvatar");
      return s(), n(p(P), {
        ref_key: "menuBarRef",
        ref: u,
        model: E.value,
        class: d([l.navbarClass, "z-2"])
      }, {
        start: h(() => [
          k(r.$slots, "start")
        ]),
        item: h(({ item: t, props: e, hasSubmenu: N, root: c }) => [
          (s(), n(q(t.to ? "router-link" : "a"), H({
            to: t.to
          }, e.action, {
            class: t.class,
            "active-class": l.activeItemClass
          }), {
            default: h(() => [
              b("i", {
                class: d(t.icon)
              }, null, 2),
              b("span", null, y(t.label), 1),
              t.badge ? (s(), n(f, {
                key: 0,
                class: d({ "ms-auto": !c, "ms-2": c }),
                value: t.badge
              }, null, 8, ["class", "value"])) : o("", !0),
              t.shortcut ? (s(), _("span", j, y(t.shortcut), 1)) : o("", !0),
              N ? (s(), _("i", {
                key: 2,
                class: d(["pi pi-angle-down", [
                  {
                    "i-uil:angle-down ms-auto": c,
                    "ltr:i-uil-angle-right-b rtl:i-uil-angle-left-b i-mdi-angle-left ms-auto": !c
                  }
                ]])
              }, null, 2)) : o("", !0)
            ]),
            _: 2
          }, 1040, ["to", "class", "active-class"]))
        ]),
        end: h(() => [
          b("div", F, [
            l.withDarkModeButton ? (s(), n(U, { key: 0 })) : o("", !0),
            p(a).user ? (s(), n(v, {
              key: 1,
              class: "ms-1",
              user: p(a).user
            }, null, 8, ["user"])) : o("", !0),
            k(r.$slots, "end")
          ])
        ]),
        _: 3
      }, 8, ["model", "class"]);
    };
  }
});
export {
  Z as default
};
