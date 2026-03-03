import { defineComponent as h, watch as l, resolveComponent as e, openBlock as m, createElementBlock as v, createVNode as o, unref as n, withCtx as b, createBlock as a, KeepAlive as w, resolveDynamicComponent as y } from "vue";
import B from "HddUiHelpers/components/datatables/DynamicServerFormDialog.vue";
import P from "HddUiHelpers/components/DynamicComponentMounter/DynamicComponentMounter.vue";
import T from "HddUiHelpers/components/misc/TopProgressBar.vue";
import x from "HddUiHelpers/components/modified/DismissableConfirmDialog.vue";
import { setPageDirection as A } from "HddUiHelpers/plugins/i18n";
import { useBasicAuthStore as k } from "HddUiHelpers/stores/basicAuth";
import I from "HddUiHelpers/utils/primeVueLocales";
import { usePrimeVue as S } from "primevue";
import { defaultOptions as V } from "primevue/config";
import { useToast as M } from "primevue/usetoast";
import { useApiClient as E } from "HddUiHelpers/stores/apiClient";
import F from "HddUiHelpers/components/ConfirmDialogWithInput/ConfirmDialogWithInput.vue";
import { useI18n as K } from "vue-i18n";
const L = { class: "flex-1 overflow-auto" }, oo = /* @__PURE__ */ h({
  __name: "MainApp",
  setup(N) {
    const { t, locale: p } = K(), c = M(), u = k(), s = E();
    s.setI18n(t), s.setToast(c);
    const f = S();
    return l(
      () => u.options.language,
      (i) => {
        i && (p.value = i, A());
      },
      {
        immediate: !0
      }
    ), l(
      p,
      (i) => {
        f.config.locale = I[i] ?? V.locale;
      },
      {
        immediate: !0
      }
    ), (i, O) => {
      const r = e("Toast"), _ = e("ConfirmDialog"), g = e("DynamicDialog"), D = e("ConfirmPopup"), d = e("router-view");
      return m(), v("main", L, [
        o(T),
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
        o(_),
        o(x, { group: "dismissable" }),
        o(B),
        o(g),
        o(F),
        o(D, { group: "popup" }),
        o(P),
        o(d, null, {
          default: b(({ Component: C }) => [
            (m(), a(w, null, [
              (m(), a(y(C)))
            ], 1024))
          ]),
          _: 1
        })
      ]);
    };
  }
});
export {
  oo as default
};
