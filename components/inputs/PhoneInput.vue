<script setup lang="ts">
import { ref } from 'vue';
import BaseInput from './BaseInput.vue';
import type { BaseInputProps } from './types';
import type { ComponentExposed } from 'vue-component-type-helpers';

const props = withDefaults(
    defineProps<
        {
            mask?: string;
        } & BaseInputProps
    >(),
    {
        placeholder: '07x xxxx xxxx',
        mask: '999 9999 9999',
    },
);
const emits = defineEmits<{
    keydown: [e: KeyboardEvent];
}>();
const value = defineModel<any>('modelValue');
const { t } = useI18n();

const inputRef = ref();

function focus() {
    inputRef.value.$el.focus();
}

function onKeyDown(e: KeyboardEvent) {
    emits('keydown', e);
}

const baseInputRef = useTemplateRef<ComponentExposed<typeof BaseInput>>('baseInputRef');
const hasError = computed(() => !!props.error);
defineExpose({ focus, hasError, baseInputRef, disabled: props.disabled });
</script>

<template>
    <BaseInput ref="baseInputRef" v-bind="props" @click="focus">
        <InputMask
            ref="inputRef"
            v-model="value"
            :size="size"
            :disabled="disabled"
            :invalid="hasError"
            :auto-clear="false"
            class="dir-ltr"
            :class="t('dir') === 'rtl' ? 'text-right' : 'text-left'"
            :placeholder="placeholder"
            fluid
            :mask="mask"
            @keydown="onKeyDown"
        />
    </BaseInput>
</template>

<style scoped></style>
