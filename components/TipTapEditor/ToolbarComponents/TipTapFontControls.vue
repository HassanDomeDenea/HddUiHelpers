<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import type { TipTapEditorConfig } from 'HddUiHelpers/components/TipTapEditor/TipTapEditorTypes.ts';
import { sortBy } from 'lodash-es';
const { editor } = defineProps<{
  editor: Editor;
  config?: TipTapEditorConfig;
}>();
const { t } = useI18n();

const fontSizeOptions = computed(() => {
  return [
    { value: '', label: '-' },
    ...['8px', '10px', '12px', '14px', '16px', '18px', '20px', '22px', '24px', '28px', '32px', '36px', '40px', '44px', '48px', '60px', '72px'].map(
      (e) => ({
        label: e,
        value: e,
      }),
    ),
  ];
});

const lineHeightOptions = computed(() => {
  return [
    { value: '', label: '-' },
    ...['0.5', '0.75', '0.9', '1', '1.15', '1.25', '1.5', '1.75', '2', '2.5', '3', '4', '5'].map((e) => ({
      label: e,
      value: e,
    })),
  ];
});

const fontFamilyOptions = computed(() => {
  return [
    { value: '', label: '-' },
    ...sortBy(
      [
        { value: 'tajawal', label: 'Tajawal' },
        { value: 'amiri', label: 'Amiri' },
        { value: 'mirza', label: 'Mirza' },
        { value: 'times', label: 'Times New Roman' },
        { value: 'aref', label: 'Aref Ruqaa' },
        { value: 'arial', label: 'Arial' },
      ],
      'label',
    ),
  ];
});
</script>

<template>
  <div class="inline-flex flex-wrap">
    <Select
      class="w-[100px]"
      size="small"
      variant="filled"
      :model-value="editor.getAttributes('textStyle')?.fontSize || ''"
      :options="fontSizeOptions"
      :title="t('Font Size')"
      option-value="value"
      option-label="label"
      :placeholder="t('Size')"
      @change="$event.value ? editor.chain().focus().setFontSize($event.value).run() : editor.chain().focus().unsetFontSize().run()"
    >
      <template #dropdownicon>
        <i class="i-bx:font-size" />
      </template>
    </Select>
    <Select
      class="w-[100px]"
      size="small"
      variant="filled"
      :model-value="editor.getAttributes('textStyle')?.lineHeight || ''"
      :options="lineHeightOptions"
      :title="t('Lines Spacing')"
      option-value="value"
      option-label="label"
      :placeholder="t('Spacing')"
      @change="$event.value ? editor.chain().focus().setLineHeight($event.value).run() : editor.chain().focus().unsetLineHeight().run()"
    >
      <template #dropdownicon>
        <i class="i-tabler:line-height" />
      </template>
    </Select>
    <Select
      size="small"
      class="w-[140px]"
      :model-value="editor.getAttributes('textStyle')?.fontFamily || ''"
      :options="fontFamilyOptions"
      :title="t('Font Type')"
      option-value="value"
      option-label="label"
      :placeholder="t('Font')"
      @change="$event.value ? editor.chain().focus().setFontFamily($event.value).run() : editor.chain().focus().unsetFontFamily().run()"
    >
      <template #option="slotProps">
        <div :class="[{ 'font-bold': slotProps.selected }, 'font-' + slotProps.option.value]" class="dir-ltr inline-block">
          <span>{{ slotProps.option.label }} </span>
          <span v-if="slotProps.option.value"> - ABC def 123 أبجد هوز</span>
        </div>
      </template>
      <template #dropdownicon>
        <i class="i-ri:font-family" />
      </template>
    </Select>
  </div>
</template>
