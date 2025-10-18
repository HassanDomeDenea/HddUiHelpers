<script setup lang="ts">
import Highlight from '@tiptap/extension-highlight';
import { ListItem } from '@tiptap/extension-list';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import { TableKit } from '@tiptap/extension-table';
import TextAlign from '@tiptap/extension-text-align';
import { Color, FontFamily, FontSize, LineHeight, TextStyle } from '@tiptap/extension-text-style';
import { Placeholder } from '@tiptap/extensions';
import StarterKit from '@tiptap/starter-kit';
import type { Editor } from '@tiptap/vue-3';
import { EditorContent, useEditor } from '@tiptap/vue-3';
import { BubbleMenu } from '@tiptap/vue-3/menus';
import { CustomParagraph } from 'HddUiHelpers/components/TipTapEditor/Extensions/CustomParagraphExtension.ts';
import TipTapPageBreakerNodeExtension from 'HddUiHelpers/components/TipTapEditor/Extensions/PageBreaker/TipTapPageBreakerNodeExtension.ts';
import type { TipTapEditorConfig } from 'HddUiHelpers/components/TipTapEditor/TipTapEditorTypes.ts';
import TipTapToolBar from 'HddUiHelpers/components/TipTapEditor/TipTapToolBar.vue';
import Button from 'primevue/button';
const { config } = defineProps<{
  config?: TipTapEditorConfig;
}>();

const value = defineModel<string | null>();
const editor = useEditor({
  content: value.value,
  editable: !(config?.disabled || config?.readonly),
  extensions: [
    TextAlign.configure({
      types: ['heading', 'paragraph'],
      defaultAlignment: config?.defaultAlignment,
    }),
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({}),
    FontSize.configure({
      types: [TextStyle.name, ListItem.name],
    }),
    FontFamily.configure({}),
    Superscript,
    Subscript,
    Highlight.configure({
      multicolor: true,
    }),
    TableKit.configure({
      table: { resizable: true },
    }),
    StarterKit.configure({
      paragraph: false,
    }),
    LineHeight,
    CustomParagraph,
    TipTapPageBreakerNodeExtension,
    Placeholder.configure({
      placeholder: config?.placeholder ?? '…',
    }),
    ...(config?.extraExtensions ?? []),
  ],
  onUpdate: onEditorUpdate,
});
const cachedValue = ref(value.value);
function onEditorUpdate() {
  cachedValue.value = editor.value.getHTML();
  value.value = cachedValue.value;
}
watch(value, (newValue) => {
  const isReallyNew = newValue !== cachedValue.value;
  if (isReallyNew) {
    editor.value.chain().focus().setContent(newValue).run();
  }
});
watch(
  () => !(config?.disabled || config?.readonly),
  (isEditable) => {
    editor.value.setEditable(isEditable);
  },
);

defineSlots<{
  toolbarStart?: (props: { editor: Editor; config: TipTapEditorConfig }) => any;
  toolbarEnd?: (props: { editor: Editor; config: TipTapEditorConfig }) => any;
}>();

defineExpose({ editor });
</script>

<template>
  <div v-if="editor" :class="config.containerClass">
    <TipTapToolBar v-if="editor.isEditable" :editor="editor" :config="config">
      <template #start>
        <slot name="toolbarStart" :editor="editor" :config="config">
          <template v-if="config?.extraToolbarStartButtons">
            <component
              :is="item.component ?? Button"
              v-for="item in config.extraToolbarStartButtons instanceof Array
                ? config.extraToolbarStartButtons
                : config.extraToolbarStartButtons({ editor, config })"
              :key="item"
              v-bind="item.binds"
            />
          </template>
        </slot>
      </template>
      <template #end>
        <slot name="toolbarEnd" :editor="editor" :config="config">
          <template v-if="config?.extraToolbarEndButtons">
            <component
              :is="item.component ?? Button"
              v-for="item in config.extraToolbarEndButtons instanceof Array
                ? config.extraToolbarEndButtons
                : config.extraToolbarEndButtons({ editor, config })"
              :key="item"
              v-bind="item.binds"
            />
          </template>
        </slot>
      </template>
    </TipTapToolBar>
    <BubbleMenu v-if="editor.isEditable" :editor="editor" :options="{ placement: 'bottom', offset: 8 }">
      <div class="tiptap-bubble-menu" dir="ltr">
        <TipTapTextStyleControls :editor="editor" :config="config" :with-alignments="false" :with-scripts="false" />
      </div>
    </BubbleMenu>
    <EditorContent :editor="editor" />
    <div v-if="false" class="dir-ltr whitespace-pre-wrap text-left">{{ value }}</div>
  </div>
</template>

<style lang="scss">
.tiptap {
  @apply screen:caret-blue screen:border-1 screen:shadow-lg screen:rounded-lg screen:border-dashed screen:p-1;

  :first-child {
    margin-top: 0;
  }

  /* List styles */
  ul,
  ol {
    padding: 0 1rem;
    margin: 1.25rem 1rem 1.25rem 0.4rem;

    li p {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }
  }
  ul {
    @apply list-disc;
  }
  ol {
    @apply list-decimal;
  }

  /* Heading styles */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
    margin-top: 1rem;
    text-wrap: pretty;
  }

  h1,
  h2 {
    margin-top: 3.5rem;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 1.4rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  h3 {
    font-size: 1.1rem;
  }

  h4,
  h5,
  h6 {
    font-size: 1rem;
  }

  /* Code and preformatted text styles */
  code {
    background-color: var(--purple-light);
    border-radius: 0.4rem;
    color: var(--black);
    font-size: 0.85rem;
    padding: 0.25em 0.3em;
  }

  /*mark {
    background-color: #faf594;
    border-radius: 0.4rem;
    box-decoration-break: clone;
    padding: 0.1rem 0.3rem;
  }*/

  code {
    @apply bg-purple-100 text-black dark:bg-purple-950 dark:text-white;
    border-radius: 0.4rem;
    font-size: 0.85rem;
    padding: 0.25em 0.3em;
  }

  pre {
    background: var(--black);
    border-radius: 0.5rem;
    color: var(--white);
    font-family: 'JetBrainsMono', monospace;
    margin: 1.5rem 0;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }

  blockquote {
    border-left: 3px solid var(--gray-3);
    margin: 1.5rem 0;
    padding-left: 1rem;
  }

  hr {
    @apply border-t-solid light:border-t-gray-300 mx-1 my-8 border-0 border-t-[1px] dark:border-t-gray-500;
  }

  /* Table-specific styling */
  table {
    border-collapse: collapse;
    margin: 0;
    overflow: hidden;
    table-layout: fixed;
    width: 100%;

    td,
    th {
      @apply border-1 relative box-border min-w-[1em] border-solid border-gray-300 px-1 py-1 dark:border-gray-600;
      vertical-align: top;
      > * {
        margin-bottom: 0;
      }
    }

    th {
      @apply bg-gray-200 text-start font-bold dark:bg-gray-800;
    }

    .selectedCell:after {
      @apply bg-blue-200/45 dark:bg-blue-800/45;
      content: '';
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      pointer-events: none;
      position: absolute;
      z-index: 2;
    }

    .column-resize-handle {
      @apply bg-purple;
      bottom: -2px;
      pointer-events: none;
      position: absolute;
      right: -2px;
      top: 0;
      width: 4px;
    }
  }

  .tableWrapper {
    margin: 1.5rem 0.25rem;
    overflow-x: auto;
  }

  &.resize-cursor {
    cursor: ew-resize;
    cursor: col-resize;
  }

  /* Placeholder (at the top) */
  p.is-editor-empty:first-child::before {
    @apply text-secondary-3 px-2;
    content: attr(data-placeholder);
    height: 0;
    pointer-events: none;
  }
}

/* Bubble menu */
.tiptap-bubble-menu {
  @apply light:bg-zinc-50 border-1 light:border-gray-200 shadow-inset light:shadow-zinc-500/50 flex rounded-lg shadow dark:border-gray-600 dark:bg-zinc-950 dark:shadow-white/50;
}
</style>
