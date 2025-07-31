<script setup lang="ts">
import { ref } from 'vue'
import BaseInput from './BaseInput.vue'
import type { BaseInputProps } from './types'
import type { ComponentExposed } from 'vue-component-type-helpers';

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
const hasError = computed(()=>!!props.error)
 const baseInputRef = useTemplateRef<ComponentExposed<typeof BaseInput>>('baseInputRef')
defineExpose({ focus,hasError ,baseInputRef,disabled: props.disabled })
</script>

<template>
  <BaseInput ref="baseInputRef" v-bind="props" @click="focus">
    <InputOtp
      ref="inputRef"
      v-model="value"
      mask
      :invalid="hasError"
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
