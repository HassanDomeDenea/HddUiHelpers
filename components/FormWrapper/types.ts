import type {AutocompleteInputProps} from '../inputs/types'

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
    | 'listbox';

export interface FormField<T extends FormFieldType = FormFieldType> {
    name: string
    icon?: string
    label?: string
    type: FormFieldType
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
    entireFormAsModel?: boolean
    notes?: string
}
