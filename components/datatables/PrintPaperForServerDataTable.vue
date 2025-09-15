<script setup lang="ts" generic="TRecord extends RecordItem = RecordItem">
import type { AxiosRequestConfig } from 'axios';
import ToolbarFilterWrapper from 'HddUiHelpers/components/datatables/filters/ToolbarFilterWrapper.vue';
import {
    getColumnBodyClass,
    getColumnName,
    getColumnSlotName,
    getColumnTitle,
    isToolbarFilterEmpty
} from 'HddUiHelpers/components/datatables/ServerDataTableUtilities.ts';
import type { RecordItem } from 'HddUiHelpers/components/FormWrapper/types.ts';
import { printDomWithStyles } from 'HddUiHelpers/utils/printDom.ts';
import { ref } from 'vue';
import type { PrintPaperForServerDataTableProps } from './ServerDataTableTypes.ts';
import CellContent from 'HddUiHelpers/components/datatables/CellContent.vue';

const {
    records,
    extraData,
    title = undefined,
    printDirection = undefined,
    getData,
    checkColumnIsVisible,
    columns,
    sorts,
    headerImageUrl,
    firstPageHeaderImageUrl,
    footerImageUrl,
    showPageCounter,
    showCurrentPrintTime,
    primaryKey = 'id' as keyof TRecord
} = defineProps<PrintPaperForServerDataTableProps<TRecord>>();
const recordsToPrint = ref<TRecord[]>([]) as Ref<TRecord[]>;
const extraDataToPrint = ref();

const renderPrintNode = ref(false);
const printNodeRef = useTemplateRef<HTMLDivElement>('printNodeRef');
const isPrinting = defineModel<boolean>('isPrinting', { default: false });

async function print(printAllRows: boolean = false, requestConfig: AxiosRequestConfig = {}) {
    isPrinting.value = true;
    try {
        if (printAllRows) {
            const responseData = (await getData(-1, null, requestConfig)).data.data;
            recordsToPrint.value = responseData.data;
            extraDataToPrint.value = responseData.extra;
        } else {
            recordsToPrint.value = toValue(records);
            extraDataToPrint.value = toValue(extraData);
        }
        renderPrintNode.value = true;
        await nextTick();
        const element = printNodeRef.value;
        if (element) {
            await printDomWithStyles(element, {
                pageCounter: showPageCounter,
                leftMargin: 8,
                rightMargin: 8,
                topMargin: 8,
                bottomMargin: 8,
                showPrintTime: showCurrentPrintTime,
                firstPageHeaderImageUrl: toValue(firstPageHeaderImageUrl),
                headerImageUrl: toValue(headerImageUrl),
                footerImageUrl: toValue(footerImageUrl)
            });
        }
    } catch (error) {
        console.error(error);
    }
    renderPrintNode.value = false;
    isPrinting.value = false;
}

const { t } = useI18n();

defineExpose({ print });
const sortsIntoObject = computed(() => {
    return sorts.reduce(
        (carry, item) => {
            carry[item.field] = item.direction;
            return carry;
        },
        {} as Record<string, 'asc' | 'desc'>
    );
});
const printableColumns = computed(() => {
    return columns.filter((column) => column.printable !== false && checkColumnIsVisible(column));
});

const anyColumnHasFooter = computed(() => {
    return printableColumns.value.some((column) => column.footer);
});
</script>

<template>
    <div class="hidden">
        <div v-if="renderPrintNode" ref="printNodeRef" class="bg-white text-black">
            <div v-if="headerImageUrl" hidden class="flex items-center text-3xl font-bold justify-center">
                <img :src="headerImageUrl" style="width: 100%">
            </div>
            <slot name="printPageHeader" :records="recordsToPrint" :extra="extraDataToPrint">
                <div class="my-2 text-center text-xl font-bold">
                    {{ title }}
                </div>
            </slot>
            <div class="flex justify-start ps-4">
                <div>
                    <div v-if="filters._global?.value" class="mt-1">
                        <span class="underline underline-offset-5">{{ t('Search') }}</span>
                        <span class="">: </span>
                        <span>{{ filters._global.value }}</span>
                    </div>
                    <div v-if="!isToolbarFilterEmpty(toolbarFilters)">
                        <div class="mt-1">
                            <span class="underline underline-offset-5">{{ t('Filtering Options') }}</span>
                            <span>: </span>
                        </div>
                        <ToolbarFilterWrapper
                            is-printing
                            :filters="toolbarFilters"
                            :hide-operator="true"
                            :columns="mappedColumns"
                            :operator="toolbarFilters.operator"
                        />
                    </div>
                </div>
            </div>

            <div
                :dir="printDirection"
                :class="{ 'ltr text-left': printDirection === 'ltr', 'rtl text-right': printDirection === 'rtl' }">
                <table class="printable-table mx-auto mt-3">
                    <thead>
                    <tr>
                        <th v-if="hasSequenceColumn">#</th>
                        <template v-for="column in printableColumns" :key="getColumnName(column)">
                            <th>
                                <div class="flex items-center gap-1">
                                    <span class="flex-grow-1">{{ column.printLabel ?? getColumnTitle(column, t)
                                        }}</span>
                                    <span v-if="sortsIntoObject[column.sortField ?? column.fullFieldName]">
                                            <i
                                                v-if="sortsIntoObject[column.sortField ?? column.fullFieldName] === 'asc'"
                                                class="i-mdi:sort-ascending scale-y-[-1]"></i>
                                            <i v-else class="i-mdi:sort-descending scale-y-[-1]"></i>
                                        </span>
                                </div>
                            </th>
                        </template>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(row, rowIndex) in recordsToPrint" :key="row[primaryKey] as PropertyKey">
                        <td v-if="hasSequenceColumn">{{ rowIndex + 1 }}</td>
                        <template v-for="column in printableColumns" :key="getColumnName(column)">
                            <td
                                :style="column.bodyStyle"
                                :class="column.bodyClass ? getColumnBodyClass(row, column) : null">
                                <slot :name="`${getColumnSlotName(column)}ColumnPrintBody`">
                                    <CellContent
                                        :column="column" :rendered-data="getColumnBody(row, column)"
                                        :row="row" />
                                </slot>
                            </td>
                        </template>
                    </tr>
                    </tbody>
                    <tfoot v-if="anyColumnHasFooter">
                    <tr>
                        <th v-if="hasSequenceColumn">xx</th>
                        <template v-for="column in printableColumns" :key="getColumnName(column)">
                            <th>
                                    <span
                                        v-if="column.footer"
                                        v-html="typeof column.footer === 'string' ? column.footer : column.footer(recordsToPrint)"
                                    ></span>
                            </th>
                        </template>
                    </tr>
                    </tfoot>
                </table>
            </div>
            <div>
                <slot name="printPageFooter" :records="recordsToPrint" :extra="extraDataToPrint"></slot>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
table.printable-table {
    @apply '!box-content' w-[calc(100%_-_1rem)] border-separate border-spacing-0;

    th, td {
        border: 1px solid black;
        padding: 0.25rem;
    }

    thead {
        background: #e7e3e3;

        th:first-child{
            @apply rounded-ss-lg;
        }
        th:last-child{
            @apply rounded-se-lg;
        }
    }

}
</style>
