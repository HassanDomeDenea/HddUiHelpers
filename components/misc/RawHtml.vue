<script setup lang="ts">
defineProps<{
  content: string;
}>();
</script>

<script lang="ts">
export default {
  render() {
    return [this.$slots.default()];
  },
};
</script>
