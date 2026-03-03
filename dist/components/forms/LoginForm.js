import _ from "primevue/panel";
import { _ as d } from "../../HddForm.vue_vue_type_script_setup_true_lang-Dq3asCvM.js";
import f from "primevue/message";
import { defineComponent as g, ref as b, openBlock as h, createBlock as x, withCtx as o, createVNode as r, createElementVNode as w, toDisplayString as y, unref as s, normalizeProps as C, guardReactiveProps as v } from "vue";
import { useApiClient as P } from "HddUiHelpers/stores/apiClient.ts";
import { useBasicAuthStore as S } from "HddUiHelpers/stores/basicAuth";
import { useI18n as B } from "vue-i18n";
import { useRouter as L, useRoute as k } from "vue-router";
const z = { class: "w-full text-center text-lg font-bold" }, D = /* @__PURE__ */ g({
  __name: "LoginForm",
  setup(E) {
    const { t: e } = B(), n = S(), i = L(), l = P(), m = k(), a = b({
      url: {
        url: "/api/login",
        method: "post"
      },
      unifyLabelsWidth: 120,
      submitSeverity: "primary",
      submitText: e("Login"),
      submitIcon: "i-mdi-user",
      size: "small",
      formName: "login",
      fields: [
        {
          name: "username",
          icon: "i-mdi-user",
          label: e("Username"),
          binds: { inputClass: "dir-ltr text-left" }
        },
        {
          name: "password",
          icon: "i-mdi-password",
          type: "password",
          label: e("Password"),
          binds: { inputClass: "dir-ltr text-left" }
        }
      ],
      onSuccess: (t) => {
        if (!t.user) {
          l.toastError(e("Error Occurred"));
          return;
        }
        i.push((m.query?.redirect_url ?? "/") || "/"), n.login(t.user, t.token);
      }
    });
    return (t, I) => {
      const u = f, c = d, p = _;
      return h(), x(p, { class: "font-tajawal w-400px light:bg-primary-1 light:border-blue-200 max-w-full" }, {
        default: o(() => [
          r(u, {
            severity: "success",
            size: "large",
            class: "mb-4",
            variant: "simple"
          }, {
            container: o(() => [
              w("div", z, y(s(e)("Welcome, Please Log In")) + ":", 1)
            ]),
            _: 1
          }),
          r(c, C(v(s(a))), null, 16)
        ]),
        _: 1
      });
    };
  }
});
export {
  D as default
};
