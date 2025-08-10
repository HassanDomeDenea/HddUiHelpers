<script setup lang="ts">
import type { ServerDataTableToolbarFilterWrapper } from 'HddUiHelpers/components/datatables/ServerDataTableTypes.ts';
import { type ServerDataTableColumn, type ServerDataTableToolbarFilterValue } from 'HddUiHelpers/components/datatables/ServerDataTableTypes.ts';
import {
    getColumnCanShowFilterApplyButton,
    getColumnCanShowFilterMatchModes,
    getColumnCellFormatedText,
    getColumnTitle,
    getFilterMatchModesByTypeOptions,
} from 'HddUiHelpers/components/datatables/ServerDataTableUtilities.ts';
import { hidePrimevuePopovers } from 'HddUiHelpers/plugins/primevue.ts';
import { isNull, toLower } from 'lodash-es';
import isBoolean from 'lodash/isBoolean';
import type { ColumnFilterModelType } from 'primevue';
import type ContextMenu from 'primevue/contextmenu';
import Popover from 'primevue/popover';
import type { ComponentExposed } from 'vue-component-type-helpers';
import { useFormatters } from 'HddUiHelpers/utils/useFormatters.ts';
import moment from 'moment';

const {
    columns,
    operator,
    canCreateGroup,
    isPrinting = false,
} = defineProps<{
    operator?: ServerDataTableToolbarFilterWrapper['operator'];
    columns: ServerDataTableColumn[];
    isPrinting?: boolean;
    canCreateGroup?: boolean;
}>();

const emits = defineEmits<{
    remove: [field: string];
    isolateIntoGroup: [];
    operatorChanged: [operator: ServerDataTableToolbarFilterWrapper['operator']];
    filterCallback: [filter: ServerDataTableToolbarFilterValue];
}>();
const filter = defineModel<ServerDataTableToolbarFilterValue>('filter');
const filterDivRef = useTemplateRef<HTMLElement>('filterDivRef');
const { t } = useI18n();
const column = computed(() => {
    return columns.find((e) => (e.filterField ?? e.fullFieldName) === filter.value.field);
});
const formatters = useFormatters()
const label = computed(() => {
    return getColumnTitle(column.value, t);
});

const formattedValue = computed(() => {
    let originalValue = filter.value.value;
    const baseValue = getColumnCellFormatedText(originalValue, column.value, t);
    if(column.value.type === 'date' && column.value.dateFormat){
        if(Array.isArray(originalValue)){
            originalValue = originalValue.map(e=>moment(e).format(column.value.dateFormat))
        }else{
            originalValue = moment(originalValue).format(column.value.dateFormat)
        }
    }
    switch (column.value.type) {
        case 'date':
            if (Array.isArray(originalValue)) {
                return (
                    `<span class="inline-block ltr">${originalValue[0]}</span>` +
                    ` <span class="mx-1 italic font-light"> ${t('and')} </span> ` +
                    `<span class="inline-block ltr">${originalValue[1]}</span>`
                );
            }
            break;
        case 'price':
        case 'numeric':
            const isPrice= column.value.type === 'price'

            const currency = typeof column.value.currency === 'string' ? column.value.currency :undefined
            if (Array.isArray(originalValue)) {
                return (
                    `<span class="inline-block ltr">${isPrice ? formatters.formatPrice(originalValue[0],currency) :originalValue[0]}</span>` +
                    ` <span class="mx-1 italic font-light"> ${t('and')} </span> ` +
                    `<span class="inline-block ltr">${isPrice ? formatters.formatPrice(originalValue[1],currency) :originalValue[1]}</span>`
                );
            }
            return isNull(originalValue) ? null : formatters.formatPrice(baseValue,currency);
        case 'select':
            return Array.isArray(baseValue)
                ? baseValue.length === 1
                    ? baseValue[0]
                    : baseValue.join(filter.value.matchMode === 'whereIn' ? `<span class="mx-1 italic font-light"> ${t('or')} </span>` : t(',') + ' ')
                : baseValue;
        case 'boolean':
            return isBoolean(originalValue) ? baseValue : null;
    }

    return baseValue || null;
});

const matchModeSymbol = computed(() => {
    switch (filter.value.matchMode) {
        case 'whereIn':
            return '=';
        // return filter.value.value?.length < 2 ? '=' : t('In');
        default:
            const targetMatchMode = matchModeOptions.value.find((e) => e.value === filter.value.matchMode);

            if (!targetMatchMode) {
                return t('?');
            }
            if (targetMatchMode.symbol) {
                return targetMatchMode.symbol;
            }
            return toLower(targetMatchMode.label);
    }
});
const localFilterModel = ref<ColumnFilterModelType>();
const menuPopoverRef = useTemplateRef<ComponentExposed<typeof Popover>>('menuPopoverRef');
const operatorChangerRef = useTemplateRef<ComponentExposed<typeof Popover>>('operatorChangerRef');
const matchModeOptions = computed(() => {
    return getFilterMatchModesByTypeOptions(t)[column.value.type ?? 'text'];
});

function onFilterDivClick(event: PointerEvent) {
    if (isPrinting) return;
    localFilterModel.value = {
        value: filter.value.value,
        matchMode: filter.value.matchMode,
    };
    menuPopoverRef.value?.toggle(event);
}

function filterCallback() {
    filter.value.value = localFilterModel.value.value;
    filter.value.matchMode = localFilterModel.value.matchMode;
    menuPopoverRef.value?.hide();
    emits('filterCallback', filter.value);
}

function onPopoverHide() {}

const localOperator = ref();

function onOperatorSpanClick(evt: PointerEvent) {
    if (isPrinting) return;
    localOperator.value = operator;
    hidePrimevuePopovers();
    operatorChangerRef.value.toggle(evt);
}

function onOperatorChanges(newOperator: ServerDataTableToolbarFilterWrapper['operator']) {
    if (newOperator && newOperator !== operator) {
        emits('operatorChanged', newOperator);
    }
    operatorChangerRef.value.hide();
}

const filterDivContextMenuRef = useTemplateRef<ComponentExposed<typeof ContextMenu>>('filterDivContextMenuRef');

function onFilterDivContextMenu(event: PointerEvent) {
    if (isPrinting) return;
    hidePrimevuePopovers();
    if (canCreateGroup) {
        filterDivContextMenuRef.value.toggle(event);
    }
}

const contextMenuItems = computed(() => {
    return [
        {
            label: t('Isolate into Group'),
            icon: 'i-mdi:filter-multiple',
            command: () => {
                emits('isolateIntoGroup');
            },
        },
    ];
});
function focus(){
    filterDivRef.value.click()
}

defineExpose({focus})
</script>

<template>
    <div :data-sort-id="filter.id">
        <ContextMenu v-if="!isPrinting" ref="filterDivContextMenuRef" :model="contextMenuItems"></ContextMenu>
        <div
            ref="filterDivRef"
            class="m-1 flex items-center rounded-xl border-1 border-gray-800/75 px-3 py-0.25 text-sm select-none dark:border-gray-400/75"
            @click="onFilterDivClick"
            @contextmenu.prevent="onFilterDivContextMenu"
        >
            <i
                v-if="!isPrinting"
                v-show="!filter.isFixed"
                class="i-mdi-close text-danger-3 hover:text-danger-2 cursor-pointer"
                tabindex="-1"
                :title="t('Remove')"
                @click.stop="emits('remove', filter.field)"
            ></i>
            <span class="w-[20px]">
                <span
                    v-if="operator"
                    class="mx-1 cursor-pointer rounded px-1 font-bold text-zinc-500 italic hover:bg-gray-200/75 dark:text-zinc-300 hover:dark:bg-gray-700/75"
                    :title="t('Change Filtering Method')"
                    @click.stop="onOperatorSpanClick"
                >
                    {{ t(operator) }}
                </span>
            </span>
            <span class="ms-2 font-bold whitespace-pre-wrap">{{ label }}</span>
            <span class="mx-2"> {{ matchModeSymbol }} </span>
            <span class="ms- 2 font-bold" v-html="isNull(formattedValue) ? t('?') : formattedValue"></span>
        </div>
        <Popover ref="menuPopoverRef" @hide="onPopoverHide">
            <div class="flex min-w-[200px] flex-col items-stretch gap-1">
                <Select
                    v-if="getColumnCanShowFilterMatchModes(column)"
                    v-model="localFilterModel.matchMode"
                    size="small"
                    option-label="label"
                    option-value="value"
                    :options="matchModeOptions"
                ></Select>
                <FilterControl v-model:filter-model="localFilterModel" :filter-callback="filterCallback" :column="column" size="small" />
                <div v-if="getColumnCanShowFilterApplyButton(column)" class="mt-4 flex justify-end">
                    <Button size="small" :label="t('Apply')" icon="i-mdi-check" severity="success" @click="filterCallback" />
                </div>
            </div>
        </Popover>
        <Popover ref="operatorChangerRef">
            <div>
                <SelectButton
                    v-model="localOperator"
                    option-label="label"
                    option-value="value"
                    size="small"
                    fluid
                    :options="[
                        { value: 'and', label: t('and') },
                        { value: 'or', label: t('or') },
                    ]"
                    @change="onOperatorChanges($event.value)"
                />
            </div>
        </Popover>
    </div>
</template>

<style scoped></style>
