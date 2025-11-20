<script setup lang="ts" generic="TRecord extends RecordItem = RecordItem">
import HddForm from 'HddUiHelpers/components/FormWrapper/HddForm.vue';
import type { HddFormField, HddFormProps, RecordItem } from 'HddUiHelpers/components/FormWrapper/types.ts';
import { appendToUrl, getColumnTitle, getFieldSlotName } from 'HddUiHelpers/components/datatables/ServerDataTableUtilities.ts';
import BaseInput from 'HddUiHelpers/components/inputs/BaseInput.vue';
import { useApiClient } from 'HddUiHelpers/stores/apiClient.ts';
import { useStackableDialog } from 'HddUiHelpers/stores/stackableDialogs.ts';
import type { HddFormComposer } from 'HddUiHelpers/utils/useHddForm.ts';
import { get, set, startCase } from 'lodash-es';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import { useConfirm } from 'primevue/useconfirm';
import type { ComponentExposed } from 'vue-component-type-helpers';
import type { ServerDataTableColumn, ServerFormDialogProps } from './ServerDataTableTypes.ts';

const {
  url,
  createUrlMethod = 'post',
  editUrl,
  deleteUrl,
  singleEditUrl,
  fieldsContainerClass,
  dismissableMask = true,
  keepFormOpenAfterCreate = false,
  dialogClass,
  dialogContentStyle,
  columns,
  size,
  submitAndOpenProps,
  submitAndOpenButton,
  submitAndOpenText,
  submitAndOpenIcon = 'i-garden:check-double-fill-12',
  submitAndOpenSeverity = 'info',
  successMessageTitle,
  successMessageText,
  submitSeverity,
  submitText,
  submitIcon,
  fields,
  inlineFields = true,
  primaryKey = 'id' as keyof TRecord,
  autoLabelsWidth = true,
  focusFieldOnShown,
  focusFirstOnEdit = true,
  focusFirstOnCreate = true,
  popupTarget,
  deleteRecordMessage,
  deleteRecordHeader,
  submitPayloadTransformer,
  customDefaultValuesOnCreate,
  customDefaultValuesOnEdit,
  autoAppendIdToEditUrl = false,
} = defineProps<ServerFormDialogProps<TRecord>>();

const emits = defineEmits<{
  hidden: [];
  shown: [];
  visible: [isVisible: boolean];
  submitted: [row: TRecord | TRecord[] | (string | number)[], type: 'create' | 'update' | 'delete'];
  submitAndOpen: [row: TRecord | TRecord[] | (string | number)[], type: 'create' | 'update' | 'delete'];
}>();

const { t } = useI18n();
const isVisible = ref(false);
const isEditing = ref(false);
const isMultiEdit = ref(false);
const isMultiCreate = ref(false);
const idToCreate = ref<string | number>();
const idToEdit = ref<string | number>();
const recordToEdit = ref<TRecord>();
const initialValues = ref<any>();
const multiEditRecords = ref<any[]>([]);
const multiCreateRecords = ref<any[]>([]);

function columnToField(column: ServerDataTableColumn): HddFormField {
  let formFieldType = undefined;
  let formFieldOptions = undefined;
  let showable = undefined;
  if (column.type === 'select') {
    formFieldType = column.isMultiSelect ? 'multiselect' : 'select';
    if (Array.isArray(column.selectOptions)) {
      formFieldOptions = column.selectOptions;
    } else if (Array.isArray(column.selectOptions?.list)) {
      formFieldOptions = column.selectOptions.list;
    }
  } else if (column.type === 'numeric') {
    formFieldType = 'number';
  } else if (column.type === 'date') {
    formFieldType = 'date';
  } else if (column.type === 'textarea') {
    formFieldType = 'textarea';
  } else if (column.type === 'boolean') {
    formFieldType = 'checkbox';
  }
  if (column.showable) {
    showable = column.showable;
  }
  return {
    name: column.fullFieldName,
    label: getColumnTitle(column, t),
    multiEditable: column.multiEditable,
    type: formFieldType,
    options: formFieldOptions,
    showable: showable,
    ...(column.formProps ?? {}),
  };
}

const apiClient = useApiClient();
const hddFormRef = useTemplateRef<ComponentExposed<typeof HddForm>>('hddFormRef');

const mappedFormFields = computed(() => {
  return [
    ...(fields ?? []).map((field) => {
      if (!field.label) {
        field.label = t(startCase(field.name));
      }
      return field;
    }),
    ...(columns
      ?.filter((column) => column.inForm !== false && (isEditing ? column.editable !== false : column.creatable !== false))
      .map(columnToField) ?? []),
  ] as HddFormField[];
});

const hddFormOptions = computed(() => {
  let urlLink = typeof url === 'function' ? url(idToCreate.value).url : typeof url === 'object' ? url.url : url;

  let urlMethod = createUrlMethod;
  if (isEditing.value) {
    urlMethod = 'put';
    if (singleEditUrl && idToEdit.value) {
      urlLink = singleEditUrl(idToEdit.value).url;
    } else if (editUrl) {
      if (typeof editUrl === 'function') {
        const _tempUrl = editUrl(idToEdit.value);
        urlLink = _tempUrl.url;
        urlMethod = _tempUrl.method;
      } else {
        urlLink = typeof editUrl === 'object' ? editUrl.url : editUrl;
      }
      if (autoAppendIdToEditUrl && idToEdit.value) {
        urlLink = appendToUrl(urlLink, idToEdit.value);
      }
    } else if (idToEdit.value) {
      urlLink = appendToUrl(urlLink, idToEdit.value);
    }
  }

  let localSubmitPayloadTransformer = undefined;
  if (isMultiEdit.value) {
    localSubmitPayloadTransformer = (payload: any, form: HddFormComposer) => {
      const formFieldsStates = form.fieldsStates.value;
      for (const fieldName in formFieldsStates) {
        if (!formFieldsStates[fieldName].pristine) {
          const newValue = get(form.currentValues.value, fieldName);
          for (const index in multiEditRecords.value) {
            set(multiEditRecords.value[index], fieldName, newValue);
            if (submitPayloadTransformer) {
              multiEditRecords.value[index] = submitPayloadTransformer(multiEditRecords.value[index]);
            }
          }
        }
      }
      return {
        data: multiEditRecords.value,
      };
    };
  } else if (submitPayloadTransformer) {
    localSubmitPayloadTransformer = submitPayloadTransformer;
  }

  return {
    url: {
      url: urlLink,
      method: urlMethod,
    },
    fieldsContainerClass,
    unifyLabelsWidth: autoLabelsWidth,
    autoFocusFirstOnMount: false,
    submitSeverity: submitSeverity ?? (isEditing.value ? 'success' : 'primary'),
    submitText: submitText ?? (isEditing.value ? t('Update') : t('Create')),
    submitIcon: submitIcon ?? (isEditing.value ? 'i-material-symbols:save' : 'i-mdi-check'),
    initialValues: initialValues.value,
    submitPayloadTransformer: localSubmitPayloadTransformer,
    size: 'small',
    inlineFields: inlineFields,
    fields: mappedFormFields,
    isEditing: isEditing.value,
    onFailure(error: unknown) {
      if (withoutDialog.value) {
        apiClient.toastRequestError(error);
      }
    },
    onSuccess: (data: any) => {
      emits('submitted', data.data, isEditing ? 'update' : 'create');
      if (isEditing.value || !keepFormOpenAfterCreate) {
        isVisible.value = false;
      }
      if (successMessageTitle || successMessageText) {
        apiClient.toastSuccess(successMessageTitle, successMessageText);
      } else {
        apiClient.toastSuccess(
          isEditing.value ? t('Updated!') : t('Created!'),
          isEditing.value
            ? isMultiEdit
              ? t('Record Updated Successfully!')
              : t('n Record Updated Successfully!', { n: multiEditRecords.value.length }, multiEditRecords.value.length)
            : isMultiCreate
              ? t('Record Created Successfully!')
              : t('n Record Created Successfully!', { n: multiEditRecords.value.length }, multiEditRecords.value.length),
        );
      }

      withoutDialog.value = false;
    },
  } as HddFormProps;
});
const form = computed(() => hddFormRef?.value?.form);
const currentValues = computed(() => hddFormRef.value?.currentValues);

function setValue(fieldName: string, value: any) {
  form?.value?.setValue(fieldName, value);
}
function getValue(fieldName: string) {
  return get(currentValues.value, fieldName);
}
function setValues(_values: { [key: string]: any }) {
  for (const fieldName in _values) {
    form?.value?.setValue(fieldName, _values[fieldName]);
  }
}

function create(rowValues = false, specificId?: string | number) {
  if (rowValues || customDefaultValuesOnCreate) {
    initialValues.value = typeof rowValues === 'object' ? rowValues : {};

    if (mappedFormFields.value) {
      for (const field of mappedFormFields.value) {
        if (field.defaultValue !== undefined) {
          set(
            initialValues.value,
            field.name.split('.'),
            typeof field.defaultValue === 'function'
              ? field.defaultValue(rowValues ? get(rowValues, field.name) : undefined, rowValues)
              : field.defaultValue,
          );
        }
      }
    }
    idToCreate.value = specificId ?? (initialValues.value[primaryKey as keyof TRecord] as string | number);

    if (customDefaultValuesOnCreate) {
      setDefaultValues(customDefaultValuesOnCreate);
      setValues(customDefaultValuesOnCreate);
    }
  }
  nextTick(() => {
    isVisible.value = true;
  });
}

function editMulti(rows: TRecord[]) {
  if (rows.length === 0) return;
  if (rows.length === 1) return edit(rows[0]);

  isEditing.value = true;
  initialValues.value = rows[0];
  multiEditRecords.value = cloneDeep(rows);
  isMultiEdit.value = true;
  nextTick(() => {
    isVisible.value = true;
  });
}

function edit(row: TRecord, showDialog = true) {
  isEditing.value = true;
  recordToEdit.value = row;
  initialValues.value = cloneDeep(row);
  idToEdit.value = row[primaryKey as keyof TRecord] as string | number;
  if (mappedFormFields.value) {
    for (const field of mappedFormFields.value) {
      if (field.customEditGetter) {
        const currentValue = get(row, field.name);
        set(initialValues.value, field.name, typeof field.customEditGetter === 'function' ? field.customEditGetter(currentValue, row) : currentValue);
      }
    }
  }
  if (customDefaultValuesOnEdit) {
    setDefaultValues(customDefaultValuesOnEdit);
    setValues(customDefaultValuesOnEdit);
  }
  if (showDialog) {
    nextTick(() => {
      isVisible.value = true;
    });
  }
}

function cancel() {
  isVisible.value = false;
}

function onResetButtonClicked() {}
const dialogRef = useTemplateRef('dialogRef');
const { isClosable, dialogStackIndex } = useStackableDialog({ dialogVisibilityRef: isVisible, dialogRef: dialogRef });

function onDialogHidden() {
  isEditing.value = false;
  initialValues.value = undefined;
  idToCreate.value = undefined;
  idToEdit.value = undefined;
  recordToEdit.value = undefined;
  isMultiEdit.value = false;
  multiEditRecords.value = [];
  emits('hidden');
  emits('visible', false);
}

function onDialogShown() {
  if (!focusFieldOnShown) {
    if (isEditing.value) {
      if (focusFirstOnEdit) {
        focusFirst();
      }
    } else {
      if (focusFirstOnCreate) {
        focusFirst();
      }
    }
  } else {
    focusField(focusFieldOnShown, 100);
  }
  emits('shown');
  emits('visible', true);
}

function isMultiEditableField(field: HddFormField) {
  return field.multiEditable === true;
}

function isDifferentValuesField(field: HddFormField) {
  if (multiEditRecords.value.length === 0) return false;
  const firstValue = get(multiEditRecords.value[0], field.name);

  const allSame = multiEditRecords.value.every((record) => isEqual(get(record, field.name), firstValue));

  return !allSame;
}

function setDefaultValues(_values: { [key: string]: any }) {
  for (const fieldName in _values) {
    set(initialValues.value, fieldName.split('.'), _values[fieldName]);
  }
}

function restoreFieldDefault(field: HddFormField) {
  const defaultValue = typeof field.defaultValue === 'function' ? field.defaultValue() : field.defaultValue;

  set(currentValues.value, field.name.split('.'), defaultValue);
  for (let i = 0; i < multiEditRecords.value.length; i++) {
    set(multiEditRecords.value[i], field.name.split('.'), defaultValue);
  }
  nextTick(() => {
    hddFormRef.value?.fieldRefs[field.name]?.focus();
  });
}

function close() {
  isVisible.value = false;
}

function focusFirst() {
  setTimeout(() => {
    hddFormRef.value?.focusFirst();
  }, 100);
}

function focusField(name: string, waitFor: number = 0) {
  setTimeout(() => {
    hddFormRef.value?.focusField(name);
  }, waitFor);
}

const confirm = useConfirm();
const { updateDialogVisibility: updateDeleteDialogVisibility } = useStackableDialog();

function deleteRecord(item: TRecord | TRecord[]) {
  if (!item) return;
  let cnt = 1;
  if (Array.isArray(item)) {
    cnt = item.length;
  }
  const _popupTarget = toValue(popupTarget);
  emits('visible', true);
  updateDeleteDialogVisibility(true);
  confirm.require({
    message: deleteRecordMessage ?? t('Are you sure to delete n records?', { n: cnt }, cnt),
    header: deleteRecordHeader ?? t('Confirmation'),
    target: _popupTarget,
    icon: 'pi pi-info-circle',
    rejectLabel: t('Cancel'),
    acceptLabel: t('Delete'),
    group: _popupTarget ? 'popup' : 'dismissable',
    rejectClass: 'p-button-secondary p-button-outlined',
    acceptClass: 'p-button-danger',
    accept: async () => {
      const ids = (Array.isArray(item) ? item.map((i) => i[primaryKey]) : [item[primaryKey]]) as (string | number)[];
      try {
        if (!url && !deleteUrl) {
          throw new Error('No Url');
        }
        let urlLink;
        let urlMethod = 'delete';
        if (deleteUrl) {
          if (typeof deleteUrl === 'function') {
            const _tempUrl = deleteUrl(ids[0]);
            urlLink = _tempUrl.url;
            urlMethod = _tempUrl.method;
          } else if (typeof deleteUrl === 'object') {
            urlLink = deleteUrl.url;
            urlMethod = deleteUrl.method;
          } else {
            urlLink = deleteUrl;
          }
        } else {
          urlLink = typeof url === 'object' ? url.url : url;
          if (cnt === 1) {
            urlLink = appendToUrl(urlLink, ids[0]);
          }
        }
        await apiClient.request({
          url: urlLink,
          method: urlMethod,
          params: { ids },
        });
        apiClient.toastSuccess(t('Deleted!'), t('n Record Deleted Successfully', { n: cnt }, cnt));
        emits('submitted', item, 'delete');
      } catch (error: any) {
        console.error(error);
        apiClient.toastRequestError(error);
      }
      updateDeleteDialogVisibility(false);
    },
    reject() {
      updateDeleteDialogVisibility(false);
    },
    onHide: () => {
      updateDeleteDialogVisibility(false);
    },
  });
}

const withoutDialog = ref(false);

/**
 *  Update directly the record without opening the form.
 *  Values are passed as an array of [fieldName, value] pairs.
 */
function updateDirectly(row: TRecord, ...values: [string, any][]) {
  withoutDialog.value = true;
  try {
    edit(row);
    nextTick(() => {
      setTimeout(() => {
        values.forEach(([fieldName, value]) => {
          setValue(fieldName, value);
        });
        form.value.submitForm();
      });
    });
  } catch (e) {
    withoutDialog.value = false;
    apiClient.toastError(e);
  }
}

const generalSlotProps = computed(() => {
  return {
    row: recordToEdit.value ?? initialValues.value,
    submit: form.value?.submitForm,
    cancel: cancel,
  };
});

function submitAndOpen() {
  form.value.submitForm().then((response) => {
    if (response) {
      emits('submitAndOpen', response.data ?? response, isEditing ? 'update' : 'create');
    }
  });
}

defineExpose({
  mappedFormFields,
  currentValues,
  setDefaultValues,
  setValue,
  getValue,
  setValues,
  create,
  editMulti,
  edit,
  updateDirectly,
  deleteRecord,
  delete: deleteRecord,
  close,
});
</script>

<template>
  <Dialog
    ref="dialogRef"
    v-model:visible="isVisible"
    :dismissable-mask="dismissableMask"
    :modal="!withoutDialog"
    keep-in-viewport
    :close-on-escape="isClosable"
    :content-style="dialogContentStyle"
    :draggable="false"
    class="w-580px"
    :class="[dialogClass, { '!hidden': withoutDialog }]"
    @show="onDialogShown"
    @after-hide="onDialogHidden"
  >
    <template #header>
      <slot name="header" :row="recordToEdit ?? initialValues">
        <template v-if="title">
          <div>
            <div class="font-bold">{{ title }}</div>
            <template v-if="subtitle">
              <div class="mt-1" v-html="subtitle"></div>
            </template>
          </div>
        </template>
        <template v-else>
          <span v-if="isEditing" class="font-bold">
            {{ editRecordHeader ?? (isMultiEdit ? t('Edit n Records', { n: multiEditRecords.length }, multiEditRecords.length) : t('Edit Record')) }}
          </span>
          <span v-else class="font-bold">
            {{
              createRecordHeader ??
              (isMultiCreate ? t('Create n Records', { n: multiCreateRecords.length }, multiCreateRecords.length) : t('Create Record'))
            }}
          </span>
        </template>
      </slot>
    </template>

    <template #closebutton="{ closeCallback }">
      <Button text :title="t('Close')" severity="contrast" size="small" variant="text" rounded icon="i-mdi-close scale-180" @click="closeCallback">
      </Button>
    </template>
    <HddForm ref="hddFormRef" v-bind="hddFormOptions" @reset="onResetButtonClicked">
      <template v-for="field in mappedFormFields" #[`${getFieldSlotName(field)}BeforeControl`]>
        <slot :name="`${getFieldSlotName(field)}BeforeControl`"></slot>
      </template>
      <template v-for="field in mappedFormFields" #[`${getFieldSlotName(field)}ControlBody`]>
        <slot :name="`${getFieldSlotName(field)}ControlBody`"></slot>
      </template>
      <template v-for="field in mappedFormFields" #[`${getFieldSlotName(field)}AfterControl`]>
        <slot :name="`${getFieldSlotName(field)}AfterControl`"></slot>
      </template>
      <template #fieldInput="{ field, binds }">
        <template v-if="isMultiEdit && !isMultiEditableField(field)">
          <BaseInput
            v-bind="binds"
            :hide-label-double-dots="false"
            :label="field.label ?? field.name"
            label-single-line
            inline
            disabled
            :button-addon="undefined"
          >
            <Message severity="secondary" variant="simple" size="small" class="w-full ps-8">
              {{ t('Unavailable in multi edit') }}
            </Message>
          </BaseInput>
        </template>
        <template v-else-if="isMultiEdit && isMultiEditableField(field) && isDifferentValuesField(field)">
          <BaseInput
            v-bind="binds"
            :hide-label-double-dots="false"
            :label="field.label ?? field.name"
            label-single-line
            inline
            disabled
            :button-addon="undefined"
          >
            <Message severity="secondary" variant="simple" size="small" class="w-full ps-8">
              <span class="mx-4">{{ t('Different Values') }}</span>
              <Button
                v-tooltip="t('Edit All')"
                size="small"
                variant="text"
                raised
                icon="pi pi-pencil"
                severity="warn"
                @click="restoreFieldDefault(field)"
              />
            </Message>
          </BaseInput>
        </template>
      </template>
      <template #buttons-area>
        <div></div>
      </template>
    </HddForm>
    <template #footer>
      <div class="mt-2 flex w-full justify-between">
        <div>
          <slot name="beforeCancelButton" v-bind="generalSlotProps"></slot>
          <Button
            :size="size"
            :loading="hddFormRef?.isSubmitting"
            :label="t('Cancel')"
            icon="i-material-symbols:close"
            severity="secondary"
            outlined
            @click="cancel"
          />
          <slot name="afterCancel" v-bind="generalSlotProps"></slot>
        </div>
        <div class="flex flex-wrap gap-1">
          <slot name="beforeSubmitButton" v-bind="generalSlotProps"></slot>
          <Button
            :size="size"
            :loading="hddFormRef?.isSubmitting"
            :disabled="hddFormRef?.isSubmitting"
            :label="hddFormOptions.submitText || t('Submit')"
            :icon="hddFormOptions.submitIcon"
            :severity="hddFormOptions.submitSeverity"
            @click="form.submitForm()"
          />
          <Button
            v-if="
              submitAndOpenButton
                ? typeof submitAndOpenButton === 'function'
                  ? submitAndOpenButton({ isEditing: isEditing })
                  : submitAndOpenButton
                : false
            "
            :size="size"
            :loading="hddFormRef?.isSubmitting"
            :disabled="hddFormRef?.isSubmitting"
            :label="
              submitAndOpenText
                ? typeof submitAndOpenText === 'function'
                  ? submitAndOpenText({ isEditing: isEditing })
                  : submitAndOpenText
                : t('Submit & Open')
            "
            :icon="
              submitAndOpenIcon
                ? typeof submitAndOpenIcon === 'function'
                  ? submitAndOpenIcon({ isEditing: isEditing })
                  : submitAndOpenIcon
                : undefined
            "
            :severity="submitAndOpenSeverity"
            v-bind="submitAndOpenProps"
            @click="submitAndOpen"
          />
          <slot name="afterSubmitButton" v-bind="generalSlotProps"></slot>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<style scoped></style>
