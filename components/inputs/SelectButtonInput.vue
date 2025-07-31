<script setup lang="ts">
import { ref } from 'vue'
import BaseInput from './BaseInput.vue'
import type { BaseInputProps } from './types'
import type { ComponentExposed } from 'vue-component-type-helpers';

const props = withDefaults(defineProps<{
  options: any[]
  optionLabelProperty?: string | null
  optionValueProperty?: string | null
  clearable?: boolean
} & BaseInputProps>(), {
  optionLabelProperty: 'text',
  optionValueProperty: 'value',
  clearable: false,
})
const value = defineModel<any>('modelValue')

const inputRef = ref()

function focus() {
  inputRef.value.$el.focus()
}
const hasError = computed(()=>!!props.error)
const baseInputRef = useTemplateRef<ComponentExposed<typeof BaseInput>>('baseInputRef')
defineExpose({ focus, hasError, baseInputRef, disabled: props.disabled })
</script>

<template>
  <BaseInput ref="baseInputRef" :label="label" :icon="icon" :inline="inline">
    <SelectButton
      v-model="value"
      :allow-empty="clearable"
      :disabled="disabled"
      :options="options"
      :option-label="optionLabelProperty"
      :option-value="optionValueProperty"
      :invalid="hasError"
    >
      <template #option="{ option }">
        <slot name="option" :option="option" />
      </template>
    </SelectButton>
  </BaseInput>
</template>

<style scoped>

</style>
