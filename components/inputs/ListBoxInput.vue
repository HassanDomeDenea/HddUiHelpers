<script setup lang="ts">
import {ref} from 'vue'
import type {SelectChangeEvent} from 'primevue/select'
import BaseInput from './BaseInput.vue'
import type {BaseInputProps} from './types'
import type { ComponentExposed } from 'vue-component-type-helpers';

const props = withDefaults(defineProps<{
    options: any[]
    optionLabelProperty?: string | null
    optionValueProperty?: string | null
    filter?: boolean
    multiple?: boolean
    checkmark?: boolean
    scrollHeight?: string
} & BaseInputProps>(), {
    optionLabelProperty: 'name',
    optionValueProperty: 'id',
    checkmark: true,
})
const emits = defineEmits<{
    change: [event: SelectChangeEvent]
}>()
const value = defineModel<any>('modelValue')

const inputRef = ref()

function focus() {
    if (!props.disabled) {
        // inputRef.value.show()
    }
}

function onInputBlur() {

}

const {t} = useI18n()
const hasError = computed(()=>!!props.error)
const baseInputRef = useTemplateRef<ComponentExposed<typeof BaseInput>>('baseInputRef')
defineExpose({focus,hasError,baseInputRef,disabled:props.disabled})
</script>

<template>
    <BaseInput v-bind="props" ref="baseInputRef" @click="focus">
        <template v-if="$slots.addon" #addon>
            <slot name="addon"/>
        </template>
        <template v-if="$slots.helper || helperText" #helper>
            <slot name="helper">
                <div v-html="helperText"/>
            </slot>
        </template>
        <Listbox
            ref="inputRef"
            v-model="value"
            :filter="filter"
            :placeholder="placeholder"
            :disabled="disabled"
            :multiple="multiple"

            :option-label="optionLabelProperty"
            :option-value="optionValueProperty"
            :options="options"
            :invalid="hasError"
            :checkmark="checkmark"
            :scroll-height="scrollHeight"
            class="w-full"
            :readonly="readonly"
            @change="emits('change', $event)"

        />
    </BaseInput>
</template>

<style scoped>

</style>
