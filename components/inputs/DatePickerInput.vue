<script setup lang="ts">
import { ref } from 'vue'
import BaseInput from './BaseInput.vue'
import type { BaseInputProps } from './types'

const props = withDefaults(defineProps<{
  manualInput?: boolean
} & BaseInputProps>(), {
  manualInput: false,
})
const value = defineModel<any>('modelValue')

const inputRef = ref()

function focus() {
  inputRef.value.$el.focus()
}

defineExpose({ focus, inputRef })
</script>

<template>
  <BaseInput v-bind="props" @click="focus">
    <DatePicker
      ref="inputRef"
      v-model="value"
      :placeholder="placeholder"
      date-format="yy-mm-dd"
      class="w-full"
      show-icon
      :disabled="disabled"
      :readonly="readonly"
      :manual-input="manualInput"
    />
  </BaseInput>
</template>

<style scoped>

</style>
