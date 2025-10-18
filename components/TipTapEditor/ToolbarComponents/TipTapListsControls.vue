<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import type { TipTapEditorConfig } from 'HddUiHelpers/components/TipTapEditor/TipTapEditorTypes.ts';
const { editor } = defineProps<{
  editor: Editor;
  config?: TipTapEditorConfig;
}>();
const { t } = useI18n();
</script>

<template>
  <div class="inline-flex flex-wrap gap-x-1">
    <ButtonGroup>
      <Button
        size="small"
        :title="t('Bulleted List')"
        icon="i-material-symbols:format-list-bulleted"
        severity="info"
        :outlined="!editor.isActive('bulletList')"
        @click="editor.chain().focus().toggleBulletList().run()"
      />
      <Button
        size="small"
        :title="t('Bulleted List')"
        icon="i-ant-design:ordered-list-outlined"
        severity="info"
        :outlined="!editor.isActive('orderedList')"
        @click="editor.chain().focus().toggleOrderedList().run()"
      />
    </ButtonGroup>
  </div>
</template>

<style scoped></style>
