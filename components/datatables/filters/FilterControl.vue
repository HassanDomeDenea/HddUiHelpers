<script setup lang="ts">
import type { ServerDataTableColumn } from 'HddUiHelpers/components/datatables/ServerDataTableTypes.ts';
import { getColumnTitle } from 'HddUiHelpers/components/datatables/ServerDataTableUtilities.ts';
import AutoFocusable from 'HddUiHelpers/components/misc/AutoFocusable.vue';
import MultiSelectColumnFilter from 'HddUiHelpers/components/primeVueServerTable/MultiSelectColumnFilter.vue';
import SelectColumnFilter from 'HddUiHelpers/components/primeVueServerTable/SelectColumnFilter.vue';
import YesNoCheckbox from 'HddUiHelpers/components/YesNoCheckbox.vue';
import { startCase } from 'lodash-es';
import isBoolean from 'lodash/isBoolean';
import moment from 'moment/moment';
import type { ColumnFilterModelType } from 'primevue';
import Button from 'primevue/button';

const { filterCallback,column } = defineProps<{
    column: ServerDataTableColumn;
    filterCallback: () => void;
    size?: string | 'small' | 'large';
}>();
const filterModel = defineModel<ColumnFilterModelType>('filterModel');
const { t } = useI18n();
const isDateRange = computed(() => {
    return ['dateBetween', 'dateNotBetween'].includes(filterModel.value.matchMode);
});
watch(isDateRange, (newIsDateRange) => {
    if (newIsDateRange && !Array.isArray(filterModel.value.value)) {
        filterModel.value.value = null;
    } else if (!newIsDateRange && Array.isArray(filterModel.value.value)) {
        filterModel.value.value = filterModel.value.value[0] ?? null;
    }
});

function onDateRangeModelValueUpdated(event: null | [null | Date, null | Date]) {
    if (event === null) {
        filterModel.value.value = null;
        filterCallback();
    } else if (event[0] && event[1]) {
        filterModel.value.value = [moment(event[0] as Date).format(), moment(event[1] as Date).format()];
        filterCallback();
    }
}
const isNumericType = computed(()=>['numeric', 'price'].includes(column.type))
</script>

<template>
    <AutoFocusable :duration="150">
        <template #default="{ setRef }">
            <InputText
                v-if="!column.type || column.type === 'text'"
                :ref="setRef"
                v-bind="column.filterInputProps ?? {}"
                v-model="filterModel.value"
                :size="size"
                :title="t('Hit enter key to filter')"
                type="text"
                :placeholder="`${t('Search by')} ${column.label || t(startCase(column.name ?? column.field)).toLowerCase()} `"
                @keydown.enter="filterCallback()"
            />
            <template v-else-if="column.type === 'date'">
                <DatePicker
                    v-if="!isDateRange"
                    :size="size"
                    :model-value="filterModel.value && !Array.isArray(filterModel.value) ? new Date(filterModel.value) : null"
                    date-format="yy-mm-dd"
                    placeholder="yyyy-mm-dd"
                    @update:model-value="(filterModel.value = $event ? moment($event as Date).format() : null) && filterCallback()"
                />
                <DatePicker
                    v-else
                    :size="size"
                    hide-on-range-selection
                    :model-value="
                        filterModel.value && Array.isArray(filterModel.value)
                            ? [
                                  filterModel.value[0] ? new Date(filterModel.value[0]) : null,
                                  filterModel.value[1] ? new Date(filterModel.value[1]) : null,
                              ]
                            : null
                    "
                    :selection-mode="'range'"
                    date-format="yy-mm-dd"
                    placeholder="yyyy-mm-dd"
                    @date-select="console.log"
                    @update:model-value="onDateRangeModelValueUpdated"
                >
                </DatePicker>
            </template>
            <NumberInput
                v-else-if="isNumericType && !['between', 'notBetween'].includes(filterModel.matchMode)"
                :ref="setRef"
                v-model.number="filterModel.value"
                :use-grouping="column.type==='price'"
                :size="size"
                allow-empty
                :text-addon="column.filterCurrency ? t(column.filterCurrency) : undefined"
                v-bind="column.filterInputProps ?? {}"
                @keydown.enter="filterCallback()"
            />
            <template v-else-if="isNumericType && ['between', 'notBetween'].includes(filterModel.matchMode)">
                <div v-for="i in [0, 1]" :key="i">
                    <div>{{ i === 0 ? t('From') : t('To') }}:</div>
                    <NumberInput
                        :ref="i === 0 ? setRef : undefined"
                        :size="size"
                        :text-addon="column.filterCurrency ? t(column.filterCurrency) : undefined"
                        allow-empty
                        :use-grouping="column.type==='price'"
                        :model-value="(filterModel.value || [])[i]"
                        v-bind="column.filterInputProps ?? {}"
                        @update:model-value="
                            filterModel.value = [i === 0 ? $event : (filterModel.value || [])[0], i === 1 ? $event : (filterModel.value || [])[1]]
                        "
                    />
                </div>
            </template>

            <template v-else-if="column.type === 'boolean'">
                <div class="my-1 underline underline-offset-4">{{ t('Filter By') }}:</div>
                <YesNoCheckbox
                    :ref="setRef"
                    v-model="filterModel.value"
                    :size="size"
                    class="ms-4"
                    label-position="start"
                    :label="getColumnTitle(column, t)"
                    with-status-label
                    :checked-label="column.booleanCheckedValue"
                    :un-checked-label-label="column.booleanUncheckedValue"
                    @change="filterCallback()"
                />
            </template>
            <template v-else-if="column.type === 'select'">
                <template v-if="!isBoolean(column.showFilterAddButton) || column.isMultiSelect === true">
                    <MultiSelectColumnFilter
                        :ref="setRef"
                        :size="size"
                        :label="column.selectFilterHeader ?? getColumnTitle(column, t)"
                        :options="Array.isArray(column.selectOptions) ? column.selectOptions : (column.selectOptions?.list ?? [])"
                        :slot-props="{ filterModel, filterCallback }"
                        :option-value-property="column.selectValueProperty"
                        :option-label-property="column.selectLabelProperty"
                    />
                    <div v-if="filterModel.value" class="flex justify-end">
                        <Button
                            size="small"
                            type="button"
                            icon="pi pi-filter-slash"
                            outlined
                            :label="t('Clear')"
                            @click="
                                filterModel.value = null;
                                filterCallback();
                            "
                        />
                    </div>
                </template>
                <SelectColumnFilter
                    v-else
                    :ref="setRef"
                    :size="size"
                    :label="column.selectFilterHeader ?? getColumnTitle(column, t)"
                    :options="Array.isArray(column.selectOptions) ? column.selectOptions : (column.selectOptions?.list ?? [])"
                    :slot-props="{ filterModel, filterCallback }"
                    :option-value-property="column.selectValueProperty"
                    :option-label-property="column.selectLabelProperty"
                />
            </template>
        </template>
    </AutoFocusable>
</template>

<style scoped></style>
