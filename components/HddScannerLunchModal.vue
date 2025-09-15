<script setup lang="ts">
import type { DynamicDialogRefInjectionType } from 'HddUiHelpers/components/datatables/ServerDataTableTypes.ts';

const {t} = useI18n()
const dialogRef = inject<DynamicDialogRefInjectionType | null>('dialogRef', null);
const dialogUrl = "https://hdd-clinic.com/hddscanner/HddScannerSetup.exe";
function downloadUrl(){
    window.open(dialogUrl, "_blank");
    dialogRef.value.close();
}
</script>

<template>
    <div class="p-4">
        <div class="flex justify-center items-center py-1">
            <img src="../assets/HddScannerIcon.webp" alt="HDD Scanner" class="size-48">
        </div>
        <Message severity="info" size="large" icon="i-mdi:alert-circle-outline">
            {{t('HDD Scanner is not running or installed. Try to download the following link, install it, run it and try again')}}.
        </Message>
        <div class="flex justify-center items-center pt-4" >
            <Button :label="t('Download Now')" icon="i-mdi:download" severity="info" rounded @click="downloadUrl"></Button>
        </div>
    </div>
</template>

<style scoped>

</style>
