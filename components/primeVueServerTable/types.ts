import type {DataTableSortMeta} from 'primevue/datatable'
import type {FormField} from '../FormWrapper/types'

export type ColumnFetchType =
    'main'
    | 'main_count'
    | 'relation'
    | 'relation_count'
    | 'custom'
    | 'json'
    | 'json_array'
    | 'relation_many'

// Types
export interface ColumnType<R extends RecordItem = RecordItem> {
    name: string
    type?: 'date' | 'numeric' | 'text' | 'hidden' | 'select' | 'boolean'
    isMultiSelect?: boolean
    selectOptions?: { name: string, id: string }[] | {
        list: { name: string, id: string }[],
        object: { [k in string]: string }
    }
    selectOptionsKeyed?: { [k in string]: string }
    emptyValuePlaceholder?: string
    selectValueProperty?: string
    selectLabelProperty?: string
    bodyClass?: string
    bodyClassFunction?: (value: any) => string | string[]
    formatter?: string | ((data: any, row: R) => string)
    source?: ColumnFetchType
    header?: string
    filterCheckboxLabel?: string
    selectFilterHeader?: string
    sortable?: boolean
    global?: boolean
    visible?: boolean
    html?: boolean
    filterField?: string
    sortField?: string
    multipleFilters?: boolean
    filterable?: boolean
    showFilterMatchModes?: boolean
    showFilterAddButton?: boolean
    showFilterApplyButton?: boolean
    showFilterClearButton?: boolean
    filterMatchMode?: FilterMatchModeType
}

export type FilterMatchModeType =
    'startsWith'
    | 'contains'
    | 'dateIs'
    | 'dateIsNot'
    | 'dateBefore'
    | 'dateAfter'
    | 'containsAny'
    | 'containsAll'

export interface RecordItem {
    id: number | string
}

export interface FilterType {
    value: string | null
    matchMode: FilterMatchModeType
}

export interface MultipleFilterType {
    operator: 'and' | 'or'
    constraints: FilterType[]
}

export type PrimeVueServerTableFormField = FormField & {
    editable?: boolean,
    multiEditable?: boolean,
    onlyEdit?: boolean,
    default?: boolean | string | number | (() => unknown),
    getter?: string | ((any) => unknown)
}

export interface RequestDataPayloadType {
    first: number
    perPage: number
    sorts?: DataTableSortMeta[]
    filters: FiltersList
    fixedFilters: Partial<FiltersList>
    groupedFilters?: GroupedFilterConstraints
    fields: FieldsOptionsList[]
    globalFilters?: string[]
    includes?: string[]
}

export interface GroupedFilterConstraints<T extends boolean = false> {
    isGroup?: T
    operator?: 'and' | 'or'
    constraints?: T extends true ? GroupedFilterConstraints[] : never
    column: T extends false ? string : never
    value: T extends false ? any : never
    matchMode: T extends false ? FilterMatchModeType : never
}

export interface FiltersList {
    global: FilterType

    [name: string]: FilterType | MultipleFilterType
}

export type FieldsOptionsList = {
    name: string,
    source: ColumnFetchType,
    sortSource?: ColumnFetchType,
    filterSource?: ColumnFetchType
}[]

export interface GetRecordsResponseType {
    success: boolean
    data: {
        data: any
        total: any
        total_without_filters: any
    }

}

export interface RecordsServiceType {
    getRecords: (payload: RequestDataPayloadType, options?: {
        url?: string
        routeName?: string
    }) => Promise<GetRecordsResponseType>
    deleteRecord: (id: number | string, options?: { url?: string, routeName?: string }) => Promise<null>
    deleteRecordsMulti: (ids: (number | string)[], options?: { url?: string, routeName?: string }) => Promise<null>
}

export const FilterMatchMode = {
    // 'startsWith' | 'contains' | 'notContains' | 'endsWith' | 'equals' | 'notEquals' | 'in' | 'lt' | 'lte' | 'gt' | 'gte' | 'between' | 'dateIs' | 'dateIsNot' | 'dateBefore' | 'dateAfter'
    CONTAINS_ANY: 'containsAny',
    CONTAINS_All: 'containsAll',
    CONTAINS: 'contains',
    DATE_IS: 'dateIs',
    EQUALS: 'equals',
}
