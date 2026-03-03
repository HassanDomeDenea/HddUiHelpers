import { defineComponent as A, ref as m, resolveComponent as D, resolveDirective as L, openBlock as o, createBlock as R, unref as r, withCtx as B, createElementVNode as f, toDisplayString as _, createElementBlock as i, createVNode as H, Fragment as N, renderList as Y, normalizeClass as F, withDirectives as P, createTextVNode as S } from "vue";
import { useLoader as T } from "HddUiHelpers/composables/loader.ts";
import { useApiClient as V } from "HddUiHelpers/stores/apiClient.ts";
import j from "moment";
import q from "primevue/popover";
const z = { style: { "max-height": "90vh", "overflow-y": "auto" } }, M = { class: "mb-1 font-bold text-teal-700" }, I = {
  key: 0,
  class: "text-center"
}, $ = {
  key: 1,
  class: "max-h-xs list-disc overflow-y-auto ps-4"
}, G = { class: "dir-ltr inline-block text-xs" }, J = { key: 2 }, K = { class: "text-secondary text-sm" }, ee = /* @__PURE__ */ A({
  __name: "AuditsPopover",
  setup(O, { expose: g }) {
    const c = useTemplateRef("popoverRef"), a = m([]), x = m(), u = m(null), d = m(null), h = V(), { t: y } = useI18n(), { startLoading: w, endLoading: k, isLoading: b } = T();
    async function C(v, t, s, n, e = null, p = null) {
      a.value = [], c.value.show(v), x.value = n, u.value = e, d.value = p, h.get("/api/audits", {
        params: {
          type: t,
          id: s,
          field: n
        }
      }).then((l) => {
        a.value = Array.isArray(l.data) ? l.data : [], a.value.length < 1 && c.value.hide();
      });
    }
    async function E(v, t, s, n = null, e = null, p = "audits") {
      x.value = s, u.value = n, d.value = e, c.value.hide(), await nextTick(() => {
        c.value.show(v);
      }), w(), h.request({
        url: (typeof t == "object" ? t.url : t) + (p ? `/${p}` : ""),
        method: typeof t == "object" ? t.method : "get",
        params: {
          field: s
        }
      }).then((l) => {
        if (!l.data.success)
          throw new Error(l.data.message);
        a.value = l.data.data.data;
      }).catch(h.toastRequestError).finally(k);
    }
    return g({ showFor: C, showAudits: E }), (v, t) => {
      const s = D("ProgressSpinner"), n = L("tooltip");
      return o(), R(r(q), {
        ref_key: "popoverRef",
        ref: c
      }, {
        default: B(() => [
          f("div", z, [
            f("div", M, _(r(y)("Edit History")) + ":", 1),
            r(b) ? (o(), i("div", I, [
              H(s, { class: "!size-8" })
            ])) : a.value.length > 0 ? (o(), i("ul", $, [
              (o(!0), i(N, null, Y(a.value, (e) => (o(), i("li", {
                key: e.id
              }, [
                f("span", {
                  class: F(["me-2 inline-block font-bold", d.value ? d.value(e.new_value) : ""])
                }, _(u.value ? u.value(e.new_value) : e.new_value), 3),
                P((o(), i("span", G, [
                  S(" (" + _(r(j)(e.created_at).format("YYYY-MM-DD HH:mm A")) + ") ", 1)
                ])), [
                  [
                    n,
                    e.user?.name ? r(y)("By") + ": " + e.user?.name : void 0,
                    void 0,
                    { sm: !0 }
                  ]
                ])
              ]))), 128))
            ])) : (o(), i("div", J, [
              f("span", K, _(r(y)("No Editing History")), 1)
            ]))
          ])
        ]),
        _: 1
      }, 512);
    };
  }
});
export {
  ee as default
};
