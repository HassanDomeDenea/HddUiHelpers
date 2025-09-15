<script setup lang="ts">
import type {
	ServerDataTableColumn,
	ServerDataTableColumnType,
} from "HddUiHelpers/components/datatables/ServerDataTableTypes.ts";
import type { HddFormField } from "HddUiHelpers/components/FormWrapper/types.ts";
import { useLoader } from "HddUiHelpers/composables/loader.ts";
import { set, startCase } from "lodash-es";
import get from "lodash-es/get";
import TextInput from "HddUiHelpers/components/inputs/TextInput.vue";
import CheckboxInput from "HddUiHelpers/components/inputs/CheckboxInput.vue";

const { type, row, field, column, fieldName, submitCallback } = defineProps<{
	row: any;
	fieldName: string;
	type: ServerDataTableColumnType;
	field?: HddFormField;
	column: ServerDataTableColumn;
	submitCallback?: any;
	size?: any;
}>();

const { t } = useI18n();

const { startLoading, isLoading } = useLoader();

const computedType = computed(() => type ?? "text");

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
</script>

<template>
    <template v-if="computedType === 'text'">
        <TextInput
            v-model="computedModal"
            :size="size"
            :disabled="isLoading"
            @keydown.enter="startLoading"
        />
    </template>
    <template v-if="computedType === 'boolean'">
        <div class="flex gap-2 items-center">
            <span>{{computedLabel }}</span>
            <CheckboxInput
                v-model="computedModal"
                :size="size"
                :disabled="isLoading"
                @change="submit"
            />
        </div>
    </template>
</template>

<style scoped></style>
