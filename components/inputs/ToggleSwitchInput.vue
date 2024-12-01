<script setup lang="ts">
import { ref } from 'vue'
import BaseInput from './BaseInput.vue'
import type { BaseInputProps } from './types'

const props = withDefaults(defineProps<{} & BaseInputProps>(), {})
const value = defineModel<any>('modelValue')

const inputRef = ref()

function focus() {
  inputRef.value.$el.focus()
}

defineExpose({ focus })
</script>

<template>
  <BaseInput v-bind="props" @label-clicked="inputRef.$el.children[0].click()">
    <ToggleSwitch ref="inputRef" v-model="value" v-bind="{ disabled, readonly }" />
  </BaseInput>
</template>

<style scoped>

</style>
