<script lang="ts" setup>
import type {
    DataTableFilterMeta,
    DataTableFilterMetaData,
    DataTableOperatorFilterMetaData,
    DataTablePageEvent,
    DataTableRowSelectAllEvent,
    DataTableRowSelectEvent,
    DataTableRowUnselectAllEvent,
    DataTableRowUnselectEvent,
    DataTableSelectAllChangeEvent,
    DataTableSortMeta
} from 'primevue/datatable';
import { useDebounceFn } from '@vueuse/core';
import { get, reduce, replace, set, startCase } from 'lodash-es';
import moment from 'moment';
import { computed, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import YesNoCheckbox from './YesNoCheckbox.vue';
import { HddUiHelpersSymbol, useHddUiHelpers } from 'HddUiHelpers/plugins/HddUiHelpers';
import { useToast } from 'primevue/usetoast';

const {
    dataProvider,
    filterDisplayLayout = 'menu',
    removableSort = true,
    initialTotalRecords = 0,
    sortMode = 'multiple',
    initialRecords = null,
    columns,
    hasPagination = true,
    primaryKey = 'id',
    initialSortDirection,
    initialSortField,
    initialSorts,
    fixedFilters,
    refreshOnMount = true,
    defaultDateMatchMode = 'dateIs',
    defaultNumericMatchMode = 'equals',
    defaultMatchMode = 'contains',
    defaultFiltersOperator = 'and',
    defaultShowFilterMatchModes = true,
    defaultColumnMultipleFilters = true,
    defaultColumnShowFilterAddButton = true,
    defaultColumnShowFilterClearButton = true,
    url
} = defineProps<ServerDataTableProps>();
// const primevue = usePrimeVue()
onMounted(() => {
    if (refreshOnMount) {
        refresh();
    }
});

export type FilterMatchModes = DataTableFilterMetaData['matchMode']
// eslint-disable-next-line ts/consistent-type-definitions
export type ServerDataTableStandardSort = {
    field: string
    direction: 'asc' | 'desc'
}

type ServerDataTableColumnType = 'text' | 'boolean' | 'date' | 'numeric' | 'select'

export interface ServerDataTableColumn<TType extends ServerDataTableColumnType = ServerDataTableColumnType> {
    name?: string;
    field: string;
    label?: string;
    formatter: string | ((value: any, row: any) => string);
    sortable?: boolean;
    filterable?: boolean;
    type?: TType;
    currency?: TType extends 'numeric' ? (string | boolean) : never;
    filterInputProps?: object;
    initialFilterMatchMode?: FilterMatchModes;
    filterCheckboxLabel?: string;
    filterField?: string;
    multipleFilters?: boolean;
    showFilterMatchModes?: boolean;
    showFilterApplyButton?: boolean;
    showFilterClearButton?: boolean;
    bodyClass?: any;
    bodyStyle?: any;
    headerClass?: any;
    headerStyle?: any;
    selectOptions?: {
            list: { name: string, id: string }[]
            object: { [k in string]: string }
        }
        | ({ name?: string, id?: string } & { [k: string]: string })[];
    selectOptionsKeyed?: { [k in string]: string };
    emptyValuePlaceholder?: string;
    selectValueProperty?: string;
    selectLabelProperty?: string;
    booleanCheckedValue?: TType extends 'boolean' ? string : never;
    booleanUncheckedValue?: TType extends 'boolean' ? string : never;
}

export interface ServerDataTableFilterPayloadFieldType {
    field: string;
    value: any;
    matchMode?: FilterMatchModes;
}

export type ServerDataTableFilterPayload = ServerDataTableFilterPayloadFieldType | {
    operator: 'and' | 'or'
    fields: ServerDataTableFilterPayload[]
}

export interface ServerDataTableDataProviderEvent {
    page: number;
    perPage: number;
    sorts: ServerDataTableStandardSort[];
    filters: ServerDataTableFilterPayload;
}

export type ServerDataTableDataProvider = (event: ServerDataTableDataProviderEvent) => Promise<ServerDataTablePaginationResponse>

export interface ServerDataTablePaginationResponse {
    data: any[];
    total_records: number;
    per_page: number;
    current_page: number;
}

export interface ServerDataTableProps {
    hasPagination?: boolean;
    primaryKey?: string;
    url?: string,
    hasSelection?: boolean;
    defaultFiltersOperator?: 'and' | 'or';
    defaultShowFilterMatchModes?: boolean;
    defaultColumnMultipleFilters?: boolean;
    selectionMode?: 'single' | 'multiple';
    filterDisplayLayout?: 'menu' | 'row';
    columns: (string | ServerDataTableColumn)[] | { [p: string]: any } | '*' | string;
    globalFilterFields?: string[];
    initialRecords?: any[];
    removableSort?: boolean;
    refreshOnMount?: boolean;
    sortMode?: 'single' | 'multiple';
    initialSortDirection?: 'asc' | 'desc';
    initialSortField?: string;
    initialSorts?: { field: string, direction: 'asc' | 'desc' }[];
    dataProvider?: ServerDataTableDataProvider;
    initialTotalRecords?: number;
    defaultDateMatchMode?: FilterMatchModes;
    defaultNumericMatchMode?: FilterMatchModes;
    defaultMatchMode?: FilterMatchModes;
    fixedFilters?: DataTableFilterMeta;
    defaultColumnShowFilterAddButton?: boolean;
    defaultColumnShowFilterClearButton?: boolean;
}

const { t, locale } = useI18n();

const records = ref(initialRecords);
const totalRecords = ref(initialTotalRecords);
const selectedRecords = ref([]);
const perPage = defineModel<number>('perPage', { default: 25 });
const firstRowIndex = defineModel<number>('firstRowIndex', { default: 0 });
const currentPage = defineModel('currentPage', { default: 1 });
const isLoading = ref(false);
const areAllSelected = ref(false);

// Providers

const HddUiHelpers = useHddUiHelpers();
const toast = useToast();

// Columns

const mappedColumns = computed<ServerDataTableColumn[]>(() => {
    let toRenderColumnsList: (string | ServerDataTableColumn)[] = [];
    if (typeof columns === 'string') {
        toRenderColumnsList = columns === '*' && records.value?.length ? Object.keys(records.value[0]) : [columns];
    } else if (typeof columns === 'object') {
        if (Array.isArray(columns)) {
            toRenderColumnsList = columns;
        } else {
            toRenderColumnsList = Object.keys(columns);
        }
    }
    return (toRenderColumnsList).map((column) => {
        return typeof column === 'string' ? { name: column, field: column, label: column } : column;
    });
});

function getColumnName(column: ServerDataTableColumn): string {
    return column.name ?? column.field;
}

function getColumnSlotName(column: ServerDataTableColumn): string {
    return replace(column.name ?? column.field, '.', '_');
}

const mappedColumnsListToObject = computed(() => {
    const obj: { [k1 in string]: { [k2 in string]: string } } = {};
    mappedColumns.value.forEach((column) => {
        const name = column.field ?? column.name;
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
    let fieldName = column.field;
    if (typeof column.formatter === 'string') {
        fieldName = column.formatter;
    }
    const value = get(rowData, fieldName);
    if (typeof column.formatter === 'function') {
        return column.formatter(value, rowData);
    }
    if (column.type === 'select') {
        let result = mappedColumnsListToObject.value[fieldName]?.[value] || value;
        if (!result && column.emptyValuePlaceholder) {
            result = `<span class="italic text-muted">${column.emptyValuePlaceholder}</span>`;
        }
        return result;
    }
    if (column.type === 'boolean') {
        let result = value === true ? t('Yes') : (value === false ? t('No') : '');
        if (!result) {
            result = `<span class="italic text-muted">${column.emptyValuePlaceholder ?? 'null'}</span>`;
        }
        return result;
    }

    return value;
}

function getColumnTitle(column: ServerDataTableColumn): string {
    return column.label ?? t(startCase(column.name ?? column.field));
}

// Selections:
function onSelectAllChange(event: DataTableSelectAllChangeEvent) {
    //
}

function onRowSelect(event: DataTableRowSelectEvent) {
}

function onRowUnselect(event: DataTableRowUnselectEvent) {
}

function onRowSelectAll(event: DataTableRowSelectAllEvent) {
}

function onRowUnselectAll(event: DataTableRowUnselectAllEvent) {
}

// Sorting

function sortDirectionToOrder(direction?: 'asc' | 'desc'): 1 | -1 | undefined {
    return direction === 'asc' ? 1 : (direction === 'desc' ? -1 : undefined);
}

const globalSortable = computed(() => {
    return true;
});
const multiSorts = ref<DataTableSortMeta[] | undefined>(initialSorts?.map(e => ({
    field: e.field,
    order: sortDirectionToOrder(e.direction)
})));
const sortField = ref(initialSortField);
const sortOrder = ref<-1 | 1 | undefined>(sortDirectionToOrder(initialSortDirection));

const mappedSorts = computed<ServerDataTableStandardSort[]>(() => {
    if (sortMode === 'single' && sortField.value) {
        return [
            { field: sortField.value, direction: sortOrder.value === -1 ? 'desc' : 'asc' }
        ];
    } else if (sortMode === 'multiple' && multiSorts.value?.length) {
        return multiSorts.value.map((item: DataTableSortMeta) => ({
            field: item.field,
            direction: item.order === -1 ? 'desc' : 'asc'
        } as ServerDataTableStandardSort));
    }

    return [];
});

async function onSort() {
    await refresh();
}

// Filters

const matchModesByType: { [k in ServerDataTableColumn['type'] & string]: FilterMatchModes[] } = {
    text: [
        'startsWith',
        'contains',
        'notContains',
        'endsWith',
        'equals',
        'notEquals'
    ],
    numeric: [
        'equals',
        'notEquals',
        'lt',
        'lte',
        'gt',
        'gte'
    ],
    date: [
        'dateIs',
        'dateIsNot',
        'dateBefore',
        'dateAfter'
    ],
    boolean: [
        'isTrue',
        'isFalse',
        'isNull',
        'isNotNull'
    ]
};

const columnFilterMatchModeOptions = computed(() => {
    return {
        text: [
            { label: t('Starts with'), value: 'startsWith' },
            { label: t('Contains'), value: 'contains' },
            { label: t('Contains words'), value: 'containsAll' },
            { label: t('Contains any word'), value: 'containsAny' },
            { label: t('Not contains'), value: 'notContains' },
            { label: t('Ends with'), value: 'endsWith' },
            { label: t('Equals'), value: 'equals' },
            { label: t('Not equals'), value: 'notEquals' }
        ],
        numeric: [
            { label: t('Equals'), value: 'equals' },
            { label: t('Not equals'), value: 'notEquals' },
            { label: t('Less than'), value: 'lt' },
            { label: t('Less than or equals'), value: 'lte' },
            { label: t('Greater than or equals'), value: 'gt' },
            { label: t('Greater than or equals'), value: 'gte' },
            { label: t('Between'), value: 'between' },
            { label: t('Not Between'), value: 'notBetween' }
        ],
        date: [
            { label: t('Date is'), value: 'dateIs' },
            { label: t('Date is not'), value: 'dateIsNot' },
            { label: t('Date before'), value: 'dateBefore' },
            { label: t('Date after'), value: 'dateAfter' },
            { label: t('Date between'), value: 'dateBetween' },
            { label: t('Date not between'), value: 'dateNotBetween' }
        ],
        boolean: [
            { label: t('True value'), value: 'isTrue' },
            { label: t('False value'), value: 'isFalse' },
            { label: t('Not specified'), value: 'isNull' },
            { label: t('Specified'), value: 'isNotNull' }
        ]
    };
});

const filters = ref<DataTableFilterMeta>({});
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
    for (const key in filters.value) {
        if (fixedFilters?.[key]) {
            continue;
        }
        const filter = filters.value[key];
        if (isMultipleFilterType(filter)) {
            const index = filter.constraints?.findIndex(x => x.value);
            if (index > -1)
                return true;
        } else if (typeof filter === 'string') {
            return filters.value[key];
        } else {
            if (filter?.value)
                return true;
        }
    }
    return false;
});

function clearFilters() {
    createFilters();
}

function getDefaultMatchModeForColumnType(columnType?: ServerDataTableColumnType) {
    let matchMode;
    switch (columnType) {
        case 'date':
            matchMode = defaultDateMatchMode;
            break;
        case 'numeric':
            matchMode = defaultNumericMatchMode;
            break;
        default:
            matchMode = defaultMatchMode;
    }
    return matchMode;
}

function createFilters() {
    filters.value = reduce(mappedColumns.value, (carry: DataTableFilterMeta, column) => {
        let matchMode;
        if (column.initialFilterMatchMode) {
            matchMode = column.initialFilterMatchMode;
        } else {
            matchMode = getDefaultMatchModeForColumnType(column.type);
        }
        const tempFalse = false;
        if (column.multipleFilters === false && tempFalse) {
            carry[column.filterField ?? column.name ?? column.field] = {
                value: null,
                matchMode
            };
        } else {
            carry[column.filterField ?? column.name ?? column.field] = {
                operator: 'and',
                constraints: [{ value: null, matchMode }]
            };
        }
        return carry;
    }, {
        _global: {
            value: '',
            matchMode: 'contains'
        }
    });
}

watch(() => mappedColumns.value.map(e => e.filterField ?? e.name ?? e.field).join(','), (val, oldValue) => {
    if (val !== oldValue) {
        createFilters();
    }
}, {
    immediate: true,
    deep: true
});

const filtersListOfPrimeVueColumnFilters = computed(() => {
    const list: ServerDataTableFilterPayload = {
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

// Pagination

async function onPageChange(event: DataTablePageEvent) {
    currentPage.value = event.page + 1;
    await refresh();
}

// Function to convert the ServerDataTableDataProviderEvent into JSON API format

async function refresh() {
    isLoading.value = true;
    return new Promise<void>((resolve) => {

        if (dataProvider) {
            dataProvider({
                page: currentPage.value,
                perPage: perPage.value,
                sorts: mappedSorts.value,
                filters: filtersListOfPrimeVueColumnFilters.value
            })
                .then((response: ServerDataTablePaginationResponse) => {
                    records.value = response.data;
                    totalRecords.value = response.total_records;
                    perPage.value = response.per_page || perPage.value;
                    firstRowIndex.value = ((response.current_page - 1) * perPage.value);
                    resolve();
                });
        } else if (HddUiHelpers.axiosInstance && url) {
            HddUiHelpers.axiosInstance.get(url)
                .then((response) => {
                    console.log(response);
                }).catch(error => {
                toast.add({
                    summary: t('Error Occurred'),
                    detail:error.response.data.message ?? null,
                    severity: 'error',
                    life: 3000,
                    group: 'errors'
                });
            })
                .finally(() => {
                    resolve();
                });
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
</script>

<template>
    <div>
        <!--    <pre>{{ filtersListOfPrimeVueColumnFilters }}</pre> -->
        <!--    <pre>{{ filters }}</pre> -->
        <DataTable
            v-model:first="firstRowIndex"
            v-model:filters="filters"
            v-model:selection="selectedRecords"
            v-model:rows="perPage"
            v-model:multi-sort-meta="multiSorts"
            v-model:sort-field="sortField"
            v-model:sort-order="sortOrder"
            :value="records"
            :lazy="true"
            :data-key="primaryKey || undefined"
            :paginator="hasPagination"
            :rows-per-page-options="[5, 10, 25, 50, 100, 500, 1000, -1]"
            :total-records="totalRecords"
            :loading="isLoading"
            :filter-display="filterDisplayLayout"
            :select-all="areAllSelected"
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
        >
            <template #header>
                <div class="flex justify-between">
                    <div>
                        <InputGroup>
                            <IconField>
                                <InputIcon class="i-mdi:magnify" />
                                <InputText
                                    v-model="globalFilterValue" :placeholder="t('Search')"
                                    @value-change="lazyRefresh"
                                />
                            </IconField>
                            <Button
                                v-if="hasFilters"
                                v-tooltip.top="t('Clear Filters')" type="button" icon="i-mdi-filter-off w-8"
                                :label="t('Clear')"
                                outlined
                                @click="clearFilters()"
                            />
                        </InputGroup>
                    </div>
                    <div>
                        <Button
                            v-tooltip.top="t('Clear Filters')"
                            severity="info"
                            :loading="isLoading" type="button" icon="i-mdi:refresh" outlined
                            @click="refresh()"
                        />
                    </div>
                </div>
            </template>
            <Column v-if="hasSelection" :selection-mode="selectionMode" header-style="width: 3rem" />
            <template v-for="column in mappedColumns" :key="column.name">
                <Column
                    :field="column.field" :header="getColumnTitle(column)"
                    :filter-field="column.filterField ?? column.name ?? column.field"
                    :data-type="column.type ?? 'text'"
                    :sortable="column.sortable ?? globalSortable"
                    :show-filter-operator="!['boolean'].includes(column.type ?? 'text') && (column.multipleFilters ?? defaultColumnMultipleFilters)"
                    :show-filter-match-modes="column.showFilterMatchModes ?? defaultShowFilterMatchModes"
                    :max-constraints="Number.POSITIVE_INFINITY"
                    :show-add-button="!['boolean'].includes(column.type ?? 'text') && (column.multipleFilters ?? defaultColumnMultipleFilters)"
                    :show-apply-button="!['boolean'].includes(column.type ?? 'text') && (column.showFilterApplyButton ?? defaultColumnShowFilterAddButton)"
                    :show-clear-button="!['boolean'].includes(column.type ?? 'text') && (column.showFilterClearButton ?? defaultColumnShowFilterClearButton)"
                    :filter-match-mode="column.initialFilterMatchMode ?? getDefaultMatchModeForColumnType(column.type)"
                    :filter-match-mode-options="columnFilterMatchModeOptions[column.type ?? 'text']"
                    :body-class="column.bodyClass"
                    :body-style="column.bodyStyle"
                    :header-class="column.headerClass"
                    :header-style="column.headerStyle"
                >
                    <template #body="{ data }">
                        <slot :name="`${getColumnSlotName(column)}ColumnBody`">
                            <div v-html="getColumnBody(data, column)" />
                        </slot>
                    </template>
                    <template
                        v-if=" column.filterable ?? defaultColumnFilterable"
                        #filter="{ filterModel, filterCallback }"
                    >
                        <slot
                            :name="`${getColumnSlotName(column)}ColumnFilter`"
                            :item="{ filterModel, filterCallback }"
                        >
                            <InputText
                                v-if="!column.type || column.type === 'text'"
                                v-bind="column.filterInputProps ?? {}"
                                v-model="filterModel.value"
                                :title="t('Hit enter key to filter')"
                                type="text"
                                :placeholder="`${t('Search by')} ${(column.label || $t(startCase(column.name ?? column.field)).toLowerCase())} `"
                                @keydown.enter="filterCallback()"
                            />
                            <DatePicker
                                v-if="column.type === 'date'"
                                :model-value="filterModel.value ? new Date(filterModel.value) : null"
                                date-format="yy-mm-dd"
                                placeholder="yyyy-mm-dd"
                                @update:model-value="(filterModel.value = $event ? moment($event as Date).format() : null) && filterCallback()"
                            />
                            <InputNumber
                                v-if="column.type === 'numeric' && !['between', 'notBetween'].includes(filterModel.matchMode)"
                                v-model.number="filterModel.value"
                                v-bind="column.filterInputProps ?? {}"
                                @keydown.enter="filterCallback()"
                            />
                            <template
                                v-if="column.type === 'numeric' && ['between', 'notBetween'].includes(filterModel.matchMode)"
                            >
                                <div v-for="i in [0, 1]" :key="i">
                                    <div>{{ i === 0 ? 'From' : 'To' }}:</div>
                                    <InputNumber
                                        :model-value="(filterModel.value || [])[i]"
                                        v-bind="column.filterInputProps ?? {}"
                                        @update:model-value="filterModel.value = [i === 0 ? $event : (filterModel.value || [])[0], i === 1 ? $event : (filterModel.value || [])[1]]"
                                    />
                                </div>
                            </template>

                            <template v-if="column.type === 'boolean'">
                                <div class="my-1 underline underline-offset-4">
                                    {{ t('Filter By') }}:
                                </div>
                                <YesNoCheckbox
                                    v-model="filterModel.value"
                                    class="ms-4"
                                    label-position="start"
                                    :label="getColumnTitle(column)"
                                    with-status-label
                                    :checked-label="column.booleanCheckedValue"
                                    :un-checked-label-label="column.booleanUncheckedValue"
                                    @change="filterCallback()"
                                />
                            </template>
                        </slot>
                    </template>
                </Column>
            </template>
        </DataTable>
    </div>
</template>
