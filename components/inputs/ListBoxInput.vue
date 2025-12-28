<script setup lang="ts">
import { useHddBaseInputUtils } from 'HddUiHelpers/components/inputs/inputsUtils.ts'
import { groupBy } from 'lodash-es'
import reduce from 'lodash/reduce'
import type { SelectChangeEvent } from 'primevue/select'
import { ref } from 'vue'
import BaseInput from './BaseInput.vue'
import type { BaseInputProps } from './types'

const props = withDefaults(
  defineProps<
    {
      options: any[]
      optionLabelProperty?: string
      optionValueProperty?: string
      optionGroupLabel?: string
      optionGroupChildren?: string
      filter?: boolean
      multiple?: boolean
      checkmark?: boolean
      scrollHeight?: string
      groupItemsBy?: string
      groupsLabels?: Record<string | number, string>
    } & BaseInputProps
  >(),
  {
    optionLabelProperty: 'name',
    optionValueProperty: 'id',
    optionGroupChildren: 'items',
    checkmark: true,
  }
)
const emits = defineEmits<{
  change: [event: SelectChangeEvent]
}>()
const value = defineModel<any>('modelValue')
const computedOptions = computed(() =>
  props.groupItemsBy
    ? reduce(
        groupBy(props.options, props.groupItemsBy),
        function (carry, value, key) {
          carry.push({
            label: props.groupsLabels?.[key] ?? key,
            items: value,
          })
          return carry
        },
        [] as { label: string; items: any[] }[]
      )
    : props.options
)
const inputRef = ref()

function focus() {
  if (!props.disabled) {
    // inputRef.value.show()
  }
}

function onInputBlur() {}

const { exposed, baseInputForwardedProps, generalInputProps } = useHddBaseInputUtils(props)

defineExpose({ focus, ...exposed })
</script>

<template>
  <BaseInput v-bind="baseInputForwardedProps" @click="focus">
    <template v-if="$slots.addon" #addon>
      <slot name="addon" />
    </template>
    <template v-if="$slots.helper || helperText" #helper>
      <slot name="helper">
        <div v-html="helperText" />
      </slot>
    </template>
    <Listbox
      v-bind="generalInputProps"
      ref="inputRef"
      v-model="value"
      :filter="filter"
      :filter-placeholder="placeholder"
      :multiple="multiple"
      :option-label="optionLabelProperty"
      :option-value="optionValueProperty"
      :options="computedOptions"
      :option-group-children="groupItemsBy ? 'items' : optionGroupChildren"
      :option-group-label="groupItemsBy ? 'label' : optionGroupLabel"
      :checkmark="checkmark"
      :scroll-height="scrollHeight"
      class="w-full"
      @change="emits('change', $event)"
    />
  </BaseInput>
</template>

<style scoped></style>
