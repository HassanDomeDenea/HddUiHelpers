<script setup lang="ts">
import { ref } from 'vue'
import BaseInput from './BaseInput.vue'
import type { BaseInputProps } from './types'

withDefaults(defineProps<{
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

defineExpose({ focus })
</script>

<template>
  <BaseInput :label="label" :icon="icon" :inline="inline">
    <SelectButton
      v-model="value"
      :allow-empty="clearable"
      :disabled="disabled"
      :options="options"
      :option-label="optionLabelProperty"
      :option-value="optionValueProperty"
    >
      <template #option="{ option }">
        <slot name="option" :option="option" />
      </template>
    </SelectButton>
  </BaseInput>
</template>

<style scoped>

</style>
