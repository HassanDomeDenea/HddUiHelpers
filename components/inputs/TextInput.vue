<script setup lang="ts">
import uniqueId from 'lodash/uniqueId';
import type { ComponentExposed } from 'vue-component-type-helpers';
import BaseInput from './BaseInput.vue';
import type { TextInputProps } from './types';

const props = withDefaults(defineProps<TextInputProps>(), {
    type: 'text',
});

const emits = defineEmits<{
    blur: [e: FocusEvent];
    focus: [e: FocusEvent];
    keydown: [e: KeyboardEvent];
}>();
const value = defineModel<any>('modelValue', { required: true });
const localValue = ref(null);

if (props.lazy) {
    watch(
        value,
        (_value) => {
            localValue.value = _value;
        },
        {
            immediate: true,
        },
    );
}


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

function onInputChange() {
    if (props.lazy) {
        value.value = localValue.value;
    }
}

const hasError = computed(() => !!props.error);
const baseInputRef = useTemplateRef<ComponentExposed<typeof BaseInput>>('baseInputRef');

defineExpose({ focus, hasError, baseInputRef });
</script>

<template>
    <BaseInput ref="baseInputRef" v-bind="props" :input-id="fieldUniqueId" @label-clicked="focus">
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
        <InputText
            :id="fieldUniqueId"
            ref="inputRef"
            v-keyfilter="filterPattern"
            :model-value="lazy ? localValue : value"
            :disabled="disabled"
            :placeholder="placeholder"
            fluid
            :size="size"
            :invalid="!!error"
            :class="[inputClass]"
            :aria-describedby="`${error ? `${fieldUniqueId}-error` : ''} ${$slots.helper || helperText ? `${fieldUniqueId}-desc` : ''}`"
            :pt="inputTextPt"
            :autocomplete="autocomplete"
            @update:model-value="lazy ? (localValue = $event) : (value = $event)"
            @blur="emits('blur', $event)"
            @focus="emits('focus', $event)"
            @change="onInputChange"
            @keydown="emits('keydown', $event)"
        />
    </BaseInput>
</template>

<style scoped></style>
