<script setup lang="ts">
import { ref } from 'vue'
import BaseInput from './BaseInput.vue'
import type { BaseInputProps } from './types'

const props = withDefaults(defineProps<{} & BaseInputProps>(), {})
const emits = defineEmits<{
  change: [event: Event]
}>()
const value = defineModel<any>('modelValue', { default: ref().value })

const inputRef = ref()

function focus() {
  inputRef.value.$el.focus()
}
function onLabelClicked() {
  if (!props.disabled) {
    inputRef.value.$el.children[0].click()
  }
}

function onCheckboxChange(evt) {
  emits('change', evt)
}

onMounted(() => {
  inputRef.value.$el.children[0].addEventListener('keydown', (evt: KeyboardEvent) => {
    if (evt.key === 'Enter') {
      onLabelClicked()
    }
  })
})

defineExpose({ focus })
</script>

<template>
  <BaseInput v-bind="props" @label-clicked="onLabelClicked">
    <Checkbox ref="inputRef" v-model="value" v-bind="{ disabled, readonly }" binary @change="onCheckboxChange" />
  </BaseInput>
</template>

<style scoped>

</style>
