<script setup lang="ts">
import { useHddBaseInputUtils } from 'HddUiHelpers/components/inputs/inputsUtils.ts';
import { ref } from 'vue';
import BaseInput from './BaseInput.vue';
import type { BaseInputProps } from './types';

const props = withDefaults(
  defineProps<
    {
      length?: number;
    } & BaseInputProps
  >(),
  {
    length: 4,
  },
);
const emits = defineEmits<{
  keydown: [e: KeyboardEvent];
  complete: [e: string];
}>();
const value = defineModel<any>('modelValue');

const inputRef = ref();

function focus() {
  inputRef.value.$el.querySelector('input').focus();
}

watch(value, (val) => {
  if (val.length >= props.length) {
    emits('complete', val);
  }
});

const { exposed, baseInputForwardedProps, fieldUniqueId, generalInputProps } = useHddBaseInputUtils(props);

defineExpose({ focus, ...exposed });
</script>

<template>
  <BaseInput v-bind="baseInputForwardedProps" @click="focus">
    <InputOtp
      v-bind="generalInputProps"
      ref="inputRef"
      v-model="value"
      :input-id="fieldUniqueId"
      mask
      autocomplete="off"
      integer-only
      :length="length"
      class="dir-ltr w-full"
      :placeholder="placeholder"
      :pt="{
        pcInput: {
          root: {
            autocomplete: 'new-password',
            autofill: 'off',
          },
        },
      }"
      @keydown="emits('keydown', $event)"
    />
  </BaseInput>
</template>

<style scoped></style>
