<script lang="ts" setup>
import request from "@/util/request.ts";
import DivNPopover from "@/components/popover/divNPopover.ts";

const props = defineProps({
  item: String
})

const berryInfoData = ref<{
  id?: number,
  name?: string,
  cost?: number,
  fling_power?: number,
  fling_effect?: any,
  attributes?: Array<any>,
  category?: any,
  effect_entries?: Array<any>,
  flavor_text_entries?: Array<any>,
  game_indices?: Array<any>,
  names?: Array<any>,
  sprites?: { default?: string }
  held_by_pokemon?: Array<any>
  baby_trigger_for?: any
  machines?: Array<any>
}>({})

const berryZHName = ref<string>()
const berryZHFlavorTextEntries = ref<Array<{
  text?: string,
  version_group?: any
}>>([])

onMounted(() => {
  if (props.item) {
    getBerryInfoData(props.item)
  }
})

function getBerryInfoData(url: string) {
  request.get(url).then((res: any) => {
    berryInfoData.value = res.data
    getBerryZHName()
    getBerryZHFlavorTextEntries()
  })
}

function getBerryZHName(): string | undefined {
  if (berryInfoData.value.names) {
    let names = berryInfoData.value.names;
    for (const name of names) {
      if (name.language.name === "zh-Hans") {
        return berryZHName.value = name.name
      }
    }
    return berryInfoData.value.name
  }
}

function getBerryZHFlavorTextEntries(): string | undefined {
  if (berryInfoData.value.flavor_text_entries) {
    let entries = berryInfoData.value.flavor_text_entries;
    for (const entry of entries) {
      let addEntity :any = {}
      if (entry.language.name === "zh-Hans") {
        addEntity.text = entry.text
        addEntity.version_group = entry.version_group
        berryZHFlavorTextEntries.value.push(addEntity)
      }
    }
    return '无'
  }
}

</script>

<template>
  <n-space align="center" justify="center">
    {{ berryInfoData.name }}
    {{ berryZHName }}
    {{ berryZHFlavorTextEntries }}
    <n-image :src="berryInfoData.sprites?.default"/>
    <div>
      <div-n-popover content='成本' prompt-content="这个物品在商店里的价格。"/>{{ berryInfoData.cost }}
    </div>
<!--    <version-info :version="{name:'black',url:'https://pokeapi.co/api/v2/version/17/'}"/>-->
  </n-space>
</template>

<style scoped>

</style>
