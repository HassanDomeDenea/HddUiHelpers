<script lang="ts" setup generic="T extends RecordItem = RecordItem">
import type { RecordItem, ServerDataTableColumnPayload } from 'HddUiHelpers/components/FormWrapper/types.ts';

import PrintPaperForServerDataTable from 'HddUiHelpers/components/datatables/PrintPaperForServerDataTable.vue';
import type {
    DataTableFilterMeta,
    DataTableFilterMetaData,
    DataTableOperatorFilterMetaData,
    DataTablePageEvent,
    DataTableRowClickEvent,
    DataTableRowCollapseEvent,
    DataTableRowContextMenuEvent,
    DataTableRowExpandEvent,
    DataTableRowReorderEvent,
    DataTableSelectAllChangeEvent,
    DataTableSortMeta
} from 'primevue/datatable';
import DataTable from 'primevue/datatable';
import type { ComponentExposed } from 'vue-component-type-helpers';
import type {
    FilterMatchModes,
    PrintPaperForServerDataTableProps,
    ServerDataTableColumn,
    ServerDataTableColumnType,
    ServerDataTablePaginationResponse,
    ServerDataTableProps,
    ServerDataTableStandardSort,
    ServerDataTableToolbarFilter
} from './ServerDataTableTypes.ts';
import {
    isToolbarFilterValue,
    type ServerDataTableToolbarFilterWrapper,
    type ServerFormDialogProps
} from './ServerDataTableTypes.ts';

import type { ApiResponseData, ReorderRequestData, ResponseData } from '@/types/laravel_generated';
import type { GetRecordsResponseType } from 'HddUiHelpers/components/primeVueServerTable/types.ts';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import type { VirtualScrollerProps } from 'primevue';
import type { MenuItem } from 'primevue/menuitem';
import type { VirtualScrollerLazyEvent } from 'primevue/virtualscroller';

import { useDebounceFn } from '@vueuse/core';
import ServerFormDialog from 'HddUiHelpers/components/datatables/ServerFormDialog.vue';
import { useServerDataTableColumnVisibility } from 'HddUiHelpers/components/datatables/visibility.ts';
import { useApiClient } from 'HddUiHelpers/stores/apiClient.ts';
import { get, isString, reduce, set, snakeCase, unset } from 'lodash-es';
import cloneDeep from 'lodash/cloneDeep';
import map from 'lodash/map';
import ContextMenu from 'primevue/contextmenu';
import { useConfirm } from 'primevue/useconfirm';
import { computed, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import {
    appendToUrl,
    getColumnCanShowAddButton,
    getColumnCanShowFilterApplyButton,
    getColumnCanShowFilterMatchModes,
    getColumnCanShowFilterOperator,
    getColumnName,
    getColumnSlotName,
    getColumnTitle,
    getFieldSlotName,
    getFilterMatchModesByTypeOptions,
    isToolbarFilterEmpty,
    localeAlignToFrozenAlign, snakeCasePreserveDots
} from 'HddUiHelpers/components/datatables/ServerDataTableUtilities.ts';
import ToolbarFilterWrapper from 'HddUiHelpers/components/datatables/filters/ToolbarFilterWrapper.vue';
import { useFormatters } from 'HddUiHelpers/utils/useFormatters.ts';
import filter from 'lodash/filter';
import isBoolean from 'lodash/isBoolean';
import uniqueId from 'lodash/uniqueId';
import Button from 'primevue/button';
import Column from 'primevue/column';
import Popover from 'primevue/popover';
import CellContent from 'HddUiHelpers/components/datatables/CellContent.vue';
import moment from 'moment';

const emits = defineEmits<{
    rowClick: [row: T, index: number, original: Event];
    rowOpen: [row: T];
    rowEdit: [row: T];
    multiRowsEdit: [rows: T[]];
    rowCreated: [row: T | T[]];
    rowUpdated: [row: T | T[]];
    rowDeleted: [row: (string | number)[] | string | number];
    rowExpand: [row: T];
    rowPrint: [row: T];
    rowCollapse: [row: T];
    rowReorder: [event: DataTableRowReorderEvent];
    refreshed: [res: GetRecordsResponseType];
    rowChanged: [row: T | T[] | (string | number)[], type: 'create' | 'update' | 'delete'];
}>();

const {
    dataProvider,
    filterDisplayLayout = 'menu',
    removableSort = true,
    initialTotalRecords = 0,
    sortMode = 'multiple',
    initialRecords = null,
    columns,
    fields = [],
    globalFilterFields,
    withToolbarFilters,
    fixedToolbarFilters = [],
    initialToolbarFilters = [],
    hasPagination = true,
    primaryKey = 'id' as keyof T,
    scrollHeight = 'flex',
    scrollable,
    initialSortDirection = 'asc',
    initialSortField,
    initialSorts,
    fixedFilters,
    refreshOnMount = true,
    refreshOnActivated = true,
    defaultDateMatchMode = 'dateBetween',
    defaultNumericMatchMode = 'equals',
    defaultMatchMode = 'contains',
    defaultFiltersOperator = 'and',
    defaultShowFilterMatchModes = true,
    defaultColumnMultipleFilters = true,
    defaultColumnShowFilterAddButton = true,
    defaultColumnShowFilterClearButton = true,
    selectionMode = 'multiple',
    hasGlobalFilter = true,
    hasRefreshButton = true,
    url,
    reorderUrl,
    rowDeletable,
    rowEditable,
    getReorderScopedValues,
    singleDeleteUrl,
    deleteUrl,
    singleEditUrl,
    editUrl,
    editable,
    creatable,
    deletable,
    openable,
    printableRows,
    withContextMenu = true,
    infiniteScroll,
    itemSize = 46,
    extraContextMenuOptions,
    rowHover = true,
    onRowClick,
    selectable,
    selectAllToolbarButton = true,
    toolbarButtonsOnlyIcons = false,
    expandOnRowClick = true,
    selectOnRowClick = true,
    isCompact = false,
    useFormForEdit = true,
    refreshAfterFormSubmit = true,
    formProps = {},
    name,
    firstPageHeaderImageUrl,
    headerImageUrl,
    footerImageUrl,
    size,
    orderableColumnName = 'order_sequence' as keyof T,
    oneExpansionAtATime = false,
    hasExpanderColumn = true,
    withExpansion = false,
    multiEditable = false,
    printingProps,
    openOnClick,
    frozenSelectionColumn = undefined,
    noBody = false,
    withDataView = false,
    openButtonTitle,
    openButtonIcon,
    hasSorts = undefined,
    showOnlySortedIcon = true,
    extraToolAndContextButtons,
    hasSequenceColumn = false,
    allowMultipleToolbarFiltersForSameField = false,
    showGridLines = true,
    withLoadingMask = true,
    noMultiSortBadges = false
} = defineProps<ServerDataTableProps<T>>();

const tableName = computed(() => 'HddServerDataTable_' + (name ?? (typeof url === 'object' ? url.url : url)));

onActivated(() => {
    if (refreshOnActivated) {
        refresh();
    }
});

// const primevue = usePrimeVue()
onMounted(() => {
    if (refreshOnMount) {
        refresh();
    }
});

const { t } = useI18n();

const records = ref<T[]>(initialRecords || []) as Ref<T[]>;
const totalRecords = ref(initialTotalRecords);
const totalWithoutFilters = ref(0);
const from = ref(0);
const to = ref(0);
const selectedRecords = ref<T[]>([]) as Ref<T[]>;
const expandedRecords = ref<{ [n in string]: boolean }>({});

const contextMenuSelectedRecord = ref<T>();
const perPage = defineModel<number>('perPage', { default: 25 });
const firstRowIndex = defineModel<number>('firstRowIndex', { default: 0 });
const currentPage = defineModel<number>('currentPage', { default: 1 });
const extraData = defineModel<any>('extraData');
const isLoading = ref(false);
const isAllSelected = ref(false);

// Providers

const formatters = useFormatters();
const apiClient = useApiClient();
const confirm = useConfirm();
// Columns

const mappedColumns = computed<ServerDataTableColumn[]>(() => {
    let toRenderColumnsList: (string | ServerDataTableColumn)[] = [];
    if (Array.isArray(columns)) {
        toRenderColumnsList = columns;
    } else if (typeof columns === 'string') {
        toRenderColumnsList = columns === '*' && records.value?.length ? Object.keys(records.value[0]) : [columns];
    }
    return toRenderColumnsList.map((column) => {
        if (typeof column === 'string') {
            return { name: column, field: column, label: column, fullFieldName: column };
        }
        if (column.relation) {
            column.relation = snakeCasePreserveDots(column.relation);
            column.fullFieldName = column.relation + '.' + column.field;
        } else {
            column.fullFieldName = column.field ?? column.name;
        }
        if (!column.type && column.selectOptions !== undefined) {
            column.type = 'select';
            if (column.renderTypeProps && !column.renderType) {
                column.renderType = 'tag';
            }
        }
        if (true === column.hiddenButCanBeVisible) {
            column.visibilityControl = true;
            column.visible = false;
        }
        return column;
    }) as ServerDataTableColumn[];
});

const filterableColumns = computed(() => {
    return mappedColumns.value.filter((column) => column.filterable ?? defaultColumnFilterable.value);
});

const mappedColumnsListToObject = computed(() => {
    const obj: { [k1 in string]: { [k2 in string]: string } } = {};
    mappedColumns.value.forEach((column) => {
        const name = column.fullFieldName;
        if (column.type === 'select') {
            if (column.selectOptionsKeyed) {
                obj[name] = column.selectOptionsKeyed;
            } else if (column.selectOptions) {
                if (!Array.isArray(column.selectOptions)) {
                    obj[name] = column.selectOptions.object;
                } else {
                    obj[name] = column.selectOptions.reduce((carry: { [k2 in string]: string }, currentValue) => {
                        carry[currentValue[column.selectValueProperty ?? 'id']] = currentValue[column.selectLabelProperty ?? 'name'];
                        return carry;
                    }, {});
                }
            }
        }
    });
    return obj;
});

function getColumnBody(rowData: any, column: ServerDataTableColumn): string {
    const _showable = typeof column.showable === 'function' ? column.showable : toValue(column.showable);
    if (typeof _showable === 'function' || isBoolean(_showable)) {
        const showableValue = typeof _showable === 'function' ? _showable({ row: rowData }) : _showable;
        if (showableValue === false) {
            return `<span class="italic text-muted">--</span>`;
        } else if (showableValue !== true) {
            return showableValue;
        }
    }
    let fieldName = column.fullFieldName;
    if (typeof column.formatter === 'string') {
        fieldName = column.formatter;
    }
    const value = get(rowData, fieldName);
    if (typeof column.formatter === 'function') {
        return column.formatter(value, rowData, fieldName);
    }
    if (column.type === 'select') {
        let result: any;
        if (column.isMultiSelect) {
            result = value.map((i) => mappedColumnsListToObject.value[fieldName]?.[i] || i);
        } else {
            result = mappedColumnsListToObject.value[fieldName]?.[value] || value;
        }
        if (!result && column.emptyValuePlaceholder) {
            result = `<span class="italic text-muted">${column.emptyValuePlaceholder}</span>`;
        }
        return result;
    }
    if (column.type === 'price') {
        return formatters.formatPrice(value, typeof column.currency === 'string' ? column.currency : column.currency ? rowData : undefined);
    }
    if(column.type === 'date' && column.dateFormat){
        return moment(value).format(column.dateFormat);
    }
    if (column.type === 'boolean') {
        if (column.renderType === 'yesNoIconBadge') return value;
        let result = value === true ? t('Yes') : value === false ? t('No') : '';
        if (!result) {
            result = `<span class="italic text-muted">${column.emptyValuePlaceholder ?? 'null'}</span>`;
        }
        return result;
    }

    return value;
}

// Selections:

function recheckIfAllIsSelected() {
    isAllSelected.value = selectedRecords.value.length === totalRecords.value && selectedRecords.value.length !== 0;
}

function onSelectAllRecordsButtonClick() {
    if (!isAllSelected.value) {
        selectedRecords.value = records.value;
        isAllSelected.value = selectedRecords.value.length !== 0;
    } else {
        selectedRecords.value = [];
        isAllSelected.value = false;
    }
}

function onSelectAllChange(event: DataTableSelectAllChangeEvent) {
    if (records.value?.length === 0) {
        isAllSelected.value = false;
        selectedRecords.value = [];
    }
    isAllSelected.value = event.checked;

    if (isAllSelected.value) selectedRecords.value = records.value;
    else selectedRecords.value = [];
}

function onRowSelect() {
    // Params: (event: DataTableRowSelectEvent)
    isAllSelected.value = selectedRecords.value.length === totalRecords.value && selectedRecords.value.length !== 0;
}

function onRowUnselect() {
    //Params: (event: DataTableRowUnselectEvent)
    isAllSelected.value = false;
}

function onRowSelectAll() {
    // Params: (event: DataTableRowSelectAllEvent)
    selectedRecords.value = records.value;
    isAllSelected.value = selectedRecords.value.length !== 0;
}

function onRowUnselectAll() {
    // Params: (event: DataTableRowUnselectAllEvent)
    selectedRecords.value = [];
    isAllSelected.value = false;
}

function isSelectedRow(row: T): boolean {
    return selectedRecords.value.some((e) => e[primaryKey] === row[primaryKey]);
}

function toggleRowSelection(row: T) {
    if (isSelectedRow(row)) {
        selectedRecords.value = selectedRecords.value.filter((e) => e[primaryKey] !== row[primaryKey]);
    } else {
        selectedRecords.value = [...selectedRecords.value, row];
    }
    isAllSelected.value = selectedRecords.value.length === totalRecords.value && selectedRecords.value.length !== 0;
}

// Sorting

function sortDirectionToOrder(direction?: 'asc' | 'desc'): 1 | -1 | undefined {
    return direction === 'asc' ? 1 : direction === 'desc' ? -1 : undefined;
}

const globalSortable = computed(() => {
    return hasSorts ?? true;
});
const multiSorts = ref<DataTableSortMeta[] | undefined>(
    initialSorts?.map((e) => ({
        field: e.field,
        order: sortDirectionToOrder(e.direction)
    }))
);
const sortField = ref(initialSortField);
const sortOrder = ref<-1 | 1 | undefined>(sortDirectionToOrder(initialSortDirection));

const mappedSorts = computed<ServerDataTableStandardSort[]>(() => {
    if (sortMode === 'single' && sortField.value) {
        return [{ field: sortField.value, direction: sortOrder.value === -1 ? 'desc' : 'asc' }];
    } else if (sortMode === 'multiple' && multiSorts.value?.length) {
        return multiSorts.value.map(
            (item: DataTableSortMeta) =>
                ({
                    field: item.field,
                    direction: item.order === -1 ? 'desc' : 'asc'
                }) as ServerDataTableStandardSort
        );
    }

    return [];
});

async function onSort() {
    await refresh();
    recheckIfAllIsSelected();
}

// Filters

const columnFilterMatchModeOptions = computed(() => {
    return getFilterMatchModesByTypeOptions(t);
});

const filters = ref<DataTableFilterMeta & { _global: DataTableFilterMetaData }>(
    {} as DataTableFilterMeta & {
        _global: DataTableFilterMetaData;
    }
);

const globalFilterValue = computed({
    get() {
        return filters.value._global?.value;
    },
    set(value) {
        set(filters.value, '_global.value', value);
    }
});
const defaultColumnFilterable = ref(true);

function isMultipleFilterType(value: any): value is DataTableOperatorFilterMetaData {
    return (value as DataTableOperatorFilterMetaData)?.operator !== undefined;
}

const hasFilters = computed(() => {
    if (hasToolbarFilterValues.value) return true;
    for (const key in filters.value) {
        if (fixedFilters?.[key]) {
            continue;
        }
        const filter = filters.value[key];

        if (isMultipleFilterType(filter)) {
            const index = filter.constraints?.findIndex((x) => x.value !== null && x.value !== '');
            if (index > -1) return true;
        } else if (typeof filter === 'string') {
            return filters.value[key] !== null && filters.value[key] !== '';
        } else {
            if (filter?.value !== null && filter?.value !== '') return true;
        }
    }
    return false;
});

function clearFilters() {
    clearToolbarFilters(false);
    createFilters();
    refresh();
}

function getDefaultMatchModeForColumnType(columnType?: ServerDataTableColumnType) {
    let matchMode: FilterMatchModes;
    switch (columnType) {
        case 'date':
            matchMode = defaultDateMatchMode;
            break;
        case 'price':
        case 'numeric':
            matchMode = defaultNumericMatchMode;
            break;
        case 'boolean':
            matchMode = 'equals';

            break;
        default:
            matchMode = defaultMatchMode;
    }
    return matchMode;
}

function clearFilterFor(columnName: string | ServerDataTableColumn): void {
    const column = typeof columnName === 'object' ? columnName : mappedColumns.value.find((e) => (e.filterField ?? e.field ?? e.name) === columnName);
    if (column) {
        filters.value[column.filterField ?? column.fullFieldName] = createFilterForColumn(column);
    }
}

function createFilterForColumn(column: ServerDataTableColumn): DataTableFilterMetaData | DataTableOperatorFilterMetaData {
    let matchMode: FilterMatchModes;
    if (column.initialFilterMatchMode) {
        matchMode = column.initialFilterMatchMode;
    } else {
        matchMode = getDefaultMatchModeForColumnType(column.type);
    }
    const temporaryFalse = false;
    if (column.multipleFilters === false && temporaryFalse) {
        return {
            value: null,
            matchMode
        };
    } else {
        return {
            operator: 'and',
            constraints: [{ value: null, matchMode }]
        };
    }
}

function createFilters() {
    filters.value = reduce(
        mappedColumns.value,
        (carry: DataTableFilterMeta & { _global: DataTableFilterMetaData }, column) => {
            carry[column.filterField ?? column.fullFieldName] = createFilterForColumn(column);
            return carry;
        },
        {
            _global: {
                value: '',
                matchMode: 'contains'
            }
        }
    );
}

watch(
    () => mappedColumns.value.map((e) => e.filterField ?? e.name ?? e.field).join(','),
    (val, oldValue) => {
        if (val !== oldValue) {
            createFilters();
        }
    },
    {
        immediate: true,
        deep: true
    }
);

const filtersListOfPrimeVueColumnFilters = computed<ServerDataTableToolbarFilter>(() => {
    const list: ServerDataTableToolbarFilter = {
        operator: defaultFiltersOperator,
        fields: []
    };
    for (const fieldName in filters.value) {
        const filter = filters.value[fieldName];
        if (typeof filter === 'string') {
            list.fields.push({
                field: fieldName,
                value: filter,
                matchMode: defaultMatchMode
            });
        } else if (isMultipleFilterType(filter)) {
            list.fields.push({
                operator: filter.operator as 'and' | 'or',
                fields: filter.constraints.map((constraint) => {
                    return {
                        field: fieldName,
                        value: constraint.value,
                        matchMode: constraint.matchMode
                    };
                })
            });
        } else {
            list.fields.push({
                field: fieldName,
                value: filter.value,
                matchMode: filter.matchMode
            });
        }
    }
    return list;
});

async function onFilter() {
    await refresh();
}

// Toolbar Filters:
// TODO: Finish It
const toolbarFiltersPopoverRef = useTemplateRef<ComponentExposed<typeof Popover>>('toolbarFiltersPopoverRef');
const toolbarFiltersWrapperRef = useTemplateRef<ComponentExposed<typeof ToolbarFilterWrapper>>('toolbarFiltersWrapperRef');
const toolbarFilterableColumns = computed(() => {
    return filterableColumns.value;
});
const filledToolbarColumnNames = computed(() => {
    return toolbarFilters.value.fields.filter((e) => isToolbarFilterValue(e)).map((filter) => filter.field);
});

function makeToolbarFiltersFixed(_filters: ServerDataTableToolbarFilter[]) {
    if (!_filters.length) return [];
    return _filters.map((filter) => {
        if (isToolbarFilterValue(filter)) {
            return {
                ...filter,
                isFixed: true
            };
        } else {
            return {
                ...filter,
                fields: makeToolbarFiltersFixed(filter.fields),
                isFixed: true
            };
        }
    });
}

function addMissingIds<TFilters extends ServerDataTableToolbarFilter>(_filters: TFilters): TFilters {
    if (isToolbarFilterValue(_filters)) {
        if (!_filters.id) {
            _filters.id = uniqueId('toolbar-filter-');
        }
        return _filters;
    } else {
        if (!_filters.id) {
            _filters.id = uniqueId('toolbar-filter-');
        }
        _filters.fields = _filters.fields.map(addMissingIds);
        return _filters;
    }
}

const toolbarFilters = ref<ServerDataTableToolbarFilterWrapper>(
    addMissingIds({
        operator: defaultFiltersOperator,
        fields: [...cloneDeep(initialToolbarFilters)]
    })
);

function addToolbarFilter(column: ServerDataTableColumn) {
    toolbarFilters.value.fields.push({
        id: uniqueId('toolbar-filter-'),
        field: column.filterField ?? column.fullFieldName,
        value: null,
        matchMode: getDefaultMatchModeForColumnType(column.type)
    });
    toolbarFiltersPopoverRef.value.hide();
    nextTick(() => {
        setTimeout(() => {
            toolbarFiltersWrapperRef.value.focusLast();
        }, 50);
    });
}

const hasToolbarFilterValues = computed(() => {
    return !isToolbarFilterEmpty(toolbarFilters.value);
});
const hasToolbarFilterItems = computed(() => {
    return toolbarFilters.value.fields.length > 0;
});

function clearToolbarFilters(withRefresh = true) {
    toolbarFilters.value = addMissingIds({
        operator: defaultFiltersOperator,
        fields: []
    });
    if (withRefresh) refresh();
}

function onToolbarFiltersChange() {
    fastLazyRefresh();
}

// Pagination

async function onPageChange(event: DataTablePageEvent) {
    currentPage.value = event.page + 1;
    await refresh();
    recheckIfAllIsSelected();
}

async function onRowsPerPageChanged() {
    currentPage.value = 1;
    await refresh();
}

// Function to convert the ServerDataTableDataProviderEvent into JSON API format

const globalFilterNames = computed(
    () =>
        globalFilterFields ??
        map(
            filter(mappedColumns.value, (i) => i.globalFilter !== false),
            (column) => column.filterField ?? column.field
        )
);

const rowsPerPageOptions = computed(() => {
    const options = [5, 10, 15, 25, 50, 100, 500, 1000];
    if (!options.includes(perPage.value) && perPage.value !== -1) options.push(perPage.value);

    return [...options.map((i: number) => ({ value: i, label: i })), { value: -1, label: t('All') }];
});

const columnsRequestPayloadMapped = computed(() => {
    return reduce(
        mappedColumns.value,
        (carry, column) => {
            const fieldName = column.field ?? column.name;
            if (!fieldName) return carry;
            const item: ServerDataTableColumnPayload = {
                name: fieldName,
                relation: column.relation,
                filterField: column.filterField ?? fieldName,
                sortField: column.sortField ?? fieldName,
                source: column.source ?? 'main',
                filterSource: column.filterSource ?? column.source ?? 'main',
                sortSource: column.sortSource ?? column.source ?? 'main',
                morphableTo: column.morphableTo ?? undefined
            };
            carry.push(item);
            return carry;
        },
        [] as ServerDataTableColumnPayload[]
    );
});
const customGetDataConfig = ref<AxiosRequestConfig>({});

function setCustomGetDataConfig(config: AxiosRequestConfig, autoRefresh: boolean = false): Promise<void> {
    customGetDataConfig.value = config;
    console.log(config);
    if (autoRefresh) {
        return refresh();
    } else {
        return Promise.resolve();
    }
}

async function getData(specificPerPage: number | null = null, specificPage: number | null = null, requestConfig: AxiosRequestConfig = {}) {
    return apiClient.request<ApiResponseData<ResponseData>>({
        ...(typeof url === 'object' ? url : { url, method: 'get' }),
        params: {
            globalFilters: globalFilterNames.value,
            page: specificPage || currentPage.value,
            perPage: hasPagination ? specificPerPage || perPage.value : -1,
            // perPage: specificPerPage || perPage.value,
            sorts: mappedSorts.value,
            fields: columnsRequestPayloadMapped.value,
            filters: filters.value,
            fixedFilters: fixedFilters,
            groupedFilters: toolbarFilters.value,
            fixedGroupedFilters: {
                operator: 'and',
                fields: fixedToolbarFilters
            }
        },
        ...requestConfig,
        ...customGetDataConfig.value
    });
}

async function refresh() {
    isLoading.value = true;
    return new Promise<void>((resolve) => {
        if (dataProvider) {
            dataProvider({
                page: currentPage.value,
                perPage: perPage.value,
                sorts: mappedSorts.value,
                filters: filtersListOfPrimeVueColumnFilters.value
            }).then((response: ServerDataTablePaginationResponse) => {
                records.value = response.data;
                totalRecords.value = response.total_records;
                perPage.value = response.per_page || perPage.value;
                firstRowIndex.value = (response.current_page - 1) * perPage.value;
                resolve();
            });
        } else if (url) {
            getData()
                .then((response) => {
                    const responseData = response.data.data;
                    records.value = responseData.data;
                    totalRecords.value = responseData.total;
                    totalWithoutFilters.value = responseData.total_without_filters;
                    perPage.value = responseData.per_page || perPage.value;
                    firstRowIndex.value = (responseData.current_page - 1) * perPage.value;
                    from.value = responseData.from ?? 0;
                    to.value = responseData.to ?? 0;
                    if (selectedRecords.value.length > 0) {
                        const existingKeys = selectedRecords.value.map((e) => e[primaryKey]);
                        selectedRecords.value = records.value.filter((e) => existingKeys.includes(e[primaryKey]));
                    }
                    extraData.value = responseData.extra;
                })
                .catch((error) => {
                    console.error(error);
                    apiClient.toastRequestError(error);
                })
                .finally(resolve);
        } else {
            resolve();
        }
    }).finally(() => {
        isLoading.value = false;
    });
}

const lazyRefresh = useDebounceFn(() => {
    refresh();
}, 500);
const fastLazyRefresh = useDebounceFn(() => {
    refresh();
}, 100);

// Infinite Scrolling
const localItemSize = ref();
watch(
    () => itemSize,
    (val) => {
        localItemSize.value = val;
    },
    {
        immediate: true
    }
);
const isLazyLoading = ref(false);

const localVirtualScrollerOptions = computed(() => {
    if (!infiniteScroll) return;
    return {
        itemSize: localItemSize.value,
        delay: 50,
        lazy: true,
        showLoader: true,
        autoSize: true,
        loading: isLazyLoading.value,
        onLazyLoad: loadRecordsLazily
    } as VirtualScrollerProps;
});

async function loadRecordsLazily(event: VirtualScrollerLazyEvent) {
}

// Visibility
const { checkColumnIsVisible, visibleColumns, visibleColumnsPopoverRef, saveVisibleColumnsState, toggleableColumns } =
    useServerDataTableColumnVisibility(tableName, mappedColumns);

// Deletions
const isDeleting = ref(false);
const idsBeingDeleted = ref([]);

function deleteRecords(item: T | T[]) {
    if (!item) return;
    let cnt = 1;
    if (Array.isArray(item)) {
        cnt = item.length;
    }
    confirm.require({
        message: t('Are you sure to delete n records?', { n: cnt }, cnt),
        header: t('Confirmation'),
        icon: 'pi pi-info-circle',
        rejectLabel: t('Cancel'),
        acceptLabel: t('Delete'),
        group: 'dismissable',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: async () => {
            isDeleting.value = true;
            const ids = (Array.isArray(item) ? item.map((i) => i[primaryKey]) : [item[primaryKey]]) as (string | number)[];
            try {
                if (!url) {
                    throw new Error('No Url');
                }

                let urlLink = typeof url === 'object' ? url.url : url;
                if (cnt === 1) {
                    if (singleDeleteUrl) {
                        urlLink = singleDeleteUrl(ids[0]).url;
                    } else {
                        urlLink = appendToUrl(urlLink, ids[0]);
                    }
                } else if (deleteUrl) {
                    urlLink = typeof deleteUrl === 'object' ? deleteUrl.url : deleteUrl;
                }
                idsBeingDeleted.value = ids;
                await apiClient.delete(urlLink, { params: { ids } });
                apiClient.toastSuccess(t('Deleted!'), t('n Record Deleted Successfully', { n: cnt }, cnt));
                emits('rowDeleted', Array.isArray(item) ? ids : (item[primaryKey] as string | number));
                emits('rowChanged', item, 'delete');
                selectedRecords.value = selectedRecords.value.filter((i) => !ids.includes(i[primaryKey] as string | number));
                await refresh();
            } catch (error: any) {
                console.error(error);
                apiClient.toastRequestError(error);
            }
            isDeleting.value = false;
            idsBeingDeleted.value = [];
        }
    });
}

//Server Form Dialog For Edit And Create

const ServerFormDialogRef = useTemplateRef<ComponentExposed<typeof ServerFormDialog>>('ServerFormDialogRef');
const ServerFormDialogOptions = computed(() => {
    return {
        url: url,
        primaryKey: primaryKey,
        singleDeleteUrl: singleDeleteUrl,
        deleteUrl: deleteUrl,
        singleEditUrl: singleEditUrl,
        editUrl: editUrl,
        autoAppendIdToEditUrl: true,
        fields: fields,
        size: size,
        columns: mappedColumns.value.filter((e) => e.inForm === true),
        onSubmitted: onFormSubmitted,
        ...(formProps ?? {})
    } as ServerFormDialogProps;
});

function onFormSubmitted(item: T | T[], type: 'create' | 'update') {
    if (type === 'create') {
        emits('rowCreated', item);
    } else {
        emits('rowUpdated', item);
    }
    emits('rowChanged', item, type);
    if (refreshAfterFormSubmit) {
        refresh();
    }
}

function showCreateDialog() {
    ServerFormDialogRef.value?.create();
}

// Row Editing Editions

function editRecord(item: T) {
    emits('rowEdit', item);
    if (useFormForEdit) {
        showEditDialog(item);
    }
}

function editMultiRecords(items: T[]) {
    emits('multiRowsEdit', items);
    if (useFormForEdit) {
        showEditDialog(items);
    }
}

function editRecords(items: T[]) {
    if (items.length === 1) {
        editRecord(items[0]);
    } else {
        editMultiRecords(items);
    }
}

function showEditDialog(item: T | T[]) {
    if (Array.isArray(item)) {
        ServerFormDialogRef.value?.editMulti(item);
    } else {
        ServerFormDialogRef.value?.edit(item);
    }
}

// Row Click

const hasRowClickEventListener = computed(() => {
    return !!onRowClick;
});

function onLocalRowClick(evt: DataTableRowClickEvent) {
    if (!window.getSelection()?.isCollapsed) {
        return;
    }
    const path = evt.originalEvent.composedPath() as HTMLElement[];
    const toggleButton = path.find((e) => e.classList?.contains('p-datatable-row-toggle-button'));
    const editableColumn = path.find((e) => e.classList?.contains('p-editable-column'));
    const checkboxColumn = path.find((e) => e.classList?.contains('p-selection-column'));
    const anyButton = path.find((e) => e.classList?.contains('p-button'));
    if (toggleButton || editableColumn || checkboxColumn || anyButton) {
        return;
    }
    emits('rowClick', evt.data, evt.index, evt.originalEvent);
    if (!onRowClick && withExpansion && expandOnRowClick) {
        toggleRowExpansion(evt.data);
    } else if (!onRowClick && selectable && selectOnRowClick) {
        toggleRowSelection(evt.data);
    } else if (!onRowClick && openOnClick && openable) {
        emits('rowOpen', evt.data);
    }
}

//Context Menu
const contextMenuRef = useTemplateRef<InstanceType<typeof ContextMenu>>('contextMenuRef');

function onRowContextMenu(event: DataTableRowContextMenuEvent) {
    contextMenuRef.value?.show(event.originalEvent);
}

const contextMenuModel = computed<MenuItem[]>(() => {
    const list: MenuItem[] = [];
    if (contextMenuSelectedRecord.value) {
        if (openable) {
            list.push({
                label: openButtonTitle ?? t('Open'),
                icon: openButtonIcon ?? 'i-mdi-open-in-app',
                command: () => (contextMenuSelectedRecord.value ? emits('rowOpen', contextMenuSelectedRecord.value) : undefined)
            });
        }
        if (printableRows == true || (typeof printableRows === 'function' && printableRows(contextMenuSelectedRecord.value))) {
            list.push({
                label: t('Print'),
                icon: 'i-mdi-printer',
                command: () => (contextMenuSelectedRecord.value ? emits('rowPrint', contextMenuSelectedRecord.value) : undefined)
            });
        }
        if (editable && (!rowEditable || rowEditable(contextMenuSelectedRecord.value))) {
            list.push({
                label: t('Edit'),
                icon: 'i-mdi-edit',
                command: () => (contextMenuSelectedRecord.value ? editRecord(contextMenuSelectedRecord.value) : undefined)
            });
        }

        if (deletable && (!rowDeletable || rowDeletable(contextMenuSelectedRecord.value))) {
            list.push({
                label: t('Delete'),
                icon: 'i-mdi-trash',
                disabled: isLoading.value || isDeleting.value,
                command: () => (contextMenuSelectedRecord.value ? deleteRecords(contextMenuSelectedRecord.value) : undefined)
            });
        }
    }

    if (extraToolAndContextButtons?.length > 0) {
        list.push(
            ...cloneDeep(extraToolAndContextButtons).map((e) => {
                if (e.command) {
                    e.command2 = e.command;
                    e.command = () => e.command2(contextMenuSelectedRecord.value);
                }
                if (typeof e.visible === 'function') {
                    e.visible2 = e.visible;
                    e.visible = () => e.visible2(contextMenuSelectedRecord.value);
                }
                if (typeof e.icon === 'function') {
                    e.icon2 = e.icon;
                    e.icon = () => e.icon2(contextMenuSelectedRecord.value);
                }

                if (typeof e.label === 'function') {
                    e.label2 = e.label;
                    e.label = () => e.label2(contextMenuSelectedRecord.value);
                }
                return e as MenuItem;
            })
        );
    }
    if (extraContextMenuOptions && extraContextMenuOptions.length > 0) {
        list.push(
            ...cloneDeep(extraContextMenuOptions).map((e) => {
                if (typeof e.visible === 'function') {
                    e.visible2 = e.visible;
                    e.visible = () => e.visible2(contextMenuSelectedRecord.value);
                }
                if (e.command) {
                    e.command2 = e.command;
                    e.command = () => e.command2(contextMenuSelectedRecord.value);
                }
                if (typeof e.labelFn === 'function') {
                    e.label = e.labelFn(contextMenuSelectedRecord.value);
                }
                return e as MenuItem;
            })
        );
    }

    return list;
});

// Rows Expansions & Expanders

function toggleRowExpansion(row: T) {
    if (isExpandedRow(row)) {
        collapseRow(row);
    } else {
        expandRow(row);
    }
}

function isExpandedRow(row: T) {
    if (expandedRecords.value) {
        return expandedRecords.value[row[primaryKey] as string | number];
    } else {
        return false;
    }
}

function expandRow(row: T) {
    if (oneExpansionAtATime) {
        expandedRecords.value = {
            [row[primaryKey] as string | number]: true
        };
    } else {
        expandedRecords.value[row[primaryKey] as string | number] = true;
    }
}

function collapseRow(row: T) {
    unset(expandedRecords.value, row[primaryKey] as string | number);
}

function onRowExpand(event: DataTableRowExpandEvent) {
    if (oneExpansionAtATime) {
        expandedRecords.value = {
            [event.data[primaryKey] as string | number]: true
        };
    }
    // toast.add({ severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000 })
    emits('rowExpand', event.data);
}

function onRowCollapse(event: DataTableRowCollapseEvent) {
    // toast.add({ severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000 })
    emits('rowCollapse', event.data);
}

const isReordering = ref(false);

async function onRowReorder(event: DataTableRowReorderEvent) {
    isReordering.value = true;

    let urlLink = (typeof url === 'object' ? url.url : url) + '/reorder';
    let urlMethod = 'put';
    if (reorderUrl) {
        urlLink = typeof reorderUrl === 'object' ? reorderUrl.url : reorderUrl;
        urlMethod = typeof reorderUrl === 'object' ? reorderUrl.method : 'put';
    }

    return apiClient
        .request<ApiResponseData<ResponseData>>({
            url: urlLink,
            method: urlMethod,
            data: {
                from_order: records.value[event.dragIndex][orderableColumnName] as number,
                to_order: records.value[event.dropIndex][orderableColumnName] as number,
                scoped_values: getReorderScopedValues ? getReorderScopedValues(event) : {}
            } as ReorderRequestData
        })
        .then(() => {
            refresh();
        })
        .catch((error: AxiosError) => {
            apiClient.toastRequestError(error);
        })
        .finally(() => {
            isReordering.value = false;
        });
}

// Printing

const printTableContextMenuRef = useTemplateRef<InstanceType<typeof ContextMenu>>('printTableContextMenuRef');
const printTableContextMenuItems = computed(() => {
    return [
        {
            label: t('Print Current Page'),
            icon: 'i-mdi:printer-pos',
            command: () => {
                printTable();
            }
        },
        {
            label: t('Print All Pages'),
            icon: 'i-mdi:printer-pos-star',
            command: () => {
                printTable(true);
            }
        }
    ] as MenuItem[];
});

const printableColumns = computed(() => {
    return mappedColumns.value.filter((e) => e.printable !== false);
});
const printPaperProps = computed(() => {
    return {
        columns: printableColumns.value,
        mappedColumns: mappedColumns.value,
        sorts: mappedSorts.value,
        hasSequenceColumn: hasSequenceColumn,
        records: records,
        firstPageHeaderImageUrl: firstPageHeaderImageUrl,
        headerImageUrl: headerImageUrl,
        footerImageUrl: footerImageUrl,
        extraData: extraData,
        getData: getData,
        toolbarFilters: isToolbarFilterEmpty(fixedToolbarFilters)
            ? toolbarFilters.value
            : {
                operator: 'and',
                fields: [...fixedToolbarFilters, toolbarFilters.value]
            },
        filters: filters.value,
        getColumnBody: getColumnBody,
        checkColumnIsVisible: checkColumnIsVisible,
        showPageCounter: true,
        showCurrentPrintTime: true,
        ...(printingProps ?? {})
    } as PrintPaperForServerDataTableProps<T>;
});

const isPrinting = ref(false);
const printPaperForServerDataTableRef = useTemplateRef<ComponentExposed<typeof PrintPaperForServerDataTable>>('printPaperForServerDataTableRef');

function printTable(allPage: boolean = false) {
    printPaperForServerDataTableRef.value?.print(allPage);
}

function printTableOnContextMenu(event: MouseEvent) {
    if (hasPagination) {
        printTableContextMenuRef.value?.show(event);
    }
}

function printWithCustomConfig(requestConfig: AxiosRequestConfig) {
    printPaperForServerDataTableRef.value?.print(true, requestConfig);
}

function startLoading() {
    isLoading.value = true;
}

function endLoading() {
    isLoading.value = false;
}

defineExpose({
    refresh,
    startLoading,
    endLoading,
    extraData,
    printTable,
    getData,
    setCustomGetDataConfig,
    clearFilterFor,
    ServerFormDialogRef,
    printWithCustomConfig
});
</script>

<template>
    <div class="HddServerDataTableWrapper h-full">
        <ServerFormDialog ref="ServerFormDialogRef" v-bind="ServerFormDialogOptions">
            <template
                v-for="field in ServerFormDialogRef?.mappedFormFields"
                #[`${getFieldSlotName(field)}BeforeControl`]>
                <slot :name="`${getFieldSlotName(field)}BeforeControl`"></slot>
            </template>
            <template v-for="field in ServerFormDialogRef?.mappedFormFields" #[`${getFieldSlotName(field)}ControlBody`]>
                <slot :name="`${getFieldSlotName(field)}ControlBody`"></slot>
            </template>
            <template
                v-for="field in ServerFormDialogRef?.mappedFormFields"
                #[`${getFieldSlotName(field)}AfterControl`]>
                <slot :name="`${getFieldSlotName(field)}AfterControl`"></slot>
            </template>
        </ServerFormDialog>
        <PrintPaperForServerDataTable
            v-bind="printPaperProps" ref="printPaperForServerDataTableRef"
            v-model:is-printing="isPrinting">
            <template #printPageHeader="slotProps">
                <slot name="printPageHeader" :records="slotProps.records" :extra="slotProps.extra">
                    <slot name="title" :records="slotProps.records" :extra="slotProps.extra">
                        <div class="my-2 text-center text-lg font-bold">
                            {{ printingTitle ?? title }}
                        </div>
                    </slot>
                </slot>
            </template>
            <template #printPageFooter="slotProps">
                <slot name="printPageFooter" :records="slotProps.records" :extra="slotProps.extra">
                    <slot name="footer" :records="slotProps.records" :extra="slotProps.extra"></slot>
                </slot>
            </template>
        </PrintPaperForServerDataTable>
        <ContextMenu ref="contextMenuRef" :model="contextMenuModel" @hide="contextMenuSelectedRecord = undefined" />
        <div class="p-1">
<!--            <div class="absolute top-0 right-0 left-0 flex justify-center">
                <ProgressSpinner class="!size-12" />
            </div>-->
            <slot name="title" :records="records">
                <div class="my-1 text-center text-lg font-bold">
                    {{ title }}
                </div>
            </slot>
            <div class="flex justify-between">
                <div>
                    <div class="flex justify-between">
                        <div v-if="hasGlobalFilter">
                            <InputGroup>
                                <IconField>
                                    <InputIcon class="i-mdi:magnify !z-10" />
                                    <InputText
                                        v-model="globalFilterValue" :size="size" :placeholder="t('Search')"
                                        @value-change="lazyRefresh" />
                                </IconField>
                                <Button
                                    v-if="hasFilters"
                                    v-tooltip.top="t('Clear Filters')"
                                    :size="size"
                                    type="button"
                                    icon="i-mdi-filter-off w-8"
                                    :label="t('Clear')"
                                    outlined
                                    severity="error"
                                    @click="clearFilters()"
                                />
                                <template v-if="withToolbarFilters">
                                    <Popover ref="toolbarFiltersPopoverRef">
                                        <div class="max-h-screen overflow-y-auto">
                                            <div class="flex max-h-screen flex-col items-center gap-y-1 py-1">
                                                <template
                                                    v-for="column in toolbarFilterableColumns"
                                                    :key="column.field">
                                                    <Button
                                                        :disabled="
                                                            filledToolbarColumnNames.includes(column.filterField ?? column.field) &&
                                                            !allowMultipleToolbarFiltersForSameField
                                                        "
                                                        severity="info"
                                                        outlined
                                                        fluid
                                                        :size="toolbarButtonsSize ?? size"
                                                        :label="getColumnTitle(column, t)"
                                                        @click="addToolbarFilter(column)"
                                                    />
                                                </template>
                                            </div>
                                            <Divider />
                                            <SelectInput
                                                v-if="toolbarFilters.fields.length > 1"
                                                v-model="toolbarFilters.operator"
                                                class="mb-2"
                                                size="small"
                                                :has-filter="false"
                                                :label="t('Filtering Method')"
                                                option-label-property="label"
                                                option-value-property="value"
                                                :options="[
                                                    { value: 'and', label: t('All Conditions') },
                                                    { value: 'or', label: t('Any Condition') },
                                                ]"
                                                @change="() => hasToolbarFilterValues && onToolbarFiltersChange()"
                                            />
                                            <Button
                                                v-if="hasToolbarFilterItems"
                                                fluid
                                                size="small"
                                                icon="i-mdi-filter-off"
                                                :label="t('Clear Filters')"
                                                severity="secondary"
                                                @click="clearToolbarFilters()"
                                            />
                                        </div>
                                    </Popover>
                                    <Button
                                        v-if="withToolbarFilters"
                                        v-tooltip.top="t('Filter')"
                                        :size="toolbarButtonsSize ?? size"
                                        severity="help"
                                        icon="i-mdi-filter"
                                        @click="(evt) => toolbarFiltersPopoverRef?.toggle(evt)"
                                    />
                                </template>
                            </InputGroup>
                        </div>
                    </div>
                </div>
                <div class="flex justify-end gap-1">
                    <slot name="buttonsStart" />
                    <Button
                        v-if="creatable"
                        v-tooltip.success.top="createButtonLabel ?? t('New')"
                        :size="toolbarButtonsSize ?? size"
                        severity="primary"
                        icon="i-mdi-plus "
                        :label="!toolbarButtonsOnlyIcons ? (createButtonLabel ?? t('New')) : null"
                        v-bind="createButtonProps"
                        @click="showCreateDialog()"
                    />
                    <Button
                        v-if="selectable && selectAllToolbarButton"
                        v-tooltip.top="isAllSelected ? t('Deselect') : t('Select All')"
                        class="light:border-gray-300 light:text-black border-1 whitespace-pre dark:border-gray-600 dark:text-white"
                        :size="toolbarButtonsSize ?? size"
                        severity="secondary"
                        :icon="isAllSelected ? 'i-mdi:square-rounded-outline' : 'i-fluent:select-all-on-24-regular'"
                        :label="!toolbarButtonsOnlyIcons ? (isAllSelected ? t('Deselect') : t('Select All')) : null"
                        @click="onSelectAllRecordsButtonClick"
                    />
                    <Button
                        v-if="selectable && deletable"
                        v-tooltip.top="t('Delete')"
                        :loading="isDeleting"
                        :size="toolbarButtonsSize ?? size"
                        severity="danger"
                        :disabled="isLoading || selectedRecords.length < 1"
                        icon="i-mdi-trash"
                        :label="!toolbarButtonsOnlyIcons ? t('Delete') : null"
                        @click="deleteRecords(selectedRecords as T[])"
                    />
                    <Button
                        v-if="selectable && editable"
                        v-tooltip.top="{
                            class: 'warn',
                            value: selectedRecords.length > 1 && !multiEditable ? t('You must select one item only') : t('Edit'),
                        }"
                        :size="toolbarButtonsSize ?? size"
                        :disabled="isDeleting || isLoading || selectedRecords.length < 1 || (selectedRecords.length !== 1 && !multiEditable)"
                        severity="success"
                        icon="pi pi-pencil"
                        :label="!toolbarButtonsOnlyIcons ? t('Edit') : null"
                        @click="editRecords(selectedRecords)"
                    />
                    <template v-if="columnVisibilityButton">
                        <Popover ref="visibleColumnsPopoverRef">
                            <div class="max-h-screen overflow-y-auto">
                                <div
                                    v-for="column in toggleableColumns"
                                    :key="getColumnName(column)"
                                    class="max-h-90vh flex items-center gap-2 overflow-y-auto pb-1"
                                >
                                    <Checkbox
                                        v-model="visibleColumns"
                                        :input-id="'ColumnVisibilityCheckbox_' + getColumnName(column)"
                                        :value="getColumnName(column)"
                                        @change="saveVisibleColumnsState"
                                    />
                                    <label
                                        :for="'ColumnVisibilityCheckbox_' + getColumnName(column)"
                                        class="flex-1 px-1">
                                        {{ getColumnTitle(column, t) }}
                                    </label>
                                </div>
                            </div>
                        </Popover>
                        <Button
                            v-tooltip.top="t('Columns Control')"
                            :size="toolbarButtonsSize ?? size"
                            icon="i-mdi:eye "
                            severity="help"
                            @click="(evt) => visibleColumnsPopoverRef?.toggle(evt)"
                        />
                    </template>
                    <template v-if="printable">
                        <ContextMenu ref="printTableContextMenuRef" :model="printTableContextMenuItems" />

                        <Button
                            v-tooltip.top="t('Print')"
                            :disabled="isLoading"
                            :size="toolbarButtonsSize ?? size"
                            severity="success"
                            :loading="isPrinting"
                            icon="pi pi-print"
                            @contextmenu.prevent="printTableOnContextMenu"
                            @click="printTable()"
                        />
                    </template>
                    <Button
                        v-if="hasRefreshButton"
                        v-tooltip.top="t('Refresh')"
                        severity="info"
                        :size="toolbarButtonsSize ?? size"
                        :loading="isLoading"
                        type="button"
                        icon="i-fluent:arrow-counterclockwise-12-regular"
                        outlined
                        @click="refresh()"
                    />
                    <slot name="buttonsEnd" />
                </div>
            </div>
            <div v-if="withToolbarFilters" class="flex justify-start">
                <div class="mt-1">
                    <ToolbarFilterWrapper
                        v-if="fixedToolbarFilters"
                        :filters="{ operator: 'and', fields: fixedToolbarFilters }"
                        :is-printing="true"
                        :hide-operator="true"
                        :columns="mappedColumns"
                        :operator="toolbarFilters.operator"
                        @filters-changed="onToolbarFiltersChange"
                    />
                    <Divider v-if="fixedToolbarFilters && fixedToolbarFilters.length && hasToolbarFilterItems" />
                    <ToolbarFilterWrapper
                        ref="toolbarFiltersWrapperRef"
                        v-model:filters="toolbarFilters"
                        :hide-operator="true"
                        :columns="mappedColumns"
                        :operator="toolbarFilters.operator"
                        @filters-changed="onToolbarFiltersChange"
                    />
                </div>
                <!--                    <pre dir="ltr" class="dir-ltr text-left text-xs">{{toolbarFilters}}</pre>-->
            </div>
        </div>
        <DataTable
            v-model:first="firstRowIndex"
            v-model:context-menu-selection="contextMenuSelectedRecord"
            v-model:filters="filters"
            v-model:selection="selectedRecords"
            v-model:rows="perPage"
            v-model:expanded-rows="expandedRecords"
            v-model:multi-sort-meta="multiSorts"
            v-model:sort-field="sortField"
            v-model:sort-order="sortOrder"
            :size="size"
            :show-gridlines="showGridLines"
            show-headers
            highlight-on-select
            :context-menu="withContextMenu"
            :value="records"
            :virtual-scroller-options="localVirtualScrollerOptions"
            :lazy="true"
            :scrollable="scrollable"
            :scroll-height="scrollHeight"
            :data-key="primaryKey || undefined"
            :paginator="hasPagination"
            paginator-position="top"
            :total-records="totalRecords"
            :loading="withLoadingMask && isLoading"
            :filter-display="filterDisplayLayout"
            :global-filter-fields="globalFilterNames"
            :row-class="
                (row) => [
                    isActiveRow && isActiveRow(row) ? 'active-row' : '',
                    rowClass ? rowClass(row) : '',
                    { 'cursor-pointer': hasRowClickEventListener },
                ]
            "
            :row-hover="rowHover"
            :class="{ 'compact-table': isCompact }"
            :select-all="isAllSelected"
            :removable-sort="removableSort"
            :sort-mode="sortMode"
            @select-all-change="onSelectAllChange"
            @row-select="onRowSelect"
            @row-unselect="onRowUnselect"
            @row-select-all="onRowSelectAll"
            @row-unselect-all="onRowUnselectAll"
            @page="onPageChange"
            @sort="onSort"
            @filter="onFilter"
            @row-expand="onRowExpand"
            @row-collapse="onRowCollapse"
            @row-reorder="onRowReorder"
            @row-contextmenu="(evt) => (withContextMenu ? onRowContextMenu(evt) : undefined)"
            @row-click="onLocalRowClick"
        >
            <template v-if="$slots.header" #header>
                <slot name="header" :records="records" :extra="extraData"></slot>
            </template>
            <template v-if="$slots.footer" #footer>
                <slot name="footer" :records="records" :extra="extraData"></slot>
            </template>
            <template #paginatorstart>
                <div class="flex w-full justify-end gap-1 text-sm">
                    <span>
                        <template v-if="hasFilters">
                            {{
                                t('Showing start To end From filtered (Filtered From total)', {
                                    start: from,
                                    end: to,
                                    total: totalWithoutFilters,
                                    filtered: totalRecords
                                })
                            }}
                        </template>
                        <template v-else>
                            {{
                                t('Showing start To end From total', {
                                    start: from,
                                    end: to,
                                    total: totalWithoutFilters
                                })
                            }}
                        </template>
                    </span>
                    <span
                        v-if="selectedRecords.length"> {{ t('(n Records selected)', { n: selectedRecords.length }, selectedRecords.length)
                        }}</span>
                </div>
            </template>
            <template #paginatorend>
                <div class="flex items-center gap-1 text-sm">
                    <span>{{ t('Show') }} </span>
                    <Select
                        v-model="perPage"
                        size="small"
                        :options="rowsPerPageOptions"
                        scroll-height="360px"
                        option-label="label"
                        option-value="value"
                        @change="onRowsPerPageChanged()"
                    />
                    <span v-if="perPage !== -1"> {{ t('Entries') }}</span>
                </div>
            </template>
            <template #empty>
                <slot name="empty" :record="records">
                    <div class="text-secondary-1 text-center text-sm italic">
                        {{ t('No Records') }}
                    </div>
                </slot>
            </template>
            <template #expansion="{ data }">
                <slot name="expansion" :row="data" />
            </template>
            <template v-if="!noBody">
                <Column
                    v-if="reorderable" row-reorder :reorderable-column="false"
                    style="width: 33px; flex-grow: 1; flex-basis: 33px" />
                <Column
                    v-if="withExpansion && hasExpanderColumn" expander :reorderable-column="false"
                    style="width: 3rem" />
                <Column
                    v-if="selectable"
                    :selection-mode="selectionMode"
                    :reorderable-column="false"
                    header-style="width: 3rem"
                    :frozen="frozenSelectionColumn ?? isString(mappedColumns[0]?.frozen)"
                />
                <Column v-if="hasSequenceColumn" header="#" style="width: 3rem" v-bind="sequenceColumnProps">
                    <template #body="{ index }">
                        {{ index + 1 }}
                    </template>
                    <template #loading>
                        <div
                            class="flex items-center"
                            :style="{ height: itemSize + 'px', 'flex-grow': '1', overflow: 'hidden' }">
                            <Skeleton width="60%" height="1rem" />
                        </div>
                    </template>
                </Column>
                <template v-for="column in mappedColumns" :key="column.name">
                    <Column
                        :field="column.fullFieldName"
                        :header="getColumnTitle(column, t)"
                        :sort-field="column.sortField ?? column.fullFieldName"
                        :filter-field="column.filterField ?? column.fullFieldName"
                        :data-type="column.type ?? 'text'"
                        :sortable="column.sortable ?? globalSortable"
                        :show-filter-operator="getColumnCanShowFilterOperator(column) && (column.multipleFilters ?? defaultColumnMultipleFilters)"
                        :show-filter-match-modes="
                            getColumnCanShowFilterMatchModes(column) && (column.showFilterMatchModes ?? defaultShowFilterMatchModes)
                        "
                        :max-constraints="Number.POSITIVE_INFINITY"
                        :show-add-button="getColumnCanShowAddButton(column) && (column.multipleFilters ?? defaultColumnMultipleFilters)"
                        :show-apply-button="
                            getColumnCanShowFilterApplyButton(column) && (column.showFilterApplyButton ?? defaultColumnShowFilterAddButton)
                        "
                        :show-clear-button="
                            getColumnCanShowFilterApplyButton(column) && (column.showFilterClearButton ?? defaultColumnShowFilterClearButton)
                        "
                        :filter-match-mode="column.initialFilterMatchMode ?? getDefaultMatchModeForColumnType(column.type)"
                        :filter-match-mode-options="columnFilterMatchModeOptions[column.type ?? 'text']"
                        :body-class="column.bodyClass"
                        :body-style="column.bodyStyle"
                        :header-class="column.headerClass"
                        :header-style="column.headerStyle"
                        :hidden="!checkColumnIsVisible(column)"
                        :frozen="isString(column.frozen)"
                        :align-frozen="localeAlignToFrozenAlign(column.frozen)"
                        :pt="{
                            pcSortBadge:{
                                root: noMultiSortBadges ? '!hidden' : ''
                            },
                        }"
                    >
                        <template v-if="column.footer" #footer>
                            <span
                                v-html="typeof column.footer === 'string' ? column.footer : column.footer(records)"></span>
                        </template>
                        <template v-if="showOnlySortedIcon" #sorticon="slotProps">
                            <template v-if="slotProps.sorted">
                                <i
                                    v-if="slotProps.sortOrder === 1" :title="t('Ascending')"
                                    class="i-mdi:sort-ascending scale-y-[-1]"></i>
                                <i v-else :title="t('Descending')" class="i-mdi:sort-descending scale-y-[-1]"></i>
                            </template>
                        </template>
                        <template #body="{ data }">
                            <slot :name="`${getColumnSlotName(column)}ColumnBody`">
                                <CellContent
                                    :column="column" :rendered-data="getColumnBody(data, column)" :row="data"
                                    :size="size" />
                            </slot>
                        </template>
                        <template
                            v-if="column.cellHeadFilterable ?? column.filterable ?? defaultColumnFilterable"
                            #filter="{ filterModel, filterCallback }"
                        >
                            <slot
                                :name="`${getColumnSlotName(column)}ColumnFilter`"
                                :item="{ filterModel, filterCallback }">
                                <FilterControl
                                    :column="column" :filter-callback="filterCallback"
                                    :filter-model="filterModel" />
                            </slot>
                        </template>
                    </Column>
                </template>
                <Column
                    v-if="hasToolsColumn"
                    :body-class="`p-tools-cell ${toolsColumnBodyClass ?? ''}`"
                    :align-frozen="localeAlignToFrozenAlign('end')"
                    :frozen="frozenToolsColumn"
                    v-bind="toolsColumnProps"
                >
                    <template #header>
                        <i class="i-mdi-tools mx-auto" />
                    </template>
                    <template #body="row">
                        <div class="flex flex-wrap items-center gap-1">
                            <slot name="toolsColumnExtraStartButton" :row="row.data" :is-loading="isLoading" />
                            <Button
                                v-if="openable"
                                v-tooltip.danger="t('Open')"
                                severity="info"
                                :disabled="idsBeingDeleted.includes(row.data[primaryKey])"
                                :size="toolButtonsSize ?? size"
                                class="rounded-md p-2"
                                :icon="openButtonIcon ?? 'i-mdi-open-in-app'"
                                @click="emits('rowOpen', row.data)"
                            />
                            <Button
                                v-if="printableRows === true || (typeof printableRows === 'function' && printableRows(row.data))"
                                v-tooltip.success="t('Print')"
                                severity="success"
                                :size="toolButtonsSize ?? size"
                                :disabled="idsBeingDeleted.includes(row.data[primaryKey])"
                                class="rounded-md p-2"
                                :icon="'i-mdi-printer'"
                                @click="emits('rowPrint', row.data)"
                            />
                            <Button
                                v-if="editable && (!rowEditable || rowEditable(row.data))"
                                v-tooltip="t('Edit')"
                                :disabled="isLoading || idsBeingDeleted.includes(row.data[primaryKey])"
                                severity="success"
                                :size="toolButtonsSize ?? size"
                                class="rounded-md p-2"
                                icon="i-mdi-edit"
                                @click="editRecord(row.data)"
                            />
                            <Button
                                v-if="deletable && (!rowDeletable || rowDeletable(row.data))"
                                v-tooltip.danger="t('Remove')"
                                severity="danger"
                                :loading="idsBeingDeleted.includes(row.data[primaryKey])"
                                :disabled="isLoading"
                                :size="toolButtonsSize ?? size"
                                class="rounded-md p-2"
                                icon="i-mdi-trash"
                                @click="deleteRecords(row.data)"
                            ></Button>
                            <template v-if="extraToolAndContextButtons?.length > 0">
                                <Button
                                    v-for="(btn, btnIndex) in extraToolAndContextButtons"
                                    :key="btnIndex"
                                    v-tooltip="isString(btn.label) ? btn.label : btn.label(row.data)"
                                    :loading="isLoading"
                                    :hidden="!(btn.visible === true || btn.visible === false ? btn.visible : (btn.visible?.(row.data) ?? true))"
                                    :size="toolButtonsSize ?? size"
                                    :label="btn.onlyIconButton === true ? undefined : isString(btn.label) ? btn.label : btn.label(row.data)"
                                    :severity="btn.severity"
                                    :icon="typeof btn.icon === 'function' ? btn.icon(row.data) : btn.icon"
                                    @click="btn.command?.(row.data)"
                                ></Button>
                            </template>
                            <slot name="toolsColumnExtraButton" :row="row.data" :is-loading="isLoading" />
                        </div>
                    </template>
                    <template #loading>
                        <div
                            class="flex items-center"
                            :style="{ height: itemSize + 'px', 'flex-grow': '1', overflow: 'hidden' }">
                            <Skeleton width="60%" height="1rem" />
                        </div>
                    </template>
                </Column>
            </template>
        </DataTable>
        <DataView v-if="withDataView" :value="records">
            <template #list="slotProps">
                <slot name="dataViewBody" :items="slotProps.items" :records="records"></slot>
            </template>
        </DataView>
    </div>
</template>

<style>
.HddServerDataTableWrapper {
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

                /*svg {
                    height: 0.85rem;
                }*/
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

    .p-datatable-hoverable .p-datatable-tbody > tr:not(.p-datatable-row-selected):hover {
        .p-datatable-frozen-column {
            background: var(--p-datatable-row-hover-background) !important;
        }
    }
}
</style>
