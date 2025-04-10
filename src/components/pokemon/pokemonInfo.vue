<script lang="ts" setup>

import {getPokemonInfo} from "@/api/pokemon/pokemonApi.ts";

interface Props {
  id: string
}

const props = defineProps<Props>()

const data = ref<any>()

onMounted(() => {
  getPokemonInfo(props.id).then((res: any) => {
    data.value = res.data
  })
})

</script>

<template>
  <n-space>
    {{ props.id }}
    {{ data }}
  </n-space>
</template>

<style scoped>

</style>
