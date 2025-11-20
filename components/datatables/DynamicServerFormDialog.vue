<script setup lang="ts" generic="TRecord extends RecordItem = RecordItem">
import { type DynamicServerFormDialogEventBus, dynamicServerFormDialogKey } from 'HddUiHelpers/components/datatables/ServerDataTableUtilities.ts';
import ServerFormDialog from 'HddUiHelpers/components/datatables/ServerFormDialog.vue';
import type { RecordItem } from 'HddUiHelpers/components/FormWrapper/types.ts';
import { last } from 'lodash-es';
import uniqueId from 'lodash/uniqueId';
import type { ComponentExposed } from 'vue-component-type-helpers';

const dynamicDialogRefs = useTemplateRefsList<ComponentExposed<typeof ServerFormDialog>>();
const dialogs = ref([]);

const bus = useEventBus(dynamicServerFormDialogKey);

function busListener({ event, options, row, specificId, dialogRefGetter }: DynamicServerFormDialogEventBus) {
  if (event === 'create') {
    dialogs.value.push({
      localOptions: options,
      isVisible: true,
      id: uniqueId('HddDynamicDialog-'),
    });
    nextTick(() => {
      const newDialogRef = last(dynamicDialogRefs.value);
      newDialogRef.create(row, specificId);
      dialogRefGetter.value = () => {
        return newDialogRef;
      };
    });
  }
  if (event === 'edit') {
    dialogs.value.push({
      localOptions: options,
      isVisible: true,
      id: uniqueId('HddDynamicDialog-'),
    });
    nextTick(() => {
      const newDialogRef = last(dynamicDialogRefs.value);
      newDialogRef.edit(row);
      dialogRefGetter.value = () => {
        return newDialogRef;
      };
    });
  }
  if (event === 'delete') {
    dialogs.value.push({
      localOptions: options,
      isVisible: true,
      id: uniqueId('HddDynamicDialog-'),
    });
    nextTick(() => {
      const newDialogRef = last(dynamicDialogRefs.value);
      newDialogRef.delete(row);
      dialogRefGetter.value = () => {
        return newDialogRef;
      };
    });
  }
}
onMounted(() => {
  bus.on(busListener);
});

onBeforeUnmount(() => {
  bus.off(busListener);
});

function onHidden(dialogId: string) {
  const indexToRemove = dialogs.value.findIndex((e) => e.id === dialogId);
  dialogs.value[indexToRemove].isVisible = false;
  nextTick(() => {
    dialogs.value.splice(indexToRemove, 1);
  });
}
</script>

<template>
  <template v-for="dialog in dialogs" :key="dialog.id">
    <ServerFormDialog
      v-if="dialog.isVisible"
      :ref="dynamicDialogRefs.set"
      v-bind="dialog.localOptions"
      @hidden="() => onHidden(dialog.id)"
    ></ServerFormDialog>
  </template>
</template>

<style scoped></style>
