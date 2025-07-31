<script setup lang="ts">
import { ref } from 'vue'
import BaseInput from './BaseInput.vue'
import type { BaseInputProps } from './types'
import type { ComponentExposed } from 'vue-component-type-helpers';

const props = withDefaults(defineProps<{} & BaseInputProps>(), {})
const value = defineModel<any>('modelValue')

const inputRef = ref()

function focus() {
  inputRef.value.$el.focus()
}
const hasError = computed(()=>!!props.error)
const baseInputRef = useTemplateRef<ComponentExposed<typeof BaseInput>>('baseInputRef')
defineExpose({ focus, hasError, baseInputRef, disabled: props.disabled })
</script>

<template>
  <BaseInput ref="baseInputRef" v-bind="props" @label-clicked="inputRef.$el.children[0].click()">
    <ToggleSwitch  ref="inputRef" v-model="value" v-bind="{ disabled, readonly }" :invalid="hasError" />
  </BaseInput>
</template>

<style scoped>

</style>
