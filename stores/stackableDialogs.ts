import { merge } from 'lodash-es';
import uniqueId from 'lodash/uniqueId';
import { defineStore } from 'pinia';
import { useDialog } from 'primevue';
import type { DynamicDialogOptions } from 'primevue/dynamicdialogoptions';

export const useStackableDialogsStore = defineStore('stackableDialogs', () => {
  const stackableDialogs = ref<any[]>([]);
  function add(dialog?: any): number {
    stackableDialogs.value.push(dialog ?? uniqueId('stackableDialogs'));
    return stackableDialogs.value.length - 1;
  }
  function remove(index: number): void {
    stackableDialogs.value.splice(index, 1);
  }
  function removeByName(name: any): void {
    stackableDialogs.value = stackableDialogs.value.filter((item) => item !== name);
  }

  function getByName(name: any): any {
    return stackableDialogs.value.find((item) => item === name) ?? null;
  }

  function getByIndex(index: number): any {
    return stackableDialogs.value[index] ?? null;
  }

  watch(
    () => stackableDialogs.value.length,
    (val) => {
      console.log('Stackable Dialogs: ', val, '');
    },
  );

  return {
    stackableDialogs,
    getByName,
    getByIndex,
    removeByName,
    remove,
    add,
  };
});

export const useStackableDialog = function (options: { dialogVisibilityRef?: Ref<boolean>; name?: string; dialogRef?: Ref } = {}) {
  const store = useStackableDialogsStore();
  const dialogStackIndex = ref(null);
  const dynamicalDialog = useDialog();

  function addDialogToStack() {
    if (dialogStackIndex.value === null) {
      dialogStackIndex.value = store.add(options.name ?? undefined);
    }
  }
  function removeDialogFromStack() {
    if (dialogStackIndex.value !== null) {
      store.remove(dialogStackIndex.value);
      dialogStackIndex.value = null;
    }
  }

  const isClosable = computed(() => {
    return store.stackableDialogs.length - 1 === dialogStackIndex.value;
  });

  function updateDialogVisibility(visible: boolean) {
    if (visible) {
      addDialogToStack();
    } else {
      removeDialogFromStack();
    }
  }

  if (options.dialogVisibilityRef) {
    watch(options.dialogVisibilityRef, (val) => {
      updateDialogVisibility(val);
    });
  }

  function open(content: any, options?: DynamicDialogOptions) {
    updateDialogVisibility(true);
    dynamicalDialog.open(
      content,
      merge(
        {
          props: {
            dismissableMask: true,
            closeOnEscape: isClosable,
            draggable: false,
            modal: true,
          } as any,
          onClose() {
            updateDialogVisibility(false);
          },
        },
        options,
      ),
    );
  }

  return {
    open,
    updateDialogVisibility,
    store,
    addDialogToStack,
    removeDialogFromStack,
    isClosable,
    dialogStackIndex,
  };
};
