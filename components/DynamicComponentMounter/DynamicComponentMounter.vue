<script setup lang="ts">
import type { DynamicComponentMounterEventBus } from 'HddUiHelpers/components/DynamicComponentMounter/DynamicComponentMounterUtilities.ts';
import { DynamicComponentMounterDialogKey } from 'HddUiHelpers/components/DynamicComponentMounter/DynamicComponentMounterUtilities.ts';

const bus = useEventBus(DynamicComponentMounterDialogKey);
const localOptions = shallowRef<DynamicComponentMounterEventBus['options'] | null>();
const componentRef = shallowRef('componentRef');
function busListener({ event, options, setRef }: DynamicComponentMounterEventBus) {
  if (event === 'mount') {
    localOptions.value = options;
    setRef(componentRef);
  }
  if (event === 'unmount') {
    localOptions.value = null;
  }
}
onMounted(() => {
  bus.on(busListener);
});

onBeforeUnmount(() => {
  bus.off(busListener);
});
</script>

<template>
  <component :is="localOptions.component" v-if="localOptions && localOptions.component" ref="componentRef" v-bind="localOptions.props"></component>
</template>

<style scoped></style>
