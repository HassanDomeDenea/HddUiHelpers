<script setup lang="ts">
import type { NodeViewProps } from '@tiptap/vue-3';
import { NodeViewWrapper } from '@tiptap/vue-3';
defineProps<NodeViewProps>();
const { t } = useI18n();
</script>

<template>
  <node-view-wrapper class="break-after-page print:invisible print:h-[1px] print:overflow-hidden">
    <div class="flex items-center gap-1 px-1">
      <span v-if="editor.isEditable" class="inline-block size-[25px]"></span>
      <div class="border-t-1 border-t-dashed flex-grow-1 light:border-t-gray-400 dark:border-t-gray-600"></div>
      <span class="light:text-gray-400 italic dark:text-gray-600">{{ t('Page Break') }}</span>
      <div class="border-t-1 border-t-dashed flex-grow-1 light:border-t-gray-400 dark:border-t-gray-600"></div>
      <Button v-if="editor.isEditable" variant="text" severity="danger" icon="i-mdi-times" class="size-[25px]" size="small" @click="deleteNode" />
    </div>
  </node-view-wrapper>
</template>

<style scoped></style>
