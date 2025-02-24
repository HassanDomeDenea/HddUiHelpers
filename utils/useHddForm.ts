import type { WatchHandle } from 'vue'
import type { FieldError, FormFieldType, HddFormField, ValidationModeType } from '../components/FormWrapper/types'
import { flatten } from 'lodash-es'
import cloneDeep from 'lodash/cloneDeep'
import filter from 'lodash/filter'
import map from 'lodash/map'
import { ref } from 'vue'
import { ValidationError } from 'yup'

export interface UseHddFormOptions<T extends string> {
  fields?: (HddFormField<T> | T)[]
  values?: Record<T, any>
  defaultValidationMode?: ValidationModeType
  watchFieldValues?: boolean
  /**
   * Watch Values Deeply To trigger dirty, touched, and validation onValueUpdate
   * @default false
   */
  watchFieldValuesDeep?: boolean
  onSubmit?: (values: Record<T, any>, context: {
    setFieldErrors: (fieldName: T, errors: FieldError[] | string[]) => void
    addFieldError: (fieldName: T, error: FieldError | string) => void
    setMultiFieldsErrors: (errors: Record<T, FieldError[] | string[]>) => void
  }) => void
  fieldValidatorGetFirstErrorOnly?: boolean
  validateOnInitialLoad?: boolean
}

interface FieldState {
  /**
   * Field had being focused
   *
   * @default false
   */
  touched: boolean
  dirty: boolean
  pristine: boolean
  valid: boolean
  invalid: boolean
  error: FieldError | null
  errors: FieldError[]
  busy: boolean

}

/**
 * Create form features, By HassanDomeDenea
 */
export function useHddForm<T extends string>(options: UseHddFormOptions<T> = {}) {
  const fields = computed<HddFormField<T>[]>(() => {
    return options.fields?.map((e) => {
      if (typeof e === 'string') {
        return { name: e }
      }
      else {
        return e
      }
    }) ?? []
  })

  const defaultValidationMode: ValidationModeType = options.defaultValidationMode ?? 'onSubmit'

  const validationRules = computed<Partial<Record<T, HddFormField['rules']>>>(() => {
    return fields.value.reduce<Partial<Record<T, HddFormField['rules']>>>((cumulativeValue, field) => {
      if (field.rules) {
        cumulativeValue[field.name] = field.rules.label(field.label ?? field.name)
      }
      return cumulativeValue
    }, {} as Record<T, HddFormField['rules']>)
  })
  const fieldNames = computed(() => {
    return fields.value.map(e => e.name)
  })
  const validationModes = computed<Record<T, ValidationModeType>>(() => {
    return fields.value.reduce<Record<T, ValidationModeType>>((cumulativeValue: Record<T, ValidationModeType>, field) => {
      if (!field.name)
        return cumulativeValue
      cumulativeValue[field.name] = field.validationMode || defaultValidationMode
      return cumulativeValue
    }, {} as Record<T, ValidationModeType>)
  })
  const fieldsLabels = computed<Record<T, string>>(() => {
    return fields.value.reduce<Record<T, string>>((cumulativeValue, field) => {
      cumulativeValue[field.name] = field.label ?? field.name
      return cumulativeValue
    }, {} as Record<T, string>)
  })
  const requiredFieldsNames = computed<Record<T, boolean>>(() => {
    return fields.value.reduce<Record<T, boolean>>((cumulativeValue, field) => {
      cumulativeValue[field.name] = !!field.rules?.tests.find(e => e.OPTIONS?.name === 'required')
      return cumulativeValue
    }, {} as Record<T, boolean>)
  })

  const initialValues = computed<Record<T, any | undefined>>(() => {
    return fields.value.reduce<Record<T, any | undefined>>((cumulativeValue, field) => {
      cumulativeValue[field.name] = typeof field.defaultValue === 'function' ? field.defaultValue() : field.defaultValue
      return cumulativeValue
    }, {} as Record<T, any | undefined>)
  })

  const currentValues = ref<Record<T, any>>(cloneDeep(initialValues.value))

  function createFieldState(): FieldState {
    return {
      touched: false,
      dirty: false,
      pristine: true,
      valid: true,
      invalid: false,
      error: null,
      errors: [],
      busy: false,
    }
  }

  function getFieldsStates(): Record<T, FieldState> {
    const states: Record<T, FieldState> = {} as Record<T, FieldState>
    fieldNames.value.forEach((e) => {
      states[e] = createFieldState()
    })
    return states
  }

  const fieldsStates = ref<Record<T, FieldState>>(getFieldsStates())
  const formState = ref(createFieldState())

  function updateFieldState(fieldName: T) {
    const value = currentValues.value[fieldName]
    fieldsStates.value[fieldName].pristine = false
    formState.value.pristine = false
    fieldsStates.value[fieldName].dirty = value !== initialValues.value[fieldName]

    if (validationModes.value[fieldName] === 'onValueUpdate') {
      validateField(fieldName)
    }
  }

  function setValue(fieldName: string, value: any) {
    currentValues.value[fieldName] = value
  }

  function validateField(fieldName: T, validateFormAlso = true) {
    const rules = validationRules.value[fieldName] as HddFormField['rules']
    if (rules) {
      try {
        rules.validateSync(currentValues.value[fieldName], {
          strict: true,
          abortEarly: options.fieldValidatorGetFirstErrorOnly ?? true,
        })
        fieldsStates.value[fieldName].errors = []
      }
      catch (e: any) {
        if (e instanceof ValidationError) {
          fieldsStates.value[fieldName].errors = e.errors.map(e => ({
            message: e,
          }))
        }
      }
    }

    updateFieldStatusAfterErrorsChanged(fieldName, validateFormAlso)
    /* const r = string().required().min(3).label('name').validate('a').then((r) => {
                              console.log(r)
                          }).catch((e: ValidationError) => {
                              console.log(e.errors) */
  }

  function updateFieldStatusAfterErrorsChanged(fieldName: T, validateFormAlso: boolean = true) {
    fieldsStates.value[fieldName].valid = fieldsStates.value[fieldName].errors.length === 0
    fieldsStates.value[fieldName].invalid = !fieldsStates.value[fieldName].valid
    fieldsStates.value[fieldName].error = fieldsStates.value[fieldName].errors[0]

    if (validateFormAlso) {
      updateFormState()
    }
  }

  function updateFormState() {
    formState.value.errors = flatten(map(fieldsStates.value, e => e.errors))
    formState.value.error = formState.value.errors[0]
    formState.value.valid = formState.value.errors.length === 0
    formState.value.invalid = !formState.value.valid
    if (!formState.value.touched) {
      formState.value.touched = filter(fieldsStates.value, e => e.touched).length > 0
    }
    if (formState.value.pristine) {
      formState.value.pristine = filter(fieldsStates.value, e => e.pristine).length > 0
    }
  }

  function validateAll() {
    fieldNames.value.forEach((e) => {
      validateField(e, false)
    })

    updateFormState()
  }

  function onBlur(fieldName: T) {
    fieldsStates.value[fieldName].touched = true
    if (validationModes.value[fieldName] === 'onBlur') {
      validateField(fieldName)
    }
    else {
      formState.value.touched = true
    }
  }

  function reset() {
    fieldsStates.value = getFieldsStates()
    currentValues.value = cloneDeep(initialValues.value)
    formState.value = createFieldState()
  }

  const watchersUtils = ref<Partial<Record<T, WatchHandle>>>({})

  onMounted(() => {
    if (options?.watchFieldValues !== false) {
      fieldNames.value.forEach((fieldName) => {
        if (watchersUtils.value[fieldName]) {
          watchersUtils.value[fieldName]()
        }
        watchersUtils.value[fieldName] = watch(() => currentValues.value[fieldName], () => {
          updateFieldState(fieldName)
        }, {
          deep: options.watchFieldValuesDeep ?? false,
        })
      })
      if (options.validateOnInitialLoad) {
        validateAll()
      }
    }
  })

  function setFieldErrors(fieldName: T, errors: FieldError[] | string[]) {
    fieldsStates.value[fieldName] = errors.map(e => typeof e === 'string' ? { message: e } : e)

    updateFieldStatusAfterErrorsChanged(fieldName, true)
  }

  function setMultiFieldsErrors(fieldErrors: Record<T, FieldError[] | string[]>) {
    for (const fieldName in fieldErrors) {
      fieldsStates.value[fieldName].errors = fieldErrors[fieldName].map(e => typeof e === 'string' ? { message: e } : e)
      updateFieldStatusAfterErrorsChanged(fieldName, false)
    }
  }

  function addFieldError(fieldName: T, error: FieldError | string) {
    fieldsStates.value[fieldName].errors.push(typeof error === 'string' ? { message: error } : error)

    updateFieldStatusAfterErrorsChanged(fieldName, true)
  }

  const context = {
    currentValues,
    fieldNames,
    initialValues,
    fieldsStates,
    formState,
    reset,
    onBlur,
    setValue,
    fields,
    submitForm,
    validateField,
    validateAll,
    fieldsLabels,
    setFieldErrors,
    addFieldError,
    setMultiFieldsErrors,
    requiredFieldsNames,
  }

  async function submitForm(): Promise<boolean> {
    for (const i in validationModes.value) {
      if (validationModes.value[i] === 'onSubmit') {
        validateField(i, false)
      }
    }
    updateFormState()
    if (typeof options?.onSubmit === 'function' && formState.value.valid) {
      options.onSubmit(currentValues.value, context)
    }
    return Promise.resolve(formState.value.valid)
  }

  return context
}

export function objectIntoFields<T extends Record<string, any>>(fieldsObject: T) {
  const carry: HddFormField<keyof T & string>[] = []
  for (const itemKey in fieldsObject) {
    let type: FormFieldType = 'text'
    const value: any = fieldsObject[itemKey]
    const typeofValue = typeof fieldsObject[itemKey]
    if (typeofValue === 'number' || typeofValue === 'bigint') {
      type = 'number'
    }
    else if (typeof value === 'boolean') {
      type = 'checkbox'
    }
    else if (typeof value === 'object' && value instanceof Date) {
      type = 'date'
    }

    carry.push({
      name: itemKey,
      type,
    })
  }
  return carry
}
