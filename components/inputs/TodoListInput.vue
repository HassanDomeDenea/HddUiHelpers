<script setup lang="ts">
import type { RouteDefinition, RouteQueryOptions } from '@/wayfinder/wayfinder';
import { useSortable } from '@vueuse/integrations/useSortable';
import { useConfirmDialogWithInput } from 'HddUiHelpers/components/ConfirmDialogWithInput/confirmDialogWithInputUtilities.ts';
import { useHddBaseInputUtils } from 'HddUiHelpers/components/inputs/inputsUtils.ts';
import { useApiClient } from 'HddUiHelpers/stores/apiClient.ts';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import { useConfirm } from 'primevue/useconfirm';
import { ref } from 'vue';
import BaseInput from './BaseInput.vue';
import type { BaseInputProps } from './types';

type LocalItemType = { id: string | number; name: string | number; item?: object; _isLoading?: boolean };

type ServerUrls = {
  list: (options?: RouteQueryOptions) => RouteDefinition<'get'>;
  store: (options?: RouteQueryOptions) => RouteDefinition<'post'>;
  update: (args: string | number, options?: RouteQueryOptions) => RouteDefinition<'put'>;
  destroy: (args: string | number, options?: RouteQueryOptions) => RouteDefinition<'delete'>;
  reorder: (options?: RouteQueryOptions) => RouteDefinition<'put'>;
};

const props = withDefaults(
  defineProps<
    {
      newItemInputProps?: BaseInputProps;
      numericList?: boolean;
      removable?: boolean;
      creatable?: boolean;
      editable?: boolean;
      reorderable?: boolean;
      serverUrls?: ServerUrls;
      labelProperty?: string;
      valueProperty?: string;
      orderSequenceProperty?: string;
      storeSuccessMessage?: string;
      updateSuccessMessage?: string;
      removeSuccessMessage?: string;
      removeConfirmHeaderMessage?: string;
      removeConfirmBodyMessage?: string;
      updateDialogHeaderMessage?: string;
      urlDeleteQueryParams?: Record<string, any> | (() => Record<string, any>);
      urlListQueryParams?: Record<string, any> | (() => Record<string, any>);
      urlStorePayload?: Record<string, any> | (() => Record<string, any>);
      urlUpdatePayload?: Record<string, any> | (() => Record<string, any>);
      urlReorderScopedValues?: Record<string, any> | (() => Record<string, any>);
      refreshOnMounted?: boolean;
      refreshOnActivated?: boolean;
      confirmBeforeRemove?: boolean;
    } & BaseInputProps
  >(),
  {
    creatable: true,
    removable: true,
    reorderable: true,
    labelProperty: 'name',
    valueProperty: 'id',
    orderSequenceProperty: 'order_sequence',
    refreshOnMounted: true,
    refreshOnActivated: false,
  },
);
const emits = defineEmits<{
  change: [event: Event];
}>();
const value = defineModel<any[]>('modelValue', { default: ref([]).value });
const newItemValue = defineModel<string | null>('newItemValue', {});
const { t } = useI18n();
const inputRef = ref();
const listRef = useTemplateRef<HTMLUListElement | HTMLOListElement>('listRef');
const confirmWithInput = useConfirmDialogWithInput();
const confirm = useConfirm();
const apiClient = useApiClient();
const isFetching = ref(false);
const isSubmitting = ref(false);
const isDeletingItms = ref<Record<string | number, boolean>>({});
function focus() {
  inputRef.value.$el.focus();
}

onMounted(() => props.refreshOnMounted && refreshList());
onActivated(() => props.refreshOnActivated && refreshList());

function onLabelClicked() {
  refreshList();
  inputRef.value?.focus?.();
}

function onCheckboxChange(evt: Event) {
  emits('change', evt);
}

onMounted(() => {
  inputRef.value.$el.children[0].addEventListener('keydown', (evt: KeyboardEvent) => {
    if (evt.key === 'Enter') {
      onLabelClicked();
    }
  });
});

const localItems = computed<LocalItemType[]>(() => {
  return (value.value || []).map((item) => {
    if (typeof item === 'object') {
      return {
        id: get(item, props.valueProperty),
        name: get(item, props.labelProperty, item.id),
        item: item,
      };
    } else {
      return {
        id: item,
        name: item,
      };
    }
  });
});
const addItem = () => {
  if (props.serverUrls?.store) {
    isSubmitting.value = true;
    apiClient
      .request(props.serverUrls.store(), {
        [props.labelProperty]: newItemValue.value,
        ...toValue(props.urlStorePayload),
      })
      .then(() => {
        refreshList();
        apiClient.toastSuccess(props.storeSuccessMessage ?? t('Item added successfully'));
      })
      .catch(apiClient.toastRequestError)
      .finally(() => {
        isSubmitting.value = false;
        newItemValue.value = null;
      });
  } else {
    if (!Array.isArray(value.value)) {
      value.value = [newItemValue.value];
    } else {
      value.value.push(newItemValue.value);
    }
    newItemValue.value = null;
  }
};

const removeItem = (item: LocalItemType, index: number, event: MouseEvent) => {
  if (props.confirmBeforeRemove || props.serverUrls?.destroy) {
    confirm.require({
      target: event.target as HTMLElement,
      message: props.removeConfirmBodyMessage ?? t('Are you sure you want to remove this item?'),
      header: props.removeConfirmHeaderMessage ?? t('Remove item'),
      icon: 'i-mdi-alert-circle text-danger',
      group: 'popup',
      acceptIcon: 'i-mdi-check',
      acceptClass: 'font-bold',
      acceptProps: {
        severity: 'danger',
      },
      rejectProps: {
        severity: 'secondary',
      },
      accept: () => {
        if (props.serverUrls?.store) {
          isSubmitting.value = true;
          isDeletingItms.value[item.id] = true;
          apiClient
            .request(
              props.serverUrls.destroy(item.id, {
                query: toValue(props.urlDeleteQueryParams),
              }),
            )
            .then(() => {
              refreshList();
              apiClient.toastSuccess(props.removeSuccessMessage ?? t('Item removed successfully'));
            })
            .catch(apiClient.toastRequestError)
            .finally(() => {
              isSubmitting.value = false;
              isDeletingItms.value[item.id] = undefined;
            });
        } else {
          value.value.splice(index, 1);
        }
      },
      defaultFocus: 'accept',
    });
  } else {
    value.value.splice(index, 1);
  }
};
const editItem = (item: LocalItemType, index: number, event: MouseEvent) => {
  if (!props.editable || isDeletingItms.value[item.id]) {
    return;
  }
  confirmWithInput.show({
    initialValue: item.name,
    autoSelectText: true,
    inputType: 'text',
    header: props.updateDialogHeaderMessage ?? t('Update Item'),
    acceptIcon: 'i-mdi-check',
    rejectLabel: t('Cancel'),
    acceptLabel: t('Update'),
    accept: (newValue) => {
      if (props.serverUrls?.store) {
        isSubmitting.value = true;
        isDeletingItms.value[item.id] = true;
        apiClient
          .request(props.serverUrls.update(item.id), {
            [props.labelProperty]: newValue,
            ...toValue(props.urlUpdatePayload ?? props.urlStorePayload),
          })
          .then(() => {
            refreshList();
            apiClient.toastSuccess(props.updateSuccessMessage ?? t('Item updated successfully'));
          })
          .catch(apiClient.toastRequestError)
          .finally(() => {
            isSubmitting.value = false;
            isDeletingItms.value[item.id] = undefined;
          });
      } else {
        value.value[index] = newValue;
      }
    },
    defaultFocus: 'accept',
  });
};

const refreshList = debounce(() => {
  if (props.serverUrls?.list) {
    isFetching.value = true;
    apiClient
      .request(
        props.serverUrls.list({
          query: toValue(props.urlListQueryParams),
        }),
      )
      .then((response) => {
        value.value = response.data.data;
      })
      .catch(apiClient.toastRequestError)
      .finally(() => {
        isFetching.value = false;
      });
  }
}, 10);

if (props.reorderable) {
  useSortable(listRef, localItems, {
    handle: '.reorder-handle',
    onUpdate: (e) => {
      isSubmitting.value = true;
      apiClient
        .request(
          props.serverUrls.reorder({
            query: {
              from_order: get(localItems.value[e.oldIndex]?.item, props.orderSequenceProperty),
              to_order: get(localItems.value[e.newIndex]?.item, props.orderSequenceProperty),
              scoped_values: toValue(props.urlReorderScopedValues ?? props.urlStorePayload),
            },
          }),
        )
        .then(() => {
          refreshList();
        })
        .catch(apiClient.toastRequestError)
        .finally(() => {
          isSubmitting.value = false;
        });
    },
  });
}

const { exposed, baseInputForwardedProps, fieldUniqueId, generalInputProps } = useHddBaseInputUtils(props);

defineExpose({ focus, ...exposed });
</script>

<template>
  <BaseInput v-bind="baseInputForwardedProps" :floating-label="false" :infield-top-aligned-label="false" @label-clicked="onLabelClicked">
    <div>
      <TextInput
        ref="inputRef"
        v-model="newItemValue"
        autocomplete="off"
        size="small"
        :placeholder="placeholder"
        v-bind="{ ...generalInputProps, ...newItemInputProps }"
        :readonly="isSubmitting"
        @keydown.enter="addItem"
      >
        <template #afterControl>
          <Button
            v-if="creatable"
            v-tooltip="t('Add')"
            icon="i-mdi-plus"
            size="small"
            :disabled="!value || isFetching || isSubmitting"
            :loading="isFetching || isSubmitting"
            @click="addItem"
          />
        </template>
      </TextInput>
      <component
        :is="numericList ? 'ol' : 'ul'"
        ref="listRef"
        class="ms-4 mt-2 list-disc space-y-1"
        :class="{ 'list-decimal-inside': numericList, 'list-disc-inside': !numericList }"
      >
        <template v-for="(item, itemIndex) in localItems" :key="item.id">
          <li :class="{ 'reorder-handle': !isSubmitting && reorderable }">
            <div class="inline-flex items-center gap-2">
              <span
                class="font-bold"
                :class="{ 'cursor-pointer underline-offset-4 hover:underline': editable }"
                @click="editItem(item, itemIndex, $event)"
                >{{ item.name }}</span
              >
              <Button
                v-if="removable"
                :title="t('Remove')"
                icon="i-mdi-close"
                :loading="isDeletingItms[item.id]"
                size="small"
                severity="danger"
                text
                @click="removeItem(item, itemIndex, $event)"
              />
            </div>
          </li>
        </template>
      </component>
    </div>
  </BaseInput>
</template>

<style scoped></style>
