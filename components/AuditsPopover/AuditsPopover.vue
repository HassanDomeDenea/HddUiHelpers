<script setup lang="ts">
import type { AuditData } from '@/types/laravel_generated';
import type { UrlObject } from 'HddUiHelpers/components/FormWrapper/types.ts';
import { useLoader } from 'HddUiHelpers/composables/loader.ts';
import { useApiClient } from 'HddUiHelpers/stores/apiClient.ts';
import moment from 'moment';
import Popover from 'primevue/popover';
import { ref } from 'vue';
import type { ComponentExposed } from 'vue-component-type-helpers';

const popoverRef = useTemplateRef<ComponentExposed<typeof Popover>>('popoverRef');
const audits = ref<AuditData[]>([]);
const field = ref();
const formatter = ref<(value: any) => string>(null);
const classFormatter = ref<(value: any) => any>(null);
const apiClient = useApiClient();
const { t } = useI18n();
const { startLoading, endLoading, isLoading } = useLoader();
async function showFor(
  clickEvent: PointerEvent,
  model: string,
  id: string | number,
  _field: string,
  _formatter: (value: any) => string = null,
  _classFormatter: (value: any) => any = null,
) {
  audits.value = [];
  popoverRef.value.show(clickEvent);
  field.value = _field;
  formatter.value = _formatter;
  classFormatter.value = _classFormatter;
  apiClient
    .get('/api/audits', {
      params: {
        type: model,
        id: id,
        field: _field,
      },
    })
    .then((res) => {
      audits.value = Array.isArray(res.data) ? res.data : [];
      if (audits.value.length < 1) {
        popoverRef.value.hide();
      }
    });
}

async function showAudits(
  clickEvent: PointerEvent,
  url: string | UrlObject,
  _field: string,
  _formatter: (value: any) => string = null,
  _classFormatter: (value: any) => any = null,
  urlAppendedPath: string = 'audits',
) {
  field.value = _field;
  formatter.value = _formatter;
  classFormatter.value = _classFormatter;
  popoverRef.value.hide();
  await nextTick(() => {
    popoverRef.value.show(clickEvent);
  });
  startLoading();
  apiClient
    .request({
      url: (typeof url === 'object' ? url.url : url) + (urlAppendedPath ? `/${urlAppendedPath}` : ''),
      method: typeof url === 'object' ? url.method : 'get',
      params: {
        field: _field,
      },
    })
    .then((response) => {
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      audits.value = response.data.data.data;
    })
    .catch(apiClient.toastRequestError)
    .finally(endLoading);
}
defineExpose({ showFor, showAudits });
</script>

<template>
  <Popover ref="popoverRef">
    <div style="max-height: 90vh; overflow-y: auto">
      <div class="mb-1 font-bold text-teal-700">{{ t('Edit History') }}:</div>
      <template v-if="isLoading">
        <div class="text-center">
          <ProgressSpinner class="!size-8" />
        </div>
      </template>
      <ul v-else-if="audits.length > 0" class="max-h-xs list-disc overflow-y-auto ps-4">
        <li v-for="item in audits" :key="item.id">
          <span class="me-2 inline-block font-bold" :class="classFormatter ? classFormatter(item.new_value) : ''">
            {{ formatter ? formatter(item.new_value) : item.new_value }}
          </span>
          <span v-tooltip.sm="item.user?.name ? t('By') + ': ' + item.user?.name : undefined" class="dir-ltr inline-block text-xs">
            ({{ moment(item.created_at).format('YYYY-MM-DD HH:mm A') }})
          </span>
        </li>
      </ul>
      <div v-else>
        <span class="text-secondary text-sm">{{ t('No Editing History') }}</span>
      </div>
    </div>
  </Popover>
</template>

<style scoped></style>
