<script lang="ts" setup>
import {getGenerationsInfo} from "@/api/pokemon/generationApi.ts";

const props = defineProps<{
  index: number
}>()

const data = ref<any>()

onMounted(() => {
  getGenerationsInfo(props.index).then((res: any) => {
    data.value = res.data
  })
})
</script>

<template>
  {{ data }}
</template>

<style scoped>

</style>
