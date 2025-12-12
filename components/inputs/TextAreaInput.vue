<script setup lang="ts">
import { useHddBaseInputUtils } from 'HddUiHelpers/components/inputs/inputsUtils.ts'
import { ref } from 'vue'
import BaseInput from './BaseInput.vue'
import type { BaseInputProps } from './types'

const props = withDefaults(
  defineProps<
    BaseInputProps & {
      initialRows?: number
      autoResize?: boolean
      noResize?: boolean
    }
  >(),
  {
    autoResize: true,
  }
)
const emits = defineEmits<{
  keydown: [e: KeyboardEvent]
  change: [e: any]
}>()

const value = defineModel<any>('modelValue')

const inputRef = ref()

function focus() {
  inputRef.value.$el.focus()
}
function select() {
  inputRef.value.$el.select()
}

const { exposed, baseInputForwardedProps, fieldUniqueId, generalInputProps } =
  useHddBaseInputUtils(props)

defineExpose({ focus, select, ...exposed })
</script>

<template>
  <BaseInput v-bind="baseInputForwardedProps" @click="focus">
    <Textarea
      v-bind="generalInputProps"
      :id="fieldUniqueId"
      ref="inputRef"
      v-model="value"
      :rows="initialRows"
      :placeholder="placeholder"
      :name="name"
      :auto-resize="autoResize"
      :noresize="noResize"
      class="w-full"
      :pt="{
        root: {
          class: inputClass,
          style: { resize: noResize ? 'none' : '' },
        },
      }"
      @change="emits('change', $event)"
      @keydown="emits('keydown', $event)"
    />
  </BaseInput>
</template>

<style scoped></style>
