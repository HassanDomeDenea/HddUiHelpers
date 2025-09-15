<script setup lang="ts">
import uniqueId from 'lodash/uniqueId';
import type { PasswordProps } from 'primevue';
import BaseInput from './BaseInput.vue';
import type { BaseInputProps } from './types';
import type { ComponentExposed } from 'vue-component-type-helpers';
import { useHddBaseInputUtils } from 'HddUiHelpers/components/inputs/inputsUtils.ts';

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
    inputRef.value.$el.querySelector('input').focus();
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

const {exposed,baseInputForwardedProps,fieldUniqueId,generalInputProps} = useHddBaseInputUtils(props);

defineExpose({ focus, ...exposed  });
</script>

<template>
    <BaseInput v-bind="baseInputForwardedProps" @label-clicked="focus">
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
            v-bind="{...generalInputProps,...originalProps}"
            ref="inputRef"
            v-model="value"
            :input-id="fieldUniqueId"
            :placeholder="placeholder"
            :class="[inputClass]"
            :aria-describedby="`${error ? `${fieldUniqueId}-error` : ''} ${$slots.helper || helperText ? `${fieldUniqueId}-desc` : ''}`"
            :pt="inputTextPt"
            :hidden="false"
            :feedback="feedback"
            :variant="variant"
            :toggle-mask="toggleMask"
            @blur="emits('blur', $event)"
            @focus="emits('focus', $event)"
            @keydown="emits('keydown', $event)"
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
