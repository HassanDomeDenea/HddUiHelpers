<script setup lang="ts">
import { MessageProps } from 'primevue';

const { severity = 'error', errors } = defineProps<{
  size?: MessageProps['size'];
  severity?: MessageProps['severity'];
  errors?: ({ message: string; } | string)[] | Record<string, string> | Record<string, { message: string }>;
}>();

const formattedErrors = computed(() => {
  const result = [];
  if (errors) {
    if (Array.isArray(errors)) {
      errors.forEach(error => {
        if (typeof error === 'object') {
          result.push(error);
        } else {
          result.push({ message: error });
        }
      });
    } else if (typeof errors === 'object') {
      for (let key in errors) {
        if (Array.isArray(errors[key])) {
          errors[key].forEach(error => {
            if (typeof error === 'object') {
              result.push(error);
            } else {
              result.push({ message: error });
            }
          });
        } else {
          if (typeof errors[key] === 'object') {
            result.push(errors[key]);
          } else {
            result.push({ message: errors[key] });
          }
        }
      }
    }
  }

  return result;
});
</script>

<template>
  <Message
    v-if="errors && Object.keys(errors).length > 0"
    :size="size"
    :severity="severity"
    class="mb-2 mt-1 text-right"
    icon="i-heroicons-exclamation-triangle-20-solid !size-8 !text-4xl"
  >
    <ul class="list-disc ps-4">
      <template v-for="(error,errorIndex) in formattedErrors" :key="errorIndex">
        <li>
          {{ error.message }}
        </li>
      </template>
    </ul>
  </Message>
</template>

<style scoped>

</style>
