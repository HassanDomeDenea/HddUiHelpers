import { defineComponent as h, useTemplateRef as g, computed as _, resolveComponent as s, openBlock as v, createElementBlock as x, createVNode as r, withCtx as b, createTextVNode as w, toDisplayString as a, unref as i, createElementVNode as A } from "vue";
import { useHddUiHelpers as C } from "HddUiHelpers/plugins/HddUiHelpers";
import { useApiClient as R } from "HddUiHelpers/stores/apiClient";
import { useBasicAuthStore as S } from "HddUiHelpers/stores/basicAuth";
import { useI18n as k } from "vue-i18n";
import { useRouter as B } from "vue-router";
import { Menu as E } from "primevue";
const M = { class: "inline-flex items-center gap-2" }, z = /* @__PURE__ */ h({
  __name: "UserAvatar",
  props: {
    user: {}
  },
  setup(o) {
    const { t } = k(), l = g("menu");
    C();
    const m = S(), n = R(), c = B();
    function u(e) {
      l.value?.toggle(e);
    }
    const p = _(() => [
      {
        label: t("Refresh Page"),
        icon: "i-mdi-refresh",
        class: "text-sm",
        command() {
          window.location.reload();
        }
      },
      {
        label: t("Logout"),
        icon: "i-mdi-logout",
        class: "text-sm",
        command() {
          n.request({ url: "/api/logout", method: "POST" }).then(() => {
            m.logout(), c.push("/login");
          }).catch((e) => {
            console.error(e), n.toastError(), window.location.reload();
          });
        }
      }
    ]);
    return (e, N) => {
      const d = s("Message"), f = s("Avatar");
      return v(), x("div", M, [
        r(d, {
          size: "small",
          severity: "contrast",
          variant: "simple"
        }, {
          default: b(() => [
            w(a(i(t)("Welcome,")) + " ", 1),
            A("b", null, a(o.user.name), 1)
          ]),
          _: 1
        }),
        r(f, {
          image: o.user.avatar_thumb_url,
          icon: o.user.avatar_thumb_url ? void 0 : "i-mdi-user",
          shape: "circle",
          class: "cursor-pointer shadow",
          onClick: u
        }, null, 8, ["image", "icon"]),
        r(i(E), {
          ref: "menu",
          model: p.value,
          popup: !0
        }, null, 8, ["model"])
      ]);
    };
  }
});
export {
  z as default
};
