import { useEventBus as a } from "@vueuse/core";
const s = /* @__PURE__ */ Symbol("symbol-key"), l = function() {
  const o = a(s);
  return {
    mount: async (u) => {
      const e = shallowRef(), n = ref();
      return o.emit({
        event: "mount",
        options: u,
        setRefAndUnMounter(t, r) {
          e.value = t, n.value = r;
        }
      }), await nextTick(), {
        ref: e,
        unmount: () => n.value?.()
      };
    },
    mountComponent: async (u, e) => {
      const n = shallowRef(), t = ref();
      return o.emit({
        event: "mount",
        options: { component: u, props: e },
        setRefAndUnMounter(r, m) {
          n.value = r, t.value = m;
        }
      }), await nextTick(), {
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
  s as DynamicComponentMounterDialogKey,
  l as useDynamicComponentMounter
};
