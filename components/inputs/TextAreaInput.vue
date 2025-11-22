<script setup lang="ts">
import { useHddBaseInputUtils } from 'HddUiHelpers/components/inputs/inputsUtils.ts';
import { ref } from 'vue';
import BaseInput from './BaseInput.vue';
import type { BaseInputProps } from './types';

const props = defineProps<
  BaseInputProps & {
    initialRows?: number;
  }
>();

const emits = defineEmits<{
  keydown: [e: KeyboardEvent];
  change: [e: any];
}>();

const value = defineModel<any>('modelValue');

const inputRef = ref();

function focus() {
  inputRef.value.$el.focus();
}

const { exposed, baseInputForwardedProps, fieldUniqueId, generalInputProps } = useHddBaseInputUtils(props);

defineExpose({ focus, ...exposed });
</script>

<template>
  <BaseInput v-bind="baseInputForwardedProps" @click="focus">
    <Textarea
      v-bind="generalInputProps"
      :id="fieldUniqueId"
      ref="inputRef"
      v-model="value"
      :rows="initialRows"
      :placeholder="placeholder"
      :name="name"
      class="w-full"
      auto-resize
      :pt="{
        root: {
          class: inputClass,
        },
      }"
      @change="emits('change', $event)"
      @keydown="emits('keydown', $event)"
    />
  </BaseInput>
</template>

<style scoped></style>
