import { defineComponent as f, resolveComponent as o, openBlock as _, createBlock as g, withCtx as r, createVNode as s, createElementVNode as b, toDisplayString as h, unref as n, normalizeProps as x, guardReactiveProps as w } from "vue";
import { useApiClient as y } from "HddUiHelpers/stores/apiClient.ts";
import { useBasicAuthStore as C } from "HddUiHelpers/stores/basicAuth";
const v = { class: "w-full text-center text-lg font-bold" }, z = /* @__PURE__ */ f({
  __name: "LoginForm",
  setup(P) {
    const { t: e } = useI18n(), i = C(), l = useRouter(), a = y(), u = useRoute(), c = ref({
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
          a.toastError(e("Error Occurred"));
          return;
        }
        l.push((u.query?.redirect_url ?? "/") || "/"), i.login(t.user, t.token);
      }
    });
    return (t, S) => {
      const m = o("Message"), p = o("HddForm"), d = o("Panel");
      return _(), g(d, { class: "font-tajawal w-400px light:bg-primary-1 light:border-blue-200 max-w-full" }, {
        default: r(() => [
          s(m, {
            severity: "success",
            size: "large",
            class: "mb-4",
            variant: "simple"
          }, {
            container: r(() => [
              b("div", v, h(n(e)("Welcome, Please Log In")) + ":", 1)
            ]),
            _: 1
          }),
          s(p, x(w(n(c))), null, 16)
        ]),
        _: 1
      });
    };
  }
});
export {
  z as default
};
