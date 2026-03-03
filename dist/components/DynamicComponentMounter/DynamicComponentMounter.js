import { defineComponent as d, shallowRef as _, onMounted as v, onBeforeUnmount as k, openBlock as r, createElementBlock as p, Fragment as a, renderList as y, createBlock as C, resolveDynamicComponent as x, mergeProps as B, unref as D, createCommentVNode as L, nextTick as I } from "vue";
import { DynamicComponentMounterDialogKey as R } from "HddUiHelpers/components/DynamicComponentMounter/DynamicComponentMounterUtilities.ts";
import { uniqueId as g, last as h } from "lodash-es";
import { useEventBus as w, useTemplateRefsList as M } from "@vueuse/core";
const H = /* @__PURE__ */ d({
  __name: "DynamicComponentMounter",
  setup(T) {
    const s = w(R), u = M(), e = _([]);
    function m({ event: n, options: t, setRefAndUnMounter: o }) {
      if (n === "mount") {
        const c = g("HddDynamicComponent-"), i = {
          options: t,
          id: c
        };
        t?.stacked !== !0 ? e.value = [i] : e.value.push(i), I(() => {
          o?.(h(u.value), () => {
            const l = e.value.findIndex((f) => f.id === c);
            e.value.splice(l, 1);
          });
        });
      } else n === "clear" && (e.value = []);
    }
    return v(() => {
      s.on(m);
    }), k(() => {
      s.off(m);
    }), (n, t) => (r(!0), p(a, null, y(e.value, (o) => (r(), p(a, {
      key: o.id
    }, [
      o.options?.component ? (r(), C(x(o.options?.component), B({
        key: 0,
        ref_for: !0,
        ref: D(u).set
      }, { ref_for: !0 }, o.options?.props), null, 16)) : L("", !0)
    ], 64))), 128));
  }
});
export {
  H as default
};
