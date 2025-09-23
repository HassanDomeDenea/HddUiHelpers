import type { EventBusKey } from '@vueuse/core';
import { useEventBus } from '@vueuse/core';
import type { HddFormField, RecordItem } from 'HddUiHelpers/components/FormWrapper/types.ts';
import type { ElementClassType } from 'HddUiHelpers/components/inputs/types.ts';
import { replace, snakeCase, startCase } from 'lodash-es';
import moment from 'moment';
import type { ColumnFilterMatchModeOptions } from 'primevue';
import type { ComposerTranslation } from 'vue-i18n';
import type { ServerDataTableColumn, ServerDataTableProps, ServerDataTableToolbarFilter, ServerFormDialogProps } from './ServerDataTableTypes.ts';
import { isToolbarFilterWrapper } from './ServerDataTableTypes.ts';

export function getColumnName(column: ServerDataTableColumn): string {
  return column.name ?? column.field;
}

export function getColumnTitle(column: ServerDataTableColumn, t: ComposerTranslation): string {
  return column.label ?? t(startCase((column.relation ? column.relation + '.' : '') + getColumnName(column)));
}

export function getColumnSlotName(column: ServerDataTableColumn): string {
  return replace(getColumnName(column), '.', '_');
}

export function getFieldSlotName(field: HddFormField): string {
  return replace(field.name, '.', '_');
}

export function getColumnBodyClass(rowData: any, column: ServerDataTableColumn): ElementClassType | null {
  if (typeof column.bodyClass === 'function') {
    return column.bodyClass(rowData, column);
  }
  return column.bodyClass ?? null;
}

export type DynamicServerFormDialogEventBus = {
  event: 'set' | 'create' | 'edit' | 'delete';
  options?: ServerFormDialogProps;
  row?: any;
  specificId?: any;
};
export const dynamicServerFormDialogKey: EventBusKey<DynamicServerFormDialogEventBus> = Symbol('symbol-key');
export const useDynamicServerFormDialog = function () {
  const bus = useEventBus(dynamicServerFormDialogKey);
  return {
    set: (options: ServerFormDialogProps) => {
      bus.emit({ event: 'set', options });
    },
    create: (options: ServerFormDialogProps, row?: any) => {
      bus.emit({ event: 'create', options, row: row });
    },
    edit: (options: ServerFormDialogProps, row: any) => {
      bus.emit({ event: 'edit', options, row: row });
    },
    delete: (options: ServerFormDialogProps, row: any) => {
      bus.emit({ event: 'delete', options, row: row });
    },
  };
};

export function getColumnCanShowFilterMatchModes(column: ServerDataTableColumn) {
  if (column.type === 'select' || column.type === 'boolean') {
    return false;
  }

  return true;
}

export function getColumnCanShowAddButton(column: ServerDataTableColumn) {
  if (['boolean', 'select'].includes(column.type)) {
    return false;
  }

  return true;
}

export function getColumnCanShowFilterOperator(column: ServerDataTableColumn) {
  if (['boolean', 'select'].includes(column.type)) {
    return false;
  }

  return true;
}

export function getColumnCanShowFilterApplyButton(column: ServerDataTableColumn) {
  if (['boolean', 'select'].includes(column.type)) {
    return false;
  }

  return true;
}

export function localeAlignToFrozenAlign(direction: 'start' | 'end' | null) {
  return direction === 'start' ? 'left' : direction === 'end' ? 'right' : null;
}

export function formatDateOnly(date: string | Date): string {
  return !date ? null : moment(date).isValid() ? moment(date).format('YYYY-MM-DD') : null;
}

export function formatDateYearOnly(date: string | Date): string {
  return moment(date).isValid() ? moment(date).format('YYYY') : null;
}

export function appendToUrl(urlLink: string, path: string | number, separator: string = '/') {
  const url = new URL('https://' + window.location.hostname + urlLink);
  url.pathname = url.pathname + separator + path;
  return url.pathname + url.search;
}

export function getFilterMatchModesByTypeOptions(t: ComposerTranslation) {
  const textOptions = [
    { label: t('Starts with'), value: 'startsWith' },
    { label: t('Contains'), value: 'contains' },
    { label: t('Contains words'), value: 'containsAll' },
    { label: t('Contains any word'), value: 'containsAny' },
    { label: t('Not contains'), value: 'notContains' },
    { label: t('Ends with'), value: 'endsWith' },
    { label: t('Equals'), value: 'equals', symbol: '=' },
    { label: t('Not equals'), value: 'notEquals', symbol: '!=' },
  ];

  const numericOptions = [
    { label: t('Equals'), value: 'equals', symbol: '=' },
    { label: t('Not equals'), value: 'notEquals', symbol: '!=' },
    { label: t('Less than'), value: 'lt', symbol: '<' },
    { label: t('Less than or equals'), value: 'lte', symbol: '<=' },
    { label: t('Greater than'), value: 'gt', symbol: '>' },
    { label: t('Greater than or equals'), value: 'gte', symbol: '>=' },
    { label: t('Between'), value: 'between' },
    { label: t('Not Between'), value: 'notBetween' },
  ];

  return {
    text: textOptions,
    textarea: textOptions,
    numeric: numericOptions,
    price: numericOptions,
    date: [
      { label: t('Date is'), value: 'dateIs', symbol: '=' },
      { label: t('Date is not'), value: 'dateIsNot', symbol: '!=' },
      { label: t('Date before'), value: 'dateBefore', symbol: '<' },
      { label: t('Date is or before'), value: 'dateIsOrBefore', symbol: '<=' },
      { label: t('Date after'), value: 'dateAfter', symbol: '>' },
      { label: t('Date is or after'), value: 'dateIsOrAfter', symbol: '>=' },
      { label: t('Date between'), value: 'dateBetween', symbol: t('Between') },
      { label: t('Date not between'), value: 'dateNotBetween', symbol: t('Not Between') },
    ],
    boolean: [
      { label: t('True value'), value: 'isTrue' },
      { label: t('False value'), value: 'isFalse' },
      { label: t('Equals'), value: 'equals', symbol: '=' },
      { label: t('Not specified'), value: 'isNull' },
      { label: t('Specified'), value: 'isNotNull' },
    ],
    select: [],
    hidden: [],
  } as Record<ServerDataTableColumn['type'] & string, ColumnFilterMatchModeOptions[]>;
}

export function getColumnCellFormatedText(value: any, column: ServerDataTableColumn, t: ComposerTranslation): string {
  let fieldName = column.field;
  if (typeof column.formatter === 'string') {
    fieldName = column.formatter;
  }
  if (typeof column.formatter === 'function') {
    return column.formatter(value, {}, fieldName);
  }
  if (column.type === 'select') {
    let result: any;
    let options = {};
    if (column.selectOptionsKeyed) {
      options = column.selectOptionsKeyed;
    } else if (column.selectOptions) {
      if (!Array.isArray(column.selectOptions)) {
        options = column.selectOptions.object;
      } else {
        options = column.selectOptions.reduce((carry: { [k2 in string]: string }, currentValue) => {
          carry[currentValue[column.selectValueProperty ?? 'id']] = currentValue[column.selectLabelProperty ?? 'name'];
          return carry;
        }, {});
      }
    }
    // if (column.isMultiSelect ) {
    if (Array.isArray(value)) {
      result = value.map((i) => options?.[i] || i);
    } else {
      result = options?.[value] || value;
    }
    if (!result && column.emptyValuePlaceholder) {
      result = `<span class="italic text-muted">${column.emptyValuePlaceholder}</span>`;
    }
    return result;
  }
  if (column.type === 'boolean') {
    let result = value === true ? t('Yes') : value === false ? t('No') : '';
    if (!result) {
      result = `<span class="italic text-muted">${column.emptyValuePlaceholder ?? 'null'}</span>`;
    }
    return result;
  }
  return value;
}

export function isToolbarFilterEmpty(filter: ServerDataTableToolbarFilter | ServerDataTableToolbarFilter[], ignoreFixed = true) {
  if (Array.isArray(filter)) {
    return filter.every((f) => isToolbarFilterEmpty(f, ignoreFixed));
  }
  if (isToolbarFilterWrapper(filter)) {
    return filter.fields.length < 1 || filter.fields.every((field) => isToolbarFilterEmpty(field, ignoreFixed));
  } else {
    return ignoreFixed && filter.isFixed ? true : filter.value === null;
  }
}

export function serverDataTablePropFn<TRow extends RecordItem>(options: ServerDataTableProps<TRow>): ServerDataTableProps<TRow> {
  return options as ServerDataTableProps<TRow>;
}

export function snakeCasePreserveDots(input) {
  return input
    .split('.') // split at dots
    .map((part) => snakeCase(part)) // apply snakeCase to each part
    .join('.'); // rejoin with dot
}

//Those classes are shortcuts in HDD unocss preset.
// @unocss-include
export const TWO_COLUMNS_FORM_CLASS_ON_MD = 'TWO_COLUMNS_FORM_CLASS_ON_MD'; // 'md:grid md:grid-cols-2 md:gap-x-8 [&>*:nth-child(odd)]:md:border-ie [&>*:nth-child(odd)]:md:border-dotted [&>*:nth-child(odd)]:light:md:border-gray-300 [&>*:nth-child(odd)]:dark:md:border-gray-700 [&>*:nth-child(odd)]:md:pe-8'
