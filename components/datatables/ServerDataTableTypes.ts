import type { ApiResponseData, ResponseData } from '@/types/laravel_generated';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
  HddFormField,
  RecordItem,
  ServerDataTableColumnSource,
  UrlObject,
  UrlWithParameterFunction,
} from 'HddUiHelpers/components/FormWrapper/types.ts';
import type { LocalListType } from 'HddUiHelpers/utils/dynamicListsUtilities.ts';
import type { BadgeProps, ButtonProps, DialogEmits, DialogProps, MessageProps } from 'primevue';
import type { ColumnProps } from 'primevue/column';
import type { DataTableFilterMeta, DataTableFilterMetaData, DataTableRowReorderEvent } from 'primevue/datatable';
import type { MenuItem } from 'primevue/menuitem';

/*type ObjectKeys<T> = {
    [K in keyof T]: T[K] extends object
        ? K
        : never;
}[keyof T];*/

export type FilterMatchModes = DataTableFilterMetaData['matchMode'];

export type ServerDataTableStandardSort = {
  field: string;
  direction: 'asc' | 'desc';
};
export type ServerDataTableColumnType = 'text' | 'textarea' | 'boolean' | 'date' | 'numeric' | 'price' | 'select' | 'hidden';

export type MenuItemAndButton = Omit<MenuItem, 'icon'> & {
  onlyIconButton?: boolean;
  severity?: ButtonProps['severity'];
  badge?: string | ((row: unknown) => string | null);
  badgeSeverity?: BadgeProps['severity'] | ((row: unknown) => BadgeProps['severity'] | null);
  command?: (...args: any) => any;
  icon?: string | ((...args: any) => string);
};

export interface ServerDataTableProps<T extends RecordItem = RecordItem> {
  columns: (string | ServerDataTableColumn<ServerDataTableColumnType, T>)[] | string;
  fields?: HddFormField[];
  name?: string;
  printingTitle?: string;
  title?: string;
  hasToolsColumn?: boolean;
  inlineEditMode?: 'row' | 'cell' | 'none';
  columnVisibilityButton?: boolean | undefined;
  withLoadingMask?: boolean;
  printable?: boolean;
  firstPageHeaderImageUrl?: string;
  headerImageUrl?: string;
  footerImageUrl?: string;
  printableRows?: boolean | ((row: T) => boolean);
  noMultiSortBadges?: boolean;
  refreshOnActivated?: boolean;
  noBody?: boolean;
  showOnlySortedIcon?: boolean;
  withDataView?: boolean;
  frozenToolsColumn?: boolean;
  allowMultipleToolbarFiltersForSameField?: boolean;
  frozenSelectionColumn?: boolean | undefined;
  toolsColumnProps?: ColumnProps;
  toolsColumnBodyClass?: any;
  openOnClick?: boolean;
  withToolbarFilters?: boolean;
  fixedToolbarFilters?: ServerDataTableToolbarFilter[];
  initialToolbarFilters?: ServerDataTableToolbarFilter[];
  expandOnRowClick?: boolean;
  selectOnRowClick?: boolean;
  multiEditable?: boolean;
  hasPagination?: boolean;
  hasSorts?: boolean;
  primaryKey?: keyof T;
  scrollHeight?: 'flex' | string;
  scrollable?: boolean;
  toolButtonsSize?: 'large' | 'small';
  size?: 'large' | 'small';
  hasRefreshButton?: boolean;
  editable?: boolean;
  creatable?: boolean;
  createButtonLabel?: string;
  createButtonProps?: Partial<ButtonProps>;
  deletable?: boolean;
  openable?: boolean;
  openButtonTitle?: string;
  openButtonIcon?: string;
  infiniteScroll?: boolean;
  itemSize?: number;
  rowHover?: boolean;
  rowClass?: (row: T) => string | string[] | { string: boolean };
  isActiveRow?: (row: T) => boolean;
  isCompact?: boolean;
  useFormForEdit?: boolean;
  refreshAfterFormSubmit?: boolean;
  formProps?: Partial<ServerFormDialogProps>;
  extraContextMenuOptions?: MenuItemAndButton[];
  extraToolAndContextButtons?: MenuItemAndButton[];
  toolbarButtonsSize?: 'large' | 'small';
  showGridLines?: boolean;
  singleDeleteUrl?: UrlWithParameterFunction;
  deleteUrl?: string | UrlObject;
  reorderUrl?: string | UrlObject;
  getReorderScopedValues?: (event: DataTableRowReorderEvent) => Record<string, any>;
  singleEditUrl?: UrlWithParameterFunction;
  editUrl?: string | UrlObject;
  url?: string | UrlObject;
  reorderable?: boolean;
  orderableColumnName?: keyof T;
  withExpansion?: boolean;
  hasExpanderColumn?: boolean;
  oneExpansionAtATime?: boolean;
  hasSequenceColumn?: boolean;
  sequenceColumnProps?: Partial<ColumnProps>;
  printingProps?: Partial<PrintPaperForServerDataTableProps>;
  selectable?: boolean;
  selectAllToolbarButton?: boolean;
  toolbarButtonsOnlyIcons?: boolean;
  withContextMenu?: boolean;
  hasGlobalFilter?: boolean;
  defaultFiltersOperator?: 'and' | 'or';
  defaultShowFilterMatchModes?: boolean;
  defaultColumnMultipleFilters?: boolean;
  selectionMode?: 'single' | 'multiple';
  filterDisplayLayout?: 'menu' | 'row' | 'none';
  globalFilterFields?: string[];
  initialRecords?: any[];
  removableSort?: boolean;
  refreshOnMount?: boolean;
  sortMode?: 'single' | 'multiple';
  initialSortDirection?: 'asc' | 'desc';
  initialSortField?: string;
  initialSorts?: { field: string; direction: 'asc' | 'desc' }[];
  dataProvider?: ServerDataTableDataProvider;
  extraGetDataPayload?: { [key: string]: any };
  initialTotalRecords?: number;
  initialTotalRecordsWithoutFilters?: number;
  defaultDateMatchMode?: FilterMatchModes;
  defaultNumericMatchMode?: FilterMatchModes;
  defaultMatchMode?: FilterMatchModes;
  fixedFilters?: DataTableFilterMeta | Record<string, any>;
  defaultColumnShowFilterAddButton?: boolean;
  defaultColumnShowFilterClearButton?: boolean;
  onRowClick?: (row: T, index: number, original: Event) => void;
  onRowOpen?: (row: T) => void;
  rowDeletable?: (row: T) => boolean;
  rowEditable?: (row: T) => boolean;

  /** Table corners will be rounded. */
  rounded?: boolean;

  /** General color variant of the table. */
  tableSeverity?: 'none' | MessageProps['severity'];

  /** Background color of the header. */
  headerSeverity?: string | ButtonProps['severity'];

  /** Used to transform the incoming response from server*/
  transformResponseData?: (data: ResponseData) => ResponseData & any;

  /**Used to generate a href for open button or contextmenu */
  openButtonUrl?: (record: T) => string;
}

export type ServerDataTableColumnRenderType = 'chip' | 'chips' | 'yesNoIconBadge' | 'tag';

export type ColumnSelectOptions = LocalListType | { name?: string; id?: string | number }[];
//| ({ name?: string; id?: string|number } & { [k: string]: string|number })[]

export interface ServerDataTableColumn<TType extends ServerDataTableColumnType = ServerDataTableColumnType, TRow = Record<string, any>> {
  name?: string;
  field?: string;
  type?: TType;
  relation?: string;
  fullFieldName?: string;
  footer?: string | ((records: TRow[]) => string | null);
  frozen?: 'start' | 'end';
  source?: ServerDataTableColumnSource;
  filterSource?: ServerDataTableColumnSource;
  sortSource?: ServerDataTableColumnSource;
  selectFilterHeader?: string;
  globalFilter?: boolean;
  isMultiSelect?: boolean;
  label?: string;
  printLabel?: string;
  formatter?: string | ((value: any, row: TRow, attributeName: string) => string);
  showable?: MaybeRef<boolean | string> | ((event: { row: TRow }) => boolean | string);
  sortable?: boolean;
  disabled?: boolean;
  cellHeadFilterable?: boolean;
  inlineEditable?: boolean;
  auditHistory?: boolean;
  filterable?: boolean;
  dateFormat?: 'YYYY-MM-DD' | 'YYYY-MM-DD hh:mmA' | 'YYYY-MM-DD HH:mm' | 'YYYY-MM-DD HH:mm:ss' | 'date' | 'datetime';
  printable?: boolean;
  visible?: boolean;
  visibilityControl?: boolean;
  hiddenButCanBeVisible?: boolean;
  renderType?: ServerDataTableColumnRenderType;
  renderTypeProps?: MaybeRefOrGetter<((event: { value: any; text: any; row: TRow; options: ColumnSelectOptions }) => object) | object>;
  currency?: TType extends 'numeric' | 'price' ? string | boolean : never;
  filterCurrency?: TType extends 'numeric' | 'price' ? string : never;
  filterInputProps?: object;
  initialFilterMatchMode?: FilterMatchModes;
  filterCheckboxLabel?: string;
  filterField?: string;
  sortField?: string;
  sortRelation?: string;
  multipleFilters?: boolean;
  showFilterMatchModes?: boolean;
  showFilterApplyButton?: boolean;
  showFilterAddButton?: boolean;
  showFilterClearButton?: boolean;
  editable?: boolean;
  creatable?: boolean;
  inForm?: boolean;
  formProps?: HddFormField;
  multiEditable?: boolean;
  bodyClass?:
    | string
    | string[]
    | {
        string: boolean;
      }
    | ((row: TRow, column: ServerDataTableColumn<TType>) => string | string[] | { string: boolean });
  bodyStyle?: any;
  headerClass?: any;
  headerStyle?: any;
  selectOptions?: ColumnSelectOptions;
  selectOptionsKeyed?: { [k in string]: string };
  emptyValuePlaceholder?: string;
  selectValueProperty?: string;
  selectLabelProperty?: string;
  booleanCheckedValue?: TType extends 'boolean' ? string : never;
  booleanUncheckedValue?: TType extends 'boolean' ? string : never;
  morphableTo?: string;
}

export interface ServerDataTableToolbarFilterValue {
  id?: string;
  field: string;
  value: any;
  matchMode: FilterMatchModes;
  isFixed?: boolean;
}

export interface ServerDataTableToolbarFilterWrapper {
  id?: string;
  operator: 'and' | 'or';
  isFixed?: boolean;
  fields: ServerDataTableToolbarFilter[];
}

export type ServerDataTableToolbarFilter = ServerDataTableToolbarFilterValue | ServerDataTableToolbarFilterWrapper;

export function isToolbarFilterWrapper(filter: ServerDataTableToolbarFilter): filter is ServerDataTableToolbarFilterWrapper {
  return 'operator' in filter && 'fields' in filter;
}

export function isToolbarFilterValue(filter: ServerDataTableToolbarFilter): filter is ServerDataTableToolbarFilterValue {
  return 'field' in filter && 'value' in filter;
}

export interface ServerDataTableDataProviderEvent {
  page: number;
  perPage: number;
  sorts: ServerDataTableStandardSort[];
  filters: ServerDataTableToolbarFilter;
}

export type ServerDataTableDataProvider = (event: ServerDataTableDataProviderEvent) => Promise<ServerDataTablePaginationResponse>;

export interface ServerDataTablePaginationResponse {
  data: any[];
  total_records: number;
  per_page: number;
  current_page: number;
}

export interface ServerFormDialogProps<TRecord extends RecordItem = RecordItem> {
  url?: UrlObject | UrlWithParameterFunction | string;
  createUrlMethod?: 'post' | 'put';
  singleEditUrl?: UrlWithParameterFunction;
  focusFieldOnShown?: string;
  editUrl?: string | UrlObject | UrlWithParameterFunction;
  deleteUrl?: string | UrlObject | UrlWithParameterFunction;
  autoAppendIdToEditUrl?: boolean;
  title?: string;
  subtitle?: string;
  popupTarget?: MaybeRefOrGetter<HTMLElement>;
  submitPayloadTransformer?: (payload: object) => object;
  autoLabelsWidth?: boolean | number;
  closeOnEsc?: MaybeRef<boolean>;
  fieldsContainerClass?: any;
  createRecordHeader?: string;
  editRecordHeader?: string;
  deleteRecordHeader?: string;
  deleteRecordMessage?: string;
  customDefaultValuesOnCreate?: { [key: string]: any };
  customDefaultValuesOnEdit?: { [key: string]: any };
  dialogContentStyle?: any;
  dialogClass?: any;
  successMessageTitle?: string;
  successMessageText?: string;
  submitSeverity?: ButtonProps['severity'];
  submitText?: string;
  submitIcon?: string;
  primaryKey?: string | number;
  inlineFields?: boolean;
  size?: 'small' | 'large' | string;
  columns?: ServerDataTableColumn[];
  fields?: HddFormField[];
  keepFormOpenAfterCreate?: boolean;
  focusFirstOnEdit?: boolean;
  focusFirstOnCreate?: boolean;
  onShown?: () => void;
  onHidden?: () => void;
  onVisible?: (isVisible: boolean) => void;
  onSubmitted?: (row: TRecord | TRecord[] | (string | number)[], type: 'create' | 'update') => void;
}

export type DynamicDialogRefInjectionType = ComputedRef<{
  close: (params?: any) => void;
  content: Component;
  data: any;
  key: string;
  options: { props: DialogProps; emits: DialogEmits; onClose: () => void };
  visible: boolean;
}>;

export interface PrintPaperForServerDataTableProps<TRecord extends RecordItem = RecordItem> {
  checkColumnIsVisible: (column: ServerDataTableColumn) => boolean;
  columns: ServerDataTableColumn[];
  sorts: ServerDataTableStandardSort[];
  mappedColumns: ServerDataTableColumn[];
  getColumnBody: (row: TRecord, column: ServerDataTableColumn) => string;
  getData: (
    specificPerPage?: number | null,
    specificPage?: number | null,
    requestConfig?: AxiosRequestConfig,
  ) => Promise<AxiosResponse<ApiResponseData<ResponseData>>>;
  firstPageHeaderImageUrl?: MaybeRefOrGetter<string | null>;
  headerImageUrl?: MaybeRefOrGetter<string | null>;
  footerImageUrl?: MaybeRefOrGetter<string | null>;
  hasSequenceColumn?: boolean;
  showPageCounter?: boolean;
  showCurrentPrintTime?: boolean;
  primaryKey?: keyof TRecord;
  printDirection?: 'ltr' | 'rtl';
  records: MaybeRef<TRecord[]>;
  extraData: MaybeRef;
  toolbarFilters: ServerDataTableToolbarFilterWrapper;
  filters: DataTableFilterMeta & { _global: DataTableFilterMetaData };
  title?: string;
}
