<script setup lang="ts">
defineProps<{
    content: string
}>();
</script>

<script lang="ts">
export default {
    render() {
        console.log(this.$slots)
        return [this.$slots.default()]
    }
}
</script>
