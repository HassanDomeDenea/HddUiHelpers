import { defineComponent as p, ref as d, resolveComponent as r, openBlock as f, createBlock as _, withCtx as o, createVNode as s, createElementVNode as g, toDisplayString as b, unref as h, normalizeProps as x, guardReactiveProps as w } from "vue";
import { useApiClient as y } from "HddUiHelpers/stores/apiClient.ts";
import { useBasicAuthStore as v } from "HddUiHelpers/stores/basicAuth";
import { useI18n as C } from "vue-i18n";
import { useRouter as P, useRoute as S } from "vue-router";
import B from "HddUiHelpers/components/FormWrapper/HddForm.vue";
const L = { class: "w-full text-center text-lg font-bold" }, M = /* @__PURE__ */ p({
  __name: "LoginForm",
  setup(k) {
    const { t: e } = C(), n = v(), i = P(), l = y(), a = S(), m = d({
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
        i.push((a.query?.redirect_url ?? "/") || "/"), n.login(t.user, t.token);
      }
    });
    return (t, z) => {
      const u = r("Message"), c = r("Panel");
      return f(), _(c, { class: "font-tajawal w-400px light:bg-primary-1 light:border-blue-200 max-w-full" }, {
        default: o(() => [
          s(u, {
            severity: "success",
            size: "large",
            class: "mb-4",
            variant: "simple"
          }, {
            container: o(() => [
              g("div", L, b(h(e)("Welcome, Please Log In")) + ":", 1)
            ]),
            _: 1
          }),
          s(B, x(w(m.value)), null, 16)
        ]),
        _: 1
      });
    };
  }
});
export {
  M as default
};
