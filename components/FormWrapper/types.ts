import type { ButtonProps } from 'primevue';
import type { BooleanSchema, DateSchema, NumberSchema, ObjectSchema, Schema, StringSchema } from 'yup';
import type { UseHddFormOptions } from '../../utils/useHddForm';
import type { AutocompleteInputProps, BaseInputProps, TextInputProps } from '../inputs/types';

export type HddFormValues<T extends string> = Record<T, any>;

export type HddFormProps<TFieldName extends string = string, TFieldType extends FormFieldType = FormFieldType> = {
    url?: string | { url: string; method: 'get' | 'post' | 'put' | 'delete' };
    fields?: HddFormField<TFieldName, TFieldType>[] | TFieldName[];
    urlMethod?: 'get' | 'post' | 'put' | 'delete';
    formName?: string;
    size?: "small" | "large";
    onSuccess?: (data: any) => void;
    unifyLabelsWidth?: boolean | number;
    onSubmit?: UseHddFormOptions<TFieldName>['onSubmit'];
    summarizeErrorsAtTop?: boolean;
    showFieldErrorBelowIt?: boolean;
    submitOnEnter?: boolean;
    showFieldErrorsPopover?: boolean;
    inlineFields?: boolean;
    iconAsAddon?: boolean;
    showRequiredAsterisk?: boolean;
    submitText?: string | false;
    submitIcon?: string;
    submitSeverity?: ButtonProps['severity'];
    /**
     * Fixed Labels Width in pixels
     */
    fixedLabelWidth?: number;
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
    | 'password'

    | 'select'
    | 'multiple_dropdown'
    | 'checkbox'
    | 'autocomplete'
    | 'date'
    | 'custom'
    | 'number'
    | 'listbox';

export type ValidationModeType = 'onBlur' | 'onValueUpdate' | 'onMount' | 'onSubmit' | 'none';

type FieldDefaultValue = string | number | boolean | string[] | number[] | boolean[] | (() => any);

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
    rules?: StringSchema | NumberSchema | BooleanSchema | DateSchema | ObjectSchema<any>;
}

export interface HddFormField<N extends string = string, T extends FormFieldType = FormFieldType> {
    readonly name: N;
    icon?: string;
    label?: string;
    readonly type?: T;
    binds?: T extends 'autocomplete' ? AutocompleteInputProps : T extends 'text' ? TextInputProps : object;
    disabled?: boolean;
    readonly?: boolean;
    size?: 'small' | 'large';
    validationMode?: ValidationModeType;
    defaultValue?: FieldDefaultValue;
    notes?: string;
    hidden?: boolean;
    rules?: any;
    autocomplete?: string;
    //rules?:HddFormFieldSchema<T>
    // rules?: Schema
}

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
