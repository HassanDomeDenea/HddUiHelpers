import { defineComponent as _, shallowRef as v, onMounted as k, onBeforeUnmount as y, openBlock as r, createElementBlock as p, Fragment as a, renderList as C, unref as l, createBlock as x, resolveDynamicComponent as B, mergeProps as D, createCommentVNode as L, nextTick as I } from "vue";
import { DynamicComponentMounterDialogKey as R } from "HddUiHelpers/components/DynamicComponentMounter/DynamicComponentMounterUtilities.ts";
import { uniqueId as g, last as h } from "lodash-es";
import { useEventBus as w, useTemplateRefsList as M } from "@vueuse/core";
const H = /* @__PURE__ */ _({
  __name: "DynamicComponentMounter",
  setup(T) {
    const s = w(R), u = M(), e = v([]);
    function m({ event: n, options: t, setRefAndUnMounter: o }) {
      if (n === "mount") {
        const c = g("HddDynamicComponent-"), i = {
          options: t,
          id: c
        };
        t?.stacked !== !0 ? e.value = [i] : e.value.push(i), I(() => {
          o?.(h(u.value), () => {
            const f = e.value.findIndex((d) => d.id === c);
            e.value.splice(f, 1);
          });
        });
      } else n === "clear" && (e.value = []);
    }
    return k(() => {
      s.on(m);
    }), y(() => {
      s.off(m);
    }), (n, t) => (r(!0), p(a, null, C(l(e), (o) => (r(), p(a, {
      key: o.id
    }, [
      o.options?.component ? (r(), x(B(o.options?.component), D({
        key: 0,
        ref_for: !0,
        ref: l(u).set
      }, { ref_for: !0 }, o.options?.props), null, 16)) : L("", !0)
    ], 64))), 128));
  }
});
export {
  H as default
};
