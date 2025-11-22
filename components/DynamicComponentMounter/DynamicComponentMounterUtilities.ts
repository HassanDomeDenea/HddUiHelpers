import type { EventBusKey } from '@vueuse/core';
import { useEventBus } from '@vueuse/core';
import type { ShallowRef } from 'vue';

export type DynamicComponentMounterEventBus = {
  event: 'mount' | 'clear';
  options?: { component: any; props?: any; stacked?: boolean };
  setRefAndUnMounter?: (componentRef: ShallowRef, unMounter: () => void) => void;
};
export const DynamicComponentMounterDialogKey: EventBusKey<DynamicComponentMounterEventBus> = Symbol('symbol-key');
export const useDynamicComponentMounter = function () {
  const bus = useEventBus(DynamicComponentMounterDialogKey);
  return {
    mount: async (options: DynamicComponentMounterEventBus['options']) => {
      const componentRef = shallowRef<any>();
      const unMounter = ref<() => void>();
      bus.emit({
        event: 'mount',
        options,
        setRefAndUnMounter(_componentRef, _unMounter) {
          componentRef.value = _componentRef;
          unMounter.value = _unMounter;
        },
      });
      await nextTick();
      return {
        ref: componentRef,
        unmount: () => unMounter.value?.(),
      };
    },
    clear: () => {
      bus.emit({
        event: 'clear',
      });
    },
  };
};
