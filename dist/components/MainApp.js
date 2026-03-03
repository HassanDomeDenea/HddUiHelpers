import C from "primevue/confirmpopup";
import D from "primevue/dynamicdialog";
import v from "primevue/confirmdialog";
import b from "primevue/toast";
import { defineComponent as w, watch as s, resolveComponent as B, openBlock as n, createElementBlock as x, createVNode as o, unref as r, withCtx as y, createBlock as l, KeepAlive as A, resolveDynamicComponent as P } from "vue";
import T from "HddUiHelpers/components/datatables/DynamicServerFormDialog.vue";
import k from "HddUiHelpers/components/DynamicComponentMounter/DynamicComponentMounter.vue";
import I from "HddUiHelpers/components/misc/TopProgressBar.vue";
import S from "HddUiHelpers/components/modified/DismissableConfirmDialog.vue";
import { setPageDirection as V } from "HddUiHelpers/plugins/i18n";
import { useBasicAuthStore as M } from "HddUiHelpers/stores/basicAuth";
import E from "HddUiHelpers/utils/primeVueLocales";
import { usePrimeVue as F } from "primevue";
import { defaultOptions as K } from "primevue/config";
import { useToast as L } from "primevue/usetoast";
import { useApiClient as N } from "HddUiHelpers/stores/apiClient";
import O from "HddUiHelpers/components/ConfirmDialogWithInput/ConfirmDialogWithInput.vue";
import { useI18n as W } from "vue-i18n";
const j = { class: "flex-1 overflow-auto" }, so = /* @__PURE__ */ w({
  __name: "MainApp",
  setup(q) {
    const { t, locale: m } = W(), c = L(), u = M(), p = N();
    p.setI18n(t), p.setToast(c);
    const a = F();
    return s(
      () => u.options.language,
      (i) => {
        i && (m.value = i, V());
      },
      {
        immediate: !0
      }
    ), s(
      m,
      (i) => {
        a.config.locale = E[i] ?? K.locale;
      },
      {
        immediate: !0
      }
    ), (i, z) => {
      const e = b, _ = v, f = D, g = C, d = B("router-view");
      return n(), x("main", j, [
        o(I),
        o(e, {
          group: "errors",
          position: r(t)("dir") === "ltr" ? "bottom-right" : "bottom-left"
        }, null, 8, ["position"]),
        o(e, {
          group: "success",
          position: r(t)("dir") === "ltr" ? "bottom-right" : "bottom-left"
        }, null, 8, ["position"]),
        o(e, {
          group: "notifications",
          position: r(t)("dir") === "ltr" ? "top-right" : "top-left"
        }, null, 8, ["position"]),
        o(e, {
          position: r(t)("dir") === "ltr" ? "top-right" : "top-left"
        }, null, 8, ["position"]),
        o(_),
        o(S, { group: "dismissable" }),
        o(T),
        o(f),
        o(O),
        o(g, { group: "popup" }),
        o(k),
        o(d, null, {
          default: y(({ Component: h }) => [
            (n(), l(A, null, [
              (n(), l(P(h)))
            ], 1024))
          ]),
          _: 1
        })
      ]);
    };
  }
});
export {
  so as default
};
