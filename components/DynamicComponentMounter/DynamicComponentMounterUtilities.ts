import type { EventBusKey } from '@vueuse/core'
import { useEventBus } from '@vueuse/core'
import type { ShallowRef } from 'vue'
import { ComponentExposed } from 'vue-component-type-helpers'

export type DynamicComponentMounterEventBus<TComponent = any> = {
  event: 'mount' | 'clear'
  options?: { component: TComponent; props?: any; stacked?: boolean }
  setRefAndUnMounter?: (componentRef: ShallowRef, unMounter: () => void) => void
}
export const DynamicComponentMounterDialogKey: EventBusKey<DynamicComponentMounterEventBus> =
  Symbol('symbol-key')
export const useDynamicComponentMounter = function () {
  const bus = useEventBus(DynamicComponentMounterDialogKey)
  return {
    mount: async <TComponent>(options: DynamicComponentMounterEventBus<TComponent>['options']) => {
      const componentRef = shallowRef<ComponentExposed<TComponent>>()
      const unMounter = ref<() => void>()
      bus.emit({
        event: 'mount',
        options,
        setRefAndUnMounter(_componentRef, _unMounter) {
          componentRef.value = _componentRef as ComponentExposed<TComponent>
          unMounter.value = _unMounter
        },
      })
      await nextTick()
      return {
        ref: componentRef as ShallowRef<ComponentExposed<TComponent>>,
        unmount: () => unMounter.value?.(),
      }
    },
    mountComponent: async <TComponent>(component: TComponent, props?: any) => {
      const componentRef = shallowRef<ComponentExposed<TComponent>>()
      const unMounter = ref<() => void>()
      bus.emit({
        event: 'mount',
        options: { component, props },
        setRefAndUnMounter(_componentRef, _unMounter) {
          componentRef.value = _componentRef as ComponentExposed<TComponent>
          unMounter.value = _unMounter
        },
      })
      await nextTick()
      return {
        ref: componentRef as ShallowRef<ComponentExposed<TComponent>>,
        unmount: () => unMounter.value?.(),
      }
    },
    clear: () => {
      bus.emit({
        event: 'clear',
      })
    },
  }
}
