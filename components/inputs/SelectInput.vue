<script setup lang="ts">
import { ref } from 'vue'
import type { SelectChangeEvent } from 'primevue/select'
import Select from 'primevue/select'
import BaseInput from './BaseInput.vue'
import type { BaseInputProps } from './types'

const props = withDefaults(defineProps<{
  options: any[]
  optionLabelProperty?: string | null
  optionDisabledProperty?: string | null
  optionValueProperty?: string | null
  formatter?: ((OptionOrValue: any, type: 'option' | 'value') => string)
  clearable?: boolean
  checkmark?: boolean
  hasFilter?: boolean
} & BaseInputProps>(), {
  optionLabelProperty: 'name',
  optionDisabledProperty: 'disabled',
  optionValueProperty: 'id',
  clearable: false,
  checkmark: true,
  hasFilter: true,
})
const emits = defineEmits<{
  change: [event: SelectChangeEvent]
}>()
const value = defineModel<any>('modelValue')

const inputRef = ref()

function focus() {
  if (!props.disabled) {
    inputRef.value.show()
  }
}

function onInputBlur() {

}

defineExpose({ focus })
</script>

<template>
  <BaseInput v-bind="props" @click="focus">
    <Select
      ref="inputRef"
      v-model="value"
      :placeholder="placeholder"
      :filter="hasFilter"
      auto-option-focus
      :auto-filter-focus="hasFilter"
      reset-filter-on-hide
      :checkmark
      :options="options"
      :show-clear="clearable"
      :option-label="optionLabelProperty"
      :option-disabled="optionDisabledProperty"
      :option-value="optionValueProperty"
      class="w-full"
      scroll-height="18rem"
      :disabled="disabled"
      :readonly="readonly"
      @blur="onInputBlur"
      @change="emits('change', $event)"
    >
      <template #value="slotProps">
        <slot name="value" :value="{ value: slotProps.value, placeholder: slotProps.placeholder }">
          <div v-if="formatter" v-html="formatter(slotProps.value, 'value')" />
          <div v-else-if="value">
            {{ options.find(e => e[optionValueProperty] === value)?.[optionLabelProperty] ?? value }}
          </div>
        </slot>
      </template>
      <template #option="{ option, index }">
        <slot name="option" :option="{ option, index }">
          <div v-if="formatter" v-html="formatter(option, 'option')" />
        </slot>
      </template>
    </Select>
  </BaseInput>
</template>

<style scoped>

</style>
