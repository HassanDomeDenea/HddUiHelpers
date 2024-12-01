<script setup lang="ts">
import { ref } from 'vue'
import type { InputNumberInputEvent } from 'primevue/inputnumber'
import BaseInput from './BaseInput.vue'
import type { BaseInputProps, classType } from './types'

const props = withDefaults(defineProps<{
  inputClass?: classType
  step?: number
  precision?: number
  min?: number
  max?: number
  useGrouping?: boolean
  showButtons?: boolean
  allowEmpty?: boolean
  immediateUpdate?: boolean
  textAddon?: string
} & BaseInputProps>(), {
  step: 1,
  useGrouping: true,
  precision: 20,
})
const emits = defineEmits<{
  (e: 'keydown', event: KeyboardEvent)
  (e: 'input', event: InputNumberInputEvent)
  (e: 'updated', event: number | null)
}>()
const value = defineModel<any>('modelValue')

const inputRef = ref()

function focus() {
  inputRef.value.$refs.input.$el.focus()
}

function select() {
  inputRef.value.$refs.input.$el.select()
}

function onInput(event: InputNumberInputEvent) {
  emits('input', event)
  if (props.immediateUpdate) {
    value.value = event.value
  }
}

defineExpose({ focus, select })
</script>

<template>
  <BaseInput v-bind="props" @click="focus">
    <template #labelText>
      <slot name="label-text" />
    </template>
    <template v-if="$slots.addon || textAddon" #addon>
      <slot name="addon">
        <InputGroupAddon>
          <span v-html="textAddon" />
        </InputGroupAddon>
      </slot>
    </template>
    <template v-if="$slots.helper" #helper>
      <slot name="helper" />
    </template>
    <InputNumber
      ref="inputRef"
      v-model="value"
      :disabled="disabled"
      :use-grouping="useGrouping"
      :readonly="readonly"
      class="w-full"
      :max-fraction-digits="precision"
      type="number"
      :class="inputClass"
      v-bind="{
        showButtons, min, max, step, allowEmpty,
      }"
      @keydown="emits('keydown', $event)"
      @input="onInput"
      @update:model-value="emits('updated', $event)"
    />
  </BaseInput>
</template>

<style scoped>

</style>
