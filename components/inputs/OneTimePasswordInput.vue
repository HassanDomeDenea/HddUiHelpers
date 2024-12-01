<script setup lang="ts">
import { ref } from 'vue'
import BaseInput from './BaseInput.vue'
import type { BaseInputProps } from './types'

const props = withDefaults(defineProps<{
  length?: number
} & BaseInputProps>(), {
  length: 4,
})
const emits = defineEmits<{
  keydown: [e: KeyboardEvent]
  complete: [e: string]
}>()
const value = defineModel<any>('modelValue')

const inputRef = ref()

function focus() {
  inputRef.value.$el.querySelector('input').focus()
}

watch(value, (val) => {
  if (val.length >= props.length) {
    emits('complete', val)
  }
})

defineExpose({ focus })
</script>

<template>
  <BaseInput v-bind="props" @click="focus">
    <InputOtp
      ref="inputRef"
      v-model="value"
      mask
      name="otp"
      autocomplete="off"
      integer-only
      :disabled="disabled"
      :length="length"
      class="w-full dir-ltr"
      :placeholder="placeholder"
      fluid
      :pt="{
        pcInput: {
          root: {
            autocomplete: 'new-password',
            autofill: 'off',
          },
        },
      }"
      @keydown="emits('keydown', $event)"
    />
  </BaseInput>
</template>

<style scoped>

</style>
