<script setup lang="ts">
import {ref} from 'vue'
import BaseInput from './BaseInput.vue'
import type {BaseInputProps} from './types'


// eslint-disable-next-line vue/define-macros-order
const props = withDefaults(defineProps<{
    inputClass?: string
} & BaseInputProps>(), {})

const emits = defineEmits<{
    keydown: [e: KeyboardEvent]
    change: [e: any]
}>()

const value = defineModel<any>('modelValue')

const inputRef = ref()

function focus() {
    inputRef.value.$el.focus()
}

defineExpose({focus})
</script>

<template>
    <BaseInput v-bind="props" @click="focus">
    <Textarea
        ref="inputRef"
        v-model="value"
        :disabled="disabled"
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
