<script setup lang="ts">
import {ref} from 'vue'
import type {SelectChangeEvent} from 'primevue/select'
import Select from 'primevue/select'
import BaseInput from './BaseInput.vue'
import type {BaseInputProps} from './types'
import type { ComponentExposed } from 'vue-component-type-helpers';

const props = withDefaults(defineProps<{
    options: any[]
    optionLabelProperty?: string | null
    optionDisabledProperty?: string | null
    optionValueProperty?: string | null
    formatter?: ((OptionOrValue: any, type: 'option' | 'value') => string)
    clearable?: boolean
    checkmark?: boolean
    hasFilter?: boolean
} & BaseInputProps>(), {
    optionLabelProperty: 'name',
    optionDisabledProperty: 'disabled',
    optionValueProperty: 'id',
    clearable: false,
    checkmark: true,
    hasFilter: true,
})
const emits = defineEmits<{
    change: [event: SelectChangeEvent]
}>()
const value = defineModel<any>('modelValue')

const inputRef = ref()

function focus(_show:boolean=false) {
    if (!props.disabled) {
        if(_show){
            inputRef.value.show()
        }else{
            inputRef.value.$refs.focusInput.focus()
        }
    }
}

function onInputBlur() {

}
const hasError = computed(()=>!!props.error)
const baseInputRef = useTemplateRef<ComponentExposed<typeof BaseInput>>('baseInputRef')
defineExpose({focus, hasError, baseInputRef, disabled: props.disabled })
</script>

<template>
    <BaseInput ref="baseInputRef" v-bind="props" @click="focus">

        <Select
            ref="inputRef"
            v-model="value"
            :size="size"
            :placeholder="placeholder"
            :filter="hasFilter"
            auto-option-focus
            :auto-filter-focus="hasFilter"
            reset-filter-on-hide
            :checkmark
            :options="options"
            :show-clear="clearable"
            :invalid="hasError"
            :option-label="optionLabelProperty"
            :option-disabled="optionDisabledProperty"
            :option-value="optionValueProperty"
            class="!w-full"
            scroll-height="18rem"
            :disabled="disabled"
            :readonly="readonly"
            @blur="onInputBlur"
            @change="emits('change', $event)"
        >
            <template #value="slotProps">
                <slot name="value" :value="{ value: slotProps.value, placeholder: slotProps.placeholder }">
                    <div v-if="formatter" v-html="formatter(slotProps.value, 'value')"/>
                    <div v-else-if="value">
                        {{ options.find(e => e[optionValueProperty] === value)?.[optionLabelProperty] ?? value }}
                    </div>
                </slot>
            </template>
            <template #option="{ option, index }">
                <slot name="option" :option="{ option, index }">
                    <div v-if="formatter" v-html="formatter(option, 'option')"/>
                </slot>
            </template>
        </Select>
    </BaseInput>
</template>

<style scoped>

</style>
