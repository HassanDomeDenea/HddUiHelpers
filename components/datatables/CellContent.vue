<script setup lang="ts">
import type { ServerDataTableColumn } from 'HddUiHelpers/components/datatables/ServerDataTableTypes.ts';

const{column} =defineProps<{
    column: ServerDataTableColumn,
    renderedData: any,
    row: any,
    size?: 'small' | 'large' | string

}>()
import { get } from 'lodash-es';
import isBoolean from 'lodash/isBoolean';
const {t}=useI18n()

const resolveRenderTypeProps = computed(() => {
    return typeof column.renderTypeProps === 'function' ? column.renderTypeProps : toValue(column.renderTypeProps)
})
</script>

<template>
    <template v-if="column.renderType === 'chip'">
        <Chip
            :class="{ 'text-sm': size === 'small' }">
            {{ renderedData }}
        </Chip>
    </template>
    <template v-else-if="column.renderType === 'chips'">
        <div class="flex flex-wrap items-center gap-1">
            <Chip
                v-for="item in renderedData" :key="item"
                :class="{ 'text-sm': size === 'small' }">
                {{ item }}
            </Chip>
        </div>
    </template>
    <template v-else-if="column.renderType === 'tag'">
        <Tag
            v-bind="typeof resolveRenderTypeProps === 'function'?  resolveRenderTypeProps({value: get(row,column.fullFieldName), text: renderedData, row: row,options: column.selectOptions}) : resolveRenderTypeProps"
            :value="renderedData" />
    </template>
    <template v-else-if="column.renderType === 'yesNoIconBadge'">
        <Badge
            v-if="isBoolean(renderedData)"
            :size="size"
            :severity="renderedData ? 'success' : 'danger'"
            :title="t(renderedData ? 'Yes' : 'No')"
        >
            <i
                class="scale-120"
                :class="{ 'i-mdi-check': renderedData, 'i-mdi-times': !renderedData }"></i>
        </Badge>
    </template>
    <div v-else v-html="renderedData" />
</template>

<style scoped>

</style>
