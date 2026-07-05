<script setup lang="ts">
import type { Editor } from "@tiptap/vue-3";
import type { TipTapEditorConfig } from "HddUiHelpers/components/TipTapEditor/TipTapEditorTypes.ts";
import { printDomWithStyles } from "HddUiHelpers/utils/printDom.ts";
import { useI18n } from "vue-i18n";

const { editor } = defineProps<{
  editor: Editor;
  config?: TipTapEditorConfig;
}>();
const { t } = useI18n();

function printEditor() {
  const element = document.createElement("div");
  element.classList.add("tiptap");
  element.innerHTML = editor.view.dom.innerHTML;
  printDomWithStyles(element);
}
</script>

<template>
  <div class="inline-flex flex-wrap">
    <ButtonGroup>
      <Button
        size="small"
        :disabled="!editor.can().chain().focus().setHorizontalRule().run()"
        :title="t('Insert Horizontal Line')"
        severity="info"
        :outlined="!editor.isActive('hr')"
        icon="i-mdi:horizontal-line"
        @click="editor.chain().focus().setHorizontalRule().run()"
      />
      <Button
        v-if="config?.withPageBreakButton"
        size="small"
        :disabled="!editor.can().chain().focus().setPageBreak().run()"
        :title="t('Insert Page Break')"
        severity="info"
        :outlined="!editor.isActive('tip-tap-page-breaker-node')"
        icon="i-pixel:page-break"
        @click="editor.chain().focus().setPageBreak().run()"
      />
    </ButtonGroup>
    <ButtonGroup v-if="config?.withPrintButton">
      <Button
        size="small"
        :title="t('Print Content')"
        severity="info"
        icon="i-mdi-printer"
        @click="printEditor"
      />
    </ButtonGroup>
  </div>
</template>

<style scoped></style>
