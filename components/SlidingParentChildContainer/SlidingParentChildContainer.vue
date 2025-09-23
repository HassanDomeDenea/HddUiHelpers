<script setup lang="ts">
const { withBackButton = true } = defineProps<{
  withBackButton?: boolean;
  backButtonLabel?: string;
}>();
const emits = defineEmits<{
  back: [];
}>();
const selectedChild = defineModel<any>({ required: false });

function backToParent() {
  selectedChild.value = undefined;
  emits('back');
}
defineExpose({
  backToParent,
  selectedChild,
});
</script>
<template>
  <div>
    <div v-if="selectedChild" key="listItems" class="animate-slide-in-down animate-duration-75 animate-count-1">
      <div v-if="withBackButton" class="mb-1 flex justify-end">
        <Button
          size="small"
          icon="i-material-symbols:arrow-upward-alt-rounded"
          severity="info"
          :label="backButtonLabel"
          @click="backToParent"
        ></Button>
      </div>
      <slot name="child"></slot>
    </div>
    <div v-show="!selectedChild" key="lists" class="animate-slide-in-up animate-duration-75 animate-count-1">
      <slot name="parent"></slot>
    </div>
  </div>
</template>

<style scoped></style>
