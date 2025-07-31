<script setup lang="ts">
import type { ButtonProps } from 'primevue';
import ContextMenu from 'primevue/contextmenu';
import type { MenuItem } from 'primevue/menuitem';
import type { ComponentExposed } from 'vue-component-type-helpers';

export interface SummeryDataPanelItem {
    label: string;
    value: string|number|boolean|null;
    labelClass?: any;
    valueClass?: any;
    wrapperClass?: any;
    hidden?: boolean;
    noPrint?: boolean;
    appendButton?: ButtonProps;
    appendContextMenu?: MenuItem[];
}

const { labelWidth = 150 } = defineProps<{
    title?: string;
    labelWidth?: number | true;
    items?: SummeryDataPanelItem[];
    minimumAfterLabelSpace?: number;
}>();
const itemLabelRefs = useTemplateRef<HTMLSpanElement[]>('itemLabelRefs');
const itemContextMenusRefs = ref<Record<number, ComponentExposed<typeof ContextMenu>>>({});
/*const maxLabelWidth = ref();
watch(
    itemLabelRefs,
    (refs?: HTMLSpanElement[]) => {
        if (labelWidth ==true && refs) {
            maxLabelWidth.value = Math.max(...refs.map((ref) => ref.offsetWidth)) + minimumAfterLabelSpace;
        }
    },
    {
        immediate: true,
    },
);*/
</script>

<template>
    <div class="summeryDataPanel mx-4 space-y-1">
        <slot name="title">
            <div v-if="title" class="mt-2 !mb-4 text-center text-xl font-bold underline underline-offset-6">
                {{ title }}
            </div>
        </slot>
        <div
            v-for="(item, itemIndex) in items"
            :key="itemIndex"
            :class="[item.hidden ? 'hidden' : '', item.noPrint ? 'print:hidden' : '', item.wrapperClass]"
        >
            <span ref="itemLabelRefs" :class="item.labelClass" :style="{ width: labelWidth + 'px' }">{{ item.label }}: </span>
            <span :class="['font-bold', item.valueClass]" v-html="item.value"></span>
            <Button
                v-if="item.appendButton"
                :icon="item.appendButton.icon ? `${item.appendButton.icon} !min-w-0.5rem` : null"
                size="small"
                text
                class="ms-4 size-6 print:!hidden"
                :severity="item.appendButton.severity"
                :loading="item.appendButton.loading"
                :disabled="item.appendButton.disabled"
                :label="item.appendButton.label"
                :title="item.appendButton.title"
                @click="item.appendButton.onClick"
                @contextmenu="(evt) => (item.appendContextMenu ? itemContextMenusRefs[itemIndex].show(evt) && evt.preventDefault() : null)"
            />
            <ContextMenu
                v-if="item.appendContextMenu"
                :ref="(el) => (itemContextMenusRefs[itemIndex] = el)"
                :model="item.appendContextMenu"
            ></ContextMenu>
        </div>
    </div>
</template>

<style scoped lang="scss">
.summeryDataPanel {
    div {
        span:first-child {
            @apply inline-flex gap-2 pe-2;
            &:after {
                @apply mb-2 flex-grow border-b-1 border-dashed border-b-gray-600/40 dark:border-b-gray-400/40;
                content: '';
            }
        }
    }
}
</style>
