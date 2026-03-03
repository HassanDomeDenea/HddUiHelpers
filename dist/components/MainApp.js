import { defineComponent as C, resolveComponent as e, openBlock as m, createElementBlock as h, createVNode as o, unref as n, withCtx as v, createBlock as l, KeepAlive as b, resolveDynamicComponent as w } from "vue";
import y from "HddUiHelpers/components/datatables/DynamicServerFormDialog.vue";
import B from "HddUiHelpers/components/DynamicComponentMounter/DynamicComponentMounter.vue";
import P from "HddUiHelpers/components/misc/TopProgressBar.vue";
import T from "HddUiHelpers/components/modified/DismissableConfirmDialog.vue";
import { setPageDirection as x } from "HddUiHelpers/plugins/i18n";
import { useBasicAuthStore as A } from "HddUiHelpers/stores/basicAuth";
import k from "HddUiHelpers/utils/primeVueLocales";
import { usePrimeVue as I } from "primevue";
import { defaultOptions as S } from "primevue/config";
import { useToast as V } from "primevue/usetoast";
import { useApiClient as M } from "HddUiHelpers/stores/apiClient";
import E from "HddUiHelpers/components/ConfirmDialogWithInput/ConfirmDialogWithInput.vue";
const F = { class: "flex-1 overflow-auto" }, Y = /* @__PURE__ */ C({
  __name: "MainApp",
  setup(K) {
    const { t, locale: p } = useI18n(), a = V(), c = A(), s = M();
    s.setI18n(t), s.setToast(a);
    const u = I();
    return watch(
      () => c.options.language,
      (i) => {
        i && (p.value = i, x());
      },
      {
        immediate: !0
      }
    ), watch(
      p,
      (i) => {
        u.config.locale = k[i] ?? S.locale;
      },
      {
        immediate: !0
      }
    ), (i, L) => {
      const r = e("Toast"), f = e("ConfirmDialog"), _ = e("DynamicDialog"), g = e("ConfirmPopup"), D = e("router-view");
      return m(), h("main", F, [
        o(P),
        o(r, {
          group: "errors",
          position: n(t)("dir") === "ltr" ? "bottom-right" : "bottom-left"
        }, null, 8, ["position"]),
        o(r, {
          group: "success",
          position: n(t)("dir") === "ltr" ? "bottom-right" : "bottom-left"
        }, null, 8, ["position"]),
        o(r, {
          group: "notifications",
          position: n(t)("dir") === "ltr" ? "top-right" : "top-left"
        }, null, 8, ["position"]),
        o(r, {
          position: n(t)("dir") === "ltr" ? "top-right" : "top-left"
        }, null, 8, ["position"]),
        o(f),
        o(T, { group: "dismissable" }),
        o(y),
        o(_),
        o(E),
        o(g, { group: "popup" }),
        o(B),
        o(D, null, {
          default: v(({ Component: d }) => [
            (m(), l(b, null, [
              (m(), l(w(d)))
            ], 1024))
          ]),
          _: 1
        })
      ]);
    };
  }
});
export {
  Y as default
};
