import type { ServerDataTableColumn } from 'HddUiHelpers/components/datatables/ServerDataTableTypes.ts';
import { getColumnName } from 'HddUiHelpers/components/datatables/ServerDataTableUtilities.ts';
import { useStorage } from '@vueuse/core';
import { isBoolean } from 'lodash-es';
import type Popover from 'primevue/popover';
import { useConfirm } from 'primevue/useconfirm';
import type { MaybeRef } from 'vue';
import { computed, onMounted, ref, toRef, useTemplateRef } from 'vue';
import { useI18n } from 'vue-i18n';

export const useServerDataTableColumnVisibility = (tableName: MaybeRef<string>, columns: MaybeRef<ServerDataTableColumn[]>) => {
  const visibleColumns = ref<string[]>([]);
  const visibleColumnsPopoverRef = useTemplateRef<InstanceType<typeof Popover>>('visibleColumnsPopoverRef');
  const localTableName = toRef(tableName);
  const localColumns = toRef(columns);
  const savedHiddenColumns = useStorage<string[]>('HddSeverDataTableHiddenColumns_' + localTableName.value, []);
  const savedVisibleColumns = useStorage<string[]>('HddSeverDataTableVisibleColumns_' + localTableName.value, []);
  const confirm = useConfirm();
  const { t } = useI18n();
  onMounted(() => {
    initiateVisibleColumns();
  });

  function resetCachedVisibility() {
    savedHiddenColumns.value = [];
    savedVisibleColumns.value = [];
  }

  function confirmResetColumnsVisibility(event: PointerEvent) {
    confirm.require({
      group: 'popup',
      target: event.currentTarget as HTMLButtonElement,
      message: t('Are you sure you want to reset the columns visibility?'),
      header: t('Reset Columns Visibility'),
      icon: 'pi pi-exclamation-triangle',
      rejectProps: {
        severity: 'secondary',
      },
      accept: () => {
        resetCachedVisibility();
      },
    });
  }

  function initiateVisibleColumns() {
    visibleColumns.value = localColumns.value
      .filter(
        (col) =>
          savedVisibleColumns.value.indexOf(col.name || col.field) > -1 ||
          (col.visible !== false && savedHiddenColumns.value.indexOf(col.name || col.field) < 0),
      )
      .map((col) => col.name || col.field);
  }

  function saveVisibleColumnsState() {
    const hidden = localColumns.value
      .filter((col) => col.visibilityControl !== false)
      .map((col) => col.name || col.field)
      .filter((columnName) => visibleColumns.value.indexOf(columnName) < 0);
    const visible = localColumns.value
      .filter((col) => col.visibilityControl !== false && col.visible === false && visibleColumns.value.indexOf(col.name || col.field) > -1)
      .map((col) => col.name || col.field);

    savedHiddenColumns.value = hidden;
    savedVisibleColumns.value = visible;
  }

  function checkColumnIsVisible(column: ServerDataTableColumn) {
    return (
      column.type !== 'hidden' &&
      (column.visibilityControl !== false
        ? visibleColumns.value.indexOf(getColumnName(column)) > -1
        : isBoolean(column.visible)
          ? column.visible
          : true)
    );
  }

  const toggleableColumns = computed(() =>
    localColumns.value.filter((col) => (col.visible !== false || col.visibilityControl === true) && col.disabled !== true && col.type !== 'hidden'),
  );

  return {
    confirmResetColumnsVisibility,
    resetCachedVisibility,
    toggleableColumns,
    saveVisibleColumnsState,
    checkColumnIsVisible,
    visibleColumns,
    visibleColumnsPopoverRef,
  };
};
