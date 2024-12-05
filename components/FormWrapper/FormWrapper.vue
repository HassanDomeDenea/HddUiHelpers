<script setup lang="ts">
import lodashGet from 'lodash/get'
import lodashSet from 'lodash/set'
import {ref} from 'vue'
import {useToast} from 'primevue/usetoast'
// import Queue from 'queue-promise'
import debounce from 'lodash/debounce'
import omit from 'lodash/omit'
import isEqual from 'lodash/isEqual'
import SelectInput from '../inputs/SelectInput.vue'
import DatePickerInput from '../inputs/DatePickerInput.vue'
import AutoCompleteInput from '../inputs/AutoCompleteInput.vue'
import NumberInput from '../inputs/NumberInput.vue'
import TextInput from '../inputs/TextInput.vue'
import ToggleSwitchInput from '../inputs/ToggleSwitchInput.vue'
import CheckboxInput from '../inputs/CheckboxInput.vue'
import FormErrors from '../FormWrapper/FormErrors.vue'
import MultiSelectInput from '../inputs/MultiSelectInput.vue'
import PhoneInput from '../inputs/PhoneInput.vue'
import TextAreaInput from '../inputs/TextAreaInput.vue'
import InfiniteSelectInput from '../inputs/InfiniteSelectInput.vue'
import UploadFilesInput from '../inputs/UploadFilesInput.vue'
import {useI18n} from "vue-i18n";
import ListBoxInput from "@/HddUiHelpers/components/inputs/ListBoxInput.vue";
import usePrimeVueServerUi from "@/HddUiHelpers/utils/usePrimeVueServerUi";
import BaseInput from "@/HddUiHelpers/components/inputs/BaseInput.vue";
import {ray} from "vue-ray";
import type {PrimeVueServerTableFormField} from "@/HddUiHelpers/components/primeVueServerTable/types";
import clone from "lodash/clone";
import type {AxiosResponse} from "axios";

export interface FormWrapperProps {
    fields?: PrimeVueServerTableFormField[]
    elementsNameDisablingAutoSave?: string[]
    inline?: boolean
    autoI18nLabelFromName?: boolean
    watchForDirtyKeys?: boolean
    autoSave?: boolean
    autoSaveDelay?: number
    hasResetButton?: boolean
    beforeSubmit?: ((data: any) => boolean | void)
    resetAfterSave?: boolean
    focusFirstOnError?: boolean
    updateModelFromResponse?: boolean
    submitOnEnter?: boolean
    updateIdFromResponse?: boolean
    hasMultiRecords?: boolean
    url: string
    filesFields?: string[]
    createText?: string
    updateText?: string
    resetText?: string
    modifyAjax?: ((params: { [key: string]: any }) => { [key: string]: any }) | { [key: string]: any }
}

const props = withDefaults(defineProps<FormWrapperProps>(), {
    fields: () => [],
    elementsNameDisablingAutoSave: () => [],
    updateIdFromResponse: true,
    resetAfterSave: true,
    autoI18nLabelFromName: true,
    focusFirstOnError: true,
    submitOnEnter: true,
    hasResetButton: true,
    hasMultiRecords: false,
    autoSaveDelay: 700,
})
const emits = defineEmits<{
    (e: 'submitted', type: 'update' | 'create', data: any)
    (e: 'reset')
}>()

const {t} = useI18n()
const submitButtonRef = ref()
const form = defineModel({required: false, default: ref({}).value})
const recordsList = defineModel('recordsList', {required: false, default: ref([]).value})
const initialFormState = ref({});
const dirtyFields = ref({});
const errors = ref({})
const lastErrorMessage = ref()
const showSavedBadge = ref(false)

const isLoading = ref(false)
const wrapperRef = ref()
const toast = useToast()

const multiEditableFields = computed(() => {
    return props.fields.filter(e => e.multiEditable === true).map(e => e.name);
})

const differentValuesFields = computed(() => {
    if (recordsList.value.length === 0) return [];
    const keysToCheck = Object.keys(recordsList.value[0]);
    const differingKeys: string[] = [];
    keysToCheck.forEach(key => {
        const firstValue = recordsList.value[0][key];

        const allSame = recordsList.value.every(record =>
            isEqual(record[key], firstValue)
        );

        if (!allSame) {
            differingKeys.push(key);
        }
    });
    return differingKeys;
})

function restoreFieldDefault(field: PrimeVueServerTableFormField) {

    let value = typeof field.default === 'function' ? field.default() : field.default;
    lodashSet(form.value, field.name, value)
    for (let i = 0; i < recordsList.value.length; i++) {
        lodashSet(recordsList.value[i], field.name, value)
    }
}

function focusFirst() {
    wrapperRef.value?.getElementsByTagName('input')[0]?.focus()
}

function focusSubmit() {
    submitButtonRef.value?.$el.focus()
}

const clearSavedBadgeTimeout = ref()

function clearSavedBadge() {
    if (clearSavedBadgeTimeout.value) {
        clearTimeout(clearSavedBadgeTimeout.value)
    }
    clearSavedBadgeTimeout.value = setTimeout(() => showSavedBadge.value = false, 750)
}

const isChanged = ref(false)

const {axios: api,} = usePrimeVueServerUi()

async function submit(): Promise<void> {
    if (isLoading.value)
        return
    isLoading.value = true
    errors.value = {}
    let request: Promise<AxiosResponse>
    let payload: object;
    if (props.hasMultiRecords) {
        payload = [...recordsList.value]
        for (let fieldName in dirtyFields.value) {
            if (dirtyFields.value[fieldName]) {
                let modifiedValue = lodashGet(form.value, fieldName);
                payload = recordsList.value.map(record => {
                    lodashSet(record, fieldName, modifiedValue)
                    return record;
                });
            }
        }
        if (props.modifyAjax && (typeof props.modifyAjax === 'function' || Object.keys(props.modifyAjax).length > 0)) {
            payload = recordsList.value.map(record => {
                if (typeof props.modifyAjax === 'function') {
                    props.modifyAjax(record)
                } else {
                    for (const key in props.modifyAjax) {
                        record[key] = props.modifyAjax[key]
                    }
                }
                return record;
            })
        }
    } else {
        payload = {...form.value}
        if (typeof props.modifyAjax === 'function') {
            props.modifyAjax(payload)
        } else {
            for (const key in props.modifyAjax) {
                payload[key] = props.modifyAjax[key]
            }
        }
    }
    if (props.filesFields?.length > 0) {
        const serializedPayload = JSON.stringify(omit(payload, props.filesFields.map(e => `${e}_files`)))
        const _formData = new FormData()
        _formData.append('_serialized_data', serializedPayload)
        _formData.append('_method', form.value.id ? 'PUT' : 'POST')
        props.filesFields.forEach((fieldName) => {
            const multiFilesFieldName = `${fieldName}_files`
            if (Array.isArray(payload[multiFilesFieldName])) {
                for (let i = 0; i < payload[multiFilesFieldName].length; i++) {
                    if (payload[multiFilesFieldName][i] instanceof File) {
                        _formData.append(`${multiFilesFieldName}[${i}]`, payload[multiFilesFieldName][i])
                    }
                }
            } else {
                const singleFileFieldName = `${fieldName}_file`
                if (payload[singleFileFieldName] instanceof File) {
                    _formData.append(singleFileFieldName, payload[fieldName])
                }
            }
        })
        request = api.post(
            form.value.id ? `${props.url}/${form.value.id}` : props.url,
            _formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        )
    } else {
        if (props.hasMultiRecords) {
            if (form.value.id) {
                request = api.put(`${props.url}`, {
                    data: payload
                })
            } else {
                request = api.post(`${props.url}/many`, {
                    data: payload
                })
            }
        } else {
            if (form.value.id) {
                request = api.put(`${props.url}/${form.value.id}`, payload)
            } else {
                request = api.post(props.url, payload)
            }
        }
    }

    return request.then((res) => {
        emits('submitted', form.value.id ? 'update' : 'create', res.data.data)
        showSavedBadge.value = true
        clearSavedBadge()
        isChanged.value = false
        if (!props.autoSave && props.resetAfterSave) {
            reset()
            nextTick(focusFirst)
        } else {
            if (props.updateIdFromResponse) {
                const id = res.data.data?.id
                if (id && !form.value.id) {
                    form.value.id = id
                }
            }
            if (props.updateModelFromResponse) {
                form.value = res.data.data
            }
        }
    })
        .catch((err) => {
            errors.value = err.response?.data?.errors || {}
            lastErrorMessage.value = err.response?.data?.message || t('Error Occurred')
            if (Object.keys(errors.value).length === 0) {
                errors.value = {
                    '': [lastErrorMessage.value]
                }
            }
            // console.log(lastErrorMessage.value)
            toast.add({
                severity: 'error',
                summary: lastErrorMessage.value,
                life: 3000,
                group: 'notifications',
            })
            // console.error(err)
            if (props.focusFirstOnError) {
                focusFirst()
            }
        })
        .finally(() => {
            isLoading.value = false
        })
}

const inEditMode = computed(() => !!form.value.id)
const isInline = ref(true)

function reset() {
    emits('reset')
    isChanged.value = false
}

/* const queue = new Queue({
  concurrent: 1,
  interval: 10,
  start: true,
}) */
const confirmChangesAfterDebounce = ref<() => void>()

onMounted(() => {
    resetStates();
    confirmChangesAfterDebounce.value = debounce((ignoreActiveElement: boolean | any = false) => {
        if (isChanged.value) {
            if (props.autoSave) {
                if (ignoreActiveElement === true) { /* empty */
                } else if (document.activeElement && 'name' in document.activeElement && props.elementsNameDisablingAutoSave.includes(document.activeElement.name)) {
                    return
                }
                submit()
            }
        }
    }, props.autoSaveDelay)
})
watch(form, (newForm) => {
    isChanged.value = true
    confirmChangesAfterDebounce.value?.()
    if (props.watchForDirtyKeys) {
        props.fields.forEach((field) => {
            dirtyFields.value[field.name] = !isEqual(lodashGet(newForm, field.name), initialFormState.value[field.name]);
        })
    }
    if (props.hasMultiRecords) {
        props.fields.forEach((field) => {
            if (multiEditableFields.value.includes(field.name) && !dirtyFields.value[field.name]) {
                dirtyFields.value[field.name] = !isEqual(lodashGet(newForm, field.name), initialFormState.value[field.name]);
            }
        })
    }
}, {
    deep: true,
})

function clearChanges() {
    isChanged.value = false
}

function resetStates() {
    dirtyFields.value = {};
    initializeFormState()
}

function initializeFormState() {
    let newState = {};
    props.fields.forEach((field) => {
        newState[field.name] = lodashGet(form.value, field.name)
    });
    initialFormState.value = clone(newState);
}

function onFieldEnterKeyPressed() {
    if (props.submitOnEnter) {
        submit()
    }
}

function getFieldOptions(field) {

}

const inputsRef = ref()

function getFieldRef(fieldName: string) {
    const index = props.fields.findIndex(e => e.name === fieldName)
    return inputsRef.value[index]
}

defineExpose({
    resetStates,
    focusFirst,
    inEditMode,
    focusSubmit,
    clearChanges,
    confirmChangesAfterDebounce,
    submit,
    inputsRef,
    getFieldRef
})
</script>

<template>
    <div>
        <div class="mb-4">
            <FormErrors :errors="errors"/>
        </div>
        <!--        <pre>{{ dirtyFields }}</pre>-->
        <!--        <pre>{{ initialFormState }}</pre>-->
        <!--        <pre>{{ recordsList }}</pre>-->
        <div ref="wrapperRef" class="space-y-4" :class="{ '[&_.form-control-label-selector]:w-[150px]': isInline }">
            <template v-for="field in fields" :key="field.name">
                <template v-if="hasMultiRecords && !multiEditableFields.includes(field.name)">
                    <BaseInput :label="field.label ?? (autoI18nLabelFromName ? t(field.name) : field.name)"
                               :inline="isInline">
                        <Message severity="secondary" variant="simple" size="small">
                            {{ t('Unavailable in multi edit') }}
                        </Message>
                    </BaseInput>
                </template>
                <template v-else-if="hasMultiRecords && differentValuesFields.includes(field.name)">
                    <BaseInput :label="field.label ?? (autoI18nLabelFromName ? t(field.name) : field.name)"
                               :inline="isInline">
                        <Message severity="secondary" variant="simple" size="small">
                            {{ t('Different Values') }}
                            <Button size="small" variant="text" raised icon="pi pi-pencil" severity="warn"
                                    v-tooltip="$t('Edit All')" @click="restoreFieldDefault(field)"></Button>
                        </Message>
                    </BaseInput>
                </template>
                <template v-else-if="field.visible !== false">
                    <template v-if="field.type === 'custom'">
                        <template v-if="field.namedModel">
                            <template v-if="field.entireFormAsModel">
                                <component
                                    :is="field.component"
                                    ref="inputsRef"
                                    v-model:[field.modelName]="form" :disabled="field.disabled"
                                    v-bind="field.binds ?? {}"
                                    :inline="isInline"
                                    @keydown.enter="field.noSubmitOnEnter ? undefined : onFieldEnterKeyPressed"
                                />
                            </template>
                            <template v-else>
                                <component
                                    :is="field.component"
                                    ref="inputsRef"
                                    v-model:[field.modelName]="form[field.modelValue]" :disabled="field.disabled"
                                    v-bind="field.binds ?? {}"
                                    :inline="isInline"
                                    @keydown.enter="field.noSubmitOnEnter ? undefined : onFieldEnterKeyPressed"
                                />
                            </template>
                        </template>
                        <template v-else-if="field.modelValue?.indexOf('.') > -1">
                            <component
                                :is="field.component"
                                ref="inputsRef"
                                :disabled="field.disabled" :model-value="lodashGet(form, field.modelValue)"
                                v-bind="field.binds ?? {}"
                                :inline="isInline"
                                @keydown.enter="field.noSubmitOnEnter ? undefined : onFieldEnterKeyPressed"
                                @update:model-value="lodashSet(form, field.modelValue, $event)"
                            />
                        </template>
                        <template v-else-if="field.entireFormAsModel">
                            <component
                                :is="field.component"
                                ref="inputsRef"
                                v-bind="field.binds ?? {}" v-model="form"
                                :disabled="field.disabled"
                                :inline="isInline"
                                @keydown.enter="field.noSubmitOnEnter ? undefined : onFieldEnterKeyPressed"
                            />
                        </template>
                        <template v-else>
                            <component
                                :is="field.component"
                                ref="inputsRef"
                                v-bind="field.binds ?? {}" v-model="form[field.name]"
                                :disabled="field.disabled"
                                :inline="isInline"
                                @keydown.enter="field.noSubmitOnEnter ? undefined : onFieldEnterKeyPressed"
                            />
                        </template>
                    </template>
                    <template v-else-if="field.type === 'select'">
                        <SelectInput
                            ref="inputsRef"
                            v-model="form[field.name]"
                            :data-field_name="field.name"
                            v-bind="field.binds ?? {}"
                            :placeholder="field.placeholder"
                            :disabled="field.disabled" :icon="field.icon"
                            :label="field.label ?? (autoI18nLabelFromName ? t(field.name) : field.name)"
                            :options="typeof field.options === 'function' ? field.options(form) : field.options ?? []"
                            :inline="isInline"
                            @keydown.enter="field.noSubmitOnEnter ? undefined : onFieldEnterKeyPressed"
                        />
                    </template>
                    <template v-else-if="field.type === 'multiselect'">
                        <MultiSelectInput
                            ref="inputsRef"
                            v-model="form[field.name]"
                            :data-field_name="field.name"
                            v-bind="field.binds ?? {}"
                            :disabled="field.disabled" :icon="field.icon"
                            :label="field.label ?? (autoI18nLabelFromName ? t(field.name) : field.name)"
                            :options="typeof field.options === 'function' ? field.options(form) : field.options ?? []"
                            :inline="isInline"
                            @keydown.enter="field.noSubmitOnEnter ? undefined : onFieldEnterKeyPressed"
                        />
                    </template>
                    <template v-else-if="field.type === 'listbox'">
                        <ListBoxInput
                            ref="inputsRef"
                            v-model="form[field.name]"
                            v-bind="field.binds ?? {}"
                            :disabled="field.disabled" :icon="field.icon"
                            :label="field.label ?? (autoI18nLabelFromName ? t(field.name) : field.name)"
                            :options="typeof field.options === 'function' ? field.options(form) : field.options ?? []"
                            :inline="isInline"
                            @keydown.enter="field.noSubmitOnEnter ? undefined : onFieldEnterKeyPressed"
                        />
                    </template>
                    <template v-else-if="field.type === 'autocomplete'">
                        <AutoCompleteInput
                            v-if="field.binds?.useIdModal"
                            ref="inputsRef"
                            v-model:id="form[field.name]"
                            :data-field_name="field.name"
                            :disabled="field.disabled"
                            :inline="isInline" :icon="field.icon"
                            :label="field.label ?? (autoI18nLabelFromName ? t(field.name) : field.name)"
                            :url="field.url ?? ''"
                            v-bind="field.binds ?? {}"
                            @keydown.enter="field.noSubmitOnEnter ? undefined : onFieldEnterKeyPressed"
                        />
                        <AutoCompleteInput
                            v-else
                            ref="inputsRef"
                            v-model="form[field.name]"
                            :data-field_name="field.name"
                            :disabled="field.disabled"
                            :inline="isInline" :icon="field.icon"
                            :label="field.label ?? (autoI18nLabelFromName ? t(field.name) : field.name)"
                            :url="field.url ?? ''"
                            v-bind="field.binds ?? {}"
                            @keydown.enter="field.noSubmitOnEnter ? undefined : onFieldEnterKeyPressed"
                        />
                    </template>
                    <template v-else-if="field.type === 'server_select'">
                        <InfiniteSelectInput
                            ref="inputsRef"
                            v-model="form[field.name]"
                            :data-field_name="field.name"
                            :disabled="field.disabled"
                            :inline="isInline" :icon="field.icon"
                            :label="field.label ?? (autoI18nLabelFromName ? t(field.name) : field.name)"
                            :url="field.url ?? ''"
                            v-bind="field.binds ?? {}"
                            @keydown.enter="field.noSubmitOnEnter ? undefined : onFieldEnterKeyPressed"
                        />
                    </template>
                    <template v-else-if="field.type === 'image'">
                        <UploadFilesInput
                            ref="inputsRef"
                            v-model:new-files="form[`${field.name}_files`]"
                            v-model:old-files="form[field.name]"
                            v-model:to-be-modified-files="form[`${field.name}_files_modifications`]"
                            accept-images
                            :disabled="field.disabled"
                            :inline="isInline"
                            :icon="field.icon"
                            :label="field.label ?? (autoI18nLabelFromName ? t(field.name) : field.name)"
                            v-bind="field.binds ?? {}"
                            @keydown.enter="field.noSubmitOnEnter ? undefined : onFieldEnterKeyPressed"
                        />
                    </template>
                    <template v-else-if="field.type === 'date'">
                        <DatePickerInput
                            ref="inputsRef"
                            v-model="form[field.name]"
                            :data-field_name="field.name" :disabled="field.disabled" :inline="isInline"
                            :icon="field.icon"
                            v-bind="field.binds ?? {}"
                            :label="field.label ?? (autoI18nLabelFromName ? t(field.name) : field.name)"
                            @keydown.enter="field.noSubmitOnEnter ? undefined : onFieldEnterKeyPressed"
                        />
                    </template>
                    <template v-else-if="field.type === 'number'">
                        <NumberInput
                            ref="inputsRef"
                            v-model="form[field.name]"
                            :data-field_name="field.name"
                            :readonly="field.readonly" :disabled="field.disabled" :inline="isInline" :icon="field.icon"
                            :label="field.label ?? (autoI18nLabelFromName ? t(field.name) : field.name)"
                            v-bind="field.binds ?? {}"
                            @keydown.enter="field.noSubmitOnEnter ? undefined : onFieldEnterKeyPressed"
                        />
                    </template>
                    <template v-else-if="field.type === 'phone'">
                        <PhoneInput
                            ref="inputsRef"
                            v-model="form[field.name]"
                            :data-field_name="field.name"
                            :readonly="field.readonly"
                            :disabled="field.disabled" :inline="isInline" :icon="field.icon"
                            :label="field.label ?? (autoI18nLabelFromName ? t(field.name) : field.name)"
                            v-bind="field.binds ?? {}"
                            @keydown.enter="field.noSubmitOnEnter ? undefined : onFieldEnterKeyPressed"
                        />
                    </template>
                    <template v-else-if="field.type === 'switch'">
                        <ToggleSwitchInput
                            ref="inputsRef"
                            v-model="form[field.name]"
                            :data-field_name="field.name"
                            :readonly="field.readonly" :disabled="field.disabled" :inline="isInline" :icon="field.icon"
                            :label="field.label ?? (autoI18nLabelFromName ? t(field.name) : field.name)"
                            v-bind="field.binds ?? {}"
                            @keydown.enter="field.noSubmitOnEnter ? undefined : onFieldEnterKeyPressed"
                        />
                    </template>
                    <template v-else-if="field.type === 'checkbox'">
                        <CheckboxInput
                            ref="inputsRef"
                            v-model="form[field.name]"
                            :data-field_name="field.name"
                            :readonly="field.readonly"
                            :disabled="field.disabled" :inline="isInline" :icon="field.icon"
                            :label="field.label ?? (autoI18nLabelFromName ? t(field.name) : field.name)"
                            v-bind="field.binds ?? {}"
                            @keydown.enter="field.noSubmitOnEnter ? undefined : onFieldEnterKeyPressed"
                        />
                    </template>
                    <template v-else-if="field.type === 'textarea'">
                        <TextAreaInput
                            ref="inputsRef"
                            :data-field_name="field.name"
                            :model-value="lodashGet(form, field.name)"
                            :disabled="field.disabled"
                            :inline="isInline"
                            :icon="field.icon"
                            :label="field.label ?? (autoI18nLabelFromName ? t(field.name) : field.name)"
                            v-bind="field.binds ?? {}"
                            @keydown.ctrl.enter="field.noSubmitOnEnter ? undefined : onFieldEnterKeyPressed"
                            @update:model-value="lodashSet(form, field.name, $event)"
                        />
                    </template>
                    <template v-else>
                        <TextInput
                            ref="inputsRef"
                            :data-field_name="field.name"
                            :model-value="lodashGet(form, field.name)"
                            :disabled="field.disabled"
                            :inline="isInline"
                            :icon="field.icon"
                            :label="field.label ?? (autoI18nLabelFromName ? t(field.name) : field.name)"
                            v-bind="field.binds ?? {}"
                            @keydown.enter="field.noSubmitOnEnter ? undefined : onFieldEnterKeyPressed"
                            @update:model-value="lodashSet(form, field.name, $event)"
                        />
                    </template>
                </template>
            </template>
        </div>
        <div class="mt-4 flex justify-between">
            <Button
                v-if="hasResetButton"
                :disabled="isLoading"
                size="small" severity="danger" icon="i-mdi-minus" :label="resetText ?? t('Reset Fields')"
                @click="reset()"
            />
            <div v-else/>
            <div class="focusableButtons">
                <slot name="submitButton" :in-edit-mode="inEditMode" :submit-button-ref="submitButtonRef"
                      :auto-save="autoSave" :is-loading="isLoading" :submit="submit" :create-text="createText"
                      :update-text="updateText">
                    <Button
                        v-if="!inEditMode && !autoSave"
                        ref="submitButtonRef"
                        :disabled="isLoading" class="outline-[1px]" icon="i-mdi-check" severity="primary"
                        :label="createText ?? t('Create')"
                        @click="submit"
                    />
                    <Button
                        v-if="inEditMode && !autoSave"
                        ref="submitButtonRef"
                        :disabled="isLoading" icon="i-mdi-plus" severity="primary" :label="updateText ?? t('Update')"
                        @click="submit"
                    />
                </slot>

                <template v-if="autoSave">
                    <ProgressSpinner v-if="isLoading" class="size-6" stroke-width="8"/>
                    <Badge v-if="isChanged" v-tooltip="t('Waiting Saving')" severity="warn" value="..."/>
                    <Badge v-if="showSavedBadge" class="animated animated-fade-in animated-faster">
                        {{ t("Saved") }}!
                    </Badge>
                </template>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.focusableButtons {
    .p-button-success:focus {
        outline-color: var(--p-button-success-focus-ring-color);
        box-shadow: var(--p-button-success-focus-ring-shadow);
    }

    .p-button:focus {
        box-shadow: var(--p-button-primary-focus-ring-shadow);
        outline: var(--p-button-focus-ring-width) var(--p-button-focus-ring-style) var(--p-button-primary-focus-ring-color);
        outline-offset: var(--p-button-focus-ring-offset);
    }
}
</style>
