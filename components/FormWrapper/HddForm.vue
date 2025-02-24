<script setup lang="ts" generic="T extends string">
import type { BaseInputProps } from 'HddUiHelpers/components/inputs/types'
import type { UseHddFormOptions } from '../../utils/useHddForm'
import type { FieldError, HddFormField, HddFormProps, HddFormValues } from './types'
import { isAxiosError } from 'axios'
import CheckboxInput from 'HddUiHelpers/components/inputs/CheckboxInput.vue'
import TextInput from 'HddUiHelpers/components/inputs/TextInput.vue'
import { mapValues, pick, throttle } from 'lodash-es'
import { reactive } from 'vue'
import { useHddForm } from '../../utils/useHddForm'

const props = withDefaults(
  defineProps<HddFormProps<T>>(),
  {
    defaultValidationMode: 'onSubmit',
    summarizeErrorsAtTop: true,
    showFieldErrorBelowIt: false,
    showFieldErrorsPopover: false,
    showRequiredAsterisk: false,
    inlineFields: true,
    urlMethod: 'post',
    submitText: '',
    unifyLabelsWidth: true,
  },
)

const emits = defineEmits<{
  submit: [values: HddFormValues<T>, context: {
    setFieldErrors: (fieldName: T, errors: FieldError[] | string[]) => void
    addFieldError: (fieldName: T, error: FieldError | string) => void
    setMultiFieldsErrors: (errors: Record<T, FieldError[] | string[]>) => void
  }]
}>()

const { t } = useI18n()
const hddFormOptions = reactive({
  fields: props.fields,
  defaultValidationMode: props.defaultValidationMode,
  onSubmit: (values, context) => {
    focusFirst()
    emits('submit', values, context)
    if (props.url) {
      submitToUrl()
        .then((result) => {
          if (props.onSuccess) {
            props.onSuccess(result)
          }
        })
    }
  },
} as UseHddFormOptions<T>)

const containerRef = templateRef('containerRef')
const form = useHddForm<T>(hddFormOptions as UseHddFormOptions<T>)

async function submitToUrl(): Promise<any> {
  if (!props.url)
    return
  try {
    const method = props.urlMethod
    let res

    switch (method) {
      case 'post':
      case 'put':
        res = await api[method](props.url as never, form.currentValues as any)
        break
      case 'get':
        res = await api.get(props.url as any, { params: form.currentValues } as any)
        break
      case 'delete':
        res = await api.delete(props.url as any, { params: form.currentValues } as any)
        break
    }
    if (res) {
      return res.data
    }
  }
  catch (error: unknown) {
    if (isAxiosValidationError(error)) {
      form.setMultiFieldsErrors(mapValues(error.response.data.errors, i => (i.map(e => ({ message: e })))) as Record<T, FieldError[]>)
    }
    else if (isAxiosError(error)) {
      form.addFieldError('*' as T, error.message || t('Error Occurred'))
    }
  }
}

// const currentValues = toRef(() => form.currentValues)

const { requiredFieldsNames, formState, fields: formFields } = form

const currentValues = form.currentValues as any
const fieldsStates = form.fieldsStates as any

const labelWidthStyle = computed(() => {
  return props.fixedLabelWidth && props.fixedLabelWidth > 0 ? `width: ${props.fixedLabelWidth}px` : ''
})

const fieldRefs = ref<{ [k in string]: any }>({})

const generalInputsProps = computed<Partial<BaseInputProps>>(() => {
  return {
    labelStyle: labelWidthStyle.value,
    inline: props.inlineFields,
    formName: props.formName || 'test-form',
    labelSingleLine: props.inlineFields,
    ...pick(props, [
      'iconAsAddon',
      'floatingLabel',
      'floatingLabelVariant',
      'infieldTopAlignedLabel',
    ]),
  }
})

function generalInputBindsByField(field: HddFormField<T>): Partial<BaseInputProps> & { ref: any } {
  return {
    label: field.label,
    ref: (el: any) => fieldRefs.value[field.name] = el,
    required: requiredFieldsNames.value[field.name],
    showRequiredAsterisk: props.showRequiredAsterisk,
    helperText: field.notes,
    icon: field.icon,
    error: props.showFieldErrorBelowIt && fieldsStates.value[field.name].error?.message,
    ...field.binds ?? {},
  }
}

const calculateUnifiedLabelsSpacing = throttle(() => {
  let maxWidth = -1

  console.log('Labels Width Unified')
  if (typeof props.unifyLabelsWidth === 'number') {
    maxWidth = props.unifyLabelsWidth
  }
  else if (props.unifyLabelsWidth) {
    const labels = containerRef.value?.querySelectorAll<HTMLLabelElement>('[data-label-form-name="test-form"]')
    labels.forEach((label) => {
      maxWidth = Math.max(maxWidth, label.offsetWidth)
    })
  }

  if (maxWidth > -1) {
    document.documentElement.style.setProperty('--label-width-for-form-test-form', `${maxWidth}px`)
  }
}, 50)

watch(() => form.fields.value.map(e => !e.hidden).length, () => {
  calculateUnifiedLabelsSpacing()
}, {
  immediate: false,
  flush: 'post',
})

onMounted(() => {
  focusFirst()
  calculateUnifiedLabelsSpacing()
})

function focusFirst() {
  // Object.values(fieldRefs.value)[0]?.focus()
}

defineExpose({ form })
</script>

<template>
  <div ref="containerRef" class="">
    <!--    <pre>{{ formState }}</pre> -->
    <div>
      <div v-if="summarizeErrorsAtTop && formState.invalid">
        <Message
          severity="error" class="mx-4 mb-2 mt-1 text-right"
          icon="i-heroicons-exclamation-triangle-20-solid !size-8 !text-4xl"
        >
          <template v-for="error in formState.errors" :key="error">
            <li>
              {{ error.message }}
            </li>
          </template>
        </Message>
      </div>
      <template v-for="field in formFields" :key="field.name">
        <div class="mb-2">
          <div class="flex items-center gap-1">
            <div class="flex-grow">
              <template v-if="field.type === 'checkbox'">
                <CheckboxInput

                  v-model="currentValues[field.name]"
                  v-bind="{ ...generalInputsProps, ...generalInputBindsByField(field) }"
                />
              </template>
              <template v-else>
                <TextInput

                  v-model="currentValues[field.name]"
                  v-bind="{ ...generalInputsProps, ...generalInputBindsByField(field) }"
                />
              </template>
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
      </template>
    </div>
    <div class="mt-4">
      <Button
        :disabled="formState.invalid && defaultValidationMode === 'onValueUpdate'"
        :label="submitText === false ? undefined : submitText || t('Submit')"
        :icon="submitIcon"
        @click="form.submitForm()"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
