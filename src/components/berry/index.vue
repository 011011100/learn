<script lang="ts" setup>
import {getBerryList, type getBerryListData} from "@/api/pokemon/berryApi.ts";
import request from "@/util/request.ts";
import divNPopover from "@/components/popover/divNPopover.ts";
import {NButton} from "naive-ui";

const data = ref<any>([])

const queryPageData = ref({
  limit: 10,
  offset: 0
})

const pagination = ref({
  page: 1,
  pageSize: 10,
  itemCount: 0,
  pageCount: 1
})

const columns = [
  {
    title: '名称',
    key: 'name',
    align: 'center',
    render(row: any) {
      return `${row.name.charAt(0).toUpperCase()}${row.name.slice(1)}`
    }
  },
  {
    title() {
      return h(
          divNPopover,
          {
            content: "尺寸",
            promptContent: "浆果的大小。"
          }
      )
    },
    key: "size",
    align: 'center',
    render(row: any) {
      return row.size + "mm"
    }
  },
  {
    title() {
      return h(
          divNPopover,
          {
            content: "最大收获量",
            promptContent: "第四代中一棵树上可以生长的浆果的最大数量。"
          }
      )
    },
    key: "maxHarvest",
    align: 'center',
    render(row: any) {
      return row.maxHarvest + "个"
    }
  },
  {
    title() {
      return h(
          divNPopover,
          {
            content: "生长时间",
            promptContent: "树木生长一个阶段所需的时间（以小时为单位）。浆果树要经过四个生长阶段才能采摘。"
          }
      )
    },
    key: "growthTime",
    align: 'center',
    render(row: any) {
      return row.growthTime + "小时"
    }
  },
  {
    title() {
      return h(
          divNPopover,
          {
            content: "天赋力量",
            promptContent: "与此浆果一起使用时，可发挥“自然馈赠”招式的威力。"
          }
      )
    },
    key: "naturalGiftPower",
    align: 'center',
    render(row: any) {
      return row.naturalGiftPower + "点"
    },
  },
  {
    title() {
      return h(
          divNPopover,
          {
            content: "平滑度",
            promptContent: "这种浆果质地光滑，可用于制作 Pokéblocks 或 Poffins。"
          }
      )
    },
    key: "smoothness",
    align: 'center',
    render(row: any) {
      return row.smoothness
    }
  },
  {
    title() {
      return h(
          divNPopover,
          {
            content: "土壤干度",
            promptContent: "浆果生长时土壤变干的速度。速率越高，土壤变干越快。"
          }
      )
    },
    key: "soilDryness",
    align: 'center',
    render(row: any) {
      return row.soilDryness
    }
  },
  {
    title: '操作',
    key: 'control',
    align: 'center',
    render() {
      return h(
          NButton,
          {
            type: "info"
          },
          { default: () => "查看详情" }
      )
    }
  }
]

onMounted(() => {
  getBerryData({limit: 10, offset: 0})
})

function getBerryData(parameter: getBerryListData) {
  data.value = [];
  getBerryList(parameter).then((res: any) => {
    data.value = res.data.results
    pagination.value.itemCount = res.data.count ?? 0
    pagination.value.pageCount = Math.ceil(pagination.value.itemCount / pagination.value.pageSize)
    completeData()
  })
}

function completeData() {
  for (let i = 0; i < data.value.length; i++) {
    request.get(data.value[i].url).then((res: any) => {
      data.value[i].size = res.data.size
      data.value[i].maxHarvest = res.data.max_harvest
      data.value[i].growthTime = res.data.growth_time
      data.value[i].naturalGiftPower = res.data.natural_gift_power
      data.value[i].smoothness = res.data.smoothness
      data.value[i].soilDryness = res.data.soil_dryness
      data.value[i].infoUrl = res.data.item.url
    })
  }
}

function handlePageChange(info: any) {
  pagination.value.page = info
  queryPageData.value.limit = pagination.value.pageSize
  queryPageData.value.offset = (info - 1) * pagination.value.pageSize
  getBerryData(queryPageData.value)
}

</script>

<template>
  <n-space :size="12" vertical>
    <n-data-table
        :columns="columns"
        :data="data"
        :on-update:page="handlePageChange"
        :pagination="pagination"
        :remote="true">
    </n-data-table>
  </n-space>
</template>

<style scoped>

</style>

