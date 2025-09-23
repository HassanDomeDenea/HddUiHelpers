import type { ButtonProps } from 'primevue';
import type { BooleanSchema, DateSchema, NumberSchema, ObjectSchema, Schema, StringSchema } from 'yup';
import type { HddFormComposer, UseHddFormOptions } from '../../utils/useHddForm';
import type { AutocompleteInputProps, BaseInputProps, TextInputProps } from '../inputs/types';

export type HddFormValues<T extends string> = Record<T, any>;

export type ServerDataTableColumnPayload = {
  name: string;
  filterField?: string;
  relation?: string;
  sortField?: string;
  source?: ServerDataTableColumnSource;
  sortSource?: ServerDataTableColumnSource;
  filterSource?: ServerDataTableColumnSource;
  morphableTo?: string;
};

export type ServerDataTableColumnSource = 'main' | 'main_count' | 'relation' | 'relation_count' | 'custom' | 'json' | 'json_array' | 'relation_many';

export interface RecordItem {
  id: number | string;
}

export type UrlMethod = 'get' | 'post' | 'put' | 'delete';
export type UrlObject = {
  url: string;
  method: UrlMethod;
};
export type UrlWithParameterFunction = (id: number | string) => UrlObject;

export type HddFormProps<TFieldName extends string = string, TFieldType extends FormFieldType = FormFieldType> = {
  url?: string | UrlObject;
  fields?: HddFormField<TFieldName, TFieldType>[] | TFieldName[];
  urlMethod?: UrlMethod;
  formName?: string;
  fieldsContainerClass?: any;
  submitPayloadTransformer?: (payload: any, form: HddFormComposer) => any;
  size?: 'small' | 'large';
  onSuccess?: (data: any) => void;
  onFailure?: (error: any) => void;
  unifyLabelsWidth?: boolean | number;
  onSubmit?: UseHddFormOptions<TFieldName>['onSubmit'];
  summarizeErrorsAtTop?: boolean;
  showFieldErrorBelowIt?: boolean;
  autoFocusFirstOnMount?: boolean;
  submitOnEnter?: boolean;
  showFieldErrorsPopover?: boolean;
  inlineFields?: boolean;
  iconAsAddon?: boolean;
  showRequiredAsterisk?: boolean;
  submitText?: string | false;
  initialValues?: Record<TFieldName, any>;
  submitIcon?: string;
  submitSeverity?: ButtonProps['severity'];
  /**
   * Fixed Labels Width in pixels
   */
  fixedLabelWidth?: number;
  isEditing?: boolean;
} & Pick<UseHddFormOptions<TFieldName>, 'defaultValidationMode'> &
  Pick<BaseInputProps, 'floatingLabel' | 'floatingLabelVariant' | 'infieldTopAlignedLabel' | 'iconAsAddon'>;

export interface FieldError {
  message: string;
}

export function createHddFormProps<TFieldName extends string = string, TFieldType extends FormFieldType = FormFieldType>(
  props: HddFormProps<TFieldName, TFieldType>,
): HddFormProps<TFieldName, TFieldType> {
  return props;
}

export type FormFieldType =
  | 'image'
  | 'text'
  | 'server_select'
  | 'textarea'
  | 'password'
  | 'select'
  | 'multiselect'
  | 'tree_select'
  | 'checkbox'
  | 'radio'
  | 'switch'
  | 'autocomplete'
  | 'date'
  | 'custom'
  | 'number'
  | 'price'
  | 'math'
  | 'phone'
  | 'listbox'
  | 'divider'
  | 'separator';

export type ValidationModeType = 'onBlur' | 'onValueUpdate' | 'onMount' | 'onSubmit' | 'none';

type FieldDefaultValue = string | number | boolean | string[] | number[] | boolean[] | ((value?: any, row?: any) => any);

export interface FormField<T extends FormFieldType = FormFieldType> {
  name: string;
  icon?: string;
  label?: string;
  type: T;
  component?: any;
  modelName?: string;
  modelValue?: string;
  namedModel?: boolean;
  useIdModal?: boolean;
  noSubmitOnEnter?: boolean;
  placeholder?: string;
  url?: string;
  options?: any[] | ((form: any) => any[]);
  binds?: T extends 'autocomplete' ? AutocompleteInputProps : object;
  visible?: boolean;
  size?: 'small' | 'large';
  disabled?: boolean;
  readonly?: boolean;
  validationMode?: ValidationModeType;
  entireFormAsModel?: boolean;
  defaultValue: FieldDefaultValue;
  notes?: string;
  currency?: string;
  lazy?: boolean;
  rules?: StringSchema | NumberSchema | BooleanSchema | DateSchema | ObjectSchema<any>;
}

export type HddFormField<N extends string = string, T extends FormFieldType = FormFieldType, TRow = any> = {
  readonly name: T extends 'separator' | 'divider' ? undefined : N;
  icon?: string;
  label?: string;
  readonly type?: T;
  binds?: T extends 'autocomplete' ? AutocompleteInputProps : T extends 'text' ? TextInputProps : object;
  disabled?: boolean | ((currentValues: any) => boolean);
  readonly?: boolean | ((currentValues: any) => boolean);
  placeholder?: string;
  options?: MaybeRefOrGetter<any[] | ((form: unknown) => any[])>;
  multiEditable?: boolean;
  addonCallback?: (event: { value: any; row: any }) => string;
  size?: 'small' | 'large';
  validationMode?: ValidationModeType;
  defaultValue?: FieldDefaultValue;
  onValueUpdate?: (event: { value: any; row: any; setValue: (fieldName: string, value: any) => void; fieldRef: any }) => void;
  customEditGetter?: any | ((data: any, row: any) => any);
  notes?: string;
  hidden?: boolean;
  rules?: any;
  autocomplete?: string;
  showable?: MaybeRef<((event: { row: TRow; isEditing: boolean }) => boolean) | boolean>;
  url?: ((event: { row: TRow }) => string | UrlObject) | MaybeRef<string | UrlObject>;
  editable?: MaybeRef<boolean>;
  //rules?:HddFormFieldSchema<T>
  // rules?: Schema
};

export type HddFormFieldSchema<T> = T extends 'text' | 'autocomplete'
  ? StringSchema
  : T extends 'number'
    ? NumberSchema
    : T extends 'checkbox'
      ? BooleanSchema
      : T extends 'date'
        ? DateSchema
        : Schema;

export function createField<TName extends string, TType extends FormFieldType>(field: HddFormField<TName, TType>): HddFormField<TName, TType> {
  return field;
}

export type FieldsNames<T extends HddFormField[]> = T[number]['name'];
export type FieldValues<T extends HddFormField[]> = { [key in T[number]['name']]: any | undefined };

export function isAxiosValidationError(error: any): error is {
  response: { data: { errors: { [key: string]: string[] } } };
} {
  return error.response?.data?.errors;
}
