import type { UrlObject } from 'HddUiHelpers/components/FormWrapper/types.ts'
import type { ButtonProps } from 'primevue'
import type { StyleValue } from 'vue'

export type ElementClassType =
  | string
  | { [name: string]: boolean }
  | ({ [name: string]: boolean } | string)[]

export interface BaseInputSlots {
  beforeControl: () => any
  afterControl: (slotProps: { value: any }) => any
  addon: () => any
  afterLabel: () => any
  labelText: () => any
  default: () => any
  helper: () => any
}

export interface BaseInputProps {
  autocomplete?: string
  icon?: string
  uniqueId?: string
  modelValue?: any
  label?: string
  labelMinWidth?: MaybeRef<number>
  variant?: string | 'outlined' | 'filled'
  iconAsAddon?: boolean
  onLocalEnterKeyDown?: (event: KeyboardEvent) => any
  floatingLabel?: boolean
  showErrorMessage?: boolean
  /**
   * From Primevue FloatLabel variant, default is over
   */
  floatingLabelVariant?: 'in' | 'on' | 'over'
  /*
   * Ifta = Infield top aligned labels
   * */
  infieldTopAlignedLabel?: boolean
  inputId?: string
  required?: boolean
  showRequiredAsterisk?: boolean
  requiredInLabel?: boolean | undefined
  formName?: string
  name?: string
  error?: string | boolean
  helperText?: string
  placeholder?: string
  autoI18nLabel?: boolean
  disabled?: boolean
  readonly?: boolean
  inline?: boolean
  controlBeforeLabel?: boolean
  labelSingleLine?: boolean
  hideLabelDoubleDots?: boolean
  ignoreLabelSelector?: boolean
  labelClass?: string
  labelStyle?: StyleValue
  iconClass?: string
  inputClass?: ElementClassType
  wrapperClass?: any
  controlWrapperClass?: any
  size?: 'small' | 'large' | string
  buttonAddon?: MaybeRefOrGetter<
    ButtonProps & {
      tooltip?: string
      command?: (event: { event: MouseEvent; value: any; control: any }) => void
      showable?: (event: { value: any; control: any }) => boolean
    }
  >
  controlComponent?: any
}

export type AutocompleteInputProps = {
  url?: string | UrlObject | (() => string | UrlObject)
  c?: { name: string; id: string }[]
  disabled?: boolean
  dropdownMode?: 'current' | 'blank'
  dropdown?: boolean
  options?: any[]
  searchOnFocus?: boolean
  optionLabelProperty?: string
  helperText?: string
  optionIdProperty?: string
  withoutObject?: boolean
  noManualInput?: boolean
  hideCurrentOption?: boolean
  useIdModel?: boolean
  clearable?: boolean
  clearOnDblClick?: boolean
  hideListWhenEmpty?: boolean
  formatter?: (option: any) => string
  inputClass?: ElementClassType
  panelClass?: ElementClassType

  ajaxParams?: { [key: string]: any } | ((params: { [key: string]: any }) => void)
  autoCompleteClass?: ElementClassType
} & BaseInputProps
export type TextInputProps = {
  type?: string
  lazy?: boolean
  filterPattern?: RegExp
} & BaseInputProps
