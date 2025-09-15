<script setup lang="ts">
import reduce from 'lodash/reduce'
import BaseInput from './BaseInput.vue'
import type {BaseInputProps} from './types'
import {rotateImageFile} from '../../utils/filesManipulations'
import type { ComponentExposed } from 'vue-component-type-helpers';
import { useHddBaseInputUtils } from 'HddUiHelpers/components/inputs/inputsUtils.ts';

const props = withDefaults(defineProps<{
    accept?: string
    clearable?: boolean
    uploadFromScanner?: boolean
    acceptImages?: boolean
    showUploadButtonsWhenFileSelected?: boolean
} & BaseInputProps>(), {
    uploadFromScanner: true,
    clearable: true,
    showUploadButtonsWhenFileSelected: true,
    acceptImages: true,
})

const emits = defineEmits<{
    fileSelected: []
}>()

interface MediaFileModelType {
    name: string
    size: number
    mime_type: string
    original_url: string
    thumb_url?: string
    id: string
}

interface FileModifyType {
    rotate?: number
    crop?: { w: number, h: number, x: number, y: number }
    notes?: string
    newOrder?: number
    remove?: boolean
}

const newFiles = defineModel<File[]>('newFiles', {default: ref([]).value})
const oldFiles = defineModel<MediaFileModelType[]>('oldFiles', {default: ref([]).value})
const toBeRemovedFiles = defineModel<string[]>('toBeRemovedFiles', {default: ref([]).value})
const toBeModifiedFiles = defineModel<{ [p: string]: FileModifyType }>('toBeModifiedFiles', {default: ref({}).value})

const fileInputRef = templateRef<HTMLInputElement>('fileInputRef')
const buttonRef = templateRef<Component>('buttonRef')
const newFilesImageRefs = ref({})
const oldFilesImageRefs = ref({})
const {t} = useI18n()

function focus() {
    buttonRef.value?.$el.focus()
}

function onButtonClick() {
    fileInputRef.value?.click()
}

function onFileSelection() {
    if (!newFiles.value) {
        newFiles.value = Object.values(fileInputRef.value.files || [])
    } else {
        newFiles.value = Object.values(fileInputRef.value.files || [])
        // newFiles.value.push(...Object.values(fileInputRef.value.files || []))
    }
    fileInputRef.value.value = ''
}

function fileToObjectUrl(file: File) {
    return URL.createObjectURL(file)
}

function getImageSrc(file: ModelValueFileType) {
    if (isMedialFileModelType(file)) {
        return file.path
    } else {
        return URL.createObjectURL(file)
    }
}

function removeFile(fileIndex: number) {
    newFiles.value.splice(fileIndex, 1)
}

const filesToAccept = computed(() => {
    return props.accept ?? props.acceptImages ? ('image/png,image/jpeg') : undefined
})

function markOldFileToBeRemoved(id, remove = true) {
    if (remove) {
        if (!toBeModifiedFiles.value) {
            toBeModifiedFiles.value = {}
        }
        if (!toBeModifiedFiles.value[id]) {
            toBeModifiedFiles.value[id] = {}
        }
        toBeModifiedFiles.value[id].remove = true
    } else {
        if (!toBeModifiedFiles.value) {
            toBeModifiedFiles.value = {}
        }
        if (!toBeModifiedFiles.value[id]) {
            toBeModifiedFiles.value[id] = {}
        }
        toBeModifiedFiles.value[id].remove = false
    }
}

const oldFilesToBeRemovedStatus = computed(() => {
    return reduce<string, { [name: string]: boolean }>(toBeModifiedFiles.value || {}, (accumulator: {
        [name: string]: boolean
    }, modifyType: FileModifyType, id: string) => {
        if (modifyType.remove) {
            accumulator[id] = true
        }
        return accumulator
    }, {}) as { [p: string]: boolean }
})

function onOldImageThumbClick(image: MediaFileModelType, imageIndex: number) {
    if (oldFilesImageRefs.value && oldFilesImageRefs.value[imageIndex]) {
        if (toBeModifiedFiles.value && toBeModifiedFiles.value[image.id]) {
            oldFilesImageRefs.value[imageIndex].rotate = toBeModifiedFiles.value[image.id].rotate || 0
        }
    }
}

function onOldImageRotate(image: MediaFileModelType, direction: 'left' | 'right') {
    if (!toBeModifiedFiles.value) {
        toBeModifiedFiles.value = {}
    }
    if (!toBeModifiedFiles.value[image.id]) {
        toBeModifiedFiles.value[image.id] = {}
    }
    if (!toBeModifiedFiles.value[image.id].rotate) {
        toBeModifiedFiles.value[image.id].rotate = 0
    }
    toBeModifiedFiles.value[image.id].rotate += direction === 'left' ? -90 : +90
    if (toBeModifiedFiles.value[image.id].rotate >= 360) {
        toBeModifiedFiles.value[image.id].rotate = toBeModifiedFiles.value[image.id].rotate % 360
    }
}

const currentNewImageRotate = ref(0)

function onNewImageRotate(imageIndex: number, direction: 'left' | 'right', autoSubmit: boolean = false) {
    currentNewImageRotate.value += direction === 'left' ? -90 : +90
    if (currentNewImageRotate.value >= 360) {
        currentNewImageRotate.value = currentNewImageRotate.value % 360
    }

    if (autoSubmit) {
        onNewImagePreviewHide(imageIndex)
    }
}

async function onNewImagePreviewHide(imageIndex: number) {
    if (currentNewImageRotate.value !== 0) {
        newFiles.value[imageIndex] = await rotateImageFile(newFiles.value[imageIndex], currentNewImageRotate.value)
    }
    currentNewImageRotate.value = 0
}
const {exposed,baseInputForwardedProps,fieldUniqueId,generalInputProps} = useHddBaseInputUtils(props);

defineExpose({focus,...exposed})
</script>

<template>
    <BaseInput v-bind="baseInputForwardedProps"  @click="focus">
        <template #labelText>
            <slot name="label-text"/>
        </template>
        <template v-if="$slots.addon" #addon>
            <slot name="addon"/>
        </template>
        <template v-if="$slots.helper" #helper>
            <slot name="helper"/>
        </template>
        <div>
            <input
                :id="fieldUniqueId" ref="fileInputRef"
:name="generalInputProps.name" type="file" hidden :accept="filesToAccept" :multiple="true"
                   @change="onFileSelection">
            <div v-if="oldFiles?.length && newFiles?.length" class="font-bold mb-1">
                {{ t("New Files") }}:
            </div>
            <div class="flex items-center gap-2">
                <div>
                    <template v-if="!newFiles?.length">
                        <span v-if="!oldFiles?.length" class=" italic">{{ t("No File Selected") }}</span>
                    </template>
                    <template v-else>
                        <div class="flex flex-wrap gap-4 items-start">
                            <template v-for="(item, itemIndex) in newFiles" :key="itemIndex">
                                <div class="flex gap-1 items-start">
                                    <Image
                                        :src="fileToObjectUrl(item)" :alt="item.name" preview
                                        :pt="{
                      rotateLeftButton: {
                        onClick: () => onNewImageRotate(itemIndex, 'left'),
                      },
                      rotateRightButton: {
                        onClick: () => onNewImageRotate(itemIndex, 'right'),
                      },
                    }"
                                        @hide="onNewImagePreviewHide(itemIndex)"
                                    >
                                        <template #image>
                                            <img
                                                :src="fileToObjectUrl(item)" :alt="item.name"
                                                class="max-h-60px max-w-60px"
                                            >
                                        </template>
                                    </Image>
                                    <div class="flex flex-col gap-1">
                                        <Button
                                            v-if="clearable"
                                            v-tooltip="t('Remove Selection')"
                                            text icon="pi pi-times" severity="danger" class="p-button-xs"
                                            @click="removeFile(itemIndex)"
                                        />
                                        <Button
                                            v-tooltip="t('Rotate Image')"
                                            text icon="pi pi-refresh" severity="info" class="p-button-xs"
                                            @click="onNewImageRotate(itemIndex, 'right', true)"
                                        />
                                    </div>
                                </div>
                            </template>
                        </div>
                    </template>
                </div>
                <template v-if="!newFiles?.length || showUploadButtonsWhenFileSelected">
                    <div>
                        <Button
                            ref="buttonRef"
                            v-tooltip="!newFiles?.length ? t('Choose Image') : t('Choose another image')"
                            icon="pi pi-upload" severity="info" size="small" @click="onButtonClick"
                        />
                    </div>
                    <div>
                        <Button
                            v-tooltip="t('Use Scanner')" icon="i-mdi-scanner" severity="warn" size="small"
                            @click="onButtonClick"
                        />
                    </div>
                </template>
            </div>

            <template v-if="oldFiles && oldFiles.length > 0">
                <div>
                    <div class="font-bold" :class="{ 'mt-2': newFiles?.length }">
                        {{ t("Current Files") }}:
                    </div>
                    <div class="flex flex-wrap gap-4 items-start">
                        <template v-for="(item, itemIndex) in oldFiles" :key="itemIndex">
                            <div class="flex gap-1 items-start">
                                <div class="relative">
                                    <div
v-if="oldFilesToBeRemovedStatus[item.id]"
                                         class="absolute inset-0 z-1 flex items-center justify-center pointer-events-none">
                                        <div
                                            class="size-40px bg-white/50 rounded-lg p-2 flex items-center justify-center">
                                            <i
                                                class="i-pepicons-print-times-off text-4xl font-bold dark:text-red-400/75 light:text-red-800/75"
                                            />
                                        </div>
                                    </div>

                                    <Image
                                        ref="oldFilesImageRefs"
                                        v-tooltip="oldFilesToBeRemovedStatus[item.id] ? t('Will be deleted') : undefined"
                                        :src="item.original_url" :alt="item.name" preview
                                        :preview-button-props="{ onClick: () => onOldImageThumbClick(item, itemIndex) }"
                                        :pt="{
                      rotateLeftButton: {
                        onClick: () => onOldImageRotate(item, 'left'),
                      },
                      rotateRightButton: {
                        onClick: () => onOldImageRotate(item, 'right'),
                      },
                    }"
                                    >
                                        <template #image>
                                            <img
                                                :src="item.thumb_url" :alt="item.name" class="max-h-60px max-w-60px"
                                                :style="toBeModifiedFiles?.[item.id]?.rotate ? { transform: `rotate(${toBeModifiedFiles[item.id].rotate}deg)` } : undefined"
                                            >
                                        </template>
                                    </Image>
                                </div>
                                <div class="flex flex-col gap-1">
                                    <template v-if="clearable">
                                        <Button
                                            v-if="oldFilesToBeRemovedStatus[item.id]"
                                            v-tooltip="t('Restore File')"
                                            text icon="pi pi-history" severity="danger" class="p-button-xs"
                                            @click="markOldFileToBeRemoved(item.id, false)"
                                        />
                                        <Button
                                            v-else
                                            v-tooltip="t('Remove File')"
                                            text icon="pi pi-times" severity="danger" class="p-button-xs"
                                            @click="markOldFileToBeRemoved(item.id)"
                                        />
                                    </template>
                                    <Button
                                        v-tooltip="t('Rotate Image')"
                                        text icon="pi pi-refresh" severity="info" class="p-button-xs"
                                        @click="onOldImageRotate(item, 'right')"
                                    />
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </template>
        </div>
    </BaseInput>
</template>

<style scoped>

</style>
