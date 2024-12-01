<script setup lang="ts">
import BaseInput from './BaseInput.vue'
import type { BaseInputProps } from './types'

const props = withDefaults(defineProps<{
  inputClass?: string
  type?: string
} & BaseInputProps>(), {
  type: 'text',
})
const emits = defineEmits<{
  blur: [e: FocusEvent]
  focus: [e: FocusEvent]
  keydown: [e: KeyboardEvent]
}>()
const value = defineModel<any>('modelValue', { required: true })

const inputRef = ref()

function focus() {
  inputRef.value.$el.focus()
}

const inputTextPt = computed(() => {
  return {
    root: {
      readonly: props.readonly,
      type: props.type,
      name: props.name,
    },
  }
})

defineExpose({ focus })
</script>

<template>
  <BaseInput v-bind="props" @label-clicked="focus">
    <template #labelText>
      <slot name="label-text" />
    </template>
    <template v-if="$slots.addon " #addon>
      <slot name="addon" />
    </template>
    <template v-if="$slots.helper || helperText" #helper>
      <slot name="helper">
        <div v-html="helperText" />
      </slot>
    </template>
    <InputText
      ref="inputRef"
      v-model="value"
      :disabled="disabled"
      :placeholder="placeholder"
      class="!w-full"
      :class="[inputClass]"
      :pt="inputTextPt"
      @blur="emits('blur', $event)"
      @focus="emits('focus', $event)"
      @keydown="emits('keydown', $event)"
    />
  </BaseInput>
</template>

<style scoped>

</style>
