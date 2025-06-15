<script setup lang="ts">
import type { TextInputProps } from './types'
import uniqueId from 'lodash/uniqueId'
import BaseInput from './BaseInput.vue'

const props = withDefaults(defineProps<TextInputProps>(), {
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

const fieldUniqueId = computed(() => {
  return uniqueId(props.name ?? 'unnamed')
})

const hasError = computed(()=>!!props.error)

defineExpose({ focus, hasError })
</script>

<template>
  <BaseInput
    v-bind="props"
    :input-id="fieldUniqueId"
    @label-clicked="focus"
  >
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
      :id="fieldUniqueId"
      ref="inputRef"
      v-model="value"
      v-keyfilter="filterPattern"
      :disabled="disabled"
      :placeholder="placeholder"
      fluid
      :size="size"
      :invalid="!!error"
      :class="[inputClass]"
      :aria-describedby="`${error ? `${fieldUniqueId}-error` : ''} ${$slots.helper || helperText ? `${fieldUniqueId}-desc` : ''}`"
      :pt="inputTextPt"
      :autocomplete="autocomplete"
      @blur="emits('blur', $event)"
      @focus="emits('focus', $event)"
      @keydown="emits('keydown', $event)"
    />
  </BaseInput>
</template>

<style scoped>

</style>
