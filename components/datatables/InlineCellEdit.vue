<script setup lang="ts">
import type { ServerDataTableColumn, ServerDataTableColumnType } from 'HddUiHelpers/components/datatables/ServerDataTableTypes.ts';
import type { HddFormField } from 'HddUiHelpers/components/FormWrapper/types.ts';
import CheckboxInput from 'HddUiHelpers/components/inputs/CheckboxInput.vue';
import TextInput from 'HddUiHelpers/components/inputs/TextInput.vue';
import { useLoader } from 'HddUiHelpers/composables/loader.ts';
import { set } from 'lodash-es';
import get from 'lodash-es/get';

const { type, row, field, column, fieldName, submitCallback, cancelCallback } = defineProps<{
  row: { [k: string]: unknown };
  fieldName: string;
  type: ServerDataTableColumnType;
  field?: HddFormField;
  column: ServerDataTableColumn;
  submitCallback?: (event: Event) => void;
  cancelCallback?: (event: Event) => void;
  size?: 'small' | 'large' | 'normal';
}>();

const { t } = useI18n();

const { startLoading, isLoading } = useLoader();

const computedType = computed(() => type ?? 'text');

/*const computedLabel = computed(() => {
  return field?.label ?? column.label ?? t(startCase(fieldName));
});*/

const computedModal = computed({
  get() {
    return get(row, fieldName);
  },
  set(value) {
    set(row, fieldName, value);
  },
});

function submit() {
  submitCallback?.(new Event('submit'));
}
function cancel() {
  cancelCallback?.(new Event('submit'));
}

const onTextAreaKeyDown: (e: KeyboardEvent) => void = function (e) {
  if (!e.ctrlKey && e.key === 'Enter') {
    e.stopPropagation();
  }
};

const computedBinds = computed(() => {
  return {
    ...(column.inlineEditableBinds ?? {}),
  };
});
</script>

<template>
  <template v-if="computedType === 'text'">
    <TextInput v-model="computedModal" class="text-red-200" :size="size" :disabled="isLoading" v-bind="computedBinds" @keydown.enter="startLoading" />
  </template>
  <template v-if="computedType === 'textarea'">
    <div>
      <TextAreaInput
        v-model="computedModal"
        class="text-red-200"
        :size="size"
        :disabled="isLoading"
        v-bind="computedBinds"
        @keydown="onTextAreaKeyDown"
      />
      <div class="flex justify-end">
        <ButtonGroup>
          <Button icon="i-material-symbols:close" type="button" severity="danger" outlined size="small" :title="t('Cancel')" @click.stop="cancel" />
          <Button icon="i-mdi-check" type="button" severity="success" outlined size="small" :title="t('Save')" @click.stop="submit" />
        </ButtonGroup>
      </div>
    </div>
  </template>
  <template v-if="computedType === 'boolean'">
    <div class="flex items-center gap-2">
      <!--            <span>{{computedLabel }}</span>-->
      <CheckboxInput v-model="computedModal" :size="size" :disabled="isLoading" v-bind="computedBinds" @change="submit" />
    </div>
  </template>
</template>

<style scoped></style>
