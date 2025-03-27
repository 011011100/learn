<script lang="ts" setup>

import {getBerryList, type getBerryListData} from "@/api/pokemon/berryApi.ts";

const data = ref([])

onMounted(() => {
  getBerryData({limit: 10})
})

const columns = [
  {
    title: 'Name',
    key: 'name',
    render(row:any){
      return `${row.name.charAt(0).toUpperCase()}${row.name.slice(1)}`
    }
  },
  {
    title: 'Url',
    key: 'url'
  }
]

const pagination = ref({
  pageSize: 10,
  itemCount: 0,
})

function getBerryData(parameter: getBerryListData) {
  getBerryList(parameter).then((res:any) => {
    data.value = res.data.results
    pagination.value.itemCount = res.data.count
  })
}

</script>

<template>
  <n-space :size="12" vertical>
    <n-data-table :bordered="false"
                  :columns="columns"
                  :data="data"
                  :pagination="pagination"
                  :single-line="false"/>
  </n-space>
</template>

<style scoped>

</style>

