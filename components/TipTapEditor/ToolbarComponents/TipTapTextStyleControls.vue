<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import type { TipTapEditorConfig } from 'HddUiHelpers/components/TipTapEditor/TipTapEditorTypes.ts';
const {
  editor,
  withAlignments = true,
  withScripts = true,
} = defineProps<{
  editor: Editor;
  config?: TipTapEditorConfig;
  withAlignments?: boolean;
  withScripts?: boolean;
}>();
const { t } = useI18n();
</script>

<template>
  <div class="inline-flex flex-wrap gap-x-1">
    <ButtonGroup>
      <Button
        size="small"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :title="t('Bold')"
        icon="i-fe:bold"
        severity="info"
        :outlined="!editor.isActive('bold')"
        @click="editor.chain().focus().toggleBold().run()"
      />
      <Button
        size="small"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :title="t('Italic')"
        icon="i-mi:italic"
        severity="info"
        :outlined="!editor.isActive('italic')"
        @click="editor.chain().focus().toggleItalic().run()"
      />
      <Button
        size="small"
        :disabled="!editor.can().chain().focus().toggleUnderline().run()"
        :title="t('Underline')"
        icon="i-ri:underline"
        severity="info"
        :outlined="!editor.isActive('underline')"
        @click="editor.chain().focus().toggleUnderline().run()"
      />
      <Button
        size="small"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :title="t('Strike Through')"
        icon="i-tabler:strikethrough"
        severity="info"
        :outlined="!editor.isActive('strike')"
        @click="editor.chain().focus().toggleStrike().run()"
      />
    </ButtonGroup>
    <ButtonGroup v-if="withScripts">
      <Button
        size="small"
        :disabled="!editor.can().chain().focus().toggleSubscript().run()"
        :title="t('Subscript')"
        icon="i-mdi:format-subscript"
        severity="info"
        :outlined="!editor.isActive('subscript')"
        @click="editor.chain().focus().toggleSubscript().run()"
      />
      <Button
        size="small"
        :disabled="!editor.can().chain().focus().toggleSuperscript().run()"
        :title="t('Superscript')"
        icon="i-mdi:format-superscript"
        severity="info"
        :outlined="!editor.isActive('superscript')"
        @click="editor.chain().focus().toggleSuperscript().run()"
      />
      <Button
        size="small"
        :disabled="!editor.can().chain().focus().toggleCode().run()"
        :title="t('Code')"
        icon="i-material-symbols:code"
        severity="info"
        :outlined="!editor.isActive('code')"
        @click="editor.chain().focus().toggleCode().run()"
      />
    </ButtonGroup>
    <ButtonGroup v-if="withAlignments" style="display: inline-block; direction: ltr">
      <Button
        size="small"
        :disabled="!editor.can().chain().focus().toggleTextAlign('left').run()"
        :title="t('Align to Left')"
        icon="i-mdi:format-align-left"
        severity="info"
        :outlined="!editor.isActive({ textAlign: 'left' })"
        @click="editor.chain().focus().setTextAlign('left').run()"
      />
      <Button
        size="small"
        :disabled="!editor.can().chain().focus().toggleTextAlign('center').run()"
        :title="t('Align to Center')"
        icon="i-mdi:format-align-center"
        severity="info"
        :outlined="!editor.isActive({ textAlign: 'center' })"
        @click="editor.chain().focus().setTextAlign('center').run()"
      />
      <Button
        size="small"
        :disabled="!editor.can().chain().focus().toggleTextAlign('right').run()"
        :title="t('Align to Right')"
        icon="i-mdi:format-align-right"
        severity="info"
        :outlined="!editor.isActive({ textAlign: 'right' })"
        @click="editor.chain().focus().setTextAlign('right').run()"
      />
      <Button
        size="small"
        :disabled="!editor.can().chain().focus().setTextAlign('justify').run()"
        :title="t('Justify')"
        icon="i-mdi:format-align-justify"
        severity="info"
        :outlined="!editor.isActive({ textAlign: 'justify' })"
        @click="editor.chain().focus().setTextAlign('justify').run()"
      />
    </ButtonGroup>
  </div>
</template>

<style scoped></style>
