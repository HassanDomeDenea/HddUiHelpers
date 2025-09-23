<script setup lang="ts">
import type { ServerDataTableColumn, ServerDataTableColumnType } from 'HddUiHelpers/components/datatables/ServerDataTableTypes.ts';
import type { HddFormField } from 'HddUiHelpers/components/FormWrapper/types.ts';
import CheckboxInput from 'HddUiHelpers/components/inputs/CheckboxInput.vue';
import TextInput from 'HddUiHelpers/components/inputs/TextInput.vue';
import { useLoader } from 'HddUiHelpers/composables/loader.ts';
import { set, startCase } from 'lodash-es';
import get from 'lodash-es/get';

const { type, row, field, column, fieldName, submitCallback } = defineProps<{
  row: { [k: string]: unknown };
  fieldName: string;
  type: ServerDataTableColumnType;
  field?: HddFormField;
  column: ServerDataTableColumn;
  submitCallback?: () => void;
  size?: 'small' | 'large' | 'normal';
}>();

const { t } = useI18n();

const { startLoading, isLoading } = useLoader();

const computedType = computed(() => type ?? 'text');

const computedLabel = computed(() => {
  return field?.label ?? column.label ?? t(startCase(fieldName));
});

const computedModal = computed({
  get() {
    return get(row, fieldName);
  },
  set(value) {
    set(row, fieldName, value);
  },
});

function submit() {
  submitCallback?.();
}

const onTextAreaKeyDown: (e: KeyboardEvent) => void = function (e) {
  if (!e.ctrlKey && e.key === 'Enter') {
    e.stopPropagation();
  }
};
</script>

<template>
  <template v-if="computedType === 'text'">
    <TextInput v-model="computedModal" class="text-red-200" :size="size" :disabled="isLoading" @keydown.enter="startLoading" />
  </template>
  <template v-if="computedType === 'textarea'">
    <TextAreaInput v-model="computedModal" class="text-red-200" :size="size" :disabled="isLoading" @keydown="onTextAreaKeyDown" />
  </template>
  <template v-if="computedType === 'boolean'">
    <div class="flex items-center gap-2">
      <!--            <span>{{computedLabel }}</span>-->
      <CheckboxInput v-model="computedModal" :size="size" :disabled="isLoading" @change="submit" />
    </div>
  </template>
</template>

<style scoped></style>
