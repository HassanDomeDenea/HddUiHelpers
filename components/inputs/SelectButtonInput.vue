<script setup lang="ts">
import { ref } from 'vue'
import BaseInput from './BaseInput.vue'
import type { BaseInputProps } from './types'
import type { ComponentExposed } from 'vue-component-type-helpers';
import { get } from 'lodash-es';
import { useHddBaseInputUtils } from 'HddUiHelpers/components/inputs/inputsUtils.ts';

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
const {exposed,baseInputForwardedProps,fieldUniqueId,generalInputProps} = useHddBaseInputUtils(props);

defineExpose({ focus, ...exposed})
</script>

<template>
  <BaseInput v-bind="baseInputForwardedProps">
    <SelectButton
        v-bind="generalInputProps"
      v-model="value"
      :allow-empty="clearable"
      :option-label="optionLabelProperty"
      :option-value="optionValueProperty"

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
