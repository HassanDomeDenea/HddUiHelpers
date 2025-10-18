<script setup lang="ts">
const { accept = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'], multiple = true } = defineProps<{
  accept?: string[];
  multiple?: boolean;
}>();
const emits = defineEmits<{
  upload: [files: File[]];
}>();
const dropZoneRef = useTemplateRef<HTMLDivElement>('dropZoneRef');
const { t } = useI18n();
const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,
  dataTypes: accept,
  multiple: multiple,
  // whether to prevent default behavior for unhandled events
  preventDefaultForUnhandled: false,
});
function onDrop(files: File[] | null) {
  if (files) {
    emits('upload', files);
  }
}

const isDragging = ref(false);
const dragCounter = ref(0);

function handleBodyDragEnter(e: DragEvent) {
  dragCounter.value++;
  if (e.dataTransfer?.types.includes('Files')) {
    isDragging.value = true;
  }
}

function handleBodyDragLeave() {
  dragCounter.value--;
  if (dragCounter.value === 0) {
    isDragging.value = false;
  }
}

function handleBodyDrop(e: DragEvent) {
  dragCounter.value = 0;
  isDragging.value = false;
}

onMounted(() => {
  document.body.addEventListener('dragenter', handleBodyDragEnter);
  document.body.addEventListener('dragleave', handleBodyDragLeave);
  document.body.addEventListener('drop', handleBodyDrop);
});

onBeforeUnmount(() => {
  document.body.removeEventListener('dragenter', handleBodyDragEnter);
  document.body.removeEventListener('dragleave', handleBodyDragLeave);
  document.body.removeEventListener('drop', handleBodyDrop);
});
</script>

<template>
  <div
    v-if="isDragging"
    ref="dropZoneRef"
    class="light:border-amber-700 border-1 m-1 flex min-h-24 items-center justify-center gap-1 rounded-lg border-dashed p-1 text-lg dark:border-amber-300"
    :class="{ 'light:bg-yellow-100/25 dark:bg-yellow-900/25': isOverDropZone }"
  >
    <i class="i-material-symbols:upload-sharp"></i>
    <span>{{ t('Drop Files Here to Upload') }}</span>
  </div>
</template>

<style scoped></style>
