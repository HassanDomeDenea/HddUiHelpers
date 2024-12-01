<template>
  <div>
    <p>{{ message }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MyComponent',
  props: {
    message: {
      type: String,
      required: true,
    },
  },
});
</script>