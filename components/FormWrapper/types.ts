import type { BooleanSchema, DateSchema, NumberSchema, ObjectSchema, Schema, StringSchema } from 'yup'
import type { UseHddFormOptions } from '../../utils/useHddForm'
import type { AutocompleteInputProps, BaseInputProps, TextInputProps } from '../inputs/types'

export type HddFormProps<TFieldName extends string = string, TFieldType extends FormFieldType = FormFieldType> = {
  fields: HddFormField<TFieldName, TFieldType>[] | TFieldName[]
  summarizeErrorsAtTop?: boolean
  showFieldErrorBelowIt?: boolean
  showFieldErrorsPopover?: boolean
  inlineFields?: boolean
  iconAsAddon?: boolean
  /**
   * Fixed Labels Width in pixels
   */
  fixedLabelWidth?: number
} & Pick<UseHddFormOptions<TFieldName>, 'defaultValidationMode'>
& Pick<BaseInputProps, 'floatingLabel' | 'floatingLabelVariant' | 'infieldTopAlignedLabel' | 'iconAsAddon'>

export function createHddFormProps<TFieldName extends string = string, TFieldType extends FormFieldType = FormFieldType>(props: HddFormProps<TFieldName, TFieldType>): HddFormProps<TFieldName, TFieldType> {
  return props
}

export type FormFieldType =
  'image'
  | 'text'
  | 'select'
  | 'multiple_dropdown'
  | 'checkbox'
  | 'autocomplete'
  | 'date'
  | 'custom'
  | 'number'
  | 'listbox'

export type ValidationModeType = 'onBlur' | 'onValueUpdate' | 'onMount' | 'onSubmit'

type FieldDefaultValue = string | number | boolean | string[] | number[] | boolean[] | (() => any)

export interface FormField<T extends FormFieldType = FormFieldType> {
  name: string
  icon?: string
  label?: string
  type: T
  component?: any
  modelName?: string
  modelValue?: string
  namedModel?: boolean
  useIdModal?: boolean
  noSubmitOnEnter?: boolean
  placeholder?: string
  url?: string
  options?: any[] | ((form: any) => any[])
  binds?: T extends 'autocomplete' ? AutocompleteInputProps : object
  visible?: boolean
  disabled?: boolean
  readonly?: boolean
  validationMode?: ValidationModeType
  entireFormAsModel?: boolean
  defaultValue: FieldDefaultValue
  notes?: string
  rules?: StringSchema | NumberSchema | BooleanSchema | DateSchema | ObjectSchema<any>
}

export interface HddFormField<N extends string = string, T extends FormFieldType = FormFieldType> {
  readonly name: N
  icon?: string
  label?: string
  readonly type?: T
  binds?: T extends 'autocomplete' ? AutocompleteInputProps : T extends 'text' ? TextInputProps : object
  disabled?: boolean
  readonly?: boolean
  validationMode?: ValidationModeType
  defaultValue?: FieldDefaultValue
  notes?: string
  rules?: T extends 'text' | 'autocomplete' ? StringSchema : T extends 'number' ? NumberSchema : T extends 'checkbox' ? BooleanSchema : T extends 'date' ? DateSchema : Schema
  // rules?: Schema
}

export function createField<TName extends string, TType extends FormFieldType>(
  field: HddFormField<TName, TType>,
): HddFormField<TName, TType> {
  return field
}

export type FieldsNames<T extends HddFormField[]> = T[number]['name']
export type FieldValues<T extends HddFormField[]> = { [key in T[number]['name']]: any | undefined }
