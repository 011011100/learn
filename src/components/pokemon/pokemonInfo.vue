<script setup lang="ts">

interface Props {
  id: string
}

const props = defineProps<Props>()

</script>

<template>
  {{props.id}}
</template>

<style scoped>

</style>
