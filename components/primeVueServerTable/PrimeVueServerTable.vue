<script setup lang="ts" generic="T extends RecordItem = RecordItem">
import type { InputHTMLAttributes, Ref } from 'vue'
import { computed, onBeforeMount, onMounted, ref } from 'vue'
import ContextMenu from 'primevue/contextmenu'
import DataTable from 'primevue/datatable'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Column from 'primevue/column'
import vTooltip from 'primevue/tooltip'

import ucFirst from 'lodash/upperFirst'
import moment from 'moment'
import { useToast } from 'primevue/usetoast'
import isBoolean from 'lodash/isBoolean'
import debounce from 'lodash/debounce'
import lodashGet from 'lodash/get'
import type {
  DataTablePageEvent,
  DataTableRowClickEvent,
  DataTableRowCollapseEvent,
  DataTableRowContextMenuEvent,
  DataTableRowExpandEvent,
  DataTableRowReorderEvent,
  DataTableSelectAllChangeEvent,
  DataTableSortEvent,
  DataTableSortMeta,
} from 'primevue/datatable'
import { useConfirm } from 'primevue/useconfirm'
import DatePicker from 'primevue/datepicker'
import type { MenuItem } from 'primevue/menuitem'
import cloneDeep from 'lodash/cloneDeep'
import filter from 'lodash/filter'
import map from 'lodash/map'
import reduce from 'lodash/reduce'
import unset from 'lodash/unset'
import usePrimeVueServerUi from '../../utils/usePrimeVueServerUi.ts'

import type {
  ColumnType,
  FieldsOptionsList,
  FilterMatchModeType,
  FiltersList,
  GetRecordsResponseType,
  GroupedFilterConstraints,
  MultipleFilterType,
  PrimeVueServerTableFormField,
  RecordItem,
  RecordsServiceType,
  RequestDataPayloadType,
} from './types'
import {
  FilterMatchMode,
} from './types'
import MultiSelectColumnFilter from './MultiSelectColumnFilter.vue'
import SelectColumnFilter from './SelectColumnFilter.vue'
import type { DialogFormWrapperProps } from '../FormWrapper/DialogFormWrapper.vue'
import DialogFormWrapper from '../FormWrapper/DialogFormWrapper.vue'

export interface PrimeVueServerTableProps<R extends RecordItem = RecordItem> {
  url?: string
  routeName?: string
  includes?: string[]
  createRecordHeader?: string
  rowClass?: ((row: R) => string | string[] | { string: boolean })
  isActiveRow?: ((row: R) => boolean)
  editRecordHeader?: string
  expandOnRowClick?: boolean
  hasRefreshButton?: boolean
  hasContextMenu?: boolean
  frozenToolsColumn?: boolean
  hasGlobalFilter?: boolean
  keepFormOpenAfterCreate?: boolean
  refreshAfterFormSubmit?: boolean
  hasReorderColumn?: boolean
  hasExpanderColumn?: boolean
  dataKeyId?: string
  deleteMultiSameDeleteSingleRoute?: boolean
  fields?: PrimeVueServerTableFormField[]
  customService?: RecordsServiceType
  defaultMatchMode?: FilterMatchModeType
  defaultDateMatchMode?: FilterMatchModeType
  defaultNumericMatchMode?: FilterMatchModeType
  autoI18nColumnsHeader?: boolean
  sortMode?: 'single' | 'multiple'
  toolsColumn?: boolean
  deletable?: boolean
  editable?: boolean
  creatable?: boolean
  createButtonLabel?: string
  compact?: boolean
  openable?: boolean
  selectable?: boolean
  showGridLines?: boolean
  withPaginator?: boolean
  formDialogProps?: any
  showLoadingIndication?: boolean
  scrollable?: boolean
  rowHover?: boolean
  enableColumnFilters?: boolean
  enableColumnSorting?: boolean
  enableFilterMatchModes?: boolean
  enableFilterAddButton?: boolean
  enableFilterApplyButton?: boolean
  useFormForEdit?: boolean
  enableFilterClearButton?: boolean
  fixedFilters?: Partial<FiltersList>
  groupedFilters?: GroupedFilterConstraints
  extraContextMenuOptions?: MenuItem[]
  columns?: ColumnType<R>[]
  onRowClick?: ((row: R, index: number, original: Event) => void)
}

// Props
const props = withDefaults(
  defineProps<PrimeVueServerTableProps<T>>(),
  {
    dataKeyId: 'id',
    columns: () => ([]),
    defaultMatchMode: FilterMatchMode.CONTAINS as FilterMatchModeType,
    defaultDateMatchMode: FilterMatchMode.DATE_IS as FilterMatchModeType,
    defaultNumericMatchMode: FilterMatchMode.EQUALS as FilterMatchModeType,
    hasContextMenu: true,
    autoI18nColumnsHeader: true,
    sortMode: 'multiple',
    showLoadingIndication: true,
    refreshAfterFormSubmit: true,
    toolsColumn: true,
    enableColumnSorting: true,
    hasRefreshButton: true,
    hasGlobalFilter: true,
    showGridLines: true,
    withPaginator: true,
    scrollable: true,
    enableColumnFilters: true,
    enableFilterMatchModes: true,
    enableFilterAddButton: true,
    enableFilterApplyButton: true,
    enableFilterClearButton: true,
    rowHover: true,
  },
)

const emits = defineEmits<{
  (e: 'rowClick', row: T, index: number, original: Event)
  (e: 'rowOpen', row: T)
  (e: 'rowEdit', row: T)
  (e: 'rowCreated', row: T | T[])
  (e: 'rowUpdated', row: T | T[])
  (e: 'rowDeleted', row: string | number | (string | number)[])
  (e: 'refreshed', res: GetRecordsResponseType)
  (e: 'rowExpand', row: T)
  (e: 'rowCollapse', row: T)
  (e: 'rowReorder', event: DataTableRowReorderEvent)
}>()

const { axios: axiosInstance, routeNameResolver, t, dataTableRecordsService } = usePrimeVueServerUi()

function isMultipleFilterType(value: any): value is MultipleFilterType {
  return (value as MultipleFilterType)?.operator !== undefined
}

const rowsPerPage = defineModel('rowsPerPage', { default: 10, required: false })
const sorts = defineModel<(DataTableSortMeta & { source?: ColumnType<T>['source'] })[]>('sorts', {
  default: () => [],
  required: false,
})
const isCollapsed = defineModel<boolean>('isCollapsed', { default: false })
// Definitions
const recordsService = {
  async getRecords(payload: RequestDataPayloadType) {
    if (props.customService?.getRecords)
      return await props.customService.getRecords(payload, { url: props.url, routeName: props.routeName })
    else if (dataTableRecordsService?.getRecords)
      return await dataTableRecordsService.getRecords(payload, { url: props.url, routeName: props.routeName })
    let path: string
    if (props.url)
      path = props.url
    else if (props.routeName)
      path = routeNameResolver(props.routeName)
    else
      return Promise.reject(new Error('Invalid Url or Route Name'))

    return (await axiosInstance.get(path, { params: payload })).data
  },
  async deleteRecord(id: number) {
    if (props.customService?.deleteRecord)
      return await props.customService.deleteRecord(id, { url: props.url, routeName: props.routeName })
    else if (dataTableRecordsService?.deleteRecord)
      return await dataTableRecordsService.deleteRecord(id, { url: props.url, routeName: props.routeName })

    let path: string
    if (props.url)
      path = `${props.url}/${id}`
    else if (props.routeName)
      path = routeNameResolver(props.routeName, id)
    else
      return Promise.reject(new Error('Invalid Url or Route Name'))

    return (await axiosInstance.delete(path)).data
  },
  async deleteRecordsMulti(ids: number[]) {
    if (props.customService?.deleteRecordsMulti)
      return await props.customService.deleteRecordsMulti(ids, { url: props.url, routeName: props.routeName })
    else if (dataTableRecordsService?.deleteRecordsMulti)
      return await dataTableRecordsService.deleteRecordsMulti(ids, { url: props.url, routeName: props.routeName })

    let path: string
    const id = ids[0] || 0
    if (props.url) {
      if (props.deleteMultiSameDeleteSingleRoute) {
        path = `${props.url}/${id}`
      }
      else {
        path = props.url
      }
    }
    else if (props.routeName) {
      path = routeNameResolver(props.routeName, id)
    }
    else {
      return Promise.reject(new Error('Invalid Url or Route Name'))
    }

    return (await axiosInstance.delete(path, { params: { ids } })).data
  },
} as RecordsServiceType

const filters = ref<FiltersList>({ global: { value: null, matchMode: 'contains' } })
const toast = useToast()
const confirm = useConfirm()
const dt = ref()
const loading = ref(false)
const totalRecords = ref(0)
const totalWithoutFilters = ref(0)
const records = defineModel<T[]>('records', { default: () => [] })
const selectedRecords = ref<T[]>([]) as Ref<T[]>
const expandedRecords = ref<{ [n in string]: boolean }>({})
const selectAll = ref(false)
const first = ref(0)
const contextMenuRef = ref()
const contextMenuSelectedProduct = ref<T>()
// Computed

const cssStart = computed(() => {
  return t('dir') === 'rtl' ? 'right' : 'left'
})

const hasFilters = computed(() => {
  for (const key in filters.value) {
    if (props.fixedFilters?.[key]) {
      continue
    }
    const filter = filters.value[key]
    if (isMultipleFilterType(filter)) {
      const index = filter.constraints?.findIndex(x => x.value)
      if (index > -1)
        return true
    }
    else {
      if (filter?.value)
        return true
    }
  }
  return false
})

const rowsPerPageOptions = computed(() => {
  const options = [5, 10, 25, 50, 100, 500]
  if (!options.includes(rowsPerPage.value) && rowsPerPage.value !== -1)
    options.push(rowsPerPage.value)

  return [...options.map((i: number) => ({ value: i, label: i })), { value: -1, label: t('All') }]
})

const globalFilterFields = computed(() => {
  return map(
    filter<ColumnType>(props.columns, i => i.global !== false && (i.filterable !== false || i.global === true)),
    e => e.filterField,
  )
})

const fieldsOptions = computed<FieldsOptionsList[]>(() => {
  return reduce(props.columns, (carry, column) => {
    if (!column.name)
      return carry
    const item = {
      name: column.name,
      filterField: column.filterField ?? column.name,
      sortField: column.sortField ?? column.name,
      source: column.source || 'main',
    } as FieldsOptionsList
    carry.push(item)
    return carry
  }, [])
})

const requestDataPayload = computed<RequestDataPayloadType>(() => {
  return {
    first: first.value,
    perPage: rowsPerPage.value,
    sorts: sorts.value,
    filters: filters.value as FiltersList,
    fixedFilters: props.fixedFilters,
    globalFilters: globalFilterFields.value,
    groupedFilters: props.groupedFilters,
    fields: fieldsOptions.value as FieldsOptionsList[],
    includes: props.includes ?? [],
  }
})

const firstInPage = computed(() => {
  if (rowsPerPage.value === -1)
    return Math.min(1, totalRecords.value)
  return Math.min(first.value + 1, totalRecords.value)
})

const lastInPage = computed(() => {
  if (rowsPerPage.value === -1)
    return totalRecords.value
  return Math.min(first.value + rowsPerPage.value, totalRecords.value)
})

const contextMenuModel = computed<MenuItem[]>(() => {
  const list: MenuItem[] = []
  if (props.openable) {
    list.push({
      label: t('Open'),
      icon: 'i-mdi-open-in-app',
      command: () => contextMenuSelectedProduct.value ? emits('rowOpen', contextMenuSelectedProduct.value) : undefined,
    })
  }
  if (props.editable) {
    list.push({
      label: t('Edit'),
      icon: 'i-mdi-edit',
      command: () => contextMenuSelectedProduct.value ? editRecord(contextMenuSelectedProduct.value) : undefined,
    })
  }

  if (props.deletable) {
    list.push({
      label: t('Delete'),
      icon: 'i-mdi-trash',
      command: () => contextMenuSelectedProduct.value ? deleteRecords(contextMenuSelectedProduct.value) : undefined,
    })
  }
  if (props.extraContextMenuOptions?.length > 0) {
    list.push(...(cloneDeep(props.extraContextMenuOptions)).map((e) => {
      if (e.command) {
        e.command2 = e.command
        e.command = () => e.command2(contextMenuSelectedProduct.value)
      }
      if (typeof e.labelFn === 'function') {
        e.label = e.labelFn(contextMenuSelectedProduct.value)
      }
      return e
    }))
  }

  return list
})

const matchModesForColumnType = computed(() => {
  return {
    text: [
      { label: t('startsWith'), value: 'startsWith' },
      { label: t('contains'), value: 'contains' },
      { label: t('containsAll'), value: 'containsAll' },
      { label: t('notContains'), value: 'notContains' },
      { label: t('endsWith'), value: 'endsWith' },
      { label: t('equals'), value: 'equals' },
      { label: t('notEquals'), value: 'notEquals' },
    ],
    numeric: [
      { label: t('equals'), value: 'equals' },
      { label: t('notEquals'), value: 'notEquals' },
      { label: t('lt'), value: 'lt' },
      { label: t('lte'), value: 'lte' },
      { label: t('gt'), value: 'gt' },
      { label: t('gte'), value: 'gte' },
    ],
    date: [
      { label: t('dateIs'), value: 'dateIs' },
      { label: t('dateIsNot'), value: 'dateIsNot' },
      { label: t('dateBefore'), value: 'dateBefore' },
      { label: t('dateAfter'), value: 'dateAfter' },
    ],
  }
})

// Methods

function createFilters(): FiltersList {
  return reduce(props.columns, (carry: FiltersList, column) => {
    let matchMode
    if (column.filterMatchMode) {
      matchMode = column.filterMatchMode
    }
    else {
      switch (column.type) {
        case 'date':
          matchMode = props.defaultDateMatchMode
          break
        case 'numeric':
          matchMode = props.defaultNumericMatchMode
          break
        default:
          matchMode = props.defaultMatchMode
      }
    }
    // Always add operator due to defect in PrimeVue
    carry[column.filterField ?? column.name] = {
      operator: 'and',
      constraints: [{ value: null, matchMode }],
    }
    /* if (column.multipleFilters) {
      carry[column.name] = {
        operator: 'and',
        constraints: [{ value: null, matchMode }],
      }
    }
    else {
      carry[column.name] = {
        value: null,
        matchMode,
      }
    } */
    return carry
  }, {
    global: {
      value: '',
      matchMode: 'contains',
    },
  })
}

async function resetFilters() {
  filters.value = createFilters()
  await getData()
}

const delayedGetData = debounce(() => {
  getData()
}, 500)

async function getData() {
  loading.value = true
  if (props.url || props.routeName) {
    await recordsService.getRecords(requestDataPayload.value).then((res) => {
      if (res.success) {
        records.value = res.data.data
        totalRecords.value = res.data.total
        totalWithoutFilters.value = res.data.total_without_filters
        emits('refreshed', res)
      }
      else {
        throw new Error(`Unable to get records from ${props.url}`)
      }
    })
      .catch((err) => {
        console.error(err)
        const msg = err.response?.data?.message || t('Error Occurred')
        toast.add({
          severity: 'error',
          summary: msg,
          life: 3000,
          group: 'notifications',
        })
      })
      .finally(() => {
        loading.value = false
      })
  }
  else {
    loading.value = false
    // TODO: Local Table
  }
}

async function onPage(event: DataTablePageEvent) {
  first.value = event.first
  await getData()
  selectAll.value = selectedRecords.value.length === totalRecords.value && selectedRecords.value.length !== 0
}

async function onSort(event: DataTableSortEvent) {
  if (props.sortMode === 'multiple' && event.multiSortMeta) {
    sorts.value = event.multiSortMeta
  }
  else {
    sorts.value = [
      { field: typeof event.sortField === 'string' ? event.sortField : '', order: event.sortOrder },
    ]
  }
  await getData()
  selectAll.value = selectedRecords.value.length === totalRecords.value && selectedRecords.value.length !== 0
}

async function onFilter() {
  await getData()
}

function onSelectAllChange(event: DataTableSelectAllChangeEvent) {
  if (records.value.length === 0) {
    selectAll.value = false
    selectedRecords.value = []
  }
  selectAll.value = event.checked

  if (selectAll.value)
    selectedRecords.value = records.value
  else
    selectedRecords.value = []
}

function onRowContextMenu(event: DataTableRowContextMenuEvent) {
  contextMenuRef.value.show(event.originalEvent)
}

function onRowSelect() {
  selectAll.value = selectedRecords.value.length === totalRecords.value && selectedRecords.value.length !== 0
}

function onRowUnselect() {
  selectAll.value = false
}

function editRecord(item: T) {
  emits('rowEdit', item)
  if (props.useFormForEdit || props.fields?.length > 0) {
    showEditDialog(item)
  }
}

function editRecords(items: T[]) {
  if (items.length === 1) {
    editRecord(items[0])
  }
  else {
    // TODO: Implement Multi Edit
  }
}

function deleteRecords(item: T | T[]) {
  if (!item)
    return
  let cnt = 1
  if (Array.isArray(item)) {
    cnt = item.length
  }
  confirm.require({
    message: t('Are you sure to delete n records?', { n: cnt }, cnt),
    header: t('Confirmation'),
    icon: 'pi pi-info-circle',
    rejectLabel: t('Cancel'),
    acceptLabel: t('Delete'),
    rejectClass: 'p-button-secondary p-button-outlined',
    acceptClass: 'p-button-danger',
    accept: async () => {
      const ids = Array.isArray(item) ? item.map(i => i.id) : [item.id]
      try {
        if (props.url) {
          if (Array.isArray(item))
            await recordsService.deleteRecordsMulti(ids)
          else
            await recordsService.deleteRecord(item.id)
        }
        else {
          // TODO: Local Table
        }
        toast.add({
          severity: 'success',
          summary: t('Deleted!'),
          detail: t('n Record Deleted Successfully', { n: cnt }, cnt),
          life: 3000,
        })
        emits('rowDeleted', Array.isArray(item) ? ids : item.id)
        selectedRecords.value = selectedRecords.value.filter(i => !ids.includes(i.id))
        refresh()
      }
      catch (err: any) {
        const msg = err?.response?.data?.message || t('Error Occurred')

        toast.add({
          severity: 'error',
          summary: msg,
          life: 3000,
          group: 'notifications',
        })
      }
    },
  })
}

async function onRowsPerPageChanged() {
  first.value = 0
  await getData()
}

function refresh() {
  getData()
}

// Components Methods
function calendarInputProps(filterCallback: () => void): InputHTMLAttributes {
  return { onKeydown: (e: KeyboardEvent) => e.key === 'Enter' ? filterCallback() : null }
}

const hasRowClickEventListener = computed(
  () => {
    return !!props.onRowClick
  },
)

// Hooks
onBeforeMount(() => {
  filters.value = createFilters()
})
onMounted(() => {
  getData()
})

const dialogFormWrapperRef = ref<InstanceType<typeof DialogFormWrapper>>()
const dialogFormWrapperModelValue = ref({})
const dialogFormWrapperOptions = computed(() => {
  return {
    url: props.url,
    fields: props.fields ?? [],
    keepFormOpenAfterCreate: props.keepFormOpenAfterCreate,
    onSubmitted: onFormSubmitted,
    createRecordHeader: props.createRecordHeader,
    editRecordHeader: props.editRecordHeader,
    ...props.formDialogProps ?? {},
  } as DialogFormWrapperProps
})

function showCreateDialog() {
  dialogFormWrapperRef.value?.create()
}

function showEditDialog(item: T) {
  dialogFormWrapperRef.value?.edit(item)
}

function onFormSubmitted(type: 'create' | 'update', item: T) {
  if (type === 'create') {
    emits('rowCreated', item)
  }
  else {
    emits('rowUpdated', item)
  }
  if (props.refreshAfterFormSubmit) {
    refresh()
  }
}

function onRowClick(evt: DataTableRowClickEvent) {
  if (!window.getSelection()?.isCollapsed) {
    return
  }
  const path = evt.originalEvent.composedPath()
  const toggleButton = path.find(e => e.classList?.contains('p-datatable-row-toggle-button'))
  const editableColumn = path.find(e => e.classList?.contains('p-editable-column'))
  const checkboxColumn = path.find(e => e.classList?.contains('p-selection-column'))
  if (toggleButton
    || editableColumn
    || checkboxColumn) {
    return
  }
  emits('rowClick', evt.data, evt.index, evt.originalEvent)
  if (props.expandOnRowClick) {
    toggleRowExpansion(evt.data)
  }
}

const listToObjectFormatted = computed(() => {
  const obj = {}
  props.columns.forEach((column: ColumnType<T>) => {
    if (column.type === 'select') {
      if (column.selectOptionsKeyed) {
        obj[column.name] = column.selectOptionsKeyed
      }
      else if (column.selectOptions) {
        if (!Array.isArray(column.selectOptions)) {
          obj[column.name] = column.selectOptions.object
        }
        else {
          obj[column.name] = column.selectOptions.reduce((carry: any, currentValue) => {
            carry[currentValue[column.selectValueProperty ?? 'id']] = currentValue[column.selectLabelProperty ?? 'name']
            return carry
          }, {})
        }
      }
    }
  })
  return obj
})

function onSelectAllRecordsButtonClick() {
  if (!selectAll.value) {
    selectedRecords.value = records.value
    selectAll.value = selectedRecords.value.length !== 0
  }
  else {
    selectedRecords.value = []
    selectAll.value = false
  }
}

function isExpandedRow(row: T) {
  if (expandedRecords.value) {
    return expandedRecords.value[row[props.dataKeyId]]
  }
  else {
    return false
  }
}

function expandRow(row: T) {
  expandedRecords.value[row[props.dataKeyId] as string] = true
}
function collapseRow(row: T) {
  unset(expandedRecords.value, row[props.dataKeyId])
}
function toggleRowExpansion(row: T) {
  if (isExpandedRow(row)) {
    collapseRow(row)
  }
  else {
    expandRow(row)
  }
}

function onRowExpand(event: DataTableRowExpandEvent) {
  // toast.add({ severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000 })
  emits('rowExpand', event.data)
}
function onRowCollapse(event: DataTableRowCollapseEvent) {
  // toast.add({ severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000 })
  emits('rowCollapse', event.data)
}
function onRowReorder(event: DataTableRowReorderEvent) {
  // toast.add({ severity: 'success', summary: 'Product Collapsed', detail: event.value, life: 3000 })
  emits('rowReorder', event)
}

function formatColumn(column: ColumnType<T>, row: T): string {
  let fieldName = column.name
  if (typeof column.formatter === 'string') {
    fieldName = column.formatter
  }

  /* <template v-if="column.type === 'select' && !column.formatter">
      {{ listToObjectFormatted[column.name]?.[lodashGet(data, column.name)] || lodashGet(data, column.name)
    }}
    </template>
    <template v-else-if="column.type === 'boolean' && !column.formatter">
      {{ lodashGet(data, column.name) === true ? t("Yes") : (lodashGet(data, column.name) === false ? t("No") : "")
    }}
    </template> */
  if (typeof column.formatter === 'function') {
    return column.formatter(lodashGet(row, fieldName), row)
  }
  else {
    if (column.type === 'select') {
      let result = listToObjectFormatted.value[fieldName]?.[lodashGet(row, fieldName)] || lodashGet(row, fieldName)
      if (!result && column.emptyValuePlaceholder) {
        if (column.html) {
          result = `<span class="italic text-muted">${column.emptyValuePlaceholder}</span>`
        }
        else {
          result = column.emptyValuePlaceholder
        }
      }
      return result
    }
    if (column.type === 'boolean') {
      const value = lodashGet(row, fieldName)
      return value === true ? t('Yes') : (value === false ? t('No') : '')
    }
    return lodashGet(row, column.name)
  }
}

const formModel = computed(() => {
  return dialogFormWrapperRef.value?.form
})

defineExpose({ refresh, showCreateDialog, showEditDialog, formModel })
</script>

<template>
  <div class="p-server-datatable-container max-w-full px-4">
    <DialogFormWrapper ref="dialogFormWrapperRef" v-bind="dialogFormWrapperOptions" v-model="dialogFormWrapperModelValue" />
    <ContextMenu ref="contextMenuRef" :model="contextMenuModel" @hide="contextMenuSelectedProduct = undefined" />
    <DataTable
      ref="dt"
      v-model:filters="filters"
      v-model:multi-sort-meta="sorts"
      v-model:selection="selectedRecords"
      v-model:expanded-rows="expandedRecords"
      v-model:first="first"
      v-model:contextMenuSelection="contextMenuSelectedProduct"
      context-menu
      :value="records"
      lazy
      :paginator="withPaginator"
      scrollable scroll-height="flex"
      paginator-position="top"
      :rows="rowsPerPage === -1 ? totalRecords : rowsPerPage"
      :data-key="dataKeyId"
      :total-records="totalRecords"
      :loading="showLoadingIndication && loading"
      filter-display="menu"
      :global-filter-fields="globalFilterFields"
      :select-all="selectAll"
      :sort-mode="sortMode"
      :show-gridlines="showGridLines"
      :row-class="(row) => ([isActiveRow && isActiveRow(row) ? 'active-row' : '', rowClass ? rowClass(row) : '', { 'cursor-pointer': hasRowClickEventListener }])"
      :row-hover="rowHover"
      :class="{ 'compact-table': compact }"
      @row-expand="onRowExpand"
      @row-collapse="onRowCollapse"
      @row-reorder="onRowReorder"
      @row-contextmenu="hasContextMenu ? onRowContextMenu : undefined"
      @row-click="onRowClick"
      @page="onPage"
      @sort="onSort" @filter="onFilter"
      @select-all-change="onSelectAllChange"
      @row-select="onRowSelect"
      @row-unselect="onRowUnselect"
    >
      <template #header>
        <div class="flex items-end w-full">
          <div v-if="hasGlobalFilter" class="justify-content-between flex gap-1 flex-1">
            <IconField>
              <InputIcon class="pi pi-search" />
              <InputText
                v-model="filters.global.value"
                class="ltr:pl-8 rtl:pr-8" size="small" :placeholder="t('Search For')"
                @keydown.esc="resetFilters()"
                @input="delayedGetData"
              />
              <InputIcon v-if="loading" class="pi pi-spin pi-spinner" />
            </IconField>
            <Button
              v-if="hasFilters && !isCollapsed" size="small" type="button" icon="pi pi-filter-slash" :label="t('Clear')"
              outlined
              :icon-pos="cssStart"
              @click="resetFilters()"
            />
          </div>
          <div>
            <slot name="title" :records="records" />
          </div>
          <div class="flex justify-end gap-1 flex-1">
            <slot name="buttonsStart" />
            <Button
              v-if="creatable"
              size="small" severity="primary"
              icon="i-mdi-plus"
              :label="createButtonLabel || t('New')"
              @click="showCreateDialog()"
            />
            <Button
              v-if="selectable"
              class="border-1 light:border-gray-300 light:text-black dark:border-gray-600 dark:text-white whitespace-pre"
              size="small" severity="secondary"
              :icon="selectAll ? 'i-mdi:square-rounded-outline' : 'i-fluent:select-all-on-24-regular'"
              :label="selectAll ? t('Deselect') : t('Select All')"
              @click="onSelectAllRecordsButtonClick"
            />
            <Button
              v-if="selectable && deletable"
              size="small" severity="danger" :disabled="selectedRecords.length < 1"
              icon="i-mdi-trash"
              :label="t('Delete')"
              @click="deleteRecords(selectedRecords)"
            />
            <Button
              v-if="selectable && editable"
              v-tooltip="{ class: 'warn', value: selectedRecords.length > 1 ? t('You must select one item only') : null }" size="small"
              :disabled="selectedRecords.length !== 1"
              severity="success"
              icon="i-mdi-edit"
              :label="t('Edit')"
              @click="editRecords(selectedRecords)"
            />
            <Button
              v-if="hasRefreshButton" :disabled="loading" size="small" severity="info" :loading="loading"
              icon="pi pi-refresh" @click="refresh()"
            />
            <slot name="buttonsEnd" />
          </div>
        </div>
      </template>
      <template #paginatorstart>
        <div class="w-full flex justify-end gap-1 text-sm">
          <span>
            <template v-if="hasFilters">
              {{
                t("Showing start To end From filtered (Filtered From total)", {
                  start: firstInPage,
                  end: lastInPage,
                  total: totalWithoutFilters,
                  filtered: totalRecords,
                })
              }}
            </template>
            <template v-else>
              {{
                t("Showing start To end From total", {
                  start: firstInPage,
                  end: lastInPage,
                  total: totalWithoutFilters,
                })
              }}
            </template>
          </span>
          <span
            v-if="selectedRecords.length"
          > {{
            t("(n Records selected)", { n: selectedRecords.length }, selectedRecords.length)
          }}</span>
        </div>
      </template>
      <template #paginatorend>
        <div class="flex items-center gap-1 text-sm">
          <span>{{ t("Show") }} </span>
          <Select
            v-model="rowsPerPage"
            size="small"
            :options="rowsPerPageOptions"
            scroll-height="360px" option-label="label"
            option-value="value" @change="onRowsPerPageChanged()"
          />
          <span v-if="rowsPerPage !== -1"> {{ t("Entries") }}</span>
        </div>
      </template>
      <template #empty>
        <div class="text-secondary-1 text-center text-sm italic">
          {{ t("No Data") }}
        </div>
      </template>
      <template #expansion="{ data }">
        <slot name="expander" :row="data" />
      </template>
      <Column v-if="hasReorderColumn" row-reorder style="width: 33px;flex-grow:1;flex-basis: 33px" :reorderable-column="false" />
      <Column v-if="hasExpanderColumn" expander style="width: 3rem" />
      <Column
        v-if="selectable"
        selection-mode="multiple" header-style="width: 3rem"
      />
      <template v-for="column in columns" :key="column.name">
        <Column
          v-if="column.type !== 'hidden'"
          :hidden="isBoolean(column.visible) ? !column.visible : false"
          :show-filter-operator="column.multipleFilters || false"
          :field="column.name"
          :header="
            column.header
              || (autoI18nColumnsHeader
                ? t(ucFirst(column.name))
                : column.name)
          "
          :show-filter-match-modes="isBoolean(column.showFilterMatchModes) ? column.showFilterMatchModes : (column.type === 'select' ? false : enableFilterMatchModes)"
          :show-add-button="isBoolean(column.showFilterAddButton) ? column.showFilterAddButton : enableFilterAddButton"
          :show-apply-button="isBoolean(column.showFilterApplyButton) ? column.showFilterApplyButton : (column.type === 'select' ? false : enableFilterApplyButton)"
          :show-clear-button="isBoolean(column.showFilterClearButton) ? column.showFilterClearButton : (column.type === 'select' ? false : enableFilterClearButton)"
          :max-constraints="null"
          :filter-field="column.filterField || column.name"
          :sort-field="column.sortField || column.name"
          :filter-match-mode="column.filterMatchMode || 'startsWith'"
          :filter-match-mode-options="matchModesForColumnType[column.type || 'text']"
          :sortable="isBoolean(column.sortable) ? column.sortable : enableColumnSorting"
          :body-class="column.bodyClass"
          :data-type="column.type || 'text'"
        >
          <template
            v-if="isBoolean(column.filterable) ? column.filterable : enableColumnFilters"
            #filter="{ filterModel, filterCallback }"
          >
            <slot :name="`${column.name.replace('.', '_')}ColumnFilter`" :slot-props="{ filterModel, filterCallback }">
              <DatePicker
                v-if="column.type === 'date'"
                :input-props="calendarInputProps(filterCallback)"
                :model-value="filterModel.value ? moment(filterModel.value).toDate() : null"
                date-format="yy-mm-dd"
                placeholder="yyyy/mm/dddd" mask="9999-99-99"
                @update:model-value="filterModel.value = $event ? moment($event as Date).format('YYYY-MM-DD') : null"
              />
              <template v-else-if="column.type === 'select'">
                <template v-if="!isBoolean(column.showFilterAddButton) || column.isMultiSelect === true">
                  <MultiSelectColumnFilter

                    :label="column.selectFilterHeader !== undefined ? column.selectFilterHeader : column.header"
                    :options="Array.isArray(column.selectOptions) ? column.selectOptions : (column.selectOptions?.list ?? [])"
                    :slot-props="{ filterModel, filterCallback }"
                    :option-value-property="column.selectValueProperty"
                    :option-label-property="column.selectLabelProperty"
                  />
                  <div v-if="filterModel.value" class="flex justify-end">
                    <Button
                      size="small" type="button" icon="pi pi-filter-slash" outlined :label="t('Clear')"
                      @click="filterModel.value = null; filterCallback()"
                    />
                  </div>
                </template>

                <SelectColumnFilter
                  v-else
                  :label="column.selectFilterHeader !== undefined ? column.selectFilterHeader : column.header"
                  :options="Array.isArray(column.selectOptions) ? column.selectOptions : (column.selectOptions?.list ?? [])"
                  :slot-props="{ filterModel, filterCallback }"
                  :option-value-property="column.selectValueProperty"
                  :option-label-property="column.selectLabelProperty"
                />
              </template>
              <InputText
                v-if="!column.type || column.type === 'text'"
                v-model="filterModel.value"
                v-tooltip.top.focus="t('Hit enter key to filter')"
                type="text"
                class="p-column-filter"
                :placeholder="t('Search for')"
                @keydown.enter="filterCallback()"
              />
              <template v-if="column.type === 'numeric'">
                <template
                  v-if="['between', 'notBetween'].indexOf(filterModel.matchMode) > -1"
                >
                  <div v-for="i in [0, 1]" :key="i">
                    <span>{{ i === 0 ? t("From") : t("To") }} </span>
                    <InputText
                      :value="(filterModel.value || [])[i]"
                      type="number"
                      @input="filterModel.value = [i === 0 ? +$event.target.value : (filterModel.value || [])[0], i === 1 ? +$event.target.value : (filterModel.value || [])[1]]"
                      @keydown.enter="filterCallback()"
                    />
                  </div>
                </template>
                <InputText
                  v-else
                  v-model="filterModel.value"
                  v-tooltip.top.focus="t('Hit enter key to filter')"
                  type="number"
                  class="p-column-filter"
                  :placeholder="t('Search for')"
                  @keydown.enter="filterCallback()"
                />
              </template>

              <template v-if="column.type === 'boolean'">
                <Checkbox
                  v-model="filterModel.value" class="mr-1" :false-value="0" :true-value="1" binary
                  @change="filterCallback()"
                />
                <span>{{ column.filterCheckboxLabel || column.header }}</span>
              </template>
            </slot>
          </template>
          <template #body="{ data }">
            <slot :name="`${column.name.replace('.', '_')}ColumnBody`" :row="data as T" :data="lodashGet(data, column.name)">
              <div :class="column.bodyClassFunction ? column.bodyClassFunction(lodashGet(data, column.name)) : ''">
                <template v-if="column.html">
                  <div v-html="formatColumn(column, data)" />
                </template>
                <template v-else>
                  {{ formatColumn(column, data) }}
                </template>
              </div>
            </slot>
          </template>
        </Column>
      </template>
      <Column v-if="toolsColumn" body-class="p-tools-cell" :align-frozen="t('dir')" :frozen="frozenToolsColumn">
        <template #header>
          <i class="i-mdi-tools mx-auto" />
        </template>
        <template #body="row">
          <div class="flex flex-wrap items-center gap-1">
            <Button
              v-if="openable" v-tooltip="t('Open')" severity="info" size="small" class="rounded-md p-2"
              @click="emits('rowOpen', row.data)"
            >
              <i class="i-mdi-open-in-app" />
            </Button>
            <Button
              v-if="editable" v-tooltip="t('Edit')" severity="success" size="small" class="rounded-md p-2"
              @click="editRecord(row.data)"
            >
              <i class="i-mdi-edit" />
            </Button>
            <Button
              v-if="deletable"
              v-tooltip="t('Remove')" severity="danger" size="small" class="rounded-md p-2"
              @click="deleteRecords(row.data)"
            >
              <i class="i-mdi-trash" />
            </Button>
            <slot name="toolsColumnExtraButton" :row="row.data" />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style lang="scss">
.p-server-datatable-container {
  .active-row {
    @apply dark:(bg-sky-900/25 hover:bg-sky-800/25) light:(bg-sky-400/25 hover:bg-sky-500/25);
  }

  .p-datatable-header-cell {
    @apply light:( border-b-gray-400/75) dark:( border-b-gray-500/75);
    &:not(.p-datatable-column-sorted) {
      @apply light:(bg-stone-200/50 ) dark:(bg-stone-900/50 )
    }
  }
    .p-datatable-hoverable .p-datatable-tbody > tr.p-datatable-row-expansion {
      @apply dark:bg-dark-100/10 light:bg-stone-200/20;
      &:hover{
        @apply dark:bg-dark-100/10 light:bg-stone-200/20;
        color: unset;
      }
    }
  .compact-table {
    .p-datatable-header-cell {
      @apply text-sm;
      padding: 2px 5px;
      white-space: nowrap;

      &:not(.p-datatable-column-sorted) {
        @apply '!light:(bg-sky-100 hover:bg-sky-200) !dark:(bg-slate-900 hover:bg-slate-800)';
      }

      .p-checkbox.p-component {
        @apply mx-auto;
      }

      .p-badge.p-component.p-badge-circle.p-badge-sm.p-datatable-sort-badge {
        @apply h-4 min-w-4;
      }

      .p-icon.p-datatable-sort-icon {
        height: 0.9rem;
      }

      .p-datatable-filter.p-datatable-popover-filter {
        button {
          width: 1.5rem;
          height: 1.5rem;
          padding: 0 4px;
        }

        svg {
          //height: 0.85rem;
        }
      }
    }

    .p-datatable-tbody {
      td {
        @apply text-4;
        padding: 2px 5px;

        &.p-tools-cell {
          .p-button.p-button-sm {
            @apply p-1 text-sm;
          }
        }
      }
    }
  }
}
</style>
