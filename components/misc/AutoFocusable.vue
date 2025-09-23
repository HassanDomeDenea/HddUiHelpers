<script setup lang="ts">
const { duration = 0 } = defineProps<{
  /*
   * Duration after which autofocus is fired
   */
  duration?: number;
}>();
const slotRef = useTemplateRef('slotRef');
const slots = useSlots();

onMounted(() => {
  if (slots.default) {
    // console.log(slots.default({setRef}));
    setTimeout(() => {
      focus();
    }, duration);
  } else {
    //console.log('No default slot provided.');
  }
});

function focus() {
  const comp = slotComponentRef.value;
  if (comp) {
    if (comp.focus && comp.focus()) {
      //
    } else if (comp.$el.focus && comp.$el.focus()) {
      //
    } else {
      comp.$el.querySelector('input')?.focus();
    }
  }
}

const slotComponentRef = ref();

function setRef(el: any) {
  slotComponentRef.value = el;
}
</script>

<template>
  <slot :set-ref="setRef"></slot>
</template>

<style scoped></style>
