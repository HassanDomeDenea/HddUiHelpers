import _ from "primevue/avatar";
import f from "primevue/message";
import { defineComponent as g, useTemplateRef as h, computed as v, openBlock as x, createElementBlock as b, createVNode as r, withCtx as w, createTextVNode as A, toDisplayString as i, unref as n, createElementVNode as C } from "vue";
import { useHddUiHelpers as R } from "HddUiHelpers/plugins/HddUiHelpers";
import { useApiClient as S } from "HddUiHelpers/stores/apiClient";
import { useBasicAuthStore as k } from "HddUiHelpers/stores/basicAuth";
import { Menu as B } from "primevue";
import { useI18n as E } from "vue-i18n";
import { useRouter as N } from "vue-router";
const T = { class: "inline-flex items-center gap-2" }, L = /* @__PURE__ */ g({
  __name: "UserAvatar",
  props: {
    user: {}
  },
  setup(o) {
    const { t } = E(), m = h("menu");
    R();
    const a = k(), s = S(), c = N();
    function l(e) {
      m.value?.toggle(e);
    }
    const u = v(() => [
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
          s.request({ url: "/api/logout", method: "POST" }).then(() => {
            a.logout(), c.push("/login");
          }).catch((e) => {
            console.error(e), s.toastError(), window.location.reload();
          });
        }
      }
    ]);
    return (e, V) => {
      const p = f, d = _;
      return x(), b("div", T, [
        r(p, {
          size: "small",
          severity: "contrast",
          variant: "simple"
        }, {
          default: w(() => [
            A(i(n(t)("Welcome,")) + " ", 1),
            C("b", null, i(o.user.name), 1)
          ]),
          _: 1
        }),
        r(d, {
          image: o.user.avatar_thumb_url,
          icon: o.user.avatar_thumb_url ? void 0 : "i-mdi-user",
          shape: "circle",
          class: "cursor-pointer shadow",
          onClick: l
        }, null, 8, ["image", "icon"]),
        r(n(B), {
          ref: "menu",
          model: n(u),
          popup: !0
        }, null, 8, ["model"])
      ]);
    };
  }
});
export {
  L as _
};
