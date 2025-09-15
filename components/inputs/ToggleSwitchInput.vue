<script setup lang="ts">
import { ref } from 'vue'
import BaseInput from './BaseInput.vue'
import type { BaseInputProps } from './types'
import type { ComponentExposed } from 'vue-component-type-helpers';
import { useHddBaseInputUtils } from 'HddUiHelpers/components/inputs/inputsUtils.ts';

const props = withDefaults(defineProps<{} & BaseInputProps>(), {})
const value = defineModel<any>('modelValue')

const inputRef = ref()

function focus() {
  inputRef.value.$el.focus()
}
const {exposed,baseInputForwardedProps,fieldUniqueId,generalInputProps} = useHddBaseInputUtils(props);

defineExpose({ focus,...exposed })
</script>

<template>
  <BaseInput  v-bind="baseInputForwardedProps" @label-clicked="inputRef.$el.children[0].click()">
    <ToggleSwitch ref="inputRef"  v-model="value" :input-id="fieldUniqueId" v-bind="generalInputProps"  />
  </BaseInput>
</template>

<style scoped>

</style>
