import type { EventBusKey } from '@vueuse/core';
import { useEventBus } from '@vueuse/core';

export type DynamicComponentMounterEventBus = {
  event: 'mount' | 'unmount';
  options?: { component: any; props?: any };
  setRef: (componentRef: any) => void;
};
export const DynamicComponentMounterDialogKey: EventBusKey<DynamicComponentMounterEventBus> = Symbol('symbol-key');
export const useDynamicComponentMounter = function () {
  const bus = useEventBus(DynamicComponentMounterDialogKey);
  return {
    mount: async (options: DynamicComponentMounterEventBus['options']) => {
      let componentRef: any;
      bus.emit({
        event: 'mount',
        options,
        setRef(_componentRef) {
          componentRef = _componentRef;
        },
      });
      await nextTick();
      return componentRef;
    },
    unmount: async () => {
      bus.emit({ event: 'unmount' });
      await nextTick();
    },
  };
};
