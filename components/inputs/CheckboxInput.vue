<script setup lang="ts">
import type { BaseInputProps } from './types'
import uniqueId from 'lodash/uniqueId'
import { ref } from 'vue'
import BaseInput from './BaseInput.vue'

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

function onCheckboxChange(evt: Event) {
  emits('change', evt)
}

onMounted(() => {
  inputRef.value.$el.children[0].addEventListener('keydown', (evt: KeyboardEvent) => {
    if (evt.key === 'Enter') {
      onLabelClicked()
    }
  })
})

const fieldUniqueId = computed(() => {
  return uniqueId(props.name ?? 'unnamed')
})

defineExpose({ focus })
</script>

<template>
  <BaseInput
    v-bind="{ ...props, floatingLabel: false, infieldTopAlignedLabel: false }" :input-id="fieldUniqueId"

    :floating-label="false" :infield-top-aligned-label="false"
  >
    <Checkbox ref="inputRef" v-model="value" :input-id="fieldUniqueId" v-bind="{ disabled, readonly }" binary @change="onCheckboxChange" />
  </BaseInput>
</template>

<style scoped>

</style>
