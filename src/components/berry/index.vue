<script lang="ts" setup>

import {getBerryList, type getBerryListData} from "../../api/pokemonApi.ts";

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
  // {
  //   title: 'Img',
  //   key: 'img',
  //   render(row: any) {
  //     return h(
  //         NImage,
  //         {
  //           src: 'https://archives.bulbagarden.net/media/upload/6/61/Bag_' + `${row.name.charAt(0).toUpperCase()}${row.name.slice(1)}` + '_Berry_Sprite.png'
  //         },
  //         {
  //           default: () => row.name
  //         }
  //     )
  //   },
  // },
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
  getBerryList(parameter).then((res) => {
    console.log(res)
    data.value = res.data.results
    pagination.value.itemCount = res.data.count
    console.log(pagination)
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

