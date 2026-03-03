import { defineComponent as h, resolveComponent as a, openBlock as g, createElementBlock as _, createVNode as r, withCtx as v, createTextVNode as x, toDisplayString as i, unref as n, createElementVNode as b } from "vue";
import { useHddUiHelpers as w } from "HddUiHelpers/plugins/HddUiHelpers";
import { useApiClient as A } from "HddUiHelpers/stores/apiClient";
import { useBasicAuthStore as C } from "HddUiHelpers/stores/basicAuth";
import { Menu as R } from "primevue";
const S = { class: "inline-flex items-center gap-2" }, V = /* @__PURE__ */ h({
  __name: "UserAvatar",
  props: {
    user: {}
  },
  setup(t) {
    const { t: o } = useI18n(), l = useTemplateRef("menu");
    w();
    const c = C(), s = A(), u = useRouter();
    function m(e) {
      l.value?.toggle(e);
    }
    const d = computed(() => [
      {
        label: o("Refresh Page"),
        icon: "i-mdi-refresh",
        class: "text-sm",
        command() {
          window.location.reload();
        }
      },
      {
        label: o("Logout"),
        icon: "i-mdi-logout",
        class: "text-sm",
        command() {
          s.request({ url: "/api/logout", method: "POST" }).then(() => {
            c.logout(), u.push("/login");
          }).catch((e) => {
            console.error(e), s.toastError(), window.location.reload();
          });
        }
      }
    ]);
    return (e, k) => {
      const p = a("Message"), f = a("Avatar");
      return g(), _("div", S, [
        r(p, {
          size: "small",
          severity: "contrast",
          variant: "simple"
        }, {
          default: v(() => [
            x(i(n(o)("Welcome,")) + " ", 1),
            b("b", null, i(t.user.name), 1)
          ]),
          _: 1
        }),
        r(f, {
          image: t.user.avatar_thumb_url,
          icon: t.user.avatar_thumb_url ? void 0 : "i-mdi-user",
          shape: "circle",
          class: "cursor-pointer shadow",
          onClick: m
        }, null, 8, ["image", "icon"]),
        r(n(R), {
          ref: "menu",
          model: n(d),
          popup: !0
        }, null, 8, ["model"])
      ]);
    };
  }
});
export {
  V as default
};
