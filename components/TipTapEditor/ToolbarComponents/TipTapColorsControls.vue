<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import type ColorPickerInput from 'HddUiHelpers/components/inputs/ColorPickerInput.vue';
import type { TipTapEditorConfig } from 'HddUiHelpers/components/TipTapEditor/TipTapEditorTypes.ts';
import type { ComponentExposed } from 'vue-component-type-helpers';
const { editor } = defineProps<{
  editor: Editor;
  config?: TipTapEditorConfig;
}>();
const { t } = useI18n();

const recentHighlightColor = ref(null);
const recentTextColor = ref(null);

function toggleHighlight(color?: string) {
  if (color) {
    editor.chain().focus().setHighlight({ color }).run();
    recentHighlightColor.value = color;
  } else if (recentHighlightColor.value) {
    editor.chain().focus().toggleHighlight({ color: recentHighlightColor.value }).run();
  } else {
    editor.chain().focus().toggleHighlight().run();
  }
}
function setTextColor(color?: string) {
  if (color) {
    editor.chain().focus().setColor(color).run();
    recentTextColor.value = color;
  } else if (recentTextColor.value) {
    editor.chain().focus().setColor(recentTextColor.value).run();
  } else {
    editor.chain().focus().unsetColor().run();
  }
}

const highlightColorsList = ref([
  'var(--tt-color-highlight-dark-yellow)',
  'var(--tt-color-highlight-yellow)',
  'var(--tt-color-highlight-green)',
  'var(--tt-color-highlight-blue)',
  'var(--tt-color-highlight-purple)',
  'var(--tt-color-highlight-red)',
  'var(--tt-color-highlight-gray)',
]);

const highlightColorRef = useTemplateRef<ComponentExposed<typeof ColorPickerInput>>('highlightColorRef');
const textColorPickerRef = useTemplateRef<ComponentExposed<typeof ColorPickerInput>>('textColorPickerRef');
</script>

<template>
  <div class="relative inline-flex flex-wrap">
    <div class="absolute">
      <ColorPickerInput
        ref="highlightColorRef"
        :model-value="editor.getAttributes('highlight')?.color"
        :colors="highlightColorsList"
        recent-colors-group-name="highlight"
        clearable
        as-popover
        :with-trigger="false"
        auto-dismiss
        @change="toggleHighlight($event)"
      />
      <ColorPickerInput
        ref="textColorPickerRef"
        :model-value="editor.getAttributes('textStyle')?.color"
        recent-colors-group-name="text-colors"
        clearable
        as-popover
        :with-trigger="false"
        auto-dismiss
        @change="setTextColor($event)"
      />
    </div>
    <ButtonGroup>
      <Button
        size="small"
        :disabled="!editor.can().chain().focus().toggleHighlight().run()"
        :title="t('Highlight')"
        icon="i-material-symbols:format-ink-highlighter"
        severity="info"
        :outlined="!editor.isActive('highlight')"
        @click="toggleHighlight()"
        @contextmenu.prevent="(event) => highlightColorRef.toggle(event)"
      >
        <template #icon="slotProps">
          <span :class="slotProps.class" class="relative flex items-center justify-center overflow-hidden rounded">
            <span
              class="absolute bottom-0 left-0 right-0 top-0 blur-sm"
              :class="{ 'opacity-25': editor.isActive('highlight') }"
              :style="{ background: editor.getAttributes('highlight')?.color ?? recentHighlightColor }"
            ></span>
            <i
              class="i-material-symbols:format-ink-highlighter"
              :style="{
                color: editor.isActive('highlight') ? (editor.getAttributes('highlight')?.color ?? recentHighlightColor) : null,
              }"
            ></i>
          </span>
        </template>
      </Button>
      <Button
        size="small"
        :disabled="!editor.can().chain().focus().setColor().run()"
        :title="t('Text Color')"
        icon="i-material-symbols:format-ink-highlighter"
        severity="info"
        :outlined="!editor.getAttributes('textStyle')?.color"
        @click="(event) => (recentTextColor && !editor.getAttributes('textStyle')?.color ? setTextColor() : textColorPickerRef.toggle(event))"
        @contextmenu.prevent="(event) => textColorPickerRef.toggle(event)"
      >
        <template #icon="slotProps">
          <span :class="slotProps.class" class="relative flex items-center justify-center overflow-hidden rounded">
            <span class="z-1 pointer-events-none absolute bottom-0 left-0 right-0 top-0 flex items-end justify-stretch">
              <i
                v-if="editor.getAttributes('textStyle')?.color ?? recentTextColor"
                class="i-fluent:text-color-accent-20-regular scale-x-140 mb-[-4px]"
                :style="{ background: editor.getAttributes('textStyle')?.color ?? recentTextColor }"
              ></i>
            </span>
            <i class="i-ooui:larger-text transform-origin-top-center scale-90"></i>
          </span>
        </template>
      </Button>
    </ButtonGroup>
  </div>
</template>

<style lang="scss">
.light {
  --tt-color-highlight-dark-yellow: yellow;
  --tt-color-highlight-yellow: #fef9c3;
  --tt-color-highlight-green: #dcfce7;
  --tt-color-highlight-blue: #e0f2fe;
  --tt-color-highlight-purple: #f3e8ff;
  --tt-color-highlight-red: #ffc3c8;
  --tt-color-highlight-gray: #e5e5e5;
  --tt-color-highlight-brown: rgb(244, 238, 238);
  --tt-color-highlight-orange: rgb(251, 236, 221);
  --tt-color-highlight-pink: rgb(252, 241, 246);
  --tt-color-highlight-yellow-contrast: #fbe604;
  --tt-color-highlight-green-contrast: #c7fad8;
  --tt-color-highlight-blue-contrast: #ceeafd;
  --tt-color-highlight-purple-contrast: #e4ccff;
  --tt-color-highlight-red-contrast: #ffccd0;
  --tt-color-highlight-gray-contrast: rgba(84, 72, 49, 0.15);
  --tt-color-highlight-brown-contrast: rgba(210, 162, 141, 0.35);
  --tt-color-highlight-orange-contrast: rgba(224, 124, 57, 0.27);
  --tt-color-highlight-pink-contrast: rgba(225, 136, 179, 0.27);
}

.dark {
  --tt-color-highlight-dark-yellow: yellow;
  --tt-color-highlight-yellow: #6b6524;
  --tt-color-highlight-green: #509568;
  --tt-color-highlight-blue: #6e92aa;
  --tt-color-highlight-purple: #583e74;
  --tt-color-highlight-red: #743e42;
  --tt-color-highlight-gray: #2f2f2f;
  --tt-color-highlight-brown: #4a3228;
  --tt-color-highlight-orange: #5c3b23;
  --tt-color-highlight-pink: #4e2c3c;
  --tt-color-highlight-yellow-contrast: #58531e;
  --tt-color-highlight-green-contrast: #47855d;
  --tt-color-highlight-blue-contrast: #5e86a1;
  --tt-color-highlight-purple-contrast: #4c3564;
  --tt-color-highlight-red-contrast: #643539;
  --tt-color-highlight-gray-contrast: rgba(255, 255, 255, 0.094);
  --tt-color-highlight-brown-contrast: rgba(184, 101, 69, 0.25);
  --tt-color-highlight-orange-contrast: rgba(233, 126, 37, 0.2);
  --tt-color-highlight-pink-contrast: rgba(220, 76, 145, 0.22);
}
</style>
