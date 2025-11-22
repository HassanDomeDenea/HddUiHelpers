<script setup lang="ts">
import type { DynamicComponentMounterEventBus } from 'HddUiHelpers/components/DynamicComponentMounter/DynamicComponentMounterUtilities.ts';
import { DynamicComponentMounterDialogKey } from 'HddUiHelpers/components/DynamicComponentMounter/DynamicComponentMounterUtilities.ts';
import { last } from 'lodash-es';
import uniqueId from 'lodash/uniqueId';

const bus = useEventBus(DynamicComponentMounterDialogKey);
const componentsListRefs = useTemplateRefsList<any>();

const componentsList = ref<
  {
    options: DynamicComponentMounterEventBus['options'];
    id: string;
  }[]
>([]);
function busListener({ event, options, setRefAndUnMounter }: DynamicComponentMounterEventBus) {
  if (event === 'mount') {
    const newComponentId = uniqueId('HddDynamicComponent-');
    const newItem = {
      options: options,
      id: newComponentId,
    };
    if (options.stacked !== true) {
      componentsList.value = [newItem];
    } else {
      componentsList.value.push(newItem);
    }

    nextTick(() => {
      setRefAndUnMounter(last(componentsListRefs.value), () => {
        const indexToRemove = componentsList.value.findIndex((e) => e.id === newComponentId);
        componentsList.value.splice(indexToRemove, 1);
      });
    });
  } else if (event === 'clear') {
    componentsList.value = [];
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
  <template v-for="item in componentsList" :key="item.id">
    <component :is="item.options.component" v-if="item.options.component" :ref="componentsListRefs.set" v-bind="item.options.props"></component>
  </template>
</template>

<style scoped></style>
