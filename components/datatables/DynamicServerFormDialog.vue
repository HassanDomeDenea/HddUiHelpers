<script setup lang="ts" generic="TRecord extends RecordItem = RecordItem">
import ServerFormDialog, { type ServerFormDialogProps } from 'HddUiHelpers/components/datatables/ServerFormDialog.vue';
import type { ComponentExposed } from 'vue-component-type-helpers';
import { type DynamicServerFormDialogEventBus, dynamicServerFormDialogKey } from 'HddUiHelpers/components/datatables/ServerDataTableUtilities.ts';

const dynamicDialogRef = useTemplateRef<ComponentExposed<typeof ServerFormDialog>>('dynamicDialogRef');

const bus = useEventBus(dynamicServerFormDialogKey);
const localOptions = ref<ServerFormDialogProps>();
const isVisible = ref(false);

function busListener({ event, options, row, specificId }: DynamicServerFormDialogEventBus) {
    if (event === 'set') {
        localOptions.value = options;
    }
    if (event === 'create') {
        localOptions.value = options;
        isVisible.value = true;
        nextTick(() => {
            dynamicDialogRef.value?.create(row, specificId);
        });
    }
    if (event === 'edit') {
        localOptions.value = options;
        isVisible.value = true;
        nextTick(() => {
            dynamicDialogRef.value?.edit(row);
        });
    }
    if (event === 'delete') {
        localOptions.value = options;
        isVisible.value = true;
        nextTick(() => {
            dynamicDialogRef.value?.delete(row);
        });
    }
}
onMounted(() => {
    bus.on(busListener);
})

onBeforeUnmount(() => {
    bus.off(busListener);
})

function onHidden() {
    isVisible.value = false;
}

function onEscapeKeydown(event: KeyboardEvent) {
    if (event.code === 'Escape') {
        event.stopImmediatePropagation();
        event.preventDefault();
        if (localOptions.value.closeOnEsc !== false) {
            dynamicDialogRef.value?.close()
        }
    }
}
</script>

<template>
    <ServerFormDialog v-if="isVisible" ref="dynamicDialogRef" v-bind="localOptions" @hidden="onHidden"></ServerFormDialog>
</template>

<style scoped></style>
