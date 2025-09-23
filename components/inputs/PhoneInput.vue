<script setup lang="ts">
import { useHddBaseInputUtils } from 'HddUiHelpers/components/inputs/inputsUtils.ts';
import { ref } from 'vue';
import BaseInput from './BaseInput.vue';
import type { BaseInputProps } from './types';

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

const { exposed, baseInputForwardedProps, fieldUniqueId, generalInputProps } = useHddBaseInputUtils(props);

defineExpose({ focus, ...exposed });
</script>

<template>
  <BaseInput v-bind="baseInputForwardedProps" @click="focus">
    <InputMask
      v-bind="generalInputProps"
      :id="fieldUniqueId"
      ref="inputRef"
      v-model="value"
      :auto-clear="false"
      class="dir-ltr"
      :class="t('dir') === 'rtl' ? 'text-right' : 'text-left'"
      :placeholder="placeholder"
      :mask="mask"
      @keydown="onKeyDown"
    />
  </BaseInput>
</template>

<style scoped></style>
