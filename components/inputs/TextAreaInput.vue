<script setup lang="ts">
import {ref} from 'vue'
import BaseInput from './BaseInput.vue'
import type {BaseInputProps} from './types'
import type { ComponentExposed } from 'vue-component-type-helpers';


const props = defineProps<BaseInputProps>()

const emits = defineEmits<{
    keydown: [e: KeyboardEvent]
    change: [e: any]
}>()

const value = defineModel<any>('modelValue')

const inputRef = ref()

function focus() {
    inputRef.value.$el.focus()
}
const hasError = computed(()=>!!props.error)
const baseInputRef = useTemplateRef<ComponentExposed<typeof BaseInput>>('baseInputRef')

defineExpose({focus,hasError,baseInputRef})
</script>

<template>
    <BaseInput ref="baseInputRef" v-bind="props" @click="focus">
    <Textarea
        ref="inputRef"
        v-model="value"
        :disabled="disabled"
        :invalid="hasError"
        :placeholder="placeholder"
        class="w-full"
        auto-resize
        :pt="{
        root: {
          name,
          class: inputClass,
        },
      }"
        @change="emits('change', $event)"
        @keydown="emits('keydown', $event)"
    />
    </BaseInput>
</template>

<style scoped>

</style>
