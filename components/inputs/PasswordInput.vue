<script setup lang="ts">
import uniqueId from 'lodash/uniqueId';
import type { PasswordProps } from 'primevue';
import BaseInput from './BaseInput.vue';
import type { BaseInputProps } from './types';

const props = withDefaults(
    defineProps<
        BaseInputProps & {
            originalProps?: PasswordProps;
            feedback?: boolean;
            toggleMask?: boolean;
        }
    >(),
    {
        feedback: false,
        toggleMask: true,
    },
);

const emits = defineEmits<{
    blur: [e: FocusEvent];
    focus: [e: FocusEvent];
    keydown: [e: KeyboardEvent];
}>();
const value = defineModel<any>('modelValue', { required: true });

const inputRef = ref();

function focus() {
    inputRef.value.$el.focus();
}

const inputTextPt = computed(() => {
    return {
        root: {
            readonly: props.readonly,
            type: props.type,
            name: props.name,
        },
    };
});

const fieldUniqueId = computed(() => {
    return uniqueId(props.name ?? 'unnamed');
});

const hasError = computed(() => !!props.error);

defineExpose({ focus, hasError });
</script>

<template>
    <BaseInput v-bind="props" :input-id="fieldUniqueId" @label-clicked="focus">
        <template #labelText>
            <slot name="label-text" />
        </template>
        <template v-if="$slots.addon" #addon>
            <slot name="addon" />
        </template>
        <template v-if="$slots.helper || helperText" #helper>
            <slot name="helper">
                <div v-html="helperText" />
            </slot>
        </template>
        <Password
            :input-id="fieldUniqueId"
            ref="inputRef"
            v-model="value"
            :disabled="disabled"
            :placeholder="placeholder"
            fluid
            :size="size"
            :invalid="!!error"
            :class="[inputClass]"
            :aria-describedby="`${error ? `${fieldUniqueId}-error` : ''} ${$slots.helper || helperText ? `${fieldUniqueId}-desc` : ''}`"
            :pt="inputTextPt"
            @blur="emits('blur', $event)"
            @focus="emits('focus', $event)"
            @keydown="emits('keydown', $event)"
            :hidden="false"
            :feedback="feedback"
            :variant="variant"
            :toggleMask="toggleMask"
            v-bind="originalProps"
        />
    </BaseInput>
</template>

<style>
.hdd-form-control {
    .p-password-toggle-mask-icon {
        @apply z-1;
    }
}
</style>
