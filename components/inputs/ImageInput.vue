<script setup lang="ts">
import { useHddBaseInputUtils } from 'HddUiHelpers/components/inputs/inputsUtils.ts';
import { ref } from 'vue';
import BaseInput from './BaseInput.vue';
import type { BaseInputProps } from './types';

const props = withDefaults(
  defineProps<
    {
      accept?: string;
      previewMaxWidth?: number;
      previewMaxHeight?: number;
    } & BaseInputProps
  >(),
  {
    accept: 'image/*',
    previewMaxHeight: 120,
    previewMaxWidth: 120,
  },
);
const emits = defineEmits<{
  change: [event: Event];
}>();
const value = defineModel<any>('modelValue', { default: ref().value });
const currentUrl = defineModel<any>('currentUrl', { default: ref().value });
const { t } = useI18n();
const fileInputRef = useTemplateRef<HTMLInputElement>('fileInputRef');

const dropzoneRef = useTemplateRef('dropzoneRef');
const inputRef = ref();

const { isOverDropZone } = useDropZone(dropzoneRef, {
  onDrop: (files) => {
    value.value = files[0] ?? undefined;
  },
  dataTypes: props.accept.split(','),
  multiple: false,
  preventDefaultForUnhandled: false,
});

function focus() {
  inputRef.value.$el.focus();
}

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  value.value = target.files[0] ?? undefined;

  target.value = '';
}

const loadedImage = computedAsync(async () => {
  const file = value.value;
  if (file) {
    return URL.createObjectURL(file);
  } else {
    return currentUrl.value;
  }
});

const { exposed, baseInputForwardedProps, fieldUniqueId, generalInputProps } = useHddBaseInputUtils(props);

defineExpose({ focus, ...exposed });
</script>

<template>
  <BaseInput v-bind="baseInputForwardedProps">
    <div ref="dropzoneRef" class="border-amber border-1 flex items-center gap-1 rounded-lg border-dashed bg-amber-100/25 dark:bg-amber-700/45">
      <div>
        <input ref="fileInputRef" type="file" :accept="accept" style="display: none" @change="onFileChange" />
        <Button ref="inputRef" :size="size" :label="t('Choose File')" icon="pi pi-upload" @click="fileInputRef?.click()" />
      </div>
      <Image
        :src="loadedImage || 'https://placehold.co/800x400/EEE/31343C'"
        :alt="t('Image not found')"
        :image-style="{
          maxWidth: previewMaxWidth + 'px',
          maxHeight: previewMaxHeight + 'px',
        }"
        preview
      />
    </div>
  </BaseInput>
</template>

<style scoped></style>
