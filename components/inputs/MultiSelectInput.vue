<script setup lang="ts">
import { ref } from 'vue'
import type { SelectChangeEvent } from 'primevue/select'
import BaseInput from './BaseInput.vue'
import type { BaseInputProps } from './types'

const props = withDefaults(defineProps<{
  options: any[]
  optionLabelProperty?: string | null
  optionValueProperty?: string | null
  resetFilterOnHide?: boolean
  display?: 'comma' | 'chip'
  maxSelectedLabels?: number
  selectionLimit?: number
  showToggleAll?: boolean
} & BaseInputProps>(), {
  optionLabelProperty: 'name',
  optionValueProperty: 'id',
  maxSelectedLabels: 5,
  display: 'comma',
  showToggleAll: true,
})
const emits = defineEmits<{
  change: [event: SelectChangeEvent]
}>()
const value = defineModel<any>('modelValue')

const inputRef = ref()

function focus() {
  if (!props.disabled) {
    inputRef.value.show()
  }
}

function onInputBlur() {

}

const { t } = useI18n()

defineExpose({ focus })
</script>

<template>
  <BaseInput v-bind="props" @click="focus">
    <template v-if="$slots.addon" #addon>
      <slot name="addon" />
    </template>
    <template v-if="$slots.helper || helperText" #helper>
      <slot name="helper">
        <div v-html="helperText" />
      </slot>
    </template>
    <MultiSelect
      ref="inputRef"
      v-model="value"
      :placeholder="placeholder"
      :auto-filter-focus="true"
      variant="filled"
      :display="display"
      :max-selected-labels="maxSelectedLabels"
      :selection-limit="selectionLimit"
      :show-toggle-all="showToggleAll"
      auto-option-focus reset-filter-on-hide filled fluid highlightonselect filter
      :options="options"
      :selected-items-label="`{0} ${t('multiSelectItemsSelectedLabel')}`"
      :option-label="optionLabelProperty"
      :option-value="optionValueProperty"
      class="w-full"
      scroll-height="18rem"
      :disabled="disabled"
      :readonly="readonly"
      @blur="onInputBlur"
      @change="emits('change', $event)"
    />
  </BaseInput>
</template>

<style scoped>

</style>
