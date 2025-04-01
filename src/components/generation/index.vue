<script lang="ts" setup>
import {type getGenerationData, getGenerationsPageList} from "@/api/pokemon/generationApi.ts";

const generationData = ref<any>(new Array(9).fill({name: "加载中。。。"}))

onMounted(async () => {
  try {
    getGenerationData()
  } catch (e) {
    console.log(e)
  }
})

function getGenerationData(parameter?: getGenerationData) {
  getGenerationsPageList(parameter).then((res: any) => {
    generationData.value = res.data.results
  })
}

</script>

<template>
  <n-grid :cols="3" x-gap="12" y-gap="12">
    <n-gi v-for="(generation, index) in generationData" :key="index">
      <n-button class="w-full min-h-full" type="info">
        {{ generation.name }}
      </n-button>
    </n-gi>
  </n-grid>
</template>

<style scoped>

</style>
