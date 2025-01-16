<script setup lang="ts" generic="T extends string">
import type { BaseInputProps } from 'HddUiHelpers/components/inputs/types'
import type { UseHddFormOptions } from '../../utils/useHddForm'
import type { HddFormField, HddFormProps } from './types'
import CheckboxInput from 'HddUiHelpers/components/inputs/CheckboxInput.vue'
import TextInput from 'HddUiHelpers/components/inputs/TextInput.vue'
import { pick } from 'lodash-es'
import { reactive } from 'vue'
import { useHddForm } from '../../utils/useHddForm'

type HddFormValues = Record<T, any>

const props = withDefaults(
  defineProps<HddFormProps<T>>(),
  {
    defaultValidationMode: 'onSubmit',
    summarizeErrorsAtTop: false,
    showFieldErrorBelowIt: true,
    showFieldErrorsPopover: true,
    inlineFields: true,
  },
)

const emits = defineEmits<{
  submit: [values: HddFormValues]
}>()

const hddFormOptions = reactive({
  fields: props.fields,
  defaultValidationMode: props.defaultValidationMode,
  onSubmit: (values) => {
    emits('submit', values)
  },
} as UseHddFormOptions<T>)

const form = useHddForm<T>(hddFormOptions as UseHddFormOptions<T>)

// const currentValues = toRef(() => form.currentValues)

const { requiredFieldsNames, formState, fields: formFields } = form

const currentValues = form.currentValues as any
const fieldsStates = form.fieldsStates as any

const labelWidthStyle = computed(() => {
  return props.fixedLabelWidth && props.fixedLabelWidth > 0 ? `width: ${props.fixedLabelWidth}px` : ''
})

const generalInputsProps = computed<Partial<BaseInputProps>>(() => {
  return {
    labelStyle: labelWidthStyle.value,
    inline: props.inlineFields,
    labelSingleLine: props.inlineFields,
    ...pick(props, [
      'iconAsAddon',
      'floatingLabel',
      'floatingLabelVariant',
      'infieldTopAlignedLabel',
    ]),
  }
})

function generalInputBindsByField(field: HddFormField<T>): Partial<BaseInputProps> {
  return {
    label: field.label,
    required: requiredFieldsNames.value[field.name],
    helperText: field.notes,
    icon: field.icon,
    error: props.showFieldErrorBelowIt && fieldsStates.value[field.name].error?.message,
    ...field.binds ?? {},
  }
}

defineExpose({ form })
</script>

<template>
  <div class="">
    <pre>{{ formState }}</pre>
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
          <!--          <div>
                      <span>{{ field.label ?? field.name }}</span>
                      <sup v-if="requiredFieldsNames[field.name]"> *</sup>
                      <span> :</span>
                    </div> -->
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
          <!--          <div v-if="showFieldErrorBelowIt && fieldsStates[field.name].error">
                      <Message severity="error" size="small" variant="simple">
                        <span class="px-1">{{ fieldsStates[field.name].error.message }}</span>
                      </Message>
                    </div> -->
        </div>
      </template>
    </div>
    <div>
      <Button
        :disabled="formState.invalid && defaultValidationMode === 'onValueUpdate'"
        @click="form.submitForm()"
      >
        Submit
      </Button>
    </div>
  </div>
</template>

<style scoped>

</style>
