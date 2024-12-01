export type classType = string | object | { [name: string]: boolean } | ({ [name: string]: boolean } | string) []
export interface BaseInputProps {
  icon?: string
  label?: string
  name?: string
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
  iconClass?: string
  controlWrapperClass?: any
}
export type AutocompleteInputProps = {
  url?: string
  options?: { name: string, id: string }[]
  disabled?: boolean
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
  inputClass?: classType
  panelClass?: classType
  ajaxParams?: { [key: string]: any } | ((params: { [key: string]: any }) => void)
  autoCompleteClass?: classType
} & BaseInputProps
