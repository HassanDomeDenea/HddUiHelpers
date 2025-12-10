import type { EventBusKey } from '@vueuse/core'
import { useEventBus } from '@vueuse/core'
import type ServerFormDialog from 'HddUiHelpers/components/datatables/ServerFormDialog.vue'
import type { HddFormField, RecordItem } from 'HddUiHelpers/components/FormWrapper/types.ts'
import type { ElementClassType } from 'HddUiHelpers/components/inputs/types.ts'
import { replace, snakeCase, startCase } from 'lodash-es'
import moment from 'moment'
import type { ColumnFilterMatchModeOptions } from 'primevue'
import type { ComponentExposed } from 'vue-component-type-helpers'
import type { ComposerTranslation } from 'vue-i18n'
import type {
  ServerDataTableColumn,
  ServerDataTableColumnType,
  ServerDataTableProps,
  ServerDataTableToolbarFilter,
  ServerFormDialogProps,
} from './ServerDataTableTypes.ts'
import { isToolbarFilterWrapper } from './ServerDataTableTypes.ts'

export function getColumnName<TRow extends RecordItem>(
  column: ServerDataTableColumn<ServerDataTableColumnType, TRow>
): string {
  return column.name ?? column.field ?? ''
}

export function getColumnTitle(column: ServerDataTableColumn, t: ComposerTranslation): string {
  return (
    column.label ??
    t(startCase((column.relation ? column.relation + '.' : '') + getColumnName(column)))
  )
}

export function getColumnSlotName<TRow extends RecordItem>(
  column: ServerDataTableColumn<ServerDataTableColumnType, TRow>
): string {
  return replace(getColumnName(column), '.', '_')
}

export function getFieldSlotName(field: HddFormField): string {
  return replace(field.name || '', '.', '_')
}

export function getColumnBodyClass(
  rowData: RecordItem,
  column: ServerDataTableColumn
): ElementClassType | null {
  if (typeof column.bodyClass === 'function') {
    return column.bodyClass(rowData, column)
  }
  return column.bodyClass ?? null
}

type DialogRefGetter = { value?: () => ComponentExposed<typeof ServerFormDialog> }

export type DynamicServerFormDialogEventBus = {
  event: 'create' | 'edit' | 'delete'
  options?: ServerFormDialogProps
  row?: any
  specificId?: any
  dialogRefGetter?: DialogRefGetter
}
export const dynamicServerFormDialogKey: EventBusKey<DynamicServerFormDialogEventBus> = Symbol(
  ' DynamicServerFormDialogEventBus Symbol Key'
)
export const useDynamicServerFormDialog = function () {
  const bus = useEventBus(dynamicServerFormDialogKey)
  return {
    create: (options: ServerFormDialogProps, row?: any) => {
      const dialogRefGetter: DialogRefGetter = {}
      bus.emit({ event: 'create', options, row: row, dialogRefGetter })
      return dialogRefGetter
    },
    edit: (options: ServerFormDialogProps, row: any) => {
      const dialogRefGetter: DialogRefGetter = {}
      bus.emit({ event: 'edit', options, row: row, dialogRefGetter })
      return dialogRefGetter
    },
    delete: (options: ServerFormDialogProps, row: any) => {
      const dialogRefGetter: DialogRefGetter = {}
      bus.emit({ event: 'delete', options, row: row, dialogRefGetter })
      return dialogRefGetter
    },
  }
}

export function getColumnCanShowFilterMatchModes(column: ServerDataTableColumn) {
  return !['boolean', 'select', 'color'].includes(column.type || 'text')
}

export function getColumnCanShowAddButton(column: ServerDataTableColumn) {
  return !['boolean', 'select'].includes(column.type || 'text')
}

export function getColumnCanShowFilterOperator(column: ServerDataTableColumn) {
  return !['boolean', 'select'].includes(column.type || 'text')
}

export function getColumnCanShowFilterApplyButton(column: ServerDataTableColumn) {
  return !['boolean', 'select'].includes(column.type || 'text')
}

export function localeAlignToFrozenAlign(direction?: 'start' | 'end') {
  return direction === 'start' ? 'left' : direction === 'end' ? 'right' : null
}

export function formatDateOnly(date: string | Date): string {
  return !date ? '' : moment(date).isValid() ? moment(date).format('YYYY-MM-DD') : ''
}

export function formatDateYearOnly(date: string | Date): string {
  return moment(date).isValid() ? moment(date).format('YYYY') : ''
}

export function appendToUrl(urlLink: string, path: string | number, separator: string = '/') {
  const url = new URL('https://' + window.location.hostname + urlLink)
  url.pathname = url.pathname + separator + path
  return url.pathname + url.search
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
  ]

  const numericOptions = [
    { label: t('Equals'), value: 'equals', symbol: '=' },
    { label: t('Not equals'), value: 'notEquals', symbol: '!=' },
    { label: t('Less than'), value: 'lt', symbol: '<' },
    { label: t('Less than or equals'), value: 'lte', symbol: '<=' },
    { label: t('Greater than'), value: 'gt', symbol: '>' },
    { label: t('Greater than or equals'), value: 'gte', symbol: '>=' },
    { label: t('Between'), value: 'between' },
    { label: t('Not Between'), value: 'notBetween' },
  ]

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
    color: [],
    select: [],
    hidden: [],
  } as Record<ServerDataTableColumn['type'] & string, ColumnFilterMatchModeOptions[]>
}

export function getColumnCellFormatedText(
  value: unknown,
  column: ServerDataTableColumn,
  t: ComposerTranslation
): string | string[] {
  let fieldName = column.field || ''
  if (typeof column.formatter === 'string') {
    fieldName = column.formatter
  }
  if (typeof column.formatter === 'function') {
    return column.formatter(value, { id: '' }, fieldName)
  }
  if (column.type === 'select') {
    let result: unknown
    let options: { [k in string]: string } = {}
    if (column.selectOptionsKeyed) {
      options = column.selectOptionsKeyed
    } else if (column.selectOptions) {
      if (!Array.isArray(column.selectOptions)) {
        options = column.selectOptions.object
      } else {
        options = column.selectOptions.reduce((carry: { [k in string]: string }, currentValue) => {
          carry[currentValue[(column.selectValueProperty ?? 'id') as 'id'] as string] =
            currentValue[(column.selectLabelProperty ?? 'name') as 'name'] as string
          return carry
        }, {})
      }
    }
    // if (column.isMultiSelect ) {
    if (Array.isArray(value)) {
      result = value.map((i) => options?.[i] || i) as string[]
    } else {
      result = options?.[value as string] || (value as string)
    }
    if (!result && column.emptyValuePlaceholder) {
      result = `<span class="italic text-muted">${column.emptyValuePlaceholder}</span>`
    }
    return result as string[] | string
  }
  if (column.type === 'boolean') {
    let result = value === true ? t('Yes') : value === false ? t('No') : ''
    if (!result) {
      result = `<span class="italic text-muted">${column.emptyValuePlaceholder ?? 'null'}</span>`
    }
    return result
  }
  return value as string
}

export function isToolbarFilterEmpty(
  filter: ServerDataTableToolbarFilter | ServerDataTableToolbarFilter[],
  ignoreFixed = true
): boolean {
  if (Array.isArray(filter)) {
    return filter.every((f) => isToolbarFilterEmpty(f, ignoreFixed))
  }
  if (isToolbarFilterWrapper(filter)) {
    return (
      filter.fields.length < 1 ||
      filter.fields.every((field) => isToolbarFilterEmpty(field, ignoreFixed))
    )
  } else {
    return ignoreFixed && filter.isFixed ? true : filter.value === null
  }
}

export function serverDataTablePropFn<TRow extends RecordItem>(
  options: ServerDataTableProps<TRow>
): ServerDataTableProps<TRow> {
  return options as ServerDataTableProps<TRow>
}

export function snakeCasePreserveDots(input: string) {
  return input
    .split('.') // split at dots
    .map((part) => snakeCase(part)) // apply snakeCase to each part
    .join('.') // rejoin with dot
}

//Those classes are shortcuts in HDD unocss preset.
// @unocss-include
export const TWO_COLUMNS_FORM_CLASS_ON_MD = 'TWO_COLUMNS_FORM_CLASS_ON_MD' // 'md:grid md:grid-cols-2 md:gap-x-8 [&>*:nth-child(odd)]:md:border-ie [&>*:nth-child(odd)]:md:border-dotted [&>*:nth-child(odd)]:light:md:border-gray-300 [&>*:nth-child(odd)]:dark:md:border-gray-700 [&>*:nth-child(odd)]:md:pe-8'
