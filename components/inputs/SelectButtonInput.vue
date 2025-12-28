<script setup lang="ts">
import { useHddBaseInputUtils } from 'HddUiHelpers/components/inputs/inputsUtils.ts'
import { get } from 'lodash-es'
import { ref } from 'vue'
import BaseInput from './BaseInput.vue'
import type { BaseInputProps } from './types'

const props = withDefaults(
  defineProps<
    {
      options: any[]
      optionDisabledProperty?: string
      optionIconProperty?: string
      optionLabelProperty?: string
      optionValueProperty?: string
      clearable?: boolean
      optionClass?: any
    } & BaseInputProps
  >(),
  {
    optionIconProperty: 'icon',
    optionDisabledProperty: 'disabled',
    optionLabelProperty: 'name',
    optionValueProperty: 'id',
    clearable: false,
  }
)
const value = defineModel<any>('modelValue')

const inputRef = ref()

const optionLabelClass = computed(() => {
  if (props.size === 'small') {
    return 'text-sm'
  } else if (props.size === 'large') {
    return 'text-lg'
  } else {
    return ''
  }
})

function focus() {
  inputRef.value.$el.focus()
}
const { exposed, baseInputForwardedProps, fieldUniqueId, generalInputProps } =
  useHddBaseInputUtils(props)

defineExpose({ focus, ...exposed })
</script>

<template>
  <BaseInput v-bind="baseInputForwardedProps">
    <SelectButton
      v-bind="generalInputProps"
      v-model="value"
      :options="options"
      :allow-empty="clearable"
      :option-label="optionLabelProperty"
      :option-value="optionValueProperty"
    >
      <template #option="{ option }">
        <slot name="option" :option="option">
          <div class="flex justify-center gap-1" :class="[optionLabelClass, optionClass]">
            <i
              v-if="get(option, optionIconProperty)"
              :class="get(option, optionIconProperty)"
              class="me-1"
            ></i>
            <span>{{ get(option, optionLabelProperty) }}</span>
          </div>
        </slot>
      </template>
    </SelectButton>
  </BaseInput>
</template>

<style scoped></style>
