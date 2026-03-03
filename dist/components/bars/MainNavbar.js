import { defineComponent as z, resolveComponent as g, openBlock as a, createBlock as n, unref as d, normalizeClass as m, withCtx as h, createElementVNode as p, createCommentVNode as l, renderSlot as v, resolveDynamicComponent as M, mergeProps as N, toDisplayString as B, createElementBlock as k } from "vue";
import R from "HddUiHelpers/components/misc/DarkModeButton.vue";
import { useBasicAuthStore as $ } from "HddUiHelpers/stores/basicAuth";
import { useDimensionsStore as q } from "HddUiHelpers/stores/dimensions.ts";
import { Menubar as H } from "primevue";
const U = {
  key: 1,
  class: "surface-border border-round surface-100 border-1 me-auto p-1 text-xs"
}, V = { class: "flex items-center" }, G = /* @__PURE__ */ z({
  __name: "MainNavbar",
  props: {
    withDarkModeButton: { type: Boolean, default: !0 },
    items: {},
    navbarClass: { default: "light:!bg-sky-200 light:!border-b-sky-300 " },
    activeItemClass: { default: "light:bg-sky-100 dark:bg-gray-800 rounded-lg font-bold" }
  },
  setup(o) {
    const r = $(), { t: y } = useI18n(), u = useTemplateRef("menuBarRef"), E = computed(() => {
      const s = [], i = [], f = o.items.filter((e) => !(e.auth === !0 && !r.user || e.auth === !1 && r.user || e.permission && !r.can(e.permission))).map((e) => ({
        ...e,
        estimated_width: e.label.length * 13
      }));
      let t = 169;
      return f.forEach((e) => {
        t + e.estimated_width > x.value ? i.push(e) : s.push(e), t += e.estimated_width;
      }), i.length > 0 && s.push({
        label: y("Others"),
        items: i
      }), s;
    }), S = q(), _ = computed(
      () => u.value?.$el?.querySelector(".p-menubar-start")
    ), w = computed(
      () => u.value?.$el?.querySelector(".p-menubar-end")
    ), { width: C, height: A } = useElementSize(
      u,
      {},
      {
        box: "border-box"
      }
    ), { width: I } = useElementSize(_), { width: W } = useElementSize(w), x = computed(() => C.value - I.value - W.value - 12);
    return watch(
      A,
      (s) => {
        S.topNavbarHeight = s;
      },
      {
        immediate: !0
      }
    ), (s, i) => {
      const f = g("Badge"), b = g("UserAvatar");
      return a(), n(d(H), {
        ref_key: "menuBarRef",
        ref: u,
        model: d(E),
        class: m([o.navbarClass, "z-2"])
      }, {
        start: h(() => [
          v(s.$slots, "start")
        ]),
        item: h(({ item: t, props: e, hasSubmenu: D, root: c }) => [
          (a(), n(M(t.to ? "router-link" : "a"), N({
            to: t.to
          }, e.action, {
            class: t.class,
            "active-class": o.activeItemClass
          }), {
            default: h(() => [
              p("i", {
                class: m(t.icon)
              }, null, 2),
              p("span", null, B(t.label), 1),
              t.badge ? (a(), n(f, {
                key: 0,
                class: m({ "ms-auto": !c, "ms-2": c }),
                value: t.badge
              }, null, 8, ["class", "value"])) : l("", !0),
              t.shortcut ? (a(), k("span", U, B(t.shortcut), 1)) : l("", !0),
              D ? (a(), k("i", {
                key: 2,
                class: m(["pi pi-angle-down", [
                  {
                    "i-uil:angle-down ms-auto": c,
                    "ltr:i-uil-angle-right-b rtl:i-uil-angle-left-b i-mdi-angle-left ms-auto": !c
                  }
                ]])
              }, null, 2)) : l("", !0)
            ]),
            _: 2
          }, 1040, ["to", "class", "active-class"]))
        ]),
        end: h(() => [
          p("div", V, [
            o.withDarkModeButton ? (a(), n(R, { key: 0 })) : l("", !0),
            d(r).user ? (a(), n(b, {
              key: 1,
              class: "ms-1",
              user: d(r).user
            }, null, 8, ["user"])) : l("", !0),
            v(s.$slots, "end")
          ])
        ]),
        _: 3
      }, 8, ["model", "class"]);
    };
  }
});
export {
  G as default
};
