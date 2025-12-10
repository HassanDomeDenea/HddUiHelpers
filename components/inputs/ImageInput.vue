<script setup lang="ts">
import { useHddBaseInputUtils } from 'HddUiHelpers/components/inputs/inputsUtils.ts';
import { ref } from 'vue';
import BaseInput from './BaseInput.vue';
import type { BaseInputProps } from './types';

const props = withDefaults(
    defineProps<
        {
            accept?: string;
            previewMaxWidth?: number;
            previewMaxHeight?: number;
            previewMinWidth?: number;
            previewMinHeight?: number;
            clearable?: boolean;
            uploadButtonIcon?: string;
            uploadButtonLabel?: string;
        } & BaseInputProps
    >(),
    {
        accept: 'image/png,image/jpeg,image/jpg,image/svg+xml',
        previewMaxHeight: 120,
        clearable: true,
        previewMaxWidth: 120
    }
);
const emits = defineEmits<{
    change: [event: Event];
    clear: [],
    unclear: [],
}>();
const value = defineModel<any>('modelValue', { default: ref().value });
const currentUrl = defineModel<any>('currentUrl', { default: ref().value });
const { t } = useI18n();
const fileInputRef = useTemplateRef<HTMLInputElement>('fileInputRef');

const dropzoneRef = useTemplateRef('dropzoneRef');
const inputRef = ref();

const { isOverDropZone } = useDropZone(dropzoneRef, {
    onDrop: (files) => {
        if (props.disabled) return;
        value.value = files[0] ?? undefined;
    },
    dataTypes: props.accept.split(','),
    multiple: false,
    preventDefaultForUnhandled: false
});

function focus() {
    inputRef.value.$el.focus();
}

function onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    value.value = target.files[0] ?? undefined;

    target.value = '';
}

const loadedImage = computedAsync(async () => {
    const file = value.value;
    if (file) {
        return URL.createObjectURL(file);
    } else {
        return currentUrl.value;
    }
});

const clear = () => {
    value.value = null
    if(currentUrl.value){
        currentUrl.value = null
    }
}

watch(value, (val) => {
    if (!val) {
        emits('clear')
    }else{
        emits('unclear')
    }
})

const { exposed, baseInputForwardedProps, fieldUniqueId, generalInputProps } = useHddBaseInputUtils(props);

defineExpose({ focus, ...exposed });
</script>

<template>
    <BaseInput v-bind="baseInputForwardedProps">
        <div
            ref="dropzoneRef"
            class="  flex items-center gap-1 w-full "
            :class="{'border-amber border-1 border-dashed rounded-lg bg-amber-100/25 dark:bg-amber-700/45':isOverDropZone && !disabled}">
            <div>
                <input ref="fileInputRef" type="file" :accept="accept" style="display: none" @change="onFileChange" />
                <Button
                    ref="inputRef" :size="size" :label="uploadButtonLabel ?? t('Choose File')"
                    :disabled="disabled"
                    :icon="uploadButtonIcon ?? 'pi pi-upload'" @click="fileInputRef?.click()" />
            </div>
            <template v-if="loadedImage">
                <Image

                    :src="loadedImage"
                    :alt="t('Image not found')"
                    :image-style="{
          minWidth: previewMinWidth + 'px',
          minHeight: previewMinHeight + 'px',
          maxWidth: previewMaxWidth + 'px',
          maxHeight: previewMaxHeight + 'px',
        }"
                    preview
                />
                <Button
                    v-if="clearable"
                    v-tooltip="t('Remove')" size="small" severity="danger" icon="i-ph-trash"
                    @click="clear" />
            </template>
        </div>
    </BaseInput>
</template>

<style scoped></style>
