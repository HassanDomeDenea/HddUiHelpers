<script setup lang="ts">
import { useHddBaseInputUtils } from 'HddUiHelpers/components/inputs/inputsUtils.ts';
import BaseInput from './BaseInput.vue';
import type { BaseInputSlots, TextInputProps } from './types';

const props = withDefaults(defineProps<TextInputProps>(), {
  type: 'text',
});
const slots = defineSlots<BaseInputSlots>();

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

function select() {
  inputRef.value.$el.select();
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

function onInputChange() {
  if (props.lazy) {
    value.value = localValue.value;
  }
}

const { exposed, baseInputForwardedProps, fieldUniqueId, generalInputProps } = useHddBaseInputUtils(props);

defineExpose({ select, focus, ...exposed });
</script>

<template>
  <BaseInput ref="baseInputRef" v-bind="baseInputForwardedProps" @label-clicked="focus">
    <template v-for="(_, name) in slots" #[name]>
      <!-- We render the slot function provided by the parent (App) -->
      <slot :name="name" :value="value" />
    </template>

    <InputText
      :id="fieldUniqueId"
      ref="inputRef"
      v-bind="generalInputProps"
      v-keyfilter="filterPattern"
      :model-value="lazy ? localValue : value"
      :placeholder="placeholder"
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
