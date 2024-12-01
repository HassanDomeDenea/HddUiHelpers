<script setup lang="ts">
import { ref } from 'vue'
import BaseInput from './BaseInput.vue'
import type { BaseInputProps } from './types'

withDefaults(defineProps<{
  mask?: string
} & BaseInputProps>(), {
  placeholder: '07x xxxx xxxx',
  mask: '999 9999 9999',
})
const emits = defineEmits<{
  keydown: [e: KeyboardEvent]
}>()
const value = defineModel<any>('modelValue')

const inputRef = ref()

function focus() {
  inputRef.value.$el.focus()
}

defineExpose({ focus })
</script>

<template>
  <BaseInput :label="label" :icon="icon" :inline="inline" @click="focus">
    <InputMask
      ref="inputRef"
      v-model="value"
      :disabled="disabled"
      class="w-full dir-ltr"
      :placeholder="placeholder"
      fluid
      :mask="mask"
      @keydown="emits('keydown', $event)"
    />
  </BaseInput>
</template>

<style scoped>

</style>
