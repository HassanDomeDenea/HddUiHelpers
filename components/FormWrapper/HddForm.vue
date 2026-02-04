<script setup lang="ts" generic="T extends string">
import { isAxiosError } from 'axios'
import { getFieldSlotName } from 'HddUiHelpers/components/datatables/ServerDataTableUtilities.ts'
import CheckboxInput from 'HddUiHelpers/components/inputs/CheckboxInput.vue'
import FormObjectInput from 'HddUiHelpers/components/inputs/FormObjectInput.vue'
import ListBoxInput from 'HddUiHelpers/components/inputs/ListBoxInput.vue'
import MultiSelectInput from 'HddUiHelpers/components/inputs/MultiSelectInput.vue'
import RadioButtonInput from 'HddUiHelpers/components/inputs/RadioButtonInput.vue'
import SelectInput from 'HddUiHelpers/components/inputs/SelectInput.vue'
import TextInput from 'HddUiHelpers/components/inputs/TextInput.vue'
import type { BaseInputProps } from 'HddUiHelpers/components/inputs/types'
import { useApiClient } from 'HddUiHelpers/stores/apiClient'
import { find, get, mapValues, maxBy, set, throttle } from 'lodash-es'
import cloneDeep from 'lodash/cloneDeep'
import map from 'lodash/map'
import omit from 'lodash/omit'
import reduce from 'lodash/reduce'
import uniqueId from 'lodash/uniqueId'
import unset from 'lodash/unset'
import Button from 'primevue/button'
import { toValue } from 'vue'
import { ComponentExposed } from 'vue-component-type-helpers'
import type { UseHddFormOptions } from '../../utils/useHddForm'
import { useHddForm } from '../../utils/useHddForm'
import type { FieldError, HddFormField, HddFormProps, HddFormValues } from './types'
import { isAxiosValidationError } from './types'

const {
  defaultValidationMode = 'onSubmit',
  summarizeErrorsAtTop = true,
  showFieldErrorBelowIt = false,
  showFieldErrorsPopover = false,
  showRequiredAsterisk = false,
  inlineFields = true,
  size,
  isEditing,
  fieldsContainerClass,
  formName,
  urlMethod = 'post',
  submitText = '',
  unifyLabelsWidth = false,
  fields,
  fixedLabelWidth,
  url,
  onFailure,
  onSuccess,
  initialValues,
  iconAsAddon,
  floatingLabel,
  submitPayloadTransformer,
  floatingLabelVariant,
  submitOnEnter = true,
  infieldTopAlignedLabel,
  autoFocusFirstOnMount = true,
  withFooterButtons = true,
} = defineProps<HddFormProps<T>>()

const formModelValue = defineModel<any>()

const emits = defineEmits<{
  reset: []
  submit: [
    values: HddFormValues<T>,
    context: {
      setFieldErrors: (fieldName: T, errors: FieldError[] | string[]) => void
      addFieldError: (fieldName: T, error: FieldError | string) => void
      setMultiFieldsErrors: (errors: Record<T, FieldError[] | string[]>) => void
    },
  ]
}>()

const apiClient = useApiClient()

const { t } = useI18n()
const hddFormOptions = computed(() => {
  return {
    fields,
    defaultValidationMode,
    staticInitialValues: initialValues,
    onSubmit: (values, context) => {
      emits('submit', values, context)
      if (url) {
        return submitToUrl()
          .then((result: unknown) => {
            if (onSuccess) {
              onSuccess(result)
            }
            return result
          })
          .catch((error: Error) => {
            console.error(error)
            if (onFailure) {
              onFailure(error)
            }
          })
      }
    },
  } as UseHddFormOptions<T>
})

const containerRef = useTemplateRef('containerRef')
const fieldsContainerRef = useTemplateRef('fieldsContainerRef')
const submitButtonRef = useTemplateRef<ComponentExposed>('submitButtonRef')
const form = useHddForm<T>(hddFormOptions.value as UseHddFormOptions<T>)

const isSubmitting = ref(false)

async function submitToUrl(): Promise<any> {
  return new Promise(async (resolve, reject) => {
    if (!url) return reject('No url provided')
    isSubmitting.value = true
    form.clearErrors()

    let payload = form.currentValues.value
    const files = form.currentFiles.value
    const hasFiles = Object.values(files).filter((i) => i).length > 0
    if (submitPayloadTransformer) {
      payload = submitPayloadTransformer(cloneDeep(payload), form as any)
    }
    try {
      let res: any
      if (hasFiles) {
        res = await apiClient.upload(url, files, payload)
      } else {
        if (typeof url === 'object') {
          res = await apiClient.request(url, payload, false)
        } else {
          switch (urlMethod) {
            case 'post':
              res = await apiClient.post(url, payload)
              break
            case 'put':
              res = await apiClient.put(url, payload)
              break
            case 'get':
              res = await apiClient.get(url, { params: payload })
              break
            case 'delete':
              res = await apiClient.delete(url, { params: payload })
              break
          }
        }
      }
      isSubmitting.value = false
      return resolve(res.data)
    } catch (error: unknown) {
      if (isAxiosValidationError(error)) {
        form.setMultiFieldsErrors(
          mapValues(error.response.data.errors, (i) => i.map((e) => ({ message: e }))) as Record<
            T,
            FieldError[]
          >
        )
      } else if (isAxiosError(error)) {
        form.addGlobalError(t(error.response?.data.message ?? error.message ?? 'Error Occurred'))
      } else {
        form.addGlobalError(t('Error Occurred'))
      }
      await nextTick()
      if (
        !document.activeElement ||
        document.activeElement.getAttribute('aria-invalid') !== 'true'
      ) {
        if (false === focusFirstWithError()) {
          focusFirst()
        }
      }
      isSubmitting.value = false
      return reject(error as Error)
    }
  })
}

// const currentValues = toRef(() => form.currentValues)

const { requiredFieldsNames, formState, fields: formFields } = form

const currentValues = form.currentValues as any
const currentFiles = form.currentFiles as any
const fieldsStates = form.fieldsStates as any

const labelWidthStyle = computed(() => {
  return fixedLabelWidth && fixedLabelWidth > 0 ? `width: ${fixedLabelWidth}px` : ''
})

const fieldRefs = ref<{ [k in string]: any }>({})
const localFormName = computed(() => formName || uniqueId('hdd-form-'))
const labelsLargestWidth = computed(() => {
  if (typeof unifyLabelsWidth === 'number') {
    return unifyLabelsWidth
  } else if (unifyLabelsWidth === true) {
    return maxBy(map(fieldRefs.value, (e) => e?.baseInputRef?.labelWidth ?? e?.labelWidth))
  }
  return null
})

const generalInputsProps = computed<Partial<BaseInputProps>>(() => {
  return {
    labelStyle: labelWidthStyle.value,
    inline: inlineFields,
    formName: localFormName.value,
    labelMinWidth: labelsLargestWidth,
    labelSingleLine: unifyLabelsWidth === true && inlineFields,
    iconAsAddon,
    size,
    floatingLabel,
    floatingLabelVariant,
    infieldTopAlignedLabel,
    onKeydown: (e: KeyboardEvent) => e.key === 'Enter' && submitOnEnter && form.submitForm(),
  }
})

function generalInputBindsByField(field: HddFormField<T>): Partial<BaseInputProps> & { ref: any } {
  return {
    label: field.label,
    ref: (el: any) => (fieldRefs.value[field.name] = el),
    required: requiredFieldsNames.value[field.name],
    showRequiredAsterisk: showRequiredAsterisk,
    helperText: field.notes,
    name: field.name,
    autocomplete: field.autocomplete,
    disabled:
      typeof field.disabled === 'function' ? field.disabled(currentValues.value) : field.disabled,
    readonly:
      typeof field.readonly === 'function' ? field.readonly(currentValues.value) : field.readonly,
    icon: field.icon,
    placeholder: field.placeholder,
    size: field.size ?? size,
    error: fieldsStates.value[field.name].error?.message,
    showErrorMessage: showFieldErrorBelowIt,
    ...(field.labelWidth || field.labelWidth === 0
      ? {
          labelMinWidth: field.labelWidth || 'unset',
        }
      : {}),
    ...(['text', 'password'].includes(field.type ?? 'text')
      ? {
          onFocusNext: () => focusNext(field),
          onFocusPrevious: () => focusPrevious(field),
        }
      : []),
    ...(field.addonCallback
      ? {
          textAddon: (value: any) => {
            return field.addonCallback({ value, row: toValue(currentValues) })
          },
        }
      : {}),
    ...(field.onValueUpdate
      ? {
          'onUpdate:modelValue': (value: any) => {
            triggerOnValueUpdate(field, value)
          },
        }
      : {}),
    ...(field.binds
      ? typeof field.binds === 'function'
        ? field.binds({
            isEditing,
            row: toValue(currentValues),
          })
        : field.binds
      : {}),
    ...(field.teleport && !field.labelWidth
      ? {
          labelMinWidth: 'unset',
        }
      : {}),
  }
}

function triggerOnValueUpdate(field: HddFormField, value: any) {
  field.onValueUpdate?.({
    value,
    row: toValue(currentValues),
    setValue: form.setValue,
    fieldRef: fieldRefs.value[field.name],
  })
}

const calculateUnifiedLabelsSpacing = throttle(() => {
  //TODO: Refactor or Remove
  /* let maxWidth = -1;
       if (typeof unifyLabelsWidth === 'number') {
           maxWidth = unifyLabelsWidth;
       } else if (unifyLabelsWidth) {
           const labels = containerRef.value?.querySelectorAll<HTMLLabelElement>(`[data-label-form-name="${localFormName.value}"]`);
           labels?.forEach((label) => {
               maxWidth = Math.max(maxWidth, label.offsetWidth);
           });
       }
       if (maxWidth > -1) {
           document.documentElement.style.setProperty(`--label-width-for-form-${localFormName.value}`, `${maxWidth}px`);
       }*/
  // console.log(maxWidth)
}, 50)

watch(
  () => unifyLabelsWidth,
  () => {
    calculateUnifiedLabelsSpacing()
  },
  {
    immediate: true,
    flush: 'post',
  }
)

watch(
  () => form.fields.value.map((e) => !e.hidden).length,
  () => {
    if (unifyLabelsWidth === true) {
      calculateUnifiedLabelsSpacing()
    }
  },
  {
    immediate: false,
    flush: 'post',
  }
)

onMounted(() => {
  if (autoFocusFirstOnMount) {
    focusFirst()
  }
  calculateUnifiedLabelsSpacing()
})

function focusFirstWithError(): boolean | null {
  const item = find(fieldRefs.value, (item) => {
    return item?.hasError
  })
  if (item) {
    item.focus()
    return null
  } else {
    return false
  }
}

function focusFirst() {
  nextTick(() => {
    let firstFieldName = formFields.value[0]?.name
    if (firstFieldName) {
      focusField(firstFieldName)
    } else {
      Object.values(fieldRefs.value)
        .filter((e) => !e?.disabled)[0]
        ?.focus()
    }
  })
}

function focusPrevious(field: HddFormField) {
  const enabledFields = Object.entries(fieldRefs.value).filter((e) => !e[1]?.disabled)
  const currentFieldIndex = enabledFields.findIndex((e) => e[0] === field.name)
  enabledFields[currentFieldIndex - 1]?.[1].focus?.()
}

function focusNext(field: HddFormField) {
  const enabledFields = Object.entries(fieldRefs.value).filter((e) => !e[1]?.disabled)
  const currentFieldIndex = enabledFields.findIndex((e) => e[0] === field.name)
  if (currentFieldIndex + 1 === enabledFields.length) {
    focusSubmit()
  } else {
    enabledFields[currentFieldIndex + 1]?.[1].focus?.()
  }
}

function focusLast() {
  const enabledFields = Object.values(fieldRefs.value).filter((e) => !e?.disabled)
  enabledFields[enabledFields.length - 1]?.focus?.()
}

function focusSubmit() {
  submitButtonRef.value?.$el.focus()
}

function setFieldRef(el: any, name: string) {
  fieldRefs.value[name] = el
}

function focusField(name: string) {
  fieldRefs.value[name]?.focus()
}

defineExpose({ form, currentValues, fieldRefs, isSubmitting, focusFirst, focusField })

const fieldNamePaths = computed(() => {
  return reduce(
    formFields.value,
    (carry, field) => {
      carry[field.name] = field.name.split('.')
      return carry
    },
    {} as Record<string, string[]>
  )
})

function resolveFieldOptions(
  _options: MaybeRefOrGetter<any[] | ((form: unknown) => any[])>,
  _currentValues: unknown
) {
  return typeof _options === 'function' ? _options(_currentValues) : (toValue(_options) ?? [])
}

if (formModelValue.value) {
  syncRef(formModelValue, form.currentValues)
}
</script>

<template>
  <div ref="containerRef" class="">
    <!--    <pre class="dir-ltr text-left">{{ currentValues }}</pre>-->
    <form :autocomplete="autoComplete" @submit.prevent>
      <div v-if="summarizeErrorsAtTop && formState.invalid">
        <Message
          :size="size"
          severity="error"
          class="mb-2 mt-1 text-right"
          icon="i-heroicons-exclamation-triangle-20-solid !size-8 !text-4xl"
        >
          <ul class="list-disc ps-4">
            <template v-for="error in formState.errors" :key="error">
              <li>
                {{ error.message }}
              </li>
            </template>
          </ul>
        </Message>
      </div>
      <slot name="beforeControls"></slot>
      <div ref="fieldsContainerRef" :class="fieldsContainerClass">
        <template v-for="field in formFields" :key="field.name">
          <Teleport :to="field.teleport ?? fieldsContainerRef" defer :disabled="!field.teleport">
            <template
              v-if="
                !field.hidden &&
                (typeof field.showable === 'function'
                  ? field.showable({ row: currentValues, isEditing: isEditing === true })
                  : !toValue(field.showable)) &&
                !(isEditing && field.editable === false)
              "
            >
              <slot :name="`${getFieldSlotName(field)}BeforeControl`"></slot>
              <slot :name="`${getFieldSlotName(field)}ControlBody`">
                <div class="mb-2">
                  <div class="flex items-center gap-1">
                    <div class="min-w-0 flex-1">
                      <slot
                        name="fieldInput"
                        :field="field"
                        :current-values="currentValues"
                        :set-ref="setFieldRef"
                        :binds="{ ...generalInputsProps, ...generalInputBindsByField(field) }"
                      >
                        <template v-if="!field.type || field.type === 'text'">
                          <TextInput
                            :model-value="get(currentValues, field.name)"
                            v-bind="{ ...generalInputsProps, ...generalInputBindsByField(field) }"
                            @update:model-value="
                              set(currentValues, fieldNamePaths[field.name], $event)
                            "
                          />
                        </template>
                        <template v-else-if="field.type === 'color'">
                          <ColorPickerInput
                            :model-value="get(currentValues, field.name)"
                            v-bind="{ ...generalInputsProps, ...generalInputBindsByField(field) }"
                            @update:model-value="
                              set(currentValues, fieldNamePaths[field.name], $event)
                            "
                          />
                        </template>
                        <template v-else-if="field.type === 'checkbox'">
                          <CheckboxInput
                            :model-value="get(currentValues, field.name)"
                            v-bind="{ ...generalInputsProps, ...generalInputBindsByField(field) }"
                            @update:model-value="
                              set(currentValues, fieldNamePaths[field.name], $event)
                            "
                          />
                        </template>
                        <template v-else-if="field.type === 'radio'">
                          <RadioButtonInput
                            :model-value="get(currentValues, field.name)"
                            v-bind="{ ...generalInputsProps, ...generalInputBindsByField(field) }"
                            :options="resolveFieldOptions(field.options, currentValues)"
                            @update:model-value="
                              set(currentValues, fieldNamePaths[field.name], $event)
                            "
                          />
                        </template>
                        <template v-else-if="field.type === 'switch'">
                          <ToggleSwitchInput
                            :model-value="get(currentValues, field.name)"
                            v-bind="{ ...generalInputsProps, ...generalInputBindsByField(field) }"
                            @update:model-value="
                              set(currentValues, fieldNamePaths[field.name], $event)
                            "
                          />
                        </template>
                        <template v-else-if="field.type === 'password'">
                          <PasswordInput
                            :model-value="get(currentValues, field.name)"
                            v-bind="{ ...generalInputsProps, ...generalInputBindsByField(field) }"
                            @update:model-value="
                              set(currentValues, fieldNamePaths[field.name], $event)
                            "
                          />
                        </template>
                        <template v-else-if="field.type === 'phone'">
                          <PhoneInput
                            :model-value="get(currentValues, field.name)"
                            :country-code="
                              field.countyCodeFieldName
                                ? get(currentValues, field.countyCodeFieldName)
                                : undefined
                            "
                            :with-country-code="!!field.countyCodeFieldName"
                            v-bind="{ ...generalInputsProps, ...generalInputBindsByField(field) }"
                            @update:country-code="
                              set(currentValues, field.countyCodeFieldName, $event)
                            "
                            @update:model-value="
                              set(currentValues, fieldNamePaths[field.name], $event)
                            "
                          />
                        </template>
                        <template v-else-if="field.type === 'select'">
                          <SelectInput
                            :model-value="get(currentValues, field.name)"
                            v-bind="{ ...generalInputsProps, ...generalInputBindsByField(field) }"
                            :options="resolveFieldOptions(field.options, currentValues)"
                            @update:model-value="
                              set(currentValues, fieldNamePaths[field.name], $event)
                            "
                          />
                        </template>
                        <template v-else-if="field.type === 'tree_select'">
                          <TreeSelectInput
                            :model-value="get(currentValues, field.name)"
                            v-bind="{ ...generalInputsProps, ...generalInputBindsByField(field) }"
                            :options="resolveFieldOptions(field.options, currentValues)"
                            @update:model-value="
                              set(currentValues, fieldNamePaths[field.name], $event)
                            "
                          />
                        </template>
                        <template v-else-if="field.type === 'multiselect'">
                          <MultiSelectInput
                            :model-value="get(currentValues, field.name)"
                            v-bind="{ ...generalInputsProps, ...generalInputBindsByField(field) }"
                            :options="resolveFieldOptions(field.options, currentValues)"
                            @update:model-value="
                              set(currentValues, fieldNamePaths[field.name], $event)
                            "
                          />
                        </template>
                        <template v-else-if="field.type === 'listbox'">
                          <ListBoxInput
                            :model-value="get(currentValues, field.name)"
                            v-bind="{ ...generalInputsProps, ...generalInputBindsByField(field) }"
                            :options="resolveFieldOptions(field.options, currentValues)"
                            @update:model-value="
                              set(currentValues, fieldNamePaths[field.name], $event)
                            "
                          />
                        </template>
                        <template v-else-if="field.type === 'number'">
                          <NumberInput
                            :model-value="get(currentValues, field.name)"
                            allow-empty
                            :immediate-update="!field.lazy"
                            v-bind="{ ...generalInputsProps, ...generalInputBindsByField(field) }"
                            @update:model-value="
                              set(currentValues, fieldNamePaths[field.name], $event)
                            "
                          />
                        </template>
                        <template v-else-if="field.type === 'price'">
                          <NumberInput
                            :model-value="get(currentValues, field.name)"
                            allow-empty
                            use-grouping
                            :text-addon="field.currency"
                            :immediate-update="!field.lazy"
                            v-bind="{ ...generalInputsProps, ...generalInputBindsByField(field) }"
                            @update:model-value="
                              set(currentValues, fieldNamePaths[field.name], $event)
                            "
                          />
                        </template>
                        <template v-else-if="field.type === 'math'">
                          <MathInput
                            :model-value="get(currentValues, field.name)"
                            v-bind="{ ...generalInputsProps, ...generalInputBindsByField(field) }"
                            @update:model-value="
                              set(currentValues, fieldNamePaths[field.name], $event)
                            "
                          />
                        </template>
                        <template v-else-if="field.type === 'textarea'">
                          <TextAreaInput
                            :model-value="get(currentValues, field.name)"
                            v-bind="{
                              ...omit(generalInputsProps, ['onKeydown']),
                              ...generalInputBindsByField(field),
                            }"
                            @update:model-value="
                              set(currentValues, fieldNamePaths[field.name], $event)
                            "
                            @keydown.ctrl.enter.stop="submitOnEnter && form.submitForm()"
                          />
                        </template>
                        <template v-else-if="field.type === 'date'">
                          <DatePickerInput
                            :model-value="get(currentValues, field.name)"
                            v-bind="{ ...generalInputsProps, ...generalInputBindsByField(field) }"
                            @update:model-value="
                              set(currentValues, fieldNamePaths[field.name], $event)
                            "
                          />
                        </template>
                        <template v-else-if="field.type === 'autocomplete'">
                          <AutoCompleteInput
                            :model-value="get(currentValues, field.name)"
                            v-bind="{ ...generalInputsProps, ...generalInputBindsByField(field) }"
                            :url="
                              typeof field.url === 'function'
                                ? field.url({ row: currentValues })
                                : toValue(field.url)
                            "
                            @update:model-value="
                              set(currentValues, fieldNamePaths[field.name], $event)
                            "
                          />
                        </template>
                        <template v-else-if="field.type === 'server_select'">
                          <InfiniteSelectInput
                            :model-value="get(currentValues, field.name)"
                            :filter-placeholder="t('Search For') + ': ' + t(field.label)"
                            :url="
                              typeof field.url === 'function'
                                ? field.url({ row: currentValues })
                                : toValue(field.url)
                            "
                            v-bind="{ ...generalInputsProps, ...generalInputBindsByField(field) }"
                            @update:model-value="
                              set(currentValues, fieldNamePaths[field.name], $event)
                            "
                          />
                        </template>
                        <template v-else-if="field.type === 'server_multi_select'">
                          <InfiniteMultiSelectInput
                            :model-value="get(currentValues, field.name)"
                            :filter-placeholder="t('Search For') + ': ' + t(field.label)"
                            :url="
                              typeof field.url === 'function'
                                ? field.url({ row: currentValues })
                                : toValue(field.url)
                            "
                            v-bind="{ ...generalInputsProps, ...generalInputBindsByField(field) }"
                            @update:model-value="
                              set(currentValues, fieldNamePaths[field.name], $event)
                            "
                          />
                        </template>
                        <template v-else-if="field.type === 'editor'">
                          <TipTapEditorInput
                            :model-value="get(currentValues, field.name)"
                            v-bind="{
                              ...omit(generalInputsProps, ['onKeydown']),
                              ...generalInputBindsByField(field),
                            }"
                            @update:model-value="
                              set(currentValues, fieldNamePaths[field.name], $event)
                            "
                            @keydown.ctrl.enter.stop="submitOnEnter && form.submitForm()"
                          />
                        </template>
                        <template v-else-if="field.type === 'image'">
                          <ImageInput
                            :model-value="get(currentFiles, field.name)"
                            :current-url="get(currentValues, field.imageUrlKey ?? field.name)"
                            v-bind="{
                              ...omit(generalInputsProps, ['onKeydown']),
                              ...generalInputBindsByField(field),
                            }"
                            :fields="field.fields"
                            @update:model-value="
                              set(currentFiles, fieldNamePaths[field.name], $event)
                            "
                            @update:current-url="
                              set(
                                currentValues,
                                field.imageUrlKey ?? fieldNamePaths[field.name],
                                $event
                              )
                            "
                            @clear="
                              field.imageClearKey
                                ? set(currentValues, field.imageClearKey, true)
                                : null
                            "
                            @unclear="
                              field.imageClearKey ? unset(currentValues, field.imageClearKey) : null
                            "
                          />
                        </template>
                        <template v-else-if="field.type === 'form'">
                          <FormObjectInput
                            :model-value="get(currentValues, field.name)"
                            v-bind="{
                              ...omit(generalInputsProps, ['onKeydown']),
                              ...generalInputBindsByField(field),
                            }"
                            :fields="field.fields"
                            label-class="-mt-2"
                            @update:model-value="
                              set(currentValues, fieldNamePaths[field.name], $event)
                            "
                            @keydown.ctrl.enter.stop="submitOnEnter && form.submitForm()"
                          />
                        </template>
                      </slot>
                    </div>
                    <template v-if="showFieldErrorsPopover">
                      <div
                        class="self-start ltr:pr-2 rtl:pl-2"
                        :class="{ 'pt-7': !inlineFields, 'pt-1': inlineFields }"
                      >
                        <Button severity="warn" text size="small">
                          <i class="i-heroicons-exclamation-triangle-20-solid text-2xl" />
                        </Button>
                      </div>
                    </template>
                  </div>
                </div>
              </slot>
              <slot :name="`${getFieldSlotName(field)}AfterControl`"></slot>
            </template>
          </Teleport>
        </template>
      </div>
    </form>
    <slot name="buttons-area">
      <div v-if="withFooterButtons" class="mt-4">
        <div class="flex items-center justify-between gap-2">
          <slot name="beforeFooter" :is-submitting="isSubmitting"></slot>
          <Button
            ref="submitButtonRef"
            :name="localFormName + '_submit'"
            :size="size"
            :loading="isSubmitting"
            :disabled="
              isSubmitting || (formState.invalid && defaultValidationMode === 'onValueUpdate')
            "
            :label="submitText === false ? undefined : submitText || t('Submit')"
            :icon="submitIcon"
            :severity="submitSeverity"
            @keydown.up="focusLast"
            @click="form.submitForm()"
          />
          <slot name="afterFooter" :is-submitting="isSubmitting"></slot>
        </div>
      </div>
    </slot>
  </div>
</template>

<style scoped></style>
