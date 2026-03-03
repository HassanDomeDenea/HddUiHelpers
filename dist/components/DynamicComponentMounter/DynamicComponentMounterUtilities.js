import { useEventBus as i } from "@vueuse/core";
import { shallowRef as r, ref as a, nextTick as s } from "vue";
const l = /* @__PURE__ */ Symbol("symbol-key"), p = function() {
  const o = i(l);
  return {
    mount: async (u) => {
      const e = r(), n = a();
      return o.emit({
        event: "mount",
        options: u,
        setRefAndUnMounter(t, m) {
          e.value = t, n.value = m;
        }
      }), await s(), {
        ref: e,
        unmount: () => n.value?.()
      };
    },
    mountComponent: async (u, e) => {
      const n = r(), t = a();
      return o.emit({
        event: "mount",
        options: { component: u, props: e },
        setRefAndUnMounter(m, c) {
          n.value = m, t.value = c;
        }
      }), await s(), {
        ref: n,
        unmount: () => t.value?.()
      };
    },
    clear: () => {
      o.emit({
        event: "clear"
      });
    }
  };
};
export {
  l as DynamicComponentMounterDialogKey,
  p as useDynamicComponentMounter
};
