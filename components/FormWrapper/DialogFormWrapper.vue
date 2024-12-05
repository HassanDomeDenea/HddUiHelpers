<script setup lang="ts" generic="T extends RecordItem">
import {computed, ref} from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import filter from 'lodash/filter'
import {useToast} from 'primevue/usetoast'
import lodashSet from 'lodash/set'
import unset from 'lodash/unset'
import lodashGet from 'lodash/get'
import FormWrapper from './FormWrapper.vue'
import type {PrimeVueServerTableFormField, RecordItem} from '../primeVueServerTable/types'
import {useI18n} from "vue-i18n";

export interface DialogFormWrapperProps {
    url: string
    keepFormOpenAfterCreate?: boolean
    focusDeleteButton?: boolean
    fields: PrimeVueServerTableFormField[]
    editRecordHeader?: string
    dialogContentStyle?: any
    createRecordHeader?: string
}

const props = withDefaults(defineProps<DialogFormWrapperProps>(), {
    focusDeleteButton: true,
})

const emits = defineEmits<{
    (e: 'submitted', type: 'create' | 'update' | 'delete', row: any)
    (e: 'created', row: any)
    (e: 'updated', row: any)
    (e: 'deleted', ids: (string | number)[] | string | number, type: 'multi' | 'single')
}>()

const {t} = useI18n()
const dialogVisible = ref(false)
const isMultiRecordsForm = ref(false)
const form = defineModel({required: true})
const recordsList = defineModel('recordsList', {required: true})
const formRef = ref()
const toast = useToast()
const inEditForm = computed(() => !!form.value.id)
const formWrapperOptions = computed(() => {
    return {
        inline: true,
        hasMultiRecords: isMultiRecordsForm.value,
        hasResetButton: false,
        // hasResetButton: !inEditForm.value,
        url: props.url,
        fields: inEditForm.value ? filter<PrimeVueServerTableFormField>(props.fields, e => e.editable !== false) : filter<PrimeVueServerTableFormField>(props.fields, e => e.onlyEdit !== true),
        onSubmitted: onFormSubmitted,
    }
})

function create() {
    const tempFormValue = {}

    props.fields.forEach((field) => {
        if (field.default !== undefined) {
            lodashSet(tempFormValue, field.name, typeof field.default === 'function' ? field.default() : field.default)
        }
    })
    form.value = tempFormValue
    dialogVisible.value = true
    isMultiRecordsForm.value = false;
    nextTick(() => {
        setTimeout(() => {
            formRef.value?.focusFirst()
        }, 300)
    })
}

function onFormSubmitted(type: 'create' | 'update', item: any) {
    toast.add({
        severity: 'success',
        summary: type === 'create' ? t('Created!') : t('Updated!'),
        detail: type === 'create' ?
            (isMultiRecordsForm.value ? t('n Record Created Successfully!') : t('Record Created Successfully!')) :
            (isMultiRecordsForm.value ? t('n Record Updated Successfully!') : t('Record Updated Successfully!')),
        life: 3000,
    })
    if (type === 'create') {
        emits('created', item)
    } else {
        emits('updated', item)
    }
    emits('submitted', type, item)
    if (!props.keepFormOpenAfterCreate) {
        setTimeout(() => {
            dialogVisible.value = false
            form.value = {}
        })
    }
}

function edit(item: any) {
    const tempValue = cloneDeep(item)

    filter<PrimeVueServerTableFormField>(props.fields, e => e.editable === false).forEach((field) => {
        unset(tempValue, field.name)
    })
    filter<PrimeVueServerTableFormField>(props.fields, e => e.getter).forEach((field) => {
        lodashSet(tempValue, field.name, typeof field.getter === 'function' ? field.getter(item) : lodashGet(item, field.getter))
    })
    form.value = tempValue
    dialogVisible.value = true
    isMultiRecordsForm.value = false;
    nextTick(() => {
        setTimeout(() => {
            formRef.value?.focusFirst()
        }, 300)
    })
}

function editMulti(items: any[]) {
    const tempValuesList = cloneDeep(items)


    filter<PrimeVueServerTableFormField>(props.fields, e => e.editable === false).forEach((field) => {
        for (let i = 0; i < tempValuesList.length; i++) {
            unset(tempValuesList[i], field.name)
        }
    })
    filter<PrimeVueServerTableFormField>(props.fields, e => e.getter !== undefined && e.multiEditable === true).forEach((field) => {
        for (let i = 0; i < tempValuesList.length; i++) {
            lodashSet(tempValuesList[i], field.name, typeof field.getter === 'function' ? field.getter(tempValuesList[i]) : lodashGet(tempValuesList[i], field.getter))
        }
    })
    form.value = cloneDeep(tempValuesList[0])
    recordsList.value = tempValuesList
    dialogVisible.value = true
    isMultiRecordsForm.value = true;
    nextTick(() => {
        setTimeout(() => {
            formRef.value?.focusFirst()
        }, 300)
    })
}

function onResetButtonClicked() {
    create()
}

const deleteDialogVisible = ref(false)
const deleteConfirmButtonRef = ref()
const deleteCnt = ref(0)
const itemsToDelete = ref<T | T[]>()
const isMultiDelete = ref(false)
const isDeleting = ref(false)
const idsToDelete = ref()

function deleteItem(items: T | T[]) {
    if (!items)
        return

    itemsToDelete.value = items
    if (Array.isArray(items)) {
        isMultiDelete.value = true
        deleteCnt.value = items.length
        idsToDelete.value = items.map(i => i.id)
    } else {
        isMultiDelete.value = false
        deleteCnt.value = 1
        idsToDelete.value = [items.id]
    }
    deleteDialogVisible.value = true
    setTimeout(() => {
        deleteConfirmButtonRef.value.$el.focus()
    })
}

async function onDeleteConfirmation() {
    try {
        isDeleting.value = true
        if (!itemsToDelete.value) {
            return
        }
        const items = itemsToDelete.value
        if (Array.isArray(items))
            await api.delete(props.url)
        else
            await api.delete(`${props.url}/${items.id}`)
        toast.add({
            severity: 'success',
            summary: t('Deleted!'),
            detail: t('n Record Deleted Successfully', {n: deleteCnt.value}, deleteCnt.value),
            life: 3000,
        })
        emits('deleted', idsToDelete.value, isMultiDelete.value ? 'multi' : 'single')
        emits('submitted', 'delete', idsToDelete.value)
        deleteDialogVisible.value = false
    } catch (err: any) {
        const msg = err?.response?.data?.message || t('Error Occurred')
        toast.add({
            severity: 'error',
            summary: msg,
            life: 3000,
            group: 'notifications',
        })
    } finally {
        isDeleting.value = false
    }
}

defineExpose({edit, editMulti, create, deleteItem, form})
</script>

<template>
    <Dialog
        v-model:visible="dialogVisible" modal :close-on-escape="!isDeleting" :closable="!isDeleting"
        :dismissable-mask="!isDeleting" keep-in-viewport
        :content-style="dialogContentStyle"
    >
        <template #header>
            <span v-if="inEditForm">{{ editRecordHeader ?? t("Edit Record") }}</span>
            <span v-else>{{ createRecordHeader ?? t("Create Record") }}</span>
        </template>
        <FormWrapper ref="formRef" v-model="form" v-model:records-list="recordsList" v-bind="formWrapperOptions"
                     @reset="onResetButtonClicked"/>
    </Dialog>
    <Dialog
        v-model:visible="deleteDialogVisible" modal close-on-escape closable dismissable-mask keep-in-viewport
        content-class="min-w-360px"
    >
        <template #header>
            <span>{{ t("Confirmation") }}</span>
        </template>
        <div class="flex items-center gap-2">
            <span class="pi pi-info-circle text-4xl dark:text-red-400 light:text-red-500"/>
            <span class="">{{ t('Are you sure to delete n records?', {n: deleteCnt}, deleteCnt) }}</span>
        </div>
        <template #footer>
            <Button severity="secondary" :label="t('Cancel')" outlined :disabled="isDeleting"
                    @click="deleteDialogVisible = false"/>
            <Button ref="deleteConfirmButtonRef" tabindex="0" severity="danger" :label="t('Delete')"
                    :loading="isDeleting" @click="onDeleteConfirmation"/>
        </template>
    </Dialog>
</template>

<style scoped>

</style>
