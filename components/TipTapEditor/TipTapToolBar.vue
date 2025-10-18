<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import type { TipTapEditorConfig } from 'HddUiHelpers/components/TipTapEditor/TipTapEditorTypes.ts';
import TipTapColorsControls from 'HddUiHelpers/components/TipTapEditor/ToolbarComponents/TipTapColorsControls.vue';
import TipTapPageControls from 'HddUiHelpers/components/TipTapEditor/ToolbarComponents/TipTapPageControls.vue';
import TipTapTableControls from 'HddUiHelpers/components/TipTapEditor/ToolbarComponents/TipTapTableControls.vue';
import TipTapTextStyleControls from 'HddUiHelpers/components/TipTapEditor/ToolbarComponents/TipTapTextStyleControls.vue';
const { t } = useI18n();
const { editor } = defineProps<{
  editor: Editor;
  config?: TipTapEditorConfig;
}>();

const focusedEditorCan = computed(() => editor.can().chain().focus());
const focusedEditor = computed(() => editor.chain().focus());
</script>

<template>
  <div class="control-group text-center">
    <div class="button-group">
      <slot name="start"></slot>
      <TipTapTextStyleControls :editor="editor" :config="config" />
      <TipTapFontControls :editor="editor" :config="config" />
      <TipTapColorsControls :editor="editor" :config="config" />
      <TipTapListsControls :editor="editor" :config="config" />
      <TipTapTableControls :editor="editor" :config="config" />
      <TipTapPageControls :editor="editor" :config="config" />
      <slot name="end"></slot>
    </div>
  </div>
</template>

<style scoped>
.control-group {
  @apply mb-0 flex flex-col items-center gap-4 bg-zinc-100 p-2 pb-1 dark:bg-zinc-950;

  .button-group {
    @apply dir-ltr flex flex-wrap gap-1;
  }
}
</style>
