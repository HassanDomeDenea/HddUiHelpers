import { defineComponent as _, openBlock as r, createElementBlock as p, Fragment as a, renderList as v, unref as l, createBlock as k, resolveDynamicComponent as y, mergeProps as C, createCommentVNode as x } from "vue";
import { DynamicComponentMounterDialogKey as B } from "HddUiHelpers/components/DynamicComponentMounter/DynamicComponentMounterUtilities.ts";
import { uniqueId as D, last as L } from "lodash-es";
const w = /* @__PURE__ */ _({
  __name: "DynamicComponentMounter",
  setup(I) {
    const s = useEventBus(B), u = useTemplateRefsList(), e = shallowRef([]);
    function c({ event: o, options: t, setRefAndUnMounter: n }) {
      if (o === "mount") {
        const m = D("HddDynamicComponent-"), i = {
          options: t,
          id: m
        };
        t?.stacked !== !0 ? e.value = [i] : e.value.push(i), nextTick(() => {
          n?.(L(u.value), () => {
            const f = e.value.findIndex((d) => d.id === m);
            e.value.splice(f, 1);
          });
        });
      } else o === "clear" && (e.value = []);
    }
    return onMounted(() => {
      s.on(c);
    }), onBeforeUnmount(() => {
      s.off(c);
    }), (o, t) => (r(!0), p(a, null, v(l(e), (n) => (r(), p(a, {
      key: n.id
    }, [
      n.options?.component ? (r(), k(y(n.options?.component), C({
        key: 0,
        ref_for: !0,
        ref: l(u).set
      }, { ref_for: !0 }, n.options?.props), null, 16)) : x("", !0)
    ], 64))), 128));
  }
});
export {
  w as default
};
