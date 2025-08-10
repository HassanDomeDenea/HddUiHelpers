<script setup lang="ts">
import { ref } from 'vue'
import BaseInput from './BaseInput.vue'
import type { BaseInputProps } from './types'
import type { ComponentExposed } from 'vue-component-type-helpers';
import { get } from 'lodash-es';

const props = withDefaults(defineProps<{
  options: any[]
    optionDisabledProperty?: string | null
    optionIconProperty?: string | null
  optionLabelProperty?: string | null
  optionValueProperty?: string | null
  clearable?: boolean
} & BaseInputProps>(), {
    optionIconProperty: 'icon',
  optionDisabledProperty: 'disabled',
  optionLabelProperty: 'label',
  optionValueProperty: 'value',
  clearable: false,
})
const value = defineModel<any>('modelValue')

const inputRef = ref()

const optionLabelClass = computed(()=>{
    if(props.size === 'small'){
        return 'text-sm'
    }else if(props.size === 'large'){
        return 'text-lg'
    }else{
        return '';
    }
})

function focus() {
  inputRef.value.$el.focus()
}
const hasError = computed(()=>!!props.error)
const baseInputRef = useTemplateRef<ComponentExposed<typeof BaseInput>>('baseInputRef')
defineExpose({ focus, hasError, baseInputRef, disabled: props.disabled })
</script>

<template>
  <BaseInput ref="baseInputRef" v-bind="props">
    <SelectButton
      v-model="value"
      :allow-empty="clearable"
      :disabled="disabled"
      :options="options"
      :option-label="optionLabelProperty"
      :option-value="optionValueProperty"
      :invalid="hasError"
    >
      <template #option="{ option }">
        <slot name="option" :option="option">
            <div class="flex gap-1" :class="[optionLabelClass]">
                <i v-if="get(option,optionIconProperty)" :class="get(option,optionIconProperty)"></i>
                {{ get(option,optionLabelProperty) }}
            </div>
        </slot>
      </template>
    </SelectButton>
  </BaseInput>
</template>

<style scoped>

</style>
