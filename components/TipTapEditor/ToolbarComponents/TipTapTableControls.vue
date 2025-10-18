<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import type { TipTapEditorConfig } from 'HddUiHelpers/components/TipTapEditor/TipTapEditorTypes.ts';
import uniqueId from 'lodash/uniqueId';
import { Menu } from 'primevue';
import type { MenuItem } from 'primevue/menuitem';
import Popover from 'primevue/popover';
import type { ComponentExposed } from 'vue-component-type-helpers';
const { editor } = defineProps<{
  editor: Editor;
  config?: TipTapEditorConfig;
}>();
const { t } = useI18n();

const insertTableModel = ref({
  rows: 2,
  cols: 2,
  withHeader: true,

  rowsId: uniqueId('insert-table-rows-input'),
  colsId: uniqueId('insert-table-cols-input'),
  withHeaderId: uniqueId('insert-table-with-headers-input'),
});
const insertTablePopoverRef = useTemplateRef<ComponentExposed<typeof Popover>>('insertTablePopoverRef');
function openInsertTablePopover(event: Event) {
  insertTableModel.value.rows = 2;
  insertTableModel.value.cols = 2;
  insertTableModel.value.withHeader = true;
  insertTablePopoverRef.value.toggle(event);
}
function confirmInsertTable() {
  editor
    .chain()
    .focus()
    .insertTable({ rows: insertTableModel.value.rows, cols: insertTableModel.value.cols, withHeaderRow: insertTableModel.value.withHeader })
    .run();
  insertTablePopoverRef.value.hide();
}

const tableOptionsMenuRef = useTemplateRef<ComponentExposed<typeof Menu>>('tableOptionsMenuRef');
const tableOptionsMenuItems = computed(() => {
  const tableIsActive = editor.isActive('table');
  return [
    {
      label: t('Insert Table'),
      disabled: !editor.can().chain().focus().insertTable().run(),
      icon: 'i-mdi:table-large-plus',
      command: (event) => {
        openInsertTablePopover(event.originalEvent);
      },
    },
    { separator: true },

    {
      label: t('Add Column Before'),
      disabled: !tableIsActive,
      icon: 'i-mdi:table-column-plus-before',
      command: () => {
        editor.chain().focus().addColumnBefore().run();
      },
    },
    {
      label: t('Add Column After'),
      disabled: !tableIsActive,
      icon: 'i-mdi:table-column-plus-after',
      command: () => {
        editor.chain().focus().addColumnAfter().run();
      },
    },
    {
      label: t('Add Row Before'),
      disabled: !tableIsActive,
      icon: 'i-mdi:table-row-plus-before',
      command: () => {
        editor.chain().focus().addRowBefore().run();
      },
    },
    {
      label: t('Add Row After'),
      disabled: !tableIsActive,
      icon: 'i-mdi:table-row-plus-after',
      command: () => {
        editor.chain().focus().addRowAfter().run();
      },
    },
    { separator: true },

    {
      label: t('Delete Column'),
      disabled: !tableIsActive,
      icon: 'i-mdi:table-column-remove',
      command: () => {
        editor.chain().focus().deleteColumn().run();
      },
    },
    {
      label: t('Delete Row'),
      disabled: !tableIsActive,
      icon: 'i-mdi:table-row-remove',
      command: () => {
        editor.chain().focus().deleteRow().run();
      },
    },
    {
      label: t('Delete Table'),
      disabled: !tableIsActive,
      icon: 'i-mdi:table-large-remove',
      command: () => {
        editor.chain().focus().deleteTable().run();
      },
    },
    { separator: true },
    {
      label: t('Split/Merge Cells'),
      disabled: !tableIsActive,
      icon: 'i-mdi:table-merge-cells',
      command: () => {
        editor.chain().focus().mergeOrSplit().run();
      },
    },
    /*{
      label: t('Split Cell'),
      disabled: !tableIsActive,
      icon: 'i-mdi:table-split-cell',
      command: () => {
        console.log(editor.state.selection);
        // editor.state.selection
        editor.chain().focus().splitCell().run();
      },
    },*/
  ] as MenuItem[];
});
</script>

<template>
  <div class="inline-flex flex-wrap">
    <Button
      size="small"
      :disabled="!editor.can().chain().focus().insertTable().run()"
      :title="t('Table Options')"
      severity="info"
      :outlined="!editor.isActive('table')"
      icon="i-flowbite:insert-table-outline"
      @click="(event) => tableOptionsMenuRef.toggle(event)"
    >
    </Button>
    <Menu ref="tableOptionsMenuRef" :model="tableOptionsMenuItems" popup></Menu>

    <Popover ref="insertTablePopoverRef">
      <div class="space-y-2 p-1">
        <Message variant="simple">
          <span class="text-lg font-bold">{{ t('Insert Table') }}:</span>
        </Message>
        <div class="flex items-center gap-1">
          <label :for="insertTableModel.rowsId" class="w-24">{{ t('Columns') }}: </label>
          <InputNumber
            v-model="insertTableModel.cols"
            :input-id="insertTableModel.colsId"
            size="small"
            fluid
            show-buttons
            :min="1"
            :max-fraction-digits="0"
            :min-fraction-digits="0"
            :step="1"
          />
        </div>
        <div class="flex items-center gap-1">
          <label :for="insertTableModel.colsId" class="w-24">{{ t('Rows') }}: </label>
          <InputNumber
            v-model="insertTableModel.rows"
            :input-id="insertTableModel.rowsId"
            size="small"
            fluid
            show-buttons
            :min="1"
            :max-fraction-digits="0"
            :min-fraction-digits="0"
            :step="1"
          />
        </div>
        <div class="flex items-center gap-1">
          <label :for="insertTableModel.withHeaderId">{{ t('With Header Row') }}: </label>
          <Checkbox v-model="insertTableModel.withHeader" size="small" :input-id="insertTableModel.withHeaderId" binary />
        </div>
        <div class="flex justify-end">
          <Button :label="t('Insert')" icon="i-mdi-check" size="small" autofocus @click="confirmInsertTable" />
        </div>
      </div>
    </Popover>
  </div>
</template>

<style scoped></style>
