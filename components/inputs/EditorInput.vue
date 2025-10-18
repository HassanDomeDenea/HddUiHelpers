<script setup lang="ts">
import { useHddBaseInputUtils } from 'HddUiHelpers/components/inputs/inputsUtils.ts';
import Quill from 'quill';
import { ref } from 'vue';
import BaseInput from './BaseInput.vue';
import type { BaseInputProps } from './types';

const props = defineProps<
  BaseInputProps & {
    initialRows?: number;
  }
>();

const emits = defineEmits<{
  keydown: [e: KeyboardEvent];
  change: [e: any];
}>();

const value = defineModel<any>('modelValue');

const inputRef = ref();

function focus() {
  inputRef.value.$el.focus();
}

const FontAttributor = Quill.import('attributors/class/font') as any;
FontAttributor.whitelist = ['tajawal', 'mirza', 'amiri', 'aref'];
Quill.register(FontAttributor, true);

const FontSizeAttributor = Quill.import('attributors/class/size') as any;
FontSizeAttributor.whitelist = [
  ...(FontSizeAttributor.whitelist || []),
  '8px',
  '10px',
  '12px',
  false,
  '14px',
  '16px',
  '18px',
  '20px',
  '22px',
  '24px',
  '26px',
  '28px',
  '30px',
  '36px',
  '40px',
  '48px',
];
Quill.register(FontSizeAttributor, true);

const quillModules = computed(() => {
  return {
    // toolbar: [{ direction: 'rtl' }, { direction: 'ltr' }],
    /*toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],
      ['link', 'image', 'video', 'formula'],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      [{ direction: 'rtl' }], // text direction

      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ['clean'], // remove formatting button
    ],*/
  };
});

const { exposed, baseInputForwardedProps, fieldUniqueId, generalInputProps } = useHddBaseInputUtils(props);

defineExpose({ focus, ...exposed });
</script>

<template>
  <BaseInput v-bind="baseInputForwardedProps" class="HDD_Quill_Editor" @click="focus">
    <Editor id="fieldUniqueId" v-bind="generalInputProps" ref="inputRef" v-model="value" :modules="quillModules">
      <template #toolbar>
        <span class="ql-formats">
          <!--          <select class="ql-header" defaultValue="0">
            <option value="1">Heading</option>
            <option value="2">Subheading 2</option>
            <option value="3">Subheading 3</option>
            <option value="4">Subheading 4</option>
            <option value="5">Subheading 5</option>
            <option value="0">Normal</option>
          </select>-->
          <select class="ql-font">
            <option />
            <option value="tajawal">Tajawal</option>
            <option value="amiri">Amiri</option>
            <option value="mirza">Mirza</option>
            <option value="aref">Aref Ruqaa</option>
          </select>
          <select class="ql-size">
            <option value="10px">10px</option>
            <option selected />
            <option value="14px">14px</option>
            <option value="16px">16px</option>
            <option value="18px">18px</option>
            <option value="20px">20px</option>
            <option value="24px">24px</option>
            <option value="28px">28px</option>
            <option value="30px">30px</option>
            <option value="36px">36px</option>
          </select>
        </span>
        <span class="ql-formats">
          <button class="ql-bold" type="button" />
          <button class="ql-italic" type="button" />
          <button class="ql-underline" type="button" />
        </span>
        <span class="ql-formats">
          <select class="ql-color" />
          <select class="ql-background" />
        </span>
        <span class="ql-formats">
          <button class="ql-list" value="ordered" type="button" />
          <button class="ql-list" value="bullet" type="button" />
          <select class="ql-align">
            <option defaultValue />
            <option value="center" />
            <option value="right" />
            <option value="justify" />
          </select>
          <button class="ql-direction" type="button" value="rtl" />
        </span>
        <span v-if="false" class="ql-formats">
          <button class="ql-link" type="button" />
          <button class="ql-image" type="button" />
          <button class="ql-code-block" type="button" />
        </span>
        <span class="ql-formats">
          <button class="ql-table" type="button" />
          <button class="ql-clean" type="button" />
        </span>
      </template>
    </Editor>
  </BaseInput>
</template>

<style lang="scss">
.HDD_Quill_Editor {
  .ql-picker-options {
    max-height: 250px;
    overflow-y: auto;
  }

  .ql-font-tajawal {
    @apply font-tajawal;
  }
  .ql-font-amiri {
    @apply font-amiri;
  }
  .ql-font-mirza {
    @apply font-mirza;
  }
  .ql-font-aref {
    @apply font-aref;
  }
}

.p-editor-content.ql-container.ql-snow {
  .ql-editor {
    //    @apply bg-white text-black;
  }
}

.ql-editor {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    //font-weight: normal;
  }
}

$sizes: 8px, 10px, 12px, 14px, 16px, 18px, 20px, 22px, 24px, 26px, 28px, 30px, 36px, 40px, 48px;

@each $size in $sizes {
  .ql-size-#{$size} {
    font-size: $size;
    line-height: 1;
  }
}

.ql-editor ol li[data-list='bullet']:before {
  //content: '\2022';
}
</style>
